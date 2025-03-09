import React, { Component } from 'react'
import style from "./MarchMadness.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineShare } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import Countdown from 'react-countdown';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { BsFillLightningFill } from "react-icons/bs";
const round1 = [
  { id: 'round1A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1E', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1G', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1H', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1I', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
]
const round2 = [
  { id: 'round2A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
]
const sweet16 = [
  { id: 'sweet16A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
]
const elite8 = [
  { id: 'elite8A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Elite 8' },
]
const final4 = [
  { id: 'final4A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Final 4' },
  { id: 'final4B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Final 4' },
]
const nationalChampionship = [
  { id: 'nationalChampionship1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'National Championship' },
]
class MarchMadness extends Component {
  state = { firstFourDate: '', showCreateEventModal:false, round1: '', round1Err: 'Date must be filled', round2: '', round2Err: 'Date must be filled', sweet16: '', sweet16Err: 'Date must be filled', elite8: '', elite8Err: 'Date must be filled', final4: '', final4Err: 'Date must be filled', final: '', 
    finalErr: 'Date must be filled',userId:'',userLoggedIn:false,isAdmin:false,allEvents:[],profilePhoto: '',noEventToShow:'',theRound1Arr:[],theRound2Arr:[],theSweet16Arr:[],theElite8Arr:[],theFinal4Arr:[],theChampionshipArr:[],theMenu:'east',theItems:[],theSubMenu:'round1',
  eastRound1Arr:[],eastRound2Arr:[],eastSweet16Arr:[],eastElite8Arr:[],dataAvailable: false, currentEventUserInfo: {},currentItems:[],westRound1Arr:[],westRound2Arr:[],westSweet16Arr:[],westElite8Arr:[],southRound1Arr:[],southRound2Arr:[],southSweet16Arr:[],southElite8Arr:[],
  midWestRound1Arr:[],midWestRound2Arr:[],midWestSweet16Arr:[],midWestElite8Arr:[],final4Arr:[],finalArr:[],showUpperBar:true,currentRound:'round1',theLink:'',theTime:''}
  
    componentDidMount = () => {
      this.checkAuth()
    }


    inputChange = async (e) => {

    var value = e.target.value
    await this.setState({ [e.target.id]: value })
    if (this.state.round1.length >= 3) { this.setState({ round1Err: '' }) }
    if (this.state.round2.length >= 3) { this.setState({ round2Err: '' }) }
    if (this.state.sweet16.length >= 3) { this.setState({ sweet16Err: '' }) }
    if (this.state.elite8.length >= 3) { this.setState({ elite8Err: '' }) }
    if (this.state.final4.length >= 3) { this.setState({ final4Err: '' }) }
    if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) }
  }
  onChange = async (e) => {

    var value = e.target.value
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
      this.checkUpcomingPastGames(userId)
     }
   })
 }
 checkUpcomingPastGames = async (userId) => {
  var gamesInfo = firebase.database().ref('/theEvents/NCAAB/eventsIds/')
  var i = 0, allGames = []

  await gamesInfo.once('value', dataSnapshot => {
    if(!dataSnapshot.exists()){this.setState({noEventToShow:true});return}
    else{
      this.setState({noEventToShow:false})
    }
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
      theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection,theData:theData }
      allGames.push(theEvents)

      if (gamesCount === i) {
        var theEventTitle = '', theEventKey = '', theEventTime = 0,theTime=''
        if (allGames.length > 0) { allGames = allGames.sort(function (a, b) { return a.time - b.time }); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'],theTime = allGames[0]['time'],endTime= allGames[0]['endTime']}
      }
      var expired = false
      if ((theEventTime - new Date().getTime()) < 86400000) {
        expired = true
      }
     /* if ((currentSelection === 'wildCard')) {
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
      }*/
      this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection, expired,endTime,theTime }, () => {
        this.getNCAABMatches()
        this.getMatchesInfo(userId)
        //////console.log('currentSelection',this.state.currentSelection)
      })
    })
  })
}
getMatchesInfo=async(userId)=>{
  var flocksDataRef = firebase.database().ref('users/').child(userId+'/flockData/flockNames/'+this.state.theEventKey+'/link')
  flocksDataRef.once('value',dataSnapshot=>{
    console.log('flocksDataRef the key',dataSnapshot.val())
    if(dataSnapshot.exists()){
      this.setState({theLink:dataSnapshot.val()})
    }else{
      this.setState({theLink:''})
    }
  })
}
getNCAABMatches = () => {
  var round1Arr=[],round2Arr=[],sweet16Arr=[],elite8Arr=[], allMatches = []
  this.setState({ eastRound1Arr:[],eastRound2Arr:[],eastSweet16Arr:[],eastElite8Arr:[], dataAvailable: false, currentEventUserInfo: {} })
  var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey+'/'+this.state.theMenu)
  matchesRef.once('value', dataSnapshot => {
    var round1Count = dataSnapshot.child('round1').numChildren()
    var round2Count = dataSnapshot.child('round2').numChildren()
    var sweet16Count = dataSnapshot.child('sweet16').numChildren()
    var elite8Count = dataSnapshot.child('elite8').numChildren()
    var theInfo=dataSnapshot.val()
    var round1=theInfo.round1
    var round2=theInfo.round2
    var sweet16=theInfo.sweet16
    var elite8=theInfo.elite8
    var i=0,g=0,h=0,j=0,k=0,l=0,m=0
    for (var key in round1) {
      i++
      var theData = round1[key]
      round1Arr.push(theData)
      if(round1Count===i){
        this.setState({eastRound1Arr:round1Arr,currentItems:round1Arr})
        console.log('round1Arr',round1Arr)
      }
    }
    for (var key in round2) {
      g++
      var theData = round2[key]
      round2Arr.push(theData)
      if(round2Count===g){
        this.setState({eastRound2Arr:round2Arr})
        console.log('round2Arr',round2Arr)
      }
    }
    for (var key in sweet16) {
      h++
      var theData = sweet16[key]
      sweet16Arr.push(theData)
      if(sweet16Count===h){
        this.setState({eastSweet16Arr:sweet16Arr})
        console.log('sweet16Arr',sweet16Arr)
      }
    }
    for (var key in elite8) {
      j++
      var theData = elite8[key]
      elite8Arr.push(theData)
      if(elite8Count===j){
        this.setState({eastElite8Arr:elite8Arr})
        console.log('theInfo 001000',elite8Arr)
        
      }
    }

  })
  this.getNCAABMatches2()
  this.getNCAABMatches3()
  this.getNCAABMatches4()
  this.getNCAABFinal4()
  //this.getMatchesInfo()
}
getNCAABMatches2 = () => {
  var round1Arr=[],round2Arr=[],sweet16Arr=[],elite8Arr=[], allMatches = []
  this.setState({ westRound1Arr:[],westRound2Arr:[],westSweet16Arr:[],westElite8Arr:[], dataAvailable: false, currentEventUserInfo: {} })
  var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey+'/'+this.state.theMenu)
  matchesRef.once('value', dataSnapshot => {
    var round1Count = dataSnapshot.child('round1').numChildren()
    var round2Count = dataSnapshot.child('round2').numChildren()
    var sweet16Count = dataSnapshot.child('sweet16').numChildren()
    var elite8Count = dataSnapshot.child('elite8').numChildren()
    var theInfo=dataSnapshot.val()
    var round1=theInfo.round1
    var round2=theInfo.round2
    var sweet16=theInfo.sweet16
    var elite8=theInfo.elite8
    var i=0,g=0,h=0,j=0,k=0,l=0,m=0
    for (var key in round1) {
      i++
      var theData = round1[key]
      round1Arr.push(theData)
      if(round1Count===i){
        this.setState({westRound1Arr:round1Arr})
        console.log('round1Arr',round1Arr)
      }
    }
    for (var key in round2) {
      g++
      var theData = round2[key]
      round2Arr.push(theData)
      if(round2Count===g){
        this.setState({westRound2Arr:round2Arr})
        console.log('round2Arr',round2Arr)
      }
    }
    for (var key in sweet16) {
      h++
      var theData = sweet16[key]
      sweet16Arr.push(theData)
      if(sweet16Count===h){
        this.setState({westSweet16Arr:sweet16Arr})
        console.log('sweet16Arr',sweet16Arr)
      }
    }
    for (var key in elite8) {
      j++
      var theData = elite8[key]
      elite8Arr.push(theData)
      if(elite8Count===j){
        this.setState({westElite8Arr:elite8Arr})
        console.log('theInfo 001000',elite8Arr)
      }
    }

  })
}
getNCAABMatches3 = () => {
  var round1Arr=[],round2Arr=[],sweet16Arr=[],elite8Arr=[], allMatches = []
  this.setState({ southRound1Arr:[],southRound2Arr:[],southSweet16Arr:[],southElite8Arr:[], dataAvailable: false, currentEventUserInfo: {} })
  var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey+'/'+this.state.theMenu)
  matchesRef.once('value', dataSnapshot => {
    var round1Count = dataSnapshot.child('round1').numChildren()
    var round2Count = dataSnapshot.child('round2').numChildren()
    var sweet16Count = dataSnapshot.child('sweet16').numChildren()
    var elite8Count = dataSnapshot.child('elite8').numChildren()
    var theInfo=dataSnapshot.val()
    var round1=theInfo.round1
    var round2=theInfo.round2
    var sweet16=theInfo.sweet16
    var elite8=theInfo.elite8
    var i=0,g=0,h=0,j=0,k=0,l=0,m=0
    for (var key in round1) {
      i++
      var theData = round1[key]
      round1Arr.push(theData)
      if(round1Count===i){
        this.setState({southRound1Arr:round1Arr})
        console.log('round1Arr',round1Arr)
      }
    }
    for (var key in round2) {
      g++
      var theData = round2[key]
      round2Arr.push(theData)
      if(round2Count===g){
        this.setState({southRound2Arr:round2Arr})
        console.log('round2Arr',round2Arr)
      }
    }
    for (var key in sweet16) {
      h++
      var theData = sweet16[key]
      sweet16Arr.push(theData)
      if(sweet16Count===h){
        this.setState({southSweet16Arr:sweet16Arr})
        console.log('sweet16Arr',sweet16Arr)
      }
    }
    for (var key in elite8) {
      j++
      var theData = elite8[key]
      elite8Arr.push(theData)
      if(elite8Count===j){
        this.setState({southElite8Arr:elite8Arr})
        console.log('theInfo 001000',elite8Arr)
      }
    }

  })
}
getNCAABMatches4 = () => {
  var round1Arr=[],round2Arr=[],sweet16Arr=[],elite8Arr=[], allMatches = []
  this.setState({ midWestRound1Arr:[],midWestRound2Arr:[],midWestSweet16Arr:[],midWestElite8Arr:[], dataAvailable: false, currentEventUserInfo: {} })
  var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey+'/'+this.state.theMenu)
  matchesRef.once('value', dataSnapshot => {
    var round1Count = dataSnapshot.child('round1').numChildren()
    var round2Count = dataSnapshot.child('round2').numChildren()
    var sweet16Count = dataSnapshot.child('sweet16').numChildren()
    var elite8Count = dataSnapshot.child('elite8').numChildren()
    var theInfo=dataSnapshot.val()
    var round1=theInfo.round1
    var round2=theInfo.round2
    var sweet16=theInfo.sweet16
    var elite8=theInfo.elite8
    var i=0,g=0,h=0,j=0,k=0,l=0,m=0
    for (var key in round1) {
      i++
      var theData = round1[key]
      round1Arr.push(theData)
      if(round1Count===i){
        this.setState({midWestRound1Arr:round1Arr})
        console.log('round1Arr',round1Arr)
      }
    }
    for (var key in round2) {
      g++
      var theData = round2[key]
      round2Arr.push(theData)
      if(round2Count===g){
        this.setState({midWestRound2Arr:round2Arr})
        console.log('round2Arr',round2Arr)
      }
    }
    for (var key in sweet16) {
      h++
      var theData = sweet16[key]
      sweet16Arr.push(theData)
      if(sweet16Count===h){
        this.setState({midWestSweet16Arr:sweet16Arr})
        console.log('sweet16Arr',sweet16Arr)
      }
    }
    for (var key in elite8) {
      j++
      var theData = elite8[key]
      elite8Arr.push(theData)
      if(elite8Count===j){
        this.setState({midWestElite8Arr:elite8Arr})
        console.log('theInfo 001000',elite8Arr)
      }
    }

  })
}
getNCAABFinal4 = () => {
  var final4Arr=[],finalArr=[],i=0,j=0
  this.setState({ final4Arr:[],finalArr:[]})
  var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey+'/final4/')
  matchesRef.once('value', dataSnapshot => {
    var final4Count = dataSnapshot.numChildren()
    dataSnapshot.forEach((data) => {
      i++
       var theData = data.val()
       final4Arr.push(theData)
       if(final4Count===i){
        this.setState({final4Arr})
        console.log('finalArr 4444444',final4Arr)
       }
    })  })
    var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey+'/nationalChampionship/')
    matchesRef.once('value', dataSnapshot => {
      var finalCount = dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        j++
         var theData = data.val()
         finalArr.push(theData)
         if(finalCount===j){
          this.setState({finalArr})
          console.log('finalArr 222222',finalArr)
         }
      })  })
   
}
  createEvent = () => {
    var round1Arr = {}, round2Arr = {}, sweet16Arr = {}, elite8Arr = {}, final4Arr = {}, finalArr = {}

    console.log('round1 length', round1.length)
    var eventKey = 'marchMadness' + new Date().getFullYear()
    var eventTitle = 'March Madness' + new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents/NCAAB/' + eventKey)

   /* console.log('this.state.round1', this.state.round1)
    console.log('this.state.round2', this.state.round2)
    console.log('this.state.sweet16', this.state.sweet16)
    console.log('this.state.elite8', this.state.elite8)
    console.log('this.state.final4', this.state.final4)
    console.log('this.state.final', this.state.final)*/
    if (this.state.round1.length >= 3) { this.setState({ round1Err: '' }) } else { this.setState({ round1Err: 'Date must be filled' }) }
    if (this.state.round2.length >= 3) { this.setState({ round2Err: '' }) } else { this.setState({ round2Err: 'Date must be filled' }) }
    if (this.state.sweet16.length >= 3) { this.setState({ sweet16Err: '' }) } else { this.setState({ sweet16Err: 'Date must be filled' }) }
    if (this.state.elite8.length >= 3) { this.setState({ elite8Err: '' }) } else { this.setState({ elite8Err: 'Date must be filled' }) }
    if (this.state.final4.length >= 3) { this.setState({ final4Err: '' }) } else { this.setState({ final4Err: 'Date must be filled' }) }
    if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) } else { this.setState({ finalErr: 'Date must be filled' }) }
    if (this.state.round1.length < 1 || this.state.round2.length < 1 || this.state.sweet16.length < 1 ||
      this.state.elite8.length < 1 || this.state.final4.length < 1 || this.state.final.length < 1
    ) {
      this.notify('All fields must be filled')
    } else {
      round1.map((item, index) => {
        round1[index]['timeInMillis'] = new Date(this.state.round1).getTime()
        round1[index]['commenceTime'] = this.state.round1
        round1[index]['time'] = this.state.round1
        round1Arr[item.id] = item
        if (round1.length === index + 1) {
          generalDb.child('/west/round1/').update(round1Arr)
          generalDb.child('/east/round1/').update(round1Arr)
          generalDb.child('/south/round1/').update(round1Arr)
          generalDb.child('/midWest/round1/').update(round1Arr)
        }
      })
  
  
      round2.map((item, index) => {
        round2[index]['timeInMillis'] = new Date(this.state.round2).getTime()
        round2[index]['commenceTime'] = this.state.round2
        round2[index]['time'] = this.state.round2
        round2Arr[item.id] = item
        if (round2.length === index + 1) {
          generalDb.child('/west/round2/').update(round2Arr)
          generalDb.child('/east/round2/').update(round2Arr)
          generalDb.child('/south/round2/').update(round2Arr)
          generalDb.child('/midWest/round2/').update(round2Arr)
        }
      })
  
      sweet16.map((item, index) => {
        sweet16[index]['timeInMillis'] = new Date(this.state.sweet16).getTime()
        sweet16[index]['commenceTime'] = this.state.sweet16
        sweet16[index]['time'] = this.state.sweet16
        sweet16Arr[item.id] = item
        if (sweet16.length === index + 1) {
          generalDb.child('/west/sweet16/').update(sweet16Arr)
          generalDb.child('/east/sweet16/').update(sweet16Arr)
          generalDb.child('/south/sweet16/').update(sweet16Arr)
          generalDb.child('/midWest/sweet16/').update(sweet16Arr)
        }
      })
  
      elite8.map((item, index) => {
        elite8[index]['timeInMillis'] = new Date(this.state.elite8).getTime()
        elite8[index]['commenceTime'] = this.state.elite8
        elite8[index]['time'] = this.state.elite8
        elite8Arr[item.id] = item
        if (elite8.length === index + 1) {
          generalDb.child('/west/elite8/').update(elite8Arr)
          generalDb.child('/east/elite8/').update(elite8Arr)
          generalDb.child('/south/elite8/').update(elite8Arr)
          generalDb.child('/midWest/elite8/').update(elite8Arr)
        }
      })
  
      final4.map((item, index) => {
        final4[index]['timeInMillis'] = new Date(this.state.final4).getTime()
        final4[index]['commenceTime'] = this.state.final4
        final4[index]['time'] = this.state.final4
        final4Arr[item.id] = item
        if (final4.length === index + 1) {
          generalDb.child('final4').update(final4Arr)
        }
      })
  
        nationalChampionship.map((item, index) => {
        nationalChampionship[index]['timeInMillis'] = new Date(this.state.final).getTime()
        nationalChampionship[index]['commenceTime'] = this.state.final
        nationalChampionship[index]['time'] = this.state.final
        finalArr[item.id] = item
        if (nationalChampionship.length === index + 1) {
          generalDb.child('nationalChampionship').update(finalArr,(error) => {
            if (error) {
              this.notify('An error occured while creating event, try again')
            } else {
              var toTheEventsIds = { time:new Date(this.state.round1).getTime(), title:eventTitle, sportType:'NCAAB', endTime:new Date(this.state.final).getTime(), getEventsTimeUpdate: new Date().getTime(),
                stopRound1Edit:'N/A',stopRound2Edit:'N/A',stopSweet16Edit:'N/A',stopElite8Edit:'N/A',stopFinal4Edit:'N/A',stopFinalEdit:'N/A',currentSelection:'round1'
               }
              var editDbRef=firebase.database().ref('/theEvents/eventsIds/'+eventKey+'/')
              var editDbRef2=firebase.database().ref('/theEvents/NCAAB/eventsIds/'+eventKey+'/')
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

  createEvent2 = () => {
    var round1Arr = {}, round2Arr = {}, sweet16Arr = {}, elite8Arr = {}, final4Arr = {}, finalArr = {}

    console.log('round1 length', round1.length)
    var eventKey = 'marchMadness' + new Date().getFullYear()
    var eventTitle = 'March Madness' + new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents9/NCAAB/' + eventKey)

   /* console.log('this.state.round1', this.state.round1)
    console.log('this.state.round2', this.state.round2)
    console.log('this.state.sweet16', this.state.sweet16)
    console.log('this.state.elite8', this.state.elite8)
    console.log('this.state.final4', this.state.final4)
    console.log('this.state.final', this.state.final)*/
    if (this.state.round1.length >= 3) { this.setState({ round1Err: '' }) } else { this.setState({ round1Err: 'Date must be filled' }) }
    if (this.state.round2.length >= 3) { this.setState({ round2Err: '' }) } else { this.setState({ round2Err: 'Date must be filled' }) }
    if (this.state.sweet16.length >= 3) { this.setState({ sweet16Err: '' }) } else { this.setState({ sweet16Err: 'Date must be filled' }) }
    if (this.state.elite8.length >= 3) { this.setState({ elite8Err: '' }) } else { this.setState({ elite8Err: 'Date must be filled' }) }
    if (this.state.final4.length >= 3) { this.setState({ final4Err: '' }) } else { this.setState({ final4Err: 'Date must be filled' }) }
    if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) } else { this.setState({ finalErr: 'Date must be filled' }) }
    if (this.state.round1.length < 1 || this.state.round2.length < 1 || this.state.sweet16.length < 1 ||
      this.state.elite8.length < 1 || this.state.final4.length < 1 || this.state.final.length < 1
    ) {
      this.notify('All fields must be filled')
    } else {
      round1.map((item, index) => {
        round1[index]['timeInMillis'] = new Date(this.state.round1).getTime()
        round1[index]['commenceTime'] = this.state.round1
        round1[index]['time'] = this.state.round1
        round1Arr[item.id] = item
        if (round1.length === index + 1) {
          var round1Ref=firebase.database().ref('/theEvents9/NCAAB/' + eventKey+'/round64')
          round1Ref.child('/west/').update(round1Arr)
          round1Ref.child('/east/').update(round1Arr)
          round1Ref.child('/south/').update(round1Arr)
          round1Ref.child('/midWest/').update(round1Arr)
        }
      })
  
  
      round2.map((item, index) => {
        round2[index]['timeInMillis'] = new Date(this.state.round2).getTime()
        round2[index]['commenceTime'] = this.state.round2
        round2[index]['time'] = this.state.round2
        round2Arr[item.id] = item
        if (round2.length === index + 1) {
          var round2Ref=firebase.database().ref('/theEvents9/NCAAB/' + eventKey+'/round32')
          round2Ref.child('/west/').update(round2Arr)
          round2Ref.child('/east/').update(round2Arr)
          round2Ref.child('/south/').update(round2Arr)
          round2Ref.child('/midWest/').update(round2Arr)
        }
      })
  
      sweet16.map((item, index) => {
        sweet16[index]['timeInMillis'] = new Date(this.state.sweet16).getTime()
        sweet16[index]['commenceTime'] = this.state.sweet16
        sweet16[index]['time'] = this.state.sweet16
        sweet16Arr[item.id] = item
        if (sweet16.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents9/NCAAB/' + eventKey+'/final')
          finalRef.child('/sweet16/').update(sweet16Arr)
        }
      })
  
      elite8.map((item, index) => {
        elite8[index]['timeInMillis'] = new Date(this.state.elite8).getTime()
        elite8[index]['commenceTime'] = this.state.elite8
        elite8[index]['time'] = this.state.elite8
        elite8Arr[item.id] = item
        if (elite8.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents9/NCAAB/' + eventKey+'/final')
          finalRef.child('/elite8/').update(elite8Arr)
        }
      })
  
      final4.map((item, index) => {
        final4[index]['timeInMillis'] = new Date(this.state.final4).getTime()
        final4[index]['commenceTime'] = this.state.final4
        final4[index]['time'] = this.state.final4
        final4Arr[item.id] = item
        if (final4.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents9/NCAAB/' + eventKey+'/final')
          finalRef.child('final4').update(final4Arr)
        }
      })
  
        nationalChampionship.map((item, index) => {
        nationalChampionship[index]['timeInMillis'] = new Date(this.state.final).getTime()
        nationalChampionship[index]['commenceTime'] = this.state.final
        nationalChampionship[index]['time'] = this.state.final
        finalArr[item.id] = item
        if (nationalChampionship.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents9/NCAAB/' + eventKey+'/final')
          finalRef.child('nationalChampionship').update(finalArr,(error) => {
            if (error) {
              this.notify('An error occured while creating event, try again')
            } else {
              var toTheEventsIds = { time:new Date(this.state.round1).getTime(), title:eventTitle, sportType:'NCAAB', endTime:new Date(this.state.final).getTime(), getEventsTimeUpdate: new Date().getTime(),
                stopRound1Edit:'N/A',stopRound2Edit:'N/A',stopSweet16Edit:'N/A',stopElite8Edit:'N/A',stopFinal4Edit:'N/A',stopFinalEdit:'N/A',currentSelection:'round1'
               }
              var editDbRef=firebase.database().ref('/theEvents/eventsIds/'+eventKey+'/')
              var editDbRef2=firebase.database().ref('/theEvents/NCAAB/eventsIds/'+eventKey+'/')
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
  selectEvent= (theMenu) => {
    if(theMenu==='east'){this.setState({currentItems:this.state.eastRound1Arr,theSubMenu:'round1',showUpperBar:true})}
    if(theMenu==='west'){this.setState({currentItems:this.state.westRound1Arr,theSubMenu:'round1',showUpperBar:true})}
    if(theMenu==='south'){this.setState({currentItems:this.state.southRound1Arr,theSubMenu:'round1',showUpperBar:true})}
    if(theMenu==='midwest'){this.setState({currentItems:this.state.midWestRound1Arr,theSubMenu:'round1',showUpperBar:true})}
    if(theMenu==='final4'){this.setState({currentItems:this.state.final4Arr,theSubMenu:'round1',showUpperBar:false})}
    if(theMenu==='championship'){this.setState({currentItems:this.state.finalArr,theSubMenu:'round1',showUpperBar:false})}
    this.setState({theMenu}) 
  }
  selectSubEvent=(type,theMenu)=>{
    //this.setState({ eastRound1Arr:[],eastRound2Arr:[],eastSweet16Arr:[],eastElite8Arr:[], dataAvailable: false, currentEventUserInfo: {} })
    if(theMenu==='east'){
      if(type==='round1'){this.setState({currentItems:this.state.eastRound1Arr})}
      if(type==='round2'){this.setState({currentItems:this.state.eastRound2Arr})}
      if(type==='sweet16'){this.setState({currentItems:this.state.eastSweet16Arr})}
      if(type==='elite8'){this.setState({currentItems:this.state.eastElite8Arr})}
    }
    if(theMenu==='west'){
      if(type==='round1'){this.setState({currentItems:this.state.westRound1Arr})}
      if(type==='round2'){this.setState({currentItems:this.state.westRound2Arr})}
      if(type==='sweet16'){this.setState({currentItems:this.state.westSweet16Arr})}
      if(type==='elite8'){this.setState({currentItems:this.state.westElite8Arr})}
    }
    if(theMenu==='south'){
      if(type==='round1'){this.setState({currentItems:this.state.southRound1Arr})}
      if(type==='round2'){this.setState({currentItems:this.state.southRound2Arr})}
      if(type==='sweet16'){this.setState({currentItems:this.state.southSweet16Arr})}
      if(type==='elite8'){this.setState({currentItems:this.state.southElite8Arr})}
    }
    if(theMenu==='midwest'){
      if(type==='round1'){this.setState({currentItems:this.state.midWestRound1Arr})}
      if(type==='round2'){this.setState({currentItems:this.state.midWestRound2Arr})}
      if(type==='sweet16'){this.setState({currentItems:this.state.midWestSweet16Arr})}
      if(type==='elite8'){this.setState({currentItems:this.state.midWestElite8Arr})}
    }
      this.setState({theSubMenu:type})
  }
  getCurrentRound=(round)=>{
    this.setState({currentRound:round})
  }
  openTheModal=()=>{
    this.notify('Not availabe at the moment')
  }
  openTheModal=()=>{
    this.notify('Not availabe at the moment')
  }
  openTheModal=()=>{
    this.notify('Not availabe at the moment')
  }
  openTheModal=()=>{
    this.notify('Not availabe at the moment')
  }
  loadOtherEvent=(id,title,time)=>{
    this.setState({theTime:time})
  }
  copyLink=()=>{
    copy(this.state.theLink);
    this.notify('Link copied successfully')
  }
  render() {
    var todayInMillis=new Date().getTime()
    var title1=''
    if(this.state.theMenu==='east'){title1='East'}
    if(this.state.theMenu==='west'){title1='West'}
    if(this.state.theMenu==='south'){title1='South'}
    if(this.state.theMenu==='midwest'){title1='Midwest'}
    return (
      <>
        <div className={style.container}>
        {this.state.allEvents.length > 0 ? <><div className={style.matchesHeadDiv}>
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
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherEvent(item.id,item.title,item.time)}>
               <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event)}/>
                {this.state.selectHomeEvent?<div className={style.selectHomeEventDiv} onClick={()=>this.setState({selectHomeEvent:false})}><button onClick={(event)=>this.sendEvent(event,item.theData,item.id)}>Make home event</button></div>:null}</>:null}  
              </div>  
            )
          })}
        </div> 
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
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?<div className={style.eventCreationDiv}>
          <p className={style.eventP} onClick={() => this.openNFLModal()}>Enter Event Details</p>
          <p className={style.eventP2} onClick={() =>this.setState({showCreateEventModal:true})}>Create New March Madness Event</p>
        </div>:null}
        <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
        {this.state.theLink.length>1&&new Date().getTime()<this.state.theTime?<div className={style.shareDiv} onClick={()=>this.copyLink()}>
          <p>Flock Invite Link</p>
          <MdOutlineShare />
          </div>:null}
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
          {this.state.noEventToShow?<div className={style.noEventDiv}>
            <p>No event to show at the moment</p>
            {this.state.isAdmin? <button>Create Event</button>
            :null}
          </div>:null}
          <div className={style.eve2Div}>
            <p id={this.state.currentRound==='round1'?style.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round1')}>Round 1: Round of 64</p>
            <p id={this.state.currentRound==='round2'?style.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round2')}>Round 2: Round of 32</p>
            <p id={this.state.currentRound==='finalRound'?style.theSubMenuP2:null} onClick={()=>this.getCurrentRound('finalRound')}>Final Round: Sweet 16 to Championship</p>
            
           </div>
          {this.state.currentRound==='round1'||this.state.currentRound==='round2'?<div className={style.eveDiv}>
                  <p id={this.state.theMenu==='east'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('east')}>EAST</p>
                  <p id={this.state.theMenu==='west'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('west')}>WEST</p>
                  <p id={this.state.theMenu==='south'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('south')}>SOUTH</p>
                  <p id={this.state.theMenu==='midwest'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('midwest')}>MID WEST</p>  
           </div>:null}
           {this.state.currentRound==='finalRound'?<div className={style.eveDiv}>
                  <p id={this.state.theMenu==='east'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('east')}>SWEET 16</p>
                  <p id={this.state.theMenu==='west'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('west')}>ELITE 8</p>
                  <p id={this.state.theMenu==='south'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('south')}>FINAL 4</p>
                  <p id={this.state.theMenu==='championship'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('championship',this.state.theChampionshipArr)}>CHAMPIONSHIP</p>
                  
           </div>:null}
           {/*this.state.showUpperBar?<div className={style.eve2Div}>
            <p id={this.state.theSubMenu==='round1'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('round1',this.state.theMenu)}>Round 1</p>
            <p id={this.state.theSubMenu==='round2'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('round2',this.state.theMenu)}>Round 2</p>
            <p id={this.state.theSubMenu==='sweet16'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('sweet16',this.state.theMenu)}>Sweet 16</p>
            <p id={this.state.theSubMenu==='elite8'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('elite8',this.state.theMenu)}>Elite 8</p>
           </div>:null*/}
           
           <div className={style.listCont}>           
        {this.state.currentItems.map((item, index) => {
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
                {this.state.showUpperBar?<p>March Madness {item.matchType} - {title1}</p>:
                <p>March Madness - {item.matchType}</p>}
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
                  <p className={style.P1}>{item.player1NickName}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2NickName}</p>
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
              </div>
           
           </>: null}






          {this.state.showCreateEventModal ? <div className={style.modal}>
            <div className={style.createEventDiv}>
              <p className={style.eventHeadP}>Create March Madness Event</p>
              <p className={style.eventTitleP}>Enter Round 1 Start Date/Time</p>
              {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
              <input className={style.eventInput} id='round1' placeholder='Enter your RAM name' type='datetime-local' value={this.state.round1} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.round1Err}</p>
              <p className={style.eventTitleP}>Enter Round 2 Start Date/Time</p>
              <input className={style.eventInput} id='round2' placeholder='Enter your RAM name' type='datetime-local' value={this.state.round2} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.round2Err}</p>
              <p className={style.eventTitleP}>Enter Sweet 16 Start Date/Time</p>
              <input className={style.eventInput} id='sweet16' placeholder='Enter your RAM name' type='datetime-local' value={this.state.sweet16} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.sweet16Err}</p>
              <p className={style.eventTitleP}>Enter Elite 8 Start Date/Time</p>
              <input className={style.eventInput} id='elite8' placeholder='Enter your RAM name' type='datetime-local' value={this.state.elite8} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.elite8Err}</p>
              <p className={style.eventTitleP}>Enter Final 4 Start Date/Time</p>
              <input className={style.eventInput} id='final4' placeholder='Enter your RAM name' type='datetime-local' value={this.state.final4} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.final4Err}</p>
              <p className={style.eventTitleP}>Enter National Championship Start Date/Time</p>
              <input className={style.eventInput} id='final' placeholder='Enter your RAM name' type='datetime-local' value={this.state.final} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.finalErr}</p>
              <button className={style.submitBtn} onClick={() => this.createEvent()}>Create Event</button>
            </div>
          </div> : null}
        </div>
        <ToastContainer />
      </>
    )
  }
}

export default MarchMadness