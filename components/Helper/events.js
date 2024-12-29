import React, { Component } from 'react'
import style from "@/styles/Events.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from '../components/Event/DetailsModal'
import EditDetails from '../components/Event/DetailsModalCopy'
import LogIn from '../components/LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../components/FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
var selectedRamUfcArray=[],selectedNflArray=[],selectedMarchMadnesArray=[]
var myPhoto='https://images.pexels.com/photos/26150470/pexels-photo-26150470/free-photo-of-brunette-man-posing-wearing-black-suit-jacket-and-white-shirt-with-arms-crossed.jpeg?auto=compress&cs=tinysrgb&w=600'
const mainCard=[
    {id:1,time:'Nov 3 2024, 03:00PM',player1:'Brandon Moreno-Mexico',p1Rec:'21-8-2',p1Points:'1.42',player2:'Amir Albazi-Iraq',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',status2:'',bet:'player1',winner:'player1',match:'Mens Flyweight'},
    {id:2,time:'Nov 3 2024, 03:00PM',player1:'Erin Blanchfield-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Rose Namajunas-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player3.png',p2Photo:'player4.png',status1:'ongoing',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
    {id:3,time:'Nov 3 2024, 03:00PM',player1:'Derrick Lewis-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Jhonata Diniz-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player5.png',p2Photo:'player6.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Heavyweight'},
    {id:4,time:'Nov 3 2024, 03:00PM',player1:'Caio Machado-Brazil',p1Rec:'21-8-2',p1Points:'1.42',player2:'Brendson Ribeiro-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player7.png',p2Photo:'player8.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Light Heavyweight'},
    {id:5,time:'Nov 3 2024, 03:00PM',player1:'Marc Andre Barriault-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Dustin Stoltzfus-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player9.png',p2Photo:'player10.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Middleweight'},
    {id:6,time:'Nov 3 2024, 03:00PM',player1:'Mike Malott-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Trevin Giles-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player11.png',p2Photo:'player12.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Welterweight'},
    ]
    const prelims=[
      {id:1,time:'Nov 3 2024, 03:00PM',player1:'Aiemann-Zahabi-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Pedro Munhoz-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',status2:'',bet:'player1',winner:'player1',match:'Mens Bantamweight'},
      {id:2,time:'Nov 3 2024, 03:00PM',player1:'Ariane Da Silva-Brazil',p1Rec:'21-8-2',p1Points:'1.42',player2:'Jasmine Jasudavicius-Canada',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'ongoing',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
      {id:3,time:'Nov 3 2024, 03:00PM',player1:'Charles Jourdain-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Victor Henry-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Bantamweight'},
      {id:4,time:'Nov 3 2024, 03:00PM',player1:'Jack Shore-Wales',p1Rec:'21-8-2',p1Points:'1.42',player2:'Youssef Zalal-Morocco',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Featherweight'},
      {id:5,time:'Nov 3 2024, 03:00PM',player1:'Alexandr Romanov-Moldova',p1Rec:'21-8-2',p1Points:'1.42',player2:'Rodrigo Nascimento-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Heavyweight'},
      {id:6,time:'Nov 3 2024, 03:00PM',player1:'Serhiy Sidey-Ukraine',p1Rec:'21-8-2',p1Points:'1.42',player2:'Garrett Armfield-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Mens Bantamweight'},
      {id:7,time:'Nov 3 2024, 03:00PM',player1:'Chad Anheliger-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Cody Gibson-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Bantamweight'},
      {id:8,time:'Nov 3 2024, 03:00PM',player1:'Jamey Lyn Horth-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Ivana Petrovic-Croatia',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'played',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
      ]
      const theEvents=[
        {id:1,name:'RAM UFC'},
        {id:2,name:'NFL Playoffs'},
        {id:3,name:'March Madness'},
      ]

class events extends Component {
  state={theMenu:'maincard',theItems:[],opendetailsModal:false,getRamDetails:false,dataAvailable:'',theEvent:'Current Events',currentID:1,
    theRamUfc:'',theMarchMadness:false,theNfl:false,theFifa:'',userId:'',userLoggedIn:false,selectedEvent:'RAM UFC',eventToShow:false,
    teamName:'',flockName:'',openLoginModal:false,clickHere1:'CLICK HERE TO MAKE YOUR PICKS',clickHere2:'CLICK HERE TO ENTER THE GAME', 
    currentScore:'',bestPossibleScore:'',currentRank:'',editDetailsModal:false,profilePhoto:'',theCurrentEvent:'ramUfc',pastEventsAvailable:false,
    eventRamUfc:'',eventMarchMadness:'',eventNfl:'',ramUfcMaincardArray:[],
    ramUfcPrelimsArray:[],nflArray:[],marchMadnessArray:[],ufcSubHeadings:''
  }
  componentDidMount=()=>{
    this.checkAuth()
    //this.getRam2Info()
    //this.getGamesInfo()
  }
  checkAuth = () => {
    var profilePhoto=localStorage.get('profilePhoto')
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       var userId=user.uid
       this.setState({userId,userLoggedIn:true})
       if(userId){this.getUserInfo(userId)}
       
     }else{
      this.setState({userLoggedIn:false})
      this.getGamesInfo()
     }
   })
 }
 getGamesInfo=async()=>{
  var userInfoDb=firebase.database().ref('/events/')
  
  await  userInfoDb.once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      if(theInfo.ramUfc!==false){this.setState({eventRamUfc:true,ufcSubHeadings:theInfo.ramUfc.split(':')});this.getUfcItems('ramUfc');console.log('is there ufc',theInfo.ramUfc)}
      if(theInfo.marchMadness===true){this.setState({eventMarchMadness:true}),this.getNflMarchMadnessItems('marchMadness','marchMadnessArray')}
      if(theInfo.nfl===true){this.setState({eventNfl:true}),this.getNflMarchMadnessItems('nfl','nflArray')}
      
    })
}
getUfcItems=async(name)=>{
    var userInfoDb=firebase.database().ref('/activeEvents/').child(name)
    
    userInfoDb.once('value',dataSnapshot=>{
      console.log('children count',dataSnapshot.child('mainCard').numChildren());
      console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var mainCardCount=dataSnapshot.child('mainCard').numChildren()
      var prelimsCount=dataSnapshot.child('prelims').numChildren()
      var theInfo=dataSnapshot.val()
      console.log('the event eventSelection',theInfo) 
      if(theInfo.mainCard){
        var array1 = []
        console.log('iko maincarddddd',theInfo.mainCard)
        var i=0
        for (var key in theInfo.mainCard) {
          i++
         var theData=theInfo.mainCard[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===mainCardCount){
          console.log('whole maincard Array',array1)
          this.setState({ramUfcMaincardArray:array1})
          this.setState({theItems:array1})
         }}}
      if(theInfo.prelims){
        var array1 = []
        console.log('iko prelimsssssss')
        var i=0
        for (var key in theInfo.prelims) {
          i++
         var theData=theInfo.prelims[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===prelimsCount){
          console.log('whole prelimms Array',array1)
          this.setState({ramUfcPrelimsArray:array1})
         }
        }
        //prelimsArray
      }else{
        console.log('hakuna prelimsssssss')
      }
    })
  }
  getNflMarchMadnessItems=async(name,theArr)=>{
    var userInfoDb=firebase.database().ref('/activeEvents/').child(name)
    userInfoDb.once('value',dataSnapshot=>{
      var count=dataSnapshot.numChildren()
      var theInfo=dataSnapshot.val()
      console.log('the event eventSelection',theInfo) 
      if(theInfo){
        var array1 = []
        console.log('iko maincarddddd',theInfo)
        var i=0
        for (var key in theInfo) {
          i++
         var theData=theInfo[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===count){
          console.log('whole maincard Array',array1)
          this.setState({[theArr]:array1})
         }}}
    })
  }
  getUserInfo=async(userId)=>{
    console.log('proofile photohhhhhhhhhhhhhhh',userId)
    var photoRefDb=firebase.database().ref('/users/').child(userId).child('profilePhoto')
    await  photoRefDb.once('value',dataSnapshot=>{
       console.log('proofile photo',dataSnapshot.val())
       if (dataSnapshot.val()) {
         this.setState({profilePhoto:dataSnapshot.val()})
       }
    })
    var userInfoDb=firebase.database().ref('/users/').child(userId).child("activeEvents")
    await  userInfoDb.once('value',dataSnapshot=>{
        var theInfo=dataSnapshot.val()
        console.log('the games info',theInfo)
        this.setState({theRamUfc:theInfo.ramUfc,theMarchMadness:theInfo.marchMadness,theNfl:theInfo.nfl,theFifa:theInfo.fifa})
        if(theInfo.ramUfc!=='selected'&&theInfo.marchMadness!=='selected'&&theInfo.nfl!=='selected'){
          console.log('hakuna kitu inadonjo')
          this.getGamesInfo()
        }else{
          this.setState({dataAvailable:true,clickHere1:'CLICK HERE TO EDIT YOUR PICKS',clickHere2:'CLICK HERE TO EDIT THE GAME'})
          if(theInfo.ramUfc==='selected'){ this.getRamInfo(userId,'ramUfc')}
          if(theInfo.marchMadness==='selected'){ this.getRamInfo(userId,'marchMadness')}
          if(theInfo.nfl==='selected'){ this.getRamInfo(userId,'nfl')}
        }
        return
       
        
      })
  }
  getRamInfo=async(userId,event)=>{
    var userInfoDb=firebase.database().ref('/users/'+userId).child('upcomingEvents').child(event)
    userInfoDb.once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      if(event==='ramUfc'){selectedRamUfcArray=theInfo}
      if(event==='marchMadness'){selectedMarchMadnesArray=theInfo}
      if(event==='nfl'){selectedNflArray=theInfo}
      //hapa ndo nimefika
      //console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank=''
      if(theInfo.currentRank===false){currentRank='N/A'}else{currentRank=theInfo.currentRank}
      this.setState({flockName:theInfo.flockName,teamName:theInfo.teamName,currentScore:theInfo.currentScore,
        bestPossibleScore:theInfo.bestPossibleScore,currentRank:currentRank,theItems:theInfo.eventSelection
    })
    this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })
    return
  
      this.setState({theRamUfc:theRamUfc,theMarchMadness,theNfl,theFifa})
    this.setState({ theRamUfc: theRamUfc }, () => {
      //console.log('theRamUfc 99999999999999',this.state.theRamUfc);
    }); 
    //console.log('this.state.theRamUfc 2525',this.state.theRamUfc)
    var userInfoDb=firebase.database().ref('/users/'+userId).child('upcomingEvents')
    if(theRamUfc==='selected'){
      this.setState({dataAvailable:true,clickHere1:'CLICK HERE TO EDIT YOUR PICKS',clickHere2:'CLICK HERE TO EDIT THE GAME'})
    userInfoDb.child('ramUfc').once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      //console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank=''
      if(theInfo.currentRank===false){currentRank='N/A'}else{currentRank=theInfo.currentRank}
      this.setState({flockName:theInfo.flockName,teamName:theInfo.teamName,currentScore:theInfo.currentScore,
        bestPossibleScore:theInfo.bestPossibleScore,currentRank:currentRank,theItems:theInfo.eventSelection
    })
    this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })}
    else{this.setState({theItems:mainCard})}
  }
  getCurrentScore=async(theItems)=>{
    var i=0, theAmount=[]
   theItems.map((item,index)=>{
    var amount=0
    //console.log('kufinish kumalo 1')
    i++
    if(item.status1==='played'){
      //console.log('kufinish kumalo 2',item.bet,item.winner)
      if(item.bet==='player1'&&item.winner==='player1'){
        amount=Number(item.p1Points)
        theAmount.push(amount)
        //console.log('kufinish kumalo 3')
      }
      if(item.bet==='player2'&&item.winner==='player2'){
        amount=Number(item.p2Points)
        theAmount.push(amount)
        //console.log('kufinish kumalo 4')
      }
     
      //console.log('kufinish kumalo 4B',i,theItems.length)
      if(i===theItems.length){
        //console.log('kufinish kumalo 5')
        const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
        //console.log('the current Score',sum)
        this.setState({currentScore:sum.toFixed(2)})
      }
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
  chooseEvent=(name)=>{
    if(name==='March Madness'){this.setState({theCurrentEvent:'marchMadness'})}
    if(name==='NFL Playoffs'){this.setState({theCurrentEvent:'nfl'})}
    if(name==='RAM UFC'){this.setState({theCurrentEvent:'ramUfc'})}
  }
  render() {
    //console.log('this.state.dataAvailable',this.state.dataAvailable)
    //console.log('theMarchMadness',this.state.theMarchMadness)
    //console.log('theNfl',this.state.theNfl)
   // var itemsToShowOnModal=''
   var flockTeamName=''
   var itemToModals=''
    if(this.state.dataAvailable){flockTeamName=this.state.teamName+'::'+this.state.flockName}
    else{flockTeamName=false}
    //itemToModals=this.state.ramUfcMaincardArray
    if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    //ramUfcMaincardArray
    return (
      <><div className={style.container}>
        <div className={style.eventsCont}>
        <p className={style.eventsP} id={this.state.theEvent==='Current Events'?style.playerP1:style.playerP} onClick={()=>this.setState({theEvent:'Current Events'})}>CURRENT EVENTS</p>
        <p className={style.eventsP} style={{color:this.state.pastEventsAvailable?null:'#b2b2b2',borderColor:this.state.pastEventsAvailable?null:'#b2b2b2'}} id={this.state.theEvent==='Past Events'?style.playerP1:style.playerP} onClick={()=>this.state.pastEventsAvailable?this.setState({theEvent:'Past Events'}):null}>PAST EVENTS</p>
        </div>
        <div className={style.eventsDiv}>
        {theEvents.map((item,index)=>{
          //console.log('rraaaaaa',item.name,this.state.theMarchMadness,this.state.theNfl,this.state.theRamUfc)
          var colorP='',clickable=true
          if(item.name==='March Madness'&&this.state.theMarchMadness===false){colorP='#b2b2b2',clickable=false}
          if(item.name==='NFL Playoffs'&&this.state.theNfl===false){colorP='#b2b2b2',clickable=false}
          if(item.name==='RAM UFC'&&this.state.theRamUfc===false){colorP='#b2b2b2',clickable=false}
          return(
            <div key={index} onClick={()=>this.chooseEvent(item.name)}>
              {/*item==='March Madness'&&this.state.theMarchMadness===false?null:null}
              {item==='NFL Playoffs'&&this.state.theNfl===false?null:null}
              {item==='RAM UFC'&&this.state.theRamUfc===false?null:null*/}
              
              <p className={style.listP} style={{color:colorP,borderColor:colorP}} id={this.state.selectedEvent===item.name?style.playerP3:style.playerP} onClick={()=>clickable?this.setState({selectedEvent:item.name}):null} >{item.name}</p>
            
            </div>
          )})}</div>
          <div className={style.profileDiv}>
          <div className={style.imageDiv}>
          {this.state.profilePhoto.length?<img src={this.state.profilePhoto}/>:
          <IoPersonSharp className={style.personIC}/>}
          </div>
          <div className={style.detailsDiv}>
            <p>RAM Name: {this.state.dataAvailable?this.state.teamName:'N/A'}</p>
            <p>Flock Name: {this.state.dataAvailable?this.state.flockName:'N/A'}</p>
            {this.state.dataAvailable?<p id={style.editP} onClick={()=>this.setState({editDetailsModal:true})}>Edit Profile</p>:<p id={style.editP} onClick={()=>this.openTheModal()}>Make Picks</p>}
            </div>
          </div>
          <p className={style.eveP}>Event: <span>RAM UFC</span></p>
          <div className={style.picksDiv} onClick={()=>this.openTheModal()}>
            {/*<p className={style.picksP}>CLICK HERE MAKE YOUR PICKS</p>*/}
            {this.state.dataAvailable?
            <TypeAnimation
      sequence={[
        'CLICK HERE TO MAKE YOUR PICKS',
        2000,
        'CLICK HERE TO ENTER THE GAME',
        2000
      ]}
      wrapper="span"
      speed={50}
      className={style.picksP}
      repeat={Infinity}
    />:<TypeAnimation
    sequence={[
      'CLICK HERE TO EDIT YOUR PICKS',
      2000,
      'CLICK HERE TO EDIT THE GAME',
      2000
    ]}
    wrapper="span"
    speed={50}
    className={style.picksP}
    repeat={Infinity}
  />}
            </div>
          
                <div className={style.eveDiv}>
                  {this.state.ufcSubHeadings[0]==='MAIN CARD'?<p id={this.state.theMenu==='maincard'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'maincard',theItems:mainCard})}>MAIN CARD</p>:null}
                  {this.state.ufcSubHeadings[1]==='PRELIMS'?<p id={this.state.theMenu==='prelims'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'prelims',theItems:prelims})}>PRELIMS</p>:null}
                  {this.state.ufcSubHeadings[2]==='EARLY PRELIMS'?<p id={this.state.theMenu==='earlyPrelims'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'earlyPrelims',theItems:earlyPrelims})}>EARLY PRELIMS</p>:null}
                  
                </div>
        <div className={style.scoresCont}>
        <div className={style.scoresCont1}>
          <p className={style.scoreP1}>Best possibe Score:</p>
          <p className={style.scoreP2}>{this.state.dataAvailable?this.state.bestPossibleScore:'0.00'} points</p>
        </div>
        <div className={style.scoresCont2}>
        <p className={style.scoreP1}>Current Score</p>
        <p className={style.scoreP2}>{this.state.dataAvailable?this.state.currentScore:'0.00'} points</p>
        </div>
        <div className={style.scoresCont3}>
        <p className={style.scoreP1}>Current Rank in RAM UFC</p>
        <p className={style.scoreP2}>{this.state.dataAvailable?this.state.currentRank:'N/A'}</p>
        </div>
        </div>
        
        {/*<p className={style.eveP}>Event: <span>RAM UFC</span></p>
                <div className={style.eveDiv}>
                  <p id={this.state.theMenu==='maincard'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'maincard',theItems:mainCard})}>MAIN CARD</p>
                  <p id={this.state.theMenu==='prelims'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'prelims',theItems:prelims})}>PRELIMS</p>
                </div>*/}
        <div className={style.listCont}>
        {this.state.theItems.map((item,index)=>{
          var player1=item.player1.split('-')
          var player2=item.player2.split('-')
          var playStat=''
          var playStatCol=''
          if(item.status1==='notPlayed'){playStat='Upcoming Event',playStatCol='#292f51'}
          if(item.status1==='ongoing'){playStat='Ongoing Event',playStatCol='#CB1E31'}
          if(item.status1==='played'){playStat='Past Event',playStatCol='#919191'}
          var statP1=item.winner==='player1'?'Won':'Lost'
          var statP2=item.winner==='player2'?'Won':'Lost'
          var player1Color=''
          var player2Color=''
           var myOutcome='LOST',myOutcomeSpan='+0',myOutcomeCol='#CB1E31'
          if(item.winner==='player1'){player1Color='#1ecb97'}else{player1Color='#CB1E31'}
          if(item.winner==='player2'){player2Color='#1ecb97'}else{player2Color='#CB1E31'}
          if(item.winner==='player1'&&item.bet==='player1'){myOutcome='WON',myOutcomeSpan='+'+item.p1Points,myOutcomeCol='#1ecb97'}
          if(item.winner==='player2'&&item.bet==='player2'){myOutcome='WON',myOutcomeSpan='+'+item.p2Points,myOutcomeCol='#1ecb97'}
          //myOutcome
          var myPick=''
          if(item.bet==='player1'){myPick=player1[0]}
          if(item.bet==='player2'){myPick=player2[0]}
          return(
         <div className={style.listDiv} key={index}>
                <div className={style.theCont0}>
                      <div className={style.theCont01}>
                        <p>{item.game} - {item.match}</p>
                        <p>{item.time}</p>
                      </div>
                      
                      {item.status1==='notPlayed'?<div className={style.theCountDiv}><Countdown date={1731829983000} className={style.theCount}/></div>:
                      <p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>}
                      <div className={style.theCont}>
                      <div className={style.theContLeft}>
                        <div className={style.imgDiv} style={{borderColor:item.status1==='played'?player1Color:'transparent'}}>
                      <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img>
                      {item.status1==='played'?<p className={style.gameP} style={{backgroundColor:item.winner==='player1'?'#1ecb97':'#CB1E31'}}>{statP1}</p>:null}
                      </div>
                      <p className={style.P1}>{player1[0]}</p>
                      <p className={style.countryP}>{player1[1]}</p>
                      <p className={style.P2}>{item.p1Rec}</p>
                      </div>
                      <BsFillLightningFill className={style.sepIc}/>
                      <div className={style.theContRight}>
                      <div className={style.imgDiv} style={{borderColor:item.status1==='played'?player2Color:'transparent'}}>
                      <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img>
                      {item.status1==='played'?<p className={style.gameP} style={{backgroundColor:item.winner==='player2'?'#1ecb97':'#CB1E31'}}>{statP2}</p>:null}
                      </div>
                      <p className={style.P1}>{player2[0]}</p>
                      <p className={style.countryP}>{player2[1]}</p>
                      <p>{item.country}</p>
                      <p className={style.P2}>{item.p2Rec}</p>
                      </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {this.state.dataAvailable?<div className={style.statDiv}>
                        <p className={style.pickP}>Your Pick: <span style={{color:item.status1==='played'?myOutcomeCol:null}}>{myPick}</span></p>
                        <p className={style.statP}>Outcome: {item.status1==='played'?<><span className={style.statS1} style={{color:myOutcomeCol}}>{myOutcome}</span><span className={style.statS2} style={{color:myOutcomeCol}}>{myOutcomeSpan}</span></>:<span>N/A</span>}</p>
                        <p></p>
                      </div>:
                      <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={()=>this.openTheModal()}>MAKE YOUR PICK</button></div>
                      /*<div className={style.thePickDiv}><p className={style.thePickP}>MAKE YOUR PICK</p></div>*/
                     }
                      </div>
         </div>
          )})}
        </div>
      </div>
      {this.state.opendetailsModal?<div className={style.detailsModal} onClick={()=>this.setState({opendetailsModal:false})}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={itemToModals} flockTeamName={flockTeamName}/></div>:null}
      {this.state.openLoginModal?<div className={style.detailsModal} onClick={()=>this.setState({openLoginModal:false})}><LogIn/></div>:null}
      {this.state.editDetailsModal?<div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({editDetailsModal:false})} ><EditDetails theDetails={this.state.teamName+'::'+this.state.flockName+'::'+this.state.profilePhoto+'::'+this.state.theCurrentEvent}/></div>:null}
      </>
    )
  }
}

export default events