import React, { Component } from 'react'
import firebase from '../FirebaseClient'
import styles from './TheMarchMadness.module.scss'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
class WorldCup extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
    this.getAlert = this.getAlert.bind(this);
 }
  state={round1Arr:[],round2Arr:[],currentSelection:'groupStage',theItems:[],finalRoundExists:false,isAdmin:false,userId:'',overallArr:[],overallRoundExists:'',finalRoundArr:[],finalRoundMenu:'',theCount:''}

  componentDidMount=()=>{
    this.setState()
    //console.log('here march madness again agaiiiiiiin')
    //this.setState({theCount:this.props.theCount})
   // this.props.onClick()
    //return
   
    //this.props.setClick(this.getAlert);
    this.checkAuth()
  }
  getAlert() {
    alert('getAlert from Child');
  }
  checkAuth = () => {
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       var isAdmin=false
       userId=user.uid
       if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
        this.setState({isAdmin:true});isAdmin=true
       }
       this.setState({userId,userLoggedIn:true}) 
    this.getRound1Matches(isAdmin)
    this.getRound2Matches(isAdmin)
    this.getFinalRound(isAdmin)
    this.getOverall(isAdmin)
     }else{
    this.getRound1Matches(false)
    this.getRound2Matches(false)
    this.getFinalRound(false)
    this.getOverall(false)
     }
   })
 }
 getRound1Matches = async (isAdmin) => {
  const leadersRef = firebase.database().ref('/userBets/WorldCup/' + this.props.theEventKey + '/');
  const theDet2 = [];

  leadersRef.once('value', async (dataSnapshot) => {
    if (!dataSnapshot.exists()) return;

    const userPromises = [];

    dataSnapshot.forEach((data) => {
      const theId = data.key;

      // We create a "Task" for each user that returns their complete object
      const userTask = (async () => {
        const isTherData = await firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/" + this.props.theEventKey + "/bets/round1/").once('value');
        
        if (isTherData.exists()) {
          let theEmail = 'N/A';
          let thePhone = 'N/A';

          // 1. Fetch Admin Info if needed
          if (isAdmin) {
            const adminSnap = await firebase.database().ref('/users/' + theId + '/userData').once('value');
            if (adminSnap.exists()) {
              const adminData = adminSnap.val();
              theEmail = adminData.email || 'N/A';
              thePhone = adminData.phoneNo || 'N/A';
            }
          }

          // 2. Fetch Bet Details
          const detailsSnap = await firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/" + this.props.theEventKey + "/details/").once('value');
          
          if (detailsSnap.exists()) {
            const userBetData = detailsSnap.val();
            return {
              id: theId,
              flockName: userBetData.flockName,
              teamName: userBetData.teamName,
              bestPossibleScore: userBetData.round1BPS,
              score: userBetData.round1Score || 0,
              email: theEmail,
              phone: thePhone
            };
          }
        }
        return null; // Return null if user has no data so we can filter it out
      })();

      userPromises.push(userTask);
    });

    // Wait for ALL users to finish fetching their names, emails, and scores
    const results = await Promise.all(userPromises);
    
    // Filter out nulls and sort by score
    const finalArray = results
      .filter(item => item !== null)
      .sort((a, b) => b.score - a.score);

    this.setState({
      round1Arr: finalArray,
      theItems: finalArray,
      areMessagesAvailable: finalArray.length > 0
    });
    console.log('round1Arr',finalArray)
  });
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
    var leadersRef = firebase.database().ref('/userBets/WorldCup/'+this.props.theEventKey+'/')
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
          var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/"+this.props.theEventKey+"/details/")
          var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/"+this.props.theEventKey+"/bets/roundOf16/")
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
              var roundOf16BPS=userBetData.roundOf16BPS,quarterFinalsBPS=userBetData.quarterFinalsBPS
              var semiFinalsBPS=userBetData.semiFinalsBPS,finalRoundBPS=userBetData.finalRoundBPS
              var roundOf16Score=userBetData.roundOf16Score,quarterFinalsScore=userBetData.quarterFinalsScore
              var semiFinalsScore=userBetData.semiFinalsScore,finalRoundScore=userBetData.finalRoundScore
              var theMenu=userBetData.theMenu

            
             
              if(!roundOf16BPS||roundOf16BPS===undefined||roundOf16BPS===null){roundOf16BPS=0}
              if(!quarterFinalsBPS||quarterFinalsBPS===undefined||quarterFinalsBPS===null){quarterFinalsBPS=0}
              if(!semiFinalsBPS||semiFinalsBPS===undefined||semiFinalsBPS===null){semiFinalsBPS=0}
              if(!finalRoundBPS||finalRoundBPS===undefined||finalRoundBPS===null){finalRoundBPS=0}
              if(!roundOf16Score||roundOf16Score===undefined||roundOf16Score===null){roundOf16Score=0}
              if(!quarterFinalsScore||quarterFinalsScore===undefined||quarterFinalsScore===null){quarterFinalsScore=0}
              if(!semiFinalsScore||semiFinalsScore===undefined||semiFinalsScore===null){semiFinalsScore=0}
              if(!finalRoundScore||finalRoundScore===undefined||finalRoundScore===null){finalRoundScore=0}
              
             
              if(currentRound==='roundOf16'){BPS=roundOf16BPS}if(currentRound==='quarterFinals'){BPS=quarterFinalsBPS}
              if(currentRound==='semiFinals'){BPS=semiFinalsBPS}if(currentRound==='finalRound'){BPS=finalRoundBPS}

              var score=Number(roundOf16Score)+Number(quarterFinalsScore)+Number(semiFinalsScore)+Number(finalRoundScore)
              score=Number(score).toFixed(2)
              var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
                email:theEmail,phone:thePhone,roundOf16BPS:roundOf16BPS,quarterFinalsBPS:quarterFinalsBPS,finalRoundBPS:finalRoundBPS,
                roundOf16Score:roundOf16Score,quarterFinalsScore:quarterFinalsScore,semiFinalsScore:semiFinalsScore,semiFinalsBPS:semiFinalsBPS,
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
    var leadersRef = firebase.database().ref('/userBets/WorldCup/'+this.props.theEventKey)
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
          var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/"+this.props.theEventKey+"/details/")
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
              var roundOf16Score=userBetData.roundOf16Score,quarterFinalsScore=userBetData.quarterFinalsScore
              var semiFinalsScore=userBetData.semiFinalsScore,finalRoundScore=userBetData.finalRoundScore
              
              if(!round1Score||round1Score===undefined||round1Score===null){round1Score=0}
              if(!round2Score||round2Score===undefined||round2Score===null){round2Score=0}
              if(!roundOf16Score||roundOf16Score===undefined||roundOf16Score===null){roundOf16Score=0}
              if(!quarterFinalsScore||quarterFinalsScore===undefined||quarterFinalsScore===null){quarterFinalsScore=0}
              if(!semiFinalsScore||semiFinalsScore===undefined||semiFinalsScore===null){semiFinalsScore=0}
              if(!finalRoundScore||finalRoundScore===undefined||finalRoundScore===null){finalRoundScore=0}
              //console.log('scorees',theId,round1Score,round2Score,roundOf16Score,quarterFinalsScore,semiFinalsScore,finalRoundScore)
             
              var score=Number(round1Score)+Number(round2Score)+Number(roundOf16Score)+Number(quarterFinalsScore)+Number(semiFinalsScore)+Number(finalRoundScore)
              score=Number(score).toFixed(2)
              var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
                round1Score:round1Score,round2Score:round2Score,email:theEmail,phone:thePhone,
                roundOf16Score:roundOf16Score,quarterFinalsScore:quarterFinalsScore,semiFinalsScore:semiFinalsScore,
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
    var leadersRef = firebase.database().ref('/userBets/WorldCup/'+this.props.theEventKey+'/')
   // var leadersRef = firebase.database().ref('/userBets/scoreBoards/WorldCup/'+this.props.theEventKey+'/round1/')
    var i=0,theDet2=[]
    leadersRef.once('value', dataSnapshot => {
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theDet={}
        //console.log('the uid',theId)
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/"+this.props.theEventKey+"/details/")
        var isTherData=firebase.database().ref('/users/').child(theId).child("/ramData/events/WorldCup/"+this.props.theEventKey+"/bets/round2/")
        isTherData.once('value', dataSnapshot => {
          if(dataSnapshot.exists()){
        var theEmail='',thePhone=''
      
        userInfoDb.once('value', dataSnapshot => {
           if(dataSnapshot.exists()){
            var userBetData=dataSnapshot.val()
            var theDet={id:theId,flockName:userBetData.flockName,teamName:userBetData.teamName,
              bestPossibleScore:userBetData.round2BPS,score:userBetData.round2Score,email:theEmail,phone:thePhone}
              theDet2.push(theDet)
           //   console.log('ikoooooooooooooooo 1111',theDet2)
            this.setState({round2Arr:theDet2,theItems:theDet2})
              if(this.state.isAdmin){
          userInfoDb2.once('value',dataSnapshot=>{
            var theD=dataSnapshot.val()
            if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
            theDet['email']=theD.email
            if(theD.phoneNo){thePhone=theD.phoneNo}else{thePhone='N/A'}
            if(theD.email){theEmail=theD.email}else{theEmail='N/A'}
          })}
           }else{
            //console.log('hakunaaaaaaaaaaaaa 11111')
           }
        })
      }
      })
        if(theCount===i){
          var sort=this.state.round2Arr.sort((a, b) => b.score - a.score )
          this.setState({round2Arr:sort})
          console.log('round 2',sort)
          //this.setState({round1Arr:theDet2})
        }
      })
    })
  }
 getCurrentRound=(round)=>{
    if(round==='groupStage'){
    this.setState({theItems:this.state.round1Arr})
    }
    if(round==='roundOf32'){
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
    //console.log('sortDataaaa',sortData)
    //var sortData=this.state.theItems.sort((a, b) => b.currentScore - a.currentScore )
    return (
      <>
      <div>
        <div className={styles.eve2Div}>
            <p id={this.state.currentSelection==='groupStage'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('groupStage')}>Group Stage</p>
            <p id={this.state.currentSelection==='roundOf32'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('roundOf32')}>Round of 32</p>
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
          {this.state.currentSelection==='groupStage'||this.state.currentSelection==='roundOf32'?
          <><th>Best Possible <br/>Score</th>
          <th>Current Score</th></>:null}
          {this.state.currentSelection==='finalRound'?
          <>
          <th>Cumulative <br/>Score</th>
          <th>Round of 16</th>
          <th>Quarter Finals</th>
          <th>Semi Finals</th>
          <th>Finals</th></>:null}
          {this.state.currentSelection==='overall'?
          <>
          <th>Cumulative <br/>Score</th>
          <th>Group Stage</th>
          <th>Round of 32</th>
          <th>Round of 16</th>
          <th>Quarter Finals</th>
          <th>Semi Finals</th>
          <th>Finals</th></>:null}
          {this.state.isAdmin?<><th>Phone</th><th>Email</th></>:null}
          </tr>
          {sortData.map((item, index) => {
            var BPS=''
            if(this.state.currentSelection==='finalRound'){
              //console.log('this.state.finalRoundMenu',this.state.finalRoundMenu)
             if(this.state.finalRoundMenu==='roundOf16'){BPS=item.roundOf16BPS}if(this.state.finalRoundMenu==='quarterFinals'){BPS=item.quarterFinalsBPS}
             if(this.state.finalRoundMenu==='semiFinals'){BPS=item.semiFinalsBPS}if(this.state.finalRoundMenu==='finalRound'){BPS=item.finalRoundBPS}}
            return(
            <tr key={index} id={styles.table1Tr2} style={{backgroundColor:item.id===this.state.userId?'#292f51': index===0?'#CB1E31':null,color:item.id===this.state.userId?'white': index===0?'#ffffff':'#292f51'}}>
            <td>{index+1}</td>
            <td>{item.teamName}</td>
            <td>{item.flockName}</td>
            {this.state.currentSelection==='groupStage'||this.state.currentSelection==='roundOf32'?
            <><td>{item.bestPossibleScore}</td>
              <td>{item.score}</td></>:null}
            {this.state.currentSelection==='finalRound'?
              <>
              
              <td>{this.state.finalRoundExists?item.score:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.roundOf16Score:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.quarterFinalsScore:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.semiFinalsScore:'0.00'}</td>
              <td>{this.state.finalRoundExists?item.finalRoundScore:'0.00'}</td>
              </>:null
           }
           {this.state.currentSelection==='overall'?
              <>
              <td>{item.score?item.score:'0.00'}</td>
              <td>{item.round1Score?item.round1Score:'0.00'}</td>
              <td>{item.round2Score?item.round2Score:'0.00'}</td>
              <td>{item.roundOf16Score?item.roundOf16Score:'0.00'}</td>
              <td>{item.quarterFinalsScore?item.quarterFinalsScore:'0.00'}</td>
              <td>{item.semiFinalsScore?item.semiFinalsScore:'0.00'}</td>
              <td>{item.finalRoundScore?item.finalRoundScore:'0.00'}</td>
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
export default WorldCup