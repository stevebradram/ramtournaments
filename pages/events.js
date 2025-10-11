import React, { Component } from 'react'
import style from "@/styles/Events.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from '../components/Event/DetailsModal'
import EditDetails from '../components/Event/DetailsModalCopy'
import RamUfc from '../components/Event/RamUfc'
import NCAA from '../components/Event/NCAA'
import NFL from '../components/Event/NFL'
import NFLRegular from '../components/Event/NFLRegular'
import MarchMadness from '../components/Event/MarchMadness'
import LogIn from '../components/LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../components/FirebaseClient'
import dayjs from 'dayjs';
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline, MdKeyboardDoubleArrowRight,MdCheck  } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { SlOptionsVertical } from "react-icons/sl";
import { ToastContainer, toast } from 'react-toastify';
import Router,{useRouter,withRouter} from 'next/router'
var selectedRamUfcArray = [], selectedNflArray = [], selectedMarchMadnesArray = []


class events extends Component {
  state = {
    theMenu: 'round1', theItems: [], opendetailsModal: false, getRamDetails: false, dataAvailable: '', theEvent: 'Current Events', currentID: 1,
    theRamUfc: false, theMarchMadness: false, theNfl: false, theNcaaf: false, theFifa: '', userId: '', userLoggedIn: false, selectedEvent: 'March Madness', eventToShow: false,
    teamName: '', flockName: '', openLoginModal: false, clickHere1: 'CLICK HERE TO MAKE YOUR PICKS', clickHere2: 'CLICK HERE TO ENTER THE GAME',
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'marchMadness', pastEventsAvailable: false,
    eventRamUfc: '', eventMarchMadness: '', eventNfl: '', ramUfcMaincardArray: [],
    ramUfcPrelimsArray: [], nflArray: [], marchMadnessArray: [], ufcSubHeadings: '', selectedSport: 'March Madness', selectedId: '',
    allGames: [], theEventTitle: '', theEventKey: '', sportType: '', theTime: '', endTime: '', showChooseEventModal: false, firstSport: '',isAdmin:false,
    theEvents: [{ id: "NCAAB", name: 'March Madness' }, { id: "ramUfc", name: 'RAM UFC' }, { id: "NCAAF", name: 'NCAAF' }, { id: "NFL", name: 'NFL Playoffs' }, { id: "NFLRegular", name: 'NFL Season' }]
  }
  componentDidMount = () => {
    this.checkAuth()
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid
        this.setState({ userId, userLoggedIn: true })
        this.checkForFirstSport()
        this.checkForAllEvents()
         if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'||user.uid==='qXeqfrI5VNV7bPMkrzl0QsySmoi2'){
        this.setState({isAdmin:true})
       }

      } else {
        this.setState({ userLoggedIn: false })
        this.checkForFirstSport()
        this.checkForAllEvents()

      }
    })
  }
  hideModal = () => {
    this.setState({ opendetailsModal: false })
    //console.log('Button clicked!');
  };
  openTheModal = () => {
    if (this.state.userLoggedIn === true) {
      this.setState({ opendetailsModal: true, openLoginModal: false })
    } else {
      this.setState({ openLoginModal: true, opendetailsModal: false })
    }
  }
  checkForFirstSport = () => {
    var sportRef = firebase.database().ref('/theEvents/sport1')
    sportRef.once('value', dataSnapshot => {
      if(dataSnapshot.exists()){
      var theData = dataSnapshot.val().split('###')
      this.setState({ selectedSport: theData[0], selectedId: theData[1] })
      console.log('dataSnapshot.val()', dataSnapshot.val())
      this.chooseEvent(dataSnapshot.val())
      this.state.theEvents.forEach((item, i) => {
        if (item.name === theData[0]) {
          this.state.theEvents.splice(i, 1);
          this.state.theEvents.unshift(item);
        }
      });
    }
    })
  }
  submitSport = () => {
    if (this.state.selectedSport != '') {
      var sportRef = firebase.database().ref('/theEvents/sport1')
      var toSubmit = this.state.selectedSport + '###' + this.state.selectedId
      sportRef.set(toSubmit, error => {
        if (!error) {
          this.setState({ showChooseEventModal: false })
          this.notify('Selected Succesfully')
          this.state.theEvents.forEach((item, i) => {
        if (item.name === this.state.selectedSport) {
          this.state.theEvents.splice(i, 1);
          this.state.theEvents.unshift(item);
        }
      });
          this.chooseEvent(this.state.selectedSport)
        }
      })
    } else {
      this.notify('No Sport selected')
    }
  }
  checkForAllEvents = async () => {
    var userInfoDb = firebase.database().ref('/theEvents/eventsIds')
    var allGames = []
    await userInfoDb.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      var i = 0
      dataSnapshot.forEach((data) => {
        i++
        var key = data.key
        var time = data.val().time
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime

        var theItem = { id: key, time: time, title: title, sportType: sportType, endTime: endTime }
        allGames.push(theItem)

        if (theCount === i) {
          var theEventTitle = '', theEventKey = '', sportType = '', theTime = '', endTime = 0
          if (allGames.length > 0) {
            console.log('rrrrrrr', this.state.selectedId, allGames)
            var l = 0
            allGames = allGames.sort(function (a, b) { return b.time - a.time });
            allGames.forEach((item, i) => {
              l++
              if (item.sportType === this.state.selectedId) {
                allGames.splice(i, 1);
                allGames.unshift(item);
              }
              if (l === theCount) {
                theEventTitle = allGames[0]['title']; sportType = allGames[0]['sportType'], theEventKey = allGames[0]['id'], theTime = allGames[0]['time'], endTime = allGames[0]['endTime']
                this.setState({ allGames, theEventTitle, theEventKey, sportType, theTime, endTime }, () => {
                  if (this.state.selectedId === "NCAAB") { this.setState({ selectedEvent: 'March Madness',theCurrentEvent: 'marchMadness'}) }
                  if (this.state.selectedId === "NFL") { this.setState({ selectedEvent: 'NFL Playoffs',theCurrentEvent: 'nfl' }) }
                  if (this.state.selectedId === "NFLRegular") { this.setState({ selectedEvent: 'NFL Season',theCurrentEvent: 'nflRegular' }) }
                  if (this.state.selectedId === "ramUfc") { this.setState({ selectedEvent: 'RAM UFC',theCurrentEvent: 'ramUfc' }) }
                  if (this.state.selectedId === 'NCAAF') { this.setState({ selectedEvent: 'NCAAF',theCurrentEvent: 'NCAAF' }) }
                  //this.loadOtherEvents(theEventKey, sportType)
                })
              }
            })
          }
        }
      });
    })
  }
  chooseEvent = (name) => {
    console.log('name 00015',name)
    if (name === 'March Madness') { this.setState({ theCurrentEvent: 'marchMadness',selectedEvent:name}) }
    if (name === 'NFL Playoffs') { this.setState({ theCurrentEvent: 'nfl',selectedEvent:name }) }//NFL Season
    if (name === 'NFL Season') { this.setState({ theCurrentEvent: 'nflRegular',selectedEvent:name }) }
    if (name === 'RAM UFC') { this.setState({ theCurrentEvent: 'ramUfc',selectedEvent:name }) }
    if (name === 'NCAAF') { this.setState({ theCurrentEvent: 'NCAAF',selectedEvent:name }) }




  }
  loadOtherEvents = (id, sportType) => {
    if (sportType === 'NCAAF') { this.setState({ selectedEvent: sportType }) }
    if (sportType === 'ramUfc') { this.setState({ selectedEvent: 'RAM UFC' }) }
  }
  doNothing = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
  render() {
    var isPastEvent = ''
    var todayInMillis = new Date().getTime()
    if (this.state.endTime < todayInMillis && (this.state.endTime - todayInMillis) < -86400000) {
      isPastEvent = false
    } else { isPastEvent = true }
    return (
      <><div className={style.container} style={{ position: 'relative' }}>

        <div className={style.eventsDiv}>
          {this.state.isAdmin?<div className={style.selectDiv} onClick={() => this.setState({ showChooseEventModal: true })}><SlOptionsVertical /></div>:null}
          {this.state.theEvents.map((item, index) => {
            var colorP = '', clickable = true
            if (item.name === 'March Madness' && this.state.theMarchMadness === true) { colorP = '#b2b2b2', clickable = false }
            if (item.name === 'NCAAF' && this.state.theNcaaf === true) { colorP = '#b2b2b2', clickable = false }
            if (item.name === 'NFL Playoffs' && this.state.theNfl === true) { colorP = '#b2b2b2', clickable = false }
            if (item.name === 'NFL Season' && this.state.theNflRegular === true) { colorP = '#b2b2b2', clickable = false }
            if (item.name === 'RAM UFC' && this.state.theRamUfc === true) { colorP = '#b2b2b2', clickable = false }
            //if(item.name==='ALL'&&this.state.theRamUfc===false){colorP='#b2b2b2',clickable=false}
            return (
              <div key={index} onClick={() => this.chooseEvent(item.name)}>
                <p className={style.listP} style={{ color: colorP, borderColor: colorP }} id={this.state.selectedEvent === item.name ? style.playerP3 : style.playerP}>{item.name}</p>
              </div>
            )
          })}</div>
          <div className={style.leaderBDiv} onClick={()=>Router.push('/leaderboard')}><h3>GO TO LEADERBOARD</h3><MdKeyboardDoubleArrowRight className={style.arrIC}/></div>
        <div className={style.matchesHeadDiv}>
          {/*this.state.allGames.map((item,index)=>{
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
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherEvents(item.id,item.title,item.sportType)}>
               <p className={style.headListP1}>{item.title}</p>
               <div><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div>
               </div>  
            )
          })*/}
        </div><div style={{ marginTop: 10 }}>
          {this.state.selectedEvent==='RAM UFC'?<RamUfc isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NCAAF'?<NCAA isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NFL Playoffs'?<NFL isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NFL Season'?<NFLRegular isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='March Madness'?<MarchMadness isUserLoggedIn={this.state.userLoggedIn}/>:null}
        </div>
        {this.state.showChooseEventModal ? <div className={style.detailsModal} onClick={() => this.setState({ showChooseEventModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p className={style.weekP}>Choose Event</p>
            {this.state.theEvents.map((item, index) => {
              return (
                <div className={style.selectorDiv} key={index} onClick={() => this.setState({ selectedSport: item.name, selectedId: item.id })}>
                  <div className={this.state.selectedSport === item.name ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color: this.state.selectedSport === item.name ? '#CB1E31' : null }}>{item.name}</p>
                </div>
              )
            })}
            <p style={{ color: '#CB1E31', marginTop: 10, fontWeight: 500, fontSize: 16 }}>{this.state.chooseWeekErr}</p>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
              <button style={{ backgroundColor: '#ddd', border: 'none', color: 'black', padding: '7px 15px', cursor: 'pointer' }} onClick={() => this.setState({ showChooseEventModal: false })}>Cancel</button>
              <button style={{ backgroundColor: '#CB1E31', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.submitSport()}>Submit</button>
            </div>
          </div></div> : null}
      </div>
        <ToastContainer />
      </>
    )
  }
}

export default events