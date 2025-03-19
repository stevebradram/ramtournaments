import React, { Component } from 'react'
import style from "./RamUfc.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from './DetailsModal'
import EditDetails from './DetailsModalCopy'
import LogIn from '../LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineShare } from "react-icons/md";
import axios from "axios"
import dayjs from 'dayjs';
import { SlOptionsVertical } from "react-icons/sl";
import copy from 'copy-to-clipboard';
import ProgressBar from '../Helper/ProgressBar'
var selectedRamUfcArray=[],selectedNflArray=[],selectedMarchMadnesArray=[]
class RamUfc extends Component {
  state={theMenu:'mainCard',theItems:[],opendetailsModal:false,getRamDetails:false,dataAvailable:false,theEvent:'Upcoming Events',currentID:1,
    theRamUfc:'',theMarchMadness:false,theNfl:false,theFifa:'',userId:'',userLoggedIn:false,selectedEvent:'RAM UFC',eventToShow:false,
    teamName:'',flockName:'',openLoginModal:false,clickHere1:'CLICK HERE TO MAKE YOUR PICKS',clickHere2:'CLICK HERE TO ENTER THE GAME',theEventTime:0, 
    currentScore:'',bestPossibleScore:'',currentRank:'',editDetailsModal:false,profilePhoto:'',theCurrentEvent:'ramUfc',pastEventsAvailable:false,showProgressBar:false,
    eventRamUfc:'',eventMarchMadness:'',eventNfl:'',ramUfcMaincardArray:[],pastGames:[],theEventTitle:'',theEventKey:'',ramUfcEarlyPrelimsArray:[],endTime:0,
    ramUfcPrelimsArray:[],nflArray:[],marchMadnessArray:[],ufcSubHeadings:'',upcomingGames:[],currentEventUserInfo:{},allMatches:[],expired:false,allGames:[],currentEventsArr:[],pastEventsArr:[],itemsToShowArr:[],
    showGetMatchesModal:false,UFCLinkInput:'',selectHomeEvent:false,selectHomeEventId:'',matchTypesNo:0,theLink:'',getEventsTimeUpdate:'',oddsTimeUpdate:'',fetchResultsTimeUpdate:'',isThereUpcomingGames:false,isTherePastGames:false
  }
  componentDidMount=()=>{
   ////console.log('on raaaaaaaaaaaaam ufc')
   this.checkAuth()

  // //console.log('dddddd',new Date('2025-01-19T05:30:00Z').getTime())

  //this.getRanking()
  //this.checkForOddsUpdate()
  //this.getServerData()
 
   //this.calculateFlocksUsFlocks()
  
  }
 calculateFlocksUsFlocks=()=>{
  var theAllArr=[]
  var eventKey='ufc-fight-night-february-22-2025-February222025'
  var flockScoresRef = firebase.database().ref('/flocksSystem/flockNames/'+eventKey+'/membersScores')
  var flockScoreRef = firebase.database().ref('/flocksSystem/flockNames/'+eventKey+'/theFlocks/')
  var flockScoreRef3 = firebase.database().ref('/flocksSystem/flockNames/'+eventKey+'/theFlocks3/')
  flockScoresRef.once('value', dataSnapshot => {
    var theCount1=dataSnapshot.numChildren()
    var i=0
    dataSnapshot.forEach((data) => {
     
      var theKey=data.key
      var theItem=data.val()
      i++
      flockScoresRef.child(theKey).once('value', dataSnapshot => {
        var theCount=dataSnapshot.numChildren()
        var k=0,theTotal=[],j=0
        dataSnapshot.forEach((data) => {
          k++
          var scoreData=data.val()
         
          if(scoreData.picked===true){
            j++
            theTotal.push(scoreData.score)
          }
          if(theCount===k){
            if(theTotal.length>0){
            var sumScores = theTotal.reduce((partialSum, a) => partialSum + a, 0);
            var avScore=sumScores/j
            avScore=Number(avScore.toFixed(2))
            var sumScores2=Number(sumScores.toFixed(2))
           console.log('the total',theKey,theTotal,j,sumScores2,avScore)
           var flockScoreToDb={avScore:avScore,score:sumScores2,membersNo:j}
           flockScoreRef3.child(theKey).update(flockScoreToDb)
           console.log('flockScoreToDb',flockScoreToDb)
            }
          }
        })
        
      })
       if(theCount1===i){
        console.log('nime finish kumalo',i,theCount1)
       }
    })

  })
 }
  goToServer=()=>{
 
 //this.checkForOutcome()
 this.getTimeUfcOdds(this.state.theEventKey,this.state.matchTypesNo)



    //this.calculateRanking()
  //this.getRanking()  
//this.checkForOddsUpdate()
  //this.checkForOutcome()
  }
  getServerData=async(firstEventTime,lastEventTime)=>{
    var theLink='theEvents::ramUfc::'+this.state.theEventKey+"::"+this.state.matchTypesNo+"::"+firstEventTime+"::"+lastEventTime
    var theQuery=encodeURIComponent(theLink) 
    await axios.get("http://localhost:3000/api/hello?term="+theQuery)
      .then((res) => {
        console.log('from server',res.data)
      })
}
showProgressBar=()=>{
  this.setState({showProgressBar:true})
  this.timerHandle = setTimeout(
    () => this.setState({showProgressBar:false}), 
    180000)
}
showProgressBar2=()=>{
  this.timerHandle = setTimeout(
    () => this.setState({showProgressBar:false}), 
    5000)
}
  checkForOddsUpdate=async (firstEventTime,lastEventTime,theEventKey,matchTypesNo) => {
      try {
        var theLink='theEvents::ramUfc::'+theEventKey+"::"+matchTypesNo+"::"+firstEventTime+"::"+lastEventTime
        var theQuery=encodeURIComponent(theLink) 
         //axios.get("http://localhost:4000/updateUfcOdds?term="+theQuery)
         axios.get("https://theramtournament.com/updateUfcOdds?term="+theQuery)
          .then((res) => {
            var theOutcome = res.data
            this.notify(theOutcome)
            this.setState({showProgressBar:false})
            //console.log('theItems',theOutcome)
})
          } catch (error) {
            //console.log('error',error)
          }
      }
      getTimeUfcOdds=async(theEventKey,matchTypesNo)=>{
        var timeInfoDb=firebase.database().ref('/theEvents/eventsIds/'+theEventKey+'/time/')
        timeInfoDb.once('value',dataSnapshot=>{
          var theEventTime=dataSnapshot.val()
          if((new Date().getTime()>theEventTime)){
            this.notify('Event odds update time expired')
           }else{
            //console.log('goinf to server',theEventTime)
    var millisNow=theEventTime//new Date().getTime()
    var firstEventTime = new Date(millisNow-(86400000*2)).toLocaleDateString()
    var lastEventTime = new Date(millisNow+(86400000*4)).toLocaleDateString()
    firstEventTime=firstEventTime.split('/')
    var theMonthFirst='',theDateFirst=''
    if(firstEventTime[0].length<=1){theMonthFirst='0'+firstEventTime[0]}else{theMonthFirst=firstEventTime[0]}
    if(firstEventTime[1].length<=1){theDateFirst='0'+firstEventTime[1]}else{theDateFirst=firstEventTime[1]}
    firstEventTime=firstEventTime[2]+'-'+theMonthFirst+'-'+theDateFirst+'T21:00:00Z'
    lastEventTime=lastEventTime.split('/')
    var theMonthLast='',theDateLast=''
    if(lastEventTime[0].length<=1){theMonthLast='0'+lastEventTime[0]}else{theMonthLast=lastEventTime[0]}
    if(lastEventTime[1].length<=1){theDateLast='0'+lastEventTime[1]}else{theDateLast=lastEventTime[1]}
    lastEventTime=lastEventTime[2]+'-'+theMonthLast+'-'+theDateLast+'T21:00:00Z'
    this.checkForOddsUpdate(firstEventTime,lastEventTime,theEventKey,matchTypesNo)
    //this.getServerData(firstEventTime,lastEventTime)
    
    ////console.log('firstEventTime',firstEventTime,'lastEventTime',lastEventTime)
       } })
  }
      checkForNewEvents=async () => {
        if(this.state.UFCLinkInput.length<10){
          this.notify('The Link input must be properly filled')
          return
          }
        try {
         if(this.state.UFCLinkInput.startsWith('https://www.ufc.com/event/')){
            //console.log('starts with that shit')
          var theQuery=encodeURIComponent(this.state.UFCLinkInput) 
          console.log('theQuery',this.state.UFCLinkInput)
          
          this.showProgressBar()
          axios.get("https://theramtournament.com/getMatches?term="+theQuery)
          //await axios.get("http://localhost:4000/getMatches?term="+theQuery)
            .then((res) => {
              var theOutcome = res.data
              if(theOutcome.includes('UFC Matches Populated successfully')){
                theOutcome=theOutcome.split('::')
                console.log('theOutcome',theOutcome)
                this.notify(theOutcome[0])
                var howManyExist=theOutcome[1]
                var eventKey=theOutcome[2]
                var sportType=theOutcome[3]
                this.getTimeUfcOdds(eventKey,howManyExist)
                this.showProgressBar2()

              }else{
                this.setState({showProgressBar:false})
                this.notify(theOutcome)
              }
              this.setState({showGetMatchesModal:false,UFCLinkInput:''})
            })
          }else{
            this.notify('The Link input must be properly filled')
            this.setState({showProgressBar:false})
          }
            } catch (error) {
              //console.log('error',error)
              this.setState({showProgressBar:false})
            }
        
      }
      checkForOutcome=async () => {
        
        try {
          if(!this.state.theEventKey||this.state.theEventKey.length<3)return
          var theLink='theEvents::ramUfc::'+this.state.theEventKey//+"::"+this.state.matchTypesNo
          //var theLink2='theEvents::ramUfc::'+theK
          if(!this.state.theEventKey||this.state.theEventKey.length===0)return
          var theQuery=encodeURIComponent(theLink) 
          //console.log('theLink rrraaa',theLink)
          //return
         // await axios.get("https://theramtournament.com/checkForOutcome?term="+theQuery)
      
      
         var timeInfoDb=firebase.database().ref('/theEvents/eventsIds/'+this.state.theEventKey+'/time/')
         timeInfoDb.once('value',dataSnapshot=>{
           var theEventTime=dataSnapshot.val()
           if((theEventTime>new Date().getTime())){
            this.notify('Event has not yet started')
           }
           if((new Date().getTime()>(theEventTime+100400000))){
             this.notify('Event results update time expired')
            }else{
            //axios.get("https://theramtournament.com/checkForOutcome?term="+theQuery)
               axios.get("http://localhost:4000/checkForOutcome?term="+theQuery)
              .then((res) => {
                //console.log('theItems',res)
                var theOutcome = res.data
                //console.log('theItems',theOutcome)
                if(theOutcome==='sucesss'){}
                //this.getRanking()
              })
            }
          })
      
      
       
            } catch (error) {
              //console.log('error',error)
            }
        }
         calculateRanking=(theArr)=>{
            var dbLink2="/userBets/scoreBoards/ramUfc/ufc-310-December72024/"
            var dbLink3="/userBets/ramUfc/ufc-310-December72024/"
            var dbLink4='/ramData/events/ramUfc/ufc-310-December72024/details/currentScore/'
            var dbLink5='/ramData/events/ramUfc/ufc-310-December72024/details/currentRank/'
            var dbLink6='/ramData/events/ramUfc/ufc-310-December72024/details/bestPossibleScore10/'
             var scoreBoardDb=firebase.database().ref(dbLink2)
             var theUserBets=firebase.database().ref(dbLink3)
             var usersDb=firebase.database().ref('/users/')
             theUserBets.once('value',dataSnapshot=>{
             var theNo=dataSnapshot.numChildren()
             var h=0,theAllItems={},theArrCount=[]
             dataSnapshot.forEach((data,index) => {
              h++
              var betsObj= data.val()
              var theUid= data.key
              var userArr=[],i=0,bestPossibleArr=[]
              for(var key in theArr){
                i++
                var matchId=theArr[key]['id']
                var theWinner=theArr[key]['winner']
                var theWinnerSelected=betsObj[matchId]
                var thePoints=0
                if(theWinner===theWinnerSelected){
                  if(theWinner==='player1'){thePoints=theArr[key]['p1Points']}
                  if(theWinner==='player2'){thePoints=theArr[key]['p2Points']}
                  userArr.push(thePoints)
                  bestPossibleArr.push(thePoints)
                }else{
                  var bestPoints=0
                  if(theWinnerSelected==='player1'){bestPoints=theArr[key]['p1Points']}
                  if(theWinnerSelected==='player2'){bestPoints=theArr[key]['p2Points']}
                  userArr.push(0)
                  bestPossibleArr.push(bestPoints)
                }
                if(theArr.length===i){
                  var pointsSum = userArr.reduce((partialSum, a) => partialSum + a, 0);
                  pointsSum=Number(pointsSum.toFixed(2))
                  var bestPossSum = bestPossibleArr.reduce((partialSum, a) => partialSum + a, 0);
                  bestPossSum=Number(bestPossibleArr.toFixed(2))
                  var theItem={}
                  theItem[theUid]=pointsSum
                  theAllItems[theUid]=pointsSum
                  var countArr={id:theUid,points:pointsSum}
                  theArrCount.push(countArr)
                  usersDb.child(theUid+dbLink4).set(pointsSum+'')
                  usersDb.child(theUid+dbLink6).set(bestPossSum+'')
                }
           }
           if(theNo===h){
            theArrCount=theArrCount.sort(function(a, b){return b.points - a.points})
            var countIndex = theArrCount.findIndex(x => x.id ===this.state.userId);
            theArrCount.map((item,index)=>{
            var theRank=index+1+'/'+theNo
            usersDb.child(item.id+dbLink5).set(theRank)
            })
            scoreBoardDb.update(theAllItems,(error) => {
              if (error) {
                //console.log('Score board noooooot updated successfully')
              }else{
                //console.log('Score board updated successfully')
              }
          })
           }
      })})
  }
  getRanking = async() => {
    var dbLink1='/theEvents/ramUfc/ufc-310-December72024/'
    var theDbEvent=firebase.database().ref(dbLink1)
    var i=0, j=0, k=0,allUsersBetsArr=[]
    await theDbEvent.child('mainCardShort').once('value',dataSnapshot=>{
      var mainCardNo=dataSnapshot.numChildren()
      dataSnapshot.forEach((data,index) => {
        i++
          var theValue=data.val()
          theValue['id']=data.key
          allUsersBetsArr.push(theValue)
          if(i===mainCardNo){
            theDbEvent.child('prelimsShort').once('value',dataSnapshot=>{
              if(!dataSnapshot.val()){
                this.calculateRanking(allUsersBetsArr)
              }else{
                var prelimNo=dataSnapshot.numChildren()
                dataSnapshot.forEach((data,index) => {
                  j++
                  var theValue=data.val()
                  theValue['id']=data.key
                   allUsersBetsArr.push(theValue)
                  if(j===prelimNo){
                   theDbEvent.child('earlyPrelimsShort').once('value',dataSnapshot=>{
                    var earlyPrelimNo=dataSnapshot.numChildren()
                    if(!dataSnapshot.val()){
                      this.calculateRanking(allUsersBetsArr)
                    }else{
                    dataSnapshot.forEach((data,index) => {
                     k++
                    var theValue=data.val()
                    theValue['id']=data.key
                    allUsersBetsArr.push(theValue)
                     if(k===earlyPrelimNo){
                      this.calculateRanking(allUsersBetsArr)
                     }
                    })}
                    
                  })
                  } }) } }) } }) })
  }
  checkAuth = () => {
    var profilePhoto=localStorage.get('profilePhoto')
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       this.setState({userId,userLoggedIn:true})
       if(userId){this.checkUpcomingPastGames(userId)}
       
     }else{
      this.setState({userLoggedIn:false})
      //this.getGamesInfo()
      this.checkUpcomingPastGames(userId)
     }
   })
 }

 checkUpcomingPastGames=async(userId)=>{
  //return
  var userInfoDb=firebase.database().ref('/theEvents/eventsIds')
  var upcomingGames=[],pastGames=[]//,allGames=[]
  var nowDate= await new Date().getTime()
  ////console.log('nowDate',nowDate)
  await  userInfoDb.once('value',dataSnapshot=>{
    var theCount=dataSnapshot.numChildren()
    var i=0
    dataSnapshot.forEach((data) => {
      i++
    
      var pastG={},upcomingG={}
      var key=data.key
      var time=data.val().time
      var title=data.val().title
      var sportType=data.val().sportType
      var endTime=data.val().endTime
      var getEventsTimeUpdate=data.val().getEventsTimeUpdate
      if(!getEventsTimeUpdate){getEventsTimeUpdate='N/A'}else{getEventsTimeUpdate=new Date(getEventsTimeUpdate).toLocaleString()}
      var oddsTimeUpdate=data.val().oddsTimeUpdate
      if(!oddsTimeUpdate){oddsTimeUpdate='N/A'}else{oddsTimeUpdate=new Date(oddsTimeUpdate).toLocaleString()}
      var fetchResultsTimeUpdate=data.val().fetchResultsTimeUpdate
      if(!fetchResultsTimeUpdate){fetchResultsTimeUpdate='N/A'}else{fetchResultsTimeUpdate=new Date(fetchResultsTimeUpdate).toLocaleString()}

      var theData = data.val()

      var theItem=''
      //allGames.push(theItem)
      ////console.log('key',key,'value',time,dataSnapshot.size)
      if(sportType==='ramUfc'){
       
          var theItem={id:key,time:time,title:title,sportType:sportType,endTime:endTime,theData:theData,getEventsTimeUpdate,oddsTimeUpdate,fetchResultsTimeUpdate}
         // allGames.push(theItem)
        if(nowDate>(endTime+36000000)){
          pastGames.push(theItem)
        }
        if(nowDate<endTime){
          upcomingGames.push(theItem)
        }
      }
      if(theCount===i){
        console.log('data.val() 555555',upcomingGames,pastGames)
        //return
        var theEventTitle='',theEventKey='',sportType='',theTime='',endTime=0
        /*if(allGames.length>0){
          allGames=allGames.sort(function(a, b){return b.time - a.time});
         // //console.log('teeeeeee',allGames)
          theEventTitle=allGames[0]['title'];sportType=allGames[0]['sportType'],theEventKey=allGames[0]['id'],theTime=allGames[0]['time'],endTime=allGames[0]['endTime'],
          getEventsTimeUpdate=allGames[0]['getEventsTimeUpdate'],oddsTimeUpdate=allGames[0]['oddsTimeUpdate'],fetchResultsTimeUpdate=allGames[0]['fetchResultsTimeUpdate']
          this.setState({allGames,theEventTitle,theEventKey,sportType,theTime,endTime,getEventsTimeUpdate,oddsTimeUpdate,fetchResultsTimeUpdate},()=>{
          this.getUfcMatches(userId)

         
            //this.getNullScoreBoardData(sportType,theEventKey)
          })}*/
          if(upcomingGames.length>0){
            console.log('rakadaaaa 111')
            upcomingGames=upcomingGames.sort(function(a, b){return b.time - a.time});
            theEventTitle=upcomingGames[0]['title'];sportType=upcomingGames[0]['sportType'],theEventKey=upcomingGames[0]['id'],theTime=upcomingGames[0]['time'],endTime=upcomingGames[0]['endTime'],
            getEventsTimeUpdate=upcomingGames[0]['getEventsTimeUpdate'],oddsTimeUpdate=upcomingGames[0]['oddsTimeUpdate'],fetchResultsTimeUpdate=upcomingGames[0]['fetchResultsTimeUpdate']
            this.setState({isThereUpcomingGames:true,itemsToShowArr:upcomingGames,currentEventsArr:upcomingGames,theEventTitle,theEventKey,sportType,theTime,endTime,getEventsTimeUpdate,oddsTimeUpdate,fetchResultsTimeUpdate,theEvent:'Upcoming Events'},()=>{
            this.getUfcMatches(userId)})
            if(pastGames.length>0){
              pastGames=pastGames.sort(function(a, b){return b.time - a.time});
              this.setState({isTherePastGames:true,pastEventsArr:pastGames})
            }else{this.setState({isTherePastGames:false})}
            //this.setState({isThereUpcomingGames:true,currentEventsArr:upcomingGames}) 
          }else{
            
            this.setState({isThereUpcomingGames:false,theEvent:'Past Events'})
            if(pastGames.length>0){
              
              pastGames=pastGames.sort(function(a, b){return b.time - a.time});
              theEventTitle=pastGames[0]['title'];sportType=pastGames[0]['sportType'],theEventKey=pastGames[0]['id'],theTime=pastGames[0]['time'],endTime=pastGames[0]['endTime'],
            getEventsTimeUpdate=pastGames[0]['getEventsTimeUpdate'],oddsTimeUpdate=pastGames[0]['oddsTimeUpdate'],fetchResultsTimeUpdate=pastGames[0]['fetchResultsTimeUpdate']
              this.setState({isTherePastGames:true,itemsToShowArr:pastGames,pastEventsArr:pastGames,theEventTitle,theEventKey,sportType,theTime,endTime,getEventsTimeUpdate,oddsTimeUpdate,fetchResultsTimeUpdate},()=>{
                this.getUfcMatches(userId)
                console.log('rakadaaaa 250',this.state.itemsToShowArr,pastGames)
              })
                
            }else{this.setState({isTherePastGames:false})}
          }
          
        
      }
    });
    })
    /*var theEventTitle='',theEventKey='',theEventTime=0
    if(pastGames.length>0){pastGames=pastGames.sort(function(a, b){return a.time - b.time});}
    if(upcomingGames.length>0){upcomingGames=upcomingGames.sort(function(a, b){return a.time - b.time});theEventTitle=upcomingGames[0]['title'];theEventKey=upcomingGames[0]['id'],theEventTime=upcomingGames[0]['time']}
    //console.log('theEventTimeeeeeeeee',theEventTime)
    var expired=false
    //console.log('expiry time remaining',theEventTime-new Date().getTime())
    if((theEventTime-new Date().getTime())<600000){//1734220800000
      expired=true
     }
    await this.setState({pastGames,upcomingGames,theEventTitle,theEventKey,theEventTime,expired},()=>{
       ////console.log('hooo',this.state.theEventTime,new Date().getTime())
      this.getUfcMatches(userId)
    })*/
}
getUfcMatches=(userId)=>{
 
  var allMatches=[]
  this.setState({ramUfcMaincardArray:[],ramUfcPrelimsArray:[],ramUfcEarlyPrelimsArray:[],theMenu:'mainCard',dataAvailable:false,currentEventUserInfo:{}})
  var userInfoDb=firebase.database().ref('/theEvents/ramUfc/').child(this.state.theEventKey)
   userInfoDb.once('value',dataSnapshot=>{
    //console.log('children count',dataSnapshot.numChildren());
    var dataCount=dataSnapshot.numChildren()
    ////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
    var mainCardCount=dataSnapshot.child('mainCard').numChildren()
    var prelimsCount=dataSnapshot.child('prelims').numChildren()
    var earlyPrelimsCount=dataSnapshot.child('earlyPrelims').numChildren()
    if(prelimsCount===0&&earlyPrelimsCount===0){this.setState({matchTypesNo:1})}
    if(prelimsCount>=1&&earlyPrelimsCount===0){this.setState({matchTypesNo:2})}
    if(prelimsCount>=1&&earlyPrelimsCount>=1){this.setState({matchTypesNo:3})}
    var theInfo=dataSnapshot.val()
    //console.log('the event mainCardCount 323232',mainCardCount) 
    if(theInfo.mainCard){
      var array1 = []
      ////console.log('iko maincarddddd',theInfo.mainCard)
      var i=0
      for (var key in theInfo.mainCard) {
        i++
       var theData=theInfo.mainCard[key]
       var array2={theId:key,...theData}
       array1.push(array2)
       allMatches.push(array2)
       if(i===mainCardCount){
        //console.log('whole maincard Array',array1)
        //allMatches.push(array1)
        this.setState({ramUfcMaincardArray:array1,theItems:array1})
        
       }}}
    if(theInfo.prelims){
      var array1 = []
      ////console.log('iko prelimsssssss')
      var i=0
      for (var key in theInfo.prelims) {
        i++
       var theData=theInfo.prelims[key]
       var array2={theId:key,...theData}
       array1.push(array2)
       allMatches.push(array2)
       if(i===prelimsCount){
        ////console.log('whole prelimms Array',array1)
        this.setState({ramUfcPrelimsArray:array1})
        
       }
      } 
      //prelimsArray
    }else{
      ////console.log('hakuna prelimsssssss')
      if(this.state.userId.length<3)return
      
      this.getMatchesInfo(this.state.userId,allMatches)
    }
    if(theInfo.earlyPrelims){
      var array1 = []
      ////console.log('iko earlyPrelims')
      var i=0
      for (var key in theInfo.earlyPrelims) {
        i++
       var theData=theInfo.earlyPrelims[key]
       var array2={theId:key,...theData}
       array1.push(array2)
       allMatches.push(array2)
       if(i===earlyPrelimsCount){
        ////console.log('whole early prelimms Array',array1)
        //allMatches.push(array1)
        this.setState({ramUfcEarlyPrelimsArray:array1})
        if(this.state.userId.length<3)return
        
        //allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcEarlyPrelimsArray]]
        this.getMatchesInfo(this.state.userId,allMatches)
       }
      }
    }else{
      if(this.state.userId.length<3)return
      //allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...allMatches=[...this.state.ramUfcMaincardArray]]
      this.getMatchesInfo(this.state.userId,allMatches)
      ////console.log('hakuna early prelimsssssss')
    }
  })
  ////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
 
  

  
}
getMatchesInfo=async(userId,allMatches)=>{
  ////console.log('allMatches',userId,this.state.theEventKey,allMatches)
 
  var selectedMatchesKeyDb=firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/ramUfc/"+this.state.theEventKey+'/')
  var photoRefDb=firebase.database().ref('/users/').child(userId+'/userData/').child('profilePhoto')
  var userInfoDb=firebase.database().ref('/users/').child(userId).child("/ramData/events/ramUfc/"+this.state.theEventKey+'/details/')
  var userBetsDb=firebase.database().ref('/users/').child(userId).child("/ramData/events/ramUfc/"+this.state.theEventKey+'/bets/')
  var gamesDataRef = firebase.database().ref('users/').child(userId+'/ramData/').child('/events/ramUfc/')
  var flocksDataRef = firebase.database().ref('users/').child(userId+'/flockData/flockNames/'+this.state.theEventKey+'/link')
  var trialDb=firebase.database().ref('/triaaaaaal/')
  var currentEventUserInfo=''
  flocksDataRef.once('value',dataSnapshot=>{
    console.log('flocksDataRef the key',dataSnapshot.val())
    if(dataSnapshot.exists()){
      this.setState({theLink:dataSnapshot.val()})
    }else{
      this.setState({theLink:''})
    }
  })
  await  selectedMatchesKeyDb.once('value',dataSnapshot=>{
    
    if (!dataSnapshot.val())return
   
    photoRefDb.once('value',dataSnapshot=>{
      ////console.log('proofile photo',dataSnapshot.val())
      if (dataSnapshot.val()) {
        this.setState({profilePhoto:dataSnapshot.val()})
    }})
    userInfoDb.once('value',dataSnapshot=>{
      if (!dataSnapshot.val())return
      ////console.log('the type user info',dataSnapshot.val())
      if (dataSnapshot.val()) {
        var theInfo=dataSnapshot.val()
        this.setState({currentEventUserInfo:theInfo,currentRank:theInfo.currentRank})
        currentEventUserInfo=dataSnapshot.val()
        ////console.log('currentEventUserInfo',currentEventUserInfo)
        
  }})
  var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
  ////console.log('thetrrrr',thetrrrr)
  userBetsDb.once('value',dataSnapshot=>{
    ////console.log('the bets data',dataSnapshot.val())
    ////console.log('this.state.theItems',this.state.theItems)
    if (!dataSnapshot.val())return 
    var itemsCount=dataSnapshot.numChildren()
    ////console.log('it count',itemsCount)
    var i=0, thePoints=[],currentScore=[]
    dataSnapshot.forEach((data,index) => {
      i++
      thetrrrr.map((item)=>{
        ////console.log('thetrrrr item',item)
        ////console.log('thedb item',data.val())
        if(item.id===data.key){
         ////console.log('thank you sir')
         item['bet']=data.val()
         if(item.status1==='played'){
          if(item.winner==='player1'&&data.val()==='player1'){currentScore.push(item.p1Points);thePoints.push(item.p1Points)}
          if(item.winner==='player2'&&data.val()==='player2'){currentScore.push(item.p2Points);thePoints.push(item.p2Points);}
         }else{
          if(data.val()==='player1'){thePoints.push(item.p1Points);
          }
          if(data.val()==='player2'){thePoints.push(item.p2Points);
           }
         }
        
       }
       })
      if(itemsCount===i){
        this.setState({dataAvailable:true})
        if(this.state.theMenu==='mainCard'){this.setState({ramUfcMaincardArray:this.state.theItems})}
        if(this.state.theMenu==='prelimms'){this.setState({ramUfcPrelimsArray:this.state.theItems})}
        if(this.state.theMenu==='earlyPrelims'){this.setState({ramUfcEarlyPrelimsArray:this.state.theItems})}
        ////console.log('this.state.theItems',this.state.theItems)
        ////console.log('thePointsssss',thePoints)
        ////console.log('currentScore',currentScore.length)
        return
        var pointsSum = thePoints.reduce((partialSum, a) => partialSum + a, 0);
        pointsSum=pointsSum.toFixed(2)
        
       
        gamesDataRef.child(this.state.theEventKey+'/details/bestPossibleScore/').set(pointsSum)
        currentEventUserInfo['bestPossibleScore']=pointsSum
        this.setState({currentEventUserInfo})
        ////console.log('currentScore 555555',currentScore)
        if(currentScore.length>0){
          var scoreSum = currentScore.reduce((partialSum, a) => partialSum + a, 0);
          scoreSum=scoreSum.toFixed(2)
          currentEventUserInfo['currentScore']=scoreSum
          this.setState({currentEventUserInfo})
          ////console.log('scoreSum55555555',scoreSum)
          userInfoDb.child('/currentScore/').set(scoreSum)
        }
      }
    })
  })
    
 })
}
selectEvent= (theMenu,theItems) => {
  this.setState({theMenu,theItems})
}

