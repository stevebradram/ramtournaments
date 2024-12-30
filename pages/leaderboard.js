import React, { Component } from 'react'
import styles from "@/styles/Leaderboard.module.scss";
import firebase from '../components/FirebaseClient'
import { MdOutlineFolderOff } from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
var theItems=[]
/*const importList = [
    { id: 1, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 2, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 3, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 4, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 5, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 6, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 7, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 8, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 9, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 10, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 11, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 12, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 13, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 14, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 15, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    { id: 16, RAMName: 'Ruddy Duck', flockName: 'Birderz 4 Lyfe',cumScore:'55.62',round64:'23.80',round32:'28.71',finRoundScore:'4.01',sweet16:'3.56'},
    ]*/
//var scoreBoardArr
class leaderboard extends Component {
  state={openModal:false,openModal2:false,openModal3:false,openModal4:false,theItems:[],isThereNullData:false,allGames:[],showProgressBar:false,isAdmin:false,
    dataAvailable:false,sportType:'',theEventKey:'',theEventTitle:'',userLoggedIn:false,nullData:[],theEvent:'',theTime:'',isTherNormalData:false,eventStartTime:''}
  componentDidMount=()=>{
     //this.getScoreBoardData()
     this.showProgressBar()
     this.checkAuth()
     //this.getUsers()
  }
  checkAuth = () => {
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
        this.setState({isAdmin:true})
       }
       this.setState({userId,userLoggedIn:true})
       if(userId){this.checkUpcomingPastGames(userId)}
       
     }else{
      this.setState({userLoggedIn:false})
      //this.getGamesInfo()
      this.checkUpcomingPastGames(userId)
     }
   })
 }
 getUsers=async(userId)=>{
  //return
  var theUsers=[],i=0
  var userInfoDb=firebase.database().ref('/users/')//.orderByChild('userData')
  await  userInfoDb.once('value',dataSnapshot=>{
    console.log('theCountttt',dataSnapshot.val())
    var theCount=dataSnapshot.numChildren()
    var i=0
    console.log('theCountttt',theCount)
    dataSnapshot.forEach((data) => {
      i++
      console.log('users Data',data.val().userData)
      theUsers.push(data.val().userData)
      if(theCount===i){
        console.log('the users',theUsers)
      }
    })
  })
 }
 checkUpcomingPastGames=async(userId)=>{
  //return
  
  var userInfoDb=firebase.database().ref('/theEvents/eventsIds')
  var i=0,upcomingGames=[],pastGames=[],allGames=[]
  var nowDate= await new Date().getTime()
 // console.log('nowDate',nowDate)
  //return
  await  userInfoDb.once('value',dataSnapshot=>{
    var theCount=dataSnapshot.numChildren()
    var i=0
    //console.log('theCountttt',theCount)
    dataSnapshot.forEach((data) => {
      i++
      var pastG={},upcomingG={}
      var key=data.key
      var time=data.val().time
      var title=data.val().title
      var sportType=data.val().sportType
      var endTime=data.val().endTime
      //console.log('value',time,dataSnapshot.val())
      //console.log('nowDate',nowDate,'time',time,'title',title)
      
      var theItem={id:key,time:time,title:title,sportType:sportType,endTime:endTime}
      allGames.push(theItem)
      if(theCount===i){
        var theEventTitle='',theEventKey='',sportType='',theTime=''
        if(allGames.length>0){
          allGames=allGames.sort(function(a, b){return b.time - a.time});
          //console.log('teeeeeee',allGames)
          theEventTitle=allGames[0]['title'];sportType=allGames[0]['sportType'],theEventKey=allGames[0]['id'],theTime=allGames[0]['time']
          this.setState({allGames,theEventTitle,theEventKey,sportType,theTime},()=>{
          this.getScoreBoardData(sportType,theEventKey,theTime)
          console.log('sportType555555555',sportType)
            //this.getNullScoreBoardData(sportType,theEventKey)
          })
        }
        
     
      }
      
        /*if(nowDate>time){
          pastG={id:key,time:time,title:title,sportType:sportType}
          pastGames.push(pastG)
        }
        if(nowDate<time){
          upcomingG={id:key,time:time,title:title,sportType:sportType}
          upcomingGames.push(upcomingG)
        }*/
        //console.log('upcomingGames',upcomingGames)
        //console.log('pastGames',pastGames)
    });
    })
    /*var theEventTitle='',theEventKey='',sportType=''
    if(pastGames.length>0){pastGames=pastGames.sort(function(a, b){return a.time - b.time});}
    if(upcomingGames.length>0){upcomingGames=upcomingGames.sort(function(a, b){return a.time - b.time});theEventTitle=upcomingGames[0]['title'];sportType=upcomingGames[0]['sportType'],theEventKey=upcomingGames[0]['id']}
    //console.log('theEventKey',sportType,theEventKey,theEventTitle)
    await this.setState({pastGames,upcomingGames,theEventTitle,theEventKey,sportType},()=>{
      this.getScoreBoardData(sportType,theEventKey)
      //this.getNullScoreBoardData(sportType,theEventKey)
    })*/
   
} 
   getNullScoreBoardData=(sportType,theEventKey)=>{
    //console.log('At null provider 005',sportType,theEventKey)
    var theAllData=[],i=0
    var dbLink="/userBets/"+sportType+'/'+theEventKey+'/' 
    var scoreBoardDb=firebase.database().ref(dbLink)
    scoreBoardDb.once('value',dataSnapshot=>{
      
      if(!dataSnapshot.val())return
      this.setState({isThereNullData:true,dataAvailable:true,isTherNormalData:false})
      var scoreBoardNo=dataSnapshot.numChildren()
      dataSnapshot.forEach((data,index) => {
        i++
      var theId=data.key
      var theData=data.val()
      
      //console.log('theId',theId,'theData',theData)
      var userInfoDb=firebase.database().ref('/users/').child(theId).child('/ramData/events/'+sportType+'/'+theEventKey+'/details/')
      var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
      var theDet={}
      if(this.state.isAdmin){
      userInfoDb2.once('value',dataSnapshot=>{
        var theD=dataSnapshot.val()
        theDet['phone']=theD.phoneNo
        theDet['email']=theD.email
      })}
      userInfoDb.once('value',dataSnapshot=>{
        //console.log('here at nulll',scoreBoardNo,i,dataSnapshot.val())
       if(!dataSnapshot.val())return
          var data=dataSnapshot.val()
           //theUserData={id:theId,flockName:data.flockName,teamName:data.teamName,bestPossibleScore:data.bestPossibleScore,currentScore:0.00}
          
           theDet['id']=theId
           theDet['flockName']=data.flockName
           theDet['teamName']=data.teamName
           theDet['bestPossibleScore']=data.bestPossibleScore
           theDet['currentScore']=0.00
           if(sportType==="NCAAF"){
            var theCurrentScore=Number(userBetData.firstRoundScore)+Number(userBetData.quarterFinalsScore)+Number(userBetData.semiFinalsScore)+Number(userBetData.finalsScore)
            theDet['finalsScore']=0.00
            theDet['firstRoundScore']=0.00
            theDet['quarterFinalsScore']=0.00
            theDet['semiFinalsScore']=0.00
          }
          theAllData.push(theDet)
          if(scoreBoardNo===i){
            this.setState({nullData:theAllData,showProgressBar:false})
           // console.log('theAllData 0005',theAllData)
          }
        })
       
      })
      
    })
   }
  getScoreBoardData=(sportType,theEventKey,theTime)=>{
  
    if(!this.state.userLoggedIn)return
    this.setState({eventStartTime:theTime,sportType})
    console.log('curentttttttt',sportType,theEventKey,theTime)
    var dbLink="/userBets/scoreBoards/"+sportType+'/'+theEventKey+'/' 
    //var dbLink2="/userBets/scoreBoards/ramUfc/ufc-310-December72024/"
    var scoreBoardDb=firebase.database().ref(dbLink)
   var data3=[]
    scoreBoardDb.once('value',dataSnapshot=>{
      
      if(!dataSnapshot.val()){
        
        var nowMillis=new Date().getTime()
        if((theTime-nowMillis)<1200000||this.state.isAdmin){
          this.getNullScoreBoardData(sportType,theEventKey)
        }else{
          this.setState({dataAvailable:false,isTherNormalData:false,isThereNullData:false})
          this.notify('No data to show at the moment')
        }
      }else{
        
      this.setState({dataAvailable:true,isTherNormalData:true,isThereNullData:false})
      var i=0,allData=[]
      var scoreBoardNo=dataSnapshot.numChildren()
      //console.log('the scoreBoardNo',scoreBoardNo)
      dataSnapshot.forEach((data,index) => {
        i++
        var theId=data.key
        var theData=data.val()
       
       //console.log('the id',theId)
      // console.log('the theData',theData)
        var theDet={}
        var userInfoDb2=firebase.database().ref('/users/'+theId+'/userData')
        if(this.state.isAdmin){
        userInfoDb2.once('value',dataSnapshot=>{
          var theD=dataSnapshot.val()
          theDet['phone']=theD.phoneNo
          theDet['email']=theD.email
        })}
        var userInfoDb=firebase.database().ref('/users/').child(theId).child("/ramData/events/"+sportType+"/"+theEventKey+"/details/")
        userInfoDb.once('value',dataSnapshot=>{
         
            var userBetData=dataSnapshot.val()
           // //console.log('dataSnapshot.val()',dataSnapshot.val())
           
          theDet['id']=theId
          theDet['flockName']=userBetData.flockName
          theDet['teamName']=userBetData.teamName
          theDet['bestPossibleScore']=userBetData.bestPossibleScore
          if(sportType==="NCAAF"){
            var theCurrentScore=Number(userBetData.firstRoundScore)+Number(userBetData.quarterFinalsScore)+Number(userBetData.semiFinalsScore)+Number(userBetData.finalsScore)
            theDet['finalsScore']=userBetData.finalsScore
            theDet['firstRoundScore']=userBetData.firstRoundScore
            theDet['quarterFinalsScore']=userBetData.quarterFinalsScore
            theDet['semiFinalsScore']=userBetData.semiFinalsScore
            theDet['currentScore']=theCurrentScore
          }else{
            theDet['currentScore']=theData
          }
          var theDet4={id:theId,currentScore:theData,flockName:userBetData.flockName,teamName:userBetData.teamName,bestPossibleScore:userBetData.bestPossibleScore}
          data3.push(theDet4)
          allData.push(theDet)
          this.setState({theItems:allData})
          
          console.log('all data checked',allData)
        })
        
        if(i===scoreBoardNo){
          
          console.log('all data checked',allData)
          this.setState({showProgressBar:false})
         // console.log('all data',allData)
         // console.log('hureeeeeeeeeeeeeeeeeeeee')
        }
      })}
    })
  }
  openModal3 = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({openModal:!this.state.openModal})
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

  loadOtherEvents=async(sportType,theEventKey,theTime,theEventTitle)=>{
    this.showProgressBar()
    if (navigator.onLine === false) {
      this.notify('No internet! please check your internet connection')
      return
    }
    if(!this.state.userLoggedIn){
      this.notify('Please Log In to continue')
    }else{
      this.setState({theEventKey,theEventTitle})
      this.getScoreBoardData(sportType,theEventKey,theTime)
    }
  }
  notify=(message)=>{
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
  showProgressBar=()=>{
    this.setState({showProgressBar:true})
    this.timerHandle = setTimeout(
      () => this.setState({showProgressBar:false}), 
      2000)
  }
  itemComponent=(theItems)=>{
    return(
    <div id={styles.table1Div}>
      <table className={styles.table1}>
        <tr id={styles.table1Tr1}>
          <th>Overall <br/>Rank</th>
          <th>RAM Name</th>
          <th>Flock Name</th>
          <th>{this.state.sportType==='NCAAF'?'Cumulative':'Current'}<br/>Score</th>
          {this.state.sportType==='NCAAF'?null:<th>Best Possible<br/>Score</th>}
          {this.state.sportType==='NCAAF'?
           <>
           <th>Best Possible<br/>Score</th>
           <th>First Round<br/>Score</th>
           <th>Quarter Finals</th>
           <th>Semi Finals<br/></th>
           <th>Finals</th>
           </>
          :null}
           {this.state.isAdmin?<><th>Phone</th><th>Email</th></>:null}
        </tr>
        {theItems.map((item, index) => {
          return (
            <tr key={index} id={styles.table1Tr2} style={{backgroundColor:item.id===this.state.userId?'#292f51':null,color:item.id===this.state.userId?'white':'#292f51'}}>
              <td>{index+1}</td>
              <td>{item.teamName}</td>
              <td>{item.flockName}</td>
              <td>{item.currentScore}</td>
              {this.state.sportType==='NCAAF'?null:<td>{item.bestPossibleScore}</td>}
              {this.state.sportType==='NCAAF'?
              <>
              <td>{item.bestPossibleScore}</td>
              <td>{item.firstRoundScore}</td>
              <td>{item.quarterFinalsScore}</td>
              <td>{item.semiFinalsScore}</td>
              <td>{item.finalsScore}</td>
              </>:null}
              {this.state.isAdmin?<><td>{item.phone}</td><td>{item.email}</td></>:null}
            </tr>
            )
        })}
      </table>
      </div>)
  }
    render() {
      //console.log('isThereNullData',this.state.isThereNullData)
      var theItems=[]
      var noData=false 
      var sortData=this.state.theItems.sort((a, b) => b.currentScore - a.currentScore    )
      var nullData=this.state.nullData.sort((a, b) => b.bestPossibleScore - a.bestPossibleScore)
      if(this.state.isThereNullData===true){theItems=nullData}
      if(this.state.isTherNormalData===true){theItems=sortData}
     /* if(this.state.dataAvailable===true){theItems=sortData}
      if(this.state.isThereNullData===false&&this.state.dataAvailable===false){
        noData=true
      }*/

      
      //console.log('sortData',sortData)
        return (
          <>
            <div className={styles.container}>
              <p className={styles.titleP}>Leaderboard {this.state.isAdmin?<span> | Admin</span>:null}</p>
              {/*<div className={styles.eventsCont}>
        <p className={styles.eventsP} id={this.state.theEvent==='Upcoming Events'?styles.playerP1:styles.playerP} onClick={()=>this.setState({theEvent:'Upcoming Events'})}>UPCOMING EVENTS</p>
        <p className={styles.eventsP} style={{color:'#b2b2b2',borderColor:'#b2b2b2'}} id={this.state.theEvent==='Past Events'?styles.playerP1:styles.playerP} onClick={()=>this.setState({theEvent:'Past Events'})}>PAST EVENTS</p>
        </div>*/}
        <div className={styles.headCont}>
          {this.state.allGames.map((item,index)=>{
          var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
          var todayInMillis=new Date().getTime()
          //console.log('todayInMillis',item)
          var theColor='#292f51',timing='Active Event'
           if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
             theColor='#919191'
             timing='Past Event'
           }
           if(this.state.theEventKey===item.id){
             theColor='#CB1E31'
           }
          return(
            <div className={styles.headList} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherEvents(item.sportType,item.id,item.time,item.title)}>
              <p className={styles.headListP1}>{item.title}</p>
               <div><p className={styles.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={styles.headListP3}>{timing}</p></div>
               </div>
           
          )
          })}
        </div>
              <p className={styles.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
              <div className={styles.menu2Div1}>
                            
      {this.state.userLoggedIn?<>{this.state.dataAvailable?this.itemComponent(theItems):
      <div className={styles.noDataDiv}>
         <PiFolderDashedThin  className={styles.noDataIc}/>
        <p>No data available at the moment. Data will be available once the events start</p>
      </div>}</>:
      <div className={styles.noDataDiv}>
      <PiFolderDashedThin  className={styles.noDataIc}/>
     <p>Please LOG IN to view data in this page</p>
   </div>}
      </div>
                          {/*<div className={styles.menu2Div1}>
                            <p className={styles.titleP}>Leaderboard</p>
      <div id={styles.table1Div}>
      <table className={styles.table1}>
        <tr id={styles.table1Tr1}>
          <th>Overall <br/>Rank</th>
          <th>RAM Name</th>
          <th>Flock Name</th>
          <th>Cumulative<br/>Score</th>
          <th>Round of 64</th>
          <th>Round of 32</th>
          <th>Cumulative Final<br/>Round Score</th>
          <th>Final Round<br/>Sweet 16</th>
        </tr>
        {importList.map((item, index) => {
          return (

            <tr key={index} id={styles.table1Tr2} style={{backgroundColor:item.id===3?'red':null,color:item.id===3?'white':null}}>
              <td>{item.id}</td>
              <td>{item.RAMName}</td>
              <td>{item.flockName}</td>
              <td>{item.cumScore}</td>
              <td>{item.round64}</td>
              <td>{item.round32}</td>
              <td>{item.finRoundScore}</td>
              <td>{item.sweet16}</td>
            </tr>)
        })}
      </table>
      </div>
      </div>*/}
            </div>
            {this.state.showProgressBar?<ProgressBar/>:null}
            <ToastContainer/>
            </>
        )
    }
}

export default leaderboard
