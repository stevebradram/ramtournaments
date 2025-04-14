import React, { Component } from 'react'
import style from "./NFL.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from './NFLDetailsModal'
import EditDetails from './DetailsModalCopy'
import NFLModal from './NFLModal'
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

const wildCardRound = [
  { id: 'wildCardRound1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'wildCardRound2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'wildCardRound3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'wildCardRound4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'wildCardRound5', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' },
  { id: 'wildCardRound6', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'First Round' }
]
const divisionalRound = [
  { id: 'divisionalRound1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
  { id: 'divisionalRound2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
  { id: 'divisionalRound3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
  { id: 'divisionalRound4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter Finals' },
]
const conChampRound = [
  { id: 'conChampRound1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Semi Finals' },
  { id: 'conChampRound2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Semi Finals' },
]
const superBowlRound = [
  { id: 'superBowlRound1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A',player2NickName:'N/A',player1NickName:'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Finals' },
]
class NCAA extends Component {
  state = {
    theMenu: 'mainCard', theItems: [], opendetailsModal: false, getRamDetails: false, dataAvailable: false, theEvent: 'Upcoming Events', currentID: 1,
    theRamUfc: '', theMarchMadness: false, theNfl: false, theFifa: '', userId: '', userLoggedIn: false, eventToShow: false,isAdmin:false,
    teamName: '', flockName: '', openLoginModal: false, clickHere1: 'CLICK HERE TO MAKE YOUR PICKS', clickHere2: 'CLICK HERE TO ENTER THE GAME', theEventTime: 0,
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'NFL', pastEventsAvailable: false,
    eventRamUfc: '', eventMarchMadness: '', eventNfl: '', ramUfcMaincardArray: [], pastGames: [], theEventTitle: '', theEventKey: '', ramUfcEarlyPrelimsArray: [], count: 0,
    ramUfcPrelimsArray: [], nflArray: [], marchMadnessArray: [], ufcSubHeadings: '', upcomingGames: [], currentEventUserInfo: {}, allMatches: [], expired: false, nflModal: false,
    firstRoundArray: [], quarterFinalsArray: [], semiFinalsArray: [], finalArray: [], allEvents: [], currentSelection: '', isFirstRoundDataAvailable: false,allGames:[],
    isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,endTime:'',editType:'',eventToNFLModal:'',showCreateEventModal:false,
    isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false,selectHomeEvent:false,itemsToNFLModal:[],wildCardTime:'',wildCardErr:'',divisionalsTime:'',
    divisionalsTime:'',divisionalsErr:'',conChampTime:'',conChampErr:'',superBowlTime:'',superBowlErr:'',hasUserPicked:false,oddsUpdate:'',resultsUpdate:'',showConfirmModal:false,confirmMessage:'',confirmModalType:''
  }
  componentDidMount = () => {
      this.checkAuth()
  }
 
  handleChildClick = (title,item) => {
    this.setState({ count: this.state.count + 1, nflModal: false });
    /*if(title==='getOdds'&&item.length>10){
    this.checkForOddsUpdate2(item)
    }
    console.log('azeeza', item)*/
  };
  checkForOddsUpdate2 = async (theLink) => {
    try {
      var theQuery = encodeURIComponent(theLink)
      console.log('the theLink 000000',theLink)
      //return
      var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey+'/'+this.state.editType)
      editDbRef.once('value', dataSnapshot => {
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Update odds time expired')
       }
       else{
        console.log('kufinish kudonjo')
         axios.get("http://localhost:4000/updateNFLOdds?term=" + theQuery)
       
        .then((res) => {
          var theItems = res.data.result
          this.notify('Success Updating NFL the odds')
          ////console.log('theItems', theItems)

        })
       }})
      
    } catch (error) {
      ////console.log('error', error)
    }
  }
  checkForOddsUpdate = async () => {
    try {
     
      if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
      var theLink = 'theEvents::NFL::' + this.state.theEventKey + '::' + this.state.currentSelection
      var theQuery = encodeURIComponent(theLink)
      console.log('the theLink 11111',theLink)
      //return
      var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey+'/'+this.state.editType)
      editDbRef.once('value', dataSnapshot => {
       
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Update odds time expired')
        console.log('the Z000000',new Date().getTime(),dataSnapshot.val())
       }
       else{
        console.log('the theLink RRRRRAAAAAAA',theLink)
         //axios.get("http://localhost:4000/updateNCAANFLFOdds?term=" + theQuery)
         axios.get("https://theramtournament.com/updateNCAANFLFOdds?term=" + theQuery)
        .then((res) => {
          var theItems = res.data
          this.notify('Success Updating the NFL odds')

        })
       }})
      
    } catch (error) {
      ////console.log('error', error)
    }
  }
  checkForOutcome=async () => {
    try {
      //theEvents::NCAAF::ncaaf20242025::firstRound
      var scoreName=''
      if(!this.state.theEventKey||this.state.theEventKey.length<3)return
      
      //var theLink2='theEvents::ramUfc::'+theK
      if(this.state.currentSelection==='wildCard'){scoreName='wildCardScore'}
      if(this.state.currentSelection==='divisionalRound'){scoreName='divisionalRoundScore'}
      if(this.state.currentSelection==='conferenceChampionship'){scoreName='conferenceChampionshipScore'}
      if(this.state.currentSelection==='superBowl'){scoreName='superBowlScore'}
      var theLink='theEvents::NFL::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName
      if(!this.state.theEventKey||this.state.theEventKey.length===0)return
      //var theLink='theEvents::NFL::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName+'::'+theItems
      var theQuery=encodeURIComponent(theLink)
      console.log('theLink',theLink)
      //return
      
      //await axios.get("http://localhost:4000/getNCAAFNFLResults?term="+theQuery)
      await axios.get("https://theramtournament.com/getNCAAFNFLResults?term="+theQuery)
        .then((res) => {
          ////console.log('theItems',res)
          var theOutcome = res.data
          ////console.log('theItems',theOutcome)
          if(theOutcome==='sucesss'){}
        })
        } catch (error) {
          ////console.log('error',error)
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
//console.log('naingia2222222222222')
    var gamesInfo = firebase.database().ref('/theEvents/NFL/eventsIds/')
    var i = 0, allGames = []

    await gamesInfo.once('value', dataSnapshot => {
      var gamesCount = dataSnapshot.numChildren()
      //console.log('naingia 3333',gamesCount)
      dataSnapshot.forEach((data) => {
        //console.log('naingia 44444',data)
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
        if ((currentSelection === 'wildCard')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopWildCardEdit'})
        }
        if ((currentSelection === 'divisionalRound')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopDivisionalRoundEdit' })
        }
        if ((currentSelection === 'conferenceChampionship')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: true, isFinalsDataAvailable: false,editType:'stopConferenceChampionshipEdit'})
        }
        if ((currentSelection === 'superBowl')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: true, isFinalsDataAvailable: true,editType:'stopSuperBowlEdit'})
        }
        this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection, expired,endTime,oddsUpdate,resultsUpdate }, () => {
          this.getNFLMatches(userId)
          //////console.log('currentSelection',this.state.currentSelection)
        })
      })
    })
  }
  getNFLMatches = (userId) => {
    allMatches = []
    this.setState({ firstRoundArray: [], quarterFinalsArray: [], semiFinalsArray: [], finalArray: [], theMenu: 'mainCard', dataAvailable: false, currentEventUserInfo: {} })
    var userInfoDb = firebase.database().ref('/theEvents/NFL/').child(this.state.theEventKey)
    userInfoDb.once('value', dataSnapshot => {
      //////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      //////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var firstRoundCount = dataSnapshot.child('wildCard').numChildren()
      var quarterFinalsCount = dataSnapshot.child('divisionalRound').numChildren()
      var semiFinalsCount = dataSnapshot.child('conferenceChampionship').numChildren()
      var finalsCount = dataSnapshot.child('superBowl').numChildren()
      var theInfo = dataSnapshot.val()
      //console.log('the event eventSelection', theInfo)
      ////console.log('ncaaf20242025', theInfo.finals)
      if (theInfo.wildCard) {
        var array1 = []
        var i = 0
        for (var key in theInfo.wildCard) {
          i++
          var theData = theInfo.wildCard[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === firstRoundCount) {
            //console.log('whole maincard Array',array1)
            this.setState({ firstRoundArray: array1, theItems: array1 })
          }
        }
      }
      if (theInfo.divisionalRound) {
        var array1 = []
        //////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.divisionalRound) {
          i++
          var theData = theInfo.divisionalRound[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === quarterFinalsCount) {
            //////console.log('whole prelimms Array',array1)
            this.setState({ quarterFinalsArray: array1 })
            this.getMatchesInfo(this.state.userId,'wildCard')
          }
        }
        //prelimsArray
      } else {
        //////console.log('hakuna prelimsssssss')
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'wildCard')
        }
      }
      ////console.log('iko finalssssssssssssssssss 0000')
      if (theInfo.conferenceChampionship) {
        var array1 = []
        //////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.conferenceChampionship) {
          i++
          var theData = theInfo.conferenceChampionship[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === semiFinalsCount) {
            //console.log('wholesemiFinalsArray',array1)
            this.setState({ semiFinalsArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId,'divisionalRound')
              //this.getMatchesInfo(this.state.userId,'semiFinals')
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'divisionalRound')
          //////console.log('hakuna early prelimsssssss')
        }
      }
      ////console.log('iko finalssssssssssssssssss 1111')
      if (theInfo.superBowl) {
        var array1 = []
        ////console.log('iko finalssssssssssssssssss 2222')
        var i = 0
        for (var key in theInfo.superBowl) {
          i++
          var theData = theInfo.superBowl[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === finalsCount) {
            //////console.log('whole early prelimms Array',array1)
            this.setState({ finalArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId,'conferenceChampionship')
              this.getMatchesInfo(this.state.userId,'superBowl')
              
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'conferenceChampionship')
          //////console.log('hakuna early prelimsssssss')
        }
      }
    })
    //////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
  }
  getMatchesInfo = async (userId,selection) => {
    //////console.log('allMatches',userId,this.state.theEventKey)
    //return
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NFL/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFL/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFL/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NFL/')
    var currentEventUserInfo = '',totalScore=0
    userInfoDb.once('value', dataSnapshot => {
      if (!dataSnapshot.val()){this.setState({hasUserPicked:false})}
    else{
      this.setState({hasUserPicked:true})
     selectedMatchesKeyDb.once('value', dataSnapshot => {
      //////console.log('the key',dataSnapshot.val())
      if (!dataSnapshot.val()) return
      photoRefDb.once('value', dataSnapshot => {
        //////console.log('proofile photo',dataSnapshot.val())
        if (dataSnapshot.val()) {
          this.setState({ profilePhoto: dataSnapshot.val() })
        }
      })
      userInfoDb.once('value', dataSnapshot => {
        if (!dataSnapshot.val()) return
        //console.log('the type user 0000000000000', dataSnapshot.val())
        if (dataSnapshot.val()) {
          var theInfo = dataSnapshot.val()
          this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank })
          currentEventUserInfo = dataSnapshot.val()
          totalScore=Number(theInfo.firstRoundScore)+Number(theInfo.quarterFinalsScore)+Number(theInfo.semiFinalsScore)+Number(theInfo.finalsScore)
          //console.log('the dddddddd',theInfo)

        }
      })
      var thetrrrr = ''
      ////console.log('this.state.currentSelection', this.state.currentSelection)
     // //console.log('firstRoundArray',this.state.firstRoundArray,'quarterFinalsArray',this.state.quarterFinalsArray,'semiFinalsArray',this.state.semiFinalsArray)
      if (selection === 'wildCard') {
        thetrrrr = this.state.firstRoundArray
      }
      if (selection === 'divisionalRound') {
        thetrrrr = this.state.quarterFinalsArray
      }
      if (selection === 'conferenceChampionship') {
        thetrrrr = this.state.semiFinalsArray
      }
      if (selection === 'superBowl') {
        thetrrrr = this.state.finalArray
      }

      //var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
      
      userBetsDb.once('value', dataSnapshot => {
        //////console.log('the bets data',dataSnapshot.val())
        //////console.log('this.state.theItems',this.state.theItems)
        if (!dataSnapshot.val()) return
        var itemsCount = dataSnapshot.numChildren()
        //console.log('selection',selection,'itemsCount',itemsCount)
            if(itemsCount===6){this.setState({isFirstRoundPicked:true})}
            if(itemsCount===10){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true})}
            if(itemsCount===12){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true})}
            if(itemsCount===13){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true,isFinalsPicked:true})}
            if(selection==='wildCard'&&itemsCount<6)return
            if(selection==='divisionalRound'&&itemsCount<10)return
            if(selection==='conferenceChampionship'&&itemsCount<12)return
            if(selection==='superBowl'&&itemsCount<13)return
            console.log('MEGA count',this.state.theEventKey,selection,itemsCount)
            console.log('MEGA isFirstRoundPicked',this.state.isFirstRoundPicked)
            console.log('MEGA isQuarterFinalsPicked',this.state.isQuarterFinalsPicked)
            console.log('MEGA isSemiFinalsPicked',this.state.isSemiFinalsPicked)
            console.log('MEGA isFinalsPicked',this.state.isFinalsPicked)
        var i = 0, thePoints = [], currentScore = []
        dataSnapshot.forEach((data, index) => {
          i++
        //  //console.log('thank DAATA',selection,data.val())
          thetrrrr.map((item) => {
            //////console.log('thank you sir',item.winner)
            if (item.id === data.key) {
              ////console.log('thank you sir')
              item['bet'] = data.val()
              if (item.status1 === 'played') {

                //////console.log('item.winner',item.winner)
                //////console.log('my beeeeet',data.val())
                //////console.log('item.p1Points',item.p1Points)
                //////console.log('item.p2Points',item.p2Points)
                if (item.winner === 'player1' && data.val() === 'player1') { currentScore.push(item.p1Points);thePoints.push(item.p1Points);}
                if (item.winner === 'player2' && data.val() === 'player2') { currentScore.push(item.p2Points);thePoints.push(item.p2Points);}
                //////console.log('p1 pointsss',currentScore)

              }else{
              if (data.val() === 'player1') {
                thePoints.push(item.p1Points);//////console.log('the points',item.p1Points)
              }
              if (data.val() === 'player2') {
                thePoints.push(item.p2Points);//////console.log('the points',item.p2Points)
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
      //this.setState({isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false})
      this.setState({ theEventKey, theEventTitle, expired,currentSelection,isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false}, () => {
        this.getNFLMatches()
        if ((currentSelection === 'wildCard')) {this.setState({editType:'stopWildCardEdit'})}
        if ((currentSelection === 'divisionalRound')) {this.setState({editType:'stopDivisionalRoundEdit'})}
        if ((currentSelection === 'conferenceChampionship')) {this.setState({editType:'stopConferenceChampionshipEdit'})}
        if ((currentSelection === 'superBowl')) {this.setState({editType:'stopSuperBowlEdit'})}
      })
    })
  }

  hideModal = () => {
    this.setState({ opendetailsModal: false })
    ////////console.log('Button clicked!');
  };
  openTheModal =async () => {
    if(this.state.userLoggedIn===false){
      this.notify("Please Log In to continue")
      this.setState({openLoginModal:true})
      return
    }var itemToModals=''
    if (this.state.currentSelection === 'wildCard') { itemToModals = this.state.firstRoundArray}
    if (this.state.currentSelection === 'divisionalRound') { itemToModals = this.state.quarterFinalsArray }
    if (this.state.currentSelection === 'conferenceChampionship') { itemToModals = this.state.semiFinalsArray }
    if (this.state.currentSelection === 'superBowl') { itemToModals = this.state.finalArray }
   var i=0,pointMissing=false
   console.log('this.state.theItems rr',this.state.currentSelection,itemToModals)
   await itemToModals.map((item,index)=>{
    i++
      //console.log('item.p1Points',item.p1Points)
      if(item.p1Points==='N/A'||item.p2Points==='N/A'){
        pointMissing=true
      }
     if(itemToModals.length===index+1){
     if(pointMissing===true){
      this.notify('Event points not yet populated')
     }else{
      this.openTheModal2()
     }
     }
    })
  }
 openTheModal2=()=>{
  console.log('this.state.theEventKey',this.state.currentSelection,this.state.theEventKey,this.state.editType)
  var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey+'/'+this.state.editType)
  editDbRef.once('value', dataSnapshot => {
    //console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
    if(dataSnapshot.val()==='N/A'){
      this.notify('Event pick/edit not available at the moment')
    }else{
      if((new Date().getTime()>dataSnapshot.val())){
        console.log('now 005',new Date().getTime(),dataSnapshot.val())
        if(this.state.currentSelection==='superBowl'){
          this.notify("Event pick expired")
        }else{this.notify("Can't make a pick when the event has already started")}
       }
       else{
        this.setState({ openLoginModal:false, opendetailsModal:true})
       }
    }
  
   /* if(this.state.currentSelection!=='wildCard'){
      var theDbRef=firebase.database().ref('/userBets/scoreBoards/NFL/'+this.state.theEventKey)
      theDbRef.child(this.state.userId).once('value', dataSnapshot => {
        //console.log('the dddddddddddd',this.state.userId,dataSnapshot.val())
         if(dataSnapshot.exists()){this.setState({ openLoginModal:false,opendetailsModal: true })}
         else{this.notify("Can't make a pick when the event has already started")}
      })
    }else{
      this.setState({ openLoginModal:false, opendetailsModal:true})
    }*/
  // }
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
  chooseHomeEvent=(event)=>{
  event.stopPropagation()
  event.preventDefault()
  this.setState({selectHomeEvent:true})
  }
  sendEvent=(event,data,id)=>{
    event.stopPropagation()
    event.preventDefault()
    data['id']=id
    //console.log('data',data)
    var theDb=firebase.database().ref('/theEvents/eventToShowHomePage/')
    theDb.set(data,error=>{
      if(!error){
        this.setState({selectHomeEvent:false})
        this.notify('Selected Succesfully')
      }
    })
    }
    updateEvent=async()=>{
      var oddsApi="https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
      const response = await axios.get(oddsApi)
      var theOddsJson=response.data
      sortOddsJson(theOddsJson)
    }
    openNFLModal=()=>{
      console.log('detailsssssss',this.state.theEventKey)
      this.setState({itemsToNFLModal:[]})
      var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey)
      editDbRef.once('value', dataSnapshot => {
        var data=dataSnapshot.val()
        var selection=data.currentSelection
        var wildCartEditExpiry=data.stopWildCardEdit
        var divisionalRoundEditExpiry=data.stopDivisionalRoundEdit
        var conferenceChampionshipEditExpiry=data.stopConferenceChampionshipEdit
        var superBowlEditExpiry=data.stopSuperBowlEdit
        if(selection==='wildCard'&&wildCartEditExpiry!=='N/A'&&new Date().getTime()>wildCartEditExpiry){
          console.log('wild card expired')
          this.setState({eventToNFLModal:'divisionalRound',itemsToNFLModal:this.state.quarterFinalsArray,nflModal:true})
        }else if(selection==='wildCard'&&(new Date().getTime()<wildCartEditExpiry)||wildCartEditExpiry==='N/A'){
          var allArray=[...this.state.firstRoundArray,...this.state.quarterFinalsArray,...this.state.semiFinalsArray,...this.state.finalArray]
          this.setState({eventToNFLModal:'wildCard',itemsToNFLModal:this.state.firstRoundArray,nflModal:true})
          console.log('hapa kwa all finalArray',this.state.firstRoundArray)
        }
        if(selection==='divisionalRound'&&divisionalRoundEditExpiry!=='N/A'&&new Date().getTime()>divisionalRoundEditExpiry){
          console.log('divisional Round expired')
          this.setState({eventToNFLModal:'conferenceChampionship',itemsToNFLModal:this.state.semiFinalsArray,nflModal:true})
        }else if(selection==='divisionalRound'&&new Date().getTime()<divisionalRoundEditExpiry){
          this.setState({eventToNFLModal:'divisionalRound',itemsToNFLModal:this.state.quarterFinalsArray,nflModal:true})
        }
        if(selection==='conferenceChampionship'&&conferenceChampionshipEditExpiry!=='N/A'&&new Date().getTime()>conferenceChampionshipEditExpiry){
          console.log('hapa kwa superbowl 111',this.state.finalArray)
          //return
          this.setState({eventToNFLModal:'superBowl',itemsToNFLModal:this.state.finalArray,nflModal:true})
        }else if(selection==='conferenceChampionship'&&new Date().getTime()<conferenceChampionshipEditExpiry){
          this.setState({eventToNFLModal:'conferenceChampionship',itemsToNFLModal:this.state.semiFinalsArray,nflModal:true})
        }
        if(selection==='superBowl'&&superBowlEditExpiry!=='N/A'&&new Date().getTime()>superBowlEditExpiry){
          console.log('wild card expired')
          this.notify("Can't enter event details to an expired event")
        }else if(selection==='superBowl'&&new Date().getTime()<superBowlEditExpiry){
          console.log('hapa kwa superbowl')
          this.setState({eventToNFLModal:'superBowl',itemsToNFLModal:this.state.finalArray,nflModal:true})
        }
        /*console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Event pick/edit time expired')
       }*/
      })
      //this.setState({nflModal:true,eventToNFLModal:''})
    }
    inputChange = async (e) => {
      var value = e.target.value
      console.log('valueee',value)
      
      await this.setState({ [e.target.id]: value })
      if (this.state.wildCardTime.length >= 3) { this.setState({wildCardErr: '' }) }
      if (this.state.divisionalsTime.length >= 3) { this.setState({divisionalsErr: '' }) }
      if (this.state.conChampTime.length >= 3) { this.setState({ conChampErr: '' }) }
      if (this.state.superBowlTime.length >= 3) { this.setState({ superBowlErr: '' }) }
    }
    checkEvent = () => {
      var checkEventDb = firebase.database().ref('/theEvents/NFL/eventsIds/')
      var currentYear =new Date().getFullYear()
      var nextYear=currentYear+1
   
  
      if (this.state.wildCardTime.length >= 3) { this.setState({wildCardErr: '' }) } else { this.setState({ round1Err: 'Date must be filled' }) }
      if (this.state.divisionalsTime.length >= 3) { this.setState({divisionalsErr: '' }) } else { this.setState({ quarterFinalsErr: 'Date must be filled' }) }
      if (this.state.conChampTime.length >= 3) { this.setState({conChampErr: '' }) } else { this.setState({ semiFinalsErr: 'Date must be filled' }) }
      if (this.state.superBowlTime.length >= 3) { this.setState({superBowlErr: '' }) } else { this.setState({ finalsErr: 'Date must be filled' }) }
      
      if (this.state.wildCardTime.length < 1 || this.state.divisionalsTime.length < 1 || this.state.conChampTime.length < 1 ||
        this.state.superBowlTime.length < 1 
      ) {
        this.notify('All fields must be filled')
      } else {
        var wildCardYear=new Date(this.state.wildCardTime).getFullYear()
        var divisionalsYear=new Date(this.state.divisionalsTime).getFullYear()
        var conChampYear=new Date(this.state.conChampTime).getFullYear()
        var superBowlYear=new Date(this.state.superBowlTime).getFullYear()
        if(wildCardYear<currentYear){this.setState({wildCardErr:'Year must be current or future'});return}
        if(divisionalsYear<currentYear){this.setState({divisionalsErr:'Year must be current or future'});return}
        if(conChampYear<currentYear){this.setState({conChampErr:'Year must be current or future'});return}
        if(superBowlYear<currentYear){this.setState({superBowlErr:'Year must be current or future'});return}
       

      var eventKey = 'NFLPlayoffs-' + wildCardYear
      var eventTitle = 'NFL PLAYOFFS  ' + wildCardYear
      console.log('wildCardYear',wildCardYear,divisionalsYear,conChampYear,superBowlYear,eventKey,eventTitle)

      //return
      checkEventDb.child(eventKey).once('value', dataSnapshot => {
        if (dataSnapshot.exists()) {
          var isFilled=dataSnapshot.val().stopWildCardEdit
          if(isFilled==='N/A'){
            this.createEvent(eventKey,eventTitle)
          }else{
            this.notify(wildCardYear+' Event Already Filled')
          }
        }else{
          this.createEvent(eventKey,eventTitle)
        }
      })
    }
    }
    createEvent = (eventKey,eventTitle) => {
      var wildCardRoundArr = {}, divisionalRoundArr = {}, conChampRoundArr = {}, superBowlRoundArr = {}
      var generalDb = firebase.database().ref('/theEvents/NFL/' + eventKey)
        wildCardRound.map((item, index) => {
          wildCardRound[index]['timeInMillis'] = new Date(this.state.wildCardTime).getTime()
          wildCardRound[index]['commenceTime'] = this.state.wildCardTime
  
          ///adding
          /*round1[index]['player1'] = item.id+'team 1'
          round1[index]['player2'] = item.id+'team 2'
          
          var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
          ////
          wildCardRound[index]['time'] = this.state.wildCardTime
          wildCardRoundArr[item.id] = item
       
          if (wildCardRound.length === index + 1) {
            console.log('wildCardRound 1111',wildCardRoundArr)
            generalDb.child('/wildCard/').update(wildCardRoundArr)
          }
        })
        divisionalRound.map((item, index) => {
          divisionalRound[index]['timeInMillis'] = new Date(this.state.divisionalsTime).getTime()
          divisionalRound[index]['commenceTime'] = this.state.divisionalsTime
          divisionalRound[index]['time'] = this.state.divisionalsTime
  
           ///adding
           /*quarterFinals[index]['player1'] = item.id+'team 1'
           quarterFinals[index]['player2'] = item.id+'team 2'
  
           quarterFinals[index]['p1Points'] = 4
           quarterFinals[index]['p2Points'] = 3
  
           var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
           ////
  
           divisionalRoundArr[item.id] = item
          if (divisionalRound.length === index + 1) {
            console.log('divisionalRoundArr 1111',divisionalRoundArr)
            generalDb.child('/divisionalRound/').update(divisionalRoundArr)
          }
        })
        conChampRound.map((item, index) => {
          conChampRound[index]['timeInMillis'] = new Date(this.state.conChampTime).getTime()
          conChampRound[index]['commenceTime'] = this.state.conChampTime
          conChampRound[index]['time'] = this.state.conChampTime
          ///adding
         /* semiFinals[index]['player1'] = item.id+'team 1'
          semiFinals[index]['player2'] = item.id+'team 2'
  
          semiFinals[index]['p1Points'] = 4
          semiFinals[index]['p2Points'] = 3
  
          var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
          ////
          conChampRoundArr[item.id] = item
          if (semiFinals.length === index + 1) {
            console.log('conChampRoundArr 1111',conChampRoundArr)
            generalDb.child('/conferenceChampionship/').update(conChampRoundArr)
          }
        })
    
        superBowlRound.map((item, index) => {
          superBowlRound[index]['timeInMillis'] = new Date(this.state.superBowlTime).getTime()
          superBowlRound[index]['commenceTime'] = this.state.superBowlTime
          superBowlRound[index]['time'] = this.state.superBowlTime
           ///adding
           /*finals[index]['player1'] = item.id+'team 1'
           finals[index]['player2'] = item.id+'team 2'
   
           finals[index]['p1Points'] = 4
           finals[index]['p2Points'] = 3
  
           var isOdd=this.isOdd(index+1)
          if(isOdd){round1[index]['winner'] = item.id+'team 1'}
          else{round1[index]['winner'] = item.id+'team 2'}*/
           ////
          superBowlRoundArr[item.id] = item
          if (finals.length === index + 1) {
            console.log('superBowlRoundArr 1111',superBowlRoundArr)
            generalDb.child('/superBowl/').update(superBowlRoundArr,(error) => {
              if (error) {
                this.notify('An error occured while creating event, try again')
              } else {
                var toTheEventsIds = { time:new Date(this.state.wildCardTime).getTime(), title:eventTitle, sportType:'NFL', endTime:new Date(this.state.superBowlTime).getTime(), getEventsTimeUpdate: new Date().getTime(),
                  stopWildCardEdit:'N/A',stopDivisionalRoundEdit:'N/A',stopConferenceChampionshipEdit:'N/A',stopSuperBowlEdit:'N/A',currentSelection:'wildCard'
                 }
                var editDbRef=firebase.database().ref('/theEvents/eventsIds/'+eventKey+'/')
                var editDbRef2=firebase.database().ref('/theEvents/NFL/eventsIds/'+eventKey+'/')
                editDbRef.set(toTheEventsIds)
                editDbRef2.set(toTheEventsIds)
                this.notify('Event created successfully')
                this.setState({showCreateEventModal:false})
              }
            })
          }
        })
    }
    doNothing=(e)=>{
      e.preventDefault()
      e.stopPropagation()
      }

      pickWinner=(id,winner,time,selection)=>{
        if(this.state.currentSelection!==selection){
          this.notify('Not available at the moment')
          return
        }
        var nowTime=new Date().getTime()  
        if(this.state.currentSelection==='wildCard'){
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
      if(this.state.currentSelection==='divisionalRound'){
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
      if(this.state.currentSelection==='conferenceChampionship'){
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
      if(this.state.currentSelection==='superBowl'){
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
        if(this.state.currentSelection==='wildCard'){
        var index2 = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        var theItems=this.state.firstRoundArray
        theItems[index2]['chosenWinner']=winner
        theItems[index2]['status1']='played'
       // theItems[index2]['isItPlayed']='played'
        this.setState({firstRoundArray:theItems})
        console.log('this.state.currentItems 008',theItems)
      }
        if(this.state.currentSelection==='divisionalRound'){
          var index2 = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.quarterFinalsArray
          theItems[index2]['chosenWinner']=winner
          theItems[index2]['status1']='played'
          console.log('this.state.currentItems 009',theItems)
          this.setState({quarterFinalsArray:theItems})
        }
        if(this.state.currentSelection==='conferenceChampionship'){
          var index2 = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.semiFinalsArray
          theItems[index2]['chosenWinner']=winner
          theItems[index2]['status1']='played'
          console.log('this.state.currentItems 009',theItems)
          this.setState({semiFinalsArray:theItems})
        }
        if(this.state.currentSelection==='superBowl'){
          var index2 = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.finalArray
          theItems[index2]['chosenWinner']=winner
          theItems[index2]['status1']='played'
          console.log('this.state.currentItems 009',theItems)
          this.setState({finalArray:theItems})
        }
      }
      closePickWinner=(id)=>{
        if(this.state.currentSelection==='wildCard'){
        var index2 = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        var theItems=this.state.firstRoundArray
        delete theItems[index2]['chosenWinner']
        delete theItems[index2]['showChooseWinner']
        this.setState({firstRoundArray:theItems})
        console.log('this.state.currentItems 001',theItems)}
        if(this.state.currentSelection==='divisionalRound'){
          var index2 = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
          var theItems=this.state.quarterFinalsArray
          delete theItems[index2]['chosenWinner']
          delete theItems[index2]['showChooseWinner']
          this.setState({quarterFinalsArray:theItems})
          console.log('this.state.currentItems 001',theItems)}
          if(this.state.currentSelection==='conferenceChampionship'){
            var index2 = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
            var theItems=this.state.semiFinalsArray
            delete theItems[index2]['chosenWinner']
            delete theItems[index2]['showChooseWinner']
            this.setState({semiFinalsArray:theItems})
            console.log('this.state.currentItems 001',theItems)}
            if(this.state.currentSelection==='superBowl'){
              var index2 = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
              var theItems=this.state.finalArray
              delete theItems[index2]['chosenWinner']
              delete theItems[index2]['showChooseWinner']
              this.setState({finalArray:theItems})
              console.log('this.state.currentItems 001',theItems)}
    
      }
      submitWinner=(id,winner)=>{
        console.log('haaaaaaaaaaaapa 000000')
        if(this.state.currentSelection==='wildCard'){
        var index = this.state.firstRoundArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcomeSingle(index,winner)
        }
      }
      if(this.state.currentSelection==='divisionalRound'){
        var index = this.state.quarterFinalsArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcomeSingle(index,winner)
        }
      }
      if(this.state.currentSelection==='conferenceChampionship'){
        var index = this.state.semiFinalsArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcomeSingle(index,winner)
        }
      }
      if(this.state.currentSelection==='superBowl'){
        var index = this.state.finalArray.map(function(x) {return x.id; }).indexOf(id);
        if(winner!=='player1'&&winner!=='player2'){
          this.notify('Nothing to submit')
        }else{
        this.checkForOutcomeSingle(index,winner)
        }
      }
      }
      checkForOutcomeSingle=async (index,winner) => {
        try {
          //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
          var shortArr=[]
          console.log('haaaaaaaaaaaapa 2222',index,winner)
    
            if((this.state.currentSelection==='wildCard')){
              this.checkForRoundOutcome(index,winner,this.state.firstRoundArray,'firstRoundArray')
            }
            if((this.state.currentSelection==='divisionalRound')){
              this.checkForRoundOutcome(index,winner,this.state.quarterFinalsArray,'quarterFinalsArray')
            }
            if((this.state.currentSelection==='conferenceChampionship')){
              this.checkForRoundOutcome(index,winner,this.state.semiFinalsArray,'semiFinalsArray')
            }
            if((this.state.currentSelection==='superBowl')){
              this.checkForRoundOutcome(index,winner,this.state.finalArray,'finalArray')
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
            var theLink='theEvents::NFL::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName+'::'+theItems
            if(!this.state.theEventKey||this.state.theEventKey.length===0)return
            var theQuery=encodeURIComponent(theLink)
            console.log('001',this.state.theEventKey,this.state.currentSelection,scoreName,theItems)
            console.log('theLink',theLink,theItems)
            console.log('this.state.shortArr 006',shortArr)
            //return
            await axios.get("https://theramtournament.com/getSingleNCAAFNFLResults?term="+theQuery)
           // await axios.get("http://localhost:4000/getSingleNCAAFNFLResults?term="+theQuery)
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
          if(this.state.confirmModalType==='resultsUpdate'){this.checkForOutcome()}
          }
  render() {
   // //console.log('this.state.isFirstRoundDataAvailable',this.state.isFirstRoundDataAvailable)
    ////console.log('this.state.isQuarterFinalsDataAvailable',this.state.isQuarterFinalsDataAvailable)
    ////console.log('this.state.isSemiFinalsDataAvailable',this.state.isSemiFinalsDataAvailable)
    ////console.log('this.state.isFinalsDataAvailable',this.state.isFinalsDataAvailable)
    var flockTeamName = ''
    var itemToModals = ''
    var isPastEvent=''
    var todayInMillis=new Date().getTime()
    var showBestPossible=''
   if(this.state.endTime<todayInMillis&&(this.state.endTime-todayInMillis)<-86400000){
    isPastEvent=false
   }else{ isPastEvent=true}

   
    if (this.state.currentSelection === 'wildCard') { itemToModals = this.state.firstRoundArray,showBestPossible=this.state.isFirstRoundPicked}
    if (this.state.currentSelection === 'divisionalRound') { itemToModals = this.state.quarterFinalsArray,showBestPossible=this.state.isQuarterFinalsPicked }
    if (this.state.currentSelection === 'conferenceChampionship') { itemToModals = this.state.semiFinalsArray,showBestPossible=this.state.isSemiFinalsPicked }
    if (this.state.currentSelection === 'superBowl') { itemToModals = this.state.finalArray,showBestPossible=this.state.isFinalsPicked}



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
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title,item.currentSelection,item.oddsUpdate,item.resultsUpdate)}>
               <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.isAdmin?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event)}/>
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
        {this.state.isAdmin?<div className={style.eventCreationDiv}>
          <p className={style.eventP} onClick={() => this.openNFLModal()}>Enter Event Details</p>
          <p className={style.eventP2} onClick={() =>this.setState({showCreateEventModal:true})}>Create New NFL Event</p>
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
        {this.state.isAdmin?<div className={style.resultsCont}>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={()=>this.openConfirmModal('Are you sure you want to update the NFL Match Odds?','oddsUpdate')}>Update Match Odds</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.oddsUpdate}</p>
                  </div>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={()=>this.openConfirmModal('Are you sure you want to get the NFL Match Results?','resultsUpdate')}>Fetch Results Updates</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.resultsUpdate}</p>
                  </div>
                  </div>:null}
        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.currentP}>{this.state.currentSelection}</p>
            <p className={style.scoreP1}>Best possibe Score:<br/></p>
            <p className={style.scoreP2}>{this.state.dataAvailable&&showBestPossible?this.state.currentEventUserInfo['bestPossibleScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont2}>
            <p className={style.scoreP1}>Cumulative Score</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? this.state.currentEventUserInfo['currentScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont3}>
            <p className={style.scoreP1}>Current Rank in NFL</p>
            <p className={style.scoreP2}>{this.state.dataAvailable && this.state.currentRank ? this.state.currentRank : 'N/A'}</p>
          </div>
        </div>
        <div className={style.divCont}>
          <div className={style.divCont}>
            <p className={style.titleP}>Wild Card</p>
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
                <p>NFL Wild Card Round</p>
                <p>{theTime}</p>
              </div>
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'wildCard')}>
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
                  {item.player1NickName!=='N/A'?<p className={style.P1}>{item.player1NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2NickName!=='N/A'?<p className={style.P1}>{item.player2NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
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
              {this.state.hasUserPicked&&this.state.isFirstRoundPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
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
            <p className={style.titleP}>Divisional Round</p>
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
                <p>NFL Divisional Round</p>
                <p>{theTime}</p>
              </div>
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'divisionalRound')}>
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
                  {item.player1NickName!=='N/A'?<p className={style.P1}>{item.player1NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2NickName!=='N/A'?<p className={style.P1}>{item.player2NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
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
              {this.state.hasUserPicked&&this.state.isQuarterFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
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
            <p className={style.titleP}>Conference Championship</p>
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
                <p>NFL Conference Championship</p>
                <p>{theTime}</p>
              </div>
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'conferenceChampionship')}>
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
                  {item.player1NickName!=='N/A'?<p className={style.P1}>{item.player1NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2NickName!=='N/A'?<p className={style.P1}>{item.player2NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
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
              {this.state.hasUserPicked&&this.state.isSemiFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
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
          <p className={style.titleP}>Super Bowl</p>
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
                <p>Super Bowl</p>
                <p>{theTime}</p>
              </div>
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'superBowl')}>
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
                  {item.player1NickName!=='N/A'?<p className={style.P1}>{item.player1NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2NickName!=='N/A'?<p className={style.P1}>{item.player2NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
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
              {this.state.hasUserPicked&&this.state.isFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
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

        {this.state.nflModal ? <div className={style.detailsModal} onClick={() => this.setState({ nflModal: false })}><NFLModal eventToNFLModal={this.state.eventToNFLModal} itemsToNFLModal={this.state.itemsToNFLModal} theEventKey={this.state.theEventKey} onClick={this.handleChildClick} /></div> : null}
        {this.state.showCreateEventModal ? <div className={style.detailsModal} onClick={()=>this.setState({showCreateEventModal:false})}>
            <div className={style.createEventDiv} onClick={(e)=>this.doNothing(e)}>
              <p className={style.eventHeadP}>Create NFL Event </p>
              <p className={style.eventTitleP}>Enter Wild Card Start Date/Time</p>
              
              {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
              <input className={style.eventInput} id='wildCardTime' placeholder='Enter your RAM name' type='datetime-local' value={this.state.wildCardTime} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.wildCardErr}</p>
              <p className={style.eventTitleP}>Enter Divisionals Start Date/Time</p>
              <input className={style.eventInput} id='divisionalsTime' placeholder='Enter your RAM name' type='datetime-local' value={this.state.divisionalsTime} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.divisionalsErr}</p>
              <p className={style.eventTitleP}>Enter Conference Championship Start Date/Time</p>
              <input className={style.eventInput} id='conChampTime' placeholder='Enter your RAM name' type='datetime-local' value={this.state.conChampTime} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.conChampErr}</p>
              <p className={style.eventTitleP}>Enter Super Bowl Start Date/Time</p>
              <input className={style.eventInput} id='superBowlTime' placeholder='Enter your RAM name' type='datetime-local' value={this.state.superBowlTime} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.superBowlErr}</p>
              <button className={style.submitBtn} onClick={() => this.checkEvent()}>Create Event</button>
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

