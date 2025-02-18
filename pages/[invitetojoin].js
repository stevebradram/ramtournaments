import React, { Component } from 'react'
import styles from "@/styles/Invite.module.scss";
import Community from './community'
import { MdClose } from "react-icons/md";
import Router,{useRouter,withRouter} from 'next/router'
import firebase from '../components/FirebaseClient'
import LogIn from '../components/LogInReg/LogIn2'
class invite extends Component {
  state={creatorName:'',creatorId:'',eventTitle:'',flockName:'',flockName2:'',startTime:'',sportType:'',eventId:'',userId:'',detailsReady:false,sucessSubmiting:false,userLoggedIn:false,openLogInModal1:true,myName:'',myEmail:'',myPhoneNo:''}
 componentDidMount(){
   this.getLinkAuthDetails()
 
 }
 getLinkAuthDetails=()=>{
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
     this.getUserDetails(userId)
     this.setState({userId,userLoggedIn:true})
     this.getDetails(eventId,flockName2,flockName)
   } else {
    this.setState({userLoggedIn:false})
    // Router.push('/')
   }
 })
}

 getUserDetails=(userId)=>{
  var userRef = firebase.database().ref('/users/'+userId+'/userData/')
  userRef.once('value', dataSnapshot => {
   var myName=dataSnapshot.val().name
   var myEmail=dataSnapshot.val().email
   var myPhoneNo=dataSnapshot.val().phoneNo
   this.setState({myName,myEmail,myPhoneNo})
   console.log('myName',myName)
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
   var generalDb=firebase.database().ref()
  generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.eventId)
      .once('value', dataSnapshot => {
        if (dataSnapshot.exists()) {
          this.notify('You are already a flock member of this event')
        }else{
  var toAdmin='$$$'+this.state.myName+'!!'+this.state.myEmail+'!!'+this.state.myPhoneNo
  var userFlockData={'creator':this.state.creatorId,'name':this.state.flockName2,'link':window.location.href}
  var scoreData={BPS:0,score:0,ramName:this.state.myName,picked:false}
  var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId)
  var adminRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId+'/admin')
  var generalDb = firebase.database().ref()
  adminRef.child(this.state.userId).set(toAdmin)
  membersFlockNamesRef.child('/members/'+this.state.flockName2).child(this.state.userId).set('$$$'+this.state.myName)
  membersFlockNamesRef.child('/membersScores/'+flockNameWithNoSpaces).child(this.state.userId).update(scoreData)
  generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.eventId).set(userFlockData,(error) => {
    if (!error){
      this.setState({sucessSubmiting:true})
    }
    })
  }
})
  //console.log('')
  //var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId+'/members')
  //membersFlockNamesRef.child(this.state.flockName2).child(this.state.userId).set(this.state.creatorName)
 }
 handleChildClick = (title) => {
  this.setState({ count: this.state.count + 1});
  //this.notify('Account created successfully')
  this.getLinkAuthDetails()
};
  render() {
    return (
      <div className={styles.container}>
        <Community/>
        {!this.state.userLoggedIn?
        <>
         <div className={styles.modal}>
          {this.state.openLogInModal1?<div className={styles.inviteModal}>
        <MdClose className={styles.closeIC} onClick={()=>Router.push('/')}/>
         <p className={styles.inviteP1}>You're not logged in!</p>
         <p className={styles.inviteP2}>In order to confirm this invite link you have to be Logged In. Please register or Log In to continue</p>
         <p className={styles.inviteP3}>Click on the button below to Login/Register</p>
         <button onClick={()=>this.setState({openLogInModal1:false})}>LOG IN</button>
        </div>:<LogIn onClick={this.handleChildClick}/>}</div>
        {/*<div className={styles.modal}><LogIn/></div>*/}</>
        :
        <>{this.state.detailsReady?<div className={styles.modal}>
        <div className={styles.inviteModal}>
        <MdClose className={styles.closeIC} onClick={()=>Router.push('/')}/>
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
        </div>:null}</>}
       
      </div>
    )
  }
}

export default withRouter(invite)