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
import theRamUfc from '../TheJSONS/ramUfc.json'
import { IoCheckboxOutline } from "react-icons/io5";
var wildCardEdit=[],divisionalRoundEdit=[],conferenceChampionshipEdit=[],superBowlEdit=[]
var matchesArr=[]
var wildCardEdit2=[],divisionalRoundEdit2=[],conferenceChampionshipEdit2=[],superBowlEdit2=[]
class NCAAModal extends Component {
  state = { wildCardEdit:[], divisionalRoundEdit:[], conferenceChampionshipEdit:[], superBowlEdit:[], submitErr: "", showProgressBar: false, currentSelection:this.props.eventToNFLModal,isItSubmit:false,
    eventStartTime:0,eventEndTime:'',theNewArr:[],firstTime:'',matchesArr:[],eventTitle:'',theEventId:'',
    mainCardArr:{},mainCardShortArr:{},prelimsArr:{},prelimsShortArr:{},earlyPrelimsArr:{},earlyPrelimsShortArr:{},firstMatchTime:'',lastMatchTime:''
  }
  
  componentDidMount=()=>{
    //var incomingData=[...this.props.itemsToNFLModal]
    var incomingData =this.props.theDetails//theRamUfc
    if(incomingData.length>0){
      incomingData = incomingData.map(item => JSON.parse(JSON.stringify(item)));
      var firstMatchTime =  Math.min(...incomingData.map(item => item.timeInMillis));
      var lastMatchTime =  Math.max(...incomingData.map(item => item.timeInMillis));
   
      console.log('incomingData 325698',this.props.title,this.props.theEventId,firstMatchTime,lastMatchTime,incomingData)
        var i=0
        incomingData.map((item,index)=>{
          i++
         incomingData[index]['bet']=''
        if(incomingData.length===i){
          this.setState({matchesArr,firstMatchTime,lastMatchTime})
          matchesArr=incomingData
          console.log('matchesArr ONCOMING',matchesArr)
        
        }
      })
  }
  }
   doNothing = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  inputChange = async (e, index) => {
    this.setState({isItSubmit:false})
    var value = e.target.value
    console.log('theId', e.target.id)
   
    matchesArr[index][e.target.id] = value
   // matchesArr[index]['player1'] = 'N/A'
   // matchesArr[index]['player2'] = 'N/A'
   // matchesArr[index]['p1Photo'] = 'N/A'
   // matchesArr[index]['p2Photo'] = 'N/A'
      await this.setState({ matchesArr })
      console.log("matchesArr", matchesArr)
    


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
  submitDetails = (theItems,theState) => {
    var yearNow = new Date().getFullYear()
    var i = 0, j = 0, k = 0, l = 0
    theItems.map((item, index) => {
        if (item.apiId === '') {
          theItems[index]['error'] = 'API ID field must be filled'
          this.setState({theState:theItems})
          return
        } else {
          i++
          theItems[index]['error'] = ''
        }
        if (i === theItems.length) {
          this.setState({[theState]:theItems })
          this.getOddsApiData(theItems,theState)
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
    console.log('this.state.mainCardArr',this.state.mainCardArr,JSON.stringify(this.state.mainCardArr).length)
    console.log('this.state.prelimsArr',this.state.prelimsArr,JSON.stringify(this.state.prelimsArr).length)
    console.log('this.state.earlyPrelimsArr',this.state.earlyPrelimsArr,JSON.stringify(this.state.earlyPrelimsArr).length)
    if(this.state.isItSubmit){
    var ufcMatchId=this.props.theEventId
     console.log('ufcMatchId',ufcMatchId)
    //return
    var eventTitle=this.props.title
    var startTime=dayjs(this.state.firstMatchTime).format('MMM D, YYYY h:mm A')
    var toTheEventsIds = {time:this.state.firstMatchTime, title:eventTitle, sportType:'ramUfc', endTime:this.state.lastMatchTime, getEventsTimeUpdate: new Date().getTime(),oddsTimeUpdate:new Date().getTime() }
    var matchDets = {startMillis:this.state.firstMatchTime,startTime:startTime,matchTitle:eventTitle,matchId:ufcMatchId,mainCard:true}
    var generalDb = firebase.database().ref('/theEvents/')
    var eventIds = generalDb.child('/eventsIds/' + ufcMatchId)
    var activeEventsDb = generalDb.child('/ramUfc/'  + ufcMatchId)
   
    //console.log('infoooo 111',ufcMatchId,eventTitle,this.state.firstMatchTime,startTime,this.state.lastMatchTime)
    //console.log('infoooo 222',toTheEventsIds,toTheEventsIds,matchDets)
     //mainCardShortArr prelimsShortArr earlyPrelimsShortArr
      if(JSON.stringify(this.state.mainCardArr).length>10){
        this.showProgressBar()
        console.log('main card ikoooooooo',this.state.mainCardArr.length,this.state.mainCardArr)
        //return
        activeEventsDb.child('mainCard').set(this.state.mainCardArr)
        activeEventsDb.child('mainCardShort').set(this.state.mainCardShortArr)
        activeEventsDb.child('matchDetails').update(matchDets)
        eventIds.set(toTheEventsIds)
        this.notify('Success uploading matches')
        this.timerHandle = setTimeout(
          () => {
            this.setState({showProgressBar:false})
            this.props.onClick()
          },
          2000)
      }
      //return
      if(JSON.stringify(this.state.prelimsArr).length>10){
        console.log('prelimsArr card ikoooooooo',this.state.prelimsArr.length,this.state.prelimsArr)
        activeEventsDb.child('prelims').set(this.state.prelimsArr)
        activeEventsDb.child('prelimsShort').set(this.state.prelimsShortArr)
        activeEventsDb.child('/matchDetails/prelims/').set(true)
      }
      if(JSON.stringify(this.state.earlyPrelimsArr).length>10){
        console.log('earlyPrelimsArr card ikoooooooo',this.state.earlyPrelimsArr.length,this.state.earlyPrelimsArr)
        activeEventsDb.child('earlyPrelims').set(this.state.earlyPrelimsArr)
        activeEventsDb.child('earlyPrelimsShort').set(this.state.earlyPrelimsShortArr)
        activeEventsDb.child('/matchDetails/earlyPrelims/').set(true)
      }
  }else{
      this.setState({isItSubmit:false})
    }
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
      if(item.player1===''){allItems[index]['player1NickName']='N/A'}
      if(item.player2===''){allItems[index]['player2NickName']='N/A'}
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
    var yearNow = new Date().getFullYear()
    var i = 0, j = 0, k = 0, l = 0
    var theItems=this.state.matchesArr
    var mainCardArr={},mainCardShortArr={},prelimsArr={},prelimsShortArr={},earlyPrelimsArr={},earlyPrelimsShortArr={}
    theItems.map((item, index) => {
        if (item.apiId === ''||item.p1Photo === ''||item.p2Photo === ''||item.fighter1Country === ''||item.fighter2Country === ''||item.type === '') {
          theItems[index]['error'] = 'Fighters Logo and Country field must be filled'
          this.setState({matchesArr:theItems})
          return
        } else {
          i++
          theItems[index]['error'] = ''
          if(item.type==='mainCard'){
            mainCardArr[item.id] = item
            var smallArr = { p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner, status1: item.status1 }
            mainCardShortArr[item.id] = smallArr
          }
          if(item.type==='prelims'){
            prelimsArr[item.id] = item
            var smallArr = { p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner, status1: item.status1 }
            prelimsShortArr[item.id] = smallArr
          }
          if(item.type==='earlyPrelims'){
            earlyPrelimsArr[item.id] = item
            var smallArr = { p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner, status1: item.status1 }
            earlyPrelimsShortArr[item.id] = smallArr
          }
        }
        if (i === theItems.length) {
          this.setState({matchesArr:theItems,isItSubmit:true})
          this.setState({mainCardArr,mainCardShortArr,prelimsArr,prelimsShortArr,earlyPrelimsArr,earlyPrelimsShortArr})
           console.log('to daaatabase 001',mainCardArr,mainCardShortArr)
           console.log('to daaatabase 002',prelimsArr,prelimsShortArr)
           console.log('to daaatabase 003',earlyPrelimsArr,earlyPrelimsShortArr)
           console.log('to daaatabase 004',theItems,this.state.matchesArr)
          //this.getOddsApiData(theItems,theState)
        }
      })
  }
    chooseType=(type,index)=>{
    matchesArr[index]['type']=type
    this.setState({matchesArr,isItSubmit:false})
    console.log('the chosen',matchesArr)
  }
  itemComponent = (compItems,title) => {
  //console.log('compItems',compItems)
    return (
      compItems.map((item, index) => {
        var theTime = dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={styles.listDiv} key={index}>
            <div className={styles.theCont0}>
              <div className={styles.theCont01}>
                <p>{title+' Match '+(index+1)}</p>
                <p>{theTime}</p>
              </div>
              <div className={styles.theCont}>
                <div className={styles.theContLeft}>
                  <div className={styles.imgDiv1} style={{backgroundColor:'whitesmoke'}}>
                    {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill  color='#ddd' className={styles.teamIC} />}
                  </div>
                  <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter fighter 1 Logo' onChange={(event) => this.inputChange(event, index)}/>
                  <input className={styles.P1} id='fighter1Country' value={item.fighter1Country}  placeholder='Enter fighter 1 country' onChange={(event) => this.inputChange(event, index)} />
                  <input className={styles.P2} id='fighter1Name' value={item.fighter1Name} placeholder='Enter team 1 name' readOnly/>
                  {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index)}/>*/}
                </div>
                <BsFillLightningFill className={styles.sepIc} />
                <div className={styles.theContRight}>
                  <div className={styles.imgDiv2} style={{backgroundColor:'whitesmoke'}}>
                    {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill color='#ddd' className={styles.teamIC} />}
                  </div>
                  <input className={styles.P2} id='p2Photo' value={item.p2Photo} placeholder='Enter team 2 logo' onChange={(event) => this.inputChange(event, index)} />
                  <input className={styles.P1} id='fighter2Country'   value={item.fighter2Country} placeholder='Enter fighter 2 country' onChange={(event) => this.inputChange(event, index)}/>
                  <input className={styles.P2} id='fighter1Name' value={item.fighter2Name} placeholder='Enter team 2 name' readOnly />
                  {/*<input className={styles.P2} id='p2Rec' value={item.p2Rec} placeholder='Enter team 2 record' onChange={(event)=>this.inputChange(event,index)}/>*/}
                </div>
              </div>
              <div className={styles.typeCont}>
              <div className={styles.typeDiv} style={{color:item.type==='mainCard'?'#CB1E31':'#292f51'}} onClick={()=>this.chooseType('mainCard',index)}>
              <IoCheckboxOutline className={styles.typeIC}/>
              <p>Main Card</p>
              </div>
              <div className={styles.typeDiv} style={{color:item.type==='prelims'?'#CB1E31':'#292f51'}} onClick={()=>this.chooseType('prelims',index)}>
              <IoCheckboxOutline className={styles.typeIC}/>
              <p>Prelims</p>
              </div>
              <div className={styles.typeDiv} style={{color:item.type==='earlyPrelims'?'#CB1E31':'#292f51'}} onClick={()=>this.chooseType('earlyPrelims',index)}>
              <IoCheckboxOutline className={styles.typeIC}/>
              <p>Early Prelims</p>
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
    var theRound=this.props.eventToNFLModal
    return (
      <><div className={styles.container2} onClick={(event) => this.doNothing(event)}>

        <p className={styles.headP}>Enter UFC Match Details</p>
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>{this.props.title}</p>
          <div className={styles.listCont}>{this.itemComponent(matchesArr,'UFC')}</div></div>
          {/*this.state.currentSelection==='divisionalRound'?
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Divisional Round</p>
          <div className={styles.listCont}>{this.itemComponent(divisionalRoundEdit, 'divisionalRound','Divisional Round')}</div></div>:null}
          {this.state.currentSelection==='conferenceChampionship'? 
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Conference Championship</p>
          <div className={styles.listCont}>{this.itemComponent(conferenceChampionshipEdit, 'conferenceChampionship','Conference')}</div></div>:null}
          {this.state.currentSelection==='superBowl'? 
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Super Bowl</p>
          <div className={styles.listCont}>{this.itemComponent(superBowlEdit, 'superBowl','Super Bowl')}</div></div>:null*/}
        
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