import React, { Component } from 'react'
import styles from "./NCAAModal.module.scss";
import { BsFillLightningFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import ProgressBar from '../Helper/ProgressBar'
import theRamOdds from './ramOdds.json'
import theNCAAFOdds from '../TheJSONS/ncaafOdds.json'
import dayjs from 'dayjs';
import axios from "axios"
var firstRoundEdit=[],quarterFinalsEdit=[],semiFinalsEdit=[],finalEdit=[]
class NCAAModal extends Component {
  state={firstRoundEdit:[],quarterFinalsEdit:[],semiFinalsEdit:[],finalEdit:[],submitErr:"",showProgressBar:false,isItSubmit:false,
    currentSelection:this.props.eventToModal,firstTime:''
  }
   
  componentDidMount=()=>{
    firstRoundEdit=[],quarterFinalsEdit=[],semiFinalsEdit=[],finalEdit=[]
    var eventKey='NCAAF_'+new Date().getFullYear()+'-'+(new Date().getFullYear()+1)
    console.log('the event key',eventKey)
    console.log('the info',this.props.itemsToModal,this.props.eventToModal,this.props.theEventKey)
    //var incomingData=[...this.props.itemsToModal]
    var incomingData = this.props.itemsToModal.map(item => JSON.parse(JSON.stringify(item)));
    //return
    console.log('incomingData',incomingData)
    console.log('the info',this.props.itemsToModal,this.props.eventToModal,this.props.theEventKey)
    //return
    if(incomingData.length>0){
      firstRoundEdit=[],quarterFinalsEdit=[],semiFinalsEdit=[],finalEdit=[]
      var firstMatchTime=[]
        var i=0
        incomingData.map((item,index)=>{
          i++
      incomingData[index]['bet']=''
      firstMatchTime.push(item.timeInMillis)
        if(item.player1==='N/A'){
        console.log('item.player1NickName samooooo')
        incomingData[index]['commenceTime']=''
        incomingData[index]['timeInMillis']=''
        incomingData[index]['time']=''
        incomingData[index]['error']=''
        incomingData[index]['apiId']=''
        incomingData[index]['team1Id']=''
        incomingData[index]['team2Id']=''
        }
        if(incomingData.length===i){
          var firstTime =  Math.min(...firstMatchTime.map(item => item));
          this.setState({firstTime})
          if(this.state.currentSelection==='firstRound'){firstRoundEdit=incomingData,this.setState({firstRoundEdit})} 
          if(this.state.currentSelection==='quarterFinals'){quarterFinalsEdit=incomingData,this.setState({quarterFinalsEdit})}
          if(this.state.currentSelection==='semiFinals'){semiFinalsEdit=incomingData,this.setState({semiFinalsEdit})}
          if(this.state.currentSelection==='finals'){finalEdit=incomingData,this.setState({finalEdit})}
          console.log('modal timeeeeeeee',firstTime,firstRoundEdit)
        }
      })
    }
  }
  doNothing=(event)=>{
        event.preventDefault()
        event.stopPropagation()
       }
       inputChange = async (e,index,type) => {
        var value = e.target.value
        console.log('theId', e.target.id)
        //first round quarter finals semi finals Finals
        if(type==='first round'){
          firstRoundEdit[index][e.target.id]=value
          await this.setState({firstRoundEdit})
          console.log("firstRoundEdit",firstRoundEdit)
        }
        if(type==='quarter finals'){
          quarterFinalsEdit[index][e.target.id]=value
          await this.setState({quarterFinalsEdit})
          console.log("quarterFinalsEdit",quarterFinalsEdit)
        }
        if(type==='semi finals'){
          semiFinalsEdit[index][e.target.id]=value
          await this.setState({semiFinalsEdit})
          console.log("semiFinalsEdit",semiFinalsEdit)
        }
        if(type==='Finals'){
          finalEdit[index][e.target.id]=value
          await this.setState({finalEdit})
          console.log("finalEdit",finalEdit)
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
          5000)
      }
      cancelEdit=()=>{
        firstRoundEdit=[],quarterFinalsEdit=[],semiFinalsEdit=[],finalEdit=[]
        this.setState({firstRoundEdit:[],quarterFinalsEdit:[],semiFinalsEdit:[],finalEdit:[]},()=>{
          this.props.onClick()
        })
      }
      submitMatches = () => {
        if(this.state.currentSelection==='firstRound'){this.submitDetails(this.state.firstRoundEdit,'firstRoundEdit')}
        if(this.state.currentSelection==='quarterFinals'){this.submitDetails(this.state.quarterFinalsEdit,'quarterFinalsEdit')}
        if(this.state.currentSelection==='semiFinals'){this.submitDetails(this.state.semiFinalsEdit,'semiFinalsEdit')}
        if(this.state.currentSelection==='finals'){this.submitDetails(this.state.finalEdit,'finalEdit')}
      }
      submitDetails = (theItems,theState) => {
        var i = 0, j = 0, k = 0, l = 0
        console.log('theItems',theItems)
        var teamsArr=[]
        var time='2025-03-20T00:00'
        
        theItems.map((item, index) => {
          if (item.team1Id === ''||item.team2Id === ''||item.apiId==='') {
            theItems[index]['error'] = 'Teams id & API Id field must be filled'
            this.setState({[theState]:theItems})
            return
          } else {
            j++
            var theTime=''
            if(item.player1==='N/A'){theTime=this.state.firstMatchTime}else{
              theTime=item.time
            }
            var timeInMillis = new Date(theTime).getTime()
            var theTime = dayjs(timeInMillis).format('MMM D, YYYY h:mm A')
            theItems[index]['commenceTime'] = theTime
            theItems[index]['timeInMillis'] = timeInMillis
            theItems[index]['error'] = ''
          }


          
          if(theItems.length===j){
            console.log('theItems jjjjjjj',theItems)
            this.setState({[theState]:theItems})
        var currentYear=new Date().getFullYear()
        var apiFirebaseRef = firebase.database().ref('/apis/NCAAFTeams/'+currentYear+'/')
        apiFirebaseRef.once('value', dataSnapshot => {
          if(dataSnapshot.exists()){
            var theCount=dataSnapshot.numChildren(),i=0
            console.log('the teams data available')
            dataSnapshot.forEach((data,index) => {
              i++
              teamsArr.push(data.val())
              if(theCount===i){
                //console.log('final arrr 111111',teamsArr)
                this.goToTeamsDataApi(theItems,teamsArr,theState)
              }
            })
          }else{
            console.log('the teams data nooot available')
            var oddsApi = "https://api.sportsdata.io/v3/cfb/scores/json/teams?key=f691242b217547ff9bfe4354f59f0fc1"
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
                    console.log('final arrr 222222',teamsArr)
                    this.goToTeamsDataApi(theItems,teamsArr,theState)
                  }
              })
              
            })
          }
         
        })
          
          }
        })
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
      sortOddsJson=async(theArr,stateEdit)=>{
        //e9588a5ac96d554bb82f408b998e0617 368a2a41d5755a2105d864570b332d20
       //cee48e2a2178b941b7812630706a9f78 5646efe9a934b4789e8ef316a1de1ac8
       //var oddsApi="https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
      // const response = await axios.get(oddsApi)
       //var theOddsJson=response.data
       var theOddsJson=theNCAAFOdds
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
     sendToDatabase=()=>{
      if(this.state.isItSubmit){
        if(this.state.currentSelection==='firstRound'){
          this.sendToDatabase2(this.state.firstRoundEdit,'stopFirstRoundEdit','firstRoundEdit')
        }
        if(this.state.currentSelection==='quarterFinals'){
          this.sendToDatabase2(this.state.quarterFinalsEdit,'stopQuarterEdit','quarterFinalsEdit')
        }
        if(this.state.currentSelection==='semiFinals'){
          this.sendToDatabase2(this.state.semiFinalsEdit,'stopSemiEdit','semiFinalsEdit')
        }
        if(this.state.currentSelection==='finals'){
          this.sendToDatabase2(this.state.finalEdit,'stopFinalEdit','finalsEdit')
        }
      }
      this.notify('Uploading....');
    }
     sendToDatabase2=async(theArr,editTime,stateName)=>{
      this.showProgressBar()
      var i=0
      theArr.map((item, index) => {
        if (item.team2Id === ''||item.team1Id === ''||item.player1 === ''||item.player1 === 'N/A'||item.player2 === ''||item.p1Photo === ''||item.p1Photo === 'N/A'||item.p2Photo === '') {
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
         var eventIdsLink2 ='/NCAAF/eventIds/'+eventKey+'/'
         var dataLink ='/NCAAF/'+eventKey+'/'+this.state.currentSelection//1737147600000
         console.log('combined items',theArr.length, theArr)//1737235800000
         var eventIdsEdit = {
        [editTime]:minTime,currentSelection:this.state.currentSelection,oddsTimeUpdate:new Date().getTime()}
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
                //this.props.onClick()
                firstRoundEdit=[],quarterFinalsEdit=[],semiFinalsEdit=[],finalEdit=[]
                this.setState({firstRoundEdit:[],quarterFinalsEdit:[],semiFinalsEdit:[],finalEdit:[]},()=>{
                  this.props.onClick()
                })
              }
            })
           }
         })
        }
      })
    }
       itemComponent=(compItems,eventType,type)=>{
       // var compItems=[...compItems.splice(0,4)]
        //console.log('compItems55555',compItems,compItems.length)
        return(
              compItems.map((item, index) => {
                return (
                  <div className={styles.listDiv} key={index}>
                    <div className={styles.theCont0}>
                      <div className={styles.theCont01}>
                        <p>{item.matchType+' Match '+(index+1)}</p>
                        <p>{item.commenceTime}</p>
                      </div>
                      <div className={styles.theCont}>
                        <div className={styles.theContLeft}>
                          <div className={styles.imgDiv1}>
                            {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                          </div>
                          
                          
                          <input className={styles.P2} id='team1Id' value={item.team1Id} placeholder='Enter team 1 Id' onChange={(event) => this.inputChange(event, index, type)}/>
                          <input className={styles.P1} id='apiId' value={item.apiId}  placeholder='Enter uid from odds api' onChange={(event) => this.inputChange(event, index, type)} />
                          <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' readOnly/>
                          {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                        </div>
                        <BsFillLightningFill className={styles.sepIc} />
                        <div className={styles.theContRight}>
                          <div className={styles.imgDiv2}>
                            {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                          </div>
                          <input className={styles.P1} id='team2Id'  value={item.team2Id} placeholder='Enter team 2 id' onChange={(event) => this.inputChange(event, index, type)}/>
                          <input className={styles.P2}  value={item.p2Photo} placeholder='Enter team Logo'  readOnly/>
                          <input className={styles.P2} id='player2' value={item.player2} placeholder='Enter team 2 name' readOnly />
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
        //console.log('compItems55555',firstRoundEdit)
    return (
      <><div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
        
          <p className={styles.headP}>Enter NCAAF Match Details</p>
        {this.state.currentSelection==='firstRound'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>First Round</p>
       <div className={styles.listCont}>{this.itemComponent(firstRoundEdit,'NCAAF First Round','first round')}</div></div>:null}
       {this.state.currentSelection==='quarterFinals'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>Quarter Finals</p>
        <div className={styles.listCont}>{this.itemComponent(quarterFinalsEdit,'NCAAF Quarter Finals','quarter finals')}</div></div>:null}
        {this.state.currentSelection==='semiFinals'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>Semi Finals</p>
        <div className={styles.listCont}>{this.itemComponent(semiFinalsEdit,'NCAAF Semi Finals','semi finals')}</div></div>:null}
        {this.state.currentSelection==='finals'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>Finals</p>
        <div className={styles.listCont}>{this.itemComponent(finalEdit,'NCAAF Finals','Finals')}</div></div>:null}
        {this.state.isItSubmit?<div className={styles.submitDiv}>
        <button className={styles.cancelBtn} onClick={()=>this.cancelEdit()}>Cancel</button>
        <button className={styles.submitBtn2} onClick={() => this.sendToDatabase()}>Submit</button>
        </div>:<button className={styles.submitBtn} onClick={()=>this.submitMatches()}>Preview</button>}
      </div>
      {this.state.showProgressBar?<ProgressBar/>:null}
       <ToastContainer/>
       </>
    )
  }
}

export default NCAAModal