import React, { Component } from 'react'
import styles from './CreateLeagueModal.module.scss'
import { MdLockOutline ,MdArrowDropDown ,MdInfoOutline,MdOutlineAddBox,MdOutlinePersonOutline,MdOutlineClose   } from "react-icons/md";
import firebase from '../FirebaseClient'
import localStorage from 'local-storage'
import Router from 'next/router';
import { IoPersonSharp } from "react-icons/io5";
import { FcManager } from "react-icons/fc";
import { RiEdit2Fill } from "react-icons/ri";
import Resizer  from "react-image-file-resizer";
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../Helper/ProgressBar'
import { IoPersonOutline } from "react-icons/io5";
import copy from 'copy-to-clipboard';
var theDetails=''
class DetailsModal extends Component {
  state={leagueName:'',leagueId:'',flockName:'',buttonClick:true,showProgressBar:false,userId:'',flockNameErr:'',leagueNameErr:'',createdEvent:false,theEventsArr:[],startTime:'',sportType:'',
    theLink:'',eventsArrModal:false,creatorName:'',creatorEmail:"",creatorPhoneNo:''}
  componentDidMount=()=>{
    this.checkAuth()
  }
  inputChange = async (e) => {
    var value = e.target.value
    console.log('theId', e.target.id)
    value=value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, ' ');
    await this.setState({[e.target.id]: value})
      if (e.target.id ==='flockName'){
        console.log('hapa tu',e.target.id)
        if (this.state.flockName.length>=3){this.setState({flockNameErr:''})}
      }
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
      console.log('userrrrrrrr',user)
       var userId=user.uid
       this.getUserDetails(userId)
       this.setState({userId})
     } else {
       Router.push('/')
     }
   })
 }
 getUserDetails=(userId)=>{
  var userRef = firebase.database().ref('/users/'+userId+'/userData/')
  userRef.once('value', dataSnapshot => {
   var creatorName=dataSnapshot.val().name
   var creatorEmail=dataSnapshot.val().email
   var creatorPhoneNo=dataSnapshot.val().phoneNo
   this.setState({creatorName,creatorEmail,creatorPhoneNo})
   console.log('creatorName',creatorName)
  })
 }
 checkEvents=()=>{
  console.log('theEventsArr 0001')
  if(this.state.eventsArrModal===true){this.setState({eventsArrModal:false});return}
  var eventsDbRef =firebase.database().ref('/theEvents/eventsIds/')
  var currentTimeInMillis=new Date().getTime()
  var theEventsArr=[]
  eventsDbRef.once('value', dataSnapshot => {
    var count = dataSnapshot.numChildren()
    var i=0
    dataSnapshot.forEach((data,index) => {
      i++
      var eventStartTime=data.val().time
    if(eventStartTime>currentTimeInMillis){
       var theData={startTime:eventStartTime,id:data.key,title:data.val().title,sportType:data.val().sportType}
       theEventsArr.push(theData)
      if(theEventsArr.length>=1){
        this.setState({theEventsArr,eventsArrModal:true})
      }else{
        this.notify('No upcoming events at the moment')
      }
    }
    if(count===i){
      console.log('theEventsArr',theEventsArr,theEventsArr.length)
      //eventsArrModal
    }
    })
  })
 }
  chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
  submitDetails=()=>{
    console.log('sport type',this.state.sportType)
    
    //return
    var theSplitNo=Math.ceil(this.state.userId.length/4)
    var userIdChunk=this.chunkString(this.state.userId,theSplitNo)
    var userIdLink=userIdChunk[2]+userIdChunk[0]+userIdChunk[1]+userIdChunk[3]
    console.log('chunkString',this.chunkString(this.state.userId,theSplitNo),userIdLink)
    this.showProgressBar(3000)
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
    if (!this.state.buttonClick) return
    this.buttonClickStat(2000)
    if(!this.state.userId)return
    console.log('looooooooobo 111')
    console.log('looooooooobo',this.state.leagueName.length,this.state.flockName.length)
    var uniqueFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.leagueId+'/unique')
    var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.leagueId)
    var adminRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.leagueId+'/admin')
    var generalDb = firebase.database().ref()
    // var gamesDataRef = firebase.database().ref('users/'+this.state.userId+'/ramData/events/'+this.state.currentEvent+'/'+this.props.theEventKey+'/details/')
    
    if (this.state.leagueName.length<3){this.setState({leagueNameErr:'League Name must be 3 characters and above'});return}else{this.setState({leagueNameErr:''})}
    if (this.state.flockName.length<3){this.setState({flockNameErr:'Flock Name must be 3 characters and above'});return}else{this.setState({flockNameErr:''})}
    var flockNameWithNoSpaces=this.state.flockName.replace(/ /g,"|")
    var theArr={creatorName:this.state.creatorName,creatorId:this.state.userId,eventName:this.state.leagueName,eventId:this.state.leagueId,startTime:this.state.startTime,sportType:this.state.sportType}
    uniqueFlockNamesRef.child(flockNameWithNoSpaces).once('value', dataSnapshot => {
     if(dataSnapshot.exists()){
      var creatorId=dataSnapshot.val()
      if(creatorId===this.state.userId){
        this.notify('You have already created a similar flock name')
        this.setState({flockName:''})
      }else{
        this.notify('Flock Name Already Exists')
        this.setState({flockName:''})
      }
     
     }else{
      generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.leagueId)
      .once('value', dataSnapshot => {
        if (dataSnapshot.exists()) {
          console.log('the flock data exists',dataSnapshot.val().creator)
        var theData=dataSnapshot.val()
        var creator=theData.creator
        if(creator===this.state.userId){
          this.notify('You have already created a flock name for this event')
          this.setState({flockName:''})
        }else{
          this.notify('You are already a flock member of this event')
          this.setState({flockName:''})
        }
      }else{
        var startLink=''
          if(this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'){
            startLink='http://localhost:3000/'
          }else{
            startLink='https://ramtournament.com/'
          }
      var toAdmin='$$$'+this.state.creatorName+'!!'+this.state.flockName+'!!'+this.state.creatorEmail+'!!'+this.state.creatorPhoneNo
      var scoreData={BPS:0,score:0,ramName:this.state.creatorName,picked:false}
      var theFlockData={creator:this.state.userId,membersNo:0,score:0,avScore:0}
      var theFlockData2={creator:this.state.userId,membersNo:0,score:0,avScore:0,
        round1MembersNo:0,round1Score:0,round1AvScore:0,round2MembersNo:0,round2Score:0,round2AvScore:0,
        finalRoundMembersNo:0,finalRoundScore:0,finalRoundAvScore:0}
      var theLink=startLink+'invitetojoin~'+this.state.leagueId+'~'+flockNameWithNoSpaces+'~'+userIdLink
      var userFlockData={'creator':this.state.userId,'name':flockNameWithNoSpaces,'link':theLink}
      membersFlockNamesRef.child('/members/'+flockNameWithNoSpaces).child(this.state.userId).set('$$$'+this.state.creatorName)
      adminRef.child(this.state.userId).set(toAdmin)
      generalDb.child('users/'+this.state.userId+'/flockData/flockNames/'+this.state.leagueId).set(userFlockData)
      generalDb.child('/flocksSystem/flockNames/'+this.state.leagueId+'/flockCreators/'+this.state.userId).set(flockNameWithNoSpaces)
      
      if(this.state.sportType==='NCAAB'){
        generalDb.child('/flocksSystem/flockNames/'+this.state.leagueId+'/theFlocks/'+flockNameWithNoSpaces).update(theFlockData2)
      }else{
        generalDb.child('/flocksSystem/flockNames/'+this.state.leagueId+'/theFlocks/'+flockNameWithNoSpaces).update(theFlockData)
      }
      membersFlockNamesRef.child('/membersScores/'+flockNameWithNoSpaces).child(this.state.userId).update(scoreData)
      uniqueFlockNamesRef.child(flockNameWithNoSpaces).set(theArr,(error) => {
        if (!error){
          
          this.setState({theLink,createdEvent:true})
          console.log('theLink',this.state.leagueId,theLink)
          this.notify('Event Created Succesfully')
          //this.props.onClick('closeLeagueModal')
        }
     })
    }
  })
  }
    })

     //'http://localhost:3000/invitetojoin~UFC312Event~NairobiKnockoutFlock'
    

     return
     /* if(this.state.leagueName!==theDetails[0]||this.state.flockName!==theDetails[1]){
      var theTeamName=this.state.teamName.replace(/ /g,"_")
      var theFlockName=this.state.flockName.replace(/ /g,"_")
      var theOldTeamName=theDetails[0].replace(/ /g,"_")
        console.log('the verdict something has changed')
        uniqueRamNamesRef.child(theTeamName).once('value',dataSnapshot=>{
          console.log('is thereee db',dataSnapshot)
          var theInfo=dataSnapshot.val()
          console.log('is thereee',theInfo)
          if(!theInfo){
            uniqueRamNamesRef.child(theTeamName).set(this.state.userId)
            uniqueFlockNamesRef.child(theFlockName).set(this.state.userId)
            gamesDataRef.child('flockName').set(this.state.flockName)
            gamesDataRef.child('teamName').set(this.state.teamName,(error) => {
              if (error) {
                console.log('AN ERROR OCCURED WHILE POSTING UFC RESULTS TO FIREBASE',)
              } else {
                console.log('POSTING UFC RESULTS TO FIREBASE WAS SUCCESSFUL') 
                uniqueRamNamesRef.child(theOldTeamName).set(null);
                if(this.state.profilePhoto!==theDetails[2]){
                  console.log('UPLOADING PHOTO')
                  this.savePhoto()
                }else{
                  Router.push('/reload')
                }        
              }
            })
          }else{
            if(theInfo===this.state.userId){
              uniqueRamNamesRef.child(theTeamName).set(this.state.userId)
              uniqueFlockNamesRef.child(theFlockName).set(this.state.userId)
              gamesDataRef.child('flockName').set(this.state.flockName)
              gamesDataRef.child('teamName').set(this.state.teamName,(error) => {
                if (error) {
                  console.log('AN ERROR OCCURED WHILE POSTING UFC RESULTS TO FIREBASE',)
                } else {
                  console.log('POSTING UFC RESULTS TO FIREBASE WAS SUCCESSFUL') 
                  uniqueRamNamesRef.child(theOldTeamName).set(null);
                  if(this.state.profilePhoto!==theDetails[2]){
                    console.log('UPLOADING PHOTO')
                    this.savePhoto()
                  }else{
                    Router.push('/reload')
                  }        
                }
              })
            }else{
              this.notify('RAM Name already taken')
              this.setState({leagueNameErr:'RAM Name already taken, please try another one'})
              console.log('change that shit')
            }
           
          }

       })
      }*/
   }
   doNothing=(event)=>{
    //event.preventDefault()
    //event.stopPropagation()
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
};
buttonClickStat=(time)=>{
  this.setState({buttonClick:false})
  this.timerHandle = setTimeout(
    () => this.setState({buttonClick:true}), 
    time)
}
showProgressBar = (time) => {
  this.setState({ showProgressBar: true})
  this.timerHandle = setTimeout(
    () => this.setState({ showProgressBar: false }),
    time)
}
openFlockModal=()=>{
  if (navigator.onLine === false) {
    this.notify('No internet! please check your internet connection')
    return
  }
  this.setState({flockNameModal:!this.state.flockNameModal})
}
copyLink=()=>{
  //navigator.clipboard.writeText(this.state.theLink)
  copy(this.state.theLink);
  this.notify('Link copied successfully')
}
closeModal=()=>{
  this.props.onClick('closeLeagueModal')
  Router.push('/community')
}

