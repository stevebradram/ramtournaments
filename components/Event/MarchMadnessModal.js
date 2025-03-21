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
var round1Edit=[],round2Edit=[],conferenceChampionshipEdit=[],superBowlEdit=[]

var round1Edit2=round1Edit3,round2Edit2=round2Edit3,conferenceChampionshipEdit2=conferenceChampionshipEdit3,superBowlEdit2=superBowlEdit3
class NCAAModal extends Component {
  state = { round1Edit: round1Edit, round2Edit: round2Edit3, conferenceChampionshipEdit: conferenceChampionshipEdit3, superBowlEdit: superBowlEdit3, submitErr: "", showProgressBar: false, currentSelection:this.props.eventToNCAABModal,isItSubmit:false,
    eventStartTime:0,eventEndTime:'',theNewArr:[],loadApiData:false,getFromOddsApi:true,firstTime:'',
  }
  
  componentDidMount=()=>{
    var incomingData = JSON.parse(JSON.stringify(this.props.itemsToNCAABModal));
    //var incomingData=[].concat(this.props.itemsToNCAABModal)//[...this.props.itemsToNCAABModal]
    console.log('incomingData',this.props.eventToNCAABModal,this.state.currentSelection,incomingData)
    var firstMatchTime=[]
    if(incomingData.length>0){
      incomingData=incomingData//.slice(0,2)
      round1Edit=[],round2Edit=[],conferenceChampionshipEdit=[],superBowlEdit=[]
      incomingData.map((item,index)=>{
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
    if(this.state.currentSelection==='round1'){round1Edit=incomingData,this.setState({round1Edit})}
    if(this.state.currentSelection==='round2'){round2Edit=incomingData,this.setState({round2Edit})}
    return
    if(this.state.currentSelection==='conferenceChampionship'){conferenceChampionshipEdit=incomingData,this.setState({conferenceChampionshipEdit}),this.fillEventDetails('conferenceChampionshipEdit')}
    if(this.state.currentSelection==='superBowl'){superBowlEdit=incomingData,this.setState({superBowlEdit}),this.fillEventDetails('superBowlEdit')}}
    else{
      return
      console.log('kasaluo')
      if(this.state.currentSelection==='wildCard'){
        round1Edit=round1Edit3
        round2Edit=round2Edit3
        conferenceChampionshipEdit=conferenceChampionshipEdit3
        superBowlEdit=superBowlEdit3
      }
      if(this.state.currentSelection==='divisionalRound'){round2Edit=round2Edit3}
      if(this.state.currentSelection==='conferenceChampionship'){conferenceChampionshipEdit=conferenceChampionshipEdit3}
      if(this.state.currentSelection==='superBowl'){superBowlEdit=superBowlEdit3}
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
    if (type === 'conferenceChampionship') {
      conferenceChampionshipEdit[index][e.target.id] = value
      await this.setState({ conferenceChampionshipEdit })
      console.log("conferenceChampionshipEdit", conferenceChampionshipEdit)
    }
    if (type === 'superBowl') {
      superBowlEdit[index][e.target.id] = value
      await this.setState({ superBowlEdit })
      console.log("superBowlEdit", superBowlEdit)
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
              this.sortOddsJson(theArr)
              console.log('tumemalizaaaaaaaaaaa')
             }
            })
          }
        }) 
  }
  round1Submit = () => {
    var yearNow = new Date().getFullYear()
    var i = 0, j = 0, k = 0, l = 0
    console.log('this.state.round1Edit',this.state.round1Edit)
    var teamsArr=[]
    var time='2025-03-20T00:00'
    /*this.state.round1Edit.map((item, index) => {
      if(item.team1Id==='0'){round1Edit[index]['team1IdReadOnly']=false}else{{round1Edit[index]['team1IdReadOnly']=true}}
      if(item.team2Id==='0'){round1Edit[index]['team2IdReadOnly']=false}else{round1Edit[index]['team2IdReadOnly']=true}
      round1Edit[index]['time'] =time
      console.log('this.state.round1Edit',this.state.round1Edit)
    })*/
    //return
    /*this.state.round1Edit.map((item, index) => {
      
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
    var yearNow = new Date().getFullYear()
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

sortOddsJson=async(theArr)=>{
   //e9588a5ac96d554bb82f408b998e0617 368a2a41d5755a2105d864570b332d20
  //cee48e2a2178b941b7812630706a9f78 5646efe9a934b4789e8ef316a1de1ac8
  var oddsApi="https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
  const response = await axios.get(oddsApi)
  var theOddsJson=response.data
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
                    round2Edit[index]['commenceTime'] = theTime
                    round2Edit[index]['timeInMillis'] = item2.timeInMillis
                    round2Edit[index]['time'] = item2.timeInMillis
                  }
                  })
                  if(theArr.length===index+1){
                    //var firstTime =  Math.min(...firstMatchTime.map(item => item));
                    this.setState({round2Edit:theArr})
                    console.log('malizaaaaa',theArr)
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
    round1Edit=round1Edit2,round2Edit=round2Edit2,conferenceChampionshipEdit=conferenceChampionshipEdit2,superBowlEdit=superBowlEdit2
    this.setState({round1Edit:[],round2Edit:[],conferenceChampionshipEdit:[],superBowlEdit:[]},()=>{
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
      [editTime]:minTime,currentSelection:this.state.currentSelection,time:minTime}
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
  sendToFirebase=async()=>{
    this.showProgressBar()
    console.log('at sendToFirebase',this.state.currentSelection)
    //todo finish here and odds update on onclick
    return
    if(this.state.currentSelection==='wildCard'){}
    if(this.state.currentSelection==='divisionalRound'){}
    if(this.state.currentSelection==='conferenceChampionship'){}
    if(this.state.currentSelection==='superBowl'){}
    var wCMin = Math.min(...this.state.round1Edit.map(item => item.timeInMillis));
    var dRMin = Math.min(...this.state.round2Edit.map(item => item.timeInMillis));
    var cCMin = Math.min(...this.state.conferenceChampionshipEdit.map(item => item.timeInMillis));
    var sPMin = Math.min(...this.state.superBowlEdit.map(item => item.timeInMillis));
    var endTime = Math.max(...this.state.superBowlEdit.map(item => item.timeInMillis));
    var allItems = [...this.state.round1Edit, ...this.state.round2Edit,...this.state.conferenceChampionshipEdit,...this.state.superBowlEdit]
    var toDbWildCardArr={},toDbDivisionalRound={},toDbConferenceChampionshipArr={},toDbSuperBowlArr={},v = 0
    var v=0
    var eventKey = 'NFLPlayoffs-'+ new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents/NFL/' + eventKey + '/')
    var eventsIdDb = firebase.database().ref('/theEvents/')
    console.log('combined items',allItems.length, allItems)
    allItems.map((item,index) => {
      v++
      if(item.p1Photo===''){allItems[index]['p1Photo']='N/A'}
      if(item.p2Photo===''){allItems[index]['p2Photo']='N/A'}
      if(item.p1Points===''){allItems[index]['p1Points']='N/A'}
      if(item.p2Points===''){allItems[index]['p2Points']='N/A'}
      if(item.player1===''){allItems[index]['player1']='N/A'}
      if(item.player2===''){allItems[index]['player2']='N/A'}
      if(item.player1===''){allItems[index]['player1NickName']='N/A'}
      if(item.player2===''){allItems[index]['player2NickName']='N/A'}
      console.log('matchType',item.matchType)
      if (item.matchType === 'NFL Wild Card Round') {
        toDbWildCardArr[item.id] = item
      } 
      if (item.matchType === 'NFL Divisional Round') {
        toDbDivisionalRound[item.id] = item
      } 
      if (item.matchType === 'NFL Conference Championship') {
        toDbConferenceChampionshipArr[item.id] = item
      } 
      if (item.matchType === 'NFL Super Bowl') {
        toDbSuperBowlArr[item.id] = item
      } 
      if (allItems.length === v) {
        var theArr = {
          time:wCMin, sportType: 'NFL',endTime:'', 
          title: 'NFL PLAYOFFS 2025',currentSelection:this.state.currentSelection,
          stopround1Edit:wCMin,stopround2Edit:dRMin,endTime:endTime,
          stopConferenceChampionshipEdit:cCMin,stopSuperBowlEdit:sPMin,startTime:wCMin        
        }
        eventsIdDb.child('eventsIds/' + eventKey + '/').update(theArr)
        eventsIdDb.child('/NFL/eventsIds/' + eventKey + '/').update(theArr)
        generalDb.child('wildCard').update(toDbWildCardArr)
        generalDb.child('divisionalRound').update(toDbDivisionalRound)
        generalDb.child('conferenceChampionship').update(toDbConferenceChampionshipArr)
        generalDb.child('superBowl').update(toDbSuperBowlArr,(error) => {
          if (error) {
            this.notify('An error occured while uploading data')
            this.setState({ showProgressBar: false })
          } else {
            this.notify('Data uploaded successfully')
            this.setState({ showProgressBar: false })
            var oddsServerLink='theEvents::NFL::'+eventKey+'::'+this.state.currentSelection+'::stopround1Edit'
              this.props.onClick('getOdds',oddsServerLink)
          }
        })
      }
    })
  }
  submitMatches = () => {
    if(this.state.currentSelection==='round1'){this.round1Submit()}
    if(this.state.currentSelection==='round2'){this.round2Submit()}
  }

  getLogos = async (theArr) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    //console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            //console.log('the teams',theItem)
            //console.log('the team name',theItem['displayName'])
            // console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              console.log('theArr 22222222 kufinish', theArr)
              if (this.state.currentSelection==='wildCard') {this.setState({round1Edit:theArr,isItSubmit:true})}
              if (this.state.currentSelection==='divisionalRound') {this.setState({round2Edit:theArr,isItSubmit:true})}
              if (this.state.currentSelection==='conferenceChampionship') {this.setState({conferenceChampionshipEdit:theArr,isItSubmit:true})}
              if (this.state.currentSelection==='superBowl') {this.setState({superBowlEdit:theArr,isItSubmit:true})}
              //this.sendToFirebase()
            }
          })

        })

      })
  }
  getLogos2 = async (theArr,menu,incomingData) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    //console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            //console.log('the teams',theItem)
            //console.log('the team name',theItem['displayName'])
            // console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              theArr.map((item,index)=>{
              incomingData[index]['player2']=item.player2
              incomingData[index]['player1']=item.player1
              incomingData[index]['apiId']=item.apiId
              incomingData[index]['p2Points']=item.p2Points
              incomingData[index]['p1Points']=item.p1Points
              incomingData[index]['p2Photo']=item.p2Photo
              incomingData[index]['player2NickName']=item.player2NickName
              incomingData[index]['p1Photo']=item.p1Photo
              incomingData[index]['player1NickName']=item.player1NickName

              incomingData[index]['timeInMillis']=item.timeInMillis
              incomingData[index]['commenceTime']=item.commenceTime
              incomingData[index]['time']=item.commenceTime.slice(0,16)
              if(theArr.length===index+1){
                console.log('this.state.currentSelection',this.state.currentSelection)
                console.log('theArr 22222222 kufinish', theArr)
                console.log('theArr 22222222 incomingData', incomingData)
                if (this.state.currentSelection==='divisionalRound') {this.setState({round2Edit:incomingData,isItSubmit:true})}
                if (this.state.currentSelection==='conferenceChampionship') {this.setState({conferenceChampionshipEdit:incomingData,isItSubmit:true})}
                if (this.state.currentSelection==='superBowl') {this.setState({superBowlEdit:incomingData,isItSubmit:true});console.log('haapa kwa sssssssssssss')}
                this.setState({ showProgressBar: false })
              }
              }) 
             
             
              return
             
              //this.sendToFirebase()
            }
          })

        })

      })
  }
  itemComponent = (compItems, type) => {
  //console.log('compItems',compItems,type)
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
                <p>{item.matchType+' Match '+(index+1)}</p>
                <p>{item.time.commenceTime}</p>
              </div>
              <div className={styles.theCont}>
                <div className={styles.theContLeft}>
                  <div className={styles.imgDiv1}>
                    {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  {type==='round1'||type==='round2'?<input className={styles.P1} id='team1Id' value={item.team1Id} placeholder='Enter team 1 team id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='apiId' value={item.apiId} readOnly={type===this.state.currentSelection?false:true} placeholder='Enter odds api match uid' onChange={(event) => this.inputChange(event, index, type)} />}
                 
                  {type==='round1'||type==='round2'?<>{type==='round2'&&this.state.getFromOddsApi?<input className={styles.P1} id='apiId' value={item.apiId} placeholder='Enter odds api id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='time' type='datetime-local' value={item.time} placeholder='Enter match time' onChange={(event) => this.inputChange(event, index, type)}/>}</>:
                  <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter team 1 logo' onChange={(event) => this.inputChange(event, index, type)} />}
                  
                  <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' readOnly={name1ReadOnly}  onChange={(event) => this.inputChange(event, index, type)}/>
                  {type==='round1'?<input className={styles.P2} value={'#'+item.team1Seed} placeholder='Seed #' readOnly/>:<input className={styles.P2} id='team1Seed' value={item.team1Seed} placeholder='Enter team 1 seed' onChange={(event) => this.inputChange(event, index, type)}/>}
                  {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                </div>
                <BsFillLightningFill className={styles.sepIc} />
                <div className={styles.theContRight}>
                  <div className={styles.imgDiv2}>
                    {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                  </div>
                  {type==='round1'||type==='round2'?<input className={styles.P1} id='team2Id' value={item.team2Id}  placeholder='Enter team 2 team id' onChange={(event) => this.inputChange(event, index, type)} />:<input className={styles.P1} id='time' type='datetime-local' value={item.time} placeholder='Enter match time' readOnly />}                  
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