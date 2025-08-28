import React, { Component } from 'react'
import firebase from '../FirebaseClient'
import styles from './TheMarchMadness.module.scss'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
class TheMarchMadness extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
    this.getAlert = this.getAlert.bind(this);
 }
  state={week1RoundArr:[],week2RoundArr:[],week3RoundArr:[],currentSelection:'week1',theItems:[],finalRoundExists:false,isAdmin:false,userId:'',overallArr:[],overallRoundExists:'',finalRoundArr:[],finalRoundMenu:'',theCount:''}

  componentDidMount=()=>{
    this.setState()
    console.log('here march madness again agaiiiiiiin',this.props)
    //this.setState({theCount:this.props.theCount})
   // this.props.onClick()
    //return
    this.getweek1Matches()
    this.getweek2Matches()
    this.getRound3Matches()
    this.getOverall()
    this.checkAuth()
 
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
  getweek1Matches=()=>{
    console.log('craaaaaaaaaaaaaaaaaaaaaaaazy',this.props.theEventKey)
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/'+this.props.theEventKey+'/')
   // var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/week1/')
    var i=0,theDet2=[]
    leadersRef.once('value', dataSnapshot => {
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
        console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/details/")
        var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/bets/week1Round/")
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
              bestPossibleScore:userBetData.week1RoundBPS,score:userBetData.week1RoundScore,email:theEmail,phone:thePhone}
              theDet2.push(theDet)
              console.log('ikoooooooooooooooo 1111',theDet2)
            this.setState({week1RoundArr:theDet2,theItems:theDet2})
           }else{
            console.log('hakunaaaaaaaaaaaaa 11111')
           }
        })
      }
      })
        if(theCount===i){
          var sort=this.state.week1RoundArr.sort((a, b) => b.score - a.score )
          this.setState({week1RoundArr:sort})
          //console.log('finaaal',theDet2)
          //this.setState({week1RoundArr:theDet2})
        }
      })
    })
  }
    getweek2Matches=()=>{
    console.log('craaaaaaaaaaaaaaaaaaaaaaaazy',this.props.theEventKey)
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/'+this.props.theEventKey+'/')
   // var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/week1/')
    var i=0,theDet2=[]
    leadersRef.once('value', dataSnapshot => {
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
        console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/details/")
        var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/bets/week2Round/")
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
              bestPossibleScore:userBetData.week2RoundBPS,score:userBetData.week2RoundScore,email:theEmail,phone:thePhone}
              theDet2.push(theDet)
              console.log('ikoooooooooooooooo 1111',theDet2)
            this.setState({week2RoundArr:theDet2})
           }else{
            console.log('hakunaaaaaaaaaaaaa 11111')
           }
        })
      }
      })
        if(theCount===i){
          var sort=this.state.week2RoundArr.sort((a, b) => b.score - a.score )
          this.setState({week2RoundArr:sort})
          //console.log('finaaal',theDet2)
          //this.setState({week1RoundArr:theDet2})
        }
      })
    })
  }
      getRound3Matches=()=>{
    console.log('craaaaaaaaaaaaaaaaaaaaaaaazy',this.props.theEventKey)
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/'+this.props.theEventKey+'/')
   // var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+this.props.theEventKey+'/week1/')
    var i=0,theDet2=[]
    leadersRef.once('value', dataSnapshot => {
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
        console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/details/")
        var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/bets/week2Round/")
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
              bestPossibleScore:userBetData.week3RoundBPS,score:userBetData.week3RoundScore,email:theEmail,phone:thePhone}
              theDet2.push(theDet)
              console.log('ikoooooooooooooooo 1111',theDet2)
            this.setState({week3RoundArr:theDet2})
           }else{
            console.log('hakunaaaaaaaaaaaaa 11111')
           }
        })
      }
      })
        if(theCount===i){
          var sort=this.state.week2RoundArr.sort((a, b) => b.score - a.score )
          this.setState({week2RoundArr:sort})
          //console.log('finaaal',theDet2)
          //this.setState({week1RoundArr:theDet2})
        }
      })
    })
  }
    getOverall=()=>{
    var i=0,theDet2=[]
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/'+this.props.theEventKey)
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
        //  console.log('the uid',theId)
          var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
          var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/"+this.props.theEventKey+"/details/")
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
              var week1RoundScore=userBetData.week1RoundScore,week2RoundScore=userBetData.week2RoundScore,week3RoundScore=userBetData.week3RoundScore
    
              if(!week1RoundScore||week1RoundScore===undefined||week1RoundScore===null){week1RoundScore=0}
              if(!week2RoundScore||week2RoundScore===undefined||week2RoundScore===null){week2RoundScore=0}
              if(!week3RoundScore||week3RoundScore===undefined||week3RoundScore===null){week3RoundScore=0}

              var score=Number(week1RoundScore)+Number(week2RoundScore)+Number(week3RoundScore)
              score=Number(score).toFixed(2)
              var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
                week1RoundScore:week1RoundScore,week2RoundScore:week2RoundScore,email:theEmail,phone:thePhone,
                week3RoundScore:week3RoundScore,score:score}
                theDet2.push(theDet)
               // console.log('ikoooooooooooooooo 1111',theDet2)
              this.setState({overallArr:theDet2})
             }else{
              //console.log('hakunaaaaaaaaaaaaa 11111')
             }
          })
          if(theCount===i){
            var sort=this.state.overallArr.sort((a, b) => b.score - a.score )
            this.setState({overallArr:sort})
            console.log('hakunaaaaaaaaaaaaa overallll',sort)
          }
        })
      }

    })
  }
 getCurrentRound=(round)=>{
    
    if(round==='week1'){
    this.setState({theItems:this.state.week1RoundArr})
    }
    if(round==='week2'){
      this.setState({theItems:this.state.week2RoundArr})
    }
    if(round==='week3'){
      this.setState({theItems:this.state.week3RoundArr})
      console.log('it is final round',this.state.week3RoundArr)
    }
    if(round==='overall'){
      this.setState({theItems:this.state.overallArr})
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
            <p id={this.state.currentSelection==='week1'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('week1')}>WEEK 2</p>
            <p id={this.state.currentSelection==='week2'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('week2')}>WEEK 3</p>
            <p id={this.state.currentSelection==='week3'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('week3')}>WEEK 4</p>
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
          {this.state.currentSelection==='week1'||this.state.currentSelection==='week2'||this.state.currentSelection==='week3'?
          <><th>Best Possible <br/>Score</th>
          <th>Current Score</th></>:null}
          {this.state.currentSelection==='overall'?
          <>
          <th>Cumulative <br/>Score</th>
          <th>WEEK 1</th>
          <th>WEEK 2</th>
          <th>WEEK 3</th>
        </>:null}
          {this.state.isAdmin?<><th>Phone</th><th>Email</th></>:null}
          </tr>
          {sortData.map((item, index) => {
            return(
            <tr key={index} id={styles.table1Tr2} style={{backgroundColor:item.id===this.state.userId?'#292f51': index===0?'#CB1E31':null,color:item.id===this.state.userId?'white': index===0?'#ffffff':'#292f51'}}>
            <td>{index+1}</td>
            <td>{item.teamName}</td>
            <td>{item.flockName}</td>
            {this.state.currentSelection==='week1'||this.state.currentSelection==='week2'||this.state.currentSelection==='week3'?
            <><td>{item.bestPossibleScore?item.bestPossibleScore:'N/A'}</td>
              <td>{item.score}</td></>:null}
           
           {this.state.currentSelection==='overall'?
              <>
              <td>{item.score?item.score:'0.00'}</td>
              <td>{item.week1RoundScore?item.week1RoundScore:'0.00'}</td>
              <td>{item.week2RoundScore?item.week2RoundScore:'0.00'}</td>
              <td>{item.week3RoundScore?item.week3RoundScore:'0.00'}</td>
              </>:null
           }
           {this.state.isAdmin?<><td>{item.phone}</td><td>{item.email}</td></>:null}
            </tr>)
          }
        )}
          </table> </div></div>
      </div>
       <ToastContainer/>
       </>
    )
  }
}
export default TheMarchMadness