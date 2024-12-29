import React, { Component } from 'react'
import style from "./RamUfc.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from './DetailsModal'
import EditDetails from './DetailsModalCopy'
import LogIn from '../LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import axios from "axios"
var allMatches=[]
var selectedRamUfcArray=[],selectedNflArray=[],selectedMarchMadnesArray=[]
class RamUfc extends Component {
  state={theMenu:'mainCard',theItems:[],opendetailsModal:false,getRamDetails:false,dataAvailable:false,theEvent:'Upcoming Events',currentID:1,
    theRamUfc:'',theMarchMadness:false,theNfl:false,theFifa:'',userId:'',userLoggedIn:false,selectedEvent:'RAM UFC',eventToShow:false,
    teamName:'',flockName:'',openLoginModal:false,clickHere1:'CLICK HERE TO MAKE YOUR PICKS',clickHere2:'CLICK HERE TO ENTER THE GAME', 
    currentScore:'',bestPossibleScore:'',currentRank:'',editDetailsModal:false,profilePhoto:'',theCurrentEvent:'ramUfc',pastEventsAvailable:false,
    eventRamUfc:'',eventMarchMadness:'',eventNfl:'',ramUfcMaincardArray:[],pastGames:[],theEventTitle:'',theEventKey:'',ramUfcEarlyPrelimsArray:[],
    ramUfcPrelimsArray:[],nflArray:[],marchMadnessArray:[],ufcSubHeadings:'',upcomingGames:[],currentEventUserInfo:{},allMatches:[]
  }
  componentDidMount=()=>{
   
    this.checkAuth()
  //this.getRanking()
  //this.checkForOddsUpdate()
  
  }
      checkForOddsUpdate=async () => {
        console.log('checking daaaaaaaaaaata 111')
      try {
        var theLink='theEvents::ramUfc::'+this.state.theEventKey
       
        var theQuery=encodeURIComponent(theLink) 
        console.log('checking daaaaaaaaaaata 222',theQuery)
        await axios.get("http://localhost:4000/updateUfcOdds?term="+theQuery)
          .then((res) => {
            var theItems = res.data.result
            console.log('theItems',theItems)
            
          })
          } catch (error) {
            console.log('error',error)
          }
      }
  getRanking = async() => {
    var eventsArr={},betsArr={}
    var theDbEvent=firebase.database().ref('/theEvents/ramUfc/ufc-fight-night-november-23-2024-November232024/mainCard/')
    var theUserBets=firebase.database().ref('/userBets/ramUfc/ufc-fight-night-november-23-2024-November232024/mainCard/')
    var scoreBoardDb=firebase.database().ref('/userBets/scoreBoards/ramUfc/ufc-fight-night-november-23-2024-November232024/mainCard/')
    var v=0,allUsersBetsArr={},sumtotalArr=[]
    await theDbEvent.once('value',dataSnapshot=>{
      var eventsCount = dataSnapshot.numChildren();
      //console.log('eventsCount',eventsCount)
      dataSnapshot.forEach((data2) => {
        v++
        var theId2=data2.key
        var theObj2=data2.val()
        eventsArr[theId2]=theObj2
        if(eventsCount===v){
          //console.log('eventsArr',eventsArr)
          var i=0
           theUserBets.once('value',dataSnapshot=>{
            var betsCount = dataSnapshot.numChildren();
            dataSnapshot.forEach((data) => {
              i++
              var userId=data.key
              var betsObj=data.val()
              //console.log('userId',userId)
              //console.log('betsObj',betsObj)
              betsArr[userId]=betsObj
              var userArr=[],k=0
              for(var key in betsObj){
                k++
                var value=betsObj[key]
                //console.log('bets key',key)
                //console.log('bets value',value)
                var q=0
                for(var key2 in eventsArr){
                  q++
                  //console.log('bets key2',key2)
                  //console.log('bets value 2',eventsArr[key2])
                  var eventVal=eventsArr[key2]
                  var theWinner=eventVal['winner']
                  var p1Points=eventVal['p1Points']
                  var p2Points=eventVal['p2Points']
                 // console.log('theWinner',eventsArr.length)
                  //console.log('p1Points',p1Points)
                  //console.log('p2Points',p2Points)
                  if(key===key2){
                    var thePoint=0
                    if(value===theWinner){
                      if(theWinner==='player1'){thePoint=p1Points}
                      if(theWinner==='player2'){thePoint=p2Points}
                      userArr.push(thePoint)
                    }else{
                      userArr.push(thePoint)
                    }
                   
                  }
                  if(eventsCount===q){
                   
                  }
                }
                /*//console.log('bets key',key)
                //console.log('bets value',betsObj[key])
                //console.log('eventsArr',eventsArr[key]['winner'])*/
                if(betsCount===k){
                  var pointsSum = userArr.reduce((partialSum, a) => partialSum + a, 0);
                  pointsSum=Number(pointsSum.toFixed(2))
                  var theItem={}
                  theItem[userId]=pointsSum
                  //sumtotalArr.push(theItem)
                  sumtotalArr[userId]=pointsSum
                  console.log('userArr 2222',theItem)
                 
                }
              }
              if(betsCount===i){
                console.log('sumtotalArr',sumtotalArr)
                scoreBoardDb.set(sumtotalArr)
                console.log('hureeeeeeeeeeeeeeeeeeeeeee')
              }
            })
          })
        }
      })})
    /* await  theUserBets.once('value',dataSnapshot=>{
      var betsCount = dataSnapshot.numChildren();
      var i=0
      dataSnapshot.forEach((data) => {
        i++
        var theId=data.key
        var theObj=data.val()
        betsArr[theId]=theObj
       
        if(betsCount===i){
          var v=0
          theDbEvent.once('value',dataSnapshot=>{
            var eventsCount = dataSnapshot.numChildren();
            //console.log('eventsCount',eventsCount)
            dataSnapshot.forEach((data2) => {
              v++
              var theId2=data2.key
              var theObj2=data2.val()
              eventsArr[theId2]=theObj2
              if(betsCount===v){
                //this.sortTheBetArrays(betsArr,betsCount,eventsArr,eventsCount)
              }
            })})
        }
      })})*/
  }
  sortTheBetArrays=(betsArr,betsCount,eventsArr,eventsCount) => {
    //console.log('sortTheBetArrays betsCount',betsCount)
    //console.log('sortTheBetArrays eventsCount',eventsCount)
    //console.log('sortTheBetArrays eventsArr',eventsArr)
    //console.log('sortTheBetArrays betsArr',betsArr)
    for(var key in betsArr){
      //console.log('bets key',key)
      //console.log('bets value',betsArr[key])
    }
  }
  checkAuth = () => {
    var profilePhoto=localStorage.get('profilePhoto')
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       this.setState({userId,userLoggedIn:true})
       if(userId){this.checkUpcomingPastGames(userId)}
       
     }else{
      this.setState({userLoggedIn:false})
      //this.getGamesInfo()
      this.checkUpcomingPastGames(userId)
     }
   })
 }
 checkUpcomingPastGames=async(userId)=>{
  //return
  var userInfoDb=firebase.database().ref('/theEvents/ramUfc/eventsIds')
  var i=0,upcomingGames=[],pastGames=[]
  var nowDate= await new Date().getTime()
  //console.log('nowDate',nowDate)
  await  userInfoDb.once('value',dataSnapshot=>{
    dataSnapshot.forEach((data) => {
      var pastG={},upcomingG={}
      var key=data.key
      var time=data.val().time
      var title=data.val().title
      //console.log('key',key,'value',time,dataSnapshot.size)
        if(nowDate>time){
          pastG={id:key,time:time,title:title}
          pastGames.push(pastG)
        }
        if(nowDate<time){
          upcomingG={id:key,time:time,title:title}
          upcomingGames.push(upcomingG)
        }
        //console.log('upcomingGames',upcomingGames)
        //console.log('pastGames',pastGames)
    });
    })
    var theEventTitle='',theEventKey=''
    if(pastGames.length>0){pastGames=pastGames.sort(function(a, b){return a.time - b.time});}
    if(upcomingGames.length>0){upcomingGames=upcomingGames.sort(function(a, b){return a.time - b.time});theEventTitle=upcomingGames[0]['title'];theEventKey=upcomingGames[0]['id']}
    
    await this.setState({pastGames,upcomingGames,theEventTitle,theEventKey},()=>{
      this.getUfcMatches(userId)
    })
    //console.log('upcomingGames 2222',upcomingGames)
    //console.log('pastGames 222',pastGames)
    //console.log('theEventTitle',theEventTitle,theEventKey)
   
}
getUfcMatches=async(userId)=>{
  allMatches=[]
  this.setState({ramUfcMaincardArray:[],ramUfcPrelimsArray:[],ramUfcEarlyPrelimsArray:[],theMenu:'mainCard',dataAvailable:false,currentEventUserInfo:{}})
  var userInfoDb=firebase.database().ref('/theEvents/ramUfc/').child(this.state.theEventKey)
  await userInfoDb.once('value',dataSnapshot=>{
    //console.log('children count',dataSnapshot.child('mainCard').numChildren());
    //console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
    var mainCardCount=dataSnapshot.child('mainCard').numChildren()
    var prelimsCount=dataSnapshot.child('prelims').numChildren()
    var earlyPrelimsCount=dataSnapshot.child('earlyPrelims').numChildren()
    var theInfo=dataSnapshot.val()
    //console.log('the event eventSelection',theInfo) 
    if(theInfo.mainCard){
      var array1 = []
      //console.log('iko maincarddddd',theInfo.mainCard)
      var i=0
      for (var key in theInfo.mainCard) {
        i++
       var theData=theInfo.mainCard[key]
       var array2={theId:key,...theData}
       array1.push(array2)
       if(i===mainCardCount){
        //console.log('whole maincard Array',array1)
        this.setState({ramUfcMaincardArray:array1,theItems:array1,allMatches:[...array1]})
        //console.log('allMatchessss',this.state.theItems)
        //var matches={[this.state.theEventKey+'ramUfcMaincardArray']:array1}
        //allMatches.push(matches)
       }}}
    if(theInfo.prelims){
      var array1 = []
      //console.log('iko prelimsssssss')
      var i=0
      for (var key in theInfo.prelims) {
        i++
       var theData=theInfo.prelims[key]
       var array2={theId:key,...theData}
       array1.push(array2)
       if(i===prelimsCount){
        //console.log('whole prelimms Array',array1)
        this.setState({ramUfcPrelimsArray:array1,allMatches:[...array1]})
       // var matches={[this.state.theEventKey+'ramUfcPrelimsArray']:array1}
       // allMatches.push(matches)
       }
      } 
      //prelimsArray
    }else{
      //console.log('hakuna prelimsssssss')
    }
    if(theInfo.earlyPrelims){
      var array1 = []
      //console.log('iko earlyPrelims')
      var i=0
      for (var key in theInfo.earlyPrelims) {
        i++
       var theData=theInfo.earlyPrelims[key]
       var array2={theId:key,...theData}
       array1.push(array2)
       if(i===earlyPrelimsCount){
        //console.log('whole early prelimms Array',array1)
        this.setState({ramUfcEarlyPrelimsArray:array1,allMatches:[...array1]})
        //var matches={[this.state.theEventKey+'ramUfcEarlyPrelimsArray']:array1}
        //allMatches.push(matches)
        ////console.log('allMatchesssssssssss',allMatches)
       }
      }
    }else{
      //console.log('hakuna early prelimsssssss')
    }
  })
  //console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
  if(this.state.userId.length<3)return
  this.getMatchesInfo(this.state.userId)
  

  //this.checkForOddsUpdate()
}
getMatchesInfo=async(userId)=>{
  var selectedMatchesKeyDb=firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/ramUfc/"+this.state.theEventKey+'/')
  var photoRefDb=firebase.database().ref('/users/').child(userId+'/userData/').child('profilePhoto')
  var userInfoDb=firebase.database().ref('/users/').child(userId).child("/ramData/events/ramUfc/"+this.state.theEventKey+'/details/'+this.state.theMenu+'/')
  var userBetsDb=firebase.database().ref('/users/').child(userId).child("/ramData/events/ramUfc/"+this.state.theEventKey+'/bets/'+this.state.theMenu+'/')
  var gamesDataRef = firebase.database().ref('users/').child(userId+'/ramData/').child('/events/ramUfc/')
  var currentEventUserInfo=''
  await  selectedMatchesKeyDb.once('value',dataSnapshot=>{
    //console.log('the key',dataSnapshot.val())
    if (!dataSnapshot.val())return
    photoRefDb.once('value',dataSnapshot=>{
      //console.log('proofile photo',dataSnapshot.val())
      if (dataSnapshot.val()) {
        this.setState({profilePhoto:dataSnapshot.val()})
    }})
    userInfoDb.once('value',dataSnapshot=>{
      if (!dataSnapshot.val())return
      //console.log('the type user info',dataSnapshot.val().flockName)
      if (dataSnapshot.val()) {
        this.setState({currentEventUserInfo:dataSnapshot.val()})
        currentEventUserInfo=dataSnapshot.val()
        
  }})
  userBetsDb.once('value',dataSnapshot=>{
    //console.log('the bets data',dataSnapshot.val())
    //console.log('this.state.theItems',this.state.theItems)
    if (!dataSnapshot.val())return 
    var itemsCount=dataSnapshot.numChildren()
    //console.log('it count',itemsCount)
    var i=0, thePoints=[],currentScore=[]
    dataSnapshot.forEach((data,index) => {
      i++
      this.state.theItems.map((item)=>{
       if(item.id===data.key){
        //console.log('thank you sir')
        item['bet']=data.val()
        if(item.status1==='played'){
          if(data.val()==='player1'){currentScore.push(item.p1Points);}
        if(data.val()==='player2'){currentScore.push(item.p2Points);}
        }
        if(data.val()==='player1'){thePoints.push(item.p1Points);//console.log('the points',item.p1Points)
          }
        if(data.val()==='player2'){thePoints.push(item.p2Points);//console.log('the points',item.p2Points)
          }
      }
      })
      if(itemsCount===i){
        this.setState({dataAvailable:true})
        if(this.state.theMenu==='mainCard'){this.setState({ramUfcMaincardArray:this.state.theItems})}
        if(this.state.theMenu==='prelimms'){this.setState({ramUfcPrelimsArray:this.state.theItems})}
        if(this.state.theMenu==='earlyPrelims'){this.setState({ramUfcEarlyPrelimsArray:this.state.theItems})}
        //console.log('this.state.theItems',this.state.theItems)
        //console.log('thePointsssss',thePoints)
        //console.log('currentScore',currentScore.length)
       
        var pointsSum = thePoints.reduce((partialSum, a) => partialSum + a, 0);
        pointsSum=pointsSum.toFixed(2)
        gamesDataRef.child(this.state.theEventKey+'/details/'+this.state.theMenu+'/bestPossibleScore/').set(pointsSum)
        currentEventUserInfo['bestPossibleScore']=pointsSum
        this.setState({currentEventUserInfo})
        if(currentScore.length>0){
          var scoreSum = currentScore.reduce((partialSum, a) => partialSum + a, 0);
          scoreSum=scoreSum.toFixed(2)
          currentEventUserInfo['currentScore']=scoreSum
          this.setState({currentEventUserInfo})
          gamesDataRef.child(this.state.theEventKey+'/details/'+this.state.theMenu+'/currentScore/').set(scoreSum)
        }
      }
    })
  })
    
 })
}
selectEvent= (theMenu,theItems) => {
  this.setState({theMenu,theItems})
  if(this.state.userId.length<3)return
  this.setState({dataAvailable:false},()=>{
    this.getMatchesInfo(this.state.userId)
  })
 
  
}
loadOtherFights=async(theEventKey,theEventTitle)=>{
  if (navigator.onLine === false) {
    this.notify('No internet! please check your internet connection')
    return
  }
  await this.setState({theEventKey,theEventTitle},()=>{
    this.getUfcMatches()
  })
}
 getGamesInfo=async()=>{
  var userInfoDb=firebase.database().ref('/events/')
  
  await  userInfoDb.once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      if(theInfo.ramUfc!==false){this.setState({eventRamUfc:true,ufcSubHeadings:theInfo.ramUfc.split(':')});this.getUfcItems('ramUfc');}
      if(theInfo.marchMadness===true){this.setState({eventMarchMadness:true}),this.getNflMarchMadnessItems('marchMadness','marchMadnessArray')}
      if(theInfo.nfl===true){this.setState({eventNfl:true}),this.getNflMarchMadnessItems('nfl','nflArray')}
      
    })
}
getUfcItems=async(name)=>{
    var userInfoDb=firebase.database().ref('/activeEvents/').child(name)
    
    userInfoDb.once('value',dataSnapshot=>{
      //console.log('children count',dataSnapshot.child('mainCard').numChildren());
      //console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var mainCardCount=dataSnapshot.child('mainCard').numChildren()
      var prelimsCount=dataSnapshot.child('prelims').numChildren()
      var theInfo=dataSnapshot.val()
      //console.log('the event eventSelection',theInfo) 
      if(theInfo.mainCard){
        var array1 = []
        //console.log('iko maincarddddd',theInfo.mainCard)
        var i=0
        for (var key in theInfo.mainCard) {
          i++
         var theData=theInfo.mainCard[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===mainCardCount){
          //console.log('whole maincard Array',array1)
          this.setState({ramUfcMaincardArray:array1})
          this.setState({theItems:array1})
         }}}
      if(theInfo.prelims){
        var array1 = []
        //console.log('iko prelimsssssss')
        var i=0
        for (var key in theInfo.prelims) {
          i++
         var theData=theInfo.prelims[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===prelimsCount){
          //console.log('whole prelimms Array',array1)
          this.setState({ramUfcPrelimsArray:array1})
         }
        }
        //prelimsArray
      }else{
        //console.log('hakuna prelimsssssss')
      }
    })
  }
  getNflMarchMadnessItems=async(name,theArr)=>{
    var userInfoDb=firebase.database().ref('/activeEvents/').child(name)
    userInfoDb.once('value',dataSnapshot=>{
      var count=dataSnapshot.numChildren()
      var theInfo=dataSnapshot.val()
      //console.log('the event eventSelection',theInfo) 
      if(theInfo){
        var array1 = []
        //console.log('iko maincarddddd',theInfo)
        var i=0
        for (var key in theInfo) {
          i++
         var theData=theInfo[key]
         var array2={theId:key,...theData}
         array1.push(array2)
         if(i===count){
          //console.log('whole maincard Array',array1)
          this.setState({[theArr]:array1})
         }}}
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
      ////console.log('the event eventSelection',theInfo.eventSelection) 
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
      ////console.log('theRamUfc 99999999999999',this.state.theRamUfc);
    }); 
    ////console.log('this.state.theRamUfc 2525',this.state.theRamUfc)
    var userInfoDb=firebase.database().ref('/users/'+userId).child('upcomingEvents')
    if(theRamUfc==='selected'){
      this.setState({dataAvailable:true,clickHere1:'CLICK HERE TO EDIT YOUR PICKS',clickHere2:'CLICK HERE TO EDIT THE GAME'})
    userInfoDb.child('ramUfc').once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      ////console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank=''
      if(theInfo.currentRank===false){currentRank='N/A'}else{currentRank=theInfo.currentRank}
      this.setState({flockName:theInfo.flockName,teamName:theInfo.teamName,currentScore:theInfo.currentScore,
        bestPossibleScore:theInfo.bestPossibleScore,currentRank:currentRank,theItems:theInfo.eventSelection
    })
    this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })}
    //else{this.setState({theItems:mainCard})}
  }
  getCurrentScore=async(theItems)=>{
    var i=0, theAmount=[]
   theItems.map((item,index)=>{
    var amount=0
    ////console.log('kufinish kumalo 1')
    i++
    if(item.status1==='played'){
      ////console.log('kufinish kumalo 2',item.bet,item.winner)
      if(item.bet==='player1'&&item.winner==='player1'){
        amount=Number(item.p1Points)
        theAmount.push(amount)
        ////console.log('kufinish kumalo 3')
      }
      if(item.bet==='player2'&&item.winner==='player2'){
        amount=Number(item.p2Points)
        theAmount.push(amount)
        ////console.log('kufinish kumalo 4')
      }
     
      ////console.log('kufinish kumalo 4B',i,theItems.length)
      if(i===theItems.length){
        ////console.log('kufinish kumalo 5')
        const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
        ////console.log('the current Score',sum)
        this.setState({currentScore:sum.toFixed(2)})
      }
    }
   })
  }


  hideModal = () => {
    this.setState({opendetailsModal:false})
    ////console.log('Button clicked!');
  };
  openTheModal= () => {
    if(this.state.userLoggedIn===true){
      var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
    this.setState({allMatches:thetrrrr},()=>{
      this.setState({opendetailsModal:true,openLoginModal:false})
    })
    }else{
      this.setState({openLoginModal:true,opendetailsModal:false})
    }
  }

  render() {
   var flockTeamName=''
   var itemToModals=''
    if(this.state.dataAvailable){flockTeamName=this.state.currentEventUserInfo['teamName']+'::'+this.state.currentEventUserInfo['flockName']}
    else{flockTeamName=false}
    if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    return (
      <><div className={style.container}>
        <div className={style.eventsCont}>
        <p className={style.eventsP} id={this.state.theEvent==='Upcoming Events'?style.playerP1:style.playerP} onClick={()=>this.setState({theEvent:'Upcoming Events'})}>UPCOMING EVENTS</p>
        <p className={style.eventsP} style={{color:this.state.pastEventsAvailable?null:'#b2b2b2',borderColor:this.state.pastEventsAvailable?null:'#b2b2b2'}} id={this.state.theEvent==='Past Events'?style.playerP1:style.playerP} onClick={()=>this.state.pastEventsAvailable?this.setState({theEvent:'Past Events'}):null}>PAST EVENTS</p>
        </div>
        {this.state.upcomingGames.length>0?<div className={style.matchesHeadDiv}>
          {this.state.upcomingGames.map((item,index)=>{
            //console.log('atttt upcomingGames')
            return(
              <p key={index} className={style.matchesP} style={{color:this.state.theEventKey===item.id?'#CB1E31':'#292f51',borderColor:this.state.theEventKey===item.id?'#CB1E31':'#292f51'}} onClick={()=>this.loadOtherFights(item.id,item.title)}>{item.title}</p>
            )
          })}
        </div>:null}
          <div className={style.profileDiv}>
          <div className={style.imageDiv}>
          {this.state.profilePhoto.length?<img src={this.state.profilePhoto}/>:
          <IoPersonSharp className={style.personIC}/>}
          </div>
          <div className={style.detailsDiv}>
            <p>RAM Name: {this.state.dataAvailable?this.state.currentEventUserInfo['teamName']:'N/A'}</p>
            <p>Flock Name: {this.state.dataAvailable?this.state.currentEventUserInfo['flockName']:'N/A'}</p>
            {this.state.dataAvailable?<p id={style.editP} onClick={()=>this.setState({editDetailsModal:true})}>Edit Profile</p>:<p id={style.editP} onClick={()=>this.openTheModal()}>Make Picks</p>}
            </div>
          </div>
          <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
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
                  {this.state.ramUfcMaincardArray.length>0?<p id={this.state.theMenu==='mainCard'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('mainCard',this.state.ramUfcMaincardArray)}>MAIN CARD</p>:null}
                  {this.state.ramUfcPrelimsArray.length?<p id={this.state.theMenu==='prelims'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('prelims',this.state.ramUfcPrelimsArray)}>PRELIMS</p>:null}
                  {this.state.ramUfcEarlyPrelimsArray.length?<p id={this.state.theMenu==='earlyPrelims'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('earlyPrelims',this.state.ramUfcEarlyPrelimsArray)}>EARLY PRELIMS</p>:null}
                  
                </div>
        <div className={style.scoresCont}>
        <div className={style.scoresCont1}>
          <p className={style.scoreP1}>Best possibe Score:</p>
          <p className={style.scoreP2}>{this.state.dataAvailable?this.state.currentEventUserInfo['bestPossibleScore']:'0.00'} points</p>
        </div>
        <div className={style.scoresCont2}>
        <p className={style.scoreP1}>Current Score</p>
        <p className={style.scoreP2}>{this.state.dataAvailable?this.state.currentEventUserInfo['currentScore']:'0.00'} points</p>
        </div>
        <div className={style.scoresCont3}>
        <p className={style.scoreP1}>Current Rank in RAM UFC</p>
        <p className={style.scoreP2}>{this.state.dataAvailable&&this.state.currentEventUserInfo['currentRank']?this.state.currentRank:'N/A'}</p>
        </div>
        </div>
        <div className={style.listCont}>
        {this.state.theItems.map((item,index)=>{
          var playStat=''
          var playStatCol=''
          if(item.status1==='notPlayed'){playStat='Upcoming Event',playStatCol='#292f51'}
          if(item.status1==='ongoing'){playStat='Ongoing Event',playStatCol='#CB1E31'}
          if(item.status1==='played'){playStat='Finished Event',playStatCol='#919191'}
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
          if(item.bet==='player1'){myPick=item.fighter1Name}
          if(item.bet==='player2'){myPick=item.fighter2Name}
          return(
         <div className={style.listDiv} key={index}>
                <div className={style.theCont0}>
                      <div className={style.theCont01}>
                        <p>{item.game} - {item.match}</p>
                        <p>{item.time}</p>
                      </div>
                      
                      {item.status1==='notPlayed'?<div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount}/></div>:
                      <p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>}
                      <div className={style.theCont}>
                      <div className={style.theContLeft}>
                        <div className={style.imgDiv} style={{borderColor:item.status1==='played'?player1Color:'transparent'}}>
                      <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img>
                      {item.status1==='played'?<p className={style.gameP} style={{backgroundColor:item.winner==='player1'?'#1ecb97':'#CB1E31'}}>{statP1}</p>:null}
                      </div>
                      <p className={style.P1}>{item.fighter1Name}</p>
                      <p className={style.countryP}>{item.fighter1Country}</p>
                      <p className={style.P2}>{item.p1Rec}</p>
                      </div>
                      <BsFillLightningFill className={style.sepIc}/>
                      <div className={style.theContRight}>
                      <div className={style.imgDiv} style={{borderColor:item.status1==='played'?player2Color:'transparent'}}>
                      <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img>
                      {item.status1==='played'?<p className={style.gameP} style={{backgroundColor:item.winner==='player2'?'#1ecb97':'#CB1E31'}}>{statP2}</p>:null}
                      </div>
                      <p className={style.P1}>{item.fighter2Name}</p>
                      <p className={style.countryP}>{item.fighter2Country}</p>
                      <p>{item.country}</p>
                      <p className={style.P2}>{item.p2Rec}</p>
                      </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {this.state.dataAvailable?<div id={style.statDiv}>
                        <p className={style.pickP}>Your Pick: <span style={{color:item.status1==='played'?myOutcomeCol:null}}>{myPick}</span></p>
                        <h3 className={style.statP}>Outcome: {item.status1==='played'?<><span className={style.statS1} style={{color:myOutcomeCol}}>{myOutcome}</span><span className={style.statS2} style={{color:myOutcomeCol}}>{myOutcomeSpan}</span></>:<span>N/A</span>}</h3>
                        <p></p>
                      </div>:
                      <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={()=>this.openTheModal()}>MAKE YOUR PICK</button></div>
                     }
                      </div>
                      
         </div>
          )})}
        </div>
      </div>
      {this.state.opendetailsModal?<div className={style.detailsModal} onClick={()=>this.setState({opendetailsModal:false})}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={this.state.allMatches} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} eventType={this.state.theMenu} theEventKey={this.state.theEventKey}/></div>:null}
      {this.state.openLoginModal?<div className={style.detailsModal} onClick={()=>this.setState({openLoginModal:false})}><LogIn/></div>:null}
      {this.state.editDetailsModal?<div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({editDetailsModal:false})} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName']+'::'+this.state.currentEventUserInfo['flockName']+'::'+this.state.profilePhoto+'::'+this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey}/></div>:null}
      </>
    )
  }
}

export default RamUfc