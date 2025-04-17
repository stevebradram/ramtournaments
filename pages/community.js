import React, { Component } from 'react'
import styles from "@/styles/community.module.scss";
import firebase from '../components/FirebaseClient'
import { MdDeleteOutline } from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
import News from '../components/Community/News'
import HallOfFame from '../components/Community/HallOfFame'
import CommMarchMadness from '../components/Community/CommMarchMadness'
import PastUpcomingEvents from '../components/Event/PastUpcomingEvents'
import { DownloadTableExcel } from 'react-export-table-to-excel';
var theFlockArr = [{ name: 'Clement', score: 20 }, { name: 'Billygoat', score: 30 },
{ name: 'Elaine Kiiru', score: 40 }, { name: 'RAM Man', score: 50 }]
class leaderboard extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
 }
  state = {
    openModal: false, openModal2: false, openModal4: false, theItems: [], isThereNullData: false, allGames: [], showProgressBar: false, isAdmin: false, endTime: '', communitySelection: 'My Flocks',creatorId:'',showNCAAB:false,count:0,showReel:false,
    dataAvailable: false, sportType: '', theEventKey: '', theEventTitle: '', userLoggedIn: false, nullData: [], theEvent: '', theTime: '', isTherNormalData: false, eventStartTime: '', currentSelection: '',currentSubSelection:'', menuToShow: 'Rams In Your Flock',
    currentFlockName: '', flockNameAvailable: false, eventStarted: true, ramsInMyFlockArr: [], theFlocksArr: [], theAdminFlocksArr: [],deleteModal:false,deleteName:'',userIdToBeDeleted:'',flockToBeDeleted:'',myFlockName:'',round1Arr:[],round2Arr:[],
    
  }
  componentDidMount = () => {
    this.showProgressBar()
    this.checkAuth()
    this.showReel()
  }
  showReel = () => {
    this.timerHandle = setTimeout(
      () => this.setState({ showReel:true }),
      2000)
  }
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1') {
          this.setState({ isAdmin: true })
        }
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId)}

      } else {
        this.setState({ userLoggedIn: false })
        //this.getGamesInfo()
        this.checkUpcomingPastGames(userId)
      }
    })
  }
  checkUpcomingPastGames = async (userId) => {
    var userInfoDb = firebase.database().ref('/theEvents/eventsIds')
    var i = 0, upcomingGames = [], pastGames = [], allGames = []
    var nowDate = await new Date().getTime()
    await userInfoDb.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      var i = 0
      //console.log('theCountttt',theCount)
      dataSnapshot.forEach((data) => {
        i++
        var pastG = {}, upcomingG = {}
        var key = data.key
        var time = data.val().time
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        var currentSelection = data.val().currentSelection

        var theItem = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection }
        allGames.push(theItem)
        if (theCount === i) {
          var theEventTitle = '', theEventKey = '', sportType = '', theTime = '',endTime=''
          if (allGames.length > 0) {
            allGames = allGames.sort(function (a, b) { return b.endTime - a.endTime });
            console.log('allGames 9000000',allGames)
            theEventTitle = allGames[0]['title']; sportType = allGames[0]['sportType'], theEventKey = allGames[0]['id'], theTime = allGames[0]['time'],endTime = allGames[0]['endTime'], currentSelection = 'round1'//allGames[0]['currentSelection']
            var isEventStarted = true
            if (new Date().getTime() < allGames[0]['time']) { isEventStarted = false }
              this.setState({ allGames, theEventTitle, theEventKey, sportType, theTime, currentSelection,currentSubSelection:allGames[0]['currentSelection'], eventStarted: isEventStarted,endTime }, () => {
              this.getRamsInFlock(theEventKey, isEventStarted,currentSelection,sportType)
              {this.state.isAdmin?this.loadAdminData(theEventKey):null} 
              //console.log('sportType555555555', sportType, theEventKey)
            })
          }


        }
      });
    })

  }
  getRamsInFlock = (theEventKey, isEventStarted,currentSelection,sportType) => {
   
    this.setState({ ramsInMyFlockArr: [], theFlocksArr: [] })
    var userInfoDb = firebase.database().ref('/users/' + this.state.userId + '/flockData/flockNames/').child(theEventKey).child('name')
    userInfoDb.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theFName = dataSnapshot.val().split('|').join(' ').toUpperCase()
        this.setState({ currentFlockName: theFName, flockNameAvailable: true,myFlockName:dataSnapshot.val()})
        this.getRamMembersData(theEventKey, dataSnapshot.val(), isEventStarted,currentSelection,sportType)
        
      } else {
        this.setState({ currentFlockName: '', flockNameAvailable: false })
      }
    })
  }
  getRamMembersData = (theEventKey, flockNameWithNoSpaces, isEventStarted,currentSelection,sportType) => {
    var allArr = [],round1Arr=[],round2Arr=[]
    var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/membersScores/' + flockNameWithNoSpaces)
    var flockCreatorRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/unique/' + flockNameWithNoSpaces+'/creatorId')
    console.log('hureeeeeeeeeeeeeeeee',flockNameWithNoSpaces,theEventKey,currentSelection,sportType)
    flockCreatorRef.once('value', dataSnapshot => {
      var creatorId=dataSnapshot.val()
      this.setState({creatorId})
    membersFlockNamesRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          //console.log('the daaaaaaaaata',theData)
          var theUserId = data.key
          var BPS='',theScore='',r1BPS='',r2BPS='',r1S='',r2S='',round1Pick=false,round2Pick=false
          if(sportType==='NCAAB'){
            ///CREATE ROUND 1 AND ROUND 2 ARRAYS
            if(theData.round1Pick){round1Pick=true}
            if(theData.round2Pick){round2Pick=true}
            if(currentSelection==='round1'){  
              if(theData.round1BPS){BPS=Number(theData.round1BPS),r1BPS=Number(theData.round1BPS)}else{BPS=0,r1BPS=0}
              if(theData.round1Score){theScore=theData.round1Score,r1S=theData.round1Score}else{theScore='0',r1S='0'}}
              if(currentSelection==='round2'){
              if(theData.round2BPS){BPS = Number(theData.round2BPS),r2BPS=Number(theData.round2BPS)}else{BPS=0,r2BPS=0}
              if(theData.round2Score){theScore =theData.round2Score,r2S=theData.round2Score}else{theScore='0',r2S='0'}}
            
            
              if(theData.round1BPS){r1BPS=Number(theData.round1BPS)}else{r1BPS=0}
              if(theData.round1Score){r1S=theData.round1Score}else{r1S='0'}
              if(theData.round2BPS){r2BPS=Number(theData.round2BPS)}else{r2BPS=0}
              if(theData.round2Score){r2S=theData.round2Score}else{r2S='0'}
          }else{
            BPS=Number(theData.BPS)
            theScore=theData.score
          }
          var theArr = { uid: theUserId,flockName:flockNameWithNoSpaces, theName: theData.ramName, picked: theData.picked, BPS:BPS, score:theScore,creatorId:creatorId}
          allArr.push(theArr)
          if(sportType==='NCAAB'){
            var theArr2 = { uid: theUserId,flockName:flockNameWithNoSpaces, theName: theData.ramName, picked: theData.picked, BPS:r1BPS, score:r1S,creatorId:creatorId,round1Pick,round2Pick}
            var theArr3 = { uid: theUserId,flockName:flockNameWithNoSpaces, theName: theData.ramName, picked: theData.picked, BPS:r2BPS, score:r2S,creatorId:creatorId,round2Pick,round2Pick}
            round1Arr.push(theArr2),round2Arr.push(theArr3)
          }
          if (count === i) {
            this.showNCAAB()
            //console.log('allArr55555555555',allArr)
            if (isEventStarted) { allArr = allArr.sort(function (a, b) { return b.score - a.score }); }
            else { allArr = allArr.sort(function (a, b) { return b.BPS - a.BPS }); }
           
            if(sportType==='NCAAB'&&(currentSelection==='round1'||currentSelection==='round2')){
              if (isEventStarted) { 
                round1Arr = round1Arr.sort(function (a, b) { return b.score - a.score });
                round2Arr = round2Arr.sort(function (a, b) { return b.score - a.score }); }
              else { 
                round1Arr = round1Arr.sort(function (a, b) { return b.BPS - a.BPS });
                round2Arr = round2Arr.sort(function (a, b) { return b.BPS - a.BPS }); }
              this.setState({round1Arr,round2Arr,ramsInMyFlockArr:round1Arr})

              console.log('round1Arr 0001', round1Arr)
              console.log('round2Arr 0002', round2Arr)
            }else{ this.setState({ ramsInMyFlockArr: allArr })}
           // console.log('the maliza', allArr)
          }
        })
      }
    })
  })
  this.theFlocksData(theEventKey)
    //membersFlockNamesRef.child(flockNameWithNoSpaces).child(this.state.userId).set('$$$'+this.state.creatorName)

  } //this.theFlocksData(theEventKey)
  theFlocksData=(theEventKey)=>{
    var theFlocksRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/theFlocks/')
    theFlocksRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0, theFlocksArr = []
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
         // console.log('theFlocksArr 7777 theData',data.key, theData)
         var theArr2 = { flockName: data.key, score:theData.score,avScore:theData.avScore,membersNo:theData.membersNo,theData:theData}
         theFlocksArr.push(theArr2)
          //console.log('theFlocksArr 8888', theFlocksArr)
          if (count === i) {
            theFlocksArr = theFlocksArr.sort(function (a, b) { return b.avScore - a.avScore })
            this.setState({ theFlocksArr: theFlocksArr })
           // console.log('theFlocksArr 9999', theFlocksArr)
          }
        })
      }
    })
  }
  loadAdminData = (theEventKey) => {
    var theAdminFlocksRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/admin/')
    var flockCreatorsRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/flockCreators/')
    theAdminFlocksRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0, allArr = []
        dataSnapshot.forEach((data) => {
          i++
          var theUid=data.key
          var theData = data.val()
          theData = theData.split('!!')
          var name = theData[0]
          var picked = ''
          if (name.includes('$$$')) { picked = false }
          else { { picked = true } }
          var newName = theData[0].split('$$$').join('')
          var theArr={}
          flockCreatorsRef.child(theUid).once('value', dataSnapshot => {
            if (dataSnapshot.exists()){
             // console.log('ikoooooooooo',theUid)
              theArr = { name: newName, flockName: theData[1], email: theData[2], phoneNo: theData[3], picked: picked,isCreator:'true'}
            }else{
             // console.log('hakunaaaaaa',theUid)
              theArr = { name: newName, flockName: theData[1], email: theData[2], phoneNo: theData[3], picked: picked,isCreator:'false'}
            }
            allArr.push(theArr)
          })
          
          if (count === i) {
            this.setState({ theAdminFlocksArr: allArr })
            console.log('theFlocksArr', allArr)
          }
        })
      } else {
        this.setState({ theAdminFlocksArr: [] })
      }
    })

  }
  preventClose = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  selectChange = async (e) => {
    var value = e.target.value
  }
  inputChange = async (e) => {
    var value = e.target.value
  }

  loadOtherEvents = async (sportType, theEventKey, theTime, theEventTitle, currentSelection,endTime) => {
    this.showProgressBar()
    if (navigator.onLine === false) {
      this.notify('No internet! please check your internet connection')
      return
    }
    if (!this.state.userLoggedIn) {
      this.notify('Please Log In to continue')
    } else {
      var isEventStarted = true
      if (new Date().getTime() < theTime) { isEventStarted = false }
      this.setState({ theEventKey, theEventTitle, currentSelection,currentSubSelection:currentSelection,eventStarted: isEventStarted,sportType,endTime })
      this.getRamsInFlock(theEventKey, isEventStarted,currentSelection,sportType)
      {this.state.isAdmin?this.loadAdminData(theEventKey):null}
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
      2000)
  }
  showNCAAB = () => {
    this.timerHandle = setTimeout(
      () => this.setState({ showNCAAB:true }),
      2000)
  }
  deleteMember= () => {
    if((new Date().getTime()>this.state.theTime)){
      this.notify("Can't delete a member on an already started event")
     }else{
  var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.theEventKey)
  var adminRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.theEventKey+'/admin')
  var generalDb = firebase.database().ref()

  var gamesDataRef = firebase.database().ref('users/').child(this.state.userIdToBeDeleted+'/ramData/').child('events').child(this.state.sportType)
  var ramsBets = firebase.database().ref('userBets/'+this.state.sportType+'/')

  //deletes from here
  /*gamesDataRef.child(this.state.theEventKey+'/details/').set(null)
  gamesDataRef.child(this.state.theEventKey+'/bets/').set(null)
  generalDb.child('users/'+this.state.userIdToBeDeleted+'/ramData/upcomingEvents/'+this.state.sportType+'/').child(this.state.theEventKey).set(null)
  ramsBets.child(this.state.theEventKey+'/'+this.state.userIdToBeDeleted).set(null)*/
  
  //added this
  gamesDataRef.child(this.state.theEventKey+'/details/flockName/').set('Flockless')
  /////
  

  adminRef.child(this.state.userIdToBeDeleted).set(null)
  membersFlockNamesRef.child('/members/'+this.state.flockToBeDeleted).child(this.state.userIdToBeDeleted).set(null)
  membersFlockNamesRef.child('/membersScores/'+this.state.flockToBeDeleted).child(this.state.userIdToBeDeleted).set(null)
  //generalDb.child('users/'+this.state.userIdToBeDeleted+'/flockData/flockNames/'+this.state.theEventKey).set(null)
  generalDb.child('users/'+this.state.userIdToBeDeleted+'/flockData/flockNames/'+this.state.theEventKey).set(null,(error) => {
    if (!error){
      const updatedArr = this.state.ramsInMyFlockArr.filter(item => item.uid !== this.state.userIdToBeDeleted);
      this.setState({ramsInMyFlockArr:updatedArr,deleteModal:false})
      this.notify('Member removed successfully')
  }
})
  }
  }
  getCurrentRound=(round)=>{
    console.log('roundddd',round)
    this.setState({currentSelection:round})
    if(round==='round1'){
      this.setState({ramsInMyFlockArr:this.state.round1Arr})
     // console.log('round 1111',this.state.round1Arr)
    }
    if(round==='round2'){
      this.setState({ramsInMyFlockArr:this.state.round2Arr})
     // console.log('round 2222',this.state.round2Arr)
    }
    //this.setState({round1Arr,round2Arr})
    return
    if(round==='round1'){
     this.setState({currentItems:this.state.round1Arr})}
    if(round==='round2'){
     this.setState({currentItems:this.state.round2Arr})}
    if(round==='finalRound'){
    this.setState({currentItems:this.state.sweet16Arr})}
  }
  handleChildClick = (from,theEventKey,theEventTitle,fetchResultsTimeUpdate,getEventsTimeUpdate,oddsTimeUpdate,theTime,sportType,currentSelection,isEventExpired,endTime) => {
    this.loadOtherEvents(sportType, theEventKey, theTime, theEventTitle, currentSelection,endTime)
    this.setState({ count: this.state.count + 1,sportType})
    if(sportType==='NCAAB'){
      this.setState({communitySelection:'My Flocks',currentSelection:'round1'})
    }
  };
  render() {
    //console.log('this.state.theAdminFlocksArr.length',this.state.theAdminFlocksArr.length)
    var theItems = []
    var noData = false
    var statToShow='',statCol=''
    if(this.state.eventStarted&&new Date().getTime()>(this.state.endTime+36000000)){statToShow='Expired Event',statCol='#919191'}
    if(this.state.eventStarted&&new Date().getTime()<(this.state.endTime+36000000)){statToShow='Active Event'}
    if(!this.state.eventStarted){statToShow='Upcoming Event'}



    var sortData = this.state.theItems.sort((a, b) => b.currentScore - a.currentScore)
    var nullData = this.state.nullData.sort((a, b) => b.bestPossibleScore - a.bestPossibleScore)
    if (this.state.isThereNullData === true) { theItems = nullData }
    if (this.state.isTherNormalData === true) { theItems = sortData }

    return (
      <>
        <div className={styles.container}>
          <p className={styles.titleP}>Community</p>
          <div className={styles.headerCont}>
            {['My Flocks', 'News & Videos', 'Hall of Fame'].map((item, index) => {

              return (
                <div className={this.state.communitySelection === item ? styles.headerDiv : styles.headerDiv2} key={index} onClick={() => this.setState({ communitySelection: item })}>
                  <p>{item}</p>
                </div>
              )
            })}</div>
          {this.state.communitySelection==='My Flocks'?<>
            {this.state.showReel?<div className={styles.matchesHeadDiv} style={{marginTop:20}}>
        <PastUpcomingEvents onClick={this.handleChildClick} allGames={this.state.allGames} theEventKey={this.state.theEventKey} selectHomeEvent={this.state.selectHomeEvent} selectHomeEventId={this.state.selectHomeEventId} from='leadersBoard'/>
        </div>:null}
          {/*<div className={styles.headCont}>
            {this.state.allGames.map((item, index) => {
              var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
              var todayInMillis = new Date().getTime()
              //console.log('todayInMillis',item)
              var theColor = '#292f51', timing = 'Active Event'
              if (item.endTime < todayInMillis && (item.endTime - todayInMillis) < -86400000) {
                theColor = '#919191'
                timing = 'Past Event'
              }
              if (this.state.theEventKey === item.id) {
                theColor = '#CB1E31'
              }
              return (
                <div className={styles.headList} key={index} style={{ color: theColor, borderColor: theColor }} onClick={() => this.loadOtherEvents(item.sportType, item.id, item.time, item.title, item.currentSelection, item,item.endTime)}>
                  <p className={styles.headListP1}>{item.title}</p>
                  <div><p className={styles.headListP2}>{eventTime}</p>
                    <p style={{ marginLeft: 2, marginRight: 2 }}>-</p>
                    <p className={styles.headListP3}>{timing}</p></div>
                </div>

              )
            })}
          </div>*/}
          <p className={styles.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
          {this.state.sportType==='NCAAB'?<div className={styles.eve2Div}>
            <p id={this.state.currentSelection==='round1'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round1')}>Round 1</p>
            <p id={this.state.currentSelection==='round2'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('round2')}>Round 2</p>
            <p id={this.state.currentSelection==='finalRound'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('finalRound')}>Final Round</p>
            <p id={this.state.currentSelection==='overall'?styles.theSubMenuP2:null} onClick={()=>this.getCurrentRound('overall')}>Overall</p>
           </div>:null}
          <div className={styles.menu2Div0}>
          {this.state.currentSelection!=='overall'?<div className={styles.menuHeader}>
              {['Rams In Your Flock', 'Flocks Among Flocks', this.state.isAdmin?'Admin':null].map((item, index) => {

                return (
                  <p style={{ color: this.state.menuToShow === item ? '#CB1E31' : null, borderBottomColor: this.state.menuToShow === item ? '#CB1E31' : null }} key={index} onClick={() => this.setState({ menuToShow: item })}>{item}</p>
                )
              })}
            </div>:null}
            {this.state.sportType!=='NCAAB'?<>{this.state.menuToShow === 'Rams In Your Flock' ? <>{this.state.flockNameAvailable ? <div className={styles.menu2Div1}>
            
              <p className={styles.titleP}><span>{this.state.currentFlockName}</span> - RAMS IN YOUR FLOCK</p>
              <div id={styles.table1Div}>
             
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Overall <br />Rank</th>
                    <th>RAM Name</th>
                    <th>Picked?</th>
                    <th>Best Possible<br />Score</th>
                    <th>Cumulative <br />Score</th>
                    <th>Action</th>
                    </tr>
                  {this.state.ramsInMyFlockArr.map((item, index) => {
                    //console.log('picked', item)
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.uid === this.state.userId ? '#292f51' : null, color: item.uid === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.theName}</td>
                        {this.state.sportType==='NCAAB'&&this.state.currentSelection==='round1'?<td style={{ color: item.picked ? 'green' : 'red' }}>{item.round1Pick + ''}</td>:null}
                        {this.state.sportType==='NCAAB'&&this.state.currentSelection==='round2'?<td style={{ color: item.picked ? 'green' : 'red' }}>{item.round2Pick + ''}</td>:null}
                        {this.state.sportType!=='NCAAB'?<td style={{ color: item.picked ? 'green' : 'red' }}>{item.picked + ''}</td>:null}
                        <td>{item.BPS}</td>
                        <td>{item.score}</td>
                        <td>{this.state.creatorId===this.state.userId?item.uid!==this.state.userId?<MdDeleteOutline className={styles.delIC} onClick={()=>this.setState({deleteName:item.theName,deleteModal:true,userIdToBeDeleted:item.uid,flockToBeDeleted:item.flockName})}/>:null:
                        item.uid===this.state.userId?<MdDeleteOutline className={styles.delIC} onClick={()=>this.setState({deleteName:item.theName,deleteModal:true,userIdToBeDeleted:item.uid,flockToBeDeleted:item.flockName})}/>:null}</td>

                        {/*this.state.creatorId===this.state.userId?<td>{item.uid===this.state.userId?null:<MdDeleteOutline className={styles.delIC} onClick={()=>this.setState({deleteName:item.theName,deleteModal:true,userIdToBeDeleted:item.uid,flockToBeDeleted:item.flockName})}/>}</td>:null}
                        <td>{item.uid===this.state.userId?null:<MdDeleteOutline className={styles.delIC} onClick={()=>this.setState({deleteName:item.theName,deleteModal:true,userIdToBeDeleted:item.uid,flockToBeDeleted:item.flockName})}/>}</td>*/}
                        </tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? statCol : null }}>{statToShow}</p>
              <p className={styles.noDataP1}>No "Rams in your flock" data available for this event</p>
              <p className={styles.noDataP2}>Check Events</p>
            </div>}</> : null}
            {this.state.menuToShow === 'Flocks Among Flocks' ? <>{this.state.flockNameAvailable ? <div className={styles.menu2Div1}>
              <p className={styles.titleP}>YOUR FLOCK'S RANK AMONG THE HEARD</p>
              <div id={styles.table1Div}>
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Flock Rank In Herd</th>
                    <th>Flock Names</th>
                    <th>Members No</th>
                    <th>Total Points</th>
                    <th>Average Points<br />Per RAM</th></tr>
                  {this.state.theFlocksArr.map((item, index) => {
                    var theMembersNo='',theScore='',theAvScore=''
                   // console.log('the rrrrrr',this.state.currentSelection,this.state.sportType,item)
                    if(this.state.sportType==='NCAAB'){
                      //console.log('haaapa round 1')
                      if(this.state.currentSelection==='round1'){
                        theMembersNo=item.theData.round1MembersNo
                        theScore=item.theData.round1Score
                        theAvScore=item.theData.round1AvScore
                      }
                      if(this.state.currentSelection==='round2'){
                       // console.log('haaapa round 2')
                        theMembersNo=item.theData.round2MembersNo
                        theScore=item.theData.round2Score
                        theAvScore=item.theData.round2AvScore
                      }
                    }else{
                      theMembersNo=item.membersNo
                      theScore=item.score
                      theAvScore=item.avScore
                    }
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.flockName === this.state.myFlockName ? '#292f51' : index===0?'#CB1E31':null, color: item.flockName === this.state.myFlockName ? 'white' : index===0?'#fff':'#292f51'}}>
                        <td>{index + 1}</td>
                        <td>{item.flockName.split("|").join(' ')}</td>
                        <td>{theMembersNo}</td>
                        <td>{theScore}</td>
                        <td>{theAvScore}</td>
                        </tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? statCol : null }}>{statToShow}</p>
              <p className={styles.noDataP1}>No "Your flocks among flocks" data available for this event</p>
              <p className={styles.noDataP2} >Check Events</p>
            </div>}</> : null}
            {this.state.menuToShow==='Admin'&&this.state.isAdmin? <>{this.state.theAdminFlocksArr.length > 0 ? <div className={styles.menu2Div1}>
              <p className={styles.titleP}>ADMIN VIEW</p>
              <div id={styles.table1Div}>
              {this.state.isAdmin?<div id={styles.exportDiv}> <div  id={styles.exportDiv1} onClick={()=>this.notify('Downloading...')}><DownloadTableExcel
                    filename={this.state.theEventKey}
                    sheet="users"
                    currentTableRef={this.tableRef.current}>        
                 <p className={styles.exportP}>Export Document</p>
                  </DownloadTableExcel> </div></div>:null}
                <table className={styles.table1} ref={ this.tableRef}>
                  <tr id={styles.table1Tr1}>
                    <th>Overall <br />Rank</th>
                    <th>RAM Name</th>
                    <th>Flock Name</th>
                    <th>Picked?</th>
                    <th>Creator?</th>
                    <th>Email</th>
                    <th>Phone No</th>
                  </tr>
                  {this.state.theAdminFlocksArr.map((item, index) => {
                    console.log('itttm',item)
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.uid === this.state.userId ? '#292f51' : null, color: item.uid === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.flockName}</td>
                        <td style={{ color: item.picked ? 'green' : 'red' }}>{item.picked + ''}</td>
                        <td style={{ color: item.isCreator==='true' ? 'green' : 'red' }}>{item.isCreator}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNo}</td>
                      </tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? statCol : null }}>{statToShow}</p>
              <p className={styles.noDataP1}>No Admin data available for this event</p>
            </div>}</> : null}</>:this.state.showNCAAB?<CommMarchMadness theEventKey={this.state.theEventKey} flockNameWithNoSpaces={this.state.myFlockName} currentRound={this.state.currentSelection} menuToShow={this.state.menuToShow} flockNameAvailable={this.state.flockNameAvailable} eventStarted={this.state.eventStarted} endTime={this.state.endTime} currentSubSelection={this.state.currentSubSelection}/>:null}

          </div></>:null}
          {this.state.communitySelection==='News & Videos'?<News/>:null}
          {this.state.communitySelection==='Hall of Fame'?<HallOfFame/>:null}
          
        </div>
        {this.state.deleteModal?<div className={styles.modal}>
        <div className={styles.delModal}>
          <p className={styles.delModalP1}>Confirm Delete?</p>
          <p className={styles.delModalP2}>Are you sure you want to delete "{this.state.deleteName}" from your flock?</p>
          <p className={styles.delModalP2} style={{color:'red'}}>This cannot be reversed!</p>
          <div>
            <button className={styles.delModalDelBtn} onClick={()=>this.deleteMember()}>Delete</button>
            <button className={styles.canModalDelBtn} onClick={()=>this.setState({deleteModal:false})}>Cancel</button>
          </div>
        </div>
        
        </div>:null}
        
        {this.state.showProgressBar ? <ProgressBar /> : null}
        <ToastContainer />
      </>
    )
  }
}

export default leaderboard
