import React, { Component } from 'react'
import styles from "./NFLModal.module.scss";
import { BsFillLightningFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import ProgressBar from '../Helper/ProgressBar'
import axios from "axios"
import dayjs from 'dayjs';
import theRamOdds from './ramOdds.json'
import theNCAABOdds from '../TheJSONS/ncaabOdds.json'
var thePoints=[{seed:1,val:1.01},{seed:2,val:1.08},{seed:3,val:1.17},{seed:4,val:1.27},{seed:5,val:1.54},{seed:6,val:1.61},{seed:7,val:1.63},{seed:8,val:2.02},
  {seed:9,val:1.95},{seed:10,val:2.58},{seed:11,val:2.62},{seed:12,val:2.86},{seed:13,val:4.75},{seed:14,val:6.91},{seed:15,val:13.81},{seed:16,val:76}
]
var theImage1 = 'https://images.pexels.com/photos/17650220/pexels-photo-17650220/free-photo-of-can-of-sprite-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=600'
var theImage2 = 'https://images.pexels.com/photos/19882427/pexels-photo-19882427/free-photo-of-elevate-your-style-with-vibrant-kicks-explore-a-spectrum-of-colors-in-our-sneaker-collection-step-into-bold-hues-and-showcase-your-unique-footwear-fashion.jpeg?auto=compress&cs=tinysrgb&w=600'
var round1Edit3 = [
  { id: 'wildCardMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch2', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch3', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch4', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch5', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
  { id: 'wildCardMatch6', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Wild Card Round' },
]
var round2Edit3 = [
  { id: 'divisionalRoundMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' },
  { id: 'divisionalRoundMatch2', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' },
  { id: 'divisionalRoundMatch3', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' },
  { id: 'divisionalRoundMatch4', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Divisional Round' }
]
var conferenceChampionshipEdit3 = [
  { id: 'conferenceChampionshipMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Conference Championship' },
  { id: 'conferenceChampionshipMatch2', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Conference Championship' },
]
var superBowlEdit3 = [
  { id: 'superBowlMatch1', apiId: '', time: '', error: '', timeInMillis: 0, commenceTime: '', game: 'NFL', winner:'',status1:'notPlayed', player1: '', p1Points: '', p1Rec: '', p2Rec: '', player2: '', p2Points: '', p1Photo: '', p2Photo: '', matchType: 'NFL Super Bowl' }
]
var round1Edit=[],round2Edit=[],sweet16Edit=[],elite8Edit=[],final4Edit=[],finalRoundEdit=[]

var round1Edit2=round1Edit3,round2Edit2=round2Edit3,conferenceChampionshipEdit2=conferenceChampionshipEdit3,superBowlEdit2=superBowlEdit3
class NCAAModal extends Component {
  state = { round1Edit: round1Edit, round2Edit: round2Edit3, conferenceChampionshipEdit: conferenceChampionshipEdit3, superBowlEdit: superBowlEdit3, submitErr: "", showProgressBar: false, currentSelection:this.props.eventToNCAABModal,isItSubmit:false,
    eventStartTime:0,eventEndTime:'',theNewArr:[],loadApiData:false,getFromOddsApi:false,firstTime:'',sweet16:[], sweet16Edit:[],elite8Edit:[],final4Edit:[],finalRoundEdit:[]
  }
  
  componentDidMount=()=>{
   // var incomingData = JSON.parse(JSON.stringify(this.props.itemsToNCAABModal));
    var incomingData = this.props.itemsToNCAABModal.map(item => JSON.parse(JSON.stringify(item)));
    //var incomingData=[].concat(this.props.itemsToNCAABModal)//[...this.props.itemsToNCAABModal]
    console.log('incomingData',this.props.eventToNCAABModal,this.state.currentSelection,incomingData)
    if(this.state.currentSelection!=='round1'){this.setState({getFromOddsApi:true})}
    var firstMatchTime=[]
    if(incomingData.length>0){
      incomingData=incomingData.slice(0,4)
      round1Edit=[],round2Edit=[],sweet16Edit=[],elite8Edit=[],final4Edit=[],finalRoundEdit=[]
      incomingData.map((item,index)=>{
        incomingData[index]['bet']=''
        firstMatchTime.push(item.timeInMillis)
        if(!item.player1NickName){
        console.log('item.player1NickName samooooo')
        incomingData[index]['commenceTime']=''
        incomingData[index]['timeInMillis']=''
        incomingData[index]['time']=''
        incomingData[index]['error']=''
        if(this.state.currentSelection==='round1'||this.state.currentSelection==='round2'){
          incomingData[index]['team1Id']=''
          incomingData[index]['team2Id']=''
          
        }else{
          incomingData[index]['apiId']=''
        }
        if(this.state.currentSelection!=='round1'){
          incomingData[index]['team1Seed']=''
          incomingData[index]['team2Seed']=''
          if(this.state.getFromOddsApi){incomingData[index]['apiId']=''}
        }
      }
      if(incomingData.length===index+1){
        var firstTime =  Math.min(...firstMatchTime.map(item => item));
        this.setState({firstTime})
        console.log('modal timeeeeeeee',firstTime)
      }
      })
      console.log('modal sweet16Edit',this.state.currentSelection)
    if(this.state.currentSelection==='round1'){round1Edit=incomingData,this.setState({round1Edit})}
    if(this.state.currentSelection==='round2'){round2Edit=incomingData,this.setState({round2Edit})}
    if(this.state.currentSelection==='sweet16'){sweet16Edit=incomingData,this.setState({sweet16Edit})}

    if(this.state.currentSelection==='elite8'){elite8Edit=incomingData,this.setState({elite8Edit})}
    if(this.state.currentSelection==='final4'){final4Edit=incomingData,this.setState({final4Edit})}
    if(this.state.currentSelection==='finalRound'){finalRoundEdit=incomingData,this.setState({finalRoundEdit});console.log('nzukiiiini',finalRoundEdit)}

    }
   
    //console.log('incomingData',this.state.currentSelection,'round2Edit',round2Edit,'the length',incomingData.length)
  }
  doNothing = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  inputChange = async (e, index, type) => {
    this.setState({isItSubmit:false})
    var value = e.target.value
    console.log('theId', e.target.id)
    if (type === 'round1') {
      round1Edit[index][e.target.id] = value
      if(e.target.id=='team1Id'&&value==='0'){
        round1Edit[index]['player1'] = 'N/A'
        round1Edit[index]['player1NickName'] = 'N/A'
        round1Edit[index]['p1Photo'] = 'N/A'
      }
      if(e.target.id=='team2Id'&&value==='0'){
        round1Edit[index]['player2'] = 'N/A'
        round1Edit[index]['player2NickName'] = 'N/A'
        round1Edit[index]['p2Photo'] = 'N/A'
      }
      await this.setState({ round1Edit })
      console.log("round1Edit", round1Edit)
    }
    if (type === 'round2') {
      round2Edit[index][e.target.id] = value
      await this.setState({ round2Edit })
      console.log("round2Edit", round2Edit)
    }
    if (type === 'sweet16') {
      sweet16Edit[index][e.target.id] = value
      await this.setState({ sweet16Edit })
      console.log("sweet16Edit", sweet16Edit)
    }
    if (type === 'elite8') {
      elite8Edit[index][e.target.id] = value
      await this.setState({ elite8Edit })
      console.log("elite8Edit", elite8Edit)
    }
    if (type === 'final4') {
      final4Edit[index][e.target.id] = value
      await this.setState({ final4Edit })
      console.log("final4Edit", final4Edit)
    }
    if (type === 'finalRound') {
      finalRoundEdit[index][e.target.id] = value
      await this.setState({ finalRoundEdit })
      console.log("finalRoundEdit", finalRoundEdit)
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
      5000)
  }
  getRandom(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  goToTeamsDataApi = async(theArr,teamsArr,stateEdit) => {
    teamsArr.map((item, index) => {
          theArr.map((item2, index) => {
            if(Number(item2.team1Id)===Number(item.id)){
              theArr[index]['player1']=item.school
              theArr[index]['player1NickName']=item.name
              theArr[index]['p1Photo']=item.logo
            }
            if(Number(item2.team2Id)===Number(item.id)){
              theArr[index]['player2']=item.school
              theArr[index]['player2NickName']=item.name
              theArr[index]['p2Photo']=item.logo
            }
          }) 
          if(teamsArr.length===index+1){
            console.log('finished theArr',theArr)
            this.setState({[stateEdit]:theArr})
            var k=0
            theArr.map((item, index) => {
              if ((item.team1Id === '0'&&item.player1 === 'N/A')||(item.team2Id === '0'&&item.player2 === 'N/A')){
                theArr[index]['error'] = 'Teams id & match time field must be filled'
              }else{
                k++
              }
             if(theArr.length===k){
              this.setState({isItSubmit:true})
              this.sortOddsJson(theArr,stateEdit)
              console.log('tumemalizaaaaaaaaaaa')
             }
            })
          }
        }) 
  }
  round1Submit = () => {
    var i = 0, j = 0, k = 0, l = 0
    console.log('this.state.round1Edit',this.state.round1Edit)
    var teamsArr=[]
    var time='2025-12-20T00:00'
    /*this.state.round1Edit.map((item, index) => {
      if(item.team1Id==='0'){round1Edit[index]['team1IdReadOnly']=false}else{{round1Edit[index]['team1IdReadOnly']=true}}
      if(item.team2Id==='0'){round1Edit[index]['team2IdReadOnly']=false}else{round1Edit[index]['team2IdReadOnly']=true}
      round1Edit[index]['time'] =time
      console.log('this.state.round1Edit',this.state.round1Edit)
    })*/
    //return
   /* this.state.round1Edit.map((item, index) => {
      
      round1Edit[index]['team1Id'] =this.getRandom(1, 100);
      round1Edit[index]['team2Id'] =this.getRandom(1, 90);
      round1Edit[index]['time'] =time
      if(this.state.round1Edit.length===index+1){
        console.log('round1Edit iiiiii',round1Edit)
      }
    })*/
    this.state.round1Edit.map((item, index) => {
      if (item.team1Id === ''||item.team2Id === ''||item.time === '') {
        round1Edit[index]['error'] = 'Teams id & match time field must be filled'
        this.setState({ round1Edit })
        return
      } else {
        j++
        var timeInMillis = new Date(item.time).getTime()
        var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
        round1Edit[index]['commenceTime'] = theTime
        round1Edit[index]['timeInMillis'] = timeInMillis
        round1Edit[index]['error'] = ''
      }
      if(this.state.round1Edit.length===j){
        console.log('round1Edit jjjjjjj',round1Edit)
    
    var currentYear=new Date().getFullYear()
    var apiFirebaseRef = firebase.database().ref('/apis/NCAABTeams/'+currentYear+'/')
    apiFirebaseRef.once('value', dataSnapshot => {
      if(dataSnapshot.exists()){
        var theCount=dataSnapshot.numChildren(),i=0
        console.log('the teams data available')
        dataSnapshot.forEach((data,index) => {
          i++
          teamsArr.push(data.val())
          if(theCount===i){
            //console.log('final arrr 111111',teamsArr)
            this.goToTeamsDataApi(round1Edit,teamsArr,'round1Edit')
          }
        })
      }else{
        console.log('the teams data nooot available')
        var oddsApi = "https://api.sportsdata.io/v3/cbb/scores/json/teams?key=4a474f7d13314c6098a394987bed453f"
       var firebaseItem={}
        axios.get(oddsApi)
        .then((res) => {
          var resultsArr = res.data,j=0
          resultsArr.map((item, index) => {
            j++
            if(item.Active){
             var theItem={name:item.Name,school:item.School,key:item.Key,id:item.TeamID,
                SDN:item.ShortDisplayName,logo:item.TeamLogoUrl
              }
              firebaseItem[item.TeamID] = theItem
              teamsArr.push(theItem)}
              if(j===resultsArr.length){
                apiFirebaseRef.update(firebaseItem)
                //console.log('final arrr 222222',teamsArr)
                this.goToTeamsDataApi(round1Edit,teamsArr,'round1Edit')
              }
          })
          
        })
      }
     
    })
      
      }
    })
  }
  round2Submit = () => {
    var i = 0, j = 0, k = 0, l = 0
    console.log('this.state.round2Edit',this.state.round2Edit)
    var teamsArr=[]
    var time='2025-03-20T00:00'
   
    //return
    this.state.round2Edit.map((item, index) => {
      
     /* round2Edit[index]['team1Id'] =this.getRandom(1, 100);
      round2Edit[index]['team2Id'] =this.getRandom(1, 90);

      round2Edit[index]['team1Seed'] =this.getRandom(1, 16);
      round2Edit[index]['team2Seed'] =this.getRandom(1, 16);

      round2Edit[index]['apiId'] =this.getRandom(1, 100);
      if(index===15){
        round2Edit[index]['apiId'] =''
      }*/
      //round2Edit[index]['time'] =time
      if(this.state.round2Edit.length===index+1){
        console.log('round2Edit iiiiii',round2Edit)
      }
    })
    this.state.round2Edit.map((item, index) => {
      if (item.team1Id === ''||item.team2Id === ''||item.team1Seed === ''||item.team2Seed === '') {
        round2Edit[index]['error'] = 'Teams id, seed & match time field must be filled'
        this.setState({ round2Edit })
        return
      } else {
        if((this.state.getFromOddsApi&&item.apiId==='')||!this.state.getFromOddsApi&&item.time===''){
          round2Edit[index]['error'] = 'Teams id, seed & match time field must be filled'
          this.setState({ round2Edit })
        }else{
        j++
        var matchTime=''
        if(this.state.getFromOddsApi===true){matchTime=this.state.firstTime}
        else{matchTime=item.time}
        
        var timeInMillis = new Date(matchTime).getTime()
        var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
        round2Edit[index]['commenceTime'] = theTime
        round2Edit[index]['timeInMillis'] = timeInMillis
        round2Edit[index]['error'] = ''
        if(this.state.getFromOddsApi===true){round2Edit[index]['time'] =theTime}

        thePoints.map((item2) => {
          if(item.team1Seed===item2.seed){round2Edit[index]['p1Points'] =item2.val}
          if(item.team2Seed===item2.seed){round2Edit[index]['p2Points'] =item2.val} 
        })
}
      }
      if(this.state.round2Edit.length===j){
        console.log('round2Edit jjjjjjj',round2Edit)
    
    var currentYear=new Date().getFullYear()
    var apiFirebaseRef = firebase.database().ref('/apis/NCAABTeams/'+currentYear+'/')
    apiFirebaseRef.once('value', dataSnapshot => {
      if(dataSnapshot.exists()){
        var theCount=dataSnapshot.numChildren(),i=0
        console.log('the teams data available')
        dataSnapshot.forEach((data,index) => {
          i++
          teamsArr.push(data.val())
          if(theCount===i){
            //console.log('final arrr 111111',teamsArr)
            this.goToTeamsDataApi(round2Edit,teamsArr,'round2Edit')
          }
        })
      }else{
        console.log('the teams data nooot available')
        var oddsApi = "https://api.sportsdata.io/v3/cbb/scores/json/teams?key=4a474f7d13314c6098a394987bed453f"
       var firebaseItem={}
        axios.get(oddsApi)
        .then((res) => {
          var resultsArr = res.data,j=0
          resultsArr.map((item, index) => {
            j++
            if(item.Active){
             var theItem={name:item.Name,school:item.School,key:item.Key,id:item.TeamID,
                SDN:item.ShortDisplayName,logo:item.TeamLogoUrl
              }
              firebaseItem[item.TeamID] = theItem
              teamsArr.push(theItem)}
              if(j===resultsArr.length){
                apiFirebaseRef.update(firebaseItem)
                //console.log('final arrr 222222',teamsArr)
                this.goToTeamsDataApi(round2Edit,teamsArr,'round2Edit')
              }
          })
          
        })
      }
     
    })
      
      }
    })
  }
  sweet16Submit = () => {
    var i = 0, j = 0, k = 0, l = 0
    console.log('this.state.sweet16Edit',this.state.sweet16Edit)
    var teamsArr=[]
    var time='2025-03-20T00:00'
   
    //return
   /* this.state.sweet16Edit.map((item, index) => {
      
      sweet16Edit[index]['team1Id'] =this.getRandom(1, 100);
      sweet16Edit[index]['team2Id'] =this.getRandom(1, 90);

      sweet16Edit[index]['team1Seed'] =this.getRandom(1, 16);
      sweet16Edit[index]['team2Seed'] =this.getRandom(1, 16);

      sweet16Edit[index]['apiId'] =this.getRandom(1, 100);
     /* if(index===15){
        sweet16Edit[index]['apiId'] =''
      }
      //sweet16Edit[index]['time'] =time
      if(this.state.sweet16Edit.length===index+1){
        console.log('sweet16Edit iiiiii',sweet16Edit)
      }
    })*/
    this.state.sweet16Edit.map((item, index) => {
      if (item.team1Id === ''||item.team2Id === ''||item.team1Seed === ''||item.team2Seed === '') {
        sweet16Edit[index]['error'] = 'Teams id, seed & match time field must be filled'
        this.setState({ sweet16Edit })
        return
      } else {
        if((this.state.getFromOddsApi&&item.apiId==='')||!this.state.getFromOddsApi&&item.time===''){
          sweet16Edit[index]['error'] = 'Teams id, seed & match time field must be filled'
          this.setState({ sweet16Edit })
        }else{
        j++
        var matchTime=''
        if(this.state.getFromOddsApi===true){matchTime=this.state.firstTime}
        else{matchTime=item.time}
        
        var timeInMillis = new Date(matchTime).getTime()
        var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
        sweet16Edit[index]['commenceTime'] = theTime
        sweet16Edit[index]['timeInMillis'] = timeInMillis
        sweet16Edit[index]['error'] = ''
        if(this.state.getFromOddsApi===true){sweet16Edit[index]['time'] =theTime}

        thePoints.map((item2) => {
          if(item.team1Seed===item2.seed){sweet16Edit[index]['p1Points'] =item2.val}
          if(item.team2Seed===item2.seed){sweet16Edit[index]['p2Points'] =item2.val} 
        })
}
      }
      if(this.state.sweet16Edit.length===j){
        console.log('sweet16Edit jjjjjjj',sweet16Edit)
    
    var currentYear=new Date().getFullYear()
    var apiFirebaseRef = firebase.database().ref('/apis/NCAABTeams/'+currentYear+'/')
    apiFirebaseRef.once('value', dataSnapshot => {
      if(dataSnapshot.exists()){
        var theCount=dataSnapshot.numChildren(),i=0
        console.log('the teams data available')
        dataSnapshot.forEach((data,index) => {
          i++
          teamsArr.push(data.val())
          if(theCount===i){
            //console.log('final arrr 111111',teamsArr)
            this.goToTeamsDataApi(sweet16Edit,teamsArr,'sweet16Edit')
          }
        })
      }else{
        console.log('the teams data nooot available')
        var oddsApi = "https://api.sportsdata.io/v3/cbb/scores/json/teams?key=4a474f7d13314c6098a394987bed453f"
       var firebaseItem={}
        axios.get(oddsApi)
        .then((res) => {
          var resultsArr = res.data,j=0
          resultsArr.map((item, index) => {
            j++
            if(item.Active){
             var theItem={name:item.Name,school:item.School,key:item.Key,id:item.TeamID,
                SDN:item.ShortDisplayName,logo:item.TeamLogoUrl
              }
              firebaseItem[item.TeamID] = theItem
              teamsArr.push(theItem)}
              if(j===resultsArr.length){
                apiFirebaseRef.update(firebaseItem)
                //console.log('final arrr 222222',teamsArr)
                this.goToTeamsDataApi(sweet16Edit,teamsArr,'sweet16Edit')
              }
          })
          
        })
      }
     
    })
      
      }
    })
  }
  elite8Submit = (theItems,theEdit) => {
    var i = 0, j = 0, k = 0, l = 0
    console.log('theItems',theItems)
    var teamsArr=[]
    var time='2025-03-20T00:00'
   
    //return
  /* theItems.map((item, index) => {
      
      theItems[index]['team1Id'] =this.getRandom(1, 100);
      theItems[index]['team2Id'] =this.getRandom(1, 90);

      theItems[index]['team1Seed'] =this.getRandom(1, 16);
      theItems[index]['team2Seed'] =this.getRandom(1, 16);

      theItems[index]['apiId'] =this.getRandom(1, 100);
     /* if(index===15){
        theItems[index]['apiId'] =''
      }
      //theItems[index]['time'] =time
      if(theItems.length===index+1){
        console.log('theItems iiiiii',theItems)
      }
    })*/
      theItems.map((item, index) => {
      if (item.team1Id === ''||item.team2Id === ''||item.team1Seed === ''||item.team2Seed === '') {
        theItems[index]['error'] = 'Teams id, seed & match time field must be filled'
        this.setState({ [theEdit]:theEdit })
        return
      } else {
        if((this.state.getFromOddsApi&&item.apiId==='')||!this.state.getFromOddsApi&&item.time===''){
          theItems[index]['error'] = 'Teams id, seed & match time field must be filled'
          this.setState({ [theEdit]:theEdit })
        }else{
        j++
        var matchTime=''
        if(this.state.getFromOddsApi===true){matchTime=this.state.firstTime}
        else{matchTime=item.time}
        
        var timeInMillis = new Date(matchTime).getTime()
        var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
        theItems[index]['commenceTime'] = theTime
        theItems[index]['timeInMillis'] = timeInMillis
        theItems[index]['error'] = ''
        if(this.state.getFromOddsApi===true){theItems[index]['time'] =theTime}

        thePoints.map((item2) => {
          if(item.team1Seed===item2.seed){theItems[index]['p1Points'] =item2.val}
          if(item.team2Seed===item2.seed){theItems[index]['p2Points'] =item2.val} 
        })
}
      }
      if(theItems.length===j){
        console.log('theItems jjjjjjj',theItems)
    
    var currentYear=new Date().getFullYear()
    var apiFirebaseRef = firebase.database().ref('/apis/NCAABTeams/'+currentYear+'/')
    apiFirebaseRef.once('value', dataSnapshot => {
      if(dataSnapshot.exists()){
        var theCount=dataSnapshot.numChildren(),i=0
        console.log('the teams data available')
        dataSnapshot.forEach((data,index) => {
          i++
          teamsArr.push(data.val())
          if(theCount===i){
            //console.log('final arrr 111111',teamsArr)
            this.goToTeamsDataApi(theItems,teamsArr,theEdit)
          }
        })
      }else{
        console.log('the teams data nooot available')
        var oddsApi = "https://api.sportsdata.io/v3/cbb/scores/json/teams?key=4a474f7d13314c6098a394987bed453f"
       var firebaseItem={}
        axios.get(oddsApi)
        .then((res) => {
          var resultsArr = res.data,j=0
          resultsArr.map((item, index) => {
            j++
            if(item.Active){
             var theItem={name:item.Name,school:item.School,key:item.Key,id:item.TeamID,
                SDN:item.ShortDisplayName,logo:item.TeamLogoUrl
              }
              firebaseItem[item.TeamID] = theItem
              teamsArr.push(theItem)}
              if(j===resultsArr.length){
                apiFirebaseRef.update(firebaseItem)
                //console.log('final arrr 222222',teamsArr)
                this.goToTeamsDataApi(theItems,teamsArr,theEdit)
              }
          })
          
        })
      }
     
    })
      
      }
    })
  }
sortOddsJson=async(theArr,stateEdit)=>{
   //e9588a5ac96d554bb82f408b998e0617 368a2a41d5755a2105d864570b332d20
  //cee48e2a2178b941b7812630706a9f78 5646efe9a934b4789e8ef316a1de1ac8
  //var oddsApi="https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
 // const response = await axios.get(oddsApi)
 // var theOddsJson=response.data
  var theOddsJson=theNCAABOdds
  var firstMatchTime=[]
  try {
    console.log('theOddsJson',theOddsJson)
    var jCount=0
  theOddsJson.map((item1,index)=>{
      var i=0,newOddsJson=[]
      jCount++
      item1.bookmakers.map((item2)=>{
          i++
          var draftkingsMarket=[]
          if(item2.key==='draftkings'){
             
              draftkingsMarket=item2.markets
              //console.log('draftkings markets',item2.markets)
              //console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
              draftkingsMarket.map((item3)=>{
                  //console.log('draftkingsMarket 006',item3.outcomes)
                 const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
                   theOddsJson[index].draftkingsOdds=obj
              })
          }
         
          if(item1.bookmakers.length===i){
              //console.log('new array',theOddsJson)
             
              var m=0
              theOddsJson.map((item12,index)=>{
                  m++
                  //console.log('item12.draftkingsOdds',item12.draftkingsOdds)
                  var awayPoints=0,homePoints=0
                  if(item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0){
                      //console.log('shit is undefined')
                  }else{
                      var homeFighterName=item12.home_team
                      var awayFighterName=item12.away_team
                      awayPoints=item12.draftkingsOdds[awayFighterName]
                      homePoints=item12.draftkingsOdds[homeFighterName]
              }

        var hTPointsNum=Number(theRamOdds[homePoints])
        var aTPointsNum=Number(theRamOdds[awayPoints])
        if(homePoints<-10000){hTPointsNum=1.01}
        if(awayPoints<-10000){aTPointsNum=1.01}
        if(homePoints>12620){hTPointsNum=1247.20}
        if(awayPoints>12620){aTPointsNum=1247.20}
        
        if(homePoints<=101&&homePoints>=-101){hTPointsNum=2.03}
        if(awayPoints<=101&&awayPoints>=-101){aTPointsNum=2.03}


        console.log(item1.id,'hTPointsNum',hTPointsNum,'aTPointsNum',aTPointsNum)

              var matchTime= new Date(item12.commence_time);
              var newItem={player2:item12.away_team,player1:item12.home_team,apiId:item12.id,commenceTime:item12.commence_time,timeInMillis:matchTime.getTime(),
                p2Points:aTPointsNum,p1Points:hTPointsNum,id:item12.id
              }
             
              newOddsJson.push(newItem)
              })
              if(m===theOddsJson.length){
                //this.setState({theNewArr:newOddsJson})
                console.log('new array laaast',newOddsJson)
                theArr.map((item,index)=>{
                  newOddsJson.map((item2)=>{

                  if(item.apiId===item2.apiId){
                   // firstMatchTime.push(item2.timeInMillis)
                    theArr[index]['p1Points']=item2.p1Points
                    theArr[index]['p2Points']=item2.p2Points
                    var theTime = dayjs(item2.timeInMillis).format('MMM D, YYYY h:mm A')
                    theArr[index]['commenceTime'] = theTime
                    theArr[index]['timeInMillis'] = item2.timeInMillis
                    theArr[index]['time'] = item2.timeInMillis
                  }
                  })
                  if(theArr.length===index+1){
                    //var firstTime =  Math.min(...firstMatchTime.map(item => item));
                    this.setState({[stateEdit]:theArr})
                    console.log('malizaaaaa 000024',theArr)
                  }
                })
                
              }
          }
      })
  })
} catch (error) {
  console.log('ERROR OCURRED AT SORTING ODDS', error)
}
}
  cancelEdit=()=>{
    round1Edit=[],round2Edit=[],sweet16Edit=[],elite8Edit=[],final4Edit=[],finalRoundEdit=[]
    this.setState({round1Edit:[],round2Edit:[],sweet16Edit:[],elite8Edit:[],final4Edit:[],finalRoundEdit:[]},()=>{
      this.props.onClick('false','false')
    })
  }
  sendToDatabase=()=>{
    if(this.state.isItSubmit){
      if(this.state.currentSelection==='round1'){
        this.sendToFirebaseSingle()
      }
      if(this.state.currentSelection==='round2'){
        this.sendToFirebaseSingle2()
      }
      if(this.state.currentSelection==='sweet16'){
        this.sendToFirebaseSingle3()
      }

      if(this.state.currentSelection==='elite8'){
        this.sendToFirebaseSingle4(this.state.elite8Edit,'stopElite8Edit','elite8Arr','elite8Edit')
      }
      if(this.state.currentSelection==='final4'){
        this.sendToFirebaseSingle4(this.state.final4Edit,'stopFinal4Edit','final4Arr','final4Edit')
      }
      if(this.state.currentSelection==='finalRound'){
        this.sendToFirebaseSingle4(this.state.finalRoundEdit,'stopFinalEdit','finalArr','finalRoundEdit')
      }
    }
    this.notify('Uploading....');
  }
  sendToFirebaseSingle=async(editTime,theSelection)=>{
    this.showProgressBar()
    var theArr='',editTime='',returnArrName=''
    if(this.state.currentSelection==='round1'){theArr=this.state.round1Edit,editTime='stopRound1Edit',returnArrName='allRound1MatchesArr'}
    if(this.state.currentSelection==='round2'){theArr=this.state.round1Edit,editTime='stopRound2Edit'}
    var i=0
    theArr.map((item, index) => {
      if (item.team2Id === ''||item.team1Id === ''||item.player1 === ''||item.player2 === ''||item.p1Photo === ''||item.p2Photo === '') {
        theArr[index]['error'] = 'Some field missing data'
        this.setState({ round2Edit })
        return
      } else {
        i++
        theArr[index]['error'] = ''
      }
      if (i===theArr.length) {    
       var minTime = Math.min(...theArr.map(item => item.timeInMillis));
       var toDbArr={},v = 0
       var eventKey = this.props.theEventKey
       var generalDb = firebase.database().ref('/theEvents/')
       var eventIdsLink ='/eventsIds/'+eventKey+'/'
       var eventIdsLink2 ='/NCAAB/eventsIds/'+eventKey+'/'
       var dataLink ='/NCAAB/'+eventKey+'/'+this.state.currentSelection//1737147600000
       console.log('combined items',theArr.length, theArr)//1737235800000
       var eventIdsEdit = {
      [editTime]:minTime,currentSelection:this.state.currentSelection,time:minTime}
       theArr.map((item,index) => {
         v++
         theArr[index]['error']=null
         console.log('matchType',item.matchType)
         toDbArr[item.id] = item
         if (theArr.length === v) {
           generalDb.child(eventIdsLink).update(eventIdsEdit)
           generalDb.child(eventIdsLink2).update(eventIdsEdit)
           generalDb.child(dataLink).update(toDbArr,(error) => {
            if (error) {
              this.notify('An error occured while uploading data')
              this.setState({ showProgressBar: false })
            } else {
              this.notify('Data uploaded successfully')
              this.setState({ showProgressBar: false })
             // var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::'+editTime
              this.props.onClick(returnArrName,theArr)
            }
          })
         }
       })
      }
    })
  }
  
  sendToFirebaseSingle2=async()=>{
    this.showProgressBar()
    var theArr='',editTime='',returnArrName=''
    theArr=this.state.round2Edit,editTime='stopRound2Edit',returnArrName='allRound2MatchesArr'
    var i=0
    theArr.map((item, index) => {
      if (item.team2Id === ''||item.team1Id === ''||item.player1 === ''||item.player2 === ''||item.p1Photo === ''||item.p2Photo === ''||item.team1Seed === ''||item.team2Seed === '') {
        theArr[index]['error'] = 'Some field missing data'
        this.setState({ round2Edit })
        return
      } else {
        i++
        theArr[index]['error'] = ''
      }
      if (i===theArr.length) {    
       var minTime = Math.min(...theArr.map(item => item.timeInMillis));
       var toDbArr={},v = 0
       var eventKey = this.props.theEventKey
       var generalDb = firebase.database().ref('/theEvents/')
       var eventIdsLink ='/eventsIds/'+eventKey+'/'
       var eventIdsLink2 ='/NCAAB/eventsIds/'+eventKey+'/'
       var dataLink ='/NCAAB/'+eventKey+'/'+this.state.currentSelection//1737147600000
       console.log('combined items',theArr.length, theArr)//1737235800000
       var eventIdsEdit = {
      [editTime]:minTime,currentSelection:this.state.currentSelection}
       theArr.map((item,index) => {
         v++
         delete theArr[index]['error']
         console.log('matchType',item.matchType)
         toDbArr[item.id] = item
         if (theArr.length === v) {
          console.log('toDbArr',eventIdsEdit,toDbArr)
           generalDb.child(eventIdsLink).update(eventIdsEdit)
           generalDb.child(eventIdsLink2).update(eventIdsEdit)
           generalDb.child(dataLink).update(toDbArr,(error) => {
            if (error) {
              this.notify('An error occured while uploading data')
              this.setState({ showProgressBar: false })
            } else {
              this.notify('Data uploaded successfully')
              this.setState({ showProgressBar: false })
             // var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::'+editTime
              this.props.onClick(returnArrName,theArr)
            }
          })
         }
       })
      }
    })
  }
  sendToFirebaseSingle3=async()=>{
    this.showProgressBar()
    var theArr='',editTime='',returnArrName=''
    theArr=this.state.sweet16Edit,editTime='stopSweet16Edit',returnArrName='sweet16Arr'
    var i=0
    theArr.map((item, index) => {
      if (item.team2Id === ''||item.team1Id === ''||item.player1 === ''||item.player2 === ''||item.p1Photo === ''||item.p2Photo === ''||item.team1Seed === ''||item.team2Seed === '') {
        theArr[index]['error'] = 'Some field missing data'
        this.setState({ sweet16Edit })
        return
      } else {
        i++
        theArr[index]['error'] = ''
      }
      if (i===theArr.length) {    
       var minTime = Math.min(...theArr.map(item => item.timeInMillis));
       var toDbArr={},v = 0
       var eventKey = this.props.theEventKey
       var generalDb = firebase.database().ref('/theEvents/')
       var eventIdsLink ='/eventsIds/'+eventKey+'/'
       var eventIdsLink2 ='/NCAAB/eventsIds/'+eventKey+'/'
       var dataLink ='/NCAAB/'+eventKey+'/final/'+this.state.currentSelection//1737147600000
       console.log('combined items',theArr.length, theArr)//1737235800000
       var eventIdsEdit = {
      [editTime]:minTime,currentSelection:this.state.currentSelection}
       theArr.map((item,index) => {
         v++
         delete theArr[index]['error']
         console.log('matchType',item.matchType)
         toDbArr[item.id] = item
         if (theArr.length === v) {
          console.log('toDbArr',eventIdsEdit,toDbArr)
           generalDb.child(eventIdsLink).update(eventIdsEdit)
           generalDb.child(eventIdsLink2).update(eventIdsEdit)
           generalDb.child(dataLink).update(toDbArr,(error) => {
            if (error) {
              this.notify('An error occured while uploading data')
              this.setState({ showProgressBar: false })
            } else {
              this.notify('Data uploaded successfully')
              this.setState({ showProgressBar: false })
             // var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::'+editTime
              this.props.onClick(returnArrName,theArr)
            }
          })
         }
       })
      }
    })
  }
  sendToFirebaseSingle4=async(theArr,editTime,returnArrName,stateName)=>{
    this.showProgressBar()
    var i=0
    theArr.map((item, index) => {
      if (item.team2Id === ''||item.team1Id === ''||item.player1 === ''||item.player2 === ''||item.p1Photo === ''||item.p2Photo === ''||item.team1Seed === ''||item.team2Seed === '') {
        theArr[index]['error'] = 'Some field missing data'
        this.setState({[stateName]:theArr})
        return
      } else {
        i++
        theArr[index]['error'] = ''
      }
      if (i===theArr.length) {    
       var minTime = Math.min(...theArr.map(item => item.timeInMillis));
       var toDbArr={},v = 0
       var eventKey = this.props.theEventKey
       var generalDb = firebase.database().ref('/theEvents/')
       var eventIdsLink ='/eventsIds/'+eventKey+'/'
       var eventIdsLink2 ='/NCAAB/eventsIds/'+eventKey+'/'
       var dataLink ='/NCAAB/'+eventKey+'/final/'+this.state.currentSelection//1737147600000
       console.log('combined items',theArr.length, theArr)//1737235800000
       var eventIdsEdit = {
      [editTime]:minTime,currentSelection:this.state.currentSelection}
       theArr.map((item,index) => {
         v++
         delete theArr[index]['error']
         console.log('matchType',item.matchType)
         toDbArr[item.id] = item
         if (theArr.length === v) {
          console.log('toDbArr',eventIdsEdit,toDbArr)
           generalDb.child(eventIdsLink).update(eventIdsEdit)
           generalDb.child(eventIdsLink2).update(eventIdsEdit)
           generalDb.child(dataLink).update(toDbArr,(error) => {
            if (error) {
              this.notify('An error occured while uploading data')
              this.setState({ showProgressBar: false })
            } else {
              this.notify('Data uploaded successfully')
              this.setState({ showProgressBar: false })
             // var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::'+editTime
              this.props.onClick(returnArrName,theArr)
            }
          })
         }
       })
      }
    })
  }
  submitMatches = () => {
   
    if(this.state.currentSelection==='round1'){this.round1Submit()}
    if(this.state.currentSelection==='round2'){this.round2Submit()}
    if(this.state.currentSelection==='sweet16'){this.sweet16Submit()}

    if(this.state.currentSelection==='elite8'){this.elite8Submit(this.state.elite8Edit,'elite8Edit')}
    if(this.state.currentSelection==='final4'){this.elite8Submit(this.state.final4Edit,'final4Edit')}
    if(this.state.currentSelection==='finalRound'){this.elite8Submit(this.state.finalRoundEdit,'finalRoundEdit')}
  }
itemComponent = (compItems, type) => {
  console.log('compItems',sweet16Edit,compItems,type)
    return (
      compItems.map((item, index) => {
        var name1ReadOnly=true
        var name2ReadOnly=true
        if(item.team1IdReadOnly!==undefined&&item.team1IdReadOnly===false){name1ReadOnly=false}
        if(item.team2IdReadOnly!==undefined&&item.team2IdReadOnly===false){name2ReadOnly=false}
       // console.log('name1ReadOnly',name1ReadOnly)
       // console.log('name2ReadOnly',name2ReadOnly)
        return (
          <div className={styles.listDiv} key={index}>
            <div className={styles.theCont0}>
              <div className={styles.theCont01}>
                {type!=='finalRound'?
                <p>{item.matchType+' Match '+(index+1)}</p>:
                <p>{item.matchType}</p>}
                 {type!=='finalRound'?<p>{'id '+item.id}</p>:null}
              </div>
              <div className={styles.theCont}>
                <div className={styles.theContLeft}>
                  <div className={styles.imgDiv1}>
                    {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  {/*type==='round1'||type==='round2'?<input className={styles.P1} id='team1Id' value={item.team1Id} placeholder='Enter team 1 team id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='apiId' value={item.apiId} readOnly={type===this.state.currentSelection?false:true} placeholder='Enter odds api match uid' onChange={(event) => this.inputChange(event, index, type)} />*/}
                  <input className={styles.P1} id='team1Id' value={item.team1Id} placeholder='Enter team 1 team id' onChange={(event) => this.inputChange(event, index, type)} />
                 
                  {/*type==='round1'||type==='round2'?<>{type==='round2'&&this.state.getFromOddsApi?<input className={styles.P1} id='apiId' value={item.apiId} placeholder='Enter odds api id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='time' type='datetime-local' value={item.time} placeholder='Enter match time' onChange={(event) => this.inputChange(event, index, type)}/>}</>:
                  <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter team 1 logo' onChange={(event) => this.inputChange(event, index, type)} />*/}
                   {type!=='round1'?<input className={styles.P1} id='apiId' value={item.apiId} placeholder='Enter odds api id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='time' type='datetime-local' value={item.time} placeholder='Enter match time' onChange={(event) => this.inputChange(event, index, type)}/>}

                  <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' readOnly={name1ReadOnly}  onChange={(event) => this.inputChange(event, index, type)}/>
                  {type==='round1'?<input className={styles.P2} value={'#'+item.team1Seed} placeholder='Seed #' readOnly/>:<input className={styles.P2} id='team1Seed' value={item.team1Seed} placeholder='Enter team 1 seed' onChange={(event) => this.inputChange(event, index, type)}/>}
                  {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                </div>
                <BsFillLightningFill className={styles.sepIc} />
                <div className={styles.theContRight}>
                  <div className={styles.imgDiv2}>
                    {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  {/*type==='round1'||type==='round2'?<input className={styles.P1} id='team2Id' value={item.team2Id}  placeholder='Enter team 2 team id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='time' type='datetime-local' value={item.time} placeholder='Enter match time' readOnly />*/}
                  <input className={styles.P1} id='team2Id' value={item.team2Id}  placeholder='Enter team 2 team id' onChange={(event) => this.inputChange(event, index, type)} />
                  <input className={styles.P2} id='p2Photo' value={item.p2Photo} placeholder='Enter team 2 logo' readOnly />
                  <input className={styles.P2} id='player2' value={item.player2} placeholder='Enter team 2 name' readOnly={name2ReadOnly}  onChange={(event) => this.inputChange(event, index, type)}/>
                  {type==='round1'?<input className={styles.P2} value={'#'+item.team2Seed} placeholder='Seed #' readOnly/>:<input className={styles.P2} id='team2Seed' value={item.team2Seed} placeholder='Enter team 2 seed' onChange={(event) => this.inputChange(event, index, type)}/>}
                  {/*<input className={styles.P2} id='p2Rec' value={item.p2Rec} placeholder='Enter team 2 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                </div>
              </div>
              <p className={styles.errorP}>{item.error}</p>
            </div>

          </div>
        )
      })
    )
  }
  render() {
    return (
      <><div className={styles.container2} onClick={(event) => this.doNothing(event)}>

        <p className={styles.headP}>Enter NCAAB Match Details</p>
        {this.state.currentSelection==='round1'?<div className={styles.divCont}>
          <p className={styles.listHeadP}>Round of 64</p>
          <div className={styles.listCont}>{this.itemComponent(round1Edit, 'round1')}</div></div>:null}
          {this.state.currentSelection==='round2'?
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Round of 32</p>
          <div className={styles.listCont}>{this.itemComponent(round2Edit, 'round2')}</div></div>:null}
          {this.state.currentSelection==='sweet16'?
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Sweet 16</p>
          <div className={styles.listCont}>{this.itemComponent(sweet16Edit, 'sweet16')}</div></div>:null}
          {this.state.currentSelection==='elite8'?
          <div className={styles.divCont}>
          <p className={styles.listHeadP}>Elite 8</p>
          <div className={styles.listCont}>{this.itemComponent(elite8Edit, 'elite8')}</div></div>:null}
          {this.state.currentSelection==='final4'?
          <div className={styles.divCont}>
          <p className={styles.listHeadP}>Final 4</p>
          <div className={styles.listCont}>{this.itemComponent(final4Edit, 'final4')}</div></div>:null}
          {this.state.currentSelection==='finalRound'?
          <div className={styles.divCont}>
          <p className={styles.listHeadP}>Championship</p>
          <div className={styles.listCont}>{this.itemComponent(finalRoundEdit, 'finalRound')}</div></div>:null}
          {/*this.state.currentSelection==='wildCard'||this.state.currentSelection==='conferenceChampionship'? 
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Conference Championship</p>
          <div className={styles.listCont}>{this.itemComponent(conferenceChampionshipEdit, 'conferenceChampionship')}</div></div>:null}
          {this.state.currentSelection==='wildCard'||this.state.currentSelection==='superBowl'? 
        <div className={styles.divCont}>
          <p className={styles.listHeadP}>Super Bowl</p>
          <div className={styles.listCont}>{this.itemComponent(superBowlEdit, 'superBowl')}</div></div>:null*/}
        
        {this.state.isItSubmit?<div className={styles.submitDiv}>
        <button className={styles.cancelBtn} onClick={()=>this.cancelEdit()}>Cancel</button>
        <button className={styles.submitBtn2} onClick={() => this.sendToDatabase()}>Submit</button>
        </div>:<button className={styles.submitBtn} onClick={()=>this.submitMatches()}>Preview</button>}
      </div>
        {this.state.showProgressBar ? <ProgressBar /> : null}
        <ToastContainer />
      </>
    )
  }
}

export default NCAAModal