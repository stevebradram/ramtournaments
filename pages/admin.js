import React, { Component } from 'react'
import styles from "@/styles/Leaderboard.module.scss";
import firebase from '../components/FirebaseClient'
import { MdOutlineFolderOff } from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import ProgressBar from '../components/Helper/ProgressBar'
import Router from 'next/router';
class leaderboard extends Component {
  state={openModal:false,openModal2:false,openModal3:false,openModal4:false,theItems:[],isThereNullData:false,allGames:[],showProgressBar:false,isAdmin:false,theUsers:[],
    dataAvailable:false,sportType:'',theEventKey:'',theEventTitle:'',userLoggedIn:false,nullData:[],theEvent:'',theTime:'',isTherNormalData:false,eventStartTime:''}
  componentDidMount=()=>{
     //this.getScoreBoardData()
     this.tableRef = React.createRef(null);
     this.showProgressBar()
     this.checkAuth()
     
  }
  checkAuth = () => {
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
        this.setState({isAdmin:true})
        this.loadBadges()
        this.getUsers()
       }else{
        Router.push('/events')
       }
    }else{
      Router.push('/events')
     }
   })
 }
 loadBadges=()=>{
   firebase.database().ref('/userBadges').on('value',(snap)=>{
     this.setState({userBadges:snap.val()||{}})
   })
 }
 renderBadgeAdmin=(item)=>{
   var all=this.state.userBadges||{}
   var b=all[item.id]||{}
   var keys=Object.keys(b)
   return (<span style={{whiteSpace:'nowrap'}}>
     {keys.map((k)=>{
       var it=b[k]||{}
       var tip=(it.label||'Winner')+(it.year?(' ('+it.year+')'):'')
       return <span key={k} style={{marginRight:8}} title={tip}>{it.icon||'\u{1F40F}'}<span style={{cursor:'pointer',color:'#CB1E31',marginLeft:2,fontWeight:'bold'}} onClick={()=>this.removeBadge(item.id,k)}>{'\u00D7'}</span></span>
     })}
     <span style={{cursor:'pointer',fontWeight:'bold',border:'1px solid #292f51',borderRadius:3,padding:'1px 7px',color:'#292f51'}} onClick={()=>this.setState({badgeModal:true,badgeUid:item.id,badgeName:item.name,badgeIcon:'\u{1F40F}',badgeLabel:'',badgeYear:''})}>+</span>
   </span>)
 }
 saveBadge=()=>{
   var uid=this.state.badgeUid
   var label=(this.state.badgeLabel||'').trim()
   if(!uid||!label){return}
   var key='b'+new Date().getTime()
   firebase.database().ref('/userBadges/'+uid+'/'+key).set({
     icon:this.state.badgeIcon||'\u{1F40F}',
     label:label,
     year:String(this.state.badgeYear||'').trim()
   },(err)=>{
     if(!err){this.setState({badgeModal:false,badgeLabel:'',badgeYear:''})}
   })
 }
 removeBadge=(uid,key)=>{
   firebase.database().ref('/userBadges/'+uid+'/'+key).remove()
 }
 getUsers=async(userId)=>{
  //return
  var theUsers=[],i=0
  var userInfoDb=firebase.database().ref('/users/')//.orderByChild('userData')
  
  await  userInfoDb.once('value',dataSnapshot=>{
    var theCount=dataSnapshot.numChildren()
    var i=0
    dataSnapshot.forEach((data) => {
      i++
      var theD=data.val().userData||{}
     
      if(!theD.name)return
      let notificationStatus = true;
      if(theD.notificationsEnabled===false){notificationStatus=false}
      var theItem={id:data.key,name:theD.name,phone:theD.phoneNo,email:theD.email,created:theD.created,notificationStatus:notificationStatus}
      theUsers.push(theItem)
      if(theCount===i){
        console.log('the users',theUsers)
        var sortedArr=theUsers.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({theUsers:sortedArr})
      }
    })
  })
 }
  notify=(message)=>{
    toast.warn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  showProgressBar=()=>{
    this.setState({showProgressBar:true})
    this.timerHandle = setTimeout(
      () => this.setState({showProgressBar:false}), 
      2000)
  }
    render() {
     
        return (
          <>
      {this.state.isAdmin?<div className={styles.container}>
      <div className={styles.downloadCont}><p className={styles.titleP}>RAM Users</p>
       {this.state.isAdmin?<div id={styles.exportDiv}> <div  id={styles.exportDiv1} onClick={()=>this.notify('Downloading...')}><DownloadTableExcel
                    filename={this.state.theEventKey}
                    sheet="users"
                    currentTableRef={this.tableRef.current}        
                >
                  <p className={styles.exportP}>Export Document</p>
                  </DownloadTableExcel> </div></div>:null}</div>
      <div className={styles.menu2Div1}>
      <div id={styles.table1Div}>
      <table className={styles.table1} ref={ this.tableRef}>
        <tr id={styles.table1Tr1}>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Notifications?</th>
          <th>Phone No</th>
          <th>Joined</th>
          <th>Badges</th>
        </tr>
        {this.state.theUsers.map((item, index) => {
          var created = dayjs(item.created).format('DD MMM YYYY')
          return (
            <tr key={index} id={styles.table1Tr2}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.notificationStatus+''}</td>
              <td>{item.phone}</td>
              <td>{created}</td>
              <td>{this.renderBadgeAdmin(item)}</td>
            </tr>
            )
        })}
      </table>
      </div>
      {this.state.badgeModal?<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.55)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>this.setState({badgeModal:false})}>
        <div style={{backgroundColor:'#fff',padding:20,borderRadius:8,width:320,maxWidth:'90%'}} onClick={(e)=>e.stopPropagation()}>
          <h3 style={{marginTop:0,marginBottom:4,color:'#292f51'}}>Add badge</h3>
          <p style={{marginTop:0,marginBottom:14,color:'#292f51',fontSize:13}}>{this.state.badgeName}</p>
          <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Icon</label>
          <select value={this.state.badgeIcon||'\u{1F40F}'} onChange={(e)=>this.setState({badgeIcon:e.target.value})} style={{width:'100%',padding:6,marginBottom:10}}>
            <option value={'\u{1F40F}'}>{'\u{1F40F}'} Ram</option>
            <option value={'\u{1F37A}'}>{'\u{1F37A}'} Pint glass</option>
            <option value={'\u{1F451}'}>{'\u{1F451}'} Crown</option>
            <option value={'\u{1FA9C}'}>{'\u{1FA9C}'} Ladder</option>
            <option value={'\u{1F3F7}\uFE0F'}>{'\u{1F3F7}\uFE0F'} Name tag</option>
          </select>
          <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Label</label>
          <input value={this.state.badgeLabel||''} onChange={(e)=>this.setState({badgeLabel:e.target.value})} placeholder='2026 NFL Champion' style={{width:'100%',padding:6,marginBottom:10,boxSizing:'border-box'}}/>
          <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Year</label>
          <input value={this.state.badgeYear||''} onChange={(e)=>this.setState({badgeYear:e.target.value})} placeholder='2026' style={{width:'100%',padding:6,marginBottom:16,boxSizing:'border-box'}}/>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button onClick={()=>this.setState({badgeModal:false})} style={{marginRight:8,padding:'6px 12px',cursor:'pointer'}}>Cancel</button>
            <button onClick={()=>this.saveBadge()} style={{padding:'6px 12px',backgroundColor:'#CB1E31',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Add badge</button>
          </div>
        </div>
      </div>:null}
      </div></div>:null}
            </>
        )
    }
}
export default leaderboard
