import React, { Component } from 'react'
import style from "./NCAA.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from './NCAADetailsModal'
import EditDetails from './DetailsModalCopy'
import NCAAModal from './NCAAModal'
import LogIn from '../LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios"
import dayjs from 'dayjs';
var allMatches = []
var selectedRamUfcArray = [], selectedNflArray = [], selectedMarchMadnesArray = []
//player1: 'West Virginia',player2: 'Memphis'
const firstRound = [
  {id:'c467e0e09ca315ff9d6914fc12a98324',time: 'Dec 20, 2024 - 20:00 PM', timeInMillis: 1734714000000, player1: 'West Virginia', p1Points: 'N/A', p1Rec: '11-1-0', p2Rec: '11-1-0', player2: 'Memphis', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/indiana.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/notre-dame.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
  {id:'b8cc3dac96e558a3ab0b871b36e108cb',time: 'Dec 21, 2024 - 12:00 PM', timeInMillis: 1734771600000, player1: 'James Madison', p1Rec: '11-1-0', p2Rec: '11-1-0', p1Points: 'N/A', p1Rec: '11-2-0', p2Rec: '11-2-0', player2: 'Western Kentucky', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/smu.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/penn-st.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
  {id:'22',time: 'Dec 21, 2024 - 16:00 PM', timeInMillis: 1734786000000, player1: 'Clemson', p1Rec: '10-3-0', p2Rec: '11-2-0', p1Points: 'N/A', player2: 'Texas', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/clemson.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/texas.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
  {id:'55',time: 'Dec 21, 2024 - 20:00 PM', timeInMillis: 1734800400000, player1: 'Tennessee', p1Rec: '10-2-0', p2Rec: '10-2-0', p1Points: 'N/A', player2: 'Ohio St.', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/tennessee.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/ohio-st.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
]
//
const quarterFinals = [
  { time: 'Dec 31 2024, 19:30 PM', timeInMillis: 1735662600000, player1: 'Boise St.', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'Penn State/SMU', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/boise-st.svg', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
  { time: 'Jan 1 2025, 13:00PM', timeInMillis: 1735725600000, player1: 'Clemson/Texas', p1Rec: '0-0-0', p2Rec: '11-2-0', p1Points: 'N/A', player2: 'Arizona St.', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/arizona-st.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
  { time: 'Jan 1 2025, 17:00PM', timeInMillis: 1735740000000, player1: 'Oregon', p1Rec: '13-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'Ohio State/Tennessee', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/oregon.svg', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
  { time: 'Jan 1 2025, 20:45PM', timeInMillis: 1735753500000, player1: 'Notre Dame/Indiana', p1Rec: '0-0-0', p2Rec: '11-2-0', p1Points: 'N/A', player2: 'Georgia', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/georgia.svg', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
]
const semiFinals = [
  { time: 'Jan 9 2025, 19:30PM', timeInMillis: 1736440200000, player1: 'N/A', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Semi Finals' },
  { time: 'Jan 10 2025, 19:30PM', timeInMillis: 1736526600000, player1: 'N/A', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Semi Finals' },
]
const finals = [
  { time: 'Jan 20 2025, 19:00PM', timeInMillis: 1737388800000, player1: 'N/A', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Finals', },
]

var ncaafItems=[
  {
    "id": "c467e0e09ca315ff9d6914fc12a98324",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-18T02:13:00Z",
    "completed": true,
    "home_team": "West Virginia Mountaineers",
    "away_team": "Memphis Tigers",
    "scores": [
      {
        "name": "West Virginia Mountaineers",
        "score": "37"
      },
      {
        "name": "Memphis Tigers",
        "score": "42"
      }
    ],
    "last_update": "2024-12-19T09:30:53Z"
  },
  {
    "id": "b8cc3dac96e558a3ab0b871b36e108cb",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-18T22:30:00Z",
    "completed": true,
    "home_team": "James Madison Dukes",
    "away_team": "Western Kentucky Hilltoppers",
    "scores": [
      {
        //James Madison Dukes
        "name": "James Madison Dukes",
        "score": "27"
      },
      {
        //Western Kentucky Hilltoppers
        "name": "Western Kentucky Hilltoppers",
        "score": "17"
      }
    ],
    "last_update": "2024-12-19T09:30:53Z"
  },
  {
    "id": "c467e0e09ca315ff9d6914fc12a98324",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-19T02:11:33Z",
    "completed": true,
    "home_team": "UNLV Rebels",
    "away_team": "California Golden Bears",
    "scores": [
      {
        "name": "UNLV Rebels",
        "score": "24"
      },
      {
        "name": "California Golden Bears",
        "score": "13"
      }
    ],
    "last_update": "2024-12-19T09:30:53Z"
  },
  {
    "id": "c69b00c0f721d19e07d950e056c17c83",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-20T00:00:00Z",
    "completed": false,
    "home_team": "Sam Houston State Bearkats",
    "away_team": "Georgia Southern Eagles",
    "scores": null,
    "last_update": null
  },
  {
    "id": "59a2997a9ed7c8f63a224b32355bd09f",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-20T17:00:00Z",
    "completed": false,
    "home_team": "Jacksonville State Gamecocks",
    "away_team": "Ohio Bobcats",
    "scores": null,
    "last_update": null
  }
]
class NCAA extends Component {
  state = {
    theMenu: 'mainCard', theItems: [], opendetailsModal: false, getRamDetails: false, dataAvailable: false, theEvent: 'Upcoming Events', currentID: 1,
    theRamUfc: '', theMarchMadness: false, theNfl: false, theFifa: '', userId: '', userLoggedIn: false, eventToShow: false,
    teamName: '', flockName: '', openLoginModal: false, clickHere1: 'CLICK HERE TO MAKE YOUR PICKS', clickHere2: 'CLICK HERE TO ENTER THE GAME', theEventTime: 0,
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'NCAAF', pastEventsAvailable: false,
    eventRamUfc: '', eventMarchMadness: '', eventNfl: '', ramUfcMaincardArray: [], pastGames: [], theEventTitle: '', theEventKey: '', ramUfcEarlyPrelimsArray: [], count: 0,
    ramUfcPrelimsArray: [], nflArray: [], marchMadnessArray: [], ufcSubHeadings: '', upcomingGames: [], currentEventUserInfo: {}, allMatches: [], expired: false, ncaaModal: false,
    firstRoundArray: [], quarterFinalsArray: [], semiFinalsArray: [], finalArray: [], allEvents: [], currentSelection: '', isFirstRoundDataAvailable: false,allGames:[],
    isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,endTime:'',editType:'',
    isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false,selectHomeEvent:false
  }
  componentDidMount = () => {
    //this.sendMatchesToFirebase()
    this.checkAuth()

    //this.getRanking()
    //this.checkForOddsUpdate()

    //this.getNCAAFMatches()
  
    //this.getNCAAFResults()

  }
  getNCAAFResults=()=>{
    firstRound.map((item,index)=>{
      var gamesId=item.id
      var theF1Name=item.player1.split(' ')
      theF1Name=theF1Name[0]
      var theF2Name=item.player2.split(' ')
      theF2Name=theF2Name[0]
      var name1=item.player1
      var name2=item.player2
      ncaafItems.map((item2)=>{
        var oddsId=item2.id  
        if(gamesId===oddsId){
          var theScores=item2.scores
          //console.log('the theScores',theScores)
          //console.log('yeeeees ids',gamesId,yesIds)
          if(theScores){
            var withScores = JSON.stringify(theScores);
            withScores = withScores.replace(/,/g, "|").replace(/{/g, " ").replace(/}/g, "").replace(/"/g, "").replace(/]/g, "");
            var homePoints= withScores.split('|')[1].trim().replace('score:','')
            var awayPoints= withScores.split('|')
            awayPoints=awayPoints[awayPoints.length - 1].replace('score:','')
            homePoints=Number(homePoints)
            awayPoints=Number(awayPoints)
            var homeName2=withScores.split('|')[0].replace('[ name:','').replace( /\s\s+/g, ' ' )
            var awayName2=withScores.split('|')
            awayName2=awayName2[awayName2.length - 2].replace('name:','').replace( /\s\s+/g, ' ' )
            console.log('awayName2',awayName2)
            //console.log('homePoints',name1,homePoints,'awayPoints',name2,awayPoints,'theWinner',theWinner)
            //console.log('home details oddds',item2.home_team,'db',theF1Name)
            //console.log('away details odds',item2.away_team,'db',theF2Name)
            if(item2.home_team.includes(theF1Name)){
              var theWinner=''
              firstRound[index]['p1Points']=homePoints
              if(homePoints>awayPoints){theWinner=name1}
              if(homePoints<awayPoints){theWinner=name2}
              firstRound[index]['winner']=theWinner;
            }
            if(item2.away_team.includes(theF2Name)){
              var theWinner=''
              firstRound[index]['p2Points']=awayPoints
              if(homePoints>awayPoints){theWinner=name1}
              if(homePoints<awayPoints){theWinner=name2}
              firstRound[index]['winner']=theWinner;
            }
            console.log('firstRoundlllllll',firstRound)
          }
        }
      })
    })
  }
  sendMatchesToFirebase = () => {
    var generalDb = firebase.database().ref('/theEvents/NCAAF/ncaaf20242025/')
    firstRound.map((item, index) => {
      generalDb.child('/firstRound/firstRoundMatch' + index + '/').set(item)
    })
    quarterFinals.map((item, index) => {
      generalDb.child('/quarterFinals/quarterFinalsMatch' + index + '/').set(item)
    })
    semiFinals.map((item, index) => {
      generalDb.child('/semiFinals/semiFinalsMatch' + index + '/').set(item)
    })
    finals.map((item, index) => {
      generalDb.child('/finals/finalsMatch' + index + '/').set(item)
    })
  }
  goToServer = () => {
    this.checkForOddsUpdate()

    // this.checkForOutcome()



    //this.calculateRanking()
    //this.getRanking()  
    //this.checkForOddsUpdate()
    //this.checkForOutcome()
  }
  handleChildClick = () => {
    this.setState({ count: this.state.count + 1, ncaaModal: false });
    //console.log('azeeza', this.state.count)
  };
  checkForOddsUpdate = async () => {
    try {
     
      if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
      var theLink = 'theEvents::NCAAF::' + this.state.theEventKey + '::' + this.state.currentSelection
      var theQuery = encodeURIComponent(theLink)
      console.log('queeeeeeeeeeeeeeery',theQuery)
      
      await axios.get("http://localhost:4000/updateNCAAFOdds?term=" + theQuery)
        .then((res) => {
          var theItems = res.data.result
          //console.log('theItems', theItems)

        })
    } catch (error) {
      //console.log('error', error)
    }
  }
  checkForOutcome=async () => {
    try {
      //theEvents::NCAAF::ncaaf20242025::firstRound
      var scoreName=''
      if(!this.state.theEventKey||this.state.theEventKey.length<3)return
      
      //var theLink2='theEvents::ramUfc::'+theK
      if(this.state.currentSelection==='firstRound'){scoreName='firstRoundScore'}
      if(this.state.currentSelection==='quarterFinals'){scoreName='quarterFinalsScore'}
      if(this.state.currentSelection==='semiFinals'){scoreName='semiFinalsScore'}
      if(this.state.currentSelection==='finals'){scoreName='finalsScore'}
      var theLink='theEvents::NCAAF::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName
      if(!this.state.theEventKey||this.state.theEventKey.length===0)return
      
      var theQuery=encodeURIComponent(theLink) 
      console.log('ncaaf query',theQuery)
      //return
      await axios.get("http://localhost:4000/getNCAAFResults?term="+theQuery)
        .then((res) => {
          //console.log('theItems',res)
          var theOutcome = res.data
          //console.log('theItems',theOutcome)
          if(theOutcome==='sucesss'){}
        })
        } catch (error) {
          //console.log('error',error)
        }
    }
     /*calculateRanking=(theArr)=>{
        var dbLink2="/userBets/scoreBoards/ramUfc/ufc-310-December72024/"
        var dbLink3="/userBets/ramUfc/ufc-310-December72024/"
        var dbLink4='/ramData/events/ramUfc/ufc-310-December72024/details/currentScore/'
        var dbLink5='/ramData/events/ramUfc/ufc-310-December72024/details/currentRank/'
       
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
          var userArr=[],i=0
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
            }else{
              userArr.push(0)
            }
            if(theArr.length===i){
              var pointsSum = userArr.reduce((partialSum, a) => partialSum + a, 0);
              pointsSum=Number(pointsSum.toFixed(2))
              var theItem={}
              theItem[theUid]=pointsSum
              theAllItems[theUid]=pointsSum
              var countArr={id:theUid,points:pointsSum}
              theArrCount.push(countArr)
              usersDb.child(theUid+dbLink4).set(pointsSum+'')
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
}*/
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId) }

      } else {
        this.setState({ userLoggedIn: false })
        this.checkUpcomingPastGames(userId)
      }
    })
  }

  checkUpcomingPastGames = async (userId) => {
    //return

    var gamesInfo = firebase.database().ref('/theEvents/NCAAF/eventIds/')
    var i = 0, allGames = []

    await gamesInfo.once('value', dataSnapshot => {
      var gamesCount = dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        //console.log('naingia')
        i++
        var pastG = {}, upcomingG = {}, theEvents = {}
        var key = data.key
        var time = data.val().time
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        var theData = data.val()
        //var currentSelection = data.val().currentSelection
        var currentSelection='quarterFinals'


        theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection,theData:theData }
        allGames.push(theEvents)

        if (gamesCount === i) {
          var theEventTitle = '', theEventKey = '', theEventTime = 0
          if (allGames.length > 0) { allGames = allGames.sort(function (a, b) { return a.time - b.time }); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'],endTime= allGames[0]['endTime']}
        }
        var expired = false
        if ((theEventTime - new Date().getTime()) < 86400000) {
          expired = true
        }
        if ((currentSelection === 'firstRound')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopFirstRounEdit'})
        }
        if ((currentSelection === 'quarterFinals')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopQuarterEdit' })
        }
        if ((currentSelection === 'semiFinals')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: true, isFinalsDataAvailable: false,editType:'stopSemiEdit'})
        }
        if ((currentSelection === 'finals')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: true, isFinalsDataAvailable: true,editType:'stopFinalEdit'})
        }
        this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection, expired,endTime }, () => {
          this.getNCAAFMatches(userId)
          ////console.log('currentSelection',this.state.currentSelection)
        })
      })
    })
  }
  getNCAAFMatches = (userId) => {
    allMatches = []
    this.setState({ firstRoundArray: [], quarterFinalsArray: [], semiFinalsArray: [], finalArray: [], theMenu: 'mainCard', dataAvailable: false, currentEventUserInfo: {} })
    var userInfoDb = firebase.database().ref('/theEvents/NCAAF/').child(this.state.theEventKey)
    userInfoDb.once('value', dataSnapshot => {
      ////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      ////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var firstRoundCount = dataSnapshot.child('firstRound').numChildren()
      var quarterFinalsCount = dataSnapshot.child('quarterFinals').numChildren()
      var semiFinalsCount = dataSnapshot.child('semiFinals').numChildren()
      var finalsCount = dataSnapshot.child('finals').numChildren()
      var theInfo = dataSnapshot.val()
      //console.log('the event eventSelection', theInfo)
      //console.log('ncaaf20242025', theInfo.finals)
      if (theInfo.firstRound) {
        var array1 = []
        var i = 0
        for (var key in theInfo.firstRound) {
          i++
          var theData = theInfo.firstRound[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === firstRoundCount) {
            ////console.log('whole maincard Array',array1)
            this.setState({ firstRoundArray: array1, theItems: array1 })
          }
        }
      }
      if (theInfo.quarterFinals) {
        var array1 = []
        ////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.quarterFinals) {
          i++
          var theData = theInfo.quarterFinals[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === quarterFinalsCount) {
            ////console.log('whole prelimms Array',array1)
            this.setState({ quarterFinalsArray: array1 })
            this.getMatchesInfo(this.state.userId,'firstRound')
          }
        }
        //prelimsArray
      } else {
        ////console.log('hakuna prelimsssssss')
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'firstRound')
        }
      }
      //console.log('iko finalssssssssssssssssss 0000')
      if (theInfo.semiFinals) {
        var array1 = []
        ////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.semiFinals) {
          i++
          var theData = theInfo.semiFinals[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === semiFinalsCount) {
            console.log('wholesemiFinalsArray',array1)
            this.setState({ semiFinalsArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId,'quarterFinals')
              //this.getMatchesInfo(this.state.userId,'semiFinals')
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'quarterFinals')
          ////console.log('hakuna early prelimsssssss')
        }
      }
      //console.log('iko finalssssssssssssssssss 1111')
      if (theInfo.finals) {
        var array1 = []
        //console.log('iko finalssssssssssssssssss 2222')
        var i = 0
        for (var key in theInfo.finals) {
          i++
          var theData = theInfo.finals[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === finalsCount) {
            ////console.log('whole early prelimms Array',array1)
            this.setState({ finalArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId,'semiFinals')
              this.getMatchesInfo(this.state.userId,'finals')
              
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'semiFinals')
          ////console.log('hakuna early prelimsssssss')
        }
      }
    })
    ////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
  }
  getMatchesInfo = async (userId,selection) => {
    ////console.log('allMatches',userId,this.state.theEventKey)
    //return
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NCAAF/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NCAAF/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NCAAF/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NCAAF/')
    var currentEventUserInfo = '',totalScore=0
    await selectedMatchesKeyDb.once('value', dataSnapshot => {
      ////console.log('the key',dataSnapshot.val())
      if (!dataSnapshot.val()) return
      photoRefDb.once('value', dataSnapshot => {
        ////console.log('proofile photo',dataSnapshot.val())
        if (dataSnapshot.val()) {
          this.setState({ profilePhoto: dataSnapshot.val() })
        }
      })
      userInfoDb.once('value', dataSnapshot => {
        if (!dataSnapshot.val()) return
        //console.log('the type user info', dataSnapshot.val())
        if (dataSnapshot.val()) {
          var theInfo = dataSnapshot.val()
          this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank })
          currentEventUserInfo = dataSnapshot.val()
          totalScore=Number(theInfo.firstRoundScore)+Number(theInfo.quarterFinalsScore)+Number(theInfo.semiFinalsScore)+Number(theInfo.finalsScore)
          console.log('the dddddddd',theInfo)

        }
      })
      var thetrrrr = ''
      //console.log('this.state.currentSelection', this.state.currentSelection)
     // console.log('firstRoundArray',this.state.firstRoundArray,'quarterFinalsArray',this.state.quarterFinalsArray,'semiFinalsArray',this.state.semiFinalsArray)
      if (selection === 'firstRound') {
        thetrrrr = this.state.firstRoundArray
      }
      if (selection === 'quarterFinals') {
        thetrrrr = this.state.quarterFinalsArray
      }
      if (selection === 'semiFinals') {
        thetrrrr = this.state.semiFinalsArray
      }
      if (selection === 'finals') {
        thetrrrr = this.state.finalArray
      }

      //var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
      ////console.log('thetrrrr',thetrrrr)
      userBetsDb.once('value', dataSnapshot => {
        ////console.log('the bets data',dataSnapshot.val())
        ////console.log('this.state.theItems',this.state.theItems)
        if (!dataSnapshot.val()) return
        var itemsCount = dataSnapshot.numChildren()
        console.log('selection',selection,'itemsCount',itemsCount)
            if(itemsCount===4){this.setState({isFirstRoundPicked:true})}
            if(itemsCount===8){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true})}
            if(itemsCount===10){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true})}
            if(itemsCount===12){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true,isFinalsPicked:true})}
            if(selection==='firstRound'&&itemsCount<4)return
            if(selection==='quarterFinals'&&itemsCount<8)return
            if(selection==='semiFinals'&&itemsCount<10)return
            if(selection==='finals'&&itemsCount<12)return
            // console.log('MEGA count',itemsCount)
        var i = 0, thePoints = [], currentScore = []
        dataSnapshot.forEach((data, index) => {
          i++
          console.log('thank DAATA',selection,data.val())
          thetrrrr.map((item) => {
            ////console.log('thank you sir',item.winner)
            if (item.id === data.key) {
              //console.log('thank you sir')
              item['bet'] = data.val()
              if (item.status1 === 'played') {

                ////console.log('item.winner',item.winner)
                ////console.log('my beeeeet',data.val())
                ////console.log('item.p1Points',item.p1Points)
                ////console.log('item.p2Points',item.p2Points)
                if (item.winner === 'player1' && data.val() === 'player1') { currentScore.push(item.p1Points);thePoints.push(item.p1Points);}
                if (item.winner === 'player2' && data.val() === 'player2') { currentScore.push(item.p2Points);thePoints.push(item.p2Points);}
                ////console.log('p1 pointsss',currentScore)

              }else{
              if (data.val() === 'player1') {
                thePoints.push(item.p1Points);////console.log('the points',item.p1Points)
              }
              if (data.val() === 'player2') {
                thePoints.push(item.p2Points);////console.log('the points',item.p2Points)
              }}
            }
          })
          /*this.state.theItems.map((item)=>{
           if(item.id===data.key){
            ////console.log('thank you sir')
            item['bet']=data.val()
            if(item.status1==='played'){
              if(data.val()==='player1'){currentScore.push(item.p1Points);}
            if(data.val()==='player2'){currentScore.push(item.p2Points);}
            }
            if(data.val()==='player1'){thePoints.push(item.p1Points);////console.log('the points',item.p1Points)
              }
            if(data.val()==='player2'){thePoints.push(item.p2Points);////console.log('the points',item.p2Points)
              }
          }
          })*/
          if (itemsCount === i) {

            this.setState({ dataAvailable: true })
            /* if(this.state.theMenu==='mainCard'){this.setState({ramUfcMaincardArray:this.state.theItems})}
             if(this.state.theMenu==='prelimms'){this.setState({ramUfcPrelimsArray:this.state.theItems})}
             if(this.state.theMenu==='earlyPrelims'){this.setState({ramUfcEarlyPrelimsArray:this.state.theItems})}*/

            //if (selection=== 'firstRound') { this.setState({ firstRoundArray: this.state.theItems}) }
            //if (selection === 'quarterFinals') { this.setState({ quarterFinalsArray: this.state.theItems}) }
           // if (selection === 'semiFinals') { this.setState({ semiFinalsArray: this.state.theItems}) }
            //if (selection === 'finals') { this.setState({ finalArray: this.state.theItems}) }
            ////console.log('this.state.theItems',this.state.theItems)
            
          console.log('thePointsssss',thePoints)
            ////console.log('currentScore',currentScore.length)
        //to do do current score additions
            var pointsSum = thePoints.reduce((partialSum, a) => partialSum + a, 0);
            pointsSum = pointsSum.toFixed(2)

            //gamesDataRef.child(this.state.theEventKey + '/details/bestPossibleScore/').set(pointsSum)
            currentEventUserInfo['bestPossibleScore'] = pointsSum
            this.setState({ currentEventUserInfo })

            if (currentScore.length > 0) {
              var scoreSum = currentScore.reduce((partialSum, a) => partialSum + a, 0);
              scoreSum = scoreSum.toFixed(2)

              currentEventUserInfo['currentScore'] = scoreSum
              this.setState({ currentEventUserInfo })
              //console.log('currentEventUserInfo', currentEventUserInfo).

             // userInfoDb.child('/currentScore/').set(scoreSum)
              //userInfoDb.child(this.state.currentSelection+'Score').set(scoreSum)
            }
          }
        })
      })

    })
  }
  loadOtherFights = async (theEventKey, theEventTitle) => {
    var eventsInfo = firebase.database().ref('/theEvents/eventsIds/' + theEventKey + '/time')
    await eventsInfo.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      var theEventTime = dataSnapshot.val()
      var expired = false
      if ((theEventTime - new Date().getTime()) < 86400000) {
        expired = true
      }
      if (navigator.onLine === false) {
        this.notify('No internet! please check your internet connection')
        return
      }
      this.setState({ theEventKey, theEventTitle, expired }, () => {
        this.getNCAAFMatches()
      })
    })
  }
  getGamesInfo = async () => {
    var userInfoDb = firebase.database().ref('/events/')

    await userInfoDb.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      if (theInfo.ramUfc !== false) { this.setState({ eventRamUfc: true, ufcSubHeadings: theInfo.ramUfc.split(':') }); this.getUfcItems('ramUfc'); }
      if (theInfo.marchMadness === true) { this.setState({ eventMarchMadness: true }), this.getNflMarchMadnessItems('marchMadness', 'marchMadnessArray') }
      if (theInfo.nfl === true) { this.setState({ eventNfl: true }), this.getNflMarchMadnessItems('nfl', 'nflArray') }

    })
  }
  getUfcItems = async (name) => {
    var userInfoDb = firebase.database().ref('/activeEvents/').child(name)

    userInfoDb.once('value', dataSnapshot => {
      ////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      ////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var mainCardCount = dataSnapshot.child('mainCard').numChildren()
      var prelimsCount = dataSnapshot.child('prelims').numChildren()
      var theInfo = dataSnapshot.val()
      ////console.log('the event eventSelection',theInfo) 
      if (theInfo.mainCard) {
        var array1 = []
        ////console.log('iko maincarddddd',theInfo.mainCard)
        var i = 0
        for (var key in theInfo.mainCard) {
          i++
          var theData = theInfo.mainCard[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === mainCardCount) {
            ////console.log('whole maincard Array',array1)
            this.setState({ ramUfcMaincardArray: array1 })
            this.setState({ theItems: array1 })
          }
        }
      }
      if (theInfo.prelims) {
        var array1 = []
        ////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.prelims) {
          i++
          var theData = theInfo.prelims[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === prelimsCount) {
            ////console.log('whole prelimms Array',array1)
            this.setState({ ramUfcPrelimsArray: array1 })
          }
        }
        //prelimsArray
      } else {
        ////console.log('hakuna prelimsssssss')
      }
    })
  }
  getNflMarchMadnessItems = async (name, theArr) => {
    var userInfoDb = firebase.database().ref('/activeEvents/').child(name)
    userInfoDb.once('value', dataSnapshot => {
      var count = dataSnapshot.numChildren()
      var theInfo = dataSnapshot.val()
      ////console.log('the event eventSelection',theInfo) 
      if (theInfo) {
        var array1 = []
        ////console.log('iko maincarddddd',theInfo)
        var i = 0
        for (var key in theInfo) {
          i++
          var theData = theInfo[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === count) {
            ////console.log('whole maincard Array',array1)
            this.setState({ [theArr]: array1 })
          }
        }
      }
    })
  }

  getRamInfo = async (userId, event) => {
    var userInfoDb = firebase.database().ref('/users/' + userId).child('upcomingEvents').child(event)
    userInfoDb.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      if (event === 'ramUfc') { selectedRamUfcArray = theInfo }
      if (event === 'marchMadness') { selectedMarchMadnesArray = theInfo }
      if (event === 'nfl') { selectedNflArray = theInfo }
      //hapa ndo nimefika
      //////console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank = ''
      if (theInfo.currentRank === false) { currentRank = 'N/A' } else { currentRank = theInfo.currentRank }
      this.setState({
        flockName: theInfo.flockName, teamName: theInfo.teamName, currentScore: theInfo.currentScore,
        bestPossibleScore: theInfo.bestPossibleScore, currentRank: currentRank, theItems: theInfo.eventSelection
      })
      this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })
    return

    this.setState({ theRamUfc: theRamUfc, theMarchMadness, theNfl, theFifa })
    this.setState({ theRamUfc: theRamUfc }, () => {
      //////console.log('theRamUfc 99999999999999',this.state.theRamUfc);
    });
    //////console.log('this.state.theRamUfc 2525',this.state.theRamUfc)
    var userInfoDb = firebase.database().ref('/users/' + userId).child('upcomingEvents')
    if (theRamUfc === 'selected') {
      this.setState({ dataAvailable: true, clickHere1: 'CLICK HERE TO EDIT YOUR PICKS', clickHere2: 'CLICK HERE TO EDIT THE GAME' })
      userInfoDb.child('ramUfc').once('value', dataSnapshot => {
        var theInfo = dataSnapshot.val()
        //////console.log('the event eventSelection',theInfo.eventSelection) 
        var currentRank = ''
        if (theInfo.currentRank === false) { currentRank = 'N/A' } else { currentRank = theInfo.currentRank }
        this.setState({
          flockName: theInfo.flockName, teamName: theInfo.teamName, currentScore: theInfo.currentScore,
          bestPossibleScore: theInfo.bestPossibleScore, currentRank: currentRank, theItems: theInfo.eventSelection
        })
        this.getCurrentScore(theInfo.eventSelection)
        //localStorage.set('userDetails', userDetails);
      })
    }
    //else{this.setState({theItems:mainCard})}
  }
  getCurrentScore = async (theItems) => {
    var i = 0, theAmount = []
    theItems.map((item, index) => {
      var amount = 0
      //////console.log('kufinish kumalo 1')
      i++
      if (item.status1 === 'played') {
        //////console.log('kufinish kumalo 2',item.bet,item.winner)
        if (item.bet === 'player1' && item.winner === 'player1') {
          amount = Number(item.p1Points)
          theAmount.push(amount)
          //////console.log('kufinish kumalo 3')
        }
        if (item.bet === 'player2' && item.winner === 'player2') {
          amount = Number(item.p2Points)
          theAmount.push(amount)
          //////console.log('kufinish kumalo 4')
        }

        //////console.log('kufinish kumalo 4B',i,theItems.length)
        if (i === theItems.length) {
          //////console.log('kufinish kumalo 5')
          const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
          //////console.log('the current Score',sum)
          this.setState({ currentScore: sum.toFixed(2) })
        }
      }
    })
  }


  hideModal = () => {
    this.setState({ opendetailsModal: false })
    //////console.log('Button clicked!');
  };
  openTheModal = () => {
    //this.notify("Can't make a pick at the moment")
    //return
    console.log('ratatata',this.state.userLoggedIn)
    //this.sendMatchesToFirebase()
    //return
    if(this.state.userLoggedIn===false){
      this.notify("Please Log In to continue")
      this.setState({openLoginModal:true})
      return
    }
    
    /*if(isAvailable===false){
      this.notify("Can't make a pick at the moment")
      return
    }
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    }*/
   console.log('this.state.theEventKey',this.state.theEventKey,this.state.editType)
    var editDbRef=firebase.database().ref('/theEvents/NCAAF/eventIds/'+this.state.theEventKey+'/'+this.state.editType)
    editDbRef.once('value', dataSnapshot => {
      console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
     if((new Date().getTime()>dataSnapshot.val())){
      this.notify('Event pick/edit time expired')
     }
     else{
      if(this.state.currentSelection!=='firstRound'){
        var theDbRef=firebase.database().ref('/userBets/scoreBoards/NCAAF/'+this.state.theEventKey)
        theDbRef.child(this.state.userId).once('value', dataSnapshot => {
          console.log('the dddddddddddd',this.state.userId,dataSnapshot.val())
           if(dataSnapshot.exists()){this.setState({ openLoginModal:false,opendetailsModal: true })}
           else{this.notify("Can't make a pick when the event has already started")}
        })
      }else{
        this.setState({ openLoginModal: true, opendetailsModal: false })
      }
     }
   })
  }

  opeModal2 = () => {
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    }
    this.setState({ editDetailsModal: true })
  }
  notify = (message) => {
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
  itemComponent = (compItems, eventType,isThereData) => {
    var isAvailable = false, is1 = false, is2 = false, is3 = false, is4 = false
    //this.setState({isFirstRoundDataAvailable:true,isQuarterFinalsDataAvailable:false,isSemiFinalsDataAvailable:false,isFinalsDataAvailable:false})
    var currentSelection=this.state.currentSelection
    if (eventType === 'NCAAF First Round') {
      if ((currentSelection === 'firstRound')) {
        if (this.state.isFirstRoundDataAvailable === true) {
          isAvailable = true
        } else {isAvailable = false }
      }
    }
    if (eventType === 'NCAAF Quarter Finals') {
      if ((currentSelection === 'quarterFinals')) {
        if (this.state.isQuarterFinalsDataAvailable === true) {
          isAvailable = true
        } else { isAvailable = false }
      }
    }
    if (eventType === 'NCAAF Semi Finals') {
      if ((currentSelection === 'semiFinals')) {
        if (this.state.isSemiFinalsDataAvailable === true) {
          isAvailable = true
        } else { isAvailable = false }
      }
    }
    if (eventType === 'NCAAF Finals') {
      if ((currentSelection === 'finals')) {
        if (this.state.isFinalsDataAvailable === true) {
          isAvailable = true
        } else {isAvailable=false }
      }
    }
    return (
      compItems.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>{eventType}</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2}</p>
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
              {isThereData&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal(isAvailable)}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
      })
    )
  }
  chooseHomeEvent=(event)=>{
  event.stopPropagation()
  event.preventDefault()
  this.setState({selectHomeEvent:true})
  }
  sendEvent=(event,data,id)=>{
    event.stopPropagation()
    event.preventDefault()
    data['id']=id
    console.log('data',data)
    var theDb=firebase.database().ref('/theEvents/eventToShowHomePage/')
    theDb.set(data,error=>{
      if(!error){
        this.setState({selectHomeEvent:false})
        this.notify('Selected Succesfully')
      }
    })
    }
  render() {
   // console.log('this.state.isFirstRoundDataAvailable',this.state.isFirstRoundDataAvailable)
    //console.log('this.state.isQuarterFinalsDataAvailable',this.state.isQuarterFinalsDataAvailable)
    //console.log('this.state.isSemiFinalsDataAvailable',this.state.isSemiFinalsDataAvailable)
    //console.log('this.state.isFinalsDataAvailable',this.state.isFinalsDataAvailable)
    var flockTeamName = ''
    var itemToModals = ''
    var isPastEvent=''
    var todayInMillis=new Date().getTime()
   if(this.state.endTime<todayInMillis&&(this.state.endTime-todayInMillis)<-86400000){
    isPastEvent=false
   }else{ isPastEvent=true}

    if (this.state.currentSelection === 'firstRound') { itemToModals = this.state.firstRoundArray}
    if (this.state.currentSelection === 'quarterFinals') { itemToModals = this.state.quarterFinalsArray }
    if (this.state.currentSelection === 'semiFinals') { itemToModals = this.state.semiFinalsArray }
    if (this.state.currentSelection === 'finals') { itemToModals = this.state.finalArray }



    if (this.state.dataAvailable) { flockTeamName = this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] }
    else { flockTeamName = false }
    //if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    return (
      <><div className={style.container}>
        {/*<div className={style.eventsCont}>
          <p className={style.eventsP} id={this.state.theEvent === 'Upcoming Events' ? style.playerP1 : style.playerP} onClick={() => this.setState({ theEvent: 'Upcoming Events' })}>UPCOMING EVENTS</p>
          <p className={style.eventsP} style={{ color: this.state.pastEventsAvailable ? null : '#b2b2b2', borderColor: this.state.pastEventsAvailable ? null : '#b2b2b2' }} id={this.state.theEvent === 'Past Events' ? style.playerP1 : style.playerP} onClick={() => this.state.pastEventsAvailable ? this.setState({ theEvent: 'Past Events' }) : null}>PAST EVENTS</p>
        </div>*/}
        {this.state.allEvents.length > 0 ? <div className={style.matchesHeadDiv}>
          {this.state.allEvents.map((item, index) => {
            var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
          
            var theColor='#292f51',timing='Active Event'
            if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
              theColor='#919191'
              timing='Past Event'
            }
            if(this.state.theEventKey===item.id){
              theColor='#CB1E31'
            }
            return (
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title)}>
               <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||this.state.userId==='zZTNto5p3XVSLYeovAwWXHjvkN43'||this.state.userId==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event)}/>
                {this.state.selectHomeEvent?<div className={style.selectHomeEventDiv} onClick={()=>this.setState({selectHomeEvent:false})}><button onClick={(event)=>this.sendEvent(event,item.theData,item.id)}>Make home event</button></div>:null}</>:null}  
              </div>  
            )
          })}
        </div> : null}
        <div className={style.profileDiv}>
          <div className={style.imageDiv}>
            {this.state.profilePhoto.length ? <img src={this.state.profilePhoto} /> :
              <IoPersonSharp className={style.personIC} />}
          </div>
          <div className={style.detailsDiv}>
            <p>RAM Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['teamName'] : 'N/A'}</p>
            <p>Flock Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['flockName'] : 'N/A'}</p>
            {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.opeModal2()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal()}>Make Picks</p>}
          </div>
        </div>
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?<div>
          <p className={style.eventP} onClick={() => this.setState({ ncaaModal: true })}>Enter Event Details</p>
        </div>:null}
        <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
        <div className={style.picksDiv} onClick={() => this.openTheModal()}>
          {/*<p className={style.picksP}>CLICK HERE MAKE YOUR PICKS</p>*/}
          {this.state.dataAvailable ?
            <TypeAnimation
              sequence={[
                'CLICK HERE TO MAKE YOUR PICKS',
                2000,
                'CLICK HERE TO ENTER THE GAME',
                2000
              ]}
              wrapper="span"
              speed={50}
              className={style.picksP}
              repeat={Infinity}
            /> : <TypeAnimation
              sequence={[
                'CLICK HERE TO EDIT YOUR PICKS',
                2000,
                'CLICK HERE TO EDIT THE GAME',
                2000
              ]}
              wrapper="span"
              speed={50}
              className={style.picksP}
              repeat={Infinity}
            />}
        </div>
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?
          <div>
            <button className={style.resultsBtn} onClick={() => this.checkForOddsUpdate()}>Update Match Odds</button>
            <button className={style.resultsBtn} onClick={() => this.checkForOutcome()}>Fetch Results Updates</button>
          </div> : null}

        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.currentP}>{this.state.currentSelection}</p>
            <p className={style.scoreP1}>Best possibe Score:<br/></p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? this.state.currentEventUserInfo['bestPossibleScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont2}>
            <p className={style.scoreP1}>Cumulative Score</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? this.state.currentEventUserInfo['currentScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont3}>
            <p className={style.scoreP1}>Current Rank in NCAAF</p>
            <p className={style.scoreP2}>{this.state.dataAvailable && this.state.currentRank ? this.state.currentRank : 'N/A'}</p>
          </div>
        </div>
        <div className={style.divCont}>
          <div className={style.divCont}>
            <p className={style.titleP}>First Round</p>
            <div className={style.listCont}>           
        {this.state.firstRoundArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NCAAF First Round</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2}</p>
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
              {this.state.isFirstRoundPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}
              </div></div>
          <div className={style.divCont}>
            <p className={style.titleP}>Quarter Finals</p>
            <div className={style.listCont}>{/*this.itemComponent(this.state.quarterFinalsArray, 'NCAAF Quarter Finals')*/}
            {this.state.quarterFinalsArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NCAAF Quarter Finals</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2}</p>
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
              {this.state.isQuarterFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}
              </div></div>
          <div className={style.divCont}>
            <p className={style.titleP}>Semi Finals</p>
            <div className={style.listCont}>
        {this.state.semiFinalsArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NCAAF Semi Finals</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2}</p>
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
              {this.state.isSemiFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}</div></div>
          <p className={style.titleP}>Finals</p>
          <div className={style.listCont} style={{ justifyContent: 'center' }}>           
        {this.state.finalArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NCAAF Finals</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2}</p>
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
              {this.state.isFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}</div></div>
      </div>
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={itemToModals} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentSelection} /></div> : null}
        {this.state.openLoginModal ? <div className={style.detailsModal} onClick={() => this.setState({ openLoginModal: false })}><LogIn /></div> : null}
        {this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null}

        {this.state.ncaaModal ? <div className={style.detailsModal} onClick={() => this.setState({ ncaaModal: false })}><NCAAModal onClick={this.handleChildClick} /></div> : null}
        <ToastContainer />
      </>
    )
  }
}

export default NCAA

/*
const firstRoundEdit=[
    {id:'idilulya1',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    {id:'idilulya2',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    {id:'idilulya3',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    {id:'idilulya4',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    ]
const quarterFinalsEdit=[
      {id:'idilulya5',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
      {id:'idilulya6',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
      {id:'idilulya7',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
      {id:'idilulya8',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
    ] */