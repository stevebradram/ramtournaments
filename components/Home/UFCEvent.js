import React, { Component } from 'react'
import style from './UFCEvent.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Link from 'next/link';
import Countdown from 'react-countdown';
import Router,{useRouter,withRouter} from 'next/router'
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';
class UFCEvent extends Component {
  state = {
    theAdsArray: [],
    slidesToShow: 2,
    slidesToScroll: 2,
    theMenu: 'maincard',
    loggedIn: false,
    played: true,
    theItems:[],
    ramUfcMaincardArray:[],
    ramUfcPrelimsArray:[],
    ramUfcEarlyPrelimsArray:[],
    selectedEvent:'RAM UFC',
    allGames:[],sportType:'',
    pastGames:[],theEventTitle:'',theEventKey:'',upcomingGames:[]
  }
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  componentDidMount() {
    this.checkForSelectedEvent()
    //this.checkUpcomingPastGames()
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
    if (window.innerWidth > 600) { this.setState({ slidesToShow: 2, slidesToScroll: 2 }); return }
    if (window.innerWidth < 600) { this.setState({ slidesToShow: 1, slidesToScroll: 1 }); return }
  };
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  checkForSelectedEvent=async(userId)=>{
    var userInfoDb=firebase.database().ref('/theEvents/eventToShowHomePage/')
    await  userInfoDb.once('value',dataSnapshot=>{
      if (!dataSnapshot.val()) {
        this.checkUpcomingPastGames()
        return
      }
      var theData=dataSnapshot.val()
      var endTime=theData.endTime
      var theEventKey=theData.id
      var time=theData.time
      var theEventTitle=theData.title
      var sportType = theData.sportType
      //var theItem={id:key,time:time,title:title,sportType: sportType, endTime: endTime}
      this.setState({theEventTitle, theEventKey, time,endTime,sportType},()=>{
        console.log('items',theEventTitle,theEventKey,time,endTime,sportType)
        if(sportType==='NCAAF'){
         this.getNCAAFMatches()
        }else if(sportType==='NCAAB'){
          this.getNCAABMatches()
         }
         else if(sportType==='NFL'){
          this.getNFLMatches()
         }else if(sportType==='NFLRegular'){
         this.getNFLRegularMatches()}
        else{
          this.getUfcMatches(userId)
        }
        
      })
      console.log('theData000000',theData)
    })
  }
  checkUpcomingPastGames=async(userId)=>{
    //return
    var userInfoDb=firebase.database().ref('/theEvents/eventsIds')
    var i=0,upcomingGames=[],pastGames=[],allGames=[]
    var nowDate= await new Date().getTime()
    await  userInfoDb.once('value',dataSnapshot=>{
      var theCount=dataSnapshot.numChildren()
      dataSnapshot.forEach((data) => {
        i++
       // console.log('data22222222222',data.val())
        var pastG={},upcomingG={}
        var key=data.key
        var time=data.val().time
        var title=data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        //var currentSelection = data.val().currentSelection
        //console.log('key',key,'value',time,dataSnapshot.size)
        var theItem={id:key,time:time,title:title,sportType: sportType, endTime: endTime}
        allGames.push(theItem)
         /* if(nowDate>time){
            pastG={id:key,time:time,title:title}
            pastGames.push(pastG)
          }
          if(nowDate<time){
            upcomingG={id:key,time:time,title:title}
            upcomingGames.push(upcomingG)
          }*/
          //console.log('upcomingGames',upcomingGames)
          //console.log('pastGames',pastGames)
      });
      })
      //console.log('allGames',allGames)
      var theEventTitle = '', theEventKey = '', theEventTime = 0,endTime='',sportType=''
      /*if(pastGames.length>0){pastGames=pastGames.sort(function(a, b){return a.time - b.time});}
      if(upcomingGames.length>0){upcomingGames=upcomingGames.sort(function(a, b){return a.time - b.time});theEventTitle=upcomingGames[0]['title'];theEventKey=upcomingGames[0]['id']}*/
      if(allGames.length>0){allGames=allGames.sort(function(a, b){return b.time - a.time});theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'],endTime= allGames[0]['endTime'],sportType= allGames[0]['sportType']}
      await this.setState({allGames, theEventTitle, theEventKey, theEventTime,endTime,sportType},()=>{
        //this.getUfcMatches(userId)
        console.log('items',theEventTitle,theEventKey,theEventTime,endTime,sportType)
        if(sportType==='NCAAF'){
         this.getNCAAFMatches()
        }else  if(sportType==='NCAAB'){
          this.getNCAABMatches()
         }else if(sportType==='NFL'){
          this.getNFLMatches()
         }else if(sportType==='NFLRegular'){
         this.getNFLRegularMatches()}
        else{
          this.getUfcMatches(userId)
        }
        
      })
  }
  getUfcMatches=()=>{
    this.setState({ramUfcMaincardArray:[],ramUfcPrelimsArray:[],ramUfcEarlyPrelimsArray:[],theMenu:'mainCard',dataAvailable:false,currentEventUserInfo:{}})
    var userInfoDb=firebase.database().ref('/theEvents/ramUfc/').child(this.state.theEventKey)
     userInfoDb.once('value',dataSnapshot=>{
      var mainCardCount=dataSnapshot.child('mainCard').numChildren()
      var prelimsCount=dataSnapshot.child('prelims').numChildren()
      var earlyPrelimsCount=dataSnapshot.child('earlyPrelims').numChildren()
      var theInfo=dataSnapshot.val()
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
          this.setState({ramUfcMaincardArray:array1,theItems:array1})
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
          this.setState({ramUfcEarlyPrelimsArray:array1})
         }
        }
      }else{
      }
    })
  }
  getNCAAFMatches=()=>{
    var theItems=[],v=0
    var userInfoDb = firebase.database().ref('/theEvents/NCAAF/').child(this.state.theEventKey)
    userInfoDb.child('firstRound').once('value',dataSnapshot=>{
      var firstRoundCount=dataSnapshot.numChildren()
      console.log('firstRoundCount',firstRoundCount)
      dataSnapshot.forEach((data) => {
        v++
        theItems.push(data.val())
        if(firstRoundCount===v){
          console.log('theItems rrrr',theItems)
          this.setState({theItems})
        }
      })
    })
  }
  getNFLMatches=()=>{
    var theItems=[],v=0
    var userInfoDb = firebase.database().ref('/theEvents/NFL/').child(this.state.theEventKey)
    userInfoDb.child('wildCard').once('value',dataSnapshot=>{
      var firstRoundCount=dataSnapshot.numChildren()
      console.log('firstRoundCount',firstRoundCount)
      dataSnapshot.forEach((data) => {
        v++
        theItems.push(data.val())
        if(firstRoundCount===v){
          console.log('theItems rrrr',theItems)
          this.setState({theItems})
        }
      })
    })
  }
    getNFLRegularMatches=()=>{
    var theItems=[],v=0
    var userInfoDb = firebase.database().ref('/theEvents/NFLRegular/').child(this.state.theEventKey)
    userInfoDb.child('week1Round').once('value',dataSnapshot=>{
      var firstRoundCount=dataSnapshot.numChildren()
      console.log('firstRoundCount',firstRoundCount)
      dataSnapshot.forEach((data) => {
        v++
        theItems.push(data.val())
        if(firstRoundCount===v){
          console.log('theItems rrrr',theItems)
          this.setState({theItems})
        }
      })
    })
  }
  getNCAABMatches=()=>{
    var theItems=[],v=0
    var userInfoDb = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey)
    userInfoDb.child('round1').limitToLast(10).once('value',dataSnapshot=>{
      var firstRoundCount=dataSnapshot.numChildren()
      console.log('firstRoundCount NCAAB',firstRoundCount)
      dataSnapshot.forEach((data) => {
        v++
        theItems.push(data.val())
        if(firstRoundCount===v){
          console.log('theItems rrrr',theItems)
          this.setState({theItems})
        }
      })
    })
  }
  selectEvent= (theMenu,theItems) => {
    this.setState({theMenu,theItems})
  }
  render() {
    console.log('this.state.sportType',this.state.sportType)
    let donateStyle = ''
    let reelTextStyle = ''
    const settings = {
      infinite: true,
      slidesToShow: this.state.slidesToShow,
      slidesToScroll: this.state.slidesToScroll,
      className: "slides",
      dots: true,
      //fade: true,
      autoplay: true,
      pauseOnHover: false,
      speed: 700,
      autoplaySpeed: 5000,
      cssEase: "linear",

    };
    var titleToShow1=this.state.theEventTitle.replace(/  +/g, ' ')
    var titleToShow='NFL Season'
    console.log('this.state.theEventTitle',titleToShow1)
    if(this.state.theEventTitle){
    titleToShow1=titleToShow1.split(' ')
    titleToShow=titleToShow1[0]+' '+titleToShow1[2]+' Season'}
    return (
      <div className={style.container}>
        <p className={style.eveP}>Events</p>
        {this.state.sportType==='NCAAF'||this.state.sportType==='NCAAB'||this.state.sportType==='NFL'||this.state.sportType==='NFLRegular'?<p className={style.eveP} style={{marginTop:10,marginBottom:-30}}>Event: <span>{this.state.sportType==='NFLRegular'?titleToShow:this.state.theEventTitle}</span></p>:null}
        {this.state.upcomingGames.length>0?<div className={style.matchesHeadDiv}>
          {this.state.upcomingGames.map((item,index)=>{
            //console.log('atttt upcomingGames')
            return(
              <p key={index} className={style.matchesP} style={{color:this.state.theEventKey===item.id?'#CB1E31':'#292f51',borderColor:this.state.theEventKey===item.id?'#CB1E31':'#292f51'}} onClick={()=>Router.push('/events')}>{item.title}</p>
            )
          })}
        </div>:null}
        <div className={style.eveDiv}>
                  {this.state.ramUfcMaincardArray.length>0?<p id={this.state.theMenu==='mainCard'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('mainCard',this.state.ramUfcMaincardArray)}>MAIN CARD</p>:null}
                  {this.state.ramUfcPrelimsArray.length?<p id={this.state.theMenu==='prelims'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('prelims',this.state.ramUfcPrelimsArray)}>PRELIMS</p>:null}
                  {this.state.ramUfcEarlyPrelimsArray.length?<p id={this.state.theMenu==='earlyPrelims'?style.playerP2:style.playerP} onClick={()=>this.selectEvent('earlyPrelims',this.state.ramUfcEarlyPrelimsArray)}>EARLY PRELIMS</p>:null}
                  
                </div>
        <Slider ref={c => (this.slider = c)} {...settings}>
          {this.state.theItems.map((item,index) => {
           // console.log('iteeeem',item)
            var playStat = ''
            var playStatCol = ''
            if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
            if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
            if (item.status1 === 'played') { playStat = 'Past Event', playStatCol = '#919191' }
            var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
            var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
            var player1Color = ''
            var player2Color = ''
            var homeTeam='',awayTeam='',theEvent=''
            var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
            if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
            if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
            if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
            if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
            if(this.state.sportType==='NCAAF'){
              homeTeam=item.player1,awayTeam=item.player2,theEvent='NCAAF '+item.matchType
            }else if(this.state.sportType==='NCAAB'){
              homeTeam=item.player1,awayTeam=item.player2,theEvent=this.state.theEventTitle+' '+item.matchType
            }else if(this.state.sportType==='NFL'){
              homeTeam=item.player1,awayTeam=item.player2,theEvent='NFL '+item.matchType
            }else if(this.state.sportType==='NFLRegular'){
              homeTeam=item.player1,awayTeam=item.player2,theEvent='Week 1 Match '+(index+1)
            }
            else{homeTeam=item.fighter1Name,awayTeam=item.fighter2Name,theEvent='RAM UFC '+item.match}
            var matchTime=''
          if(item.timeInMillis){
            matchTime=Number(item.timeInMillis)
            matchTime = dayjs(item.timeInMillis).format('DD MMM YYYY HH:mm A')
          }else{matchTime=item.time}
            return (
              <div className={style.titleDivCont} key={item.id} >
                <div className={style.testDiv}>
                  <div className={style.theCont0}>
                    <div className={style.theCont01}>
                      <p>{theEvent}</p>
                      <p>{matchTime}</p>
                    </div>

                    {item.status1==='notPlayed'?<div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount}/></div>:<p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>}
                    {/*<p className={style.eventStatP} style={{color:playStatCol}}>{playStat}</p>*/}
                    <div className={style.theCont}>
                      <div className={style.theContLeft}>
                        <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent',backgroundColor:this.state.sportType==='NCAAF'||this.state.sportType==='NCAAB'||this.state.sportType==='NFL'||this.state.sportType==='NFLRegular'?null:'white'}}>
                          <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img>
                          {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                        </div>
                        <p className={style.P1}>{homeTeam}</p>
                        {this.state.sportType==='NCAAB'?<p className={style.P2}>{'#'+item.team1Seed}</p>:<p className={style.P2}>{item.p1Rec}</p>}
                      </div>
                      <BsFillLightningFill className={style.sepIc} />
                      <div className={style.theContRight}>
                        <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent',backgroundColor:this.state.sportType==='NCAAF'||this.state.sportType==='NCAAB'||this.state.sportType==='NFL'||this.state.sportType==='NFLRegular'?null:'white'}}>
                          <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img>
                          {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                        </div>
                        <p className={style.P1}>{awayTeam}</p>
                        {this.state.sportType==='NCAAB'?<p className={style.P2}>{'#'+item.team2Seed}</p>:<p className={style.P2}>{item.p2Rec}</p>}
                      </div>
                    </div>
                    <div className={style.dateDiv}>
                      <p className={style.p1Points}>{item.p1Points}</p>
                      <p className={style.usP}>POINTS</p>
                      <p className={style.p2Points}>{item.p2Points}</p>
                    </div>
                    {this.state.loggedIn && this.state.played ?
                    <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={()=>Router.push('/events')}>MAKE/VIEW YOUR PICK</button></div>
                    : <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={()=>Router.push('/events')}>CLICK TO JOIN RAM</button></div>}
                  </div>
                </div>
              </div>

            )
          })}

        </Slider>
        <Link href="/events" className={style.pastDiv}><button className={style.pastBtn}>View All Events</button></Link>

      </div>
    )
  }
}
export default UFCEvent
