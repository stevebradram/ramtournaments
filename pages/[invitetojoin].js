import React, { Component } from 'react'
import styles from "@/styles/Invite.module.scss";
import Community from './community'
import { MdClose } from "react-icons/md";
import Router,{useRouter,withRouter} from 'next/router'
import firebase from '../components/FirebaseClient'
class invite extends Component {
  state={creatorName:'',creatorId:'',eventTitle:'',flockName:'',flockName2:'',startTime:'',sportType:'',eventId:'',userId:'',detailsReady:false,sucessSubmiting:false}
 componentDidMount(){
    console.log('routerr',window.location.href)
    var linkInfo = window.location.href.split("/");
    linkInfo=linkInfo.pop().split("~")
    var eventId=linkInfo[1]
    var flockName=linkInfo[2]
    flockName=flockName.replace(/%7C/g,' ')
    var flockName2=linkInfo[2].replace(/%7C/g,'|')
    console.log('eventId',eventId,'flockName',flockName,'flockName2',flockName2)
    this.checkAuth(eventId,flockName2,flockName)
 
 }
 checkAuth = (eventId,flockName2,flockName) => {
  firebase.auth().onAuthStateChanged((user) => {
   if (user) {
    console.log('userrrrrrrr',user)
     var userId=user.uid
     this.setState({userId})
     this.getDetails(eventId,flockName2,flockName)
   } else {
     Router.push('/')
   }
 })
}
 getDetails=(eventId,flockName2,flockName)=>{
  console.log('eventId 0002',eventId,'flockName',flockName)
  var uniqueFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+eventId+'/unique/'+flockName2)
  uniqueFlockNamesRef.once('value', dataSnapshot => {
    var theData=dataSnapshot.val()
    console.log('theData000',theData)
    this.setState({creatorName:theData.creatorName,creatorId:theData.creatorId,eventTitle:theData.eventName,flockName,startTime:theData.startTime,sportType:theData.sportType,eventId,flockName2,detailsReady:true})
    //console.log('creatorName',creatorName)
   })
 }
 confirm=()=>{
  var userFlockData={'creator':this.state.creatorId,'name':this.state.flockName2}
  var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId+'/members')
  var generalDb = firebase.database().ref()
  membersFlockNamesRef.child(this.state.flockName2).child(this.state.userId).set(this.state.creatorName)
  generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.eventId).set(userFlockData,(error) => {
    if (!error){
      this.setState({sucessSubmiting:true})
    }
    })
  //console.log('')
  //var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId+'/members')
  //membersFlockNamesRef.child(this.state.flockName2).child(this.state.userId).set(this.state.creatorName)
 }
   
  render() {
    return (
      <div className={styles.container}>
        <Community/>
        {this.state.detailsReady?<div className={styles.modal}>
        <div className={styles.inviteModal}>
        <MdClose className={styles.closeIC} onClick={()=>this.setState({detailsReady:false})}/>
         <p className={styles.inviteP1}>Confirm Flock Invite</p>
         <p className={styles.inviteP2}>{this.state.creatorName} is inviting you to join his "{this.state.flockName}" RAM Fantasy Tournament Flock for the {this.state.eventTitle} event on {new Date(this.state.startTime).toDateString()}.</p>
         <p className={styles.inviteP3}>Click on the button below to confirm</p>
         <button onClick={()=>this.confirm()}>CONFIRM</button>
        </div>
        </div>:null}
        {this.state.sucessSubmiting?<div className={styles.modal}>
        <div className={styles.inviteModal}>
        <MdClose className={styles.closeIC} onClick={()=>Router.push('/community')}/>
         <p className={styles.inviteP1}>Success!</p>
         <p className={styles.inviteP2}>Success! You have joined the "{this.state.flockName}" RAM Fantasy Tournament Flock! Keep inviting other friends, family, and coworkers to form your flock all the way up until the event start time.</p>
         <button onClick={()=>Router.push('/community')}>CLOSE</button>
        </div>
        </div>:null}
      </div>
    )
  }
}

export default withRouter(invite)