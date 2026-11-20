import React, { Component } from 'react'
import firebase from '../FirebaseClient'
import styles from './TheMarchMadness.module.scss'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
class TheMarchMadness2 extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
    this.getAlert = this.getAlert.bind(this);
 }
  state={round1Arr:[],round2Arr:[],currentSelection:'round1',theItems:[],finalRoundExists:false,isAdmin:false,userId:'',overallArr:[],overallRoundExists:'',finalRoundArr:[],finalRoundMenu:'',theCount:''}

  loadBadges=()=>{
    firebase.database().ref('/userBadges').on('value',(snap)=>{
      this.setState({userBadges:snap.val()||{}})
    })
  }
  renderBadges=(uid)=>{
    var all=this.state.userBadges||{}
    var b=all[uid]
    if(!b){return null}
    var keys=Object.keys(b)
    if(!keys.length){return null}
    return (<span style={{marginLeft:5,whiteSpace:'nowrap'}}>
      {keys.map((k)=>{
        var it=b[k]||{}
        var tip=(it.label||'Winner')+(it.year?(' ('+it.year+')'):'')
        return <span key={k} title={tip} style={{marginRight:1}}>{it.icon||'\u{1F3C6}'}</span>
      })}
    </span>)
  }
  renderBadgeAdmin=(item)=>{
    var all=this.state.userBadges||{}
    var b=all[item.id]||{}
    var keys=Object.keys(b)
    return (<span style={{whiteSpace:'nowrap'}}>
      {keys.map((k)=>{
        var it=b[k]||{}
        return <span key={k} style={{marginRight:5}} title={it.label||''}>{it.icon||'\u{1F3C6}'}<span style={{cursor:'pointer',color:'#CB1E31',marginLeft:1,fontWeight:'bold'}} onClick={()=>this.removeBadge(item.id,k)}>{'\u00D7'}</span></span>
      })}
      <span style={{cursor:'pointer',fontWeight:'bold'}} onClick={()=>this.setState({badgeModal:true,badgeUid:item.id,badgeName:item.teamName,badgeIcon:'\u{1F3C6}',badgeLabel:'',badgeYear:''})}>+</span>
    </span>)
  }
  saveBadge=()=>{
    var uid=this.state.badgeUid
    var label=(this.state.badgeLabel||'').trim()
    if(!uid||!label){return}
    var key='b'+new Date().getTime()
    firebase.database().ref('/userBadges/'+uid+'/'+key).set({
      icon:this.state.badgeIcon||'\u{1F3C6}',
      label:label,
      year:String(this.state.badgeYear||'').trim()
    },(err)=>{
      if(!err){this.setState({badgeModal:false,badgeLabel:'',badgeYear:''})}
    })
  }
  removeBadge=(uid,key)=>{
    firebase.database().ref('/userBadges/'+uid+'/'+key).remove()
  }
  componentDidMount=()=>{
    this.loadBadges()
    this.setState()
    //console.log('here march madness 2222222 again agaiiiiiiin')
    //this.setState({theCount:this.props.theCount})
   // this.props.onClick()
    //return
    this.getRound1Matches()
    this.getRound2Matches()
    this.getFinalRound()
    this.getOverall()
    this.checkAuth()
    //this.props.setClick(this.getAlert);
  }
  getAlert() {
    alert('getAlert from Child');
  }
  checkAuth = () => {
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
        this.setState({isAdmin:true})
       }
       this.setState({userId,userLoggedIn:true}) 
     }else{
     }
   })
 }
 getRound1Matches=()=>{
  //console.log('craaaaaaaaaaaaaaaaaaaaaaaazy',this.props.theEventKey)
  var leadersRef = firebase.database().ref('/userBets/NCAAB/'+this.props.theEventKey+'/')
 // var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/round1/')
  var i=0,theDet2=[]
  leadersRef.once('value', dataSnapshot => {
    var theCount=dataSnapshot.numChildren()
    dataSnapshot.forEach((data) => {
      i++
      var theId=data.key
      var theDet={}
      //console.log('the uid',theId)
      var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
      var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
      var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/bets/round1/")
      isTherData.once('value', dataSnapshot => {
        if(dataSnapshot.exists()){
      var theEmail='',thePhone=''
      if(this.state.isAdmin){
        userInfoDb2.once('value',dataSnapshot=>{
          var theD=dataSnapshot.val()
          if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
          theDet['email']=theD.email
          if(theD.phoneNo){thePhone=theD.phoneNo}else{thePhone='N/A'}
          if(theD.email){theEmail=theD.email}else{theEmail='N/A'}
        })}
      userInfoDb.once('value', dataSnapshot => {
         if(dataSnapshot.exists()){
          var userBetData=dataSnapshot.val()
          var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
            bestPossibleScore:userBetData.round1BPS,score:userBetData.round1Score,email:theEmail,phone:thePhone}
            theDet2.push(theDet)
            //console.log('ikoooooooooooooooo 1111',theDet2)
          this.setState({round1Arr:theDet2,theItems:theDet2})
         }else{
          //console.log('hakunaaaaaaaaaaaaa 11111')
         }
      })
    }
    })
      if(theCount===i){
        var sort=this.state.round1Arr.sort((a, b) => b.score - a.score )
        this.setState({round1Arr:sort})
        //console.log('finaaal',theDet2)
        //this.setState({round1Arr:theDet2})
      }
    })
  })
}
  
getFinalRound=()=>{
  //return
  var eventIdsDb=firebase.database().ref('/theEvents/eventsIds/'+this.props.theEventKey+'/currentSelection')
  eventIdsDb.once('value', dataSnapshot => {
    if(!dataSnapshot.exists()){
      this.setState({finalRoundMenu:false})
      }else{
        this.setState({finalRoundMenu:dataSnapshot.val()})
      }
  })
  var i=0,theDet2=[],currentRound=this.props.currentRound
  //console.log('currentRound',this.props.theEventKey,currentRound)
  var leadersRef = firebase.database().ref('/userBets/NCAAB/'+this.props.theEventKey+'/')
  leadersRef.once('value', dataSnapshot => {
    if(!dataSnapshot.exists()){
    this.setState({finalRoundExists:false})
    }else{
      this.setState({finalRoundExists:true})
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
       ///console.log('the final uid',theId)
       
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
        var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/bets/sweet16/")
      isTherData.once('value', dataSnapshot => {
        if(dataSnapshot.exists()){
        var theEmail='',thePhone=''
        if(this.state.isAdmin){
          userInfoDb2.once('value',dataSnapshot=>{
            var theD=dataSnapshot.val()
            if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
            theDet['email']=theD.email
            if(theD.phoneNo){thePhone=theD.phoneNo}else{thePhone='N/A'}
            if(theD.email){theEmail=theD.email}else{theEmail='N/A'}
          })}
          
        userInfoDb.once('value', dataSnapshot => {
           if(dataSnapshot.exists()){
            var BPS=''
            var userBetData=dataSnapshot.val()
            var sweet16BPS=userBetData.sweet16BPS,elite8BPS=userBetData.elite8BPS
            var final4BPS=userBetData.final4BPS,finalRoundBPS=userBetData.finalRoundBPS
            var sweet16Score=userBetData.sweet16Score,elite8Score=userBetData.elite8Score
            var final4Score=userBetData.final4Score,finalRoundScore=userBetData.finalRoundScore
            var theMenu=userBetData.theMenu

          
           
            if(!sweet16BPS||sweet16BPS===undefined||sweet16BPS===null){sweet16BPS=0}
            if(!elite8BPS||elite8BPS===undefined||elite8BPS===null){elite8BPS=0}
            if(!final4BPS||final4BPS===undefined||final4BPS===null){final4BPS=0}
            if(!finalRoundBPS||finalRoundBPS===undefined||finalRoundBPS===null){finalRoundBPS=0}
            if(!sweet16Score||sweet16Score===undefined||sweet16Score===null){sweet16Score=0}
            if(!elite8Score||elite8Score===undefined||elite8Score===null){elite8Score=0}
            if(!final4Score||final4Score===undefined||final4Score===null){final4Score=0}
            if(!finalRoundScore||finalRoundScore===undefined||finalRoundScore===null){finalRoundScore=0}
            
           
            if(currentRound==='sweet16'){BPS=sweet16BPS}if(currentRound==='elite8'){BPS=elite8BPS}
            if(currentRound==='final4'){BPS=final4BPS}if(currentRound==='finalRound'){BPS=finalRoundBPS}

            var score=Number(sweet16Score)+Number(elite8Score)+Number(final4Score)+Number(finalRoundScore)
            score=Number(score).toFixed(2)
            var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
              email:theEmail,phone:thePhone,sweet16BPS:sweet16BPS,elite8BPS:elite8BPS,finalRoundBPS:finalRoundBPS,
              sweet16Score:sweet16Score,elite8Score:elite8Score,final4Score:final4Score,final4BPS:final4BPS,
              finalRoundScore:finalRoundScore,score:score}
              theDet2.push(theDet)
              //console.log('final round 36366',theDet2)
            this.setState({finalRoundArr:theDet2})
           }else{
            //console.log('hakunaaaaaaaaaaaaa 11111')
           }
        })
      }
    })
        if(theCount===i){
          var sort=this.state.finalRoundArr.sort((a, b) => b.score - a.score )
          this.setState({finalRoundArr:sort})
          //console.log('hakunaaaaaaaaaaaaa overallll',sort)
        }
      })
    }
  })
}
  getOverall=()=>{
    var i=0,theDet2=[]
    var leadersRef = firebase.database().ref('/userBets/NCAAB/'+this.props.theEventKey)
    leadersRef.once('value', dataSnapshot => {
      if(!dataSnapshot.exists()){
      this.setState({overallRoundExists:false})
      }else{
        this.setState({overallRoundExists:true})
        var theCount=dataSnapshot.numChildren()
        dataSnapshot.forEach((data) => {
          i++
          var theId=data.key
          var theDet={}
        //console.log('the uid',theId)
          var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
          var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
          var theEmail='',thePhone=''
          if(this.state.isAdmin){
            userInfoDb2.once('value',dataSnapshot=>{
              var theD=dataSnapshot.val()
              if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
              theDet['email']=theD.email
              if(theD.phoneNo){thePhone=theD.phoneNo}else{thePhone='N/A'}
              if(theD.email){theEmail=theD.email}else{theEmail='N/A'}
            })}
          userInfoDb.once('value', dataSnapshot => {
             if(dataSnapshot.exists()){
              var userBetData=dataSnapshot.val()
              var round1Score=userBetData.round1Score,round2Score=userBetData.round2Score
              var sweet16Score=userBetData.sweet16Score,elite8Score=userBetData.elite8Score
              var final4Score=userBetData.final4Score,finalRoundScore=userBetData.finalRoundScore
              
              if(!round1Score||round1Score===undefined||round1Score===null){round1Score=0}
              if(!round2Score||round2Score===undefined||round2Score===null){round2Score=0}
              if(!sweet16Score||sweet16Score===undefined||sweet16Score===null){sweet16Score=0}
              if(!elite8Score||elite8Score===undefined||elite8Score===null){elite8Score=0}
              if(!final4Score||final4Score===undefined||final4Score===null){final4Score=0}
              if(!finalRoundScore||finalRoundScore===undefined||finalRoundScore===null){finalRoundScore=0}
              //console.log('scorees',theId,round1Score,round2Score,sweet16Score,elite8Score,final4Score,finalRoundScore)
             
              var score=Number(round1Score)+Number(round2Score)+Number(sweet16Score)+Number(elite8Score)+Number(final4Score)+Number(finalRoundScore)
              score=Number(score).toFixed(2)
              var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
                round1Score:round1Score,round2Score:round2Score,email:theEmail,phone:thePhone,
                sweet16Score:sweet16Score,elite8Score:elite8Score,final4Score:final4Score,
                finalRoundScore:finalRoundScore,score:score}
                theDet2.push(theDet)
               //console.log('ikoooooooooooooooo 1111',theDet2)
              this.setState({overallArr:theDet2})
             }else{
              //console.log('hakunaaaaaaaaaaaaa 11111')
             }
          })
          if(theCount===i){
            var sort=this.state.overallArr.sort((a, b) => b.score - a.score )
            this.setState({overallArr:sort})
            //console.log('hakunaaaaaaaaaaaaa overallll',sort)
          }
        })
      }

    })
  }
  getRound2Matches=()=>{
    //console.log('craaaaaaaaaaaaaaaaaaaaaaaazy',this.props.theEventKey)
    var leadersRef = firebase.database().ref('/userBets/NCAAB/'+this.props.theEventKey+'/')
   // var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/round1/')
    var i=0,theDet2=[]
    leadersRef.once('value', dataSnapshot => {
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
        //console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
        var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/bets/round2/")
        isTherData.once('value', dataSnapshot => {
          if(dataSnapshot.exists()){
        var theEmail='',thePhone=''
        if(this.state.isAdmin){
          userInfoDb2.once('value',dataSnapshot=>{
            var theD=dataSnapshot.val()
            if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
            theDet['email']=theD.email
            if(theD.phoneNo){thePhone=theD.phoneNo}else{thePhone='N/A'}
            if(theD.email){theEmail=theD.email}else{theEmail='N/A'}
          })}
        userInfoDb.once('value', dataSnapshot => {
           if(dataSnapshot.exists()){
            var userBetData=dataSnapshot.val()
            var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
              bestPossibleScore:userBetData.round2BPS,score:userBetData.round2Score,email:theEmail,phone:thePhone}
              theDet2.push(theDet)
              //console.log('ikoooooooooooooooo 1111',theDet2)
            this.setState({round2Arr:theDet2,theItems:theDet2})
           }else{
            //console.log('hakunaaaaaaaaaaaaa 11111')
           }
        })
      }
      })
        if(theCount===i){
          var sort=this.state.round2Arr.sort((a, b) => b.score - a.score )
          this.setState({round2Arr:sort})
          //console.log('finaaal',theDet2)
          //this.setState({round1Arr:theDet2})
        }
      })
    })
  }
  /*getRound2Matches=()=>{
    var i=0,theDet2=[]
    var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/round2/')
    leadersRef.once('value', dataSnapshot => {
      dataSnapshot.forEach((data) => {
        var theId=data.key
        var theDet={}
       //console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
            var theEmail='',thePhone=''
            if(this.state.isAdmin){
              userInfoDb2.once('value',dataSnapshot=>{
                var theD=dataSnapshot.val()
                if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
                theDet['email']=theD.email
                if(theD.phoneNo){thePhone=theD.phoneNo}else{thePhone='N/A'}
                if(theD.email){theEmail=theD.email}else{theEmail='N/A'}
              })}
        userInfoDb.once('value', dataSnapshot => {
           if(dataSnapshot.exists()){
            var userBetData=dataSnapshot.val()
            var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
              bestPossibleScore:userBetData.round2BPS,score:userBetData.round2Score,email:theEmail,phone:thePhone}
            theDet2.push(theDet)
           //console.log('ikoooooooooooooooo 22222',theDet2)
            this.setState({round2Arr:theDet2})
           }else{
            //console.log('hakunaaaaaaaaaaaaa 222222')
           }
        })
      })
    })
  }*/
  getCurrentRound=(round)=>{
  
    if(round==='round1'){
    this.setState({theItems:this.state.round1Arr})
    }
    if(round==='round2'){
      this.setState({theItems:this.state.round2Arr})
    }
    if(round==='overall'){
      this.setState({theItems:this.state.overallArr})
    }
    if(round==='finalRound'){
      this.setState({theItems:this.state.finalRoundArr})
      //console.log('it is final round',this.state.finalRoundArr)
    }
    
    this.setState({currentSelection:round})
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
  render() {
    //console.log('this.state.currentSelection',this.state.currentSelection)
    var sortData=this.state.theItems.sort((a, b) => b.score - a.score )
    //var sortData=this.state.theItems.sort((a, b) => b.currentScore - a.currentScore )
    return (
      <>
      <div>
        <div className={styles.eve2Div}>
            <p id={this.state.currentSelection==='round1'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round1')}>Round 1</p>
            <p id={this.state.currentSelection==='round2'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round2')}>Round 2</p>
            <p id={this.state.currentSelection==='finalRound'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('finalRound')}>Final Round</p>
            <p id={this.state.currentSelection==='overall'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('overall')}>Overall</p>
           </div>
           <div className={styles.menu2Div1}>   
           {this.state.isAdmin?<div id={styles.exportDiv}> <div  id={styles.exportDiv1} onClick={()=>this.notify('Downloading...')}><DownloadTableExcel
                    filename={this.state.theEventKey}
                    sheet="users"
                    currentTableRef={this.tableRef.current}        
                >
                  <p className={styles.exportP}>Export Document</p>
                  </DownloadTableExcel> </div></div>:null}
           <div id={styles.table1Div}>
        <table className={styles.table1} ref={ this.tableRef}>
        <tr id={styles.table1Tr1}>
          <th>Overall <br/>Rank</th>
          <th>RAM Name</th>
          <th>Flock Name</th>
          {this.state.currentSelection==='round1'||this.state.currentSelection==='round2'?
          <><th>Best Possible <br/>Score</th>
          <th>Current Score</th></>:null}
          {this.state.currentSelection==='finalRound'?
          <><th>Best Score <br/>{this.state.finalRoundMenu}</th>
          <th>Cumulative <br/>Score</th>
          <th>Sweet 16</th>
          <th>Elite 8</th>
          <th>Final 4</th>
          <th>Final</th></>:null}
          {this.state.currentSelection==='overall'?
          <>
          <th>Cumulative <br/>Score</th>
          <th>Round 1</th>
          <th>Round 2</th>
          <th>Sweet 16</th>
          <th>Elite 8</th>
          <th>Final 4</th>
          <th>Final</th></>:null}
          {this.state.isAdmin?<><th>Phone</th><th>Email</th><th>Nots</th><th>Badges</th></>:null}
          </tr>
          {sortData.map((item, index) => {
            var BPS=''
            if(this.state.currentSelection==='finalRound'){
              //console.log('this.state.finalRoundMenu',this.state.finalRoundMenu)
             if(this.state.finalRoundMenu==='sweet16'){BPS=item.sweet16BPS}if(this.state.finalRoundMenu==='elite8'){BPS=item.elite8BPS}
             if(this.state.finalRoundMenu==='final4'){BPS=item.final4BPS}if(this.state.finalRoundMenu==='finalRound'){BPS=item.finalRoundBPS}}
            return(
            <tr key={index} id={styles.table1Tr2} style={{backgroundColor:item.id===this.state.userId?'#292f51': index===0?'#CB1E31':null,color:item.id===this.state.userId?'white': index===0?'#ffffff':'#292f51'}}>
            <td>{index+1}</td>
            <td>{item.teamName}{this.renderBadges(item.id)}</td>
            <td>{item.flockName}</td>
            {this.state.currentSelection==='round1'||this.state.currentSelection==='round2'?
            <><td>{item.bestPossibleScore}</td>
              <td>{item.score}</td></>:null}
            {this.state.currentSelection==='finalRound'?
              <>
              <td>{this.state.finalRoundExists?BPS:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.score:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.sweet16Score:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.elite8Score:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.final4Score:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.finalRoundScore:'0.00'}</td>
              </>:null
           }
           {this.state.currentSelection==='overall'?
              <>
              <td>{item.score?item.score:'0.00'}</td>
              <td>{item.round1Score?item.round1Score:'0.00'}</td>
              <td>{item.round2Score?item.round2Score:'0.00'}</td>
              <td>{item.sweet16Score?item.sweet16Score:'0.00'}</td>
              <td>{item.elite8Score?item.elite8Score:'0.00'}</td>
              <td>{item.final4Score?item.final4Score:'0.00'}</td>
              <td>{item.finalRoundScore?item.finalRoundScore:'0.00'}</td>
              </>:null
           }
           {this.state.isAdmin?<><td>{item.phone}</td><td>{item.email}</td><td>{item.nots}</td><td>{this.renderBadgeAdmin(item)}</td></>:null}
            </tr>)
          }
        )}
          </table> </div></div>
      </div>
       {this.state.badgeModal?<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.55)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>this.setState({badgeModal:false})}>
         <div style={{backgroundColor:'#fff',padding:20,borderRadius:8,width:320,maxWidth:'90%'}} onClick={(e)=>e.stopPropagation()}>
           <h3 style={{marginTop:0,marginBottom:4,color:'#292f51'}}>Add badge</h3>
           <p style={{marginTop:0,marginBottom:14,color:'#292f51',fontSize:13}}>{this.state.badgeName}</p>
           <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Icon</label>
           <select value={this.state.badgeIcon||'\u{1F3C6}'} onChange={(e)=>this.setState({badgeIcon:e.target.value})} style={{width:'100%',padding:6,marginBottom:10}}>
             <option value={'\u{1F40F}'}>{'\u{1F40F}'} Ram</option>
             <option value={'\u{1F3C6}'}>{'\u{1F3C6}'} Trophy</option>
             <option value={'\u{1F947}'}>{'\u{1F947}'} Gold medal</option>
             <option value={'\u{1F948}'}>{'\u{1F948}'} Silver medal</option>
             <option value={'\u{1F949}'}>{'\u{1F949}'} Bronze medal</option>
             <option value={'\u{1F37A}'}>{'\u{1F37A}'} Pint glass</option>
             <option value={'\u{1F451}'}>{'\u{1F451}'} Crown</option>
             <option value={'\u2B50'}>{'\u2B50'} Star</option>
           </select>
           <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Label</label>
           <input value={this.state.badgeLabel||''} onChange={(e)=>this.setState({badgeLabel:e.target.value})} placeholder='2026 Champion' style={{width:'100%',padding:6,marginBottom:10,boxSizing:'border-box'}}/>
           <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Year</label>
           <input value={this.state.badgeYear||''} onChange={(e)=>this.setState({badgeYear:e.target.value})} placeholder='2026' style={{width:'100%',padding:6,marginBottom:16,boxSizing:'border-box'}}/>
           <div style={{display:'flex',justifyContent:'flex-end'}}>
             <button onClick={()=>this.setState({badgeModal:false})} style={{marginRight:8,padding:'6px 12px',cursor:'pointer'}}>Cancel</button>
             <button onClick={()=>this.saveBadge()} style={{padding:'6px 12px',backgroundColor:'#CB1E31',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Add badge</button>
           </div>
         </div>
       </div>:null}
       <ToastContainer/>
       </>
    )
  }
}
export default TheMarchMadness2
