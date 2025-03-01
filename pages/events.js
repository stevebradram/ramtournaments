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
import MarchMadness from '../components/Event/MarchMadness'
import LogIn from '../components/LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../components/FirebaseClient'
import dayjs from 'dayjs';
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
var selectedRamUfcArray=[],selectedNflArray=[],selectedMarchMadnesArray=[]
      const theEvents=[
        {id:1,name:'RAM UFC'},
        {id:2,name:'NCAAF'},
        {id:3,name:'NFL Playoffs'},
        {id:4,name:'March Madness'},
        
      ]

class events extends Component {
  state={theMenu:'maincard',theItems:[],opendetailsModal:false,getRamDetails:false,dataAvailable:'',theEvent:'Current Events',currentID:1,
    theRamUfc:false,theMarchMadness:false,theNfl:false,theNcaaf:false,theFifa:'',userId:'',userLoggedIn:false,selectedEvent:'RAM UFC',eventToShow:false,
    teamName:'',flockName:'',openLoginModal:false,clickHere1:'CLICK HERE TO MAKE YOUR PICKS',clickHere2:'CLICK HERE TO ENTER THE GAME', 
    currentScore:'',bestPossibleScore:'',currentRank:'',editDetailsModal:false,profilePhoto:'',theCurrentEvent:'marchMadness',pastEventsAvailable:false,
    eventRamUfc:'',eventMarchMadness:'',eventNfl:'',ramUfcMaincardArray:[],
    ramUfcPrelimsArray:[],nflArray:[],marchMadnessArray:[],ufcSubHeadings:'',
    allGames:[],theEventTitle:'',theEventKey:'',sportType:'',theTime:'',endTime:''
  }
  componentDidMount=()=>{
    this.checkAuth()
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       var userId=user.uid
       this.setState({userId,userLoggedIn:true})
       this.checkForAllEvents()
     }else{
      this.setState({userLoggedIn:false})
      this.checkForAllEvents()
     }
   })
 }
  hideModal = () => {
    this.setState({opendetailsModal:false})
    //console.log('Button clicked!');
  };
  openTheModal= () => {
    if(this.state.userLoggedIn===true){
      this.setState({opendetailsModal:true,openLoginModal:false})
    }else{
      this.setState({openLoginModal:true,opendetailsModal:false})
    }
  }
  checkForAllEvents=async()=>{
    var userInfoDb=firebase.database().ref('/theEvents/eventsIds')
    var allGames=[]
    await  userInfoDb.once('value',dataSnapshot=>{
      var theCount=dataSnapshot.numChildren()
      var i=0
      dataSnapshot.forEach((data) => {
        i++
        var key=data.key
        var time=data.val().time
        var title=data.val().title
        var sportType=data.val().sportType
        var endTime=data.val().endTime
  
         var theItem={id:key,time:time,title:title,sportType:sportType,endTime:endTime}
         allGames.push(theItem)
        
        if(theCount===i){
          var theEventTitle='',theEventKey='',sportType='',theTime='',endTime=0
          if(allGames.length>0){
            allGames=allGames.sort(function(a, b){return b.time - a.time});
            theEventTitle=allGames[0]['title'];sportType=allGames[0]['sportType'],theEventKey=allGames[0]['id'],theTime=allGames[0]['time'],endTime=allGames[0]['endTime']
            this.setState({allGames,theEventTitle,theEventKey,sportType,theTime,endTime},()=>{
              this.loadOtherEvents(theEventKey,sportType)
            })
          }
        }
      });
  })   
  }
  chooseEvent=(name)=>{
    if(name==='March Madness'){this.setState({theCurrentEvent:'marchMadness'})}
    if(name==='NFL Playoffs'){this.setState({theCurrentEvent:'nfl'})}
    if(name==='RAM UFC'){this.setState({theCurrentEvent:'ramUfc'})}
    if(name==='NCAAF'){this.setState({theCurrentEvent:'NCAAF'})}
  }
  loadOtherEvents=(id,sportType)=>{
  if(sportType==='NCAAF'){this.setState({selectedEvent:sportType})}
  if(sportType==='ramUfc'){this.setState({selectedEvent:'RAM UFC'})}
  }
  render() {
    var isPastEvent=''
    var todayInMillis=new Date().getTime()
    if(this.state.endTime<todayInMillis&&(this.state.endTime-todayInMillis)<-86400000){
     isPastEvent=false
    }else{ isPastEvent=true}
    return (
      <><div className={style.container}>
        <div className={style.eventsDiv}>
        {theEvents.map((item,index)=>{
          var colorP='',clickable=true
          if(item.name==='March Madness'&&this.state.theMarchMadness===true){colorP='#b2b2b2',clickable=false}
          if(item.name==='NCAAF'&&this.state.theNcaaf===true){colorP='#b2b2b2',clickable=false}
          if(item.name==='NFL Playoffs'&&this.state.theNfl===true){colorP='#b2b2b2',clickable=false}
          if(item.name==='RAM UFC'&&this.state.theRamUfc===true){colorP='#b2b2b2',clickable=false}
          //if(item.name==='ALL'&&this.state.theRamUfc===false){colorP='#b2b2b2',clickable=false}
          return(
            <div key={index} onClick={()=>this.chooseEvent(item.name)}>
              <p className={style.listP} style={{color:colorP,borderColor:colorP}} id={this.state.selectedEvent===item.name?style.playerP3:style.playerP} onClick={()=>clickable?this.setState({selectedEvent:item.name}):null} >{item.name}</p>
            </div>
          )})}</div>
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
        </div><div style={{marginTop:10}}>
          {this.state.selectedEvent==='RAM UFC'?<RamUfc isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NCAAF'?<NCAA isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NFL Playoffs'?<NFL isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='March Madness'?<MarchMadness isUserLoggedIn={this.state.userLoggedIn}/>:null}
          </div>
      </div>
      </>
    )
  }
}

export default events