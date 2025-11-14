import React, { Component } from 'react'
import styles from "./NFLModal.module.scss";
import { BsFillLightningFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import ProgressBar from '../Helper/ProgressBar'
import axios from "axios"
import dayjs from 'dayjs';
import theRamOdds from './ramOdds.json'
import theNFLOdds from '../TheJSONS/nflOdds.json'
import localStorage from 'local-storage'

var week1RoundEdit = [], week2RoundEdit = [], week3RoundEdit = [], superBowlEdit = [], week4RoundEdit = []

var week1RoundEdit2 = [], week2RoundEdit2 = [], week3RoundEdit2 = [], superBowlEdit2 = [], week4RoundEdit2 = []
class NCAAModal extends Component {
  state = {
    week1RoundEdit: [], week2RoundEdit: [], week3RoundEdit: [], week4RoundEdit: [], superBowlEdit: [], submitErr: "", showProgressBar: false, currentSelection: this.props.eventToNFLModal, isItSubmit: false,
    eventStartTime: 0, eventEndTime: '', theNewArr: [], firstTime: '', lastPostTime: 0
  }

  componentDidMount = () => {
    //var incomingData=[...this.props.itemsToNFLModal]
    //this.props.lastPostTime //week1RoundEditTime
    //localStorage.clear();
    var lastPostTime = '', incomingData = [], theItems = []
    if (this.props.eventToNFLModal === 'week1Round') { lastPostTime = localStorage.get('week1RoundEditTime'), theItems = localStorage.get('week1RoundEdit') }
    if (this.props.eventToNFLModal === 'week2Round') { lastPostTime = localStorage.get('week2RoundEditTime'), theItems = localStorage.get('week2RoundEdit') }
    if (this.props.eventToNFLModal === 'week3Round') { lastPostTime = localStorage.get('week3RoundEditTime'), theItems = localStorage.get('week3RoundEdit') }
    if (this.props.eventToNFLModal === 'week4Round') { lastPostTime = localStorage.get('week4RoundEditTime'), theItems = localStorage.get('week4RoundEdit') }
    ////console.log('lastPostTime',lastPostTime)
    //return
    if (!lastPostTime || lastPostTime === null || lastPostTime === undefined) {
      incomingData = this.props.itemsToNFLModal.map(item => JSON.parse(JSON.stringify(item)));
      //console.log('lastPostTime 111',lastPostTime)
    } else {
      //console.log('lastPostTime 2222',lastPostTime,this.props.lastPostTime)
      // if(this.props.lastPostTime>100000){}

      if (lastPostTime > this.props.lastPostTime) {
        incomingData = JSON.parse(theItems)
        //console.log('lastPostTime 3333',lastPostTime,JSON.parse(theItems))

      }
      else { incomingData = this.props.itemsToNFLModal.map(item => JSON.parse(JSON.stringify(item))); }
    }
    //return

    localStorage.set('eventType', this.state.currentSelection)
    //if(this.state.currentSelection==='')
    //JSON.parse(theItems)
    //return
    //console.log('incomingData 96969696',incomingData)
    //return
    ////console.log('the info',this.props.itemsToNFLModal,this.props.eventToNFLModal,this.props.theEventKey)
    /* //console.log('this.props.itemsToNFLModal',this.props.itemsToNFLModal)
     //console.log('this.props.eventToNFLModal',this.props.eventToNFLModal)
     //console.log('this.props.theEventKey',this.props.theEventKey)
      //console.log('this.props.currentSelection',this.state.currentSelection)*/
    // return
    if (incomingData.length > 0) {
      week1RoundEdit = [], week2RoundEdit = [], week3RoundEdit = [], week4RoundEdit = []
      var firstMatchTime = []
      var i = 0
      incomingData.map((item, index) => {
        i++
        incomingData[index]['bet'] = ''
        firstMatchTime.push(item.timeInMillis)
        //if(item.player1NickName==='N/A'){
        if (item.apiId === '' && this.props.lastPostTime < 100) {
          //console.log('item.player1NickName samooooo')
          incomingData[index]['commenceTime'] = ''
          incomingData[index]['timeInMillis'] = ''
          incomingData[index]['time'] = ''
          incomingData[index]['error'] = ''
          incomingData[index]['apiId'] = ''
        }
        if (incomingData.length === i) {
          var firstTime = Math.min(...firstMatchTime.map(item => item));
          this.setState({ firstTime })
          if (this.state.currentSelection === 'week1Round') { week1RoundEdit = incomingData, this.setState({ week1RoundEdit }) }
          if (this.state.currentSelection === 'week2Round') { week2RoundEdit = incomingData, this.setState({ week2RoundEdit }) }
          if (this.state.currentSelection === 'week3Round') { week3RoundEdit = incomingData, this.setState({ week3RoundEdit }) }
          if (this.state.currentSelection === 'week4Round') { week4RoundEdit = incomingData, this.setState({ week4RoundEdit }) }
          // console.log('modal timeeeeeeee',firstTime,incomingData)
          //if(this.props.eventAlreadyFilled===true){this.setState({isItSubmit:true})}
        }
      })
    }
  }
  clearForm = async () => {
    localStorage.clear()
    this.props.onClick()
  }
  /*fillEventDetails=async(menu)=>{
   
    this.showProgressBar()
    var idStart=''
    if(this.state.currentSelection==='wildCard'){idStart='wildCardMatch'}
    if(this.state.currentSelection==='divisionalRound'){idStart='divisionalRoundMatch'}
    if(this.state.currentSelection==='conferenceChampionship'){idStart='conferenceChampionshipMatch'}
    if(this.state.currentSelection==='superBowl'){idStart='superBowlMatch'}
    var incomingData=this.props.itemsToNFLModal
    var firstEventTime = await Math.min(...incomingData.map(item => item.timeInMillis));
    var lastEventTime = await Math.max(...incomingData.map(item => item.timeInMillis));
    firstEventTime=new Date(firstEventTime-86400000).toLocaleDateString()
    firstEventTime=firstEventTime.split('/')
    var theMonthFirst='',theDateFirst=''
    if(firstEventTime[0].length<=1){theMonthFirst='0'+firstEventTime[0]}else{theMonthFirst=firstEventTime[0]}
    if(firstEventTime[1].length<=1){theDateFirst='0'+firstEventTime[1]}else{theDateFirst=firstEventTime[1]}
    firstEventTime=firstEventTime[2]+'-'+theMonthFirst+'-'+theDateFirst+'T21:00:00Z'
    lastEventTime=new Date(lastEventTime+(86400000*2)).toLocaleDateString()
    lastEventTime=lastEventTime.split('/')
    var theMonthLast='',theDateLast=''
    if(lastEventTime[0].length<=1){theMonthLast='0'+lastEventTime[0]}else{theMonthLast=lastEventTime[0]}
    if(lastEventTime[1].length<=1){theDateLast='0'+lastEventTime[1]}else{theDateLast=lastEventTime[1]}
    lastEventTime=lastEventTime[2]+'-'+theMonthLast+'-'+theDateLast+'T21:00:00Z'
    //firstEventTime=dayjs(firstEventTime)
    //console.log('firstEventTime',firstEventTime,'lastEventTime',lastEventTime)
    //return

    var oddsApi="https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?commenceTimeFrom="+firstEventTime+"&commenceTimeTo="+lastEventTime+"&regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
    //var oddsApi="https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?commenceTimeFrom=2025-02-09T23:30:00Z&commenceTimeTo=2025-01-26T23:30:00Z&regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
    //console.log('oddsApi',oddsApi)
    //return
    const response = await axios.get(oddsApi)
    var theOddsJson=response.data
    //console.log('theOddsJson',theOddsJson)
    this.sortOddsJson(theOddsJson,idStart,menu,incomingData)
  }
   sortOddsJson=async(theOddsJson,idStart,menu,incomingData)=>{
   
    try {
      ////console.log('theOddsJson',theOddsJson)
      //return
      var jCount=0
    theOddsJson.map((item1,index)=>{
        var i=0,newOddsJson=[]
        jCount++
        item1.bookmakers.map((item2)=>{
            i++
            var draftkingsMarket=[]
            if(item2.key==='draftkings'){
               
                draftkingsMarket=item2.markets
                ////console.log('draftkings markets',item2.markets)
                ////console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
                draftkingsMarket.map((item3)=>{
                    ////console.log('draftkingsMarket 006',item3.outcomes)
                   const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
                     theOddsJson[index].draftkingsOdds=obj
                })
            }
           
            if(item1.bookmakers.length===i){
                ////console.log('new array',theOddsJson)
               
                var m=0
                theOddsJson.map((item12,index)=>{
                    m++
                    ////console.log('item12.draftkingsOdds',item12.draftkingsOdds)
                    var awayPoints=0,homePoints=0
                    if(item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0){
                        ////console.log('shit is undefined')
                    }else{
                        var homeFighterName=item12.home_team
                        var awayFighterName=item12.away_team
                        awayPoints=item12.draftkingsOdds[awayFighterName]
                        homePoints=item12.draftkingsOdds[homeFighterName]
                }

          var hTPointsNum=Number(theRamOdds[homePoints])
          var aTPointsNum=Number(theRamOdds[awayPoints])
          if(homePoints<-10000){hTPointsNum=1.01}
          if(awayPoints<-10000){aTPointsNum=1.01}
          if(homePoints>12620){hTPointsNum=1247.20}
          if(awayPoints>12620){aTPointsNum=1247.20}
          ////console.log('item2.homeTeam',item2.homeTeam,item2.homeTeamPoints)
         
          if(homePoints<=101&&homePoints>=-101){hTPointsNum=2.03}
          if(awayPoints<=101&&awayPoints>=-101){aTPointsNum=2.03}


          //console.log('hTPointsNum',hTPointsNum,'aTPointsNum',aTPointsNum)

                var matchTime= new Date(item12.commence_time);
                var newItem={player2:item12.away_team,player1:item12.home_team,apiId:item12.id,commenceTime:item12.commence_time,timeInMillis:matchTime.getTime(),
                  p2Points:aTPointsNum,p1Points:hTPointsNum,id:idStart+index,
                }
               
                newOddsJson.push(newItem)
                })
                if(m===theOddsJson.length){
                  this.setState({theNewArr:newOddsJson})
                  //newOddsJson
                  this.getLogos2(newOddsJson,menu,incomingData)
                  //console.log('new array laaast',newOddsJson)
                }
            }
        })
    })
  } catch (error) {
    //console.log('ERROR OCURRED AT SORTING ODDS', error)
  }
  }*/
  doNothing = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  inputChange = async (e, index, type) => {
    this.setState({ isItSubmit: false })
    var value = e.target.value
    //console.log('theId', e.target.id)
    if (type === 'week1Round') {
      week1RoundEdit[index][e.target.id] = value
      week1RoundEdit[index]['player1'] = 'N/A'
      week1RoundEdit[index]['player2'] = 'N/A'
      week1RoundEdit[index]['p1Photo'] = 'N/A'
      week1RoundEdit[index]['p2Photo'] = 'N/A'
      await this.setState({ week1RoundEdit })
      localStorage.set('week1RoundEdit', JSON.stringify(this.state.week1RoundEdit))
      localStorage.set('week1RoundEditTime', new Date().getTime())
      //console.log("week1RoundEdit", week1RoundEdit)
    }
    if (type === 'week2Round') {
      week2RoundEdit[index][e.target.id] = value
      week2RoundEdit[index]['player1'] = 'N/A'
      week2RoundEdit[index]['player2'] = 'N/A'
      week2RoundEdit[index]['p1Photo'] = 'N/A'
      week2RoundEdit[index]['p2Photo'] = 'N/A'
      await this.setState({ week2RoundEdit })
      localStorage.set('week2RoundEdit', JSON.stringify(this.state.week2RoundEdit))
      localStorage.set('week2RoundEditTime', new Date().getTime())
      //console.log("week2RoundEdit", week2RoundEdit)
    }
    if (type === 'week3Round') {
      week3RoundEdit[index][e.target.id] = value
      week3RoundEdit[index]['player1'] = 'N/A'
      week3RoundEdit[index]['player2'] = 'N/A'
      week3RoundEdit[index]['p1Photo'] = 'N/A'
      week3RoundEdit[index]['p2Photo'] = 'N/A'
      await this.setState({ week3RoundEdit })
      localStorage.set('week3RoundEdit', JSON.stringify(this.state.week3RoundEdit))
      localStorage.set('week3RoundEditTime', new Date().getTime())
      //console.log("week3RoundEdit", week3RoundEdit)
    }
    if (type === 'week4Round') {
      week4RoundEdit[index][e.target.id] = value
      week4RoundEdit[index]['player1'] = 'N/A'
      week4RoundEdit[index]['player2'] = 'N/A'
      week4RoundEdit[index]['p1Photo'] = 'N/A'
      week4RoundEdit[index]['p2Photo'] = 'N/A'
      await this.setState({ week4RoundEdit })
      localStorage.set('week4RoundEdit', JSON.stringify(this.state.week4RoundEdit))
      localStorage.set('week4RoundEditTime', new Date().getTime())
      //console.log("week4RoundEdit", week4RoundEdit)
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
  showProgressBar = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      5000)
  }
  showProgressBar2 = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      30000)
  }
  submitDetails = (theItems, theState) => {
    var yearNow = new Date().getFullYear()
    var i = 0, j = 0, k = 0, l = 0
    theItems.map((item, index) => {
      if (item.apiId === '') {
        theItems[index]['error'] = 'API ID field must be filled'
        this.setState({ theState: theItems })
        return
      } else {
        i++
        theItems[index]['error'] = ''
      }
      if (i === theItems.length) {
        this.setState({ [theState]: theItems })
        this.getOddsApiData(theItems, theState)
      }
    })
  }
  divisionalRoundSubmit = () => {
    var i = 0
    this.state.week2RoundEdit.map((item, index) => {
      if (item.apiId === '') {
        week2RoundEdit[index]['error'] = 'API ID field must be filled'
        this.setState({ week2RoundEdit })
        return
      } else {
        i++
        week2RoundEdit[index]['error'] = ''
        week2RoundEdit[index]['p1Points'] = 'N/A'
        week2RoundEdit[index]['p2Points'] = 'N/A'
      }
      if (i === 4) {
        this.setState({ week2RoundEdit })
        //console.log('week2RoundEdit',week2RoundEdit)
        this.getOddsApiData(week2RoundEdit)
      }
    })
  }

  cancelEdit = () => {
    week1RoundEdit = week1RoundEdit2, week2RoundEdit = week2RoundEdit2, week3RoundEdit = week3RoundEdit2, week4RoundEdit = week4RoundEdit2, superBowlEdit = superBowlEdit2
    this.setState({ week1RoundEdit: [], week2RoundEdit: [], week3RoundEdit: [], week4RoundEdit: [] }, () => {
      this.props.onClick('false', 'false')
    })
  }
  sendToDatabase = () => {
    if (this.state.isItSubmit) {
      this.sendToFirebaseSingle()
      //if(this.state.currentSelection==='wildCard'){this.sendToFirebase()}else{
      //this.sendToFirebaseSingle()
      //}
    } else {
      this.setState({ isItSubmit: false })
    }
  }
  sendToFirebaseSingle = async () => {
    this.showProgressBar2()
    var theArr = '', editTime = '', lastMatchTime
    var nowTime = new Date().getTime()
    if (this.state.currentSelection === 'week1Round') { theArr = this.state.week1RoundEdit, editTime = 'stopweek1RoundEdit', lastMatchTime = 'lastMatchWeek1Time' }
    if (this.state.currentSelection === 'week2Round') { theArr = this.state.week2RoundEdit, editTime = 'stopweek2RoundEdit', lastMatchTime = 'lastMatchWeek2Time' }
    if (this.state.currentSelection === 'week3Round') { theArr = this.state.week3RoundEdit, editTime = 'stopweek3RoundEdit', lastMatchTime = 'lastMatchWeek3Time' }
    if (this.state.currentSelection === 'week4Round') { theArr = this.state.week4RoundEdit, editTime = 'stopweek4RoundEdit', lastMatchTime = 'lastMatchWeek4Time' }
    var postTime = this.state.currentSelection + 'PostTime'
    //var postTime=this.state.currentSelection+'week1RoundPostTime'
    //console.log('at sendToFirebaseSingle',this.state.currentSelection,theArr)
    //return
    var i = 0
    theArr.map((item, index) => {
      if (item.apiId === '' || item.player1 === '' || item.player1 === 'N/A' || item.player2 === '' || item.p1Photo === '' || item.p1Photo === 'N/A' || item.p2Photo === '') {
        theArr[index]['error'] = 'Some field missing data'
        this.setState({ week2RoundEdit })
        return
      } else {
        i++
        theArr[index]['error'] = ''
      }
      if (i === theArr.length) {
        var minTime = Math.min(...theArr.map(item => item.timeInMillis));
        var maxTime = Math.max(...theArr.map(item => item.timeInMillis));
        var toDbArr = {}, v = 0
        var eventKey = this.props.theEventKey
        var generalDb = firebase.database().ref('/theEvents/')
        var eventIdsLink = '/eventsIds/' + eventKey + '/'
        var eventIdsLink2 = '/NFLRegular/eventsIds/' + eventKey + '/'
        var dataLink = '/NFLRegular/' + eventKey + '/' + this.state.currentSelection//1737147600000
        //console.log('combined items',theArr.length, theArr)//1737235800000
        var eventIdsEdit = {
          [editTime]: minTime, [lastMatchTime]: maxTime, currentSelection: this.state.currentSelection, oddsTimeUpdate: nowTime, [postTime]: nowTime
        }
        theArr.map((item, index) => {
          v++
          theArr[index]['error'] = null
          //console.log('matchType',item.matchType)
          toDbArr[item.id] = item
          if (theArr.length === v) {
            console.log('dataLink', dataLink)
            console.log('toDbArr', toDbArr)
            console.log('eventIdsEdit', eventIdsEdit)
           // return
            generalDb.child(eventIdsLink).update(eventIdsEdit)
            generalDb.child(eventIdsLink2).update(eventIdsEdit)
            generalDb.child(dataLink).update(toDbArr, (error) => {
              if (error) {
                this.notify('An error occured while uploading data')
                this.setState({ showProgressBar: false })
              } else {
                this.editDatabase(dataLink)


              }
            })
          }
        })
      }
    })
  }
  editDatabase = async (dataLink) => {
    var editDb = firebase.database().ref('/theEvents/' + dataLink + '/')
    await editDb.once('value', dataSnapshot => {
      var gamesCount = dataSnapshot.numChildren()
      var i = 0
      dataSnapshot.forEach((data) => {
        i++
        var theId = data.key
        var player1 = data.val().player1
        console.log('player1', theId, player1)
        if (player1 === 'N/A') {
          editDb.child(theId).set(null)
          console.log('this is nullllll',theId)
        }
        if (i === gamesCount) {
          this.notify('Data uploaded successfully')
          this.setState({ showProgressBar: false })
          this.props.onClick('Success')
        }
      })
    })
  }
  sendToFirebase = async () => {
    this.showProgressBar()
    //console.log('at sendToFirebase',this.state.currentSelection)
    //todo finish here and odds update on onclick
    return
    if (this.state.currentSelection === 'wildCard') { }
    if (this.state.currentSelection === 'divisionalRound') { }
    if (this.state.currentSelection === 'conferenceChampionship') { }
    if (this.state.currentSelection === 'superBowl') { }
    var wCMin = Math.min(...this.state.week1RoundEdit.map(item => item.timeInMillis));
    var dRMin = Math.min(...this.state.week2RoundEdit.map(item => item.timeInMillis));
    var cCMin = Math.min(...this.state.week3RoundEdit.map(item => item.timeInMillis));
    var sPMin = Math.min(...this.state.superBowlEdit.map(item => item.timeInMillis));
    var endTime = Math.max(...this.state.superBowlEdit.map(item => item.timeInMillis));
    var allItems = [...this.state.week1RoundEdit, ...this.state.week2RoundEdit, ...this.state.week3RoundEdit, ...this.state.superBowlEdit]
    var toDbWildCardArr = {}, toDbDivisionalRound = {}, toDbConferenceChampionshipArr = {}, toDbSuperBowlArr = {}, v = 0
    var v = 0
    var eventKey = 'NFLPlayoffs-' + new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents/NFL/' + eventKey + '/')
    var eventsIdDb = firebase.database().ref('/theEvents/')
    //console.log('combined items',allItems.length, allItems)
    allItems.map((item, index) => {
      v++
      if (item.p1Photo === '') { allItems[index]['p1Photo'] = 'N/A' }
      if (item.p2Photo === '') { allItems[index]['p2Photo'] = 'N/A' }
      if (item.p1Points === '') { allItems[index]['p1Points'] = 'N/A' }
      if (item.p2Points === '') { allItems[index]['p2Points'] = 'N/A' }
      if (item.player1 === '') { allItems[index]['player1'] = 'N/A' }
      if (item.player2 === '') { allItems[index]['player2'] = 'N/A' }
      if (item.player1 === '') { allItems[index]['player1NickName'] = 'N/A' }
      if (item.player2 === '') { allItems[index]['player2NickName'] = 'N/A' }
      //console.log('matchType',item.matchType)
      if (item.matchType === 'NFL Wild Card Round') {
        toDbWildCardArr[item.id] = item
      }
      if (item.matchType === 'NFL Divisional Round') {
        toDbDivisionalRound[item.id] = item
      }
      if (item.matchType === 'NFL Conference Championship') {
        toDbConferenceChampionshipArr[item.id] = item
      }
      if (item.matchType === 'NFL Super Bowl') {
        toDbSuperBowlArr[item.id] = item
      }
      if (allItems.length === v) {
        var theArr = {
          time: wCMin, sportType: 'NFL', endTime: '',
          title: 'NFL PLAYOFFS 2025', currentSelection: this.state.currentSelection,
          stopweek1RoundEdit: wCMin, stopweek2RoundEdit: dRMin, endTime: endTime,
          stopweek3RoundEdit: cCMin, stopSuperBowlEdit: sPMin, startTime: wCMin
        }
        eventsIdDb.child('eventsIds/' + eventKey + '/').update(theArr)
        eventsIdDb.child('/NFL/eventsIds/' + eventKey + '/').update(theArr)
        generalDb.child('wildCard').update(toDbWildCardArr)
        generalDb.child('divisionalRound').update(toDbDivisionalRound)
        generalDb.child('conferenceChampionship').update(toDbConferenceChampionshipArr)
        generalDb.child('superBowl').update(toDbSuperBowlArr, (error) => {
          if (error) {
            this.notify('An error occured while uploading data')
            this.setState({ showProgressBar: false })
          } else {
            this.notify('Data uploaded successfully')
            this.setState({ showProgressBar: false })
            var oddsServerLink = 'theEvents::NFL::' + eventKey + '::' + this.state.currentSelection + '::stopweek1RoundEdit'
            this.props.onClick('getOdds', oddsServerLink)
          }
        })
      }
    })
  }
  submitMatches = () => {
    this.showProgressBar2()
    if (this.state.currentSelection === 'week1Round') { this.submitDetails(this.state.week1RoundEdit, 'week1RoundEdit') }
    if (this.state.currentSelection === 'week2Round') { this.submitDetails(this.state.week2RoundEdit, 'week2RoundEdit') }
    if (this.state.currentSelection === 'week3Round') { this.submitDetails(this.state.week3RoundEdit, 'week3RoundEdit') }
    if (this.state.currentSelection === 'week4Round') { this.submitDetails(this.state.week4RoundEdit, 'week4RoundEdit') }

  }
  getOddsApiData = async (theArr, stateEdit) => {
    //e9588a5ac96d554bb82f408b998e0617 368a2a41d5755a2105d864570b332d20
    //cee48e2a2178b941b7812630706a9f78 5646efe9a934b4789e8ef316a1de1ac8
    var oddsApi = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    const response = await axios.get(oddsApi)
    var theOddsJson = response.data
    //TO BE CONTINUED CHECK FOR NAME DATABASE AND ODDS API
    var firstMatchTime = []
    //var theOddsJson=theNFLOdds
    try {
      //console.log('theOddsJson',theOddsJson)
      var jCount = 0
      theOddsJson.map((item1, index) => {
        var i = 0, newOddsJson = []
        jCount++
        item1.bookmakers.map((item2) => {
          i++
          var draftkingsMarket = []
          if (item2.key === 'draftkings') {

            draftkingsMarket = item2.markets
            ////console.log('draftkings markets',item2.markets)
            ////console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
            draftkingsMarket.map((item3) => {
              ////console.log('draftkingsMarket 006',item3.outcomes)
              const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
              theOddsJson[index].draftkingsOdds = obj
            })
          }

          if (item1.bookmakers.length === i) {
            ////console.log('new array',theOddsJson)

            var m = 0
            theOddsJson.map((item12, index) => {
              m++
              ////console.log('item12.draftkingsOdds',item12.draftkingsOdds)
              var awayPoints = 0, homePoints = 0
              if (item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0) {
                ////console.log('shit is undefined')
              } else {
                var homeFighterName = item12.home_team
                var awayFighterName = item12.away_team
                awayPoints = item12.draftkingsOdds[awayFighterName]
                homePoints = item12.draftkingsOdds[homeFighterName]
              }

              var hTPointsNum = Number(theRamOdds[homePoints])
              var aTPointsNum = Number(theRamOdds[awayPoints])
              if (homePoints < -10000) { hTPointsNum = 1.01 }
              if (awayPoints < -10000) { aTPointsNum = 1.01 }
              if (homePoints > 12620) { hTPointsNum = 1247.20 }
              if (awayPoints > 12620) { aTPointsNum = 1247.20 }

              if (homePoints <= 101 && homePoints >= -101) { hTPointsNum = 2.03 }
              if (awayPoints <= 101 && awayPoints >= -101) { aTPointsNum = 2.03 }


              //console.log(item1.id,'hTPointsNum',hTPointsNum,'aTPointsNum',aTPointsNum)

              var matchTime = new Date(item12.commence_time);
              var newItem = {
                player2: item12.away_team, player1: item12.home_team, apiId: item12.id, commenceTime: item12.commence_time, timeInMillis: matchTime.getTime(),
                p2Points: aTPointsNum, p1Points: hTPointsNum, id: item12.id
              }

              newOddsJson.push(newItem)
            })
            if (m === theOddsJson.length) {
              //this.setState({theNewArr:newOddsJson})
              //console.log('new array laaast',newOddsJson)
              theArr.map((item, index) => {
                newOddsJson.map((item2) => {

                  if (item.apiId === item2.apiId) {
                    // firstMatchTime.push(item2.timeInMillis)
                    theArr[index]['player1'] = item2.player1
                    theArr[index]['player2'] = item2.player2

                    theArr[index]['p1Points'] = item2.p1Points
                    theArr[index]['p2Points'] = item2.p2Points
                    var theTime = dayjs(item2.timeInMillis).format('MMM D, YYYY h:mm A')
                    theArr[index]['commenceTime'] = theTime
                    theArr[index]['timeInMillis'] = item2.timeInMillis
                    theArr[index]['time'] = item2.timeInMillis
                  }
                })
                if (theArr.length === index + 1) {
                  //var firstTime =  Math.min(...firstMatchTime.map(item => item));
                  this.getLogos(theArr)
                  this.setState({ [stateEdit]: theArr })
                  //console.log('malizaaaaa 000024',theArr)
                }
              })

            }
          }
        })
      })
    } catch (error) {
      //console.log('ERROR OCURRED AT SORTING ODDS', error)
    }
  }
  getOddsApiData2 = async (theArr) => {
    //this.getLogos()
    //return
    //var oddsApi = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    var oddsApi = theNFLOdds
    var resultsArr = theNFLOdds
    theArr.map((item, index) => {
      resultsArr.map((item2) => {
        if (item.apiId === item2.id) {
          var time = item2.commence_time
          var timeInMillis = new Date(time).getTime()
          var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
          theArr[index]['player1'] = item2.home_team
          theArr[index]['player2'] = item2.away_team
          theArr[index]['commenceTime'] = theTime
          //console.log('at getOddsApiData sawaaaaaaaa 222222')
          theArr[index]['time'] = time
          theArr[index]['timeInMillis'] = timeInMillis
          /* item2.bookmakers.map((item2)=>{
            if(item2.key==='draftkings'){
              var draftkingsMarket=item2.markets
              var i=0
              draftkingsMarket.map((item3)=>{
                i++
                if(item3.outcomes[i]['name']===item2.home_team){
                  week1RoundEdit[index]['p1Points']=item3.outcomes[i]['name']
                }
                if(item3.outcomes[i]['name']===item2.away_team){
                  week1RoundEdit[index]['p1Points']=item3.outcomes[i]['name']
                }
                //console.log('draftkingsMarket 006 name',item3.outcomes[i]['name'])
                //console.log('draftkingsMarket 006 price',item3.outcomes[i]['price'])
                
               const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
                // week1RoundEdit[index].draftkingsOdds=obj
                //console.log('draftkingsMarket obj',obj)
                //console.log('draftkingsMarket week1RoundEdit',week1RoundEdit)
            })
            }
          })*/
          //console.log('the Item', item2)
          if (index + 1 === theArr.length) {
            this.getLogos(theArr)
            //console.log('the theArr', theArr)
          }


        }
      })
    })
    return
    // const response = await axios.get(oddsApi)
    //var theOddsJson=response.data
    //sortOddsJson(theOddsJson)

    //https://api.sportsdata.io/v3/cbb/scores/json/GamesByDateFinal/21-MAY-25?key=4a474f7d13314c6098a394987bed453f
    axios.get(oddsApi)
      .then((res) => {
        var resultsArr = res.data
        theArr.map((item, index) => {
          resultsArr.map((item2) => {
            if (item.apiId === item2.id) {
              var time = item2.commence_time
              var timeInMillis = new Date(time).getTime()
              var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
              theArr[index]['player1'] = item2.home_team
              theArr[index]['player2'] = item2.away_team
              theArr[index]['commenceTime'] = theTime
              //console.log('at getOddsApiData sawaaaaaaaa 222222')
              theArr[index]['time'] = time
              theArr[index]['timeInMillis'] = timeInMillis
              /* item2.bookmakers.map((item2)=>{
                 if(item2.key==='draftkings'){
                   var draftkingsMarket=item2.markets
                   var i=0
                   draftkingsMarket.map((item3)=>{
                     i++
                     if(item3.outcomes[i]['name']===item2.home_team){
                       week1RoundEdit[index]['p1Points']=item3.outcomes[i]['name']
                     }
                     if(item3.outcomes[i]['name']===item2.away_team){
                       week1RoundEdit[index]['p1Points']=item3.outcomes[i]['name']
                     }
                     //console.log('draftkingsMarket 006 name',item3.outcomes[i]['name'])
                     //console.log('draftkingsMarket 006 price',item3.outcomes[i]['price'])
                     
                    const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
                     // week1RoundEdit[index].draftkingsOdds=obj
                     //console.log('draftkingsMarket obj',obj)
                     //console.log('draftkingsMarket week1RoundEdit',week1RoundEdit)
                 })
                 }
               })*/
              //console.log('the Item', item2)
              if (index + 1 === theArr.length) {
                this.getLogos(theArr)
                //console.log('the theArr', theArr)
              }


            }
          })
        })

      })
  }
  getLogos = async (theArr) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    ////console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        //console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            ////console.log('the teams',theItem)
            ////console.log('the team name',theItem['displayName'])
            // //console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              //console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // //console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    //console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    //console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              //console.log('theArr 22222222 kufinish', theArr)
              if (this.state.currentSelection === 'week1Round') { this.setState({ week1RoundEdit: theArr, isItSubmit: true }) }
              if (this.state.currentSelection === 'week2Round') { this.setState({ week2RoundEdit: theArr, isItSubmit: true }) }
              if (this.state.currentSelection === 'week3Round') { this.setState({ week3RoundEdit: theArr, isItSubmit: true }) }
              if (this.state.currentSelection === 'week4Round') { this.setState({ week4RoundEdit: theArr, isItSubmit: true }) }
              this.setState({ showProgressBar: false })
              //if (this.state.currentSelection==='superBowl') {this.setState({superBowlEdit:theArr,isItSubmit:true})}
              //this.sendToFirebase()
            }
          })

        })

      })
  }
  getLogos2 = async (theArr, menu, incomingData) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    ////console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        //console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            ////console.log('the teams',theItem)
            ////console.log('the team name',theItem['displayName'])
            // //console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              //console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // //console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    //console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    //console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              theArr.map((item, index) => {
                incomingData[index]['player2'] = item.player2
                incomingData[index]['player1'] = item.player1
                incomingData[index]['apiId'] = item.apiId
                incomingData[index]['p2Points'] = item.p2Points
                incomingData[index]['p1Points'] = item.p1Points
                incomingData[index]['p2Photo'] = item.p2Photo
                incomingData[index]['player2NickName'] = item.player2NickName
                incomingData[index]['p1Photo'] = item.p1Photo
                incomingData[index]['player1NickName'] = item.player1NickName

                incomingData[index]['timeInMillis'] = item.timeInMillis
                incomingData[index]['commenceTime'] = item.commenceTime
                incomingData[index]['time'] = item.commenceTime.slice(0, 16)
                if (theArr.length === index + 1) {
                  //console.log('this.state.currentSelection',this.state.currentSelection)
                  //console.log('theArr 22222222 kufinish', theArr)
                  //console.log('theArr 22222222 incomingData', incomingData)
                  if (this.state.currentSelection === 'divisionalRound') { this.setState({ week2RoundEdit: incomingData, isItSubmit: true }) }
                  if (this.state.currentSelection === 'conferenceChampionship') { this.setState({ week3RoundEdit: incomingData, isItSubmit: true }) }
                  if (this.state.currentSelection === 'superBowl') { this.setState({ superBowlEdit: incomingData, isItSubmit: true }) }
                  this.setState({ showProgressBar: false })
                }
              })


              return

              //this.sendToFirebase()
            }
          })

        })

      })
  }
  itemComponent = (compItems, type, title) => {
    //console.log('compItems',compItems)
    return (
      compItems.map((item, index) => {
        return (
          <div className={styles.listDiv} key={index}>
            <div className={styles.theCont0}>
              <div className={styles.theCont01}>
                <p>{'Match ' + (index + 1)}</p>
                <p>{item.commenceTime}</p>
              </div>
              <div className={styles.theCont}>
                <div className={styles.theContLeft}>
                  <div className={styles.imgDiv1}>
                    {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>

                  <input className={styles.P1} id='apiId' value={item.apiId} placeholder='Enter uid from odds api' onChange={(event) => this.inputChange(event, index, type)} readOnly={this.state.isItSubmit ? true : false} />
                  <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter team 1 Logo' readOnly />
                  <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' readOnly />
                  {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                </div>
                <BsFillLightningFill className={styles.sepIc} />
                <div className={styles.theContRight}>
                  <div className={styles.imgDiv2}>
                    {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  <input className={styles.P1} value={item.commenceTime} placeholder='N/A' readOnly />
                  <input className={styles.P2} id='p2Photo' value={item.p2Photo} placeholder='Enter team 2 logo' readOnly />
                  <input className={styles.P2} id='player2' value={item.player2} placeholder='Enter team 2 name' readOnly />
                  {/*<input className={styles.P2} id='p2Rec' value={item.p2Rec} placeholder='Enter team 2 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                </div>
              </div>
              <p className={styles.errorP}>{item.error}</p>
            </div>

          </div>
        )
      })
    )
  }
  render() {
    var theRound = this.props.eventToNFLModal
    return (
      <><div className={styles.container2} onClick={(event) => this.doNothing(event)}>

        <p className={styles.headP}>Enter NFL Regular Match Details</p>
        {this.state.currentSelection === 'week1Round' ? <div className={styles.divCont}>
          <p className={styles.listHeadP}>{this.props.nflModalTitle}</p>
          <div className={styles.listCont}>{this.itemComponent(week1RoundEdit, 'week1Round', 'Week 1')}</div></div> : null}
        {this.state.currentSelection === 'week2Round' ?
          <div className={styles.divCont}>
            <p className={styles.listHeadP}>{this.props.nflModalTitle}</p>
            <div className={styles.listCont}>{this.itemComponent(week2RoundEdit, 'week2Round', 'Week 2')}</div></div> : null}
        {this.state.currentSelection === 'week3Round' ?
          <div className={styles.divCont}>
            <p className={styles.listHeadP}>{this.props.nflModalTitle}</p>
            <div className={styles.listCont}>{this.itemComponent(week3RoundEdit, 'week3Round', 'Week 3')}</div></div> : null}
        {this.state.currentSelection === 'week4Round' ?
          <div className={styles.divCont}>
            <p className={styles.listHeadP}>{this.props.nflModalTitle}</p>
            <div className={styles.listCont}>{this.itemComponent(week4RoundEdit, 'week4Round', 'Week 4')}</div></div> : null}

        {this.state.isItSubmit ? <div className={styles.submitDiv}>
          <button className={styles.cancelBtn} onClick={() => this.cancelEdit()}>Cancel</button>
          <button className={styles.submitBtn2} onClick={() => this.sendToDatabase()}>Submit</button>
        </div> : <button className={styles.submitBtn} onClick={() => this.submitMatches()}>Preview</button>}
        {/*<p className={styles.clearP} onClick={()=>this.clearForm()}>Clear Form</p> REACHED HERE*/}
      </div>
        {this.state.showProgressBar ? <ProgressBar /> : null}
        <ToastContainer />
      </>
    )
  }
}

export default NCAAModal