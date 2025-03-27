import React, { Component } from 'react'
import firebase from '../FirebaseClient'
import styles from './CommMarchMadness.module.scss'
import { MdDeleteOutline } from "react-icons/md";

class CommMarchMadness extends Component {
  state={sportType:'NCAAB',currentSelection:'round1',isEventStarted:this.props.isEventStarted,creatorId:'',theFlocksArr:[],
    round1Arr:[],round2Arr:[],theEventKey:this.props.theEventKey,flockNameWithNoSpaces:this.props.flockNameWithNoSpaces,
    flockSysRound1:[],flockSysRound2:[],flockSysFinalRound:[],theItems:[],finalRoundArr:[],userId:'', userLoggedIn:false,isAdmin:false,theAdminFlocksArr:[],
    flockNameAvailable:this.props.flockNameAvailable,flocksItems:[],theTitle:'- RAMS IN YOUR FLOCK'
  }
  
  componentDidMount=()=>{
    this.getRamMembersData()
    this.checkAuth()
    this.loadAdminData()
    
  }
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1') {
          this.setState({ isAdmin: true})
        }
        this.setState({ userId:userId, userLoggedIn: true })
      } else {
        this.setState({ userLoggedIn: false })
     
      }
    })
  }
  getRamMembersData = () => {
    var sportType='NCAAB',currentSelection='round1',isEventStarted=this.props.isEventStarted
    var allArr = [],round1Arr=[],round2Arr=[]
    var theEventKey=this.props.theEventKey
    var flockNameWithSpaces=this.props.flockNameWithNoSpaces
    var flockNameWithNoSpaces=flockNameWithSpaces.split(' ').join('|')
    var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/membersScores/' + flockNameWithNoSpaces)
    var flockCreatorRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/unique/'+flockNameWithNoSpaces+'/creatorId')
    console.log('hureeeeeeeeeeeeeeeee',flockNameWithNoSpaces,theEventKey,currentSelection,sportType)
    flockCreatorRef.once('value', dataSnapshot => {
      var creatorId=dataSnapshot.val()
      this.setState({creatorId})
      console.log('rrrrrr raaaaaa',dataSnapshot.val())
    membersFlockNamesRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0,round1Arr=[],round2Arr=[],finalRoundArr=[]
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          console.log('the daaaaaaaaata',theData)
          var theUserId = data.key
          var BPS='',theScore='',r1BPS='',r2BPS='',r1S='',r2S='',round1Pick=false,round2Pick=false
          r1BPS=theData.round1BPS,r2BPS=theData.round2BPS
          r1S=theData.round1Score,r2S=theData.round2Score   
          round1Pick=theData.round1Pick, round2Pick=theData.round2Pick            
          if(r1BPS===undefined){r1BPS='0'};if(r2BPS===undefined){r2BPS='0'}//else{r2BPS='0'}
          if(r1S===undefined){r1S='0'};if(r2S===undefined){r2S='0'}
          if(round1Pick===undefined){round1Pick=false};if(round2Pick===undefined){round2Pick=false}
          var theItem={name:theData.ramName,score:r1S,BPS:r1BPS,pick:round1Pick,uid:theUserId}
          var theItem2={name:theData.ramName,score:r2S,BPS:r2BPS,pick:round2Pick,uid:theUserId}
          //
          var sweet16Score=theData.sweet16Score,elite8Score=theData.elite8Score,
          final4Score=theData.final4Score,finalRoundScore=theData.finalRoundScore,
          finalRoundPick=theData.finalRoundPick,sweet16Pick=theData.sweet16Pick, elite8Pick=theData.elite8Pick,
          final4Pick=theData.final4Pick  
          if(sweet16Score===undefined){sweet16Score='0'};
          if(elite8Score===undefined){elite8Score='0'};
          if(final4Score===final4Score){final4Score='0'};
          if(finalRoundScore===undefined){finalRoundScore='0'}

          if(finalRoundPick===undefined){finalRoundPick=false}
          if(sweet16Pick===undefined){sweet16Pick=false}
          if(elite8Pick===undefined){elite8Pick=false}
          if(final4Pick===undefined){final4Pick=false}
          var theItem3={name:theData.ramName,score:0,pick:finalRoundPick,uid:theUserId,
            sweet16Score:sweet16Score,elite8Score:elite8Score,final4Score:final4Score,finalScore:finalRoundScore,
            sweet16Pick:sweet16Pick,elite8Pick:elite8Pick,final4Pick:final4Pick,currentPick:theData.currentPick
          }
          round1Arr.push(theItem)
          round2Arr.push(theItem2)
          finalRoundArr.push(theItem3)
          console.log('round1Arr 4000',round1Arr)
          console.log('round2Arr 5000',round2Arr)
          if(i===count){
            this.setState({round1Arr:round1Arr,round2Arr:round2Arr,finalRoundArr:finalRoundArr,theItems:round1Arr})
            console.log('round1Arr 6000',round1Arr)
            console.log('round2Arr 7000',round2Arr)
            this.theFlocksData(theEventKey)
          }
        })
      }
    })
  })
 // this.theFlocksData(theEventKey)
    //membersFlockNamesRef.child(flockNameWithNoSpaces).child(this.state.userId).set('$$$'+this.state.creatorName)

  } 
  
  theFlocksData=(theEventKey)=>{
    var theFlocksRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/theFlocks/')
    theFlocksRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0, theFlocksArr = []
        var flockSysRound1=[],flockSysRound2=[],flockSysFinalRound=[]
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          //console.log('theFlocksArr 7777 theData',data.key, theData)
        // var theArr2 = { flockName: data.key, score:theData.score,avScore:theData.avScore,membersNo:theData.membersNo,theData:theData}
         var theItem={flockName: data.key,membersNo:theData.round1MembersNo,score:theData.round1Score,avScore:theData.round1AvScore}
         var theItem2={flockName: data.key,membersNo:theData.round2MembersNo,score:theData.round2Score,avScore:theData.round2AvScore}

         var sweet16MembersNo=theData.sweet16MembersNo
         var sweet16Score=theData.sweet16Score
         var elite8Score=theData.elite8Score
         var final4Score=theData.final4Score
         var finalRoundScore=theData.finalRoundScore
         if(sweet16Score===undefined){sweet16Score=0}
         if(elite8Score===undefined){elite8Score=0}
         if(final4Score===undefined){final4Score=0}
         if(finalRoundScore===undefined){finalRoundScore=0}
         if(sweet16MembersNo===undefined){sweet16MembersNo=0}
         var theScore=Number(sweet16Score)+Number(elite8Score)+Number(final4Score)+Number(finalRoundScore)
         var avScore=0
         if(sweet16MembersNo===0||sweet16MembersNo===undefined){avScore=0}
         else{avScore=theScore/sweet16MembersNo
         avScore = Number(avScore.toFixed(2))}

         console.log('yyyyyyyy',theScore,sweet16MembersNo)
         var theItem3={flockName: data.key,membersNo:sweet16MembersNo,score:theScore,avScore:avScore}
        
         flockSysRound1.push(theItem)
         flockSysRound2.push(theItem2)
         flockSysFinalRound.push(theItem3)
          //console.log('theFlocksArr 8888', theFlocksArr)
          if (count === i) {
            flockSysRound1 = flockSysRound1.sort(function (a, b) { return b.avScore - a.avScore })
            flockSysRound2 = flockSysRound2.sort(function (a, b) { return b.avScore - a.avScore })
            flockSysFinalRound = flockSysFinalRound.sort(function (a, b) { return b.avScore - a.avScore })
            //flockSysRound1 = flockSysRound1.sort(function (x, y) { return x.membersNo - y.membersNo || x.avScore - y.avScore; });
            //flockSysRound2 = flockSysRound2.sort(function (x, y) { return x.membersNo - y.membersNo || x.avScore - y.avScore; });

            this.setState({ flockSysRound1,flockSysRound2,flockSysFinalRound })
           console.log('theFlocksArr 9999', flockSysRound1,flockSysRound2,flockSysFinalRound)
          }
        })
      }
    })
  }
  loadAdminData = () => {
    var theEventKey=this.props.theEventKey
    var theAdminFlocksRef = firebase.database().ref('/flocksSystem/flockNames/' + theEventKey + '/admin/')
    theAdminFlocksRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var count = dataSnapshot.numChildren()
        var i = 0, allArr = []
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          theData = theData.split('!!')
          var name = theData[0]
          var picked = ''
          if (name.includes('$$$')) { picked = false }
          else { { picked = true } }
          var newName = theData[0].split('$$$').join('')
          var theArr = { name: newName, flockName: theData[1], email: theData[2], phoneNo: theData[3], picked: picked }
          allArr.push(theArr)
          if (count === i) {
            this.setState({ theAdminFlocksArr: allArr })
           // console.log('theFlocksArr', allArr)
          }
        })
      } else {
        this.setState({ theAdminFlocksArr: [] })
      }
    })

  }
  render() {
    var flockNameAvailable=this.props.flockNameAvailable
    var theItems=[],theItems2=[]
    if(this.props.currentRound==='round1'){theItems=this.state.round1Arr,theItems2=this.state.flockSysRound1}
    if(this.props.currentRound==='round2'){theItems=this.state.round2Arr,theItems2=this.state.flockSysRound2}
    if(this.props.currentRound==='finalRound'){theItems=this.state.finalRoundArr,theItems2=this.state.flockSysFinalRound}
    theItems = theItems.sort(function (a, b) { return b.score - a.score })
    console.log('currentRound',this.props.menuToShow,this.state.flockNameAvailable,this.props.currentRound,theItems2)
    console.log('flockNameAvailable',flockNameAvailable)
    var statToShow='',statCol=''
    if(this.props.eventStarted&&new Date().getTime()>(this.props.endTime+36000000)){statToShow='Expired Event',statCol='#919191'}
    if(this.props.eventStarted&&new Date().getTime()<(this.props.endTime+36000000)){statToShow='Active Event'}
    if(!this.props.eventStarted){statToShow='Upcoming Event'}
    return (
      <><div>
          {this.props.menuToShow==='Rams In Your Flock'?<>{this.props.flockNameAvailable ?<div className={styles.menu2Div1}>
              <p className={styles.titleP}><span>{this.props.flockNameWithNoSpaces}</span> {'- '+this.props.menuToShow}</p>
              <div id={styles.table1Div}>
              <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Overall <br />Rank</th>
                    <th>RAM Name</th>
                    {this.props.currentRound==='finalRound'?<th>Picked?<br/><span className={styles.subSpan}>{this.props.currentSubSelection}</span></th>:
                    <th>Picked?</th>}
                    {this.props.currentRound!=='finalRound'?<><th>Best Possible<br />Score</th>
                    <th>Cumulative <br />Score</th></>:
                    <>
                    <th>Cumulative Score</th>
                    <th>Sweet 16</th>
                    <th>Elite 8</th>
                    <th>Final 4</th>
                    <th>Finals</th>
                    </>
                    }
                    <th>Action</th>
                    </tr>
                  {theItems.map((item, index) => {
                    //console.log('picked', item)
                    var thePick=''
                    if(item.pick===true){thePick='true'}
                    if(item.pick===false){thePick='false'}
                    if(this.props.currentRound==='finalRound'){
                      if(item.currentPick==='sweet16'&&item.sweet16Pick===true){thePick='true'}else{thePick==='false'}
                      if(item.currentPick==='elite8'&&item.elite8Pick===true){thePick='true'}else{thePick==='false'}
                      if(item.currentPick==='final4'&&item.final4Pick===true){thePick='true'}else{thePick==='false'}
                      if(item.currentPick==='finalRoundPick'&&item.finalRoundPick===true){thePick='true'}else{thePick==='false'}
                    }
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.uid === this.state.userId ? '#292f51' : null, color: item.uid === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{thePick}</td>
                        {this.props.currentRound!=='finalRound'?<><td>{item.BPS}</td>
                        <td>{item.score}</td></>:
                        <>
                        <td>{item.score}</td>
                        <td>{item.sweet16Score}</td>
                        <td>{item.elite8Score}</td>
                        <td>{item.final4Score}</td>
                        <td>{item.finalScore}</td>
                        </>}
                        <td>{this.state.creatorId===this.state.userId?item.uid!==this.state.userId?<MdDeleteOutline className={styles.delIC} onClick={()=>this.setState({deleteName:item.theName,deleteModal:true,userIdToBeDeleted:item.uid,flockToBeDeleted:item.flockName})}/>:null:
                        item.uid===this.state.userId?<MdDeleteOutline className={styles.delIC} onClick={()=>this.setState({deleteName:item.theName,deleteModal:true,userIdToBeDeleted:item.uid,flockToBeDeleted:item.flockName})}/>:null}</td>
                        </tr>)
                  })}
                </table></div></div> : <div>
              <p className={styles.noDataP0} style={{ color: this.props.eventStarted ? statCol : null }}>{statToShow}</p>
              <p className={styles.noDataP1}>No "Rams in your flock" data available for this event</p>
              <p className={styles.noDataP2}>Check Events</p>
            </div>}</> : null}
                {this.props.menuToShow === 'Flocks Among Flocks' ? <>{flockNameAvailable ? <div className={styles.menu2Div1}>
                <p className={styles.titleP}>YOUR FLOCK'S RANK AMONG THE HEARD</p>
                <div id={styles.table1Div}>
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Flock Rank In Herd</th>
                    <th>Flock Names</th>
                    <th>Members No</th>
                    <th>Total Points</th>
                    <th>Average Points<br />Per RAM</th></tr>
                  {theItems2.map((item, index) => {
                   
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.flockName === this.props.flockNameWithNoSpaces ? '#292f51' : index===0?'#CB1E31':null, color: item.flockName === this.props.flockNameWithNoSpaces ? 'white' : index===0?'#fff':'#292f51'}}>
                        <td>{index + 1}</td>
                        <td>{item.flockName.split("|").join(' ')}</td>
                        <td>{item.membersNo}</td>
                        <td>{item.score}</td>
                        <td>{item.avScore}</td>
                        </tr>)
                  })}
                </table>
                </div> </div>: <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? statCol : null }}>{statToShow}</p>
              <p className={styles.noDataP1}>No "Your flocks among flocks" data available for this event</p>
              <p className={styles.noDataP2} >Check Events</p>
            </div>}</> : null}
               
            {this.props.menuToShow==='Admin'&&this.state.isAdmin? <>{this.state.theAdminFlocksArr.length > 0 ? <div className={styles.menu2Div1}>
              <p className={styles.titleP}>ADMIN VIEW</p>
              <div id={styles.table1Div}>
                <table className={styles.table1}>
                  <tr id={styles.table1Tr1}>
                    <th>Overall <br />Rank</th>
                    <th>RAM Name</th>
                    <th>Flock Name</th>
                    <th>Picked?</th>
                    {this.state.isAdmin?<><th>Email</th>
                    <th>Phone No</th></>:null}
                  </tr>
                  {this.state.theAdminFlocksArr.map((item, index) => {
                    console.log('itttm',item)
                    return (
                      <tr key={index} id={styles.table1Tr2} style={{ backgroundColor: item.uid === this.state.userId ? '#292f51' : null, color: item.uid === this.state.userId ? 'white' : '#292f51' }}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.flockName}</td>
                        <td style={{ color: item.picked ? 'green' : 'red' }}>{item.picked + ''}</td>
                        {this.state.isAdmin?<><td>{item.email}</td>
                        <td>{item.phoneNo}</td></>:null}
                      </tr>)
                  })}
                </table>
              </div> </div> : <div>
              <p className={styles.noDataP0} style={{ color: this.state.eventStarted ? statCol : null }}>{statToShow}</p>
              <p className={styles.noDataP1}>No Admin data available for this event</p>
            </div>}</> : null}

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
      </>
    )
  }
}
export default CommMarchMadness