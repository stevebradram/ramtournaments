import React, { Component } from 'react'
import styles from "@/styles/community.module.scss";
import firebase from '../components/FirebaseClient'
import { MdOutlineFolderOff } from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
import News from '../components/Community/News'
import HallOfFame from '../components/Community/HallOfFame'
var theFlockArr = [{ name: 'Clement', score: 20 }, { name: 'Billygoat', score: 30 },
{ name: 'Elaine Kiiru', score: 40 }, { name: 'RAM Man', score: 50 }]
class leaderboard extends Component {
  state = {
    openModal: false, openModal2: false, openModal4: false, theItems: [], isThereNullData: false, allGames: [], showProgressBar: false, isAdmin: false, endTime: '', communitySelection: 'My Flocks',
    dataAvailable: false, sportType: '', theEventKey: '', theEventTitle: '', userLoggedIn: false, nullData: [], theEvent: '', theTime: '', isTherNormalData: false, eventStartTime: '', currentSelection: '', menuToShow: 'Rams in your flock',
    currentFlockName: '', flockNameAvailable: false, eventStarted: true, ramsInMyFlockArr: [], theFlocksArr: [], theAdminFlocksArr: []
  }
  componentDidMount = () => {
    this.showProgressBar()
    this.checkAuth()
  }
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1') {
          this.setState({ isAdmin: true })
        }
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId)}

      } else {
        this.setState({ userLoggedIn: false })
        //this.getGamesInfo()
        this.checkUpcomingPastGames(userId)
      }
    })
  }
  checkUpcomingPastGames = async (userId) => {
    var userInfoDb = firebase.database().ref('/theEvents/eventsIds')
    var i = 0, upcomingGames = [], pastGames = [], allGames = []
    var nowDate = await new Date().getTime()
    await userInfoDb.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      var i = 0
      //console.log('theCountttt',theCount)
      dataSnapshot.forEach((data) => {
        i++
        var pastG = {}, upcomingG = {}
        var key = data.key
        var time = data.val().time
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        var currentSelection = data.val().currentSelection

        var theItem = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection }
        allGames.push(theItem)
        if (theCount === i) {
          var theEventTitle = '', theEventKey = '', sportType = '', theTime = ''
          if (allGames.length > 0) {
            allGames = allGames.sort(function (a, b) { return b.endTime - a.endTime });
            console.log('allGames 9000000',allGames)
            theEventTitle = allGames[0]['title']; sportType = allGames[0]['sportType'], theEventKey = allGames[0]['id'], theTime = allGames[0]['time'], theTime = allGames[0]['currentSelection']
            var isEventStarted = true
            if (new Date().getTime() < allGames[0]['time']) { isEventStarted = false }
              this.setState({ allGames, theEventTitle, theEventKey, sportType, theTime, currentSelection, eventStarted: isEventStarted }, () => {
              this.getRamsInFlock(theEventKey, isEventStarted)
              {this.state.isAdmin?this.loadAdminData(theEventKey):null}
              console.log('sportType555555555', sportType, theEventKey)
            })
          }


        }
      });
    })

  }
  getRamsInFlock = (theEventKey, isEventStarted) => {
    this.setState({ ramsInMyFlockArr: [], theFlocksArr: [] })
    var userInfoDb = firebase.database().ref('/users/' + this.state.userId + '/flockData/flockNames/').child(theEventKey).child('name')
    var flocksDataRef = firebase.database().ref('/users/' + this.state.userId + '/flockData/flockNames/').child(theEventKey).child('name')
    userInfoDb.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theFName = dataSnapshot.val().split('|').join(' ').toUpperCase()
        this.setState({ currentFlockName: theFName, flockNameAvailable: true })
        this.getRamMembersData(theEventKey, dataSnapshot.val(), isEventStarted)
      } else {
        this.setState({ currentFlockName: '', flockNameAvailable: false })
      }
    })
  }
  getRamMembersData = (theEventKey, flockNameWithNoSpaces, isEventStarted) => {
    var allArr = []
    var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/membersScores/' + flockNameWithNoSpaces)
    membersFlockNamesRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          var theUserId = data.key
          var theArr = { uid: theUserId, theName: theData.name, picked: theData.picked, BPS: Number(theData.BPS), score: theData.score }
          allArr.push(theArr)
          if (count === i) {
            if (isEventStarted) { allArr = allArr.sort(function (a, b) { return b.score - a.score }); }
            else { allArr = allArr.sort(function (a, b) { return b.BPS - a.BPS }); }
            this.setState({ ramsInMyFlockArr: allArr })
            console.log('the maliza', allArr)
          }
        })
      }
    })
    var theFlocksRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/theFlocks/')
    theFlocksRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0, allArr = []
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          var theArr = { flockName: data.key, score: theData.score }
          allArr.push(theArr)
          if (count === i) {
            allArr = allArr.sort(function (a, b) { return b.score - a.score })
            this.setState({ theFlocksArr: allArr })
            console.log('theFlocksArr', allArr)
          }
        })
      }
    })
    //membersFlockNamesRef.child(flockNameWithNoSpaces).child(this.state.userId).set('$$$'+this.state.creatorName)

  }
  loadAdminData = (theEventKey) => {
    var theAdminFlocksRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/admin/')
    theAdminFlocksRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0, allArr = []
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          theData = theData.split('!!')
          var name = theData[0]
          var picked = ''
          if (name.includes('$$$')) { picked = false }
          else { { picked = true } }
          var newName = theData[0].split('$$$').join('')
          var theArr = { name: newName, flockName: theData[1], email: theData[2], phoneNo: theData[3], picked: picked }
          allArr.push(theArr)
          if (count === i) {
            this.setState({ theAdminFlocksArr: allArr })
            console.log('theFlocksArr', allArr)
          }
        })
      } else {
        this.setState({ theAdminFlocksArr: [] })
      }
    })

  }
  preventClose = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  selectChange = async (e) => {
    var value = e.target.value
  }
  inputChange = async (e) => {
    var value = e.target.value
  }

  loadOtherEvents = async (sportType, theEventKey, theTime, theEventTitle, currentSelection, item) => {
    console.log('whole item', item)
    this.showProgressBar()

    if (navigator.onLine === false) {
      this.notify('No internet! please check your internet connection')
      return
    }
    if (!this.state.userLoggedIn) {
      this.notify('Please Log In to continue')
    } else {
      var isEventStarted = true
      if (new Date().getTime() < theTime) { isEventStarted = false }
      this.setState({ theEventKey, theEventTitle, currentSelection, eventStarted: isEventStarted })
      this.getRamsInFlock(theEventKey, isEventStarted)
      {this.state.isAdmin?this.loadAdminData(theEventKey):null}
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
      2000)
  }
  render() {
    //console.log('this.state.theAdminFlocksArr.length',this.state.theAdminFlocksArr.length)
    var theItems = []
    var noData = false
    var sortData = this.state.theItems.sort((a, b) => b.currentScore - a.currentScore)
    var nullData = this.state.nullData.sort((a, b) => b.bestPossibleScore - a.bestPossibleScore)
    if (this.state.isThereNullData === true) { theItems = nullData }
    if (this.state.isTherNormalData === true) { theItems = sortData }

    return (
      <>
        <div className={styles.container}>
          <p className={styles.titleP}>Community</p>
          <div className={styles.headerCont}>
            {['My Flocks', 'News & Videos', 'Hall of Fame'].map((item, index) => {

              return (
                <div className={this.state.communitySelection === item ? styles.headerDiv : styles.headerDiv2} key={index} onClick={() => this.setState({ communitySelection: item })}>
                  <p>{item}</p>
                </div>
              )
            })}</div>
          {this.state.communitySelection==='My Flocks'?<><div className={styles.headCont}>
            {this.state.allGames.map((item, index) => {
              var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
              var todayInMillis = new Date().getTime()
              //console.log('todayInMillis',item)
              var theColor = '#292f51', timing = 'Active Event'
              if (item.endTime < todayInMillis && (item.endTime - todayInMillis) < -86400000) {
                theColor = '#919191'
                timing = 'Past Event'
              }
              if (this.state.theEventKey === item.id) {
                theColor = '#CB1E31'
              }
              return (
                <div className={styles.headList} key={index} style={{ color: theColor, borderColor: theColor }} onClick={() => this.loadOtherEvents(item.sportType, item.id, item.time, item.title, item.currentSelection, item)}>
                  <p className={styles.headListP1}>{item.title}</p>
                  <div><p className={styles.headListP2}>{eventTime}</p>
                    <p style={{ marginLeft: 2, marginRight: 2 }}>-</p>
                    <p className={styles.headListP3}>{timing}</p></div>
                </div>

              )
            })}
          </div>
          <p className={styles.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
          <div className={styles.menu2Div0}>
            <div className={styles.menuHeader}>
              {['Rams in your flock', 'Flocks among flocks', this.state.isAdmin?'Admin':null].map((item, index) => {

                return (
                  <p style={{ color: this.state.menuToShow === item ? '#CB1E31' : null, borderBottomColor: this.state.menuToShow === item ? '#CB1E31' : null }} key={index} onClick={() => this.setState({ menuToShow: item })}>{item}</p>
                )
              })}
            </div>
            {this.state.menuToShow === 'Rams in your flock' ? <>{this.state.flockNameAvailable ? <div className={styles.menu2Div1}>
              <p className={styles.titleP}><span>{this.state.currentFlockName}</span> - RAMS IN YOUR FLOCK</p>
              <div id={styles.table1Div}>
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Overall <br />Rank</th>
                    <th>RAM Name</th>
                    <th>Picked?</th>
                    <th>Best Possible<br />Score</th>
                    <th>Cumulative <br />Score</th></tr>
                  {this.state.ramsInMyFlockArr.map((item, index) => {
                    console.log('picked', item.picked)
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.id === this.state.userId ? '#292f51' : null, color: item.id === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.theName}</td>
                        <td style={{ color: item.picked ? 'green' : 'red' }}>{item.picked + ''}</td>
                        <td>{item.BPS}</td>
                        <td>{item.score}</td></tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? '#919191' : null }}>{this.state.eventStarted ? 'Past Event' : 'Upcoming Event'}</p>
              <p className={styles.noDataP1}>No "Rams in your flock" data available for this event</p>
              <p className={styles.noDataP2} style={{ backgroundColor: this.state.eventStarted ? '#919191' : null }}>{this.state.eventStarted ? 'Expired Event' : 'Create Event'}</p>
            </div>}</> : null}
            {this.state.menuToShow === 'Flocks among flocks' ? <>{this.state.flockNameAvailable ? <div className={styles.menu2Div1}>
              <p className={styles.titleP}>YOUR FLOCK'S RANK AMONG THE HEARD</p>
              <div id={styles.table1Div}>
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Flock Rank In Herd</th>
                    <th>Flock Names</th>
                    <th>Average Points<br />Per RAM</th></tr>
                  {this.state.theFlocksArr.map((item, index) => {
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.id === this.state.userId ? '#292f51' : null, color: item.id === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.flockName}</td>
                        <td>{item.score}</td></tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? '#919191' : null }}>{this.state.eventStarted ? 'Past Event' : 'Upcoming Event'}</p>
              <p className={styles.noDataP1}>No "Your flocks among flocks" data available for this event</p>
              <p className={styles.noDataP2} style={{ backgroundColor: this.state.eventStarted ? '#919191' : null }}>{this.state.eventStarted ? 'Expired Event' : 'Create Event'}</p>
            </div>}</> : null}
            {this.state.menuToShow==='Admin'&&this.state.isAdmin? <>{this.state.theAdminFlocksArr.length > 0 ? <div className={styles.menu2Div1}>
              <p className={styles.titleP}>ADMIN VIEW</p>
              <div id={styles.table1Div}>
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Overall <br />Rank</th>
                    <th>RAM Name</th>
                    <th>Flock Name</th>
                    <th>Picked?</th>
                    <th>Email</th>
                    <th>Phone No</th>
                  </tr>
                  {this.state.theAdminFlocksArr.map((item, index) => {
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.id === this.state.userId ? '#292f51' : null, color: item.id === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.flockName}</td>
                        <td style={{ color: item.picked ? 'green' : 'red' }}>{item.picked + ''}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNo}</td>
                      </tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? '#919191' : null }}>{this.state.eventStarted ? 'Past Event' : 'Upcoming Event'}</p>
              <p className={styles.noDataP1}>No Admin data available for this event</p>
            </div>}</> : null}

          </div></>:null}
          {this.state.communitySelection==='News & Videos'?<News/>:null}
          {this.state.communitySelection==='Hall of Fame'?<HallOfFame/>:null}
        </div>
        {this.state.showProgressBar ? <ProgressBar /> : null}
        <ToastContainer />
      </>
    )
  }
}

export default leaderboard