loadOtherFights=async(theEventKey,theEventTitle,fetchResultsTimeUpdate,getEventsTimeUpdate,oddsTimeUpdate,theTime)=>{
  this.setState({theTime,theLink:''})
  var eventsInfo=firebase.database().ref('/theEvents/eventsIds/'+theEventKey+'/time')
  await  eventsInfo.once('value',dataSnapshot=>{
    var theInfo=dataSnapshot.val()
    var theEventTime=dataSnapshot.val()
    var expired=false
    if((theEventTime-new Date().getTime())<86400000){
      expired=true
     }
  if (navigator.onLine === false) {
    this.notify('No internet! please check your internet connection')
    return
  }

   this.setState({theEventKey,theEventTitle,expired,fetchResultsTimeUpdate,getEventsTimeUpdate,oddsTimeUpdate,theTime},()=>{
    this.getUfcMatches()
  })
})
}
 getGamesInfo=async()=>{
  var userInfoDb=firebase.database().ref('/events/')
  
  await  userInfoDb.once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      if(theInfo.ramUfc!==false){this.setState({eventRamUfc:true,ufcSubHeadings:theInfo.ramUfc.split(':')});this.getUfcItems('ramUfc');}
      if(theInfo.marchMadness===true){this.setState({eventMarchMadness:true}),this.getNflMarchMadnessItems('marchMadness','marchMadnessArray')}
      if(theInfo.nfl===true){this.setState({eventNfl:true}),this.getNflMarchMadnessItems('nfl','nflArray')}
      
    })
}
getUfcItems=async(name)=>{
    var userInfoDb=firebase.database().ref('/activeEvents/').child(name)
    
    userInfoDb.once('value',dataSnapshot=>{
      ////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      ////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var mainCardCount=dataSnapshot.child('mainCard').numChildren()
      var prelimsCount=dataSnapshot.child('prelims').numChildren()
      var theInfo=dataSnapshot.val()
      ////console.log('the event eventSelection',theInfo) 
      if(theInfo.mainCard){
        var array1 = []
        ////console.log('iko maincarddddd',theInfo.mainCard)
        var i=0
        for (var key in theInfo.mainCard) {
          i++
         var theData=theInfo.mainCard[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===mainCardCount){
          ////console.log('whole maincard Array',array1)
          this.setState({ramUfcMaincardArray:array1})
          this.setState({theItems:array1})
         }}}
      if(theInfo.prelims){
        var array1 = []
        ////console.log('iko prelimsssssss')
        var i=0
        for (var key in theInfo.prelims) {
          i++
         var theData=theInfo.prelims[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===prelimsCount){
          ////console.log('whole prelimms Array',array1)
          this.setState({ramUfcPrelimsArray:array1})
         }
        }
        //prelimsArray
      }else{
        ////console.log('hakuna prelimsssssss')
      }
    })
  }
  getNflMarchMadnessItems=async(name,theArr)=>{
    var userInfoDb=firebase.database().ref('/activeEvents/').child(name)
    userInfoDb.once('value',dataSnapshot=>{
      var count=dataSnapshot.numChildren()
      var theInfo=dataSnapshot.val()
      ////console.log('the event eventSelection',theInfo) 
      if(theInfo){
        var array1 = []
        ////console.log('iko maincarddddd',theInfo)
        var i=0
        for (var key in theInfo) {
          i++
         var theData=theInfo[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===count){
          ////console.log('whole maincard Array',array1)
          this.setState({[theArr]:array1})
         }}}
    })
  }

  getRamInfo=async(userId,event)=>{
    var userInfoDb=firebase.database().ref('/users/'+userId).child('upcomingEvents').child(event)
    userInfoDb.once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      if(event==='ramUfc'){selectedRamUfcArray=theInfo}
      if(event==='marchMadness'){selectedMarchMadnesArray=theInfo}
      if(event==='nfl'){selectedNflArray=theInfo}
      //hapa ndo nimefika
      //////console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank=''
      if(theInfo.currentRank===false){currentRank='N/A'}else{currentRank=theInfo.currentRank}
      this.setState({flockName:theInfo.flockName,teamName:theInfo.teamName,currentScore:theInfo.currentScore,
        bestPossibleScore:theInfo.bestPossibleScore,currentRank:currentRank,theItems:theInfo.eventSelection
    })
    this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })
    return
  
      this.setState({theRamUfc:theRamUfc,theMarchMadness,theNfl,theFifa})
    this.setState({ theRamUfc: theRamUfc }, () => {
      //////console.log('theRamUfc 99999999999999',this.state.theRamUfc);
    }); 
    //////console.log('this.state.theRamUfc 2525',this.state.theRamUfc)
    var userInfoDb=firebase.database().ref('/users/'+userId).child('upcomingEvents')
    if(theRamUfc==='selected'){
      this.setState({dataAvailable:true,clickHere1:'CLICK HERE TO EDIT YOUR PICKS',clickHere2:'CLICK HERE TO EDIT THE GAME'})
    userInfoDb.child('ramUfc').once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      //////console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank=''
      if(theInfo.currentRank===false){currentRank='N/A'}else{currentRank=theInfo.currentRank}
      this.setState({flockName:theInfo.flockName,teamName:theInfo.teamName,currentScore:theInfo.currentScore,
        bestPossibleScore:theInfo.bestPossibleScore,currentRank:currentRank,theItems:theInfo.eventSelection
    })
    this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })}
    //else{this.setState({theItems:mainCard})}
  }
  getCurrentScore=async(theItems)=>{
    var i=0, theAmount=[]
   theItems.map((item,index)=>{
    var amount=0
    //////console.log('kufinish kumalo 1')
    i++
    if(item.status1==='played'){
      //////console.log('kufinish kumalo 2',item.bet,item.winner)
      if(item.bet==='player1'&&item.winner==='player1'){
        amount=Number(item.p1Points)
        theAmount.push(amount)
        //////console.log('kufinish kumalo 3')
      }
      if(item.bet==='player2'&&item.winner==='player2'){
        amount=Number(item.p2Points)
        theAmount.push(amount)
        //////console.log('kufinish kumalo 4')
      }
     
      //////console.log('kufinish kumalo 4B',i,theItems.length)
      if(i===theItems.length){
        //////console.log('kufinish kumalo 5')
        const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
        //////console.log('the current Score',sum)
        this.setState({currentScore:sum.toFixed(2)})
      }
    }
   })
  }

  // todo add stopEdit on getting matches
  hideModal = () => {
    this.setState({opendetailsModal:false})
    //////console.log('Button clicked!');
  };
  checkEpiry=async()=>{
    var userInfoDb=firebase.database().ref('/theEvents/eventsIds/'+this.state.theEventKey+'/time/')
    await  userInfoDb.once('value',dataSnapshot=>{
      //console.log('expiry data',dataSnapshot.val())
    })
   }
   openTheModal =async () => {
    var allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
    //console.log('ratatata',this.state.userLoggedIn,allMatches)
    if(this.state.userLoggedIn===false){
      this.notify("Please Log In to continue")
      this.setState({openLoginModal:true})
      return
    }
   var i=0,pointMissing=false
   //console.log('this.state.theItems',allMatches)
   await allMatches.map((item,index)=>{
    i++
      ////console.log('item.p1Points',item.p1Points)
      if((item.p1Points==='N/A'||item.p2Points==='N/A')&&item.status1!=='cancelled'){
        pointMissing=true
        //console.log('item.p1Points',item)
      }
      if(item.status1==='cancelled'&&item.p1Points==='N/A'){
        allMatches[index]['p1Points']=0
        allMatches[index]['p2Points']=0
      }
     if(allMatches.length===index+1){
     if(pointMissing===true){
      this.notify('All event points not yet populated, try again later')
     }else{
      this.openTheModal2()
     }
     }
    })
    }
  openTheModal2= () => {
    var timeInfoDb=firebase.database().ref('/theEvents/eventsIds/'+this.state.theEventKey+'/time/')
    timeInfoDb.once('value',dataSnapshot=>{
      var theEventTime=dataSnapshot.val()
      if((new Date().getTime()>theEventTime)){
        this.notify('Event pick/edit time expired')
       }else{
        if(this.state.userLoggedIn===true){
          var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
        this.setState({allMatches:thetrrrr},()=>{
          this.setState({opendetailsModal:true,openLoginModal:false})
        })
        }else{
          this.setState({openLoginModal:true,opendetailsModal:false})
        }
       }
    })
   
  }
 opeModal2=()=>{
  var userInfoDb=firebase.database().ref('/theEvents/eventsIds/'+this.state.theEventKey+'/stopEdit/')
    userInfoDb.once('value',dataSnapshot=>{
      var theEventTime=dataSnapshot.val()
      if((theEventTime-new Date().getTime())<600000){
        this.notify('Event pick/edit time expired')
       }else{
        this.setState({editDetailsModal:true})
  }
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
theTypeAnimation=(text1,text2)=>{
  return(
    <TypeAnimation
    sequence={[
      text1,
      2000,
      text2,
      2000
    ]}
    wrapper="span"
    speed={50}
    className={style.picksP}
    repeat={Infinity}
  />
  )
}
inputChange = async (e) => {
  var value = e.target.value
  await this.setState({[e.target.id]: value})
}
chooseHomeEvent=(event,id)=>{
  event.stopPropagation()
  event.preventDefault()
  this.setState({selectHomeEvent:true,selectHomeEventId:id})
  }
  sendEvent=(event,data,id)=>{
    event.stopPropagation()
    event.preventDefault()
    data['id']=id
    var theDb=firebase.database().ref("/theEvents/eventToShowHomePage/")
    theDb.set(data,(error) => {
      if (error) {
        this.notify('An error occured while updating')
      }else{
        this.setState({selectHomeEvent:false})
        this.notify('Selected Succesfully')
      }
  })
    }
    copyLink=()=>{
      //navigator.clipboard.writeText(this.state.theLink)
      copy(this.state.theLink);
      this.notify('Link copied successfully')
    }
    pastCurrentEvent=(event)=>{
      if(event==='Upcoming Events'){
        if(this.state.isThereUpcomingGames){
          this.setState({theEvent:event,itemsToShowArr:this.state.currentEventsArr})
        }else{
          this.notify('No current/upcoming events at the moment')
        }
      }
      if(event==='Past Events'){
        if(this.state.isTherePastGames){
          this.setState({theEvent:event,itemsToShowArr:this.state.pastEventsArr})
        }else{
          this.notify('No past events at the moment')
        }
      }
    }
  render() {
   var flockTeamName=''
   var itemToModals=''
   var theText='samosaaaaaaaaaaaaaaaaaa'
   var isPastEvent=''
   var todayInMillis=new Date().getTime()
   console.log('this.state.currentEventsArr',this.state.currentEventsArr)
   if(this.state.endTime<todayInMillis&&(this.state.endTime-todayInMillis)<-86400000){
    isPastEvent=false
   }else{ isPastEvent=true}
    if(this.state.dataAvailable){flockTeamName=this.state.currentEventUserInfo['teamName']+'::'+this.state.currentEventUserInfo['flockName']}
    else{flockTeamName=false}
    if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    return (
      <><div className={style.container}>
        <div className={style.eventsCont}>
        <p className={style.eventsP} id={this.state.theEvent==='Upcoming Events'?style.playerP1:style.playerP} onClick={()=>this.pastCurrentEvent('Upcoming Events')}>CURRENT EVENTS</p>
        <p className={style.eventsP} /*style={{color:this.state.pastEventsAvailable?null:'#b2b2b2',borderColor:this.state.pastEventsAvailable?null:'#b2b2b2'}}*/ id={this.state.theEvent==='Past Events'?style.playerP1:style.playerP} onClick={()=>this.pastCurrentEvent('Past Events')}>PAST EVENTS</p>
        </div>
       <div className={style.matchesHeadDiv}>
          {this.state.itemsToShowArr.map((item,index)=>{
           var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
           var theColor='#292f51',timing='Active Event'
           if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
             theColor='#919191'
             timing='Past Event'
           }
           if(this.state.theEventKey===item.id){
             theColor='#CB1E31'
           }
            return(
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title,item.fetchResultsTimeUpdate,item.getEventsTimeUpdate,item.oddsTimeUpdate,item.time)}>
               <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||this.state.userId==='zZTNto5p3XVSLYeovAwWXHjvkN43'||this.state.userId==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event,item.id)}/>
                {this.state.selectHomeEvent&&this.state.selectHomeEventId==item.id?<div className={style.selectHomeEventDiv} onClick={()=>this.setState({selectHomeEvent:false})}><button onClick={(event)=>this.sendEvent(event,item.theData,item.id)}>Make home event</button></div>:null}</>:null}  
              </div>  
            )
          })}
        </div>
          <div className={style.profileDiv}>
          <div className={style.imageDiv}>
          {this.state.profilePhoto.length?<img src={this.state.profilePhoto}/>:
          <IoPersonSharp className={style.personIC}/>}
          </div>
          <div className={style.detailsDiv}>
            <p>RAM Name: {this.state.dataAvailable?this.state.currentEventUserInfo['teamName']:'N/A'}</p>
            <p>Flock Name: {this.state.dataAvailable?this.state.currentEventUserInfo['flockName']:'N/A'}</p>
            {this.state.dataAvailable?<p id={style.editP} onClick={()=>this.opeModal2()}>Edit Profile</p>:<p id={style.editP} onClick={()=>this.openTheModal()} >Make Picks</p>}
            </div>
          </div>
          <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
          {this.state.theLink.length>1&&new Date().getTime()<this.state.theTime?<div className={style.shareDiv} onClick={()=>this.copyLink()}>
          <p>Flock Invite Link</p>
          <MdOutlineShare />
          </div>:null}
          
          <div className={style.picksDiv} onClick={()=>this.openTheModal()}>
            {/*<p className={style.picksP}>CLICK HERE MAKE YOUR PICKS</p>*/}
          {this.state.dataAvailable?
          this.theTypeAnimation('CLICK HERE TO MAKE YOUR PICKS','CLICK HERE TO ENTER THE GAME')
           :
           this.theTypeAnimation('CLICK HERE TO EDIT YOUR PICKS','CLICK HERE TO ENTER THE GAME')
           }
            </div>
                {this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||this.state.userId==='zZTNto5p3XVSLYeovAwWXHjvkN43'||this.state.userId==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'?
                <><div className={style.resultsCont}>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={()=>this.setState({showGetMatchesModal:!this.state.showGetMatchesModal})}>Check For New Events</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.getEventsTimeUpdate}</p>
                  </div>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={()=>this.goToServer()}>Update Match Odds</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.oddsTimeUpdate}</p>
                  </div>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={()=>this.checkForOutcome()}>Fetch Results Updates</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.fetchResultsTimeUpdate}</p>
                  </div>
                  </div>
                  {this.state.showGetMatchesModal?<div className={style.ufcLinkDiv}>
                    <input className={style.ufcLinkInput} id='UFCLinkInput' placeholder='Paste UFC Link' value={this.state.UFCLinkInput} onChange={(event)=>this.inputChange(event)}/>
                    <button className={style.ufcLinkSend} onClick={()=>this.checkForNewEvents()}>Send</button>
                  </div>:null}
                  </>:null}
                <div className={style.eveDiv}>
                  {this.state.ramUfcMaincardArray.length>0?<p id={this.state.theMenu==='mainCard'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('mainCard',this.state.ramUfcMaincardArray)}>MAIN CARD</p>:null}
                  {this.state.ramUfcPrelimsArray.length?<p id={this.state.theMenu==='prelims'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('prelims',this.state.ramUfcPrelimsArray)}>PRELIMS</p>:null}
                  {this.state.ramUfcEarlyPrelimsArray.length?<p id={this.state.theMenu==='earlyPrelims'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('earlyPrelims',this.state.ramUfcEarlyPrelimsArray)}>EARLY PRELIMS</p>:null}
                  
                </div>
        <div className={style.scoresCont}>
        <div className={style.scoresCont1}>
          <p className={style.scoreP1}>Best possibe Score:</p>
          <p className={style.scoreP2}>{this.state.dataAvailable?this.state.currentEventUserInfo['bestPossibleScore']:'0.00'} points</p>
        </div>
        <div className={style.scoresCont2}>
        <p className={style.scoreP1}>Current Score</p>
        <p className={style.scoreP2}>{this.state.dataAvailable?this.state.currentEventUserInfo['currentScore']:'0.00'} points</p>
        </div>
        <div className={style.scoresCont3}>
        <p className={style.scoreP1}>Current Rank in RAM UFC</p>
        <p className={style.scoreP2}>{this.state.dataAvailable&&this.state.currentRank?this.state.currentRank:'N/A'}</p>
        </div>
        </div>
        <div className={style.listCont}>
        {this.state.theItems.map((item,index)=>{
          ////console.log('the iteeeeeeeeeem',item)
          var playStat=''
          var playStatCol=''
          
          if(item.status1==='notPlayed'){playStat='Upcoming Event',playStatCol='#292f51'}
          if(item.status1==='ongoing'){playStat='Ongoing Event',playStatCol='#CB1E31'}
          if(item.status1==='played'){playStat='Finished Event',playStatCol='#919191'}
           var timeDiff=Number(item.timeInMillis)-new Date().getTime()
           //if(item.status1==='notPlayed'&&timeDiff>300000){

           //}
         /* if((item.timeInMillis-new Date().getTime())<24000000){
            playStat='Ongoing Event',playStatCol='#CB1E31'
            //console.log('ika saaaaaaaawa')
          }*/
        
          var statP1=item.winner==='player1'?'Won':'Lost'
          var statP2=item.winner==='player2'?'Won':'Lost'
          var player1Color=''
          var player2Color=''
           var myOutcome='LOST',myOutcomeSpan='+0',myOutcomeCol='#CB1E31'
          if(item.winner==='player1'){player1Color='#1ecb97'}else{player1Color='#CB1E31'}
          if(item.winner==='player2'){player2Color='#1ecb97'}else{player2Color='#CB1E31'}
          if(item.winner==='player1'&&item.bet==='player1'){myOutcome='WON',myOutcomeSpan='+'+item.p1Points,myOutcomeCol='#1ecb97'}
          if(item.winner==='player2'&&item.bet==='player2'){myOutcome='WON',myOutcomeSpan='+'+item.p2Points,myOutcomeCol='#1ecb97'}
          //myOutcome
          var myPick=''
          if(item.bet==='player1'){myPick=item.fighter1Name}
          if(item.bet==='player2'){myPick=item.fighter2Name}
            var matchTime=''
           // //console.log('item.timeInMillis',item.timeInMillis)
          if(item.timeInMillis){
            matchTime=Number(item.timeInMillis)
            matchTime = dayjs(item.timeInMillis).format('DD MMM YYYY HH:mm A')
            //matchTime=new Date(item.timeInMillis).toDateString()
          }else{matchTime=item.time}
          ////console.log('matchTime',matchTime)
          var status1Item=''
          if(item.status1==='notPlayed'&&(new Date().getTime()<item.timeInMillis)){status1Item=<div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount}/></div>}
          if(item.status1==='notPlayed'&&(new Date().getTime()>item.timeInMillis)){status1Item=<p className={style.eventStatP} style={{color:'#CB1E31'}}>Ongoing</p>}
          if(item.status1==='played'){status1Item=<p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>}
          if(item.status1==='ongoing'){status1Item=<p className={style.eventStatP} style={{color:'#CB1E31'}}>Ongoing</p>}
          if(item.status1==="cancelled"){status1Item=<p className={style.eventStatP} style={{color:'#CB1E31'}}>Cancelled</p>}
          ////console.log('item.status1 rakada',item.id,item.status1,new Date().getTime(),item.timeInMillis)
          return(
         <div className={style.listDiv} key={index}>
                <div className={style.theCont0}>
                      <div className={style.theCont01}>
                        <p>{this.state.selectedEvent} - {item.match}</p>
                        <p>{matchTime}</p>
                      </div>
                      
                      {status1Item}
                      {/*item.status1==='notPlayed'?<>{timeDiff>300000?<div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount}/></div>:<p className={style.eventStatP} style={{color:'#CB1E31'}}>Ongoing</p>}</>:
                      <p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>*/}


                      <div className={style.theCont}>
                      <div className={style.theContLeft}>
                        <div className={style.imgDiv} style={{borderColor:item.status1==='played'?player1Color:'transparent'}}>
                      <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img>
                      {item.status1==='played'?<p className={style.gameP} style={{backgroundColor:item.winner==='player1'?'#1ecb97':'#CB1E31'}}>{statP1}</p>:null}
                      </div>
                      <p className={style.P1}>{item.fighter1Name}</p>
                      <p className={style.countryP}>{item.fighter1Country}</p>
                      <p className={style.P2}>{item.p1Rec}</p>
                      </div>
                      <BsFillLightningFill className={style.sepIc}/>
                      <div className={style.theContRight}>
                      <div className={style.imgDiv} style={{borderColor:item.status1==='played'?player2Color:'transparent'}}>
                      <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img>
                      {item.status1==='played'?<p className={style.gameP} style={{backgroundColor:item.winner==='player2'?'#1ecb97':'#CB1E31'}}>{statP2}</p>:null}
                      </div>
                      <p className={style.P1}>{item.fighter2Name}</p>
                      <p className={style.countryP}>{item.fighter2Country}</p>
                      <p>{item.country}</p>
                      <p className={style.P2}>{item.p2Rec}</p>
                      </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {this.state.dataAvailable?<div id={style.statDiv}>
                        <p className={style.pickP}>Your Pick: <span style={{color:item.status1==='played'?myOutcomeCol:null}}>{myPick}</span></p>
                        <h3 className={style.statP}>Outcome: {item.status1==='played'?<><span className={style.statS1} style={{color:myOutcomeCol}}>{myOutcome}</span><span className={style.statS2} style={{color:myOutcomeCol}}>{myOutcomeSpan}</span></>:<span>N/A</span>}</h3>
                        <p></p>
                      </div>:
                      <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={()=>this.openTheModal()}>MAKE YOUR PICK</button></div>
                     }
                      </div>       
         </div>
          )})}
        </div>
      </div>
      {this.state.opendetailsModal?<div className={style.detailsModal} onClick={()=>this.setState({opendetailsModal:false})}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={this.state.allMatches} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey}/></div>:null}
      {this.state.openLoginModal?<div className={style.detailsModal} onClick={()=>this.setState({openLoginModal:false})}><LogIn/></div>:null}
      {this.state.editDetailsModal?<div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({editDetailsModal:false})} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName']+'::'+this.state.currentEventUserInfo['flockName']+'::'+this.state.profilePhoto+'::'+this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey}/></div>:null}
      <ToastContainer/>
      {this.state.showProgressBar?<ProgressBar/>:null}
      </>
    )
  }
}

export default RamUfc

/* 
$blackish:#292f51;
$redColor:#CB1E31;
$pastEve:#919191;
$theDark:#b2b2b2;
.container{
    min-height: 100vh;
  }
  .eventsCont {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: -20px;
    margin-bottom: 25px;
}
.eventsP {
    margin-right:10px;
    border: 1px solid #909090;
    color: #909090;
    text-align: center;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    padding: 0px 20px;
    font-size: 14px;
}
  .listCont{
    display: flex;
    flex-wrap: wrap;
    //background-color: red;
  }
  .listDiv{
    box-sizing: border-box;
    height:auto;
    width:47%;
    border: 1px solid #eee;
    background-color: white;
    padding:30px;
    padding-top: 20px;
    padding-bottom:20px;  
    display: flex;
    align-items: center;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2); 
    margin: 10px;
    
}
.matchesHeadDiv{
    display: flex;
    align-items: center;
    margin-top: 0px;
    flex-wrap: wrap;
}
  .theCont0{
    width: 100%; 
}
  .theCont01{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $blackish;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 5px;
    padding-top: 10px;
    font-weight: 500;
}
.theCont{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
 }
 .theContLeft{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
   
}
.theContRight{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
   
}
.imgDiv{
    height:84px;
    width: 84px;
    border-radius:80px;
    background-color: #fff;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2); 
    position: relative;
    display: flex;
    justify-content: center;
    border: 2px solid transparent;
}
.theImg1{
    height:80px;
    width: 80px;
    border-radius:80px;
    object-fit: contain;
}
.gameP{
    position: absolute;
    bottom:0;
    background-color: #e24c5e;
    padding: 2px 10px;
    border-radius: 20px;
    color: white;
    margin-bottom: -3px;
    font-size: 14px;
    background-color: #1ecb97;
}
.dateDiv{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //height: 30px;
   // border-top: 1px solid #eee;
    margin-top: -10px;
    color: $blackish;
    padding-top: 0px;
}
#statDiv{
    //display: flex;
    width: 100%;
    //display: flex;
    align-items: center;
    height: 30px;
    border-top: 1px solid #eee;
    margin-top: 15px;
    padding-top: 10px;
   // justify-content: space-between;
    padding-right: 0px;
   
}

.pickP{
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
    color: $blackish;
    margin-top: 3px;
   
}
.statP{
    font-size: 14px;
    font-weight: 600;
    text-align: right;
    color: $blackish;
    //background-color: green; 
    margin-top: -19px;
}
.statS1{
    margin-right: 10px;
    color: $redColor;
    
}
.statS2{
  color: $redColor;
}
.sepIc{
    margin-top: 20px;
    font-size: 40px;
    color: $redColor;
    
}
.eventStatP{
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: $redColor;
    margin-top: 10px;
}
.P1{
    margin-top: 10px;
    font-weight: 700;
    color: $blackish;
    font-size: 18px;
    text-align: center;
}
.countryP{
    font-weight: 600;
    color: #eb9d0c;
    text-align: center;
}
.P2{
    margin-top: 3px;
    color: #c1c1c1;
    font-size: 14px;
    text-align: center;
}
.p1Points{
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    width: 50%;
    margin-right: -28px;
}
.usP{
    margin: 0px 20px;
    color: $redColor;
    font-weight: 600;
    font-style: italic;
}
.p2Points{
    font-size: 20px;
    font-weight: 700;
    width: 50%;
    text-align: center;
    margin-left: -28px;
}
.eveP{
    font-weight: 600;
    color: $blackish; 
    font-size: 30px;
    font-weight: 700;
    font-family: "Rubik", sans-serif;
    padding: 0px 0px;
    margin-top: 20px;
}
.eveP span{
    color: $redColor;
}
.eveDiv{
    width: 100%;
    display: flex;
    //justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
.eveDiv p{
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid $blackish;
    color: $blackish;
    width: 140px;
    text-align: center;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
}
#playerP1 {
    background-color: #1ecb97;
    color: white;
    border-color: #1ecb97;
}

#playerP2 {
    background-color: $redColor;
    color: white;
    border-color: $redColor;
}

#playerP3 {
    background-color: $blackish;
    color: white;
    border-color: $blackish;
}
.profileDiv{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    border: 1px dotted $blackish;
    width: auto;
    //justify-content: space-around;
    padding: 10px 20px;
    border-radius: 10px;
    min-width: 300px;


    position: absolute;
    top: 0;right: 0;
    margin-top: 210px;
    margin-right: 100px;
}
.imageDiv{
    margin-right: 20px;
    border-radius: 5px;
    width: 70px;
    height:70px;
    background-color: white;
   // border: 1px solid #cbcbcb;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.imageDiv img{
    height: 100%;
    object-fit: cover;
}
.detailsDiv p{
  color: $blackish;
  margin: 2px 0px;
  font-weight: 600;
  font-size: 15px;
  //margin-top: 50px;
}
.personIC{
    color: #eee;
    font-size: 50px;
}
#editP{
    border: 1px solid $redColor;
    color: $redColor;
    padding: 2px 0px;
    border-radius: 5px;
    width: 100px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;
}
.scoresCont{
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}
.scoresCont div{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px dotted $blackish;
    padding: 30px 10px;
    border-radius: 10px;
}
.scoreP1{
    color: $blackish;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}
.scoreP2{
  color: $redColor;
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  text-align: center;
}
.theCountDiv{
    display: flex;
    justify-content: center;
}
.theCount{
    font-size: 14px;
    font-weight: 600;
    color: $blackish;
    margin-top: 10px;
}
.detailsModal{
    position: fixed;
    top:0;bottom:0;left:0;right:0;
    z-index: 10;
    background-color: #00000022;
    display: flex;
    align-items: center;
    justify-content: center;
}
.resultsBtn{
    margin-right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #e1cb08;
    border: none;
    font-weight: 600;
    cursor: pointer;
    //background-color: #63ae5f;
    //color: white;
   
}
.detailsModal{
    position: fixed;
    top:0;bottom:0;left:0;right:0;
    z-index: 10;
    background-color: #00000022;
    display: flex;
    align-items: center;
    justify-content: center;
}
.picksDiv{
    background-color: $blackish;
    width: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
    margin-left: 0px;
    margin-bottom: 30px;
    margin-top: 15px;
    cursor: pointer;
    border-radius: 5px;
}
.picksP{
    background-color: $blackish;
    color: white;
    border: 1px solid $blackish;
    font-size: 16px;
    font-weight: 600;  
    //background: linear-gradient(to right, #CB1E31 0%, #fa495e 100%);
}
.joinRamDiv{
    display: flex;
    justify-content: center;
    border-top: 1px solid #eee;
    margin-top: 15px;
}
.joinRamBtn{
    background-color: transparent;
    //width: 60%;
    border: none;
    border: 1px solid $blackish;
    color: $blackish;
    padding: 7px 10px;
    margin-top: 15px;
    font-size: 16px;
    align-self: center;
    border-radius: 5px;
    cursor: pointer;
}
.thePickDiv{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-top: 1px solid #eee;
    margin-top: 15px;
    padding-top: 10px;
   
}
.thePickP{
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid $redColor;
    color: $redColor;
    padding-bottom: 5px;
}
.headList{
    margin-right: 20px;
    border: 1px solid $blackish;
    padding: 5px 20px;
    border-radius: 5px;
    display: flex;
   // flex-direction: column;
    align-items: center;
    color: $blackish;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;
}
.selectHomeEventDiv{
    position: absolute;
    top:0;right:0;bottom: 0;left: 0;
    background-color: white;
    font-size: 12px;
    color: $blackish;
    border-radius: 5px;
    background-color: #00000011;
    display: flex;
    justify-content: flex-end;
}
.selectHomeEventDiv button{
   border: 1px solid #eee;
   padding: 4px 7px;
   border-radius: 5px;
   background-color: $redColor;
   margin-top: 2px;
   margin-right: 5px;
   cursor: pointer;
   height: 30px;
   font-size: 12px;
   color: white;
   margin-right: 35px;
   
}
.headListDiv2{
    display: flex;
    margin-top: 0px;
    align-items: center;
    margin-right: 10px;
}
.headListP1{
    font-size: 14px; 
 }
 .headListP2{
     font-size: 10px; 
     
 }
 .headListP3{
     font-size: 10px; 
 }

 .resultsCont{
    display: flex;
    flex-wrap: wrap;
 }
 .resultsDiv{
    margin-bottom: 10px;
 }
 .lastUpdateP{
    font-size: 10px;
    color: #1ecb97;
    font-weight: 600;
    margin-top: 4px;
    margin-left: 5px;
    //color: $redColor;
 }
 .ufcLinkDiv{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5px;
 }
 .ufcLinkInput{
    width: 300px;
    margin-right: 5px;
    padding: 0px 5px;
    height: 32px;
    border: none;
    border: 1px solid #c2c2c2;
    border-radius: 2px;
    outline: none;

 }
 .ufcLinkSend{
    width:80px;
    height: 32px;
    background-color: $redColor;
    border: none;
    border-radius: 2px;
    color: white;
    cursor: pointer;
 }
 .shareDiv{
    border: 1px solid $redColor;
    width: 150px;
    display: flex;
    justify-content: center;
    height: 30px;
    align-items: center;
    border-radius: 5px;
    color: $redColor;
    margin-top: 10px;
    cursor: pointer;
 }
 .shareDiv p{
    margin-right: 5px;
 }
@media all and (max-width: 900px) {
    .profileDiv{
        display: flex;
        margin-bottom: 30px;
        padding: 20px 20px;
        position: relative;
        margin-top: 20px;
        margin-right: 0px;
        max-width: 400px;
        min-width: auto;
    }
}
@media all and (max-width: 800px) {
      .listDiv{
        width:48%;
        padding:20px;
        padding-top: 20px;
        padding-bottom:20px;  
        margin: 5px;
      }
     
}
@media all and (max-width: 600px) {
      .listDiv{
        width:100%;
        padding:20px;
        padding-top: 20px;
        padding-bottom:20px;  
        margin: 10px;  
    }
    .scoreP1{
        font-size: 20px;
    }
    .scoreP2{
      font-size: 16px;
      font-weight: 600;
    }
}
@media all and (max-width: 430px) {
    
      .listDiv{
        padding:20px;  
        margin: 0px;
        margin-bottom: 10px;  
    }
    .scoresCont div{
        width: 32%;
    }
    .scoreP1{
        font-size: 18px;
    }
    .eveP{
        font-size: 26px;
    }
    
}
@media all and (max-width: 360px) {
      .listDiv{
        padding: 10px 10px 30px 10px;
      }
      .profileDiv{
        margin-bottom: 30px;
        width: 90%;
        padding:15px 10px;
        position: relative;
        margin-top: 20px;
        margin-right: 0px;
    }
    .imageDiv{
        margin-right: 20px;
        border-radius: 5px;
        width: 60px;
        height:60px;
    }
    .eveP{
        margin-top: 0px;
    }
    }





































































 
*/