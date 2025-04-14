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
import { TbCheckbox } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import axios from "axios"
import dayjs from 'dayjs';
var allMatches = []
var selectedRamUfcArray = [], selectedNflArray = [], selectedMarchMadnesArray = []

const round1 = [
  { id: 'firstRoundMatch1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'firstRoundMatch2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'firstRoundMatch3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'firstRoundMatch4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
]
const quarterFinals = [
  { id: 'quarterFinalsMatch1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
  { id: 'quarterFinalsMatch2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
  { id: 'quarterFinalsMatch3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
  { id: 'quarterFinalsMatch4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
]
const semiFinals = [
  { id: 'semiFinalsMatch1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Semi Finals' },
  { id: 'semiFinalsMatch2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Semi Finals' },
]
const finals = [
  { id: 'finalsMatch1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Finals' },
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
    isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,endTime:'',editType:'',isAdmin:false,showCreateEventModal:false,
    isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false,selectHomeEvent:false,BPSTitle:'',round1:'',final:'',itemsToModal:[],showConfirmModal:false,confirmMessage:'',confirmModalType:'',
    round1:'',round1Time:'',quarterFinals:'',semiFinals:'',finals:'',finalTime:'',round1Err:'',quarterFinalsErr:'',semiFinalsErr:'',finalsErr:'',hasUserPicked:false,oddsUpdate:'',resultsUpdate:''
  }
  componentDidMount = () => {
    this.checkAuth()
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
      //return
      var editDbRef=firebase.database().ref('/theEvents/NCAAF/eventIds/'+this.state.theEventKey+'/'+this.state.editType)
      editDbRef.once('value', dataSnapshot => {
        console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Update odds time expired')
       }
       else{
         axios.get("https://theramtournament.com/updateNCAANFLFOdds?term="+theQuery)
         //axios.get("http://localhost:4000/updateNCAANFLFOdds?term=" + theQuery)
        .then((res) => {
          var theItems = res.data
          this.notify('Success Updating the NCAAF odds')
          //console.log('theItems', theItems)

        })
       }})
      
    } catch (error) {
      //console.log('error', error)
    }
  }
  checkForOutcome2=async () => {
    try {
      //theEvents::NCAAF::ncaaf20242025::firstRound
      var scoreName=''
      if(!this.state.theEventKey||this.state.theEventKey.length<3)return
      
      //var theLink2='theEvents::ramUfc::'+theK
      //firstRound quarterFinals semiFinals finals
      if(this.state.currentSelection==='firstRound'){scoreName='firstRoundScore'}
      if(this.state.currentSelection==='quarterFinals'){scoreName='quarterFinalsScore'}
      if(this.state.currentSelection==='semiFinals'){scoreName='semiFinalsScore'}
      if(this.state.currentSelection==='finals'){scoreName='finalsScore'}
      var theLink='theEvents::NCAAF::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName
      if(!this.state.theEventKey||this.state.theEventKey.length===0)return
      
      var theQuery=encodeURIComponent(theLink) 
      console.log('theLink',theLink)
      //return
      await axios.get("https://theramtournament.com/getNCAAFNFLResults?term="+theQuery)
      //await axios.get("http://localhost:4000/getNCAAFNFLResults?term="+theQuery)
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
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'||user.uid==='qXeqfrI5VNV7bPMkrzl0QsySmoi2'){
          this.setState({isAdmin:true}) 
         }
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
        var currentSelection = data.val().currentSelection

        var oddsUpdate= data.val().oddsTimeUpdate
        var resultsUpdate= data.val().fetchResultsTimeUpdate
        if(!oddsUpdate){oddsUpdate='N/A'}else{oddsUpdate=new Date(oddsUpdate).toLocaleString()}
        if(!resultsUpdate){resultsUpdate='N/A'}else{resultsUpdate=new Date(resultsUpdate).toLocaleString()}
        //var currentSelection='semiFinals'


        theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection,theData:theData,oddsUpdate:oddsUpdate,resultsUpdate:resultsUpdate}
        allGames.push(theEvents)

        if (gamesCount === i) {
          var theEventTitle = '', theEventKey = '', theEventTime = 0,oddsUpdate='',resultsUpdate=''
          if (allGames.length > 0) { allGames = allGames.sort(function (a, b) { return a.time - b.time }); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'],endTime= allGames[0]['endTime'],oddsUpdate= allGames[0]['oddsUpdate'],resultsUpdate= allGames[0]['resultsUpdate']}
        }
        var expired = false
        if ((theEventTime - new Date().getTime()) < 86400000) {
          expired = true
        }
        if ((currentSelection === 'firstRound')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopFirstRoundEdit'})
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
       this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection, expired,endTime,oddsUpdate,resultsUpdate}, () => {
          this.getNCAAFMatches(userId)
          //console.log('currentSelection',this.state.currentSelection)
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
    if(userId.length<5)return
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NCAAF/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NCAAF/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NCAAF/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NCAAF/')
    var currentEventUserInfo = '',totalScore=0
   
    userInfoDb.once('value', dataSnapshot => {
      if (!dataSnapshot.val()){this.setState({hasUserPicked:false})}
    else{
      this.setState({hasUserPicked:true})
     selectedMatchesKeyDb.once('value', dataSnapshot => {
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
        console.log('the type user 0000000000000', dataSnapshot.val())
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
            if(itemsCount===4){this.setState({isFirstRoundPicked:true,BPSTitle:'First Round'})}
            if(itemsCount===8){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,BPSTitle:'Quarter Finals'})}
            if(itemsCount===10){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true,BPSTitle:'Semi Finals'})}
            if(itemsCount===11){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true,isFinalsPicked:true,BPSTitle:'Finals'})}
            if(selection==='firstRound'&&itemsCount<4)return
            if(selection==='quarterFinals'&&itemsCount<8)return
            if(selection==='semiFinals'&&itemsCount<10)return
            if(selection==='finals'&&itemsCount<11)return
            // console.log('MEGA count',itemsCount)
        var i = 0, thePoints = [], currentScore = []
        dataSnapshot.forEach((data, index) => {
          i++
        //  console.log('thank DAATA',selection,data.val())
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
          if (itemsCount === i) {

            this.setState({ dataAvailable: true })
          }
        })
      })

    })
  }
  })
  }
  loadOtherFights = async (theEventKey, theEventTitle,currentSelection,oddsUpdate,resultsUpdate) => {
    console.log('the info',theEventKey,theEventTitle,currentSelection)
    //return
    this.setState({oddsUpdate,resultsUpdate})
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
      this.setState({ theEventKey, theEventTitle, expired,currentSelection,isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false}, () => {
        if ((currentSelection === 'firstRound')) {this.setState({editType:'stopFirstRoundEdit'})}
        if ((currentSelection === 'quarterFinals')) {this.setState({editType:'stopQuarterEdit'})}
        if ((currentSelection === 'semiFinals')) {this.setState({editType:'stopSemiEdit'})}
        if ((currentSelection === 'finals')) {this.setState({editType:'stopFinalEdit'})}
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
  openTheModal = (items) => {
   
    if(this.state.userLoggedIn===false){
      this.notify("Please Log In to continue")
      this.setState({openLoginModal:true})
      return
    }
    var i=0,pointMissing=false
    items.map((item,index)=>{
     i++
       console.log('item.p1Points',item.p1Points)
       if(item.p1Points==='N/A'||item.p2Points==='N/A'){
         pointMissing=true
       }
      if(items.length===index+1){
      if(pointMissing===true){
        console.log('missing shiiit')
       this.notify('Event points not yet populated')
      }else{
       this.openTheModal2()
      }
      }
     })
    /*if(isAvailable===false){
      this.notify("Can't make a pick at the moment")
      return
    }
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    }*/

  }
  openTheModal2=()=>{
    console.log('this.state.theEventKey',this.state.currentSelection,this.state.theEventKey,this.state.editType)
    console.log('this.state.theEventKey',this.state.theEventKey,this.state.editType)
    //return
     var editDbRef=firebase.database().ref('/theEvents/NCAAF/eventIds/'+this.state.theEventKey+'/'+this.state.editType)
     editDbRef.once('value', dataSnapshot => {
      if(dataSnapshot.val()==='N/A'){
        this.notify('Event pick/edit not available at the moment')
      }else{
        if((new Date().getTime()>dataSnapshot.val())){
          console.log('now 005',new Date().getTime(),dataSnapshot.val())
          if(this.state.currentSelection==='finals'){
            this.notify("Event pick expired")
          }else{this.notify("Can't make a pick when the event has already started")}
         }
         else{
          this.setState({ openLoginModal:false, opendetailsModal:true})
         }
      }
      /* console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
      if((new Date().getTime()>dataSnapshot.val())){
       this.notify('Event pick/edit not available at the moment')
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
      }*/
    })
  }
  opeModal2 = () => {
    if (this.state.expired) {
      this.notify('Event pick/edit not available at the moment')
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
    createEvent = () => {
      var round1Arr = {}, quarterFinalsArr = {}, semiFinalsArr = {}, finalsArr = {}, final4Arr = {}, finalArr = {}
  
      console.log('round1 length', round1.length)
      var year =new Date().getFullYear()
      var nextYear=year+1
      var eventKey = 'NCAAF' + year+'-'+nextYear
      var eventTitle = 'NCAAF ' + year+'-'+nextYear
      var generalDb = firebase.database().ref('/theEvents/NCAAF/' + eventKey)
  
      if (this.state.round1Time.length >= 3) { this.setState({ round1Err: '' }) } else { this.setState({ round1Err: 'Date must be filled' }) }
      if (this.state.quarterFinals.length >= 3) { this.setState({ quarterFinalsErr: '' }) } else { this.setState({ quarterFinalsErr: 'Date must be filled' }) }
      if (this.state.semiFinals.length >= 3) { this.setState({ semiFinalsErr: '' }) } else { this.setState({ semiFinalsErr: 'Date must be filled' }) }
      if (this.state.finalTime.length >= 3) { this.setState({ finalsErr: '' }) } else { this.setState({ finalsErr: 'Date must be filled' }) }
      
      if (this.state.round1Time.length < 1 || this.state.quarterFinals.length < 1 || this.state.semiFinals.length < 1 ||
        this.state.finalTime.length < 1 
      ) {
        this.notify('All fields must be filled')
      } else {
        
        round1.map((item, index) => {
          round1[index]['timeInMillis'] = new Date(this.state.round1Time).getTime()
          round1[index]['commenceTime'] = this.state.round1Time
  
          ///adding
          /*round1[index]['player1'] = item.id+'team 1'
          round1[index]['player2'] = item.id+'team 2'
          
          var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
          ////
          round1[index]['time'] = this.state.round1Time
          round1Arr[item.id] = item
       
          if (round1.length === index + 1) {
            console.log('round1Arr 1111',round1Arr)
            generalDb.child('/firstRound/').update(round1Arr)
          }
        })
        quarterFinals.map((item, index) => {
          quarterFinals[index]['timeInMillis'] = new Date(this.state.quarterFinals).getTime()
          quarterFinals[index]['commenceTime'] = this.state.quarterFinals
          quarterFinals[index]['time'] = this.state.quarterFinals
  
           ///adding
           /*quarterFinals[index]['player1'] = item.id+'team 1'
           quarterFinals[index]['player2'] = item.id+'team 2'
  
           quarterFinals[index]['p1Points'] = 4
           quarterFinals[index]['p2Points'] = 3
  
           var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
           ////
  
          quarterFinalsArr[item.id] = item
          if (quarterFinals.length === index + 1) {
            console.log('quarterFinalsArr 1111',quarterFinalsArr)
            generalDb.child('/quarterFinals/').update(quarterFinalsArr)
          }
        })
        semiFinals.map((item, index) => {
          semiFinals[index]['timeInMillis'] = new Date(this.state.semiFinals).getTime()
          semiFinals[index]['commenceTime'] = this.state.semiFinals
          semiFinals[index]['time'] = this.state.semiFinals
          ///adding
         /* semiFinals[index]['player1'] = item.id+'team 1'
          semiFinals[index]['player2'] = item.id+'team 2'
  
          semiFinals[index]['p1Points'] = 4
          semiFinals[index]['p2Points'] = 3
  
          var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
          ////
          semiFinalsArr[item.id] = item
          if (semiFinals.length === index + 1) {
            console.log('semiFinalsArr 1111',semiFinalsArr)
            generalDb.child('/semiFinals/').update(semiFinalsArr)
          }
        })
    
        finals.map((item, index) => {
          finals[index]['timeInMillis'] = new Date(this.state.finalTime).getTime()
          finals[index]['commenceTime'] = this.state.finalTime
          finals[index]['time'] = this.state.finalTime
           ///adding
           /*finals[index]['player1'] = item.id+'team 1'
           finals[index]['player2'] = item.id+'team 2'
   
           finals[index]['p1Points'] = 4
           finals[index]['p2Points'] = 3
  
           var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
           ////
          finalsArr[item.id] = item
          if (finals.length === index + 1) {
            console.log('finalsArr 1111',finalsArr)
            generalDb.child('/finals/').update(finalsArr,(error) => {
              if (error) {
                this.notify('An error occured while creating event, try again')
              } else {
                var firstMatchTime = [] //await Math.min(...theFightsJson.map(item =>  item.timeInMillis));
                var lasttMatchTime = [] //await Math.min(...theFightsJson.map(item =>  item.timeInMillis));
                var toTheEventsIds = { time:new Date(this.state.round1Time).getTime(), title:eventTitle, sportType:'NCAAF', endTime:new Date(this.state.finalTime).getTime(), getEventsTimeUpdate: new Date().getTime(),
                  stopFirstRoundEdit:'N/A',stopQuarterEdit:'N/A',stopSemiEdit:'N/A',stopFinalEdit:'N/A',currentSelection:'firstRound'
                 }
                var editDbRef=firebase.database().ref('/theEvents/eventsIds/'+eventKey+'/')
                var editDbRef2=firebase.database().ref('/theEvents/NCAAF/eventIds/'+eventKey+'/')
                editDbRef.set(toTheEventsIds)
                editDbRef2.set(toTheEventsIds)
                this.notify('Event created successfully')
                this.setState({showCreateEventModal:false})
              }
            })
          }
        })
  
      }
    }
    inputChange = async (e) => {
      var value = e.target.value
      console.log('valueee',value)
      
      await this.setState({ [e.target.id]: value })
      if (this.state.round1Time.length >= 3) { this.setState({ round1Err: '' }) }
      if (this.state.quarterFinals.length >= 3) { this.setState({quarterFinalsErr: '' }) }
      if (this.state.semiFinals.length >= 3) { this.setState({ semiFinalsErr: '' }) }
      if (this.state.finalTime.length >= 3) { this.setState({ finalsErr: '' }) }
    }
    doNothing=(e)=>{
      e.preventDefault()
      e.stopPropagation()
      }
      openNCAAFModal=()=>{
        //firstRound quarterFinals semiFinals finals
        console.log('detailsssssss',this.state.theEventKey)
        this.setState({itemsToModal:[]})
        var editDbRef=firebase.database().ref('/theEvents/NCAAF/eventIds/'+this.state.theEventKey)
        editDbRef.once('value', dataSnapshot => {
          var data=dataSnapshot.val()
         
          var selection=data.currentSelection
          var firstRoundEditExpiry=data.stopFirstRoundEdit
          var quarterEditExpiry=data.stopQuarterEdit
          var semiEditExpiry=data.stopSemiEdit
          var finalEditExpiry=data.stopFinalEdit
          //if(firstRoundEditExpiry==='N/A'){firstRoundEditExpiry=0}
         // if(quarterEditExpiry==='N/A'){quarterEditExpiry=0}
          //if(semiEditExpiry==='N/A'){semiEditExpiry=0}
          //if(finalEditExpiry==='N/A'){finalEditExpiry=0}
         // if(selection==='firstRound'&&firstRoundEditExpiry===0)
          if(selection==='firstRound'&&firstRoundEditExpiry!=='N/A'&&new Date().getTime()>firstRoundEditExpiry){
            console.log('wild card expired')
            this.setState({eventToModal:'quarterFinals',itemsToModal:this.state.quarterFinalsArray,ncaaModal:true})
          }else if(selection==='firstRound'&&(new Date().getTime()<firstRoundEditExpiry)||firstRoundEditExpiry==='N/A'){
            this.setState({eventToModal:'firstRound',itemsToModal:this.state.firstRoundArray,ncaaModal:true})
            console.log('hapa kwa all finalArray',this.state.firstRoundArray)
          }//else{}
          if(selection==='quarterFinals'&&quarterEditExpiry!=='N/A'&&new Date().getTime()>quarterEditExpiry){
            console.log('divisional Round expired')
            this.setState({eventToModal:'semiFinals',itemsToModal:this.state.semiFinalsArray,ncaaModal:true})
          }else if(selection==='quarterFinals'&&new Date().getTime()<quarterEditExpiry){
            this.setState({eventToModal:'quarterFinals',itemsToModal:this.state.quarterFinalsArray,ncaaModal:true})
          }
          if(selection==='semiFinals'&&semiEditExpiry!=='N/A'&&new Date().getTime()>semiEditExpiry){
            console.log('hapa kwa finals 111',this.state.finalArray)
            //return
            this.setState({eventToModal:'finals',itemsToModal:this.state.finalArray,ncaaModal:true})
          }else if(selection==='semiFinals'&&new Date().getTime()<semiEditExpiry){
            this.setState({eventToModal:'semiFinals',itemsToModal:this.state.semiFinalsArray,ncaaModal:true})
          }
          if(selection==='finals'&&finalEditExpiry!=='N/A'&&new Date().getTime()>finalEditExpiry){
            console.log('wild card expired')
            this.notify("Can't enter event details to an expired event")
          }else if(selection==='finals'&&new Date().getTime()<finalEditExpiry){
            this.setState({eventToModal:'finals',itemsToModal:this.state.finalArray,ncaaModal:true})
            console.log('hapa kwa finals 565656')
          }
        })
      }

      pickWinner=(id,winner,time,selection)=>{
        var nowTime=new Date().getTime()  
        if(this.state.currentSelection!==selection){
          this.notify('Not available at the moment')
          return
        }
        if(this.state.currentSelection==='firstRound'){
        var index2 = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        var nowTime=new Date().getTime()
       /* if(nowTime<time){
          this.notify('Match not yet started')
          return
        }
        if(winner!=='N/A'){
         this.notify('Winner already filled')
          return
        }*/
        var theItems=this.state.firstRoundArray
        theItems[index2]['showChooseWinner']=true
        this.setState({firstRoundArray:theItems})
        console.log('this.state.currentItems 002',theItems)
      }
      if(this.state.currentSelection==='quarterFinals'){
        console.log('this.currentSelection',this.state.currentSelection,time,nowTime)
        var index2 = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
        var nowTime=new Date().getTime()
        var theItems=this.state.quarterFinalsArray
        
        if(nowTime<time){
          this.notify('Match not yet started')
          return
        }
        if(winner!=='N/A'){
         this.notify('Winner already filled')
          return
        }
        var theItems=this.state.quarterFinalsArray
        theItems[index2]['showChooseWinner']=true
        this.setState({quarterFinalsArray:theItems})
      }
      if(this.state.currentSelection==='semiFinals'){
        console.log('this.currentSelection',this.state.currentSelection,time,nowTime)
        var index2 = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
        var nowTime=new Date().getTime()
        var theItems=this.state.semiFinalsArray
        
        if(nowTime<time){
          this.notify('Match not yet started')
          return
        }
        if(winner!=='N/A'){
         this.notify('Winner already filled')
          return
        }
        var theItems=this.state.semiFinalsArray
        theItems[index2]['showChooseWinner']=true
        this.setState({semiFinalsArray:theItems})
        console.log('theItems',theItems)
      }
      if(this.state.currentSelection==='finals'){
        console.log('this.currentSelection',this.state.currentSelection,time,nowTime)
        var index2 = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
        var nowTime=new Date().getTime()
        var theItems=this.state.finalArray
        if(nowTime<time){
          this.notify('Match not yet started')
          return
        }
        if(winner!=='N/A'){
         this.notify('Winner already filled')
          return
        }
        var theItems=this.state.finalArray
        theItems[index2]['showChooseWinner']=true
        this.setState({finalArray:theItems})
        console.log('theItems',theItems)
      }
      }
      chosenWinner=(id,winner)=>{
        if(this.state.currentSelection==='firstRound'){
        var index2 = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        var theItems=this.state.firstRoundArray
        theItems[index2]['chosenWinner']=winner
        theItems[index2]['status1']='played'
       // theItems[index2]['isItPlayed']='played'
        this.setState({firstRoundArray:theItems})
        console.log('this.state.currentItems 008',theItems)
      }
        if(this.state.currentSelection==='quarterFinals'){
          var index2 = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.quarterFinalsArray
          theItems[index2]['chosenWinner']=winner
          theItems[index2]['status1']='played'
          console.log('this.state.currentItems 009',theItems)
          this.setState({quarterFinalsArray:theItems})
        }
        if(this.state.currentSelection==='semiFinals'){
          var index2 = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.semiFinalsArray
          theItems[index2]['chosenWinner']=winner
          theItems[index2]['status1']='played'
          console.log('this.state.currentItems 009',theItems)
          this.setState({semiFinalsArray:theItems})
        }
        if(this.state.currentSelection==='finals'){
          var index2 = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.finalArray
          theItems[index2]['chosenWinner']=winner
          theItems[index2]['status1']='played'
          console.log('this.state.currentItems 009',theItems)
          this.setState({finalArray:theItems})
        }
      }
      closePickWinner=(id)=>{
        if(this.state.currentSelection==='firstRound'){
        var index2 = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        var theItems=this.state.firstRoundArray
        delete theItems[index2]['chosenWinner']
        delete theItems[index2]['showChooseWinner']
        this.setState({firstRoundArray:theItems})
        console.log('this.state.currentItems 001',theItems)}
        if(this.state.currentSelection==='quarterFinals'){
          var index2 = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.quarterFinalsArray
          delete theItems[index2]['chosenWinner']
          delete theItems[index2]['showChooseWinner']
          this.setState({quarterFinalsArray:theItems})
          console.log('this.state.currentItems 001',theItems)}
          if(this.state.currentSelection==='semiFinals'){
            var index2 = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
            var theItems=this.state.semiFinalsArray
            delete theItems[index2]['chosenWinner']
            delete theItems[index2]['showChooseWinner']
            this.setState({semiFinalsArray:theItems})
            console.log('this.state.currentItems 001',theItems)}
            if(this.state.currentSelection==='finals'){
              var index2 = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
              var theItems=this.state.finalArray
              delete theItems[index2]['chosenWinner']
              delete theItems[index2]['showChooseWinner']
              this.setState({finalArray:theItems})
              console.log('this.state.currentItems 001',theItems)}
    
      }
      submitWinner=(id,winner)=>{
        console.log('haaaaaaaaaaaapa 000000')
        if(this.state.currentSelection==='firstRound'){
        var index = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcome(index,winner)
        }
      }
      if(this.state.currentSelection==='quarterFinals'){
        var index = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcome(index,winner)
        }
      }
      if(this.state.currentSelection==='semiFinals'){
        var index = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcome(index,winner)
        }
      }
      if(this.state.currentSelection==='finals'){
        var index = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcome(index,winner)
        }
      }
      }
      checkForOutcome=async (index,winner) => {
        try {
          //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
          var shortArr=[]
          console.log('haaaaaaaaaaaapa 2222',index,winner)
    
            if((this.state.currentSelection==='firstRound')){
              this.checkForRoundOutcome(index,winner,this.state.firstRoundArray,'sweet16Arr')
            }
            if((this.state.currentSelection==='quarterFinals')){
              this.checkForRoundOutcome(index,winner,this.state.quarterFinalsArray,'elite8Arr')
            }
            if((this.state.currentSelection==='semiFinals')){
              this.checkForRoundOutcome(index,winner,this.state.semiFinalsArray,'final4Arr')
            }
            if((this.state.currentSelection==='finals')){
              this.checkForRoundOutcome(index,winner,this.state.finalArray,'finalArr')
            }
            } catch (error) {
              ////console.log('error',error)
            }
        }
        checkForRoundOutcome=async (index,winner,items,name) => {
          try {
            //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
            var shortArr=[]
            console.log('haaaaaaaaaaaapa',this.state.currentSelection,index,winner)
            items[index]['winner']=winner
            delete items[index]['chosenWinner']
            delete items[index]['showChooseWinner']
            this.setState({[name]:items})
            items.map((item,index)=>{
              console.log('shortArr',shortArr)
              shortArr['p1Points']=item.p1Points
              shortArr['p2Points']=item.p2Points
              shortArr['winner']=item.winner
              shortArr['status1']=item.status1
              shortArr['id']=item.id
              var theItem={p1Points:item.p1Points,p2Points:item.p2Points,winner:item.winner,
                status1:item.status1,id:item.id
              }
              shortArr.push(theItem)
            })
            if(this.state.theEventKey==='',this.state.currentSelection==='',scoreName==='',items.length<1)return
            var scoreName=''
            if(!this.state.theEventKey||this.state.theEventKey.length<3)return
            //if(this.state.currentSelection==='sweet16'){scoreName='round1Score'}
            //if(this.state.currentSelection==='round2'){scoreName='round2Score'}
            scoreName=this.state.currentSelection+'Score'
            let theItems = JSON.stringify(shortArr);
            var theLink='theEvents::NCAAF::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName+'::'+theItems
            if(!this.state.theEventKey||this.state.theEventKey.length===0)return
            var theQuery=encodeURIComponent(theLink)
            console.log('001',this.state.theEventKey,this.state.currentSelection,scoreName,theItems)
            console.log('theLink',theLink,theItems)
            console.log('this.state.shortArr 006',shortArr)
           // return
            await axios.get("https://theramtournament.com/getSingleNCAAFNFLResults?term="+theQuery)
            //await axios.get("http://localhost:4000/getSingleNCAAFNFLResults?term="+theQuery)
              .then((res) => {
                var theOutcome = res.data
                this.notify(theOutcome)
                if(theOutcome==='Success Updating Results'){
                  this.checkAuth()
                }
              })
              } catch (error) {
                ////console.log('error',error)
              }
          }
   openConfirmModal=(message,type)=>{
    this.setState({confirmMessage:message,showConfirmModal:true,confirmModalType:type})
  }
  proceed=()=>{
  if(this.state.confirmModalType==='oddsUpdate'){this.checkForOddsUpdate()}
  if(this.state.confirmModalType==='resultsUpdate'){this.checkForOutcome2()}
  }
  render() {
   // console.log('this.state.isFirstRoundDataAvailable',this.state.isFirstRoundDataAvailable)
    //console.log('this.state.isQuarterFinalsDataAvailable',this.state.isQuarterFinalsDataAvailable)
    //console.log('this.state.isSemiFinalsDataAvailable',this.state.isSemiFinalsDataAvailable)
    //console.log('this.state.isFinalsDataAvailable',this.state.isFinalsDataAvailable)
    var flockTeamName = ''
    var itemToModals = ''
    var todayInMillis=new Date().getTime()


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
           console.log('the tiiiiime',item.endTime)
            var theColor='#292f51',timing='Active Event'
            if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
              theColor='#919191'
              timing='Past Event'
            }
            if(this.state.theEventKey===item.id){
              theColor='#CB1E31'
            }
            return (
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title,item.currentSelection,item.oddsUpdate,item.resultsUpdate)}>
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
            {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.opeModal2()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal(itemToModals)}>Make Picks</p>}
          </div>
        </div>
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?<div className={style.eventCreationDiv}>
          <p className={style.eventP} onClick={() =>this.openNCAAFModal()}>Enter Event Details</p>
          <p className={style.eventP2} onClick={() =>this.setState({showCreateEventModal:true})}>Create New NCAAF Event</p>
        </div>:null}
        <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
        <div className={style.picksDiv} onClick={() => this.openTheModal(itemToModals)}>
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
          {this.state.isAdmin?<div className={style.resultsCont}>  
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={() => this.openConfirmModal('Are you sure you want to update the NCAAF Match Odds?','oddsUpdate')}>Update Match Odds</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.oddsUpdate}</p>
                  </div>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={() => this.openConfirmModal('Are you sure you want to get the NCAAF Match Results?','resultsUpdate')}>Fetch Results Updates</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.resultsUpdate}</p>
                  </div>
                  </div>:null}
        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.currentP}>{this.state.BPSTitle}</p>
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
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'firstRound')}>
              <p>Pick Winner</p>
              </div>:null}
              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  
                  {item.player1!=='N/A'?<p className={style.P1}>{item.player1}</p>: 
                  <p className={style.P1}>TBA</p>}
                  {/*<p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>*/}
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2!=='N/A'?<p className={style.P1}>{item.player2}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter2Country}</p>
                  {/*<p>{item.country}</p>
                  <p className={style.P2}>{item.p2Rec}</p>*/}
                </div>
              </div>
              <div className={style.dateDiv}>
                <p className={style.p1Points}>{item.p1Points}</p>
                <p className={style.usP}>POINTS</p>
                <p className={style.p2Points}>{item.p2Points}</p>
              </div>
              {this.state.hasUserPicked&&this.state.isFirstRoundPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal(itemToModals)}>MAKE YOUR PICK</button></div>
              }
            </div>
            {this.state.isAdmin&&item.showChooseWinner?<div className={style.listDivB}>
              <MdClose className={style.closeIc} onClick={()=>this.closePickWinner(item.id)}/>
              <div>
                <p className={style.chooseP}>Choose Winner</p>
                <div className={item.chosenWinner==='player1'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player1')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player1}</p>
                </div>
                <div className={item.chosenWinner==='player2'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player2')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player2}</p>
                </div>
                <div className={style.listDivB3}>
                  <TbCheckbox size={16}/>
                  {item.chosenWinner&&item.chosenWinner==='player1'?<p>{item.player1}</p>:null}
                  {item.chosenWinner&&item.chosenWinner==='player2'?<p>{item.player2}</p>:null}
                  {!item.chosenWinner||item.chosenWinner==='N/A'?<p>N/A</p>:null}
                  
                </div>
                <button onClick={()=>this.submitWinner(item.id,item.chosenWinner)}>Submit</button>
            </div></div>:null}
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
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'quarterFinals')}>
              <p>Pick Winner</p>
              </div>:null}
              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  {item.player1!=='N/A'?<p className={style.P1}>{item.player1}</p>: 
                  <p className={style.P1}>TBA</p>}
                  {/*<p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>*/}
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2!=='N/A'?<p className={style.P1}>{item.player2}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter2Country}</p>
                  {/*<p>{item.country}</p>
                  <p className={style.P2}>{item.p2Rec}</p>*/}
                </div>
              </div>
              <div className={style.dateDiv}>
                <p className={style.p1Points}>{item.p1Points}</p>
                <p className={style.usP}>POINTS</p>
                <p className={style.p2Points}>{item.p2Points}</p>
              </div>
              {this.state.hasUserPicked&&this.state.isQuarterFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal(itemToModals)}>MAKE YOUR PICK</button></div>
              }
            </div>
            {this.state.isAdmin&&item.showChooseWinner?<div className={style.listDivB}>
              <MdClose className={style.closeIc} onClick={()=>this.closePickWinner(item.id)}/>
              <div>
                <p className={style.chooseP}>Choose Winner</p>
                <div className={item.chosenWinner==='player1'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player1')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player1}</p>
                </div>
                <div className={item.chosenWinner==='player2'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player2')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player2}</p>
                </div>
                <div className={style.listDivB3}>
                  <TbCheckbox size={16}/>
                  {item.chosenWinner&&item.chosenWinner==='player1'?<p>{item.player1}</p>:null}
                  {item.chosenWinner&&item.chosenWinner==='player2'?<p>{item.player2}</p>:null}
                  {!item.chosenWinner||item.chosenWinner==='N/A'?<p>N/A</p>:null}
                  
                </div>
                <button onClick={()=>this.submitWinner(item.id,item.chosenWinner)}>Submit</button>
            </div></div>:null}
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
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'semiFinals')}>
              <p>Pick Winner</p>
              </div>:null}
              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  {item.player1!=='N/A'?<p className={style.P1}>{item.player1}</p>: 
                  <p className={style.P1}>TBA</p>}
                  {/*<p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>*/}
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2!=='N/A'?<p className={style.P1}>{item.player2}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter2Country}</p>
                  {/*<p>{item.country}</p>
                  <p className={style.P2}>{item.p2Rec}</p>*/}
                </div>
              </div>
              <div className={style.dateDiv}>
                <p className={style.p1Points}>{item.p1Points}</p>
                <p className={style.usP}>POINTS</p>
                <p className={style.p2Points}>{item.p2Points}</p>
              </div>
              {this.state.hasUserPicked&&this.state.isSemiFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal(itemToModals)}>MAKE YOUR PICK</button></div>
              }
            </div>
            {this.state.isAdmin&&item.showChooseWinner?<div className={style.listDivB}>
              <MdClose className={style.closeIc} onClick={()=>this.closePickWinner(item.id)}/>
              <div>
                <p className={style.chooseP}>Choose Winner</p>
                <div className={item.chosenWinner==='player1'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player1')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player1}</p>
                </div>
                <div className={item.chosenWinner==='player2'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player2')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player2}</p>
                </div>
                <div className={style.listDivB3}>
                  <TbCheckbox size={16}/>
                  {item.chosenWinner&&item.chosenWinner==='player1'?<p>{item.player1}</p>:null}
                  {item.chosenWinner&&item.chosenWinner==='player2'?<p>{item.player2}</p>:null}
                  {!item.chosenWinner||item.chosenWinner==='N/A'?<p>N/A</p>:null}
                  
                </div>
                <button onClick={()=>this.submitWinner(item.id,item.chosenWinner)}>Submit</button>
            </div></div>:null}
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
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'finals')}>
              <p>Pick Winner</p>
              </div>:null}
              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  {item.player1!=='N/A'?<p className={style.P1}>{item.player1}</p>: 
                  <p className={style.P1}>TBA</p>}
                  {/*<p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>*/}
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2!=='N/A'?<p className={style.P1}>{item.player2}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter2Country}</p>
                  {/*<p>{item.country}</p>
                  <p className={style.P2}>{item.p2Rec}</p>*/}
                </div>
              </div>
              <div className={style.dateDiv}>
                <p className={style.p1Points}>{item.p1Points}</p>
                <p className={style.usP}>POINTS</p>
                <p className={style.p2Points}>{item.p2Points}</p>
              </div>
              {this.state.hasUserPicked&&this.state.isFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal(itemToModals)}>MAKE YOUR PICK</button></div>
              }
            </div>
            {this.state.isAdmin&&item.showChooseWinner?<div className={style.listDivB}>
              <MdClose className={style.closeIc} onClick={()=>this.closePickWinner(item.id)}/>
              <div>
                <p className={style.chooseP}>Choose Winner</p>
                <div className={item.chosenWinner==='player1'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player1')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player1}</p>
                </div>
                <div className={item.chosenWinner==='player2'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player2')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player2}</p>
                </div>
                <div className={style.listDivB3}>
                  <TbCheckbox size={16}/>
                  {item.chosenWinner&&item.chosenWinner==='player1'?<p>{item.player1}</p>:null}
                  {item.chosenWinner&&item.chosenWinner==='player2'?<p>{item.player2}</p>:null}
                  {!item.chosenWinner||item.chosenWinner==='N/A'?<p>N/A</p>:null}
                  
                </div>
                <button onClick={()=>this.submitWinner(item.id,item.chosenWinner)}>Submit</button>
            </div></div>:null}
          </div>
        )
  })}</div></div>
      </div>
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={itemToModals} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentSelection} /></div> : null}
        {this.state.openLoginModal ? <div className={style.detailsModal} onClick={() => this.setState({ openLoginModal: false })}><LogIn /></div> : null}
        {this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null}

        {this.state.ncaaModal ? <div className={style.detailsModal} onClick={() => this.setState({ ncaaModal: false })}><NCAAModal eventToModal={this.state.eventToModal} itemsToModal={this.state.itemsToModal} theEventKey={this.state.theEventKey} onClick={this.handleChildClick} /></div> : null}
       
        {this.state.showCreateEventModal ? <div className={style.detailsModal} onClick={()=>this.setState({showCreateEventModal:false})}>
            <div className={style.createEventDiv} onClick={(e)=>this.doNothing(e)}>
              <p className={style.eventHeadP}>Create NCAAF Event</p>
              <p className={style.eventTitleP}>Enter Round 1 Start Date/Time</p>
              {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
              <input className={style.eventInput} id='round1Time' placeholder='Enter your RAM name' type='datetime-local' value={this.state.round1Time} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.round1Err}</p>
              <p className={style.eventTitleP}>Enter Quarter Finals Start Date/Time</p>
              <input className={style.eventInput} id='quarterFinals' placeholder='Enter your RAM name' type='datetime-local' value={this.state.quarterFinals} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.quarterFinalsErr}</p>
              <p className={style.eventTitleP}>Enter Semi Finals Start Date/Time</p>
              <input className={style.eventInput} id='semiFinals' placeholder='Enter your RAM name' type='datetime-local' value={this.state.semiFinals} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.semiFinalsErr}</p>
              <p className={style.eventTitleP}>Enter Finals Start Date/Time</p>
              <input className={style.eventInput} id='finalTime' placeholder='Enter your RAM name' type='datetime-local' value={this.state.finalTime} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.finalsErr}</p>
              <button className={style.submitBtn} onClick={() => this.createEvent()}>Create Event</button>
            </div>
          </div> : null}

         {this.state.showConfirmModal?<div className={style.detailsModal} onClick={()=>this.setState({showConfirmModal:false})}>
         <div className={style.createEventDiv} onClick={(e)=>this.doNothing(e)}>
          <p style={{fontSize:18,fontWeight:'bold',marginBottom:5,color:'#292f51'}}>Confirm</p>
          <p style={{marginBottom:20}}>{this.state.confirmMessage}</p>
          <div style={{display:'flex',justifyContent:'end'}}>
            <button style={{backgroundColor:'#ddd',border:'none',color:'black',padding:'7px 15px',cursor:'pointer'}} onClick={()=>this.setState({showConfirmModal:false})}>Cancel</button>
            <button style={{backgroundColor:'#CB1E31',border:'none',color:'white',padding:'7px 15px',marginLeft:10,cursor:'pointer'}} onClick={() => this.proceed}>Proceed</button>
          </div></div></div>:null}
        <ToastContainer />
      </>
    )
  }
}

export default NCAA