//this.props.onClick('closeLeagueModal')
  render() {
    
    return (
      <>
      <div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
      <MdOutlineClose className={styles.closeIC} onClick={()=>this.props.onClick('closeLeagueModal')}/>
      {!this.state.createdEvent?
             <h1>Enter Flock Details</h1>:<h1 style={{color:'red',textAlign:'left'}}>Flock Created Successfully!</h1>}
                    <div className={styles.nameCont}>
                    <p className={styles.P1}>Event Name</p>
                    <MdInfoOutline className={styles.nameIC}/>
                    </div>
                    {!this.state.createdEvent?<div className={styles.cont1}>
                    <div className={styles.cont1B} onClick={()=>this.checkEvents()}><MdOutlinePersonOutline    className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Choose your Event name' type='text' id='leagueName' value={this.state.leagueName} style={{color:'#000'}} readOnly></input>  
                    <MdArrowDropDown className={styles.dropIcon}/>
                    </div>
                    {this.state.eventsArrModal?<div className={styles.theEventsArrModal}>
                     {this.state.theEventsArr.length>0?this.state.theEventsArr.map((item,index)=>{
                      return(
                        <p key={index} className={styles.eventsNameList} onClick={()=>this.setState({leagueName:item.title,eventsArrModal:false,leagueId:item.id,startTime:item.startTime,sportType:item.sportType})}>{item.title}</p>
                      )
                     }):null}
                    </div>:null}
                    </div>:
                    <div className={styles.cont1}>
                    <MdOutlinePersonOutline    className={styles.logInIcon}/>
                    <input  className={styles.logInInput} type='text' id='leagueName' value={this.state.leagueName} style={{color:'#000'}} readOnly></input>
                    </div>}
                    <p className={styles.pErr}>{this.state.leagueNameErr}</p>
                    <div className={styles.nameCont}>
                    <p className={styles.P1}>Flock Name</p>
                    <MdInfoOutline className={styles.nameIC}/>
                    </div>
                    <div className={styles.cont2} onClick={()=>this.openFlockModal()}>
                    <MdOutlinePersonOutline    className={styles.logInIcon}/> 
                    {!this.state.createdEvent?<><input  className={styles.logInInput} placeholder='Enter your Flock Name'  type='text' id='flockName' value={this.state.flockName} style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input></>:
                    <input  className={styles.logInInput}  type='text'  value={this.state.flockName} style={{color:'#000'}} readOnly></input>}   
                    </div>
                    <p className={styles.pErr}>{this.state.flockNameErr}</p>
                    <div className={styles.theTextsDiv}>{!this.state.createdEvent?<p className={styles.whyP}>Why? Creating a Flock will activate your “My Leagues” page for engaging in the world’s best sporting events with your coworkers, friends, and/or family.</p>:<p className={styles.whyP} style={{color:'black'}}>To add members to your Flock, simply copy/paste this link via text or email with your coworkers, friends, and/or family:</p>}
                    {!this.state.createdEvent?<p id={styles.nextP}>Next Steps? After you click submit, you can copy and share your Join My Flock link via a group text or email to build your league.</p>:<p id={styles.nextP} style={{color:'blue',cursor:'pointer'}} onClick={() => this.copyLink()}>{this.state.theLink}</p>}</div>
                    {!this.state.createdEvent?<button className={styles.logInBtn} onClick={()=>this.state.buttonClick?this.submitDetails():null}>SUBMIT</button>
                    : <button className={styles.logInBtn} onClick={()=>this.closeModal()}>CLOSE</button>}
                </div>
                {this.state.showProgressBar ? <ProgressBar /> : null}
                <ToastContainer/>
                </>
    )
  }
}

export default DetailsModal