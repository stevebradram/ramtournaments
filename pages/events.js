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
import LogIn from '../components/LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../components/FirebaseClient'
import dayjs from 'dayjs';
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
var selectedRamUfcArray=[],selectedNflArray=[],selectedMarchMadnesArray=[]
var myPhoto='https://images.pexels.com/photos/26150470/pexels-photo-26150470/free-photo-of-brunette-man-posing-wearing-black-suit-jacket-and-white-shirt-with-arms-crossed.jpeg?auto=compress&cs=tinysrgb&w=600'
const mainCard=[
    {id:1,time:'Nov 3 2024, 03:00PM',player1:'Brandon Moreno-Mexico',p1Points:'1.42',player2:'Amir Albazi-Iraq',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',status2:'',bet:'player1',winner:'player1',match:'Mens Flyweight'},
    {id:2,time:'Nov 3 2024, 03:00PM',player1:'Erin Blanchfield-USA',p1Points:'1.42',player2:'Rose Namajunas-USA',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player3.png',p2Photo:'player4.png',status1:'ongoing',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
    {id:3,time:'Nov 3 2024, 03:00PM',player1:'Derrick Lewis-USA',p1Points:'1.42',player2:'Jhonata Diniz-Brazil',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player5.png',p2Photo:'player6.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Heavyweight'},
    {id:4,time:'Nov 3 2024, 03:00PM',player1:'Caio Machado-Brazil',p1Points:'1.42',player2:'Brendson Ribeiro-Brazil',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player7.png',p2Photo:'player8.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Light Heavyweight'},
    {id:5,time:'Nov 3 2024, 03:00PM',player1:'Marc Andre Barriault-Canada',p1Points:'1.42',player2:'Dustin Stoltzfus-USA',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player9.png',p2Photo:'player10.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Middleweight'},
    {id:6,time:'Nov 3 2024, 03:00PM',player1:'Mike Malott-Canada',p1Points:'1.42',player2:'Trevin Giles-USA',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player11.png',p2Photo:'player12.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Welterweight'},
    ]
    const prelims=[
      {id:1,time:'Nov 3 2024, 03:00PM',player1:'Aiemann-Zahabi-Canada',p1Points:'1.42',player2:'Pedro Munhoz-Brazil',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',status2:'',bet:'player1',winner:'player1',match:'Mens Bantamweight'},
      {id:2,time:'Nov 3 2024, 03:00PM',player1:'Ariane Da Silva-Brazil',p1Points:'1.42',player2:'Jasmine Jasudavicius-Canada',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'ongoing',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
      {id:3,time:'Nov 3 2024, 03:00PM',player1:'Charles Jourdain-Canada',p1Points:'1.42',player2:'Victor Henry-USA',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Bantamweight'},
      {id:4,time:'Nov 3 2024, 03:00PM',player1:'Jack Shore-Wales',p1Points:'1.42',player2:'Youssef Zalal-Morocco',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Featherweight'},
      {id:5,time:'Nov 3 2024, 03:00PM',player1:'Alexandr Romanov-Moldova',p1Points:'1.42',player2:'Rodrigo Nascimento-Brazil',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Heavyweight'},
      {id:6,time:'Nov 3 2024, 03:00PM',player1:'Serhiy Sidey-Ukraine',p1Points:'1.42',player2:'Garrett Armfield-USA',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Bantamweight'},
      {id:7,time:'Nov 3 2024, 03:00PM',player1:'Chad Anheliger-Canada',p1Points:'1.42',player2:'Cody Gibson-USA',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Bantamweight'},
      {id:8,time:'Nov 3 2024, 03:00PM',player1:'Jamey Lyn Horth-Canada',p1Points:'1.42',player2:'Ivana Petrovic-Croatia',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
      ]
      const theEvents=[
        {id:1,name:'RAM UFC'},
        {id:2,name:'NCAAF'},
        {id:3,name:'NFL Playoffs'},
        {id:4,name:'March Madness'},
        
      ]

class events extends Component {
  state={theMenu:'maincard',theItems:[],opendetailsModal:false,getRamDetails:false,dataAvailable:'',theEvent:'Current Events',currentID:1,
    theRamUfc:'',theMarchMadness:false,theNfl:false,theFifa:'',userId:'',userLoggedIn:false,selectedEvent:'RAM UFC',eventToShow:false,
    teamName:'',flockName:'',openLoginModal:false,clickHere1:'CLICK HERE TO MAKE YOUR PICKS',clickHere2:'CLICK HERE TO ENTER THE GAME', 
    currentScore:'',bestPossibleScore:'',currentRank:'',editDetailsModal:false,profilePhoto:'',theCurrentEvent:'ramUfc',pastEventsAvailable:false,
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
    if(name==='NFL Playoffs')return
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
          if(item.name==='March Madness'&&this.state.theMarchMadness===false){colorP='#b2b2b2',clickable=false}
          if(item.name==='NCAAF'&&this.state.theRamUfc===false){colorP='#b2b2b2',clickable=false}
          if(item.name==='NFL Playoffs'&&this.state.theNfl===true){colorP='#b2b2b2',clickable=false}
          if(item.name==='RAM UFC'&&this.state.theRamUfc===false){colorP='#b2b2b2',clickable=false}
          if(item.name==='ALL'&&this.state.theRamUfc===false){colorP='#b2b2b2',clickable=false}
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
        </div>
          {this.state.selectedEvent==='RAM UFC'?<RamUfc isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NCAAF'?<NCAA isUserLoggedIn={this.state.userLoggedIn}/>:null}
          {this.state.selectedEvent==='NFL Playoffs'?<NFL isUserLoggedIn={this.state.userLoggedIn}/>:null}
      </div>
      </>
    )
  }
}

export default events