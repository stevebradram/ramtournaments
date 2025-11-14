import React, { Component } from 'react'
import firebase from '../FirebaseClient'
import styles from './TheMarchMadness.module.scss'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";
class TheMarchMadness extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
    this.getAlert = this.getAlert.bind(this);
  }
  state = {
    week1RoundArr: [], week2RoundArr: [], week3RoundArr: [],week4RoundArr:[],currentSelection: 'week1', theItems: [], finalRoundExists: false, isAdmin: false, userId: '', overallArr: [], overallRoundExists: '', finalRoundArr: [], finalRoundMenu: '', theCount: '', deleteModal: false,
    deleteName: '', userIdToBeDeleted: '', flockToBeDeleted: '', thePicked: '', eventStartTime: '',theValues: '',theEventKey:'',sportType:'',isWeek1Available:false,isWeek2Available:false,isWeek3Available:false,isWeek4Available:false,howManyWeeks:0
  }

  componentDidMount = () => {
    //this.setState()
    console.log('here march madness again agaiiiiiiin 111',this.props.theEventKey)
   // return
    this.setState({theCount:this.props.theCount,theEventKey:this.props.theEventKey})
    // this.props.onClick()
    //return
    this.loadData(this.props.theEventKey)
  }
  runCustomLogic = (eventKey) => {
    console.log('week 1 matches 004',eventKey,this.props.theEventKey)
    this.setState({theEventKey:eventKey,currentSelection: 'week1'})
    //console.log("Child logic triggered from parent!");
    //alert("Child method executed!");
    this.loadData(eventKey)
  };
  loadData=async(eventKey)=>{
     console.log('here march madness again agaiiiiiiin 222',eventKey)
    //return
    this.checkRoundAvailability(eventKey)
    this.getweek1Matches(eventKey)
    this.getweek2Matches(eventKey)
    this.getRound3Matches(eventKey)
    this.getRound4Matches(eventKey)
    this.getOverall(eventKey)
    this.checkAuth()
  }
  getAlert() {
    alert('getAlert from Child');
  }
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1'||user.uid==='qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
          this.setState({ isAdmin: true })
        }
        this.getEventStartTime()
        this.setState({ userId, userLoggedIn: true })
      } else {
      }
    })
  }
  getEventStartTime = async () => {
    var eventStartTimeRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
    eventStartTimeRef.once('value', dataSnapshot => { 
      var stopweek1RoundEdit=dataSnapshot.val().stopweek1RoundEdit
       var theValues = dataSnapshot.val().theValues
      this.setState({ eventStartTime:stopweek1RoundEdit,theValues:theValues})
      //console.log('here jajajaja',theValues)
    })

  }
  checkRoundAvailability=(eventKey) => {
     var leadersRef = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + eventKey + '/theValues/')
     leadersRef.once('value', dataSnapshot => {
      var theValues = dataSnapshot.val()
      theValues=theValues.split('|')
      this.setState({howManyWeeks:theValues.length})
      if(theValues.length===4){this.setState({howManyWeeks:4,isWeek1Available:true,isWeek2Available:true,isWeek3Available:true,isWeek4Available:true})}
      if(theValues.length===3){this.setState({howManyWeeks:3,isWeek1Available:true,isWeek2Available:true,isWeek3Available:true,isWeek4Available:false})}
      if(theValues.length===2){this.setState({howManyWeeks:2,isWeek1Available:true,isWeek2Available:true,isWeek3Available:false,isWeek4Available:false})}
      if(theValues.length===1){this.setState({howManyWeeks:1,isWeek1Available:true,isWeek2Available:false,isWeek3Available:false,isWeek4Available:false})}
     })
  }
  getweek1Matches = (eventKey) => {
     console.log('week 1 matches',eventKey)
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/' + eventKey + '/')
    var i = 0, theDet2 = []
    leadersRef.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId = data.key
        var theDet = {}
        ////console.log('the uid', theId)
        var userInfoDb2 = firebase.database().ref('/users/' + theId + '/userData')
        var userInfoDb = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/details/")
        var isTherData = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/bets/week1Round/")
        isTherData.once('value', dataSnapshot => {
          if (dataSnapshot.exists()) {
            var theEmail = '', thePhone = ''
            if (this.state.isAdmin) {
              userInfoDb2.once('value', dataSnapshot => {
                var theD = dataSnapshot.val()
                if (theD.phoneNo) { theDet['phone'] = theD.phoneNo } else { theDet['phone'] = 'N/A' }
                theDet['email'] = theD.email
                if (theD.phoneNo) { thePhone = theD.phoneNo } else { thePhone = 'N/A' }
                if (theD.email) { theEmail = theD.email } else { theEmail = 'N/A' }
              })
            }
            userInfoDb.once('value', dataSnapshot => {
              if (dataSnapshot.exists()) {
                var userBetData = dataSnapshot.val()
                var theDet = {
                  id: theId, flockName: userBetData.flockName, teamName: userBetData.teamName,
                  bestPossibleScore: userBetData.week1RoundBPS, score: userBetData.week1RoundScore, email: theEmail, phone: thePhone
                }
                theDet2.push(theDet)
                ////console.log('ikoooooooooooooooo 1111', theDet2)
                this.setState({ week1RoundArr: theDet2, theItems: theDet2 })
              } else {
                //console.log('hakunaaaaaaaaaaaaa 11111')
              }
            })
          }else{
            this.setState({ week1RoundArr:[]})
          }
        })
        if (theCount === i) {
          var sort = this.state.week1RoundArr.sort((a, b) => b.score - a.score)
          this.setState({ week1RoundArr: sort })
          //console.log('week 1 matches',eventKey,sort)
        }
      })
    })
  }
  getweek2Matches = (eventKey) => {
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/' + eventKey + '/')
    // var leadersRef = firebase.database().ref('/userBets/scoreBoards/NCAAB/'+eventKey+'/week1/')
    var i = 0, theDet2 = []
    leadersRef.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId = data.key
        var theDet = {}
        ////console.log('the uid', theId)
        var userInfoDb2 = firebase.database().ref('/users/' + theId + '/userData')
        var userInfoDb = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/details/")
        var isTherData = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/bets/week2Round/")
        isTherData.once('value', dataSnapshot => {
          if (dataSnapshot.exists()) {
            var theEmail = '', thePhone = ''
            if (this.state.isAdmin) {
              userInfoDb2.once('value', dataSnapshot => {
                var theD = dataSnapshot.val()
                if (theD.phoneNo) { theDet['phone'] = theD.phoneNo } else { theDet['phone'] = 'N/A' }
                theDet['email'] = theD.email
                if (theD.phoneNo) { thePhone = theD.phoneNo } else { thePhone = 'N/A' }
                if (theD.email) { theEmail = theD.email } else { theEmail = 'N/A' }
              })
            }
            userInfoDb.once('value', dataSnapshot => {
              if (dataSnapshot.exists()) {
                var userBetData = dataSnapshot.val()
                var theDet = {
                  id: theId, flockName: userBetData.flockName, teamName: userBetData.teamName,
                  bestPossibleScore: userBetData.week2RoundBPS, score: userBetData.week2RoundScore, email: theEmail, phone: thePhone
                }
                theDet2.push(theDet)
                ////console.log('ikoooooooooooooooo 1111', theDet2)
                this.setState({ week2RoundArr: theDet2 })
              } else {
                //console.log('hakunaaaaaaaaaaaaa 11111')
              }
            })
          }else{
            this.setState({ week2RoundArr:[]})
            console.log('hakunaaaaaaaaaaaaa data week 22222222222222')
          }
        })
        if (theCount === i) {
          var sort = this.state.week2RoundArr.sort((a, b) => b.score - a.score)
          this.setState({ week2RoundArr: sort })
          ////console.log('finaaal',theDet2)
          //this.setState({week1RoundArr:theDet2})
        }
      })
    })
  }
  getRound3Matches = (eventKey) => {
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/' + eventKey + '/')
    var i = 0, theDet2 = []
    leadersRef.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId = data.key
        var theDet = {}
        ////console.log('the uid', theId)
        var userInfoDb2 = firebase.database().ref('/users/' + theId + '/userData')
        var userInfoDb = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/details/")
        var isTherData = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/bets/week2Round/")
        isTherData.once('value', dataSnapshot => {
          if (dataSnapshot.exists()) {
            var theEmail = '', thePhone = ''
            if (this.state.isAdmin) {
              userInfoDb2.once('value', dataSnapshot => {
                var theD = dataSnapshot.val()
                if (theD.phoneNo) { theDet['phone'] = theD.phoneNo } else { theDet['phone'] = 'N/A' }
                theDet['email'] = theD.email
                if (theD.phoneNo) { thePhone = theD.phoneNo } else { thePhone = 'N/A' }
                if (theD.email) { theEmail = theD.email } else { theEmail = 'N/A' }
              })
            }
            userInfoDb.once('value', dataSnapshot => {
              if (dataSnapshot.exists()) {
                var userBetData = dataSnapshot.val()
                var theDet = {
                  id: theId, flockName: userBetData.flockName, teamName: userBetData.teamName,
                  bestPossibleScore: userBetData.week3RoundBPS, score: userBetData.week3RoundScore, email: theEmail, phone: thePhone
                }
                theDet2.push(theDet)
                ////console.log('ikoooooooooooooooo 1111', theDet2)
                this.setState({ week3RoundArr: theDet2 })
              } else {
                //console.log('hakunaaaaaaaaaaaaa 11111')
              }
            })
          }else{
            this.setState({ week3RoundArr:[]})
          }
        })
        if (theCount === i) {
          var sort = this.state.week3RoundArr.sort((a, b) => b.score - a.score)
          this.setState({ week3RoundArr: sort })
          ////console.log('finaaal',theDet2)
          //this.setState({week1RoundArr:theDet2})
        }
      })
    })
  }
    getRound4Matches = (eventKey) => {
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/' + eventKey + '/')
    var i = 0, theDet2 = []
    leadersRef.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
        var theId = data.key
        var theDet = {}
        ////console.log('the uid', theId)
        var userInfoDb2 = firebase.database().ref('/users/' + theId + '/userData')
        var userInfoDb = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" +eventKey+ "/details/")
        var isTherData = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/bets/week4Round/")
        isTherData.once('value', dataSnapshot => {
          if (dataSnapshot.exists()) {
            var theEmail = '', thePhone = ''
            if (this.state.isAdmin) {
              userInfoDb2.once('value', dataSnapshot => {
                var theD = dataSnapshot.val()
                if (theD.phoneNo) { theDet['phone'] = theD.phoneNo } else { theDet['phone'] = 'N/A' }
                theDet['email'] = theD.email
                if (theD.phoneNo) { thePhone = theD.phoneNo } else { thePhone = 'N/A' }
                if (theD.email) { theEmail = theD.email } else { theEmail = 'N/A' }
              })
            }
            userInfoDb.once('value', dataSnapshot => {
              if (dataSnapshot.exists()) {
                var userBetData = dataSnapshot.val()
                var theDet = {
                  id: theId, flockName: userBetData.flockName, teamName: userBetData.teamName,
                  bestPossibleScore: userBetData.week4RoundBPS, score: userBetData.week4RoundScore, email: theEmail, phone: thePhone
                }
                theDet2.push(theDet)
                ////console.log('ikoooooooooooooooo 1111', theDet2)
                this.setState({ week4RoundArr: theDet2 })
              } else {
                //console.log('hakunaaaaaaaaaaaaa 11111')
              }
            })
          }else{
            this.setState({ week4RoundArr:[]})
          }
        })
        if (theCount === i) {
          var sort = this.state.week4RoundArr.sort((a, b) => b.score - a.score)
          this.setState({ week4RoundArr: sort })
          ////console.log('finaaal',theDet2)
          //this.setState({week1RoundArr:theDet2})
        }
      })
    })
  }
  getOverall = (eventKey) => {
    var i = 0, theDet2 = []
    var leadersRef = firebase.database().ref('/userBets/NFLRegular/' + eventKey)
    leadersRef.once('value', dataSnapshot => {
      if (!dataSnapshot.exists()) {
        this.setState({ overallRoundExists: false })
      } else {
        this.setState({ overallRoundExists: true })
        var theCount = dataSnapshot.numChildren()
        dataSnapshot.forEach((data) => {
          i++
          var theId = data.key
          var theDet = {}
          //  //console.log('the uid',theId)
          var userInfoDb2 = firebase.database().ref('/users/' + theId + '/userData')
          var userInfoDb = firebase.database().ref('/users/').child(theId).child("/ramData/events/NFLRegular/" + eventKey + "/details/")
          var theEmail = '', thePhone = ''
          if (this.state.isAdmin) {
            userInfoDb2.once('value', dataSnapshot => {
              var theD = dataSnapshot.val()
              if (theD.phoneNo) { theDet['phone'] = theD.phoneNo } else { theDet['phone'] = 'N/A' }
              theDet['email'] = theD.email
              if (theD.phoneNo) { thePhone = theD.phoneNo } else { thePhone = 'N/A' }
              if (theD.email) { theEmail = theD.email } else { theEmail = 'N/A' }
            })
          }
          userInfoDb.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
              var userBetData = dataSnapshot.val()
              var week1RoundScore = userBetData.week1RoundScore, week2RoundScore = userBetData.week2RoundScore, week3RoundScore = userBetData.week3RoundScore,week4RoundScore = userBetData.week4RoundScore

              if (!week1RoundScore || week1RoundScore === undefined || week1RoundScore === null) { week1RoundScore = 0 }
              if (!week2RoundScore || week2RoundScore === undefined || week2RoundScore === null) { week2RoundScore = 0 }
              if (!week3RoundScore || week3RoundScore === undefined || week3RoundScore === null) { week3RoundScore = 0 }
              if (!week4RoundScore || week4RoundScore === undefined || week4RoundScore === null) { week4RoundScore = 0 }

              var score = Number(week1RoundScore) + Number(week2RoundScore) + Number(week3RoundScore)+Number(week4RoundScore)
              score = Number(score).toFixed(2)
              var theDet = {
                id: theId, flockName: userBetData.flockName, teamName: userBetData.teamName,
                week1RoundScore: week1RoundScore, week2RoundScore: week2RoundScore, email: theEmail, phone: thePhone,
                week3RoundScore: week3RoundScore, week4RoundScore: week4RoundScore, score: score
              }
              theDet2.push(theDet)
              // //console.log('ikoooooooooooooooo 1111',theDet2)
              this.setState({ overallArr: theDet2 })
            } else {
              ////console.log('hakunaaaaaaaaaaaaa 11111')
            }
          })
          if (theCount === i) {
            var sort = this.state.overallArr.sort((a, b) => b.score - a.score)
            this.setState({ overallArr: sort })
            //console.log('hakunaaaaaaaaaaaaa overallll', sort)
          }
        })
      }

    })
  }
  getCurrentRound = (round) => {

    //console.log('zaaaaaa',round,this.state.week2RoundArr)
    //return

    if (round === 'week1') {
      this.setState({ theItems: this.state.week1RoundArr })
    }
    if (round === 'week2') {
      this.setState({ theItems: this.state.week2RoundArr })
      console.log('it is final round', this.state.week2RoundArr)
    }
    if (round === 'week3') {
      this.setState({ theItems: this.state.week3RoundArr })
      //console.log('it is final round', this.state.week3RoundArr)
    }
     if (round === 'week4') {
      this.setState({ theItems: this.state.week4RoundArr })
      //console.log('it is final round', this.state.week3RoundArr)
    }
    if (round === 'overall') {
      this.setState({ theItems: this.state.overallArr })
    }


    this.setState({ currentSelection: round })
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
  deleteMember = () => {
    //console.log('eventStartTime', this.state.eventStartTime, this.state.userIdToBeDeleted, this.props.theEventKey, this.props.sportType,this.state.flockToBeDeleted)
    //return
     if(this.state.eventStartTime&&this.state.userIdToBeDeleted&&this.state.theEventKey&&this.props.sportType){
 if ((new Date().getTime() > this.state.theTime)) {
      this.notify("Can't delete a member on an already started event")
    } else { this.deleteMember2() }
     }else{
 this.notify('Some data missing')
     }
   
  }
  deleteMember2 = () => {
    //console.log('to the deletion')
    //return
    var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/' + this.state.theEventKey)
    var adminRef = firebase.database().ref('/flocksSystem/flockNames/' + this.state.theEventKey + '/admin')
    var generalDb = firebase.database().ref()
    var userRef = firebase.database().ref('users/').child(this.state.userIdToBeDeleted + '/ramData/')
    var userBets = firebase.database().ref('userBets/')

    try {
      
    
    generalDb.child('users/' + this.state.userIdToBeDeleted + '/flockData/flockNames/' + this.state.theEventKey).set(null)
    userRef.child('events/' + this.props.sportType + '/' + this.state.theEventKey).set(null)
    userRef.child('upcomingEvents/' + this.props.sportType + '/' + this.state.theEventKey).set(null)
    userBets.child(this.props.sportType + '/' + this.state.theEventKey + '/' + this.state.userIdToBeDeleted).set(null)
    adminRef.child(this.state.userIdToBeDeleted).set(null)
    membersFlockNamesRef.child('/membersScores/' + this.state.flockToBeDeleted).child(this.state.userIdToBeDeleted).set(null)
    membersFlockNamesRef.child('/members/' + this.state.flockToBeDeleted).once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theCount = dataSnapshot.numChildren()
        var toDbMembersNo = Number(theCount) - 1
        if (theCount <= 1) {
          //start here
          membersFlockNamesRef.child('/members/' + this.state.flockToBeDeleted).child(this.state.userIdToBeDeleted).set(null)
          membersFlockNamesRef.child('/membersScores/' + this.state.flockToBeDeleted).set(null)
          membersFlockNamesRef.child('/theFlocks/' + this.state.flockToBeDeleted).set(null)
          membersFlockNamesRef.child('/flockCreators/' + this.state.userIdToBeDeleted).set(null)
          membersFlockNamesRef.child('/unique/' + this.state.flockToBeDeleted).set(null)
         
              const updatedArr = this.state.theItems.filter(item => item.id !== this.state.userIdToBeDeleted);
              this.setState({ theItems: updatedArr, deleteModal: false })
              this.notify('Member removed successfully 1 '+this.state.userIdToBeDeleted)
            
        
        } else {
          membersFlockNamesRef.child('/members/' + this.state.flockToBeDeleted).child(this.state.userIdToBeDeleted).set(null)
          membersFlockNamesRef.child('/theFlocks/' + this.state.flockToBeDeleted + '/membersNo/').set(toDbMembersNo)
         
              const updatedArr = this.state.theItems.filter(item => item.id !== this.state.userIdToBeDeleted);
              this.setState({ theItems: updatedArr, deleteModal: false })
              this.notify('Member removed successfully 2 '+this.state.userIdToBeDeleted)
           
        }
      }else{
          membersFlockNamesRef.child('/members/' + this.state.flockToBeDeleted).child(this.state.userIdToBeDeleted).set(null)
         
         
              const updatedArr = this.state.theItems.filter(item => item.id !== this.state.userIdToBeDeleted);
              this.setState({ theItems: updatedArr, deleteModal: false })
              this.notify('Member removed successfully 3 '+this.state.userIdToBeDeleted)
      }
    })
} catch (error) {
      //console.log('An error occured unfortunately',error)
      this.notify('An error occured unfortunately')
    }
  }
  render() {
    //console.log('this.state.currentSelection 004',this.state.theEventKey)
    var sortData = this.state.theItems.sort((a, b) => b.score - a.score)
    //var sortData=this.state.theItems.sort((a, b) => b.currentScore - a.currentScore )
    return (
      <>
        <div>
          <div className={styles.eve2Div}>
                    {this.state.theValues.split('|').map((item, index) => {
                      var theIndex = index + 1
                      var theMenu = 'week' + theIndex 
                      var theArr = 'week' + theIndex + 'RoundArray'
                      var theWeekEdit = 'stopweek' + theIndex + 'RoundEdit'
                      var theScoresMenu = 'Week ' + item + ' Round'
                      return (
                        <p key={index} id={this.state.currentSelection === theMenu ? styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound(theMenu)}>{'WEEK ' + item}</p>
                      )
                    })}
                    <p id={this.state.currentSelection === 'overall' ? styles.theSubMenuP2 : null} onClick={() => this.getCurrentRound('overall')}>OVERALL</p>
                    </div>
          {/*<div className={styles.eve2Div}>
            <p id={this.state.currentSelection === 'week1' ? styles.theSubMenuP2 : null} onClick={() => this.getCurrentRound('week1')}>WEEK 2</p>
            <p id={this.state.currentSelection === 'week2' ? styles.theSubMenuP2 : null} onClick={() => this.getCurrentRound('week2')}>WEEK 3</p>
            <p id={this.state.currentSelection === 'week3' ? styles.theSubMenuP2 : null} onClick={() => this.getCurrentRound('week3')}>WEEK 4</p>
            <p id={this.state.currentSelection === 'overall' ? styles.theSubMenuP2 : null} onClick={() => this.getCurrentRound('overall')}>Overall</p>
          </div>*/}
          <div className={styles.menu2Div1}>
            {this.state.isAdmin ? <div id={styles.exportDiv}> <div id={styles.exportDiv1} onClick={() => this.notify('Downloading...')}><DownloadTableExcel
              filename={this.state.theEventKey}
              sheet="users"
              currentTableRef={this.tableRef.current}
            >
              <p className={styles.exportP}>Export Document</p>
            </DownloadTableExcel> </div></div> : null}
            <div id={styles.table1Div}>
              <table className={styles.table1} ref={this.tableRef}>
                <tr id={styles.table1Tr1}>
                  <th>Overall <br />Rank</th>
                  <th>RAM Name</th>
                  <th>Flock Name</th>
                  {this.state.currentSelection === 'week1' || this.state.currentSelection === 'week2' || this.state.currentSelection === 'week3'|| this.state.currentSelection === 'week4' ?
                    <><th>Best Possible <br />Score</th>
                      <th>Current Score</th></> : null}
                  {this.state.currentSelection === 'overall' ?
                    <>
                      <th>Cumulative <br />Score</th>
                      {this.state.isWeek1Available?<th>WEEK 1</th>:null}
                      {this.state.isWeek2Available?<th>WEEK 2</th>:null}
                      {this.state.isWeek3Available?<th>WEEK 3</th>:null}
                      {this.state.isWeek4Available?<th>WEEK 4</th>:null}
                    </> : null}
                  {this.state.isAdmin ? <><th>Phone</th><th>Email</th><th>Delete</th></> : null}
                </tr>
                {sortData.map((item, index) => {
                  ////console.log('tttttttt', item)
                  return (
                    <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.id === this.state.userId ? '#292f51' : index === 0 ? '#CB1E31' : null, color: item.id === this.state.userId ? 'white' : index === 0 ? '#ffffff' : '#292f51' }}>
                      <td>{index + 1}</td>
                      <td>{item.teamName}</td>
                      <td>{item.flockName}</td>
                      {this.state.currentSelection === 'week1' || this.state.currentSelection === 'week2' || this.state.currentSelection === 'week3' || this.state.currentSelection === 'week4'?
                        <><td>{item.bestPossibleScore ? item.bestPossibleScore : 'N/A'}</td>
                          <td>{item.score}</td></> : null}

                      {this.state.currentSelection === 'overall' ?
                        <>
                          <td>{item.score ? item.score : '0.00'}</td>
                          {this.state.isWeek1Available?<td>{item.week1RoundScore ? item.week1RoundScore : '0.00'}</td>:null}
                          {this.state.isWeek2Available?<td>{item.week2RoundScore ? item.week2RoundScore : '0.00'}</td>:null}
                          {this.state.isWeek3Available?<td>{item.week3RoundScore ? item.week3RoundScore : '0.00'}</td>:null}
                          {this.state.isWeek4Available?<td>{item.week4RoundScore ? item.week4RoundScore : '0.00'}</td>:null}
                        </> : null
                      }
                      {this.state.isAdmin ? <><td>{item.phone}</td><td>{item.email}</td><td><MdDeleteOutline className={styles.delIC} onClick={() => this.setState({ deleteName: item.teamName, deleteModal: true, userIdToBeDeleted: item.id, flockToBeDeleted:item.flockName.split(' ').join('|')})} /></td></> : null}
                    </tr>)
                }
                )}
              </table> </div></div>
          {this.state.deleteModal ? <div className={styles.modal}>
            <div className={styles.delModal}>
              <p className={styles.delModalP1}>Confirm Delete?</p>
              <p className={styles.delModalP2}>Are you sure you want to delete "{this.state.deleteName}" picks?</p>
              <p className={styles.delModalP2} style={{ color: 'red' }}>This cannot be reversed!</p>
              <div>
                <button className={styles.delModalDelBtn} onClick={() => this.deleteMember()}>Delete</button>
                <button className={styles.canModalDelBtn} onClick={() => this.setState({ deleteModal: false })}>Cancel</button>
              </div>
            </div>

          </div> : null}
        </div>
        <ToastContainer />
      </>
    )
  }
}
export default TheMarchMadness