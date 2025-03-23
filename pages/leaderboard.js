import React, { Component } from 'react'
import styles from "@/styles/Leaderboard.module.scss";
import firebase from '../components/FirebaseClient'
import { MdOutlineFolderOff } from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
import TheMarchMadness from '../components/LeaderBoards/TheMarchMadness'
import { DownloadTableExcel } from 'react-export-table-to-excel';
var theItems=[]
/*const importList = [
    { id: 1, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 2, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 3, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 4, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 5, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 6, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 7, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 8, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 9, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 10, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 11, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 12, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 13, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 14, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 15, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 16, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    ]*/
//var scoreBoardArr
class leaderboard extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
 }
  state={openModal:false,openModal2:false,openModal3:false,openModal4:false,theItems:[],isThereNullData:false,allGames:[],showProgressBar:false,isAdmin:false,endTime:'',isEventExpired:'',
    dataAvailable:false,sportType:'',theEventKey:'',theEventTitle:'',userLoggedIn:false,nullData:[],theEvent:'',theTime:'',isTherNormalData:false,eventStartTime:'',currentSelection:''}
  componentDidMount=()=>{
     //this.getScoreBoardData()
     this.showProgressBar()
     this.checkAuth()
     //this.getUsers()
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
       if(userId){this.checkUpcomingPastGames(userId)}
       
     }else{
      this.setState({userLoggedIn:false})
      //this.getGamesInfo()
      this.checkUpcomingPastGames(userId)
     }
   })
 }
 getUsers=async(userId)=>{
  //return
  var theUsers=[],i=0
  var userInfoDb=firebase.database().ref('/users/')//.orderByChild('userData')
  await  userInfoDb.once('value',dataSnapshot=>{
    console.log('theCountttt',dataSnapshot.val())
    var theCount=dataSnapshot.numChildren()
    var i=0
    console.log('theCountttt',theCount)
    dataSnapshot.forEach((data) => {
      i++
      console.log('users Data',data.val().userData)
      theUsers.push(data.val().userData)
      if(theCount===i){
        console.log('the users',theUsers)
      }
    })
  })
 }
 checkForSelectedEvent=async(sportType,theEventKey,theTime)=>{
  var userInfoDb=firebase.database().ref('/theEvents/eventToShowHomePage/')
  await  userInfoDb.once('value',dataSnapshot=>{
    if (!dataSnapshot.val()) {
      this.getScoreBoardData(sportType,theEventKey,theTime)
      return
    }
    var theData=dataSnapshot.val()
    var endTime=theData.endTime
    var theEventKey=theData.id
    var theTime=theData.time
    var theEventTitle=theData.title
    var sportType = theData.sportType
    var currentSelection = theData.currentSelection
    //currentSelection='quarterFinals'  
    //var theItem={id:key,time:time,title:title,sportType: sportType, endTime: endTime}
    this.setState({theEventTitle, theEventKey, theTime,endTime,sportType,currentSelection},()=>{
      console.log('items',theEventTitle,theEventKey,theTime,endTime,sportType)
      this.getScoreBoardData(sportType,theEventKey,theTime)
      
      
    })
    console.log('theData000000',theData)
  })
}
 checkUpcomingPastGames=async(userId)=>{
  //return
  //this.setState({isEventExpired:false})
  var userInfoDb=firebase.database().ref('/theEvents/eventsIds')
  var i=0,upcomingGames=[],pastGames=[],allGames=[]
  var nowDate= await new Date().getTime()
 // console.log('nowDate',nowDate)
  //return
  await  userInfoDb.once('value',dataSnapshot=>{
    var theCount=dataSnapshot.numChildren()
    var i=0
    //console.log('theCountttt',theCount)
    dataSnapshot.forEach((data) => {
      i++
      var pastG={},upcomingG={}
      var key=data.key
      var time=data.val().time
      var title=data.val().title
      var sportType=data.val().sportType
      var endTime=data.val().endTime
      var currentSelection = data.val().currentSelection
      //currentSelection='quarterFinals'
      //console.log('value',time,dataSnapshot.val())
      //console.log('nowDate',nowDate,'time',time,'title',title)
      
      var theItem={id:key,time:time,title:title,sportType:sportType,endTime:endTime,currentSelection:currentSelection}
      allGames.push(theItem)

      //if(nowDate>(endTime+86400000)){this.setState({isEventExpired:true})}
     // else{this.setState({isEventExpired:false})}
      
      if(theCount===i){
        var theEventTitle='',theEventKey='',sportType='',theTime=''
        if(allGames.length>0){
          allGames=allGames.sort(function(a, b){return b.endTime - a.endTime});
          //console.log('teeeeeee',allGames)
          theEventTitle=allGames[0]['title'];sportType=allGames[0]['sportType'],theEventKey=allGames[0]['id'],theTime=allGames[0]['time'],currentSelection=allGames[0]['currentSelection']
          var firstEndTime=allGames[0]['endTime']
          if(nowDate>(firstEndTime+86400000)){this.setState({isEventExpired:true})}
          else{this.setState({isEventExpired:false})}
          this.setState({allGames,theEventTitle,theEventKey,sportType,theTime,currentSelection},()=>{
          this.checkForSelectedEvent(sportType,theEventKey,theTime)
          console.log('sportType555555555',sportType)
            //this.getNullScoreBoardData(sportType,theEventKey)
          })
        }
        
     
      }
      
        /*if(nowDate>time){
          pastG={id:key,time:time,title:title,sportType:sportType}
          pastGames.push(pastG)
        }
        if(nowDate<time){
          upcomingG={id:key,time:time,title:title,sportType:sportType}
          upcomingGames.push(upcomingG)
        }*/
        //console.log('upcomingGames',upcomingGames)
        //console.log('pastGames',pastGames)
    });
    })
    /*var theEventTitle='',theEventKey='',sportType=''
    if(pastGames.length>0){pastGames=pastGames.sort(function(a, b){return a.time - b.time});}
    if(upcomingGames.length>0){upcomingGames=upcomingGames.sort(function(a, b){return a.time - b.time});theEventTitle=upcomingGames[0]['title'];sportType=upcomingGames[0]['sportType'],theEventKey=upcomingGames[0]['id']}
    //console.log('theEventKey',sportType,theEventKey,theEventTitle)
    await this.setState({pastGames,upcomingGames,theEventTitle,theEventKey,sportType},()=>{
      this.getScoreBoardData(sportType,theEventKey)
      //this.getNullScoreBoardData(sportType,theEventKey)
    })*/
   
} 
   getNullScoreBoardData=(sportType,theEventKey)=>{
    //console.log('At null provider 005',sportType,theEventKey)
    var theAllData=[],i=0
    var dbLink="/userBets/"+sportType+'/'+theEventKey+'/' 
    var scoreBoardDb=firebase.database().ref(dbLink)
    scoreBoardDb.once('value',dataSnapshot=>{
      if(!dataSnapshot.val()){
      this.setState({dataAvailable:false,isTherNormalData:false,isThereNullData:false})
      this.notify('No data to show at the moment');return}
      if(!dataSnapshot.val())return
      this.setState({isThereNullData:true,dataAvailable:true,isTherNormalData:false})
      var scoreBoardNo=dataSnapshot.numChildren()
      dataSnapshot.forEach((data,index) => {
        i++
      var theId=data.key
      var theData=data.val()
      
      //console.log('theId',theId,'theData',theData)
      var userInfoDb=firebase.database().ref('/users/').child(theId).child('/ramData/events/'+sportType+'/'+theEventKey+'/details/')
      var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
      var theDet={}
      if(this.state.isAdmin){
      userInfoDb2.once('value',dataSnapshot=>{
        var theD=dataSnapshot.val()
        if(theD.phoneNo){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
        theDet['email']=theD.email
      })}
      userInfoDb.once('value',dataSnapshot=>{
        //console.log('here at nulll',scoreBoardNo,i,dataSnapshot.val())
       if(!dataSnapshot.val())return
          var data=dataSnapshot.val()
           //theUserData={id:theId,flockName:data.flockName,teamName:data.teamName,bestPossibleScore:data.bestPossibleScore,currentScore:0.00}
          
           theDet['id']=theId
           theDet['flockName']=data.flockName
           theDet['teamName']=data.teamName
           theDet['bestPossibleScore']=data.bestPossibleScore
           theDet['currentScore']=0.00
           if(sportType==="NCAAF"){
            var theCurrentScore=Number(userBetData.firstRoundScore)+Number(userBetData.quarterFinalsScore)+Number(userBetData.semiFinalsScore)+Number(userBetData.finalsScore)
            theDet['finalsScore']=0.00
            theDet['firstRoundScore']=0.00
            theDet['quarterFinalsScore']=0.00
            theDet['semiFinalsScore']=0.00
            theDet['currentSelection']=data.currentPick
          }
          if(sportType==="NFL"){
            theDet['superBowlScore']=0.00
            theDet['wildCardScore']=0.00
            theDet['divisionalRoundScore']=0.00
            theDet['conferenceChampionshipScore']=0.00
            theDet['currentSelection']=data.currentPick
          }
          theAllData.push(theDet)
          if(scoreBoardNo===i){
            this.setState({nullData:theAllData,showProgressBar:false})
           // console.log('theAllData 0005',theAllData)
          }
        })
       
      })
      
    })
   }
  getScoreBoardData=(sportType,theEventKey,theTime)=>{
    if(sportType==='NCAAB'){ this.setState({dataAvailable:true});return}
    if(!this.state.userLoggedIn)return
    this.setState({eventStartTime:theTime,sportType})
    console.log('curentttttttt 500000',sportType,theEventKey,theTime)
    var dbLink=''
    if(sportType==='NCAAB'){
      if(this.state.currentSelection==='round1'){
      dbLink="/userBets/scoreBoards/"+sportType+'/'+theEventKey+'/round1/'
      } 
      if(this.state.currentSelection==='round2'){
        dbLink="/userBets/scoreBoards/"+sportType+'/'+theEventKey+'/round2/'
        } 
    }else{
      dbLink="/userBets/scoreBoards/"+sportType+'/'+theEventKey+'/' 
    }
   //ole.log('the db link',dbLink)
    //return
    //var dbLink2="/userBets/scoreBoards/ramUfc/ufc-310-December72024/"
    var scoreBoardDb=firebase.database().ref(dbLink)
   var data3=[]
    scoreBoardDb.once('value',dataSnapshot=>{
      console.log('dataSnapshot',dataSnapshot.exists())
      if(!dataSnapshot.val()){
        console.log('hapa hakuna data 22222')
        
        var nowMillis=new Date().getTime()
        if((theTime-nowMillis)<1200000||this.state.isAdmin){
          console.log('hapa hakuna data 55555555')
          this.getNullScoreBoardData(sportType,theEventKey)
        }else{
          console.log('hapa hakuna data 666666666')
          this.setState({dataAvailable:false,isTherNormalData:false,isThereNullData:false})
          this.notify('No data to show at the moment')
        }
      }else{
        console.log('hapa hakuna data 333333')
      this.setState({dataAvailable:true,isTherNormalData:true,isThereNullData:false})
      var i=0,allData=[]
      var scoreBoardNo=dataSnapshot.numChildren()
      //console.log('the scoreBoardNo',scoreBoardNo)
      dataSnapshot.forEach((data,index) => {
        i++
        var theId=data.key
        var theData=data.val()
        if(!theId)return
       console.log('the iddddd',theId)
      // console.log('the theData',theData)
        var theDet={}
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        if(this.state.isAdmin){
        userInfoDb2.once('value',dataSnapshot=>{
          console.log('theD.email',theId)
          
          var theD=dataSnapshot.val()
          theDet['phone']=theD.phoneNo
         // console.log('theD.email',theD.email)
          //if(theD.phoneNo!==null){theDet['phone']=theD.phoneNo}else{theDet['phone']='N/A'}
          //if(theD.email!==null){theDet['email']=theD.phoneNo}else{theDet['email']='N/A'}
          theDet['email']=theD.email
        })}
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/"+sportType+"/"+theEventKey+"/details/")
        userInfoDb.once('value',dataSnapshot=>{
         
            var userBetData=dataSnapshot.val()
           // //console.log('dataSnapshot.val()',dataSnapshot.val())
           
          theDet['id']=theId
          theDet['flockName']=userBetData.flockName
          theDet['teamName']=userBetData.teamName
          theDet['bestPossibleScore']=userBetData.bestPossibleScore
          if(sportType==="NCAAB"){
            theDet['round1Score']=userBetData.round1Score
            theDet['round2Score']=userBetData.round2Score
            theDet['finalRoundScore']=userBetData.finalRoundScore
            theDet['currentPick']=userBetData.currentPick

            theDet['round1BPS']=userBetData.round1BPS
            theDet['round2BPS']=userBetData.round2BPS
            theDet['finalRoundBPS']=userBetData.finalRoundBPS
          }
          if(sportType==="NCAAF"){
            var theCurrentScore=Number(userBetData.firstRoundScore)+Number(userBetData.quarterFinalsScore)+Number(userBetData.semiFinalsScore)+Number(userBetData.finalsScore)
            theCurrentScore=theCurrentScore.toFixed(2)
            theDet['finalsScore']=userBetData.finalsScore
            theDet['firstRoundScore']=userBetData.firstRoundScore
            theDet['quarterFinalsScore']=userBetData.quarterFinalsScore
            theDet['semiFinalsScore']=userBetData.semiFinalsScore
            theDet['currentScore']=theCurrentScore,
            theDet['currentSelection']=userBetData.currentPick
          }
          else if(sportType==="NFL"){
            var theCurrentScore=Number(userBetData.wildCardScore)+Number(userBetData.divisionalRoundScore)+Number(userBetData.conferenceChampionshipScore)+Number(userBetData.superBowlScore)
            theCurrentScore=theCurrentScore.toFixed(2)
            theDet['superBowlScore']=userBetData.superBowlScore
            theDet['wildCardScore']=userBetData.wildCardScore
            theDet['divisionalRoundScore']=userBetData.divisionalRoundScore
            theDet['conferenceChampionshipScore']=userBetData.conferenceChampionshipScore
            theDet['currentScore']=theCurrentScore,
            theDet['currentSelection']=userBetData.currentPick
          }else{
            theDet['currentScore']=theData
          }
          var theDet4={id:theId,currentScore:theData,flockName:userBetData.flockName,teamName:userBetData.teamName,bestPossibleScore:userBetData.bestPossibleScore}
          data3.push(theDet4)
          allData.push(theDet)
          this.setState({theItems:allData})
          
          //console.log('all data checked',allData)
        })
        
        if(i===scoreBoardNo){
          
         // console.log('all data checked',allData)
          this.setState({showProgressBar:false})
         // console.log('all data',allData)
         // console.log('hureeeeeeeeeeeeeeeeeeeee')
        }
      })}
    })
  }
  openModal3 = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({openModal:!this.state.openModal})
  }
  preventClose = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  selectChange = async (e) => {
    var value = e.target.value
  }
  inputChange = async (e) => {
    var value = e.target.value
  }

  loadOtherEvents=async(sportType,theEventKey,theTime,theEventTitle,currentSelection,item,isExpired)=>{
    console.log('whole item',item)
    this.showProgressBar()
    if (navigator.onLine === false) {
      this.notify('No internet! please check your internet connection')
      return
    }
    if(!this.state.userLoggedIn){
      this.notify('Please Log In to continue')
    }else{
      this.setState({theEventKey,theEventTitle,currentSelection,isEventExpired:isExpired,sportType})
      this.getScoreBoardData(sportType,theEventKey,theTime)
    }
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
  getCurrentRound=(round)=>{
    console.log('roundddd',round)
    this.setState({currentSelection:round})
    return
    if(round==='round1'){
      this.setState({ramsInMyFlockArr:this.state.round1Arr})
    }
    if(round==='round2'){
      this.setState({ramsInMyFlockArr:this.state.round2Arr})
    }
    if(round==='finalRound'){
      this.setState({ramsInMyFlockArr:this.state.round2Arr})
    }
  }
  itemComponent=(theItems)=>{
   // console.log('theItems rrrr',theItems)
    var BSPTitle=''
    if(this.state.sportType==='NCAAB'&&this.state.currentSelection==='round1'){
      theItems=theItems.sort((a, b) => b.round1Score - a.round1Score)
    }
    if(this.state.sportType==='NCAAB'&&this.state.currentSelection==='round2'){
      theItems=theItems.sort((a, b) => b.round2Score - a.round2Score)
    }
    if(this.state.currentSelection==='firstRound'){BSPTitle='First Round'}
    if(this.state.currentSelection==='quarterFinals'){BSPTitle='Quarter Finals'}
    if(this.state.currentSelection==='semiFinals'){BSPTitle='Semi Finals'}
    if(this.state.currentSelection==='finals'){BSPTitle='Finals'}

    if(this.state.currentSelection==='wildCard'){BSPTitle='Wild Card'}
    if(this.state.currentSelection==='divisionalRound'){BSPTitle='Divisional'}
    if(this.state.currentSelection==='conferenceChampionship'){BSPTitle='Conference'}
    if(this.state.currentSelection==='superBowl'){BSPTitle='Super Bowl'}

    if(this.state.currentSelection==='round1'){BSPTitle='Round 1'}
    if(this.state.currentSelection==='round2'){BSPTitle='Round 2'}
    if(this.state.currentSelection==='finalRound'){BSPTitle='Final'}
    return(
    <div id={styles.table1Div}>
      <table className={styles.table1} ref={ this.tableRef}>
        <tr id={styles.table1Tr1}>
          <th>Overall <br/>Rank</th>
          <th>RAM Name</th>
          <th>Flock Name</th>
          {this.state.sportType!=='NCAAB'?<th>{this.state.sportType==='NCAAF'||this.state.sportType==='NFL'?'Cumulative':'Current'}<br/>Score</th>:null}
          {this.state.sportType==='NCAAF'||this.state.sportType==='NFL'||this.state.sportType==='NCAAB'?null:<th>Best Possible<br/>Score</th>}
          {this.state.sportType==='NCAAF'?
           <>
           {this.state.isEventExpired?<th>Best Possible<br/>Score</th>:<th>Best Score<br/>{' '+BSPTitle}</th>}
           <th>First Round<br/>Score</th>
           <th>Quarter Finals</th>
           <th>Semi Finals<br/></th>
           <th>Finals</th>
           </>
          :null}
          {this.state.sportType==='NCAAB'?
           <>
           <th>Best Possible<br/> Score</th>
           <th>Current<br/>Score</th>
           {/*<th>Round 2<br/>Score</th>
           <th>Final<br/>Round</th>*/}
           </>
          :null}
          {this.state.sportType==='NFL'?
           <>
           {this.state.isEventExpired?<th>Best Possible<br/>Score</th>:<th>Best Score<br/>{' '+BSPTitle}</th>}
           <th>Wild Card</th>
           <th>Divisional</th>
           <th>Conference<br/></th>
           <th>Super Bowl</th>
           </>
          :null}
           {this.state.isAdmin?<><th>Phone</th><th>Email</th></>:null}
        </tr>
        {theItems.map((item, index) => {
          var theScore='',theBPS=''
         // console.log('item66556',item)
          if(this.state.currentSelection==='round1'){theScore=item.round1Score,item.round1BPS?theBPS=item.round1BPS:theBPS=0}
          if(this.state.currentSelection==='round2'){theScore=item.round2Score,item.round2BPS?theBPS=item.round2BPS:theBPS=0}
          if(this.state.currentSelection==='finalRound'){theScore=item.finalRoundScore,item.finalRoundBPS?theBPS=item.finalRoundBPS:theBPS=0}
          return (
            <tr key={index} id={styles.table1Tr2} style={{backgroundColor:item.id===this.state.userId?'#292f51':null,color:item.id===this.state.userId?'white':'#292f51'}}>
              <td>{index+1}</td>
              <td>{item.teamName}</td>
              <td>{item.flockName}</td>

              {this.state.sportType!=='NCAAB'?<td>{item.currentScore}</td>:null}

              


              {this.state.sportType==='NCAAF'||this.state.sportType==='NCAAB'||this.state.sportType==='NFL'?null:<td>{this.state.isEventExpired?item.currentScore:item.bestPossibleScore}</td>}
              {this.state.sportType==='NCAAF'?
              <>
              {this.state.isEventExpired?<td>{item.currentScore}</td>:
              <td>{item.currentSelection===this.state.currentSelection?item.bestPossibleScore:'0.00'}</td>}
              <td>{item.firstRoundScore}</td>
              <td>{item.quarterFinalsScore}</td>
              <td>{item.semiFinalsScore}</td>
              <td>{item.finalsScore}</td>
              </>:null}
              {this.state.sportType==='NFL'?
              <>
              {this.state.isEventExpired?<td>{item.currentScore}</td>:
              <td>{item.currentSelection===this.state.currentSelection?item.bestPossibleScore:'0.00'}</td>}
              <td>{item.wildCardScore}</td>
              <td>{item.divisionalRoundScore}</td>
              <td>{item.conferenceChampionshipScore}</td>
              <td>{item.superBowlScore}</td>
              </>:null}
              {this.state.sportType==='NCAAB'?
              <>
              <td>{theBPS}</td>
              <td>{theScore}</td>
              {/*<td>{item.round2Score}</td>
              <td>{item.finalRoundScore}</td>*/}
              </>
              :null}
              {this.state.isAdmin?<><td>{item.phone}</td><td>{item.email}</td></>:null}
            </tr>
            )
        })}
      </table>
      </div>)
  }
    render() {
      var theItems=[]
      var noData=false 
      var sortData=this.state.theItems.sort((a, b) => b.currentScore - a.currentScore    )
      var nullData=this.state.nullData.sort((a, b) => b.bestPossibleScore - a.bestPossibleScore)
      if(this.state.isThereNullData===true){theItems=nullData}
      if(this.state.isTherNormalData===true){theItems=sortData}
        return (
          <>
            <div className={styles.container}>
              <p className={styles.titleP}>Leaderboard {this.state.isAdmin?<span> | Admin</span>:null}</p>
             
        <div className={styles.headCont}>
          {this.state.allGames.map((item,index)=>{
          var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
          var todayInMillis=new Date().getTime()
          //console.log('todayInMillis',item)
          var theColor='#292f51',timing='Active Event',isExpired=false
          if(todayInMillis>(item.endTime+86400000)){
             theColor='#919191'
             timing='Past Event' 
             isExpired=true
           }
           if(this.state.theEventKey===item.id){
             theColor='#CB1E31'
           }
          return(
            <div className={styles.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherEvents(item.sportType,item.id,item.time,item.title,item.currentSelection,item,isExpired)}>
              <p className={styles.headListP1}>{item.title}</p>
               <div><p className={styles.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={styles.headListP3}>{timing}</p></div>
               </div>
           
          )
          })}
        </div>
              <p className={styles.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
              {/*this.state.sportType==='NCAAB'?<div className={styles.eve2Div}>
            <p id={this.state.currentSelection==='round1'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round1')}>Round 1</p>
            <p id={this.state.currentSelection==='round2'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round2')}>Round 2</p>
            <p id={this.state.currentSelection==='finalRound'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('finalRound')}>Final Round</p>
           </div>:null*/}
          
           {this.state.sportType!=='NCAAB'?<div className={styles.menu2Div1}>    
              {this.state.isAdmin?<div id={styles.exportDiv}> <div  id={styles.exportDiv1} onClick={()=>this.notify('Downloading...')}><DownloadTableExcel
                    filename={this.state.theEventKey}
                    sheet="users"
                    currentTableRef={this.tableRef.current}        
                >
                  <p className={styles.exportP}>Export Document</p>
                  </DownloadTableExcel> </div></div>:null}
      {this.state.userLoggedIn?<>{this.state.dataAvailable?this.itemComponent(theItems):
      <div className={styles.noDataDiv}>
         <PiFolderDashedThin  className={styles.noDataIc}/>
         {this.state.isAdmin?<p>No data available at the moment. Data will be shown once the users make picks</p>
        :<p>No data available at the moment. Data will be available once the event start</p>}
      </div>}</>:
      <div className={styles.noDataDiv}>
      <PiFolderDashedThin  className={styles.noDataIc}/>
     <p>Please LOG IN to view data in this page</p>
   </div>}
      </div>:<TheMarchMadness theEventKey={this.state.theEventKey}/>}
            </div>
            {this.state.showProgressBar?<ProgressBar/>:null}
            <ToastContainer/>
            
            </>
        )
    }
}

export default leaderboard
