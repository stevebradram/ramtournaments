import React, { Component } from 'react'
import style from "./NFL.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from './NFLDetailsModal'
import EditDetails from './DetailsModalCopy'
import NFLModal from './NFLModal'
import LogIn from '../LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios"
import dayjs from 'dayjs';
var allMatches = []
var selectedRamUfcArray = [], selectedNflArray = [], selectedMarchMadnesArray = []
//player1: 'West Virginia',player2: 'Memphis'
const firstRound = [
  {id:'c467e0e09ca315ff9d6914fc12a98324',time: 'Dec 20, 2024 - 20:00 PM', timeInMillis: 1734714000000, player1: 'West Virginia', p1Points: 'N/A', p1Rec: '11-1-0', p2Rec: '11-1-0', player2: 'Memphis', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/indiana.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/notre-dame.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
  {id:'b8cc3dac96e558a3ab0b871b36e108cb',time: 'Dec 21, 2024 - 12:00 PM', timeInMillis: 1734771600000, player1: 'James Madison', p1Rec: '11-1-0', p2Rec: '11-1-0', p1Points: 'N/A', p1Rec: '11-2-0', p2Rec: '11-2-0', player2: 'Western Kentucky', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/smu.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/penn-st.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
  {id:'22',time: 'Dec 21, 2024 - 16:00 PM', timeInMillis: 1734786000000, player1: 'Clemson', p1Rec: '10-3-0', p2Rec: '11-2-0', p1Points: 'N/A', player2: 'Texas', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/clemson.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/texas.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
  {id:'55',time: 'Dec 21, 2024 - 20:00 PM', timeInMillis: 1734800400000, player1: 'Tennessee', p1Rec: '10-2-0', p2Rec: '10-2-0', p1Points: 'N/A', player2: 'Ohio St.', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/tennessee.svg', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/ohio-st.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First Round' },
]
//
const quarterFinals = [
  { time: 'Dec 31 2024, 19:30 PM', timeInMillis: 1735662600000, player1: 'Boise St.', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'Penn State/SMU', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/boise-st.svg', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
  { time: 'Jan 1 2025, 13:00PM', timeInMillis: 1735725600000, player1: 'Clemson/Texas', p1Rec: '0-0-0', p2Rec: '11-2-0', p1Points: 'N/A', player2: 'Arizona St.', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/arizona-st.svg', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
  { time: 'Jan 1 2025, 17:00PM', timeInMillis: 1735740000000, player1: 'Oregon', p1Rec: '13-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'Ohio State/Tennessee', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/oregon.svg', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
  { time: 'Jan 1 2025, 20:45PM', timeInMillis: 1735753500000, player1: 'Notre Dame/Indiana', p1Rec: '0-0-0', p2Rec: '11-2-0', p1Points: 'N/A', player2: 'Georgia', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: '//www.ncaa.com/sites/default/files/images/logos/schools/bgd/georgia.svg', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Quarter Finals' },
]
const semiFinals = [
  { time: 'Jan 9 2025, 19:30PM', timeInMillis: 1736440200000, player1: 'N/A', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Semi Finals' },
  { time: 'Jan 10 2025, 19:30PM', timeInMillis: 1736526600000, player1: 'N/A', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Semi Finals' },
]
const finals = [
  { time: 'Jan 20 2025, 19:00PM', timeInMillis: 1737388800000, player1: 'N/A', p1Rec: '0-0-0', p2Rec: '0-0-0', p1Points: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'player', game: 'UFC', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: 'player1', winner: '', matchType: 'Finals', },
]

var ncaafItems=[
  {
    "id": "c467e0e09ca315ff9d6914fc12a98324",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-18T02:13:00Z",
    "completed": true,
    "home_team": "West Virginia Mountaineers",
    "away_team": "Memphis Tigers",
    "scores": [
      {
        "name": "West Virginia Mountaineers",
        "score": "37"
      },
      {
        "name": "Memphis Tigers",
        "score": "42"
      }
    ],
    "last_update": "2024-12-19T09:30:53Z"
  },
  {
    "id": "b8cc3dac96e558a3ab0b871b36e108cb",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-18T22:30:00Z",
    "completed": true,
    "home_team": "James Madison Dukes",
    "away_team": "Western Kentucky Hilltoppers",
    "scores": [
      {
        //James Madison Dukes
        "name": "James Madison Dukes",
        "score": "27"
      },
      {
        //Western Kentucky Hilltoppers
        "name": "Western Kentucky Hilltoppers",
        "score": "17"
      }
    ],
    "last_update": "2024-12-19T09:30:53Z"
  },
  {
    "id": "c467e0e09ca315ff9d6914fc12a98324",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-19T02:11:33Z",
    "completed": true,
    "home_team": "UNLV Rebels",
    "away_team": "California Golden Bears",
    "scores": [
      {
        "name": "UNLV Rebels",
        "score": "24"
      },
      {
        "name": "California Golden Bears",
        "score": "13"
      }
    ],
    "last_update": "2024-12-19T09:30:53Z"
  },
  {
    "id": "c69b00c0f721d19e07d950e056c17c83",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-20T00:00:00Z",
    "completed": false,
    "home_team": "Sam Houston State Bearkats",
    "away_team": "Georgia Southern Eagles",
    "scores": null,
    "last_update": null
  },
  {
    "id": "59a2997a9ed7c8f63a224b32355bd09f",
    "sport_key": "americanfootball_ncaaf",
    "sport_title": "NCAAF",
    "commence_time": "2024-12-20T17:00:00Z",
    "completed": false,
    "home_team": "Jacksonville State Gamecocks",
    "away_team": "Ohio Bobcats",
    "scores": null,
    "last_update": null
  }
]
var scoresNfl=[
  {
    "id": "03dd880f071a65053e37000d3d826e14",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-11T21:35:00Z",
    "completed": true,
    "home_team": "Houston Texans",
    "away_team": "Los Angeles Chargers",
    "scores": [
      {
        "name": "Los Angeles Chargers",
        "score": "12"
      },
      {
        "name": "Houston Texans",
        "score": "32"
      }
    ],
    "last_update": "2025-01-12T07:05:55Z"
  },
  {
    "id": "08e2147df0b21744fdef99cbcdf3edb7",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-12T01:13:00Z",
    "completed": true,
    "home_team": "Baltimore Ravens",
    "away_team": "Pittsburgh Steelers",
    "scores": [
      {
        "name": "Pittsburgh Steelers",
        "score": "14"
      },
      {
        "name": "Baltimore Ravens",
        "score": "28"
      }
    ],
    "last_update": "2025-01-12T07:05:55Z"
  },
  {
    "id": "4290cfcaa959dc5b452481cfff521b45",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-12T18:01:00Z",
    "completed": false,
    "home_team": "Buffalo Bills",
    "away_team": "Denver Broncos",
    "scores": null,
    "last_update": null
  },
  {
    "id": "edbc8c5b53a7705b9caa5e1908109e19",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-12T21:31:00Z",
    "completed": false,
    "home_team": "Philadelphia Eagles",
    "away_team": "Green Bay Packers",
    "scores": null,
    "last_update": null
  },
  {
    "id": "afde2a86c73e9809e147d457d4d40f62",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-13T01:01:00Z",
    "completed": false,
    "home_team": "Tampa Bay Buccaneers",
    "away_team": "Washington Commanders",
    "scores": null,
    "last_update": null
  },
  {
    "id": "a190a79160476a82ba6004f69be5729d",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-14T01:00:00Z",
    "completed": false,
    "home_team": "Los Angeles Rams",
    "away_team": "Minnesota Vikings",
    "scores": null,
    "last_update": null
  },
  {
    "id": "e2845c7119bd64fe725e9f9495032d72",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Buffalo Bills",
    "away_team": "Baltimore Ravens",
    "scores": null,
    "last_update": null
  },
  {
    "id": "64bd9fac5bfa8a7fc49ce53c7c784562",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Detroit Lions",
    "away_team": "Green Bay Packers",
    "scores": null,
    "last_update": null
  },
  {
    "id": "ad4656a89ef49a8cccf660f2141182e0",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Detroit Lions",
    "away_team": "Los Angeles Rams",
    "scores": null,
    "last_update": null
  },
  {
    "id": "4d19aa62cfee9c5118758fe4dd827a4e",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Detroit Lions",
    "away_team": "Minnesota Vikings",
    "scores": null,
    "last_update": null
  },
  {
    "id": "0c95381e5634e6c64aa5ca079e669dea",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Philadelphia Eagles",
    "away_team": "Los Angeles Rams",
    "scores": null,
    "last_update": null
  },
  {
    "id": "f61a619d9349872d708e481cb4c8571a",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Philadelphia Eagles",
    "away_team": "Minnesota Vikings",
    "scores": null,
    "last_update": null
  },
  {
    "id": "0b1a23856259f01b20535b791fc23761",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Tampa Bay Buccaneers",
    "away_team": "Minnesota Vikings",
    "scores": null,
    "last_update": null
  },
  {
    "id": "727c062028788fd05ca76b3376e11dfc",
    "sport_key": "americanfootball_nfl",
    "sport_title": "NFL",
    "commence_time": "2025-01-19T18:00:00Z",
    "completed": false,
    "home_team": "Philadelphia Eagles",
    "away_team": "Tampa Bay Buccaneers",
    "scores": null,
    "last_update": null
  }
]
//iHA7kUpK4EdZ7iIUUV0N7yvDM5G3  Clements_Flock

class NCAA extends Component {
  state = {
    theMenu: 'mainCard', theItems: [], opendetailsModal: false, getRamDetails: false, dataAvailable: false, theEvent: 'Upcoming Events', currentID: 1,
    theRamUfc: '', theMarchMadness: false, theNfl: false, theFifa: '', userId: '', userLoggedIn: false, eventToShow: false,
    teamName: '', flockName: '', openLoginModal: false, clickHere1: 'CLICK HERE TO MAKE YOUR PICKS', clickHere2: 'CLICK HERE TO ENTER THE GAME', theEventTime: 0,
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'NFL', pastEventsAvailable: false,
    eventRamUfc: '', eventMarchMadness: '', eventNfl: '', ramUfcMaincardArray: [], pastGames: [], theEventTitle: '', theEventKey: '', ramUfcEarlyPrelimsArray: [], count: 0,
    ramUfcPrelimsArray: [], nflArray: [], marchMadnessArray: [], ufcSubHeadings: '', upcomingGames: [], currentEventUserInfo: {}, allMatches: [], expired: false, nflModal: false,
    firstRoundArray: [], quarterFinalsArray: [], semiFinalsArray: [], finalArray: [], allEvents: [], currentSelection: '', isFirstRoundDataAvailable: false,allGames:[],
    isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,endTime:'',editType:'',eventToNFLModal:'',
    isFirstRoundPicked:false,isQuarterFinalsPicked:false,isSemiFinalsPicked:false,isFinalsPicked:false,selectHomeEvent:false,itemsToNFLModal:[]
  }
  componentDidMount = () => {
    //this.sendMatchesToFirebase()
    //this.checkAuth()

    //this.getRanking()
    //this.checkForOddsUpdate()

    //this.getNFLMatches()
  
    //this.getNCAAFResults()

    //this.arrangeArray()
      this.checkAuth()

  }
  arrangeArray=async()=>{
    var fullFormatedArray=[]
    scoresNfl.map((item,index)=>{
      var formatedArray={}
      console.log('scores',item.scores)  
      formatedArray['id'] =item.id        
    if(item.scores&&item.completed===true){
      var homeTeam=item.home_team
      var awayTeam=item.away_team
      var item1Name=item.scores[0]['name']
      var item2Name=item.scores[1]['name']
      var homeTeamScore='',awayTeamScore='',theWinner=''
      var item1Score=Number(item.scores[0]['score'])
      var item2Score=Number(item.scores[1]['score'])
      
      if(homeTeam===item1Name){homeTeamScore=item1Score}
      if(awayTeam===item2Name){awayTeamScore=item2Score}
      if(homeTeam===item2Name){homeTeamScore=item2Score}
      if(awayTeam===item1Name){awayTeamScore=item1Score}
      if(awayTeamScore>homeTeamScore){theWinner='player2'}
      if(awayTeamScore<homeTeamScore){theWinner='player1'}
      scoresNfl[index]['winner']=theWinner
      formatedArray['theWinner']=theWinner
      /*console.log('scores 1 name',item.scores[0]['name'])
      console.log('scores 2 name',item.scores[1]['name'])
      console.log('scores 1 score',item.scores[0]['score'])
      console.log('scores 2 score',item.scores[1]['score'])*/
      
      
    }else{formatedArray['theWinner']=''}
    fullFormatedArray.push(formatedArray)
    if(scoresNfl.length===index+1){
      console.log('worked on array',scoresNfl)
      console.log('formatedArray',fullFormatedArray)
    }
    })
  }
  getNCAAFResults=()=>{
    firstRound.map((item,index)=>{
      var gamesId=item.id
      var theF1Name=item.player1.split(' ')
      theF1Name=theF1Name[0]
      var theF2Name=item.player2.split(' ')
      theF2Name=theF2Name[0]
      var name1=item.player1
      var name2=item.player2
      ncaafItems.map((item2)=>{
        var oddsId=item2.id  
        if(gamesId===oddsId){
          var theScores=item2.scores
          ////console.log('the theScores',theScores)
          ////console.log('yeeeees ids',gamesId,yesIds)
          if(theScores){
            var withScores = JSON.stringify(theScores);
            withScores = withScores.replace(/,/g, "|").replace(/{/g, " ").replace(/}/g, "").replace(/"/g, "").replace(/]/g, "");
            var homePoints= withScores.split('|')[1].trim().replace('score:','')
            var awayPoints= withScores.split('|')
            awayPoints=awayPoints[awayPoints.length - 1].replace('score:','')
            homePoints=Number(homePoints)
            awayPoints=Number(awayPoints)
            var homeName2=withScores.split('|')[0].replace('[ name:','').replace( /\s\s+/g, ' ' )
            var awayName2=withScores.split('|')
            awayName2=awayName2[awayName2.length - 2].replace('name:','').replace( /\s\s+/g, ' ' )
            //console.log('awayName2',awayName2)
            ////console.log('homePoints',name1,homePoints,'awayPoints',name2,awayPoints,'theWinner',theWinner)
            ////console.log('home details oddds',item2.home_team,'db',theF1Name)
            ////console.log('away details odds',item2.away_team,'db',theF2Name)
            if(item2.home_team.includes(theF1Name)){
              var theWinner=''
              firstRound[index]['p1Points']=homePoints
              if(homePoints>awayPoints){theWinner=name1}
              if(homePoints<awayPoints){theWinner=name2}
              firstRound[index]['winner']=theWinner;
            }
            if(item2.away_team.includes(theF2Name)){
              var theWinner=''
              firstRound[index]['p2Points']=awayPoints
              if(homePoints>awayPoints){theWinner=name1}
              if(homePoints<awayPoints){theWinner=name2}
              firstRound[index]['winner']=theWinner;
            }
            //console.log('firstRoundlllllll',firstRound)
          }
        }
      })
    })
  }
  sendMatchesToFirebase = () => {
    var generalDb = firebase.database().ref('/theEvents/NCAAF/ncaaf20242025/')
    firstRound.map((item, index) => {
      generalDb.child('/firstRound/firstRoundMatch' + index + '/').set(item)
    })
    quarterFinals.map((item, index) => {
      generalDb.child('/quarterFinals/quarterFinalsMatch' + index + '/').set(item)
    })
    semiFinals.map((item, index) => {
      generalDb.child('/semiFinals/semiFinalsMatch' + index + '/').set(item)
    })
    finals.map((item, index) => {
      generalDb.child('/finals/finalsMatch' + index + '/').set(item)
    })
  }
  goToServer = () => {
    this.checkForOddsUpdate()

    // this.checkForOutcome()



    //this.calculateRanking()
    //this.getRanking()  
    //this.checkForOddsUpdate()
    //this.checkForOutcome()
  }

  handleChildClick = (title,item) => {
    this.setState({ count: this.state.count + 1, nflModal: false });
    if(title==='getOdds'&&item.length>10){
    this.checkForOddsUpdate2(item)
    }
    console.log('azeeza', item)
  };
  checkForOddsUpdate2 = async (theLink) => {
    try {
      var theQuery = encodeURIComponent(theLink)
      console.log('the theLink 000000',theLink)
      //return
      var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey+'/'+this.state.editType)
      editDbRef.once('value', dataSnapshot => {
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Update odds time expired')
       }
       else{
        console.log('kufinish kudonjo')
         axios.get("http://localhost:4000/updateNFLOdds?term=" + theQuery)
        .then((res) => {
          var theItems = res.data.result
          ////console.log('theItems', theItems)

        })
       }})
      
    } catch (error) {
      ////console.log('error', error)
    }
  }
  checkForOddsUpdate = async () => {
    try {
     
      if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
      var theLink = 'theEvents::NFL::' + this.state.theEventKey + '::' + this.state.currentSelection+'::'+this.state.editType
      var theQuery = encodeURIComponent(theLink)
      console.log('the theLink 11111',theLink)
      //return
      var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey+'/'+this.state.editType)
      editDbRef.once('value', dataSnapshot => {
       
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Update odds time expired')
       }
       else{
         axios.get("http://localhost:4000/updateNFLOdds?term=" + theQuery)
        .then((res) => {
          var theItems = res.data.result
          ////console.log('theItems', theItems)

        })
       }})
      
    } catch (error) {
      ////console.log('error', error)
    }
  }
  checkForOutcome=async () => {
    try {
      //theEvents::NCAAF::ncaaf20242025::firstRound
      var scoreName=''
      if(!this.state.theEventKey||this.state.theEventKey.length<3)return
      
      //var theLink2='theEvents::ramUfc::'+theK
      if(this.state.currentSelection==='wildCard'){scoreName='wildCardScore'}
      if(this.state.currentSelection==='divisionalRound'){scoreName='divisionalRoundScore'}
      if(this.state.currentSelection==='conferenceChampionship'){scoreName='conferenceChampionshipScore'}
      if(this.state.currentSelection==='superBowl'){scoreName='superBowlScore'}
      var theLink='theEvents::NFL::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName
      if(!this.state.theEventKey||this.state.theEventKey.length===0)return
      
      var theQuery=encodeURIComponent(theLink)
      console.log('theLink',theLink)
      //return
      await axios.get("http://localhost:4000/getNFLResults?term="+theQuery)
        .then((res) => {
          ////console.log('theItems',res)
          var theOutcome = res.data
          ////console.log('theItems',theOutcome)
          if(theOutcome==='sucesss'){}
        })
        } catch (error) {
          ////console.log('error',error)
        }
    }
     /*calculateRanking=(theArr)=>{
        var dbLink2="/userBets/scoreBoards/ramUfc/ufc-310-December72024/"
        var dbLink3="/userBets/ramUfc/ufc-310-December72024/"
        var dbLink4='/ramData/events/ramUfc/ufc-310-December72024/details/currentScore/'
        var dbLink5='/ramData/events/ramUfc/ufc-310-December72024/details/currentRank/'
       
         var scoreBoardDb=firebase.database().ref(dbLink2)
         var theUserBets=firebase.database().ref(dbLink3)
         var usersDb=firebase.database().ref('/users/')
         theUserBets.once('value',dataSnapshot=>{
         var theNo=dataSnapshot.numChildren()
         var h=0,theAllItems={},theArrCount=[]
         dataSnapshot.forEach((data,index) => {
          h++
          var betsObj= data.val()
          var theUid= data.key
          var userArr=[],i=0
          for(var key in theArr){
            i++
            var matchId=theArr[key]['id']
            var theWinner=theArr[key]['winner']
            var theWinnerSelected=betsObj[matchId]
            var thePoints=0
            if(theWinner===theWinnerSelected){
              if(theWinner==='player1'){thePoints=theArr[key]['p1Points']}
              if(theWinner==='player2'){thePoints=theArr[key]['p2Points']}
              userArr.push(thePoints)
            }else{
              userArr.push(0)
            }
            if(theArr.length===i){
              var pointsSum = userArr.reduce((partialSum, a) => partialSum + a, 0);
              pointsSum=Number(pointsSum.toFixed(2))
              var theItem={}
              theItem[theUid]=pointsSum
              theAllItems[theUid]=pointsSum
              var countArr={id:theUid,points:pointsSum}
              theArrCount.push(countArr)
              usersDb.child(theUid+dbLink4).set(pointsSum+'')
            }
       }
       if(theNo===h){
        theArrCount=theArrCount.sort(function(a, b){return b.points - a.points})
        var countIndex = theArrCount.findIndex(x => x.id ===this.state.userId);
        theArrCount.map((item,index)=>{
        var theRank=index+1+'/'+theNo
        usersDb.child(item.id+dbLink5).set(theRank)
        })
        scoreBoardDb.update(theAllItems,(error) => {
          if (error) {
            ////console.log('Score board noooooot updated successfully')
          }else{
            ////console.log('Score board updated successfully')
          }
      })
       }
  })})
}
getRanking = async() => {
var dbLink1='/theEvents/ramUfc/ufc-310-December72024/'
var theDbEvent=firebase.database().ref(dbLink1)
var i=0, j=0, k=0,allUsersBetsArr=[]
await theDbEvent.child('mainCardShort').once('value',dataSnapshot=>{
  var mainCardNo=dataSnapshot.numChildren()
  dataSnapshot.forEach((data,index) => {
    i++
      var theValue=data.val()
      theValue['id']=data.key
      allUsersBetsArr.push(theValue)
      if(i===mainCardNo){
        theDbEvent.child('prelimsShort').once('value',dataSnapshot=>{
          if(!dataSnapshot.val()){
            this.calculateRanking(allUsersBetsArr)
          }else{
            var prelimNo=dataSnapshot.numChildren()
            dataSnapshot.forEach((data,index) => {
              j++
              var theValue=data.val()
              theValue['id']=data.key
               allUsersBetsArr.push(theValue)
              if(j===prelimNo){
               theDbEvent.child('earlyPrelimsShort').once('value',dataSnapshot=>{
                var earlyPrelimNo=dataSnapshot.numChildren()
                if(!dataSnapshot.val()){
                  this.calculateRanking(allUsersBetsArr)
                }else{
                dataSnapshot.forEach((data,index) => {
                 k++
                var theValue=data.val()
                theValue['id']=data.key
                allUsersBetsArr.push(theValue)
                 if(k===earlyPrelimNo){
                  this.calculateRanking(allUsersBetsArr)
                 }
                })}
                
              })
              } }) } }) } }) })
}*/
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId) }

      } else {
        this.setState({ userLoggedIn: false })
        this.checkUpcomingPastGames(userId)
      }
    })
  }

  checkUpcomingPastGames = async (userId) => {
    //return
//console.log('naingia2222222222222')
    var gamesInfo = firebase.database().ref('/theEvents/NFL/eventsIds/')
    var i = 0, allGames = []

    await gamesInfo.once('value', dataSnapshot => {
      var gamesCount = dataSnapshot.numChildren()
      //console.log('naingia 3333',gamesCount)
      dataSnapshot.forEach((data) => {
        //console.log('naingia 44444',data)
        i++
        var pastG = {}, upcomingG = {}, theEvents = {}
        var key = data.key
        var time = data.val().time
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        var theData = data.val()
        var currentSelection = data.val().currentSelection
        theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection,theData:theData }
        allGames.push(theEvents)

        if (gamesCount === i) {
          var theEventTitle = '', theEventKey = '', theEventTime = 0
          if (allGames.length > 0) { allGames = allGames.sort(function (a, b) { return a.time - b.time }); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'],endTime= allGames[0]['endTime']}
        }
        var expired = false
        if ((theEventTime - new Date().getTime()) < 86400000) {
          expired = true
        }
        if ((currentSelection === 'wildCard')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: false, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopWildCardEdit'})
        }
        if ((currentSelection === 'divisionalRound')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: false, isFinalsDataAvailable: false,editType:'stopDivisionalRoundEdit' })
        }
        if ((currentSelection === 'conferenceChampionship')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: true, isFinalsDataAvailable: false,editType:'stopConferenceChampionshipEdit'})
        }
        if ((currentSelection === 'superBowl')) {
          this.setState({isFirstRoundDataAvailable: true, isQuarterFinalsDataAvailable: true, isSemiFinalsDataAvailable: true, isFinalsDataAvailable: true,editType:'stopSuperBowlEdit'})
        }
        this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection, expired,endTime }, () => {
          this.getNFLMatches(userId)
          //////console.log('currentSelection',this.state.currentSelection)
        })
      })
    })
  }
  getNFLMatches = (userId) => {
    allMatches = []
    this.setState({ firstRoundArray: [], quarterFinalsArray: [], semiFinalsArray: [], finalArray: [], theMenu: 'mainCard', dataAvailable: false, currentEventUserInfo: {} })
    var userInfoDb = firebase.database().ref('/theEvents/NFL/').child(this.state.theEventKey)
    userInfoDb.once('value', dataSnapshot => {
      //////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      //////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var firstRoundCount = dataSnapshot.child('wildCard').numChildren()
      var quarterFinalsCount = dataSnapshot.child('divisionalRound').numChildren()
      var semiFinalsCount = dataSnapshot.child('conferenceChampionship').numChildren()
      var finalsCount = dataSnapshot.child('superBowl').numChildren()
      var theInfo = dataSnapshot.val()
      //console.log('the event eventSelection', theInfo)
      ////console.log('ncaaf20242025', theInfo.finals)
      if (theInfo.wildCard) {
        var array1 = []
        var i = 0
        for (var key in theInfo.wildCard) {
          i++
          var theData = theInfo.wildCard[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === firstRoundCount) {
            //console.log('whole maincard Array',array1)
            this.setState({ firstRoundArray: array1, theItems: array1 })
          }
        }
      }
      if (theInfo.divisionalRound) {
        var array1 = []
        //////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.divisionalRound) {
          i++
          var theData = theInfo.divisionalRound[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === quarterFinalsCount) {
            //////console.log('whole prelimms Array',array1)
            this.setState({ quarterFinalsArray: array1 })
            this.getMatchesInfo(this.state.userId,'wildCard')
          }
        }
        //prelimsArray
      } else {
        //////console.log('hakuna prelimsssssss')
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'wildCard')
        }
      }
      ////console.log('iko finalssssssssssssssssss 0000')
      if (theInfo.conferenceChampionship) {
        var array1 = []
        //////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.conferenceChampionship) {
          i++
          var theData = theInfo.conferenceChampionship[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === semiFinalsCount) {
            //console.log('wholesemiFinalsArray',array1)
            this.setState({ semiFinalsArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId,'divisionalRound')
              //this.getMatchesInfo(this.state.userId,'semiFinals')
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'divisionalRound')
          //////console.log('hakuna early prelimsssssss')
        }
      }
      ////console.log('iko finalssssssssssssssssss 1111')
      if (theInfo.superBowl) {
        var array1 = []
        ////console.log('iko finalssssssssssssssssss 2222')
        var i = 0
        for (var key in theInfo.superBowl) {
          i++
          var theData = theInfo.superBowl[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === finalsCount) {
            //////console.log('whole early prelimms Array',array1)
            this.setState({ finalArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId,'conferenceChampionship')
              this.getMatchesInfo(this.state.userId,'superBowl')
              
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId,'conferenceChampionship')
          //////console.log('hakuna early prelimsssssss')
        }
      }
    })
    //////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
  }
  getMatchesInfo = async (userId,selection) => {
    //////console.log('allMatches',userId,this.state.theEventKey)
    //return
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NFL/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFL/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFL/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NFL/')
    var currentEventUserInfo = '',totalScore=0
    await selectedMatchesKeyDb.once('value', dataSnapshot => {
      //////console.log('the key',dataSnapshot.val())
      if (!dataSnapshot.val()) return
      photoRefDb.once('value', dataSnapshot => {
        //////console.log('proofile photo',dataSnapshot.val())
        if (dataSnapshot.val()) {
          this.setState({ profilePhoto: dataSnapshot.val() })
        }
      })
      userInfoDb.once('value', dataSnapshot => {
        if (!dataSnapshot.val()) return
        //console.log('the type user 0000000000000', dataSnapshot.val())
        if (dataSnapshot.val()) {
          var theInfo = dataSnapshot.val()
          this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank })
          currentEventUserInfo = dataSnapshot.val()
          totalScore=Number(theInfo.firstRoundScore)+Number(theInfo.quarterFinalsScore)+Number(theInfo.semiFinalsScore)+Number(theInfo.finalsScore)
          //console.log('the dddddddd',theInfo)

        }
      })
      var thetrrrr = ''
      ////console.log('this.state.currentSelection', this.state.currentSelection)
     // //console.log('firstRoundArray',this.state.firstRoundArray,'quarterFinalsArray',this.state.quarterFinalsArray,'semiFinalsArray',this.state.semiFinalsArray)
      if (selection === 'wildCard') {
        thetrrrr = this.state.firstRoundArray
      }
      if (selection === 'divisionalRound') {
        thetrrrr = this.state.quarterFinalsArray
      }
      if (selection === 'conferenceChampionship') {
        thetrrrr = this.state.semiFinalsArray
      }
      if (selection === 'superBowl') {
        thetrrrr = this.state.finalArray
      }

      //var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]
      
      userBetsDb.once('value', dataSnapshot => {
        //////console.log('the bets data',dataSnapshot.val())
        //////console.log('this.state.theItems',this.state.theItems)
        if (!dataSnapshot.val()) return
        var itemsCount = dataSnapshot.numChildren()
        //console.log('selection',selection,'itemsCount',itemsCount)
            if(itemsCount===6){this.setState({isFirstRoundPicked:true})}
            if(itemsCount===10){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true})}
            if(itemsCount===12){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true})}
            if(itemsCount===13){this.setState({isFirstRoundPicked:true,isQuarterFinalsPicked:true,isSemiFinalsPicked:true,isFinalsPicked:true})}
            if(selection==='wildCard'&&itemsCount<6)return
            if(selection==='divisionalRound'&&itemsCount<10)return
            if(selection==='conferenceChampionship'&&itemsCount<12)return
            if(selection==='superBowl'&&itemsCount<13)return
            console.log('MEGA count',selection,itemsCount)
        var i = 0, thePoints = [], currentScore = []
        dataSnapshot.forEach((data, index) => {
          i++
        //  //console.log('thank DAATA',selection,data.val())
          thetrrrr.map((item) => {
            //////console.log('thank you sir',item.winner)
            if (item.id === data.key) {
              ////console.log('thank you sir')
              item['bet'] = data.val()
              if (item.status1 === 'played') {

                //////console.log('item.winner',item.winner)
                //////console.log('my beeeeet',data.val())
                //////console.log('item.p1Points',item.p1Points)
                //////console.log('item.p2Points',item.p2Points)
                if (item.winner === 'player1' && data.val() === 'player1') { currentScore.push(item.p1Points);thePoints.push(item.p1Points);}
                if (item.winner === 'player2' && data.val() === 'player2') { currentScore.push(item.p2Points);thePoints.push(item.p2Points);}
                //////console.log('p1 pointsss',currentScore)

              }else{
              if (data.val() === 'player1') {
                thePoints.push(item.p1Points);//////console.log('the points',item.p1Points)
              }
              if (data.val() === 'player2') {
                thePoints.push(item.p2Points);//////console.log('the points',item.p2Points)
              }}
            }
          })
          /*this.state.theItems.map((item)=>{
           if(item.id===data.key){
            //////console.log('thank you sir')
            item['bet']=data.val()
            if(item.status1==='played'){
              if(data.val()==='player1'){currentScore.push(item.p1Points);}
            if(data.val()==='player2'){currentScore.push(item.p2Points);}
            }
            if(data.val()==='player1'){thePoints.push(item.p1Points);//////console.log('the points',item.p1Points)
              }
            if(data.val()==='player2'){thePoints.push(item.p2Points);//////console.log('the points',item.p2Points)
              }
          }
          })*/
          if (itemsCount === i) {

            this.setState({ dataAvailable: true })
            return
            /* if(this.state.theMenu==='mainCard'){this.setState({ramUfcMaincardArray:this.state.theItems})}
             if(this.state.theMenu==='prelimms'){this.setState({ramUfcPrelimsArray:this.state.theItems})}
             if(this.state.theMenu==='earlyPrelims'){this.setState({ramUfcEarlyPrelimsArray:this.state.theItems})}*/

            //if (selection=== 'firstRound') { this.setState({ firstRoundArray: this.state.theItems}) }
            //if (selection === 'quarterFinals') { this.setState({ quarterFinalsArray: this.state.theItems}) }
           // if (selection === 'semiFinals') { this.setState({ semiFinalsArray: this.state.theItems}) }
            //if (selection === 'finals') { this.setState({ finalArray: this.state.theItems}) }
            //////console.log('this.state.theItems',this.state.theItems)
            
          //console.log('thePointsssss',thePoints)
            //////console.log('currentScore',currentScore.length)
        //to do do current score additions
            var pointsSum = thePoints.reduce((partialSum, a) => partialSum + a, 0);
            pointsSum = pointsSum.toFixed(2)

            //gamesDataRef.child(this.state.theEventKey + '/details/bestPossibleScore/').set(pointsSum)
            currentEventUserInfo['bestPossibleScore'] = pointsSum
            this.setState({ currentEventUserInfo })

            if (currentScore.length > 0) {
              var scoreSum = currentScore.reduce((partialSum, a) => partialSum + a, 0);
              scoreSum = scoreSum.toFixed(2)

              currentEventUserInfo['currentScore'] = scoreSum
              this.setState({ currentEventUserInfo })
              ////console.log('currentEventUserInfo', currentEventUserInfo).

             // userInfoDb.child('/currentScore/').set(scoreSum)
              //userInfoDb.child(this.state.currentSelection+'Score').set(scoreSum)
            }
          }
        })
      })

    })
  }
  loadOtherFights = async (theEventKey, theEventTitle) => {
    var eventsInfo = firebase.database().ref('/theEvents/eventsIds/' + theEventKey + '/time')
    await eventsInfo.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      var theEventTime = dataSnapshot.val()
      var expired = false
      if ((theEventTime - new Date().getTime()) < 86400000) {
        expired = true
      }
      if (navigator.onLine === false) {
        this.notify('No internet! please check your internet connection')
        return
      }
      this.setState({ theEventKey, theEventTitle, expired }, () => {
        this.getNFLMatches()
      })
    })
  }
  getGamesInfo = async () => {
    var userInfoDb = firebase.database().ref('/events/')

    await userInfoDb.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      if (theInfo.ramUfc !== false) { this.setState({ eventRamUfc: true, ufcSubHeadings: theInfo.ramUfc.split(':') }); this.getUfcItems('ramUfc'); }
      if (theInfo.marchMadness === true) { this.setState({ eventMarchMadness: true }), this.getNflMarchMadnessItems('marchMadness', 'marchMadnessArray') }
      if (theInfo.nfl === true) { this.setState({ eventNfl: true }), this.getNflMarchMadnessItems('nfl', 'nflArray') }

    })
  }
  getUfcItems = async (name) => {
    var userInfoDb = firebase.database().ref('/activeEvents/').child(name)

    userInfoDb.once('value', dataSnapshot => {
      //////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      //////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var mainCardCount = dataSnapshot.child('mainCard').numChildren()
      var prelimsCount = dataSnapshot.child('prelims').numChildren()
      var theInfo = dataSnapshot.val()
      //////console.log('the event eventSelection',theInfo) 
      if (theInfo.mainCard) {
        var array1 = []
        //////console.log('iko maincarddddd',theInfo.mainCard)
        var i = 0
        for (var key in theInfo.mainCard) {
          i++
          var theData = theInfo.mainCard[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === mainCardCount) {
            //////console.log('whole maincard Array',array1)
            this.setState({ ramUfcMaincardArray: array1 })
            this.setState({ theItems: array1 })
          }
        }
      }
      if (theInfo.prelims) {
        var array1 = []
        //////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.prelims) {
          i++
          var theData = theInfo.prelims[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === prelimsCount) {
            //////console.log('whole prelimms Array',array1)
            this.setState({ ramUfcPrelimsArray: array1 })
          }
        }
        //prelimsArray
      } else {
        //////console.log('hakuna prelimsssssss')
      }
    })
  }
  getNflMarchMadnessItems = async (name, theArr) => {
    var userInfoDb = firebase.database().ref('/activeEvents/').child(name)
    userInfoDb.once('value', dataSnapshot => {
      var count = dataSnapshot.numChildren()
      var theInfo = dataSnapshot.val()
      //////console.log('the event eventSelection',theInfo) 
      if (theInfo) {
        var array1 = []
        //////console.log('iko maincarddddd',theInfo)
        var i = 0
        for (var key in theInfo) {
          i++
          var theData = theInfo[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === count) {
            //////console.log('whole maincard Array',array1)
            this.setState({ [theArr]: array1 })
          }
        }
      }
    })
  }

  getRamInfo = async (userId, event) => {
    var userInfoDb = firebase.database().ref('/users/' + userId).child('upcomingEvents').child(event)
    userInfoDb.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      if (event === 'ramUfc') { selectedRamUfcArray = theInfo }
      if (event === 'marchMadness') { selectedMarchMadnesArray = theInfo }
      if (event === 'nfl') { selectedNflArray = theInfo }
      //hapa ndo nimefika
      ////////console.log('the event eventSelection',theInfo.eventSelection) 
      var currentRank = ''
      if (theInfo.currentRank === false) { currentRank = 'N/A' } else { currentRank = theInfo.currentRank }
      this.setState({
        flockName: theInfo.flockName, teamName: theInfo.teamName, currentScore: theInfo.currentScore,
        bestPossibleScore: theInfo.bestPossibleScore, currentRank: currentRank, theItems: theInfo.eventSelection
      })
      this.getCurrentScore(theInfo.eventSelection)
      //localStorage.set('userDetails', userDetails);
    })
    return

    this.setState({ theRamUfc: theRamUfc, theMarchMadness, theNfl, theFifa })
    this.setState({ theRamUfc: theRamUfc }, () => {
      ////////console.log('theRamUfc 99999999999999',this.state.theRamUfc);
    });
    ////////console.log('this.state.theRamUfc 2525',this.state.theRamUfc)
    var userInfoDb = firebase.database().ref('/users/' + userId).child('upcomingEvents')
    if (theRamUfc === 'selected') {
      this.setState({ dataAvailable: true, clickHere1: 'CLICK HERE TO EDIT YOUR PICKS', clickHere2: 'CLICK HERE TO EDIT THE GAME' })
      userInfoDb.child('ramUfc').once('value', dataSnapshot => {
        var theInfo = dataSnapshot.val()
        ////////console.log('the event eventSelection',theInfo.eventSelection) 
        var currentRank = ''
        if (theInfo.currentRank === false) { currentRank = 'N/A' } else { currentRank = theInfo.currentRank }
        this.setState({
          flockName: theInfo.flockName, teamName: theInfo.teamName, currentScore: theInfo.currentScore,
          bestPossibleScore: theInfo.bestPossibleScore, currentRank: currentRank, theItems: theInfo.eventSelection
        })
        this.getCurrentScore(theInfo.eventSelection)
        //localStorage.set('userDetails', userDetails);
      })
    }
    //else{this.setState({theItems:mainCard})}
  }
  getCurrentScore = async (theItems) => {
    var i = 0, theAmount = []
    theItems.map((item, index) => {
      var amount = 0
      ////////console.log('kufinish kumalo 1')
      i++
      if (item.status1 === 'played') {
        ////////console.log('kufinish kumalo 2',item.bet,item.winner)
        if (item.bet === 'player1' && item.winner === 'player1') {
          amount = Number(item.p1Points)
          theAmount.push(amount)
          ////////console.log('kufinish kumalo 3')
        }
        if (item.bet === 'player2' && item.winner === 'player2') {
          amount = Number(item.p2Points)
          theAmount.push(amount)
          ////////console.log('kufinish kumalo 4')
        }

        ////////console.log('kufinish kumalo 4B',i,theItems.length)
        if (i === theItems.length) {
          ////////console.log('kufinish kumalo 5')
          const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
          ////////console.log('the current Score',sum)
          this.setState({ currentScore: sum.toFixed(2) })
        }
      }
    })
  }


  hideModal = () => {
    this.setState({ opendetailsModal: false })
    ////////console.log('Button clicked!');
  };
  openTheModal =async () => {
    //this.notify("Can't make a pick at the moment")
    //return
    //console.log('ratatata',this.state.userLoggedIn)
    //this.sendMatchesToFirebase()
    //return
    if(this.state.userLoggedIn===false){
      this.notify("Please Log In to continue")
      this.setState({openLoginModal:true})
      return
    }var itemToModals=''
    if (this.state.currentSelection === 'wildCard') { itemToModals = this.state.firstRoundArray}
    if (this.state.currentSelection === 'divisionalRound') { itemToModals = this.state.quarterFinalsArray }
    if (this.state.currentSelection === 'conferenceChampionship') { itemToModals = this.state.semiFinalsArray }
    if (this.state.currentSelection === 'superBowl') { itemToModals = this.state.finalArray }
   var i=0,pointMissing=false
   console.log('this.state.theItems',itemToModals)
   await itemToModals.map((item,index)=>{
    i++
      //console.log('item.p1Points',item.p1Points)
      if(item.p1Points==='N/A'||item.p2Points==='N/A'){
        pointMissing=true
      }
     if(itemToModals.length===index+1){
     if(pointMissing===true){
      this.notify('Event points not yet populated')
     }else{
      this.openTheModal2()
     }
     }
    })
    
    /*if(isAvailable===false){
      this.notify("Can't make a pick at the moment")
      return
    }
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    }*/

  }
 openTheModal2=()=>{
  //console.log('this.state.theEventKey',this.state.theEventKey,this.state.editType)
  var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey+'/'+this.state.editType)
  editDbRef.once('value', dataSnapshot => {
    //console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
   if((new Date().getTime()>dataSnapshot.val())){
    console.log('now 005',new Date().getTime(),dataSnapshot.val())
    this.notify('Event pick/edit not available at the moment')
   }
   else{
    if(this.state.currentSelection!=='wildCard'){
      var theDbRef=firebase.database().ref('/userBets/scoreBoards/NFL/'+this.state.theEventKey)
      theDbRef.child(this.state.userId).once('value', dataSnapshot => {
        //console.log('the dddddddddddd',this.state.userId,dataSnapshot.val())
         if(dataSnapshot.exists()){this.setState({ openLoginModal:false,opendetailsModal: true })}
         else{this.notify("Can't make a pick when the event has already started")}
      })
    }else{
      this.setState({ openLoginModal:false, opendetailsModal:true})
    }
   }
 })
 }
  opeModal2 = () => {
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    }
    this.setState({ editDetailsModal: true })
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
  chooseHomeEvent=(event)=>{
  event.stopPropagation()
  event.preventDefault()
  this.setState({selectHomeEvent:true})
  }
  sendEvent=(event,data,id)=>{
    event.stopPropagation()
    event.preventDefault()
    data['id']=id
    //console.log('data',data)
    var theDb=firebase.database().ref('/theEvents/eventToShowHomePage/')
    theDb.set(data,error=>{
      if(!error){
        this.setState({selectHomeEvent:false})
        this.notify('Selected Succesfully')
      }
    })
    }
    updateEvent=async()=>{
      var oddsApi="https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
      const response = await axios.get(oddsApi)
      var theOddsJson=response.data
      sortOddsJson(theOddsJson)
    }
    openNFLModal=()=>{
      this.setState({itemsToNFLModal:[]})
      var editDbRef=firebase.database().ref('/theEvents/NFL/eventsIds/'+this.state.theEventKey)
      editDbRef.once('value', dataSnapshot => {
        var data=dataSnapshot.val()
        var selection=data.currentSelection
        var wildCartEditExpiry=data.stopWildCardEdit
        var divisionalRoundEditExpiry=data.stopDivisionalRoundEdit
        var conferenceChampionshipEditExpiry=data.stopConferenceChampionshipEdit
        var superBowlEditExpiry=data.stopSuperBowlEdit
        if(selection==='wildCard'&&new Date().getTime()>wildCartEditExpiry){
          console.log('wild card expired')
          this.setState({eventToNFLModal:'divisionalRound',itemsToNFLModal:this.state.quarterFinalsArray,nflModal:true})
        }else if(selection==='wildCard'&&new Date().getTime()<wildCartEditExpiry){
          var allArray=[...this.state.firstRoundArray,...this.state.quarterFinalsArray,...this.state.semiFinalsArray,...this.state.finalArray]
          this.setState({eventToNFLModal:'wildCard',itemsToNFLModal:allArray,nflModal:true})
        }
        if(selection==='divisionalRound'&&new Date().getTime()>divisionalRoundEditExpiry){
          console.log('divisional Round expired')
          this.setState({eventToNFLModal:'conferenceChampionship',itemsToNFLModal:this.state.semiFinalsArray,nflModal:true})
        }else if(selection==='divisionalRound'&&new Date().getTime()<divisionalRoundEditExpiry){
          this.setState({eventToNFLModal:'divisionalRound',itemsToNFLModal:this.state.quarterFinalsArray,nflModal:true})
        }
        if(selection==='conferenceChampionship'&&new Date().getTime()>conferenceChampionshipEditExpiry){
          console.log('hapa kwa superbowl 111',this.state.finalArray)
          //return
          this.setState({eventToNFLModal:'superBowl',itemsToNFLModal:this.state.finalArray,nflModal:true})
        }else if(selection==='conferenceChampionship'&&new Date().getTime()<conferenceChampionshipEditExpiry){
          this.setState({eventToNFLModal:'conferenceChampionship',itemsToNFLModal:this.state.semiFinalsArray,nflModal:true})
        }
        if(selection==='superBowl'&&new Date().getTime()>superBowlEditExpiry){
          console.log('wild card expired')
          this.notify("Can't enter event details to an expired event")
        }else if(selection==='superBowl'&&new Date().getTime()<superBowlEditExpiry){
          console.log('hapa kwa superbowl')
          return
          this.setState({eventToNFLModal:'superBowl',itemsToNFLModal:this.state.finalArray,nflModal:true})
        }
        /*console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
       if((new Date().getTime()>dataSnapshot.val())){
        this.notify('Event pick/edit time expired')
       }*/
      })
      //this.setState({nflModal:true,eventToNFLModal:''})
    }
  render() {
   // //console.log('this.state.isFirstRoundDataAvailable',this.state.isFirstRoundDataAvailable)
    ////console.log('this.state.isQuarterFinalsDataAvailable',this.state.isQuarterFinalsDataAvailable)
    ////console.log('this.state.isSemiFinalsDataAvailable',this.state.isSemiFinalsDataAvailable)
    ////console.log('this.state.isFinalsDataAvailable',this.state.isFinalsDataAvailable)
    var flockTeamName = ''
    var itemToModals = ''
    var isPastEvent=''
    var todayInMillis=new Date().getTime()
    var showBestPossible=''
   if(this.state.endTime<todayInMillis&&(this.state.endTime-todayInMillis)<-86400000){
    isPastEvent=false
   }else{ isPastEvent=true}

   
    if (this.state.currentSelection === 'wildCard') { itemToModals = this.state.firstRoundArray,showBestPossible=this.state.isFirstRoundPicked}
    if (this.state.currentSelection === 'divisionalRound') { itemToModals = this.state.quarterFinalsArray,showBestPossible=this.state.isQuarterFinalsPicked }
    if (this.state.currentSelection === 'conferenceChampionship') { itemToModals = this.state.semiFinalsArray,showBestPossible=this.state.isSemiFinalsPicked }
    if (this.state.currentSelection === 'superBowl') { itemToModals = this.state.finalArray,showBestPossible=this.state.isFinalsPicked}



    if (this.state.dataAvailable) { flockTeamName = this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] }
    else { flockTeamName = false }
    //if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    return (
      <><div className={style.container}>
        {/*<div className={style.eventsCont}>
          <p className={style.eventsP} id={this.state.theEvent === 'Upcoming Events' ? style.playerP1 : style.playerP} onClick={() => this.setState({ theEvent: 'Upcoming Events' })}>UPCOMING EVENTS</p>
          <p className={style.eventsP} style={{ color: this.state.pastEventsAvailable ? null : '#b2b2b2', borderColor: this.state.pastEventsAvailable ? null : '#b2b2b2' }} id={this.state.theEvent === 'Past Events' ? style.playerP1 : style.playerP} onClick={() => this.state.pastEventsAvailable ? this.setState({ theEvent: 'Past Events' }) : null}>PAST EVENTS</p>
        </div>*/}
        {this.state.allEvents.length > 0 ? <div className={style.matchesHeadDiv}>
          {this.state.allEvents.map((item, index) => {
            var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
          
            var theColor='#292f51',timing='Active Event'
            if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
              theColor='#919191'
              timing='Past Event'
            }
            if(this.state.theEventKey===item.id){
              theColor='#CB1E31'
            }
            return (
              <div className={style.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title)}>
               <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||this.state.userId==='zZTNto5p3XVSLYeovAwWXHjvkN43'||this.state.userId==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event)}/>
                {this.state.selectHomeEvent?<div className={style.selectHomeEventDiv} onClick={()=>this.setState({selectHomeEvent:false})}><button onClick={(event)=>this.sendEvent(event,item.theData,item.id)}>Make home event</button></div>:null}</>:null}  
              </div>  
            )
          })}
        </div> : null}
        <div className={style.profileDiv}>
          <div className={style.imageDiv}>
            {this.state.profilePhoto.length ? <img src={this.state.profilePhoto} /> :
              <IoPersonSharp className={style.personIC} />}
          </div>
          <div className={style.detailsDiv}>
            <p>RAM Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['teamName'] : 'N/A'}</p>
            <p>Flock Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['flockName'] : 'N/A'}</p>
            {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.opeModal2()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal()}>Make Picks</p>}
          </div>
        </div>
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?<div className={style.eventCreationDiv}>
          <p className={style.eventP} onClick={() => this.openNFLModal()}>Enter Event Details</p>
          <p className={style.eventP2} onClick={() =>this.setState({eventToNFLModal:'wildCard',nflModal:true})}>Create New NFL Event</p>
        </div>:null}
        <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
        <div className={style.picksDiv} onClick={() => this.openTheModal()}>
          {/*<p className={style.picksP}>CLICK HERE MAKE YOUR PICKS</p>*/}
          {this.state.dataAvailable ?
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
            /> : <TypeAnimation
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
        {this.state.userId === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'?
          <div>
            <button className={style.resultsBtn} onClick={() => this.checkForOddsUpdate()}>Update Match Odds</button>
            <button className={style.resultsBtn} onClick={() => this.checkForOutcome()}>Fetch Results Updates</button>
          </div> : null}

        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.currentP}>{this.state.currentSelection}</p>
            <p className={style.scoreP1}>Best possibe Score:<br/></p>
            <p className={style.scoreP2}>{this.state.dataAvailable&&showBestPossible?this.state.currentEventUserInfo['bestPossibleScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont2}>
            <p className={style.scoreP1}>Cumulative Score</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? this.state.currentEventUserInfo['currentScore'] : '0.00'} points</p>
          </div>
          <div className={style.scoresCont3}>
            <p className={style.scoreP1}>Current Rank in NFL</p>
            <p className={style.scoreP2}>{this.state.dataAvailable && this.state.currentRank ? this.state.currentRank : 'N/A'}</p>
          </div>
        </div>
        <div className={style.divCont}>
          <div className={style.divCont}>
            <p className={style.titleP}>Wild Card</p>
            <div className={style.listCont}>           
        {this.state.firstRoundArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NFL Wild Card Round</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1NickName}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2NickName}</p>
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
              {this.state.isFirstRoundPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}
              </div></div>
          <div className={style.divCont}>
            <p className={style.titleP}>Divisional Round</p>
            <div className={style.listCont}>{/*this.itemComponent(this.state.quarterFinalsArray, 'NCAAF Quarter Finals')*/}
            {this.state.quarterFinalsArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NFL Divisional Round</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1NickName}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2NickName}</p>
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
              {this.state.isQuarterFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}
              </div></div>
          <div className={style.divCont}>
            <p className={style.titleP}>Conference Championship</p>
            <div className={style.listCont}>
        {this.state.semiFinalsArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>NFL Conference Championship</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1NickName}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2NickName}</p>
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
              {this.state.isSemiFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}</div></div>
          <p className={style.titleP}>Super Bowl</p>
          <div className={style.listCont} style={{ justifyContent: 'center' }}>           
        {this.state.finalArray.map((item, index) => {
        var playStat = ''
        var playStatCol = ''
        if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
        if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
        if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
        var timeDiff = item.timeInMillis - new Date().getTime()
        var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
        var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
        var player1Color = ''
        var player2Color = ''
        var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
        if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
        if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
        if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
        if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
        //myOutcome
        var myPick = ''
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>Super Bowl</p>
                <p>{theTime}</p>
              </div>

              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player1NickName}</p>
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  <p className={style.P1}>{item.player2NickName}</p>
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
              {this.state.isFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
          </div>
        )
  })}</div></div>
      </div>
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={itemToModals} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentSelection} /></div> : null}
        {this.state.openLoginModal ? <div className={style.detailsModal} onClick={() => this.setState({ openLoginModal: false })}><LogIn /></div> : null}
        {this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null}

        {this.state.nflModal ? <div className={style.detailsModal} onClick={() => this.setState({ nflModal: false })}><NFLModal eventToNFLModal={this.state.eventToNFLModal} itemsToNFLModal={this.state.itemsToNFLModal} onClick={this.handleChildClick} /></div> : null}
        <ToastContainer />
      </>
    )
  }
}

export default NCAA

/*
const firstRoundEdit=[
    {id:'idilulya1',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    {id:'idilulya2',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    {id:'idilulya3',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    {id:'idilulya4',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'First Round'},
    ]
const quarterFinalsEdit=[
      {id:'idilulya5',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
      {id:'idilulya6',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
      {id:'idilulya7',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
      {id:'idilulya8',time:'',timeInMillis:0,player1:'',p1Points:'',p1Rec:'',p2Rec:'',player2:'',p2Points:'',p1Photo:'',p2Photo:'',match:'Quarter Finals'},
    ] */