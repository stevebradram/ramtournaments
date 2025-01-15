import React, { Component } from 'react'
import styles from "./NFLModal.module.scss";
import { BsFillLightningFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import ProgressBar from '../Helper/ProgressBar'
import axios from "axios"
import dayjs from 'dayjs';
var theImage1 = 'https://images.pexels.com/photos/17650220/pexels-photo-17650220/free-photo-of-can-of-sprite-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=600'
var theImage2 = 'https://images.pexels.com/photos/19882427/pexels-photo-19882427/free-photo-of-elevate-your-style-with-vibrant-kicks-explore-a-spectrum-of-colors-in-our-sneaker-collection-step-into-bold-hues-and-showcase-your-unique-footwear-fashion.jpeg?auto=compress&cs=tinysrgb&w=600'
var wildCardEdit3 = [
  { id: 'wildCardMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch2', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch3', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch4', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch5', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch6', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
]
var divisionalRoundEdit3 = [
  { id: 'divisionalRoundMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' },
  { id: 'divisionalRoundMatch2', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' },
  { id: 'divisionalRoundMatch3', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' },
  { id: 'divisionalRoundMatch4', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' }
]
var conferenceChampionshipEdit3 = [
  { id: 'conferenceChampionshipMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Conference Championship' },
  { id: 'conferenceChampionshipMatch2', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Conference Championship' },
]
var superBowlEdit3 = [
  { id: 'superBowlMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Super Bowl' }
]
var wildCardEdit=[],divisionalRoundEdit=[],conferenceChampionshipEdit=[],superBowlEdit=[]

var wildCardEdit2=wildCardEdit3,divisionalRoundEdit2=divisionalRoundEdit3,conferenceChampionshipEdit2=conferenceChampionshipEdit3,superBowlEdit2=superBowlEdit3
class NCAAModal extends Component {
  state = { wildCardEdit: wildCardEdit, divisionalRoundEdit: divisionalRoundEdit3, conferenceChampionshipEdit: conferenceChampionshipEdit3, superBowlEdit: superBowlEdit3, submitErr: "", showProgressBar: false, currentSelection:this.props.eventToNFLModal,isItSubmit:false}
  
  componentDidMount=()=>{
    var incomingData=this.props.itemsToNFLModal
    console.log('incomingData',this.state.currentSelection,incomingData)
    if(incomingData.length>1){
      wildCardEdit=[],divisionalRoundEdit=[],conferenceChampionshipEdit=[],superBowlEdit=[]
      if(this.state.currentSelection==='wildCard'){
        var i=0
        incomingData.map((item,index)=>{
          i++
      if(item.p1Photo==='N/A'){incomingData[index]['p1Photo']=''}
      if(item.p2Photo==='N/A'){incomingData[index]['p2Photo']=''}
      if(item.p1Points==='N/A'){incomingData[index]['p1Points']=''}
      if(item.p2Points==='N/A'){incomingData[index]['p2Points']=''}
      if(item.player1==='N/A'){incomingData[index]['player1']=''}
      if(item.player2==='N/A'){incomingData[index]['player2']=''}
        if(item.matchType==="NFL Wild Card Round"){wildCardEdit.push(item)}
        if(item.matchType==="NFL Divisional Round"){divisionalRoundEdit.push(item)}
        if(item.matchType==="NFL Conference Championship"){conferenceChampionshipEdit.push(item)}
        if(item.matchType==="NFL Super Bowl"){superBowlEdit.push(item)}
        if(incomingData.length===i){
        this.setState({wildCardEdit,divisionalRoundEdit,conferenceChampionshipEdit,superBowlEdit})  
        }
        })
      }
    if(this.state.currentSelection==='divisionalRound'){divisionalRoundEdit=incomingData,this.setState({divisionalRoundEdit})}
    if(this.state.currentSelection==='conferenceChampionship'){conferenceChampionshipEdit=incomingData,this.setState({conferenceChampionshipEdit})}
    if(this.state.currentSelection==='superBowl'){superBowlEdit=incomingData,this.setState({superBowlEdit})}}
    else{
      console.log('kasaluo')
      if(this.state.currentSelection==='wildCard'){
        wildCardEdit=wildCardEdit3
        divisionalRoundEdit=divisionalRoundEdit3
        conferenceChampionshipEdit=conferenceChampionshipEdit3
        superBowlEdit=superBowlEdit3
      }
      if(this.state.currentSelection==='divisionalRound'){divisionalRoundEdit=divisionalRoundEdit3}
      if(this.state.currentSelection==='conferenceChampionship'){conferenceChampionshipEdit=conferenceChampionshipEdit3}
      if(this.state.currentSelection==='superBowl'){superBowlEdit=superBowlEdit3}
    }
   
    console.log('incomingData',this.state.currentSelection,'divisionalRoundEdit',divisionalRoundEdit,'the length',incomingData.length)
  }
  doNothing = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  inputChange = async (e, index, type) => {
    this.setState({isItSubmit:false})
    var value = e.target.value
    console.log('theId', e.target.id)
    if (type === 'wildCard') {
      wildCardEdit[index][e.target.id] = value
      await this.setState({ wildCardEdit })
      console.log("wildCardEdit", wildCardEdit)
    }
    if (type === 'divisionalRound') {
      divisionalRoundEdit[index][e.target.id] = value
      await this.setState({ divisionalRoundEdit })
      console.log("divisionalRoundEdit", divisionalRoundEdit)
    }
    if (type === 'conferenceChampionship') {
      conferenceChampionshipEdit[index][e.target.id] = value
      await this.setState({ conferenceChampionshipEdit })
      console.log("conferenceChampionshipEdit", conferenceChampionshipEdit)
    }
    if (type === 'superBowl') {
      superBowlEdit[index][e.target.id] = value
      await this.setState({ superBowlEdit })
      console.log("superBowlEdit", superBowlEdit)
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
  wildCardSubmit = () => {
    var yearNow = new Date().getFullYear()
    var i = 0, j = 0, k = 0, l = 0
      this.state.wildCardEdit.map((item, index) => {
        if (item.apiId === '') {
          wildCardEdit[index]['error'] = 'API ID field must be filled'
          this.setState({ wildCardEdit })
          return
        } else {
          i++
          wildCardEdit[index]['error'] = ''
        }
        if (i === 6) {
          this.setState({ wildCardEdit })
          console.log('divisionalRoundEdit', this.state.divisionalRoundEdit)
          this.state.divisionalRoundEdit.map((item, index) => {
            if (item.time === '') {
              divisionalRoundEdit[index]['error'] = 'Match time field must be filled'
              this.setState({ divisionalRoundEdit })
              return
            } else {
              var theYear = item.time.split('-')[0]
              if (Number(theYear) - yearNow > 5 || Number(theYear) < yearNow) {
                divisionalRoundEdit[index]['error'] = 'Year field badly formatted'
                this.setState({ divisionalRoundEdit })
                return
              } else {
                j++
                var timeInMillis = new Date(item.time).getTime()
                var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
                divisionalRoundEdit[index]['commenceTime'] = theTime
                divisionalRoundEdit[index]['timeInMillis'] = timeInMillis
                divisionalRoundEdit[index]['error'] = ''
              }
            }
            if (j === 4) {
              this.setState({ divisionalRoundEdit })
              this.state.conferenceChampionshipEdit.map((item, index) => {
                if (item.time === '') {
                  conferenceChampionshipEdit[index]['error'] = 'Match time field must be filled'
                  this.setState({ conferenceChampionshipEdit })
                  return
                } else {
                  var theYear = item.time.split('-')[0]
                  if (Number(theYear) - yearNow > 5 || Number(theYear) < yearNow) {
                    conferenceChampionshipEdit[index]['error'] = 'Year field badly formatted'
                    this.setState({ conferenceChampionshipEdit })
                    return
                  } else {
                    k++
                    var timeInMillis = new Date(item.time).getTime()
                    var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
                    conferenceChampionshipEdit[index]['commenceTime'] = theTime
                    conferenceChampionshipEdit[index]['timeInMillis'] = timeInMillis
                    conferenceChampionshipEdit[index]['error'] = ''

                  }
                }
                if (k === 2) {
                  this.setState({ conferenceChampionshipEdit })
                  this.state.superBowlEdit.map((item, index) => {
                    if (item.time === '') {
                      superBowlEdit[index]['error'] = 'Match time field must be filled'
                      this.setState({ superBowlEdit })
                      return
                    } else {
                      if (Number(theYear) - yearNow > 5 || Number(theYear) < yearNow) {
                        superBowlEdit[index]['error'] = 'Year field badly formatted'
                        this.setState({ superBowlEdit })
                        return
                      } else {
                        l++
                        var timeInMillis = new Date(item.time).getTime()
                        var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
                        superBowlEdit[index]['commenceTime'] = theTime
                        superBowlEdit[index]['timeInMillis'] = timeInMillis
                        superBowlEdit[index]['error'] = ''
                      }
                    }
                    if (l === 1) {
                      this.setState({superBowlEdit})
                      this.getOddsApiData(wildCardEdit)
                      console.log('nimemalizaaaaaaaaaaaaaa rankadaaaaaaa')
                      console.log('wildCardEdit', this.state.wildCardEdit)
                      console.log('divisionalRoundEdit', this.state.divisionalRoundEdit)
                      console.log('conferenceChampionshipEdit', this.state.conferenceChampionshipEdit)
                      console.log('superBowlEdit', this.state.superBowlEdit)
                    }
                  })
                }
              })
            }
          })
        }
      })
  }
  divisionalRoundSubmit = () => {
    var i = 0
    this.state.divisionalRoundEdit.map((item, index) => {
      if (item.apiId === '') {
        divisionalRoundEdit[index]['error'] = 'API ID field must be filled'
        this.setState({ divisionalRoundEdit })
        return
      } else {
        i++
        divisionalRoundEdit[index]['error'] = ''
        divisionalRoundEdit[index]['p1Points'] = 'N/A'
        divisionalRoundEdit[index]['p2Points'] = 'N/A'
      }
      if (i === 4) {
        this.setState({ divisionalRoundEdit})
        console.log('divisionalRoundEdit',divisionalRoundEdit)
       this.getOddsApiData(divisionalRoundEdit)
      }
    })
  }
  conferenceChampionshipSubmit = () => {
    var yearNow = new Date().getFullYear()
    var k = 0, l = 0
    this.state.conferenceChampionshipEdit.map((item, index) => {
      if (item.time === '') {
        conferenceChampionshipEdit[index]['error'] = 'Match time field must be filled'
        this.setState({ conferenceChampionshipEdit }) 
        return
      } else {
        var theYear = item.time.split('-')[0]
        if (Number(theYear) - yearNow > 5 || Number(theYear) < yearNow) {
          conferenceChampionshipEdit[index]['error'] = 'Year field badly formatted'
          this.setState({ conferenceChampionshipEdit })
          return
        } else {
          k++
          var timeInMillis = new Date(item.time).getTime()
          var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
          conferenceChampionshipEdit[index]['commenceTime'] = theTime
          conferenceChampionshipEdit[index]['timeInMillis'] = timeInMillis
          conferenceChampionshipEdit[index]['error'] = ''

        }
      }
      if (k === 2) {
        this.setState({ conferenceChampionshipEdit })
        this.state.superBowlEdit.map((item, index) => {
          if (item.time === '') {
            superBowlEdit[index]['error'] = 'Match time field must be filled'
            this.setState({ superBowlEdit })
            return
          } else {
            if (Number(theYear) - yearNow > 5 || Number(theYear) < yearNow) {
              superBowlEdit[index]['error'] = 'Year field badly formatted'
              this.setState({ superBowlEdit })
              return
            } else {
              l++
              var timeInMillis = new Date(item.time).getTime()
              var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
              superBowlEdit[index]['commenceTime'] = theTime
              superBowlEdit[index]['timeInMillis'] = timeInMillis
              superBowlEdit[index]['error'] = ''
            }
          }
          if (l === 1) {
            this.setState({ superBowlEdit })
            this.getOddsApiData(conferenceChampionshipEdit)
            console.log('conferenceChampionshipEdit', this.state.conferenceChampionshipEdit)
            console.log('superBowlEdit', this.state.superBowlEdit)
          }
        })
      }
    })
  }
  superBowlSubmit = () => {
    var yearNow = new Date().getFullYear()
    var l = 0

    this.state.superBowlEdit.map((item, index) => {
      if (item.time === '') {
        superBowlEdit[index]['error'] = 'Match time field must be filled'
        this.setState({ superBowlEdit })
        return
      } else {
        if (Number(theYear) - yearNow > 5 || Number(theYear) < yearNow) {
          superBowlEdit[index]['error'] = 'Year field badly formatted'
          this.setState({ superBowlEdit })
          return
        } else {
          l++
          var timeInMillis = new Date(item.time).getTime()
          var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
          superBowlEdit[index]['commenceTime'] = theTime
          superBowlEdit[index]['timeInMillis'] = timeInMillis
          superBowlEdit[index]['error'] = ''
        }
      }
      if (l === 1) {
        this.setState({ superBowlEdit })
        this.getOddsApiData(superBowlEdit)
        console.log('superBowlEdit', this.state.superBowlEdit)
      }
    })
  }
  cancelEdit=()=>{
    wildCardEdit=wildCardEdit2,divisionalRoundEdit=divisionalRoundEdit2,conferenceChampionshipEdit=conferenceChampionshipEdit2,superBowlEdit=superBowlEdit2
    this.setState({wildCardEdit:[],divisionalRoundEdit:[],conferenceChampionshipEdit:[],superBowlEdit:[]},()=>{
      this.props.onClick('false','false')
    })
  }
  sendToDatabase=()=>{
    if(this.state.isItSubmit){
    if(this.state.currentSelection==='wildCard'){this.sendToFirebase()}else{
      this.sendToFirebaseSingle()
    }}else{
      this.setState({isItSubmit:false})
    }
  }
  sendToFirebaseSingle=async(editTime,theSelection)=>{
    this.showProgressBar()
    var theArr='',editTime=''
    if(this.state.currentSelection==='divisionalRound'){theArr=this.state.divisionalRoundEdit,editTime='stopDivisionalRoundEdit'}
    if(this.state.currentSelection==='conferenceChampionship'){theArr=this.state.conferenceChampionshipEdit,editTime='stopConferenceChampionshipEdit'}
    if(this.state.currentSelection==='superBowl'){theArr=this.state.superBowlEdit,editTime='stopSuperBowlEdit'}
    console.log('at sendToFirebaseSingle',this.state.currentSelection,theArr)
    var i=0
    theArr.map((item, index) => {
      if (item.apiId === ''||item.player1 === ''||item.player2 === ''||item.p1Photo === ''||item.p2Photo === '') {
        theArr[index]['error'] = 'Some field missing data'
        this.setState({ divisionalRoundEdit })
        return
      } else {
        i++
        theArr[index]['error'] = ''
      }
      if (i===theArr.length) {    
       var minTime = Math.min(...theArr.map(item => item.timeInMillis));
       var toDbArr={},v = 0
       var eventKey = 'NFLPlayoffs-'+ new Date().getFullYear()
       var generalDb = firebase.database().ref('/theEvents/')
       var eventIdsLink ='/eventsIds/'+eventKey+'/'
       var eventIdsLink2 ='/NFL/eventsIds/'+eventKey+'/'
       var dataLink ='/NFL/'+eventKey+'/'+this.state.currentSelection//1737147600000
       console.log('combined items',theArr.length, theArr)//1737235800000
       var eventIdsEdit = {
      [editTime]:minTime,currentSelection:this.state.currentSelection}
       theArr.map((item,index) => {
         v++
         theArr[index]['error']=null
         console.log('matchType',item.matchType)
         toDbArr[item.id] = item
         if (theArr.length === v) {
           generalDb.child(eventIdsLink).update(eventIdsEdit)
           generalDb.child(eventIdsLink2).update(eventIdsEdit)
           generalDb.child(dataLink).update(toDbArr,(error) => {
            if (error) {
              this.notify('An error occured while uploading data')
              this.setState({ showProgressBar: false })
            } else {
              this.notify('Data uploaded successfully')
              this.setState({ showProgressBar: false })
              var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::'+editTime
              this.props.onClick('getOdds',oddsServerLink)
            }
          })
         }
       })
      }
    })
    
   

  }
  sendToFirebase=async()=>{
    this.showProgressBar()
    console.log('at sendToFirebase',this.state.currentSelection)
    //todo finish here and odds update on onclick
    return
    if(this.state.currentSelection==='wildCard'){}
    if(this.state.currentSelection==='divisionalRound'){}
    if(this.state.currentSelection==='conferenceChampionship'){}
    if(this.state.currentSelection==='superBowl'){}
    var wCMin = Math.min(...this.state.wildCardEdit.map(item => item.timeInMillis));
    var dRMin = Math.min(...this.state.divisionalRoundEdit.map(item => item.timeInMillis));
    var cCMin = Math.min(...this.state.conferenceChampionshipEdit.map(item => item.timeInMillis));
    var sPMin = Math.min(...this.state.superBowlEdit.map(item => item.timeInMillis));
    var endTime = Math.max(...this.state.superBowlEdit.map(item => item.timeInMillis));
    var allItems = [...this.state.wildCardEdit, ...this.state.divisionalRoundEdit,...this.state.conferenceChampionshipEdit,...this.state.superBowlEdit]
    var toDbWildCardArr={},toDbDivisionalRound={},toDbConferenceChampionshipArr={},toDbSuperBowlArr={},v = 0
    var v=0
    var eventKey = 'NFLPlayoffs-'+ new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents/NFL/' + eventKey + '/')
    var eventsIdDb = firebase.database().ref('/theEvents/')
    console.log('combined items',allItems.length, allItems)
    allItems.map((item,index) => {
      v++
      if(item.p1Photo===''){allItems[index]['p1Photo']='N/A'}
      if(item.p2Photo===''){allItems[index]['p2Photo']='N/A'}
      if(item.p1Points===''){allItems[index]['p1Points']='N/A'}
      if(item.p2Points===''){allItems[index]['p2Points']='N/A'}
      if(item.player1===''){allItems[index]['player1']='N/A'}
      if(item.player2===''){allItems[index]['player2']='N/A'}
      console.log('matchType',item.matchType)
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
          time:wCMin, sportType: 'NFL',endTime:'', 
          title: 'NFL PLAYOFFS 2025',currentSelection:this.state.currentSelection,
          stopWildCardEdit:wCMin,stopDivisionalRoundEdit:dRMin,endTime:endTime,
          stopConferenceChampionshipEdit:cCMin,stopSuperBowlEdit:sPMin,startTime:wCMin        
        }
        eventsIdDb.child('eventsIds/' + eventKey + '/').update(theArr)
        eventsIdDb.child('/NFL/eventsIds/' + eventKey + '/').update(theArr)
        generalDb.child('wildCard').update(toDbWildCardArr)
        generalDb.child('divisionalRound').update(toDbDivisionalRound)
        generalDb.child('conferenceChampionship').update(toDbConferenceChampionshipArr)
        generalDb.child('superBowl').update(toDbSuperBowlArr,(error) => {
          if (error) {
            this.notify('An error occured while uploading data')
            this.setState({ showProgressBar: false })
          } else {
            this.notify('Data uploaded successfully')
            this.setState({ showProgressBar: false })
            var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::stopWildCardEdit'
              this.props.onClick('getOdds',oddsServerLink)
          }
        })
      }
    })
  }
  submitMatches = () => {
    if(this.state.currentSelection==='wildCard'){this.wildCardSubmit()}
    if(this.state.currentSelection==='divisionalRound'){this.divisionalRoundSubmit()}
    if(this.state.currentSelection==='conferenceChampionship'){this.conferenceChampionshipSubmit()}
    if(this.state.currentSelection==='superBowl'){this.superBowlSubmit()}
  }
  getOddsApiData = async (theArr) => {
    //this.getLogos()
    //return
    var oddsApi = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    // const response = await axios.get(oddsApi)
    //var theOddsJson=response.data
    //sortOddsJson(theOddsJson)
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
              console.log('at getOddsApiData sawaaaaaaaa 222222')
              theArr[index]['time'] = time
              theArr[index]['timeInMillis'] = timeInMillis
              /* item2.bookmakers.map((item2)=>{
                 if(item2.key==='draftkings'){
                   var draftkingsMarket=item2.markets
                   var i=0
                   draftkingsMarket.map((item3)=>{
                     i++
                     if(item3.outcomes[i]['name']===item2.home_team){
                       wildCardEdit[index]['p1Points']=item3.outcomes[i]['name']
                     }
                     if(item3.outcomes[i]['name']===item2.away_team){
                       wildCardEdit[index]['p1Points']=item3.outcomes[i]['name']
                     }
                     console.log('draftkingsMarket 006 name',item3.outcomes[i]['name'])
                     console.log('draftkingsMarket 006 price',item3.outcomes[i]['price'])
                     
                    const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
                     // wildCardEdit[index].draftkingsOdds=obj
                     console.log('draftkingsMarket obj',obj)
                     console.log('draftkingsMarket wildCardEdit',wildCardEdit)
                 })
                 }
               })*/
              console.log('the Item', item2)
              if (index + 1 === theArr.length) {
                this.getLogos(theArr)
                console.log('the theArr', theArr)
              }


            }
          })
        })

      })
  }
  getLogos = async (theArr) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    //console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            //console.log('the teams',theItem)
            //console.log('the team name',theItem['displayName'])
            // console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              console.log('theArr 22222222', theArr)
              if (this.state.currentSelection==='wildCard') {this.setState({wildCardEdit:theArr,isItSubmit:true})}
              if (this.state.currentSelection==='divisionalRound') {this.setState({divisionalRoundEdit:theArr,isItSubmit:true})}
              if (this.state.currentSelection==='conferenceChampionship') {this.setState({conferenceChampionshipEdit:theArr,isItSubmit:true})}
              if (this.state.currentSelection==='superBowl') {this.setState({superBowlEdit:theArr,isItSubmit:true})}
              //this.sendToFirebase()
            }
          })

        })

      })
  }
  itemComponent = (compItems, type) => {
    return (
      compItems.map((item, index) => {
        return (
          <div className={styles.listDiv} key={index}>
            <div className={styles.theCont0}>
              <div className={styles.theCont01}>
                <p>{item.matchType}</p>
                <p>{item.time.commenceTime}</p>
              </div>
              <div className={styles.theCont}>
                <div className={styles.theContLeft}>
                  <div className={styles.imgDiv1}>
                    {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  <input className={styles.P1} id='apiId' value={item.apiId} readOnly={type===this.state.currentSelection?false:true} placeholder='Enter uid from odds api' onChange={(event) => this.inputChange(event, index, type)} />
                  <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter team 1 logo' onChange={(event) => this.inputChange(event, index, type)} />
                  <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' onChange={(event) => this.inputChange(event, index, type)} />
                  {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                </div>
                <BsFillLightningFill className={styles.sepIc} />
                <div className={styles.theContRight}>
                  <div className={styles.imgDiv2}>
                    {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  <input className={styles.P1} id='time' type='datetime-local' readOnly={type===this.state.currentSelection?true:false} value={item.time} placeholder='Enter match time' onChange={(event) => this.inputChange(event, index, type)} />
                  <input className={styles.P2} id='p2Photo' value={item.p2Photo} placeholder='Enter team 2 logo' onChange={(event) => this.inputChange(event, index, type)} />
                  <input className={styles.P2} id='player2' value={item.player2} placeholder='Enter team 2 name' onChange={(event) => this.inputChange(event, index, type)} />
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
    return (
      <><div className={styles.container2} onClick={(event) => this.doNothing(event)}>

        <p className={styles.headP}>Enter NFL Match Details</p>
        {this.state.currentSelection==='wildCard'?<div className={styles.divCont}>
          <p className={styles.listHeadP}>Wild Card</p>
          <div className={styles.listCont}>{this.itemComponent(wildCardEdit, 'wildCard')}</div></div>:null}
          {this.state.currentSelection==='wildCard'||this.state.currentSelection==='divisionalRound'?
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Divisional Round</p>
          <div className={styles.listCont}>{this.itemComponent(divisionalRoundEdit, 'divisionalRound')}</div></div>:null}
          {this.state.currentSelection==='wildCard'||this.state.currentSelection==='conferenceChampionship'? 
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Conference Championship</p>
          <div className={styles.listCont}>{this.itemComponent(conferenceChampionshipEdit, 'conferenceChampionship')}</div></div>:null}
          {this.state.currentSelection==='wildCard'||this.state.currentSelection==='superBowl'? 
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Super Bowl</p>
          <div className={styles.listCont}>{this.itemComponent(superBowlEdit, 'superBowl')}</div></div>:null}
        
        {this.state.isItSubmit?<div className={styles.submitDiv}>
        <button className={styles.cancelBtn} onClick={()=>this.cancelEdit()}>Cancel</button>
        <button className={styles.submitBtn2} onClick={() => this.sendToDatabase()}>Submit</button>
        </div>:<button className={styles.submitBtn} onClick={()=>this.submitMatches()}>Preview</button>}
      </div>
        {this.state.showProgressBar ? <ProgressBar /> : null}
        <ToastContainer />
      </>
    )
  }
}

export default NCAAModal