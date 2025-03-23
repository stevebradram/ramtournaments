import React, { Component } from 'react'
import firebase from '../FirebaseClient'
import styles from './TheMarchMadness.module.scss'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
class TheMarchMadness extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
 }
  state={round1Arr:[],round2Arr:[],currentSelection:'round1',theItems:[],finalRoundExists:false,isAdmin:true,userId:'',}

  componentDidMount=()=>{
    this.getRound1Matches()
    this.getRound2Matches()
    this.getFinalRound()
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
    var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/round1/')
    var i=0,theDet2=[]
    leadersRef.once('value', dataSnapshot => {
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
        console.log('the uid',theId)
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
              bestPossibleScore:userBetData.round1BPS,score:userBetData.round1Score,email:theEmail,phone:thePhone}
              theDet2.push(theDet)
              console.log('ikoooooooooooooooo 1111',theDet2)
            this.setState({round1Arr:theDet2,theItems:theDet2})
           }else{
            //console.log('hakunaaaaaaaaaaaaa 11111')
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
    var i=0,theDet2=[]
    var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/final/')
    leadersRef.once('value', dataSnapshot => {
      if(!dataSnapshot.exists()){
      this.setState({finalRoundExists:false})
      }else{
        this.setState({finalRoundExists:true})
      }
     /* dataSnapshot.forEach((data) => {
        var theId=data.key
        console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
        userInfoDb.once('value', dataSnapshot => {
           if(dataSnapshot.exists()){
            var userBetData=dataSnapshot.val()
            var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
              bestPossibleScore:userBetData.round2BPS,score:userBetData.round2Score}
            theDet2.push(theDet)
            console.log('ikoooooooooooooooo 22222',theDet2)
            this.setState({round2Arr:theDet2})
           }else{
            console.log('hakunaaaaaaaaaaaaa 222222')
           }
        })
      })*/
    })
  }
  getRound2Matches=()=>{
    var i=0,theDet2=[]
    var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/round2/')
    leadersRef.once('value', dataSnapshot => {
      dataSnapshot.forEach((data) => {
        var theId=data.key
        var theDet={}
        console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NCAAB/"+this.props.theEventKey+"/details/")
        /*if(this.state.isAdmin){
          userInfoDb2.once('value',dataSnapshot=>{
            var theD=dataSnapshot.val()
            console.log('the theD',theId,theD)
            if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
            theDet['email']=theD.email
          })}*/
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
            /*theDet['id']=theId
            theDet['flockName']=userBetData.flockName
            theDet['teamName']=userBetData.teamName
            theDet['bestPossibleScore']=userBetData.round1BPS
            theDet['score']=userBetData.round1Score*/
            theDet2.push(theDet)
            console.log('ikoooooooooooooooo 22222',theDet2)
            this.setState({round2Arr:theDet2})
           }else{
            console.log('hakunaaaaaaaaaaaaa 222222')
           }
        })
      })
    })
  }
  getCurrentRound=(round)=>{
    if(round==='round1'){
    this.setState({theItems:this.state.round1Arr})
    }
    if(round==='round2'){
      this.setState({theItems:this.state.round2Arr})
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
    var sortData=this.state.theItems.sort((a, b) => b.score - a.score )
    //var sortData=this.state.theItems.sort((a, b) => b.currentScore - a.currentScore )
    return (
      <>
      <div>
        <div className={styles.eve2Div}>
            <p id={this.state.currentSelection==='round1'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round1')}>Round 1</p>
            <p id={this.state.currentSelection==='round2'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round2')}>Round 2</p>
            <p id={this.state.currentSelection==='finalRound'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('finalRound')}>Final Round</p>
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
          {this.state.currentSelection!=='finalRound'?
          <><th>Best Possible <br/>Score</th>
          <th>Current Score</th></>:
          <><th>Best Possible <br/>Score</th>
          <th>Cumulative <br/>Score</th>
          <th>Sweet 16</th>
          <th>Elite 8</th>
          <th>Final 4</th>
          <th>Final</th></>}
          {this.state.isAdmin?<><th>Phone</th><th>Email</th></>:null}
          </tr>
          {sortData.map((item, index) => {
            return(
            <tr key={index} id={styles.table1Tr2}>
            <td>{index+1}</td>
            <td>{item.teamName}</td>
            <td>{item.flockName}</td>
            {this.state.currentSelection!=='finalRound'?
              <><td>{item.bestPossibleScore}</td>
              <td>{item.score}</td></>:
              <>
              <td>{this.state.finalRoundExists?item.bestPossibleScore:'0'}</td>
              <td>{this.state.finalRoundExists?item.cumulativeScore:'0'}</td>
              <td>{this.state.finalRoundExists?item.sweet16Score:'0'}</td>
              <td>{this.state.finalRoundExists?item.elite8Score:'0'}</td>
              <td>{this.state.finalRoundExists?item.final4Score:'0'}</td>
              <td>{this.state.finalRoundExists?item.finalScore:'0'}</td>
              </>
           }
           {this.state.isAdmin?<><td>{item.phone}</td><td>{item.email}</td></>:null}
            </tr>)
          }
        )}
          </table> </div></div>
         {/*<div id={styles.table1Div}>
      <table className={styles.table1} ref={ this.tableRef}>
        <tr id={styles.table1Tr1}>
          <th>Overall <br/>Rank</th>
          <th>RAM Name</th>
          <th>Flock Name</th>
          <tr/>
          <table/> 
          </div>*/}
      </div>
       <ToastContainer/>
       </>
    )
  }
}

export default TheMarchMadness