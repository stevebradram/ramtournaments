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
import { TbCheckbox } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import axios from "axios"
import dayjs from 'dayjs';
import { SlOptionsVertical } from "react-icons/sl";
import copy from 'copy-to-clipboard';
import ProgressBar from '../Helper/ProgressBar'
import PastUpcomingEvents from './PastUpcomingEvents'
import RamUFCModal from './RamUFCModal'
import theRamOdds from './ramOdds.json'
import sportDataWinners from '../TheJSONS/sportDataWinners.json'
var selectedRamUfcArray = [], selectedNflArray = [], selectedMarchMadnesArray = []
class RamUfc extends Component {
  state = {
    theMenu: 'mainCard', theItems: [], opendetailsModal: false, getRamDetails: false, dataAvailable: false, theEvent: 'Upcoming Events', currentID: 1,
    theRamUfc: '', theMarchMadness: false, theNfl: false, theFifa: '', userId: '', userLoggedIn: false, selectedEvent: 'RAM UFC', eventToShow: false,
    teamName: '', flockName: '', openLoginModal: false, clickHere1: 'CLICK HERE TO MAKE YOUR PICKS', clickHere2: 'CLICK HERE TO ENTER THE GAME', theEventTime: 0,
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'ramUfc', pastEventsAvailable: false, showProgressBar: false,
    eventRamUfc: '', eventMarchMadness: '', eventNfl: '', ramUfcMaincardArray: [], pastGames: [], theEventTitle: '', theEventKey: '', ramUfcEarlyPrelimsArray: [], endTime: 0,
    ramUfcPrelimsArray: [], nflArray: [], marchMadnessArray: [], ufcSubHeadings: '', upcomingGames: [], currentEventUserInfo: {}, allMatches: [], expired: false, allGames: [], showReel: false, count: 0,
    showGetMatchesModal: false, UFCLinkInput: '', selectHomeEvent: false, selectHomeEventId: '', matchTypesNo: 0, theLink: '', getEventsTimeUpdate: '', oddsTimeUpdate: '', fetchResultsTimeUpdate: '',
    showConfirmModal: false, confirmMessage: '', confirmModalType: '', isAdmin: false, allUFCMatches: [], sportsApiData: [], showUFCModal: false, theUfcTItleTomodal: '', theEventId: ''
  }
  componentDidMount = () => {
    ////console.log('on raaaaaaaaaaaaam ufc')
    this.checkAuth()
    this.showReel()
    // //console.log('dddddd',new Date('2025-01-19T05:30:00Z').getTime())

   
    //this.checkForOddsUpdate()
    //this.getServerData()

    //this.calculateFlocksUsFlocks()

  }
  showReel = () => {
    this.timerHandle = setTimeout(
      () => this.setState({ showReel: true }),
      2000)
  }
  calculateFlocksUsFlocks = () => {
    var theAllArr = []
    var eventKey = 'ufc-fight-night-february-22-2025-February222025'
    var flockScoresRef = firebase.database().ref('/flocksSystem/flockNames/' + eventKey + '/membersScores')
    var flockScoreRef = firebase.database().ref('/flocksSystem/flockNames/' + eventKey + '/theFlocks/')
    var flockScoreRef3 = firebase.database().ref('/flocksSystem/flockNames/' + eventKey + '/theFlocks3/')
    flockScoresRef.once('value', dataSnapshot => {
      var theCount1 = dataSnapshot.numChildren()
      var i = 0
      dataSnapshot.forEach((data) => {

        var theKey = data.key
        var theItem = data.val()
        i++
        flockScoresRef.child(theKey).once('value', dataSnapshot => {
          var theCount = dataSnapshot.numChildren()
          var k = 0, theTotal = [], j = 0
          dataSnapshot.forEach((data) => {
            k++
            var scoreData = data.val()

            if (scoreData.picked === true) {
              j++
              theTotal.push(scoreData.score)
            }
            if (theCount === k) {
              if (theTotal.length > 0) {
                var sumScores = theTotal.reduce((partialSum, a) => partialSum + a, 0);
                var avScore = sumScores / j
                avScore = Number(avScore.toFixed(2))
                var sumScores2 = Number(sumScores.toFixed(2))
                console.log('the total', theKey, theTotal, j, sumScores2, avScore)
                var flockScoreToDb = { avScore: avScore, score: sumScores2, membersNo: j }
                flockScoreRef3.child(theKey).update(flockScoreToDb)
                console.log('flockScoreToDb', flockScoreToDb)
              }
            }
          })

        })
        if (theCount1 === i) {
          console.log('nime finish kumalo', i, theCount1)
        }
      })

    })
  }
  showProgressBar = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      180000)
  }
  showProgressBar3 = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      3000)
  }
  showProgressBar2 = () => {
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      5000)
  }
  checkForOddsUpdate = async (firstEventTime, lastEventTime, theEventKey, matchTypesNo) => {
    try {
      var theLink = 'theEvents::ramUfc::' + theEventKey + "::" + matchTypesNo + "::" + firstEventTime + "::" + lastEventTime
      var theQuery = encodeURIComponent(theLink)
      //axios.get("http://localhost:4000/updateUfcOdds?term=" + theQuery)
        axios.get("https://theramtournament.com/updateUfcOdds?term="+theQuery)
        .then((res) => {
          var theOutcome = res.data
          this.notify(theOutcome)
          this.setState({ showProgressBar: false })
          //console.log('theItems',theOutcome)
        })
    } catch (error) {
      //console.log('error',error)
    }
  }
  getTimeUfcOdds = async (theEventKey, matchTypesNo) => {
    console.log('haaaapa22222')
    //return
    var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + theEventKey + '/time/')
    timeInfoDb.once('value', dataSnapshot => {
      var theEventTime = dataSnapshot.val()
      if ((new Date().getTime() > theEventTime)) {
        this.notify('Event odds update time expired')
      } else {
        //console.log('goinf to server',theEventTime)
        var millisNow = theEventTime//new Date().getTime()
        var firstEventTime = new Date(millisNow - (86400000 * 2)).toLocaleDateString()
        var lastEventTime = new Date(millisNow + (86400000 * 4)).toLocaleDateString()
        firstEventTime = firstEventTime.split('/')
        var theMonthFirst = '', theDateFirst = ''
        if (firstEventTime[0].length <= 1) { theMonthFirst = '0' + firstEventTime[0] } else { theMonthFirst = firstEventTime[0] }
        if (firstEventTime[1].length <= 1) { theDateFirst = '0' + firstEventTime[1] } else { theDateFirst = firstEventTime[1] }
        firstEventTime = firstEventTime[2] + '-' + theMonthFirst + '-' + theDateFirst + 'T21:00:00Z'
        lastEventTime = lastEventTime.split('/')
        var theMonthLast = '', theDateLast = ''
        if (lastEventTime[0].length <= 1) { theMonthLast = '0' + lastEventTime[0] } else { theMonthLast = lastEventTime[0] }
        if (lastEventTime[1].length <= 1) { theDateLast = '0' + lastEventTime[1] } else { theDateLast = lastEventTime[1] }
        lastEventTime = lastEventTime[2] + '-' + theMonthLast + '-' + theDateLast + 'T21:00:00Z'
        this.checkForOddsUpdate(firstEventTime, lastEventTime, theEventKey, matchTypesNo)
      }
    })
  }
  checkForAllResults = async () => {
    /*console.log('this.state.UFCLinkInput', this.state.UFCLinkInput)
    if (this.state.UFCLinkInput.length < 1) {
      this.notify('The Link input must be properly filled')
      return
    }*/

    //https://api.sportsdata.io/v3/mma/scores/json/Event/851?key=a7bc3fc549e0431885995727ce67d025
    //if(this.state.UFCLinkInput.startsWith('https://www.ufc.com/event/')){

    //console.log('starts with that shit')
    //var theQuery=encodeURIComponent(this.state.UFCLinkInput) 
    // console.log('theQuery',this.state.UFCLinkInput)

    this.showProgressBar3()
    var sportsApiData = [],theOddsMatches=[]
    //var theLink = 'https://api.sportsdata.io/v3/mma/scores/json/Event/' + this.state.UFCLinkInput + '?key=a7bc3fc549e0431885995727ce67d025'
   // const response = await axios.get(theLink)
    var theOutcome = sportDataWinners//response.data//sportDataWinners
    var allMatches = [...this.state.ramUfcMaincardArray, ...this.state.ramUfcPrelimsArray, ...this.state.ramUfcEarlyPrelimsArray]
    var i = 0
    console.log('theOutcome rrrr', theOutcome)
    /*console.log('the name', theOutcome.ShortName)
    console.log('the length', theOutcome['Fights'].length)
    var theTitle = theOutcome.ShortName
    var theDay = theOutcome.Day
    var millis = new Date(theDay).getTime()
    var theTime = dayjs(millis).format('MMM D, YYYY')
    var theEventId = theTitle + ' ' + theTime
    theEventId = theEventId.replace(/ /g, '-').replace(/,/g, '').toLowerCase();
    this.setState({ theUfcTItleTomodal: theTitle, theEventId: theEventId })*/
    theOutcome['Fights'].map((item, index) => {
      i++
      var FightId = item.FightId
      var plDet = item.Fighters[0]
      var p2Det = item.Fighters[1]
      var player1Name = plDet['FirstName'] + ' ' + plDet['LastName']
      var player2Name = p2Det['FirstName'] + ' ' + p2Det['LastName']
      var player1Winner = plDet['Winner'] 
      var player2Winner = p2Det['Winner']
      var theWinner='N/A',status1='notPlayed'
      if(player1Winner===true){theWinner=player1Name}
      if(player2Winner===true){theWinner=player2Name}
      if(player1Winner===true||player2Winner===true){status1='played'}
      var theData = {theWinner:theWinner, status1:status1,fightId:FightId}
      sportsApiData.push(theData)
      if (theOutcome['Fights'].length === i) {
        console.log('the Winners Data', sportsApiData)
        allMatches.map((item1,index)=>{
          sportsApiData.map((item2)=>{
            if(item2.fightId+''===item1.fightId+''){
              if(item2.theWinner!=='N/A'){
                if(item2.theWinner===item1.fighter1Name){
                  allMatches[index]['winner']='player1'
                  allMatches[index]['status1']='played'
                }
                if(item2.theWinner===item1.fighter2Name){
                   allMatches[index]['winner']='player2'
                   allMatches[index]['status1']='played'
                }
              }
            }
           
          })
          if(allMatches.length===index+1){
            console.log('finisheddddd',allMatches)
            this.setState({showConfirmModal:false})
            this.showProgressBar2()
            this.checkForAllRoundOutcome(allMatches)
          }
        })
      }
    })
  }
  checkForAllRoundOutcome = async (items) => {
    console.log('checkForAllRoundOutcome ndaniiii',this.state.theEventKey,items.length,items)
    try {
      var shortArr=[]
      items.map((item, index) => {
        var theItem = {
          p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner,
          status1: item.status1, id: item.id, type: item.type
        }
        shortArr.push(theItem)
      })
      console.log('theEventKey',this.state.theEventKey,items.length)
      if (this.state.theEventKey === '', items.length < 1) return
      if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
      let theItems = JSON.stringify(shortArr);
      var theLink = 'theEvents::ramUfc::' + this.state.theEventKey + '::' + theItems
      if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
      var theQuery = encodeURIComponent(theLink)
      console.log('001', this.state.theEventKey, theItems)
      console.log('theLink', theLink, theItems)
      console.log('this.state.shortArr 006', shortArr)
      //return
      await axios.get("https://theramtournament.com/getSingleUFCResults?term=" + theQuery)
        //await axios.get("http://localhost:4000/getSingleUFCResults?term="+theQuery)
        .then((res) => {
          var theOutcome = res.data
          if (theOutcome === 'Success Updating Results') {
            this.notify('Success Updating Match Results')
            this.checkAuth()
          }
        })
    } catch (error) {
      ////console.log('error',error)
    }
  }
  checkForNewEvents = async () => {
    console.log('this.state.UFCLinkInput', this.state.UFCLinkInput)
    if (this.state.UFCLinkInput.length < 1) {
      this.notify('The Link input must be properly filled')
      return
    }
    try {
      //https://api.sportsdata.io/v3/mma/scores/json/Event/851?key=a7bc3fc549e0431885995727ce67d025
      //if(this.state.UFCLinkInput.startsWith('https://www.ufc.com/event/')){

      //console.log('starts with that shit')
      //var theQuery=encodeURIComponent(this.state.UFCLinkInput) 
      // console.log('theQuery',this.state.UFCLinkInput)

      this.showProgressBar3()
      var sportsApiData = []
      var theLink = 'https://api.sportsdata.io/v3/mma/scores/json/Event/' + this.state.UFCLinkInput + '?key=a7bc3fc549e0431885995727ce67d025'
      await axios.get(theLink)
        .then((res) => {
          var theOutcome = res.data
          var i = 0
          console.log('theOutcome rrrr', theOutcome)
          console.log('the name', theOutcome.ShortName)
          console.log('the length', theOutcome['Fights'].length)
          var theTitle = theOutcome.ShortName
          var theDay = theOutcome.Day
          var millis = new Date(theDay).getTime()
          var theTime = dayjs(millis).format('MMM D, YYYY')
          var theEventId = theTitle + ' ' + theTime
          theEventId = theEventId.replace(/ /g, '-').replace(/,/g, '').toLowerCase();
          this.setState({ theUfcTItleTomodal: theTitle, theEventId: theEventId })
          theOutcome['Fights'].map((item, index) => {
            i++
            var FightId = item.FightId
            var plDet = item.Fighters[0]
            var p2Det = item.Fighters[1]
            var player1Name = plDet['FirstName'] + ' ' + plDet['LastName']
            var player2Name = p2Det['FirstName'] + ' ' + p2Det['LastName']
            var fighter1Id = plDet['FighterId']
            var fighter2Id = p2Det['FighterId']

            var p1Record = plDet['PreFightWins'] + '-' + plDet['PreFightDraws'] + '-' + plDet['PreFightLosses']
            var p2Record = p2Det['PreFightWins'] + '-' + p2Det['PreFightDraws'] + '-' + p2Det['PreFightLosses']
            var theData = {
              fighter1Name: player1Name, fighter2Name: player2Name, p1Rec: p1Record, p2Rec: p2Record,
              game: 'UFC', status1: 'notPlayed', winner: 'N/A', type: '', fighter1Country: '', fighter2Country: '', apiId: '',
              fighter1Id: fighter1Id, fighter2Id: fighter2Id, p1Name2: plDet['FirstName'], p2Name2: p2Det['FirstName'], p1Name3: plDet['LastName'], p2Name3: p2Det['LastName'],
              p1Photo: '', p2Photo: '', fightId: FightId
            }
            sportsApiData.push(theData)

            console.log('player 001', plDet['FirstName'])
            console.log('player 002', p2Det['FirstName'])

            console.log('player 1', item.Fighters[0]['FirstName'])
            console.log('player 2', item.Fighters[1]['LastName'])
            console.log('the sum', theOutcome['Fights'].length, i)
            if (theOutcome['Fights'].length === i) {
              //showUFCModal:true
              console.log('sportsApiData 2222', sportsApiData)

              var theLink = ' https://api.sportsdata.io/v3/mma/scores/json/FightersBasic?key=a7bc3fc549e0431885995727ce67d025'
              var j = 0
              axios.get(theLink)
                .then((res) => {
                  var theOutcome = res.data
                  theOutcome.map((item) => {
                    j++
                    sportsApiData.map((item2, index) => {
                      if (item.FighterId === item2.fighter1Id || item.FighterId === item2.fighter2Id) {
                        sportsApiData[index]['match'] = item.WeightClass
                        console.log('last arrr', sportsApiData)
                      }

                    })
                  })
                  if (theOutcome.length === j) {
                    console.log('last arrr kkkkk', sportsApiData)
                    this.sortOddsJson(sportsApiData, theEventId)
                  }
                })
              //this.sortOddsJson(sportsApiData)
            }
            //sportsApiData
          })

        })
      /* axios.get("https://theramtournament.com/getMatches?term="+theQuery)
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
         })*/

    } catch (error) {
      //console.log('error',error)
      this.setState({ showProgressBar: false })
    }

  }

  sortOddsJson = async (sportsApiData, theEventId) => {
    try {
      var oddsApi = "https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
      const response = await axios.get(oddsApi)
      var theOddsJson = response.data
      console.log('theOddsJson 63636363', theOddsJson)
      var jCount = 0
      theOddsJson.map((item1, index) => {
        var i = 0, newOddsJson = []
        jCount++
        item1.bookmakers.map((item2) => {
          i++
          var draftkingsMarket = []
          if (item2.key === 'draftkings') {

            draftkingsMarket = item2.markets
            //console.log('draftkings markets',item2.markets)
            //console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
            draftkingsMarket.map((item3) => {
              //console.log('draftkingsMarket 006',item3.outcomes)
              const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
              theOddsJson[index].draftkingsOdds = obj
            })
          }
          if (item1.bookmakers.length === i) {
            //console.log('new array',theOddsJson.length)
            var m = 0
            theOddsJson.map((item12, index) => {
              m++
              //console.log('item12.draftkingsOdds',item12.draftkingsOdds)
              var awayPoints = 0, homePoints = 0
              if (item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0) {
                //console.log('shit is undefined')
              } else {
                var homeFighterName = item12.home_team
                var awayFighterName = item12.away_team
                awayPoints = item12.draftkingsOdds[awayFighterName]
                homePoints = item12.draftkingsOdds[homeFighterName]
              }
              var matchTime = new Date(item12.commence_time);
              var newItem = {
                awayTeam: item12.away_team, homeTeam: item12.home_team, oddId: item12.id, commenceTime: item12.commence_time, timeInMillis: matchTime.getTime(),
                awayTeamPoints: awayPoints, homeTeamPoints: homePoints, draftkingsOdds: item12.draftkingsOdds, id: item12.id,
              }
              newOddsJson.push(newItem)
            })

          }
        })
        if (jCount === theOddsJson.length) {
          //reorganisedOddsArray = newOddsJson
          console.log('new array oldd', theOddsJson)
          console.log('new array laaast', newOddsJson)
          this.sortBothArrays(sportsApiData, newOddsJson, theEventId)
        }
      })
    } catch (error) {
      console.log('ERROR OCURRED AT SORTING ODDS', error)
    }
  }
  // sortBothArrays = async (theFightsJson, sportType, fightType, eventsArr, ufcMatchId, matchId2, howManyExist, res) => {
  sortBothArrays = async (theFightsJson, newOddsJson, theEventId) => {
    try {
      var v = 0, theFinalFightsArr = [], k = 0, firstMatchArr = []
      var theFights = theFightsJson.map(item => JSON.parse(JSON.stringify(item)));
      theFightsJson.map((item1, index) => {
        v++
        var f1Name = item1.fighter1Name, f2Name = item1.fighter2Name, matchMillis = item1.matchMillis

        newOddsJson.map((item2) => {
          var allName = item2.homeTeam + ' ' + item2.awayTeam
          var subDifference = matchMillis + 86400000
          var p1Name = item2.homeTeam//.split(' ')[0]
          var p2Name = item2.awayTeam//.split(' ')[0]


          var fullName1 = item2.homeTeam.split(' ')[0] + item2.homeTeam.split(' ')[1]
          var fullName2 = item2.awayTeam.split(' ')[0] + item2.awayTeam.split(' ')[1]
          var fullName1B = item2.homeTeam.split(' ')[1] + item2.homeTeam.split(' ')[0]
          var fullName2B = item2.awayTeam.split(' ')[1] + item2.awayTeam.split(' ')[0]
          //if ((p1Name===item1.p1Name2||p1Name===item1.p2Name2)||(p2Name===item1.p2Name2||p2Name===item1.p2Name2))
          if ((p1Name.includes(item1.p1Name2) || p1Name.includes(item1.p1Name3)) && (p2Name.includes(item1.p2Name2) || p2Name.includes(item1.p2Name3))) {
            console.log('allName', allName)
            //k++
            var hTPoints = item2.homeTeamPoints + ''
            var aTPoints = item2.awayTeamPoints + ''
            var hTPointsNum = Number(theRamOdds[hTPoints])
            var aTPointsNum = Number(theRamOdds[aTPoints])
            if (item2.homeTeamPoints < -10000) { hTPointsNum = 1.01 }
            if (item2.awayTeamPoints < -10000) { aTPointsNum = 1.01 }
            if (item2.homeTeamPoints > 12620) { hTPointsNum = 1247.20 }
            if (item2.awayTeamPoints > 12620) { aTPointsNum = 1247.20 }
            if (item2.homeTeamPoints < 101 && item2.homeTeamPoints > -101) { hTPointsNum = 2.03 }
            if (item2.awayTeamPoints < 101 && item2.awayTeamPoints > -101) { aTPointsNum = 2.03 }


            var theId = item1.fighter1Name.split(' ')[0] + item1.fighter2Name.split(' ')[0]
            theFights[index]['p1Points'] = hTPointsNum
            theFights[index]['p2Points'] = aTPointsNum
            theFights[index]['commenceTime'] = item2.commenceTime
            theFights[index]['timeInMillis'] = item2.timeInMillis
            theFights[index]['matchMillis'] = item2.timeInMillis
            theFights[index]['apiId'] = item2.id
            theFights[index]['id'] = theId
            firstMatchArr.push(item2.timeInMillis)
          } else if ((p2Name.includes(item1.p1Name2) || p2Name.includes(item1.p1Name3)) && (p1Name.includes(item1.p2Name2) || p1Name.includes(item1.p2Name3))) {
            // if (f1Name === item2.awayTeam || f2Name === item2.homeTeam) {

            //if (subDifference > item2.timeInMillis) {
            var hTPoints = item2.homeTeamPoints + ''
            var aTPoints = item2.awayTeamPoints + ''
            var hTPointsNum = Number(theRamOdds[hTPoints])
            var aTPointsNum = Number(theRamOdds[aTPoints])
            if (item2.homeTeamPoints < -10000) { hTPointsNum = 1.01 }
            if (item2.awayTeamPoints < -10000) { aTPointsNum = 1.01 }
            if (item2.homeTeamPoints > 12620) { hTPointsNum = 1247.20 }
            if (item2.awayTeamPoints > 12620) { aTPointsNum = 1247.20 }
            if (item2.homeTeamPoints < 101 && item2.homeTeamPoints > -101) { hTPointsNum = 2.03 }
            if (item2.awayTeamPoints < 101 && item2.awayTeamPoints > -101) { aTPointsNum = 2.03 }

            var theId = item1.fighter2Name.split(' ')[0] + item1.fighter1Name.split(' ')[0]
            theFights[index]['p2Points'] = hTPointsNum
            theFights[index]['p1Points'] = aTPointsNum
            theFights[index]['fighter1Name'] = item1.fighter2Name
            theFights[index]['fighter2Name'] = item1.fighter1Name
            theFights[index]['commenceTime'] = item2.commenceTime
            theFights[index]['timeInMillis'] = item2.timeInMillis
            theFights[index]['matchMillis'] = item2.timeInMillis
            theFights[index]['apiId'] = item2.id
            theFights[index]['id'] = theId
            firstMatchArr.push(item2.timeInMillis)

            // theMissing.push(item2.homeTeam+item2.awayTeam)
            //  }
          }
          else {
            k++
            //const filteredPeople = people.filter((item) => item.id !== idToRemove);
          }

        })
      })
      if (theFightsJson.length === v) {
        // console.log('fights array 004', fightType, theFightsJson)
        //var firstMatchTime = await Math.min(...theFights.map(item => item.timeInMillis));
        var firstMatchTime = Math.min(...firstMatchArr.map(item => item));
        var startTime = firstMatchTime + 86400000
        console.log('theFights Arr', theFights)
        theFights.map((item, index) => {
          console.log('theFights item.timeInMillis', item.timeInMillis, startTime)
          if (item.timeInMillis < startTime) {
            console.log('trueeee', item)
            if (item.apiId !== '') {
              theFinalFightsArr.push(item)
              console.log('kamalizaaaaaa', theFinalFightsArr)
            } else {
              console.log('bado kamalizaaaaaaa', item)
            }
          } else {
            console.log('falseeeee', item)
          }
          //console.log('theFightsJson.length',theFightsJson.length,index)
          if (theFights.length === index + 1) {
            var theRef = firebase.database().ref('/triallls/')
            theRef.set(theFinalFightsArr)
            //theEventId
            console.log('kamalizaaaaaa theEventId', theEventId)
            console.log('kamalizaaaaaa 223232323', theFinalFightsArr)
            this.setState({ sportsApiData: theFinalFightsArr, showUFCModal: true })
          }

        })

      }
    } catch (error) {
      console.log('ERROR OCURRED AT SORTING BOTH ARRAYS', error)
    }
  }  
  checkAuth = () => {
    var profilePhoto = localStorage.get('profilePhoto')
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId) }
        userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
          this.setState({ isAdmin: true })
        }

      } else {
        this.setState({ userLoggedIn: false })
        //this.getGamesInfo()
        this.checkUpcomingPastGames(userId)
      }
    })
  }

  checkUpcomingPastGames = async (userId) => {
    //return
    var userInfoDb = firebase.database().ref('/theEvents/eventsIds')
    var upcomingGames = [], pastGames = [], allGames = []
    var nowDate = await new Date().getTime()
    ////console.log('nowDate',nowDate)
    await userInfoDb.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      var i = 0
      dataSnapshot.forEach((data) => {
        i++

        var pastG = {}, upcomingG = {}
        var key = data.key
        var time = data.val().time
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        var getEventsTimeUpdate = data.val().getEventsTimeUpdate
        if (!getEventsTimeUpdate) { getEventsTimeUpdate = 'N/A' } else { getEventsTimeUpdate = new Date(getEventsTimeUpdate).toLocaleString() }
        var oddsTimeUpdate = data.val().oddsTimeUpdate
        if (!oddsTimeUpdate) { oddsTimeUpdate = 'N/A' } else { oddsTimeUpdate = new Date(oddsTimeUpdate).toLocaleString() }
        var fetchResultsTimeUpdate = data.val().fetchResultsTimeUpdate
        if (!fetchResultsTimeUpdate) { fetchResultsTimeUpdate = 'N/A' } else { fetchResultsTimeUpdate = new Date(fetchResultsTimeUpdate).toLocaleString() }

        var theData = data.val()

        var theItem = ''
        //allGames.push(theItem)
        ////console.log('key',key,'value',time,dataSnapshot.size)
        if (sportType === 'ramUfc') {
          /*if(nowDate>time){
            pastG={id:key,time:time,title:title}
            pastGames.push(pastG)
          }
          if(nowDate<time){
            upcomingG={id:key,time:time,title:title}
            upcomingGames.push(upcomingG)
          }*/
          var theItem = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, theData: theData, getEventsTimeUpdate, oddsTimeUpdate, fetchResultsTimeUpdate }
          allGames.push(theItem)
        }
        if (theCount === i) {
          console.log('data.val() 555555', allGames)
          //return
          var theEventTitle = '', theEventKey = '', sportType = '', theTime = '', endTime = 0
          if (allGames.length > 0) {
            allGames = allGames.sort(function (a, b) { return b.time - a.time });
            // //console.log('teeeeeee',allGames)
            theEventTitle = allGames[0]['title']; sportType = allGames[0]['sportType'], theEventKey = allGames[0]['id'], theTime = allGames[0]['time'], endTime = allGames[0]['endTime'],
              getEventsTimeUpdate = allGames[0]['getEventsTimeUpdate'], oddsTimeUpdate = allGames[0]['oddsTimeUpdate'], fetchResultsTimeUpdate = allGames[0]['fetchResultsTimeUpdate']
            this.setState({ allGames, theEventTitle, theEventKey, sportType, theTime, endTime, getEventsTimeUpdate, oddsTimeUpdate, fetchResultsTimeUpdate }, () => {
              this.getUfcMatches(userId)
              //this.getNullScoreBoardData(sportType,theEventKey)
            })
          }
        }
      });
    })
    
  }
  getUfcMatches = (userId) => {

    var allMatches = []
    this.setState({ ramUfcMaincardArray: [], ramUfcPrelimsArray: [], ramUfcEarlyPrelimsArray: [], theMenu: 'mainCard', dataAvailable: false, currentEventUserInfo: {} })
    var userInfoDb = firebase.database().ref('/theEvents/ramUfc/').child(this.state.theEventKey)
    userInfoDb.once('value', dataSnapshot => {
      //console.log('children count',dataSnapshot.numChildren());
      var dataCount = dataSnapshot.numChildren()
      ////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var mainCardCount = dataSnapshot.child('mainCard').numChildren()
      var prelimsCount = dataSnapshot.child('prelims').numChildren()
      var earlyPrelimsCount = dataSnapshot.child('earlyPrelims').numChildren()
      if (prelimsCount === 0 && earlyPrelimsCount === 0) { this.setState({ matchTypesNo: 1 }) }
      if (prelimsCount >= 1 && earlyPrelimsCount === 0) { this.setState({ matchTypesNo: 2 }) }
      if (prelimsCount >= 1 && earlyPrelimsCount >= 1) { this.setState({ matchTypesNo: 3 }) }
      var theInfo = dataSnapshot.val()
      //console.log('the event mainCardCount 323232',mainCardCount) 
      if (theInfo.mainCard) {
        var array1 = []
        ////console.log('iko maincarddddd',theInfo.mainCard)
        var i = 0
        for (var key in theInfo.mainCard) {
          i++
          var theData = theInfo.mainCard[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          allMatches.push(array2)
          if (i === mainCardCount) {
            //console.log('whole maincard Array',array1)
            //allMatches.push(array1)
            this.setState({ ramUfcMaincardArray: array1, theItems: array1 })

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
          allMatches.push(array2)
          if (i === prelimsCount) {
            ////console.log('whole prelimms Array',array1)
            this.setState({ ramUfcPrelimsArray: array1 })

          }
        }
        //prelimsArray
      } else {
        ////console.log('hakuna prelimsssssss')
        if (this.state.userId.length < 3) return

        this.getMatchesInfo(this.state.userId, allMatches)
      }
      if (theInfo.earlyPrelims) {
        var array1 = []
        ////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.earlyPrelims) {
          i++
          var theData = theInfo.earlyPrelims[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          allMatches.push(array2)
          if (i === earlyPrelimsCount) {
            ////console.log('whole early prelimms Array',array1)
            //allMatches.push(array1)
            this.setState({ ramUfcEarlyPrelimsArray: array1 })
            if (this.state.userId.length < 3) return

            //allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcEarlyPrelimsArray]]
            this.getMatchesInfo(this.state.userId, allMatches)
          }
        }
      } else {
        if (this.state.userId.length < 3) return
        //allMatches=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...allMatches=[...this.state.ramUfcMaincardArray]]
        this.getMatchesInfo(this.state.userId, allMatches)
        ////console.log('hakuna early prelimsssssss')
      }
    })
    ////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')




  }
  getMatchesInfo = async (userId, allMatches) => {
    ////console.log('allMatches',userId,this.state.theEventKey,allMatches)

    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/ramUfc/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/ramUfc/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/ramUfc/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/ramUfc/')
    var flocksDataRef = firebase.database().ref('users/').child(userId + '/flockData/flockNames/' + this.state.theEventKey + '/link')
    var trialDb = firebase.database().ref('/triaaaaaal/')
    var currentEventUserInfo = ''
    flocksDataRef.once('value', dataSnapshot => {
      console.log('flocksDataRef the key', dataSnapshot.val())
      if (dataSnapshot.exists()) {
        this.setState({ theLink: dataSnapshot.val() })
      } else {
        this.setState({ theLink: '' })
      }
    })
    await selectedMatchesKeyDb.once('value', dataSnapshot => {

      if (!dataSnapshot.val()) return

      photoRefDb.once('value', dataSnapshot => {
        ////console.log('proofile photo',dataSnapshot.val())
        if (dataSnapshot.val()) {
          this.setState({ profilePhoto: dataSnapshot.val() })
        }
      })
      userInfoDb.once('value', dataSnapshot => {
        if (!dataSnapshot.val()) return
        ////console.log('the type user info',dataSnapshot.val())
        if (dataSnapshot.val()) {
          var theInfo = dataSnapshot.val()
          this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank })
          currentEventUserInfo = dataSnapshot.val()
          ////console.log('currentEventUserInfo',currentEventUserInfo)

        }
      })
      var thetrrrr = [...this.state.ramUfcMaincardArray, ...this.state.ramUfcPrelimsArray, ...this.state.ramUfcEarlyPrelimsArray]
      ////console.log('thetrrrr',thetrrrr)
      userBetsDb.once('value', dataSnapshot => {
        ////console.log('the bets data',dataSnapshot.val())
        ////console.log('this.state.theItems',this.state.theItems)
        if (!dataSnapshot.val()) return
        var itemsCount = dataSnapshot.numChildren()
        ////console.log('it count',itemsCount)
        var i = 0, thePoints = [], currentScore = []
        dataSnapshot.forEach((data, index) => {
          i++
          thetrrrr.map((item) => {
            ////console.log('thetrrrr item',item)
            ////console.log('thedb item',data.val())
            if (item.id === data.key) {
              ////console.log('thank you sir')
              item['bet'] = data.val()
              if (item.status1 === 'played') {
                if (item.winner === 'player1' && data.val() === 'player1') { currentScore.push(item.p1Points); thePoints.push(item.p1Points) }
                if (item.winner === 'player2' && data.val() === 'player2') { currentScore.push(item.p2Points); thePoints.push(item.p2Points); }
              } else {
                if (data.val() === 'player1') {
                  thePoints.push(item.p1Points);
                }
                if (data.val() === 'player2') {
                  thePoints.push(item.p2Points);
                }
              }

            }
          })
          if (itemsCount === i) {
            this.setState({ dataAvailable: true })
            if (this.state.theMenu === 'mainCard') { this.setState({ ramUfcMaincardArray: this.state.theItems }) }
            if (this.state.theMenu === 'prelimms') { this.setState({ ramUfcPrelimsArray: this.state.theItems }) }
            if (this.state.theMenu === 'earlyPrelims') { this.setState({ ramUfcEarlyPrelimsArray: this.state.theItems }) }
            ////console.log('this.state.theItems',this.state.theItems)
            ////console.log('thePointsssss',thePoints)
            ////console.log('currentScore',currentScore.length)
            return
            var pointsSum = thePoints.reduce((partialSum, a) => partialSum + a, 0);
            pointsSum = pointsSum.toFixed(2)


            gamesDataRef.child(this.state.theEventKey + '/details/bestPossibleScore/').set(pointsSum)
            currentEventUserInfo['bestPossibleScore'] = pointsSum
            this.setState({ currentEventUserInfo })
            ////console.log('currentScore 555555',currentScore)
            if (currentScore.length > 0) {
              var scoreSum = currentScore.reduce((partialSum, a) => partialSum + a, 0);
              scoreSum = scoreSum.toFixed(2)
              currentEventUserInfo['currentScore'] = scoreSum
              this.setState({ currentEventUserInfo })
              ////console.log('scoreSum55555555',scoreSum)
              userInfoDb.child('/currentScore/').set(scoreSum)
            }
          }
        })
      })

    })
  }
  selectEvent = (theMenu, theItems) => {
    this.setState({ theMenu, theItems })
  }

  loadOtherFights = async (theEventKey, theEventTitle, fetchResultsTimeUpdate, getEventsTimeUpdate, oddsTimeUpdate, theTime) => {
    this.setState({ theTime, theLink: '' })
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

      this.setState({ theEventKey, theEventTitle, expired, fetchResultsTimeUpdate, getEventsTimeUpdate, oddsTimeUpdate, theTime }, () => {
        this.getUfcMatches()
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

  // todo add stopEdit on getting matches
  hideModal = () => {
    this.setState({ opendetailsModal: false })
    //////console.log('Button clicked!');
  };
  checkEpiry = async () => {
    var userInfoDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/time/')
    await userInfoDb.once('value', dataSnapshot => {
      //console.log('expiry data',dataSnapshot.val())
    })
  }
  openTheModal = async () => {
    var allMatches = [...this.state.ramUfcMaincardArray, ...this.state.ramUfcPrelimsArray, ...this.state.ramUfcEarlyPrelimsArray]
    //console.log('ratatata',this.state.userLoggedIn,allMatches)
    if (this.state.userLoggedIn === false) {
      this.notify("Please Log In to continue")
      this.setState({ openLoginModal: true })
      return
    }
    var i = 0, pointMissing = false
    //console.log('this.state.theItems',allMatches)
    await allMatches.map((item, index) => {
      i++
      ////console.log('item.p1Points',item.p1Points)
      if ((item.p1Points === 'N/A' || item.p2Points === 'N/A') && item.status1 !== 'cancelled') {
        pointMissing = true
        //console.log('item.p1Points',item)
      }
      if (item.status1 === 'cancelled' && item.p1Points === 'N/A') {
        allMatches[index]['p1Points'] = 0
        allMatches[index]['p2Points'] = 0
      }
      if (allMatches.length === index + 1) {
        if (pointMissing === true) {
          this.notify('All event points not yet populated, try again later')
        } else {
          this.openTheModal2()
        }
      }
    })
  }
  openTheModal2 = () => {
    var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/time/')
    timeInfoDb.once('value', dataSnapshot => {
      var theEventTime = dataSnapshot.val()
      if ((new Date().getTime() > theEventTime)) {
        this.notify('Event pick/edit time expired')
      } else {
        if (this.state.userLoggedIn === true) {
          var thetrrrr = [...this.state.ramUfcMaincardArray, ...this.state.ramUfcPrelimsArray, ...this.state.ramUfcEarlyPrelimsArray]
          this.setState({ allMatches: thetrrrr }, () => {
            this.setState({ opendetailsModal: true, openLoginModal: false })
          })
        } else {
          this.setState({ openLoginModal: true, opendetailsModal: false })
        }
      }
    })

  }
  opeModal2 = () => {
    var userInfoDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/stopEdit/')
    userInfoDb.once('value', dataSnapshot => {
      var theEventTime = dataSnapshot.val()
      if ((theEventTime - new Date().getTime()) < 600000) {
        this.notify('Event pick/edit time expired')
      } else {
        this.setState({ editDetailsModal: true })
      }
    })
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
  theTypeAnimation = (text1, text2) => {
    return (
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
    await this.setState({ [e.target.id]: value })
  }
  chooseHomeEvent = (event, id) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ selectHomeEvent: true, selectHomeEventId: id })
  }
  sendEvent = (event, data, id) => {
    event.stopPropagation()
    event.preventDefault()
    data['id'] = id
    var theDb = firebase.database().ref("/theEvents/eventToShowHomePage/")
    theDb.set(data, (error) => {
      if (error) {
        this.notify('An error occured while updating')
      } else {
        this.setState({ selectHomeEvent: false })
        this.notify('Selected Succesfully')
      }
    })
  }
  copyLink = () => {
    //navigator.clipboard.writeText(this.state.theLink)
    copy(this.state.theLink);
    this.notify('Link copied successfully')
  }
  handleChildClick = (from, theEventKey, theEventTitle, fetchResultsTimeUpdate, getEventsTimeUpdate, oddsTimeUpdate, theTime, sportType, currentSelection, isEventExpired, endTime) => {
    this.setState({ count: this.state.count + 1 })
    //if(from==='ramUfc')
    this.loadOtherFights(theEventKey, theEventTitle, fetchResultsTimeUpdate, getEventsTimeUpdate, oddsTimeUpdate, theTime, sportType, currentSelection)

  };
  handleChildClick2 = () => {
    this.setState({ count: this.state.count + 1, showUFCModal: false })
  };
  openConfirmModal = (message, type) => {
    console.log('this.state.theEventKey',this.state.theEventKey)
    var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/time/')
    timeInfoDb.once('value', dataSnapshot => {
      var theEventTime = dataSnapshot.val()
      console.log('theEventTime',theEventTime)
      if (type === 'oddsUpdate') { 
        if (new Date().getTime() > theEventTime) {
          this.notify('Event odds update time expired')
        }else{this.setState({ confirmMessage: message, showConfirmModal: true, confirmModalType: type })}}
        if (type === 'resultsUpdate') { 
          if (new Date().getTime() > (theEventTime+86400000)) {
            this.notify('Event fetch results expired')
          } else {this.setState({ confirmMessage: message, showConfirmModal: true, confirmModalType: type })}}
    }) 
    
  }
  proceed = () => {
  if (this.state.confirmModalType === 'oddsUpdate') {this.getTimeUfcOdds(this.state.theEventKey, this.state.matchTypesNo)}
  if (this.state.confirmModalType === 'resultsUpdate'){this.checkForAllResults()}
  }
  doNothing = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  pickWinner = (id, winner, time) => {
    var nowTime = new Date().getTime()
    var allUFCMatches = [...this.state.ramUfcMaincardArray, ...this.state.ramUfcPrelimsArray, ...this.state.ramUfcEarlyPrelimsArray]
    var index2 = allUFCMatches.map(function (x) { return x.id; }).indexOf(id);
    var nowTime = new Date().getTime()
    /*if(nowTime<time){
      this.notify('Match not yet started')
      return
    }
    if(winner!=='N/A'){
     this.notify('Winner already filled')
      return
    }*/
    allUFCMatches[index2]['showChooseWinner'] = true
    this.setState({ allUFCMatches: allUFCMatches })
    console.log('this.state.currentItems allUFCMatches', allUFCMatches)
  }
  chosenWinner = (id, winner) => {
    var index2 = this.state.allUFCMatches.map(function (x) { return x.id; }).indexOf(id);
    var theItems = this.state.allUFCMatches
    theItems[index2]['chosenWinner'] = winner
    theItems[index2]['status1'] = 'played'
    this.setState({ allUFCMatches: theItems })
    console.log('this.state.currentItems 008', theItems)
  }
  closePickWinner = (id) => {
    var index2 = this.state.allUFCMatches.map(function (x) { return x.id; }).indexOf(id);
    var theItems = this.state.allUFCMatches
    delete theItems[index2]['chosenWinner']
    delete theItems[index2]['showChooseWinner']
    this.setState({ allUFCMatches: theItems })
    console.log('this.state.currentItems 001', theItems)
  }

  submitWinner = (id, winner) => {
    console.log('haaaaaaaaaaaapa 000000')
    var index = this.state.allUFCMatches.map(function (x) { return x.id; }).indexOf(id);
    if (winner !== 'player1' && winner !== 'player2') {
      this.notify('Nothing to submit')
    } else {
      this.checkForRoundOutcome(index, winner, this.state.allUFCMatches)
    }
  }
  checkForRoundOutcome = async (index, winner, items) => {
    try {
      //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
      var shortArr = []
      console.log('haaaaaaaaaaaapa', this.state.currentSelection, index, winner)
      items[index]['winner'] = winner
      delete items[index]['chosenWinner']
      delete items[index]['showChooseWinner']
      this.setState({ allUFCMatches: items })
      items.map((item, index) => {
        console.log('shortArr', shortArr)
        var theItem = {
          p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner,
          status1: item.status1, id: item.id, type: item.type
        }
        shortArr.push(theItem)
      })

      if (this.state.theEventKey === '', items.length < 1) return
      if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
      let theItems = JSON.stringify(shortArr);
      var theLink = 'theEvents::ramUfc::' + this.state.theEventKey + '::' + theItems
      if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
      var theQuery = encodeURIComponent(theLink)
      console.log('001', this.state.theEventKey, theItems)
      console.log('theLink', theLink, theItems)
      console.log('this.state.shortArr 006', shortArr)
      //return
      await axios.get("https://theramtournament.com/getSingleUFCResults?term=" + theQuery)
        //await axios.get("http://localhost:4000/getSingleUFCResults?term="+theQuery)
        .then((res) => {
          var theOutcome = res.data
          if (theOutcome === 'Success Updating Results') {
            this.notify('Success Updating Match Results')
            this.checkAuth()
          }
        })
    } catch (error) {
      ////console.log('error',error)
    }
  }
  openUFCModal = () => {
    var allMatches = [...this.state.ramUfcMaincardArray, ...this.state.ramUfcPrelimsArray, ...this.state.ramUfcEarlyPrelimsArray]
    this.setState({ sportsApiData: allMatches, showUFCModal: true })
  }
  render() {
    var flockTeamName = ''
    var itemToModals = ''
    var theText = 'samosaaaaaaaaaaaaaaaaaa'
    var isPastEvent = ''
    var todayInMillis = new Date().getTime()
    if (this.state.endTime < todayInMillis && (this.state.endTime - todayInMillis) < -86400000) {
      isPastEvent = false
    } else { isPastEvent = true }
    if (this.state.dataAvailable) { flockTeamName = this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] }
    else { flockTeamName = false }
    if (this.state.dataAvailable) { itemToModals = this.state.theItems } else { itemToModals = this.state.ramUfcMaincardArray }
    return (
      <><div className={style.container}>
        {/*<div className={style.eventsCont}>
        <p className={style.eventsP} id={this.state.theEvent==='Upcoming Events'?style.playerP1:style.playerP} onClick={()=>this.setState({theEvent:'Upcoming Events'})}>UPCOMING EVENTS</p>
        <p className={style.eventsP} style={{color:this.state.pastEventsAvailable?null:'#b2b2b2',borderColor:this.state.pastEventsAvailable?null:'#b2b2b2'}} id={this.state.theEvent==='Past Events'?style.playerP1:style.playerP} onClick={()=>this.state.pastEventsAvailable?this.setState({theEvent:'Past Events'}):null}>PAST EVENTS</p>
        </div>*/}
        {this.state.showReel ? <div className={style.matchesHeadDiv} >
          <PastUpcomingEvents onClick={this.handleChildClick} allGames={this.state.allGames} theEventKey={this.state.theEventKey} selectHomeEvent={this.state.selectHomeEvent} selectHomeEventId={this.state.selectHomeEventId} from='ramUfc' />
        </div> : null}
        {/*<div className={style.matchesHeadDiv}>
          {this.state.allGames.map((item,index)=>{
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
        </div>*/}
        <div className={style.profileDiv}>
          <div className={style.imageDiv}>
            {this.state.profilePhoto.length ? <img src={this.state.profilePhoto} /> :
              <IoPersonSharp className={style.personIC} />}
          </div>
          <div className={style.detailsDiv}>
            <p>RAM Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['teamName'] : 'N/A'}</p>
            <p>Flock Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['flockName'] : 'N/A'}</p>
            {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.opeModal2()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal()} >Make Picks</p>}
          </div>
        </div>
        {/*this.state.isAdmin?<div className={style.eventCreationDiv}>
          <p className={style.eventP} onClick={() => this.openUFCModal()}>Enter Event Details</p>
          </div>:null*/}
        <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
        {this.state.theLink.length > 1 && new Date().getTime() < this.state.theTime ? <div className={style.shareDiv} onClick={() => this.copyLink()}>
          <p>Flock Invite Link</p>
          <MdOutlineShare />
        </div> : null}

        <div className={style.picksDiv} onClick={() => this.openTheModal()}>
          {/*<p className={style.picksP}>CLICK HERE MAKE YOUR PICKS</p>*/}
          {this.state.dataAvailable ?
            this.theTypeAnimation('CLICK HERE TO MAKE YOUR PICKS', 'CLICK HERE TO ENTER THE GAME')
            :
            this.theTypeAnimation('CLICK HERE TO EDIT YOUR PICKS', 'CLICK HERE TO ENTER THE GAME')
          }
        </div>
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || this.state.userId === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || this.state.userId === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' ?
          <><div className={style.resultsCont}>
            <div className={style.resultsDiv}>
              <button className={style.resultsBtn} onClick={() => this.setState({ showGetMatchesModal: !this.state.showGetMatchesModal })}>Check For New Events</button>
              <p className={style.lastUpdateP}>Last Update {this.state.getEventsTimeUpdate}</p>
            </div>
            <div className={style.resultsDiv}>
              <button className={style.resultsBtn} onClick={() => this.openConfirmModal('Are you sure you want to update the UFC Match Odds?', 'oddsUpdate')}>Update Match Odds</button>
              <p className={style.lastUpdateP}>Last Update {this.state.oddsTimeUpdate}</p>
            </div>
            <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={()=>this.openConfirmModal('Are you sure you want to get the UFC Match Results?','resultsUpdate')}>Fetch Results Updates</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.fetchResultsTimeUpdate}</p>
                  </div>
          </div>
            {this.state.showGetMatchesModal ? <div className={style.ufcLinkDiv}>
              <input className={style.ufcLinkInput} id='UFCLinkInput' placeholder='Enter Event ID' value={this.state.UFCLinkInput} onChange={(event) => this.inputChange(event)} />
              <button className={style.ufcLinkSend} onClick={() => this.checkForNewEvents()}>Send</button>
            </div> : null}
          </> : null}
        <div className={style.eveDiv}>
          {this.state.ramUfcMaincardArray.length > 0 ? <p id={this.state.theMenu === 'mainCard' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('mainCard', this.state.ramUfcMaincardArray)}>MAIN CARD</p> : null}
          {this.state.ramUfcPrelimsArray.length ? <p id={this.state.theMenu === 'prelims' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('prelims', this.state.ramUfcPrelimsArray)}>PRELIMS</p> : null}
          {this.state.ramUfcEarlyPrelimsArray.length ? <p id={this.state.theMenu === 'earlyPrelims' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('earlyPrelims', this.state.ramUfcEarlyPrelimsArray)}>EARLY PRELIMS</p> : null}

        </div>
        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.scoreP1}>Best possibe Score:</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? this.state.currentEventUserInfo['bestPossibleScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont2}>
            <p className={style.scoreP1}>Current Score</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? this.state.currentEventUserInfo['currentScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont3}>
            <p className={style.scoreP1}>Current Rank in RAM UFC</p>
            <p className={style.scoreP2}>{this.state.dataAvailable && this.state.currentRank ? this.state.currentRank : 'N/A'}</p>
          </div>
        </div>
        <div className={style.listCont}>
          {this.state.theItems.map((item, index) => {
            ////console.log('the iteeeeeeeeeem',item)
            var playStat = ''
            var playStatCol = ''

            if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
            if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
            if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
            var timeDiff = Number(item.timeInMillis) - new Date().getTime()
            //if(item.status1==='notPlayed'&&timeDiff>300000){

            //}
            /* if((item.timeInMillis-new Date().getTime())<24000000){
               playStat='Ongoing Event',playStatCol='#CB1E31'
               //console.log('ika saaaaaaaawa')
             }*/

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
            if (item.bet === 'player1') { myPick = item.fighter1Name }
            if (item.bet === 'player2') { myPick = item.fighter2Name }
            var matchTime = ''
            // //console.log('item.timeInMillis',item.timeInMillis)
            if (item.timeInMillis) {
              matchTime = Number(item.timeInMillis)
              matchTime = dayjs(item.timeInMillis).format('DD MMM YYYY HH:mm A')
              //matchTime=new Date(item.timeInMillis).toDateString()
            } else { matchTime = item.time }
            ////console.log('matchTime',matchTime)
            var status1Item = ''
            if (item.status1 === 'notPlayed' && (new Date().getTime() < item.timeInMillis)) { status1Item = <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> }
            if (item.status1 === 'notPlayed' && (new Date().getTime() > item.timeInMillis)) { status1Item = <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p> }
            if (item.status1 === 'played') { status1Item = <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p> }
            if (item.status1 === 'ongoing') { status1Item = <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p> }
            if (item.status1 === "cancelled") { status1Item = <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Cancelled</p> }
            ////console.log('item.status1 rakada',item.id,item.status1,new Date().getTime(),item.timeInMillis)
            return (
              <div className={style.listDiv} key={index}>
                <div className={style.theCont0}>
                  <div className={style.theCont01}>
                    <p>{this.state.selectedEvent} - {item.match}</p>
                    <p>{matchTime}</p>
                  </div>
                  {this.state.isAdmin ? <div className={style.pickWinnerDiv} onClick={() => this.pickWinner(item.id, item.winner, item.timeInMillis)}>
                    <p>Pick Winner</p>
                  </div> : null}
                  {status1Item}
                  {/*item.status1==='notPlayed'?<>{timeDiff>300000?<div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount}/></div>:<p className={style.eventStatP} style={{color:'#CB1E31'}}>Ongoing</p>}</>:
                      <p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>*/}


                  <div className={style.theCont}>
                    <div className={style.theContLeft}>
                      <div className={style.imgDiv} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                        <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img>
                        {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                      </div>
                      <p className={style.P1}>{item.fighter1Name}</p>
                      <p className={style.countryP}>{item.fighter1Country}</p>
                      <p className={style.P2}>{item.p1Rec}</p>
                    </div>
                    <BsFillLightningFill className={style.sepIc} />
                    <div className={style.theContRight}>
                      <div className={style.imgDiv} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                        <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img>
                        {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
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
                  {this.state.dataAvailable ? <div id={style.statDiv}>
                    <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                    <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                    <p></p>
                  </div> :
                    <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
                  }
                </div>
                {this.state.isAdmin && item.showChooseWinner ? <div className={style.listDivB}>
                  <MdClose className={style.closeIc} onClick={() => this.closePickWinner(item.id)} />
                  <div>
                    <p className={style.chooseP}>Choose Winner</p>
                    <div className={item.chosenWinner === 'player1' ? style.listDivB2C : style.listDivB2} onClick={() => this.chosenWinner(item.id, 'player1')}>
                      <TbCheckbox size={20} />
                      <p>{item.fighter1Name}</p>
                    </div>
                    <div className={item.chosenWinner === 'player2' ? style.listDivB2C : style.listDivB2} onClick={() => this.chosenWinner(item.id, 'player2')}>
                      <TbCheckbox size={20} />
                      <p>{item.fighter2Name}</p>
                    </div>
                    <div className={style.listDivB3}>
                      <TbCheckbox size={16} />
                      {item.chosenWinner && item.chosenWinner === 'player1' ? <p>{item.fighter1Name}</p> : null}
                      {item.chosenWinner && item.chosenWinner === 'player2' ? <p>{item.fighter2Name}</p> : null}
                      {!item.chosenWinner || item.chosenWinner === 'N/A' ? <p>N/A</p> : null}

                    </div>
                    <button onClick={() => this.submitWinner(item.id, item.chosenWinner)}>Submit</button>
                  </div></div> : null}
              </div>
            )
          })}
        </div>
      </div>
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={this.state.allMatches} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} /></div> : null}
        {this.state.openLoginModal ? <div className={style.detailsModal} onClick={() => this.setState({ openLoginModal: false })}><LogIn /></div> : null}
        {this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null}
        {this.state.showUFCModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ showUFCModal: false })} ><RamUFCModal onClick={this.handleChildClick2} theDetails={this.state.sportsApiData} title={this.state.theUfcTItleTomodal} theEventId={this.state.theEventId} /></div> : null}
        <ToastContainer />
        {this.state.showProgressBar ? <ProgressBar /> : null}
        {this.state.showConfirmModal ? <div className={style.detailsModal} onClick={() => this.setState({ showConfirmModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#292f51' }}>Confirm</p>
            <p style={{ marginBottom: 20 }}>{this.state.confirmMessage}</p>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button style={{ backgroundColor: '#ddd', border: 'none', color: 'black', padding: '7px 15px', cursor: 'pointer' }} onClick={() => this.setState({ showConfirmModal: false })}>Cancel</button>
              <button style={{ backgroundColor: '#CB1E31', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.proceed()}>Proceed</button>
            </div></div></div> : null}

      </>
    )
  }
}

export default RamUfc