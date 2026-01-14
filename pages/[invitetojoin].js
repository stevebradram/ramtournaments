import React, { Component } from 'react'
import styles from "@/styles/Invite.module.scss";
import Community from './community'
import { MdClose } from "react-icons/md";
import Router,{useRouter,withRouter} from 'next/router'
import firebase from '../components/FirebaseClient'
import LogIn from '../components/LogInReg/LogIn2'
import Meta from '../components/Meta'
import { ToastContainer, toast } from 'react-toastify';
class invite extends Component {
  state={creatorName:'',creatorId:'',eventTitle:'',flockName:'',flockNameWithSpaces:'',flockNameWithoutSpaces:'',startTime:'',sportType:'',eventId:'',userId:'',detailsReady:false,sucessSubmiting:false,userLoggedIn:false,openLogInModal1:true,myName:'',myEmail:'',myPhoneNo:''}
 componentDidMount(){
   this.getLinkAuthDetails()
 
 }
 getLinkAuthDetails=()=>{
  if(!window)return
  //console.log('routerr',decodeURIComponent(window.location.href))
  var linkInfo = decodeURIComponent(window.location.href).split("/");
  linkInfo=linkInfo.pop().split("~")
  var eventId=linkInfo[1]
  var flockNameWithSpaces=linkInfo[2].split('|').join(' ')
  var flockNameWithoutSpaces=linkInfo[2]//.replace(/%7C/g,'|')
  var creatorId=linkInfo[3]
  //console.log('linkInfo',creatorId,linkInfo)
  //console.log('eventId',eventId,'flockNameWithSpaces',flockNameWithSpaces,'flockNameWithoutSpaces',flockNameWithoutSpaces)
 
  this.checkAuth(eventId,flockNameWithoutSpaces,flockNameWithSpaces)
  this.setState({flockNameWithSpaces})
  this.getEventDetails(creatorId,eventId)
 }
 checkAuth = (eventId,flockNameWithoutSpaces,flockNameWithSpaces) => {
  firebase.auth().onAuthStateChanged((user) => {
   if (user) {
    //console.log('userrrrrrrr',user)
     var userId=user.uid
     this.getUserDetails(userId)
     this.setState({userId,userLoggedIn:true})
     //this.getDetails(eventId,flockNameWithoutSpaces,flockNameWithSpaces)
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
   //console.log('myName',myName)
  })
 }
 chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
 getEventDetails=(creatorId,eventId)=>{
 //var uniqueFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+eventId+'/unique/'+flockNameWithoutSpaces)
  var theSplitNo=Math.ceil(creatorId.length/4)
  var userIdChunk=this.chunkString(creatorId,theSplitNo)
  var generalDb = firebase.database().ref()
 // var userIdLink=userIdChunk[2]+userIdChunk[0]+userIdChunk[1]+userIdChunk[3]
  var userIdLink=userIdChunk[1]+userIdChunk[2]+userIdChunk[0]+userIdChunk[3]
  console.log('userIdLink yyyyyyyyyyyyyy',userIdLink)
  generalDb.child('users/'+userIdLink+'/flockData/flockNames/'+eventId+'/name/')
      .once('value', dataSnapshot => {
        console.log('userIdLink dataSnapshot',dataSnapshot.val())
        var name=dataSnapshot.val()
        var flockNameWithSpaces=name.split('|').join(' ')
        var flockNameWithoutSpaces=name
        this.getDetails(eventId,flockNameWithoutSpaces,flockNameWithSpaces)
      })
  
 }
 getDetails=(eventId,flockNameWithoutSpaces,flockNameWithSpaces)=>{
  var uniqueFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+eventId+'/unique/'+flockNameWithoutSpaces)
  uniqueFlockNamesRef.once('value', dataSnapshot => {
    var theData=dataSnapshot.val()
    this.setState({creatorName:theData.creatorName,creatorId:theData.creatorId,eventTitle:theData.eventName,flockNameWithSpaces,startTime:theData.startTime,sportType:theData.sportType,eventId,flockNameWithoutSpaces,detailsReady:true})
   })
 }
 getAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     var userId=user.uid
     this.setState({userId,userLoggedIn:true})
     this.confirm()
    
   } else {
    this.setState({userLoggedIn:false})
    // Router.push('/')
   }
 })
}
 checkTime=()=>{
   var timeInfoDb=firebase.database().ref('/theEvents/eventsIds/'+this.state.eventId+'/time/')
   timeInfoDb.once('value',dataSnapshot=>{
     var theEventTime=dataSnapshot.val()
     if((new Date().getTime()>theEventTime)){
       this.notify('Link Expired. Event already started')
       setTimeout(() => {
        Router.push('/')
      }, 3000);
      }else{
        this.getAuth()
      }
    })
 }
 confirm=()=>{
  console.log('daaaaata',this.state.userId,this.state.sportType,this.state.eventId,this.state.flockNameWithSpaces)
  //return
   var generalDb=firebase.database().ref()
   var generalDb2=firebase.database().ref()

   var eventRef = firebase.database().ref('/theEvents/eventsIds/'+this.state.sportType+'/'+this.state.eventId)
   var i = 0, upcomingGames = [], pastGames = [], allGames = []
   var nowDate =  new Date().getTime()
   eventRef.once('value', dataSnapshot => {
   
  })
  generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.eventId)
      .once('value', dataSnapshot => {
        if (dataSnapshot.exists()) {
          this.notify('You are already a flock member of this event')
          Router.push('/community')
        }else{
          generalDb2.child('/users/'+this.state.userId+'/ramData/events/'+this.state.sportType+'/'+this.state.eventId)
        .once('value', dataSnapshot => {
          if (dataSnapshot.exists()){
            var detailsRef=generalDb2.child('users/'+this.state.userId+'/ramData/events/'+this.state.sportType+'/'+this.state.eventId+'/details/flockName/')
            detailsRef.set(this.state.flockNameWithSpaces)
           }})

  var toAdmin='$$$'+this.state.myName+'!!'+this.state.flockNameWithSpaces+'!!'+this.state.myEmail+'!!'+this.state.myPhoneNo
  var userFlockData={'creator':this.state.creatorId,'name':this.state.flockNameWithoutSpaces,'link':window.location.href}
  var scoreData={BPS:0,score:0,ramName:this.state.myName,picked:false}

  var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId)
  var adminRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId+'/admin')
  var generalDb = firebase.database().ref()
  
 
     //var scoreData={BPS:0,score:0,ramName:this.state.creatorName,picked:false}
     generalDb.child('users/'+this.state.userId+'/ramData/events/'+this.state.sportType+'/'+this.state.eventId+'/details/')
     .once('value', dataSnapshot => {
       if (dataSnapshot.exists()){
         console.log('existenceeeeeeee')
       
         if(this.state.sportType==='NCAAB'){
         var theData=dataSnapshot.val()
         var theBPS=theData.bestPossibleScore
         var theMenu=theData.theMenu
         var currentSelection=theData.currentPick
         var teamName=theData.teamName
         var thePick='',bps2=''
         if(currentSelection==='round1'){thePick='round1Pick',bps2='round1BPS'}
         if(currentSelection==='round2'){thePick='round2Pick',bps2='round2BPS'}

         var scoreData2={BPS:theBPS,score:0,
           round1Score:'0',round2Score:'0',finalRoundScore:'0',
           sweet16Score:'0',elite8Score:'0',final4Score:'0',
           currentPick:currentSelection,theMenu:theMenu,[bps2]:theBPS,
           ramName:teamName,picked:true,[thePick]:true}
           console.log('existenceeeeeeee',scoreData2)
           
         var detailsRef=generalDb.child('users/'+this.state.userId+'/ramData/events/'+this.state.sportType+'/'+this.state.eventId+'/details/')
         detailsRef.child('/flockName/').set(this.state.flockName)
         membersFlockNamesRef.child('/membersScores/'+this.state.flockNameWithoutSpaces).child(this.state.userId).update(scoreData2)
         }else{
          
           var theData=dataSnapshot.val()
           var theBPS=theData.bestPossibleScore
           var teamName=theData.teamName
           var scoreData2={BPS:theBPS,score:0,picked:true,ramName:teamName}
        var detailsRef=generalDb.child('users/'+this.state.userId+'/ramData/events/'+this.state.sportType+'/'+this.state.eventId+'/details/')
         detailsRef.child('/flockName/').set(this.state.flockName)
         membersFlockNamesRef.child('/membersScores/'+this.state.flockNameWithoutSpaces).child(this.state.userId).update(scoreData2)
         }
        }
        else{
          
          membersFlockNamesRef.child('/membersScores/'+this.state.flockNameWithoutSpaces).child(this.state.userId).update(scoreData)
         }
      })
  
  adminRef.child(this.state.userId).set(toAdmin)
  membersFlockNamesRef.child('/members/'+this.state.flockNameWithoutSpaces).child(this.state.userId).set('$$$'+this.state.myName)
 
  //membersFlockNamesRef.child('/membersScores/'+this.state.flockNameWithoutSpaces).child(this.state.userId).update(scoreData)
 
  generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.eventId).set(userFlockData,(error) => {
    if (!error){
      this.setState({sucessSubmiting:true})
    }
    })
  }
})
  ////console.log('')
  //var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.eventId+'/members')
  //membersFlockNamesRef.child(this.state.flockNameWithoutSpaces).child(this.state.userId).set(this.state.creatorName)
 }
 handleChildClick = (title) => {
  this.setState({ count: this.state.count + 1});
  //this.notify('Account created successfully')
  this.getLinkAuthDetails()
};
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
};
  render() {
    return (
      <>
      <Meta title='RAM Tournaments - Flock invite link' description={'Click on this link to join this Flock'}/>
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
         <p className={styles.inviteP2}>{this.state.creatorName} is inviting you to join his "{this.state.flockNameWithSpaces}" RAM Fantasy Tournament Flock for the {this.state.eventTitle} event on {new Date(this.state.startTime).toDateString()}.</p>
         <p className={styles.inviteP3}>Click on the button below to confirm</p>
         <button onClick={()=>this.checkTime()}>CONFIRM</button>
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
       <ToastContainer/></>
    )
  }
}

export default withRouter(invite)