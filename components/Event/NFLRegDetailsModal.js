import React, { Component } from 'react'
import styles from './DetailsModal.module.scss'
import { MdLockOutline ,MdArrowDropDown,MdInfoOutline,MdCheck,MdOutlineKeyboardArrowRight,MdOutlinePersonOutline } from "react-icons/md";
import firebase from '../FirebaseClient'
import localStorage from 'local-storage'
import Checkbox from "react-custom-checkbox";
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../Helper/ProgressBar'
import Router from 'next/router';
var flockTeamName=''


class DetailsModal extends Component {
  state={teamName:'',flockName:'',flockName2:'',teamNameErr:'',flockNameErr:'',upcomingRamUfcDetails:true,
    userId:'',theItems:this.props.theItems,allPicked:true,currentEvent:'',mySelection:[],oldRamName:'',submitedFlockName:'',
    bestPossibleScore:0,buttonClick:true,showProgressBar:false,ramFlockNames:[],ramFlockName:'',flockNameNoSpace:'',flockNameModal:false,openNewFlockModal:true,
    myEmail:'',myPhoneNo:''}
  componentDidMount=()=>{
    //console.log('iteeems',this.props.currentEvent,this.props.eventTitle,this.props.theEventKey)
    this.props.hideModal
    var upcomingRamUfcDetails = localStorage.get('upcomingRamUfcDetails');
    var userId = localStorage.get('userId');
    ////console.log('this.props.currentSelection 5555',this.props.currentSelection)
    ////console.log('userId 55555555555',userId,upcomingRamUfcDetails)
    
    if(this.props.flockTeamName!==false){
      ////console.log('this.props.flockTeamName yoooooooooooooh')
      flockTeamName=this.props.flockTeamName.split('::')
      this.setState({teamName:flockTeamName[0],flockName:flockTeamName[1],flockName2:flockTeamName[1],submitedFlockName:flockTeamName[1]})
    }
    this.setState({currentEvent:this.props.currentEvent,ramFlockNames:[]})
    if (upcomingRamUfcDetails === 'true') { this.setState({upcomingRamUfcDetails:true,userId:userId})}
    else{this.setState({upcomingRamUfcDetails:false})}

    this.getAuth()
  }
  inputChange = async (e) => {
    var value = e.target.value
    ////console.log('theId', e.target.id)
    value=value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, ' ');
    await this.setState({[e.target.id]: value})
      if (e.target.id ==='teamName'){
        if (this.state.teamName.length>=3){this.setState({teamNameErr:''})}
      }
      if (e.target.id ==='flockName'){
        ////console.log('hapa tu',e.target.id)
        if (this.state.flockName.length>=3){this.setState({flockNameErr:''})}
      }
  }
  showProgressBar=()=>{
    this.setState({showProgressBar:true})
    this.timerHandle = setTimeout(
      () => this.setState({showProgressBar:false}), 
      3000)
  }
  buttonClickStat=()=>{
    this.showProgressBar()
    this.setState({buttonClick:false})
    this.timerHandle = setTimeout(
      () => this.setState({buttonClick:true}), 
      5000)
  }
  getFlockNames=(userId)=>{
    var flocks=[],i=0
    console.log('this.props.theEventKey',this.props.theEventKey)
    var myFlockNamesRef=firebase.database().ref('/users/').child(userId+'/flockData/flockNames/').child(this.props.theEventKey)
    myFlockNamesRef.once('value',dataSnapshot=>{
      //this.setState({openNewFlockModal:false})
      if(dataSnapshot.exists()){
      var theFlockName=dataSnapshot.val().name
      theFlockName=theFlockName.split("|").join(" ")
      this.setState({ramFlockName:theFlockName,flockNameNoSpace:dataSnapshot.val().name})
      }else{
        this.setState({ramFlockName:'Flockless',flockNameNoSpace:'Flockless'})
      }
    })
  }
  getUserDetails=(userId)=>{
    var userRef = firebase.database().ref('/users/'+userId+'/userData/')
    userRef.once('value', dataSnapshot => {
     var myEmail=dataSnapshot.val().email
     var myPhoneNo=dataSnapshot.val().phoneNo
     this.setState({myEmail,myPhoneNo})
    
    })
   }
  /*getFlockNames=(userId)=>{
    var flocks=[],i=0
    var myFlockNamesRef=firebase.database().ref('/users/').child(userId+'/userData/').child('flockNames')
    myFlockNamesRef.once('value',dataSnapshot=>{
      var flockCount=dataSnapshot.numChildren()
      if(!dataSnapshot.val()){
        //console.log('hakuna kitu mzeeee')
        this.setState({openNewFlockModal:false})
      }else{
      //console.log('kunaaaaaaaaaa kitu mzeeee')
      dataSnapshot.forEach((data,index) => {
        i++
       //console.log('the flock names',data.key,flockCount)
       var theKey=data.key.replace(/_/g,' ')
       flocks.push(theKey)
       if(flockCount===i){
        this.setState({ramFlockNames:flocks})
        //console.log('the flockssss',flocks)
       }
      })
    }
    })
  }*/


  submitDetails=()=>{
    //console.log('ghgghhghg',this.state.currentEvent+'/'+this.props.theEventKey,this.props.currentSelection)
    //return
    this.setState({flockNameErr:''})
    if (!this.state.buttonClick)return
    this.buttonClickStat()
    var mySelection=[]
    ////console.log('this.state.theItems',this.state.theItems)
    //return
    ////console.log('the details',this.state.theItems)
    ////console.log('the user id',this.state.userId)

    if (this.state.teamName.length<3){this.setState({teamNameErr:'Team Name must be 3 characters and above'});return}
    var i=0,theAmount=[]
    this.state.theItems.map((item,index)=>{
      
     
      var amount=0
      if(item.bet==='player1'){
        amount=Number(item.p1Points)
        ////console.log('the amount 1',Number(item.p1Points))
        theAmount.push(amount)
      }
      if(item.bet==='player2'){
        amount=Number(item.p2Points)
        ////console.log('the amount 2',Number(item.p2Points))
        theAmount.push(amount)
      }
      
      ////console.log('the amount',theAmount)
      //if(!item.bet||item.bet===''){//console.log('it iiiis',item.bet,index)}
      if(!item.bet||item.bet===''){
        this.setState({allPicked:false})
        this.notify('Ensure all matches are picked to proceed')
      return}
      var theArr={id:item.id,player1:item.player1,player2:item.player2,bet:item.bet,matchNo:item.matchNo}
      mySelection.push(theArr)
      ////console.log('mySelection',mySelection)
      i++
      if(i===this.state.theItems.length){
        const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
        ////console.log('the suummmm',sum)
        this.setState({allPicked:true,mySelection:mySelection,bestPossibleScore:sum.toFixed(2)},()=>{
        this.checkAuth('submitDetails')
 
        })
        ////console.log('tumemalizaaaaaa',this.state.mySelection)
        //return
       
      }
      
    })
    /*////console.log('this.state.userId',this.state.userId)
    if(!this.state.userId)return
    ////console.log('looooooooobo')
    //return
    var userInfoDb = firebase.database().ref('users').child(this.state.userId)
    
     userInfoDb.child('teamName').set(this.state.teamName)
     userInfoDb.child('flockName').set(this.state.flockName)
     .then(det=>{
      ////console.log('the det ttttttttttttt',det)
     })
     localStorage.set('upcomingRamUfcDetails', 'true');
     this.setState({upcomingRamUfcDetails:true})*/
   }
   getAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       var userId=user.uid
       this.getFlockNames(userId)
       this.setState({userId})
       var emailVerified=user.emailVerified
       this.setState({userId})
       localStorage.set('loggedIn', 'true');
       localStorage.set('userId', userId);
       this.getUserDetails(userId)
       if(emailVerified===true){localStorage.set('emailVerified', 'true');}
       else{localStorage.set('emailVerified', 'false');}
     } else {
       localStorage.set('loggedIn', 'false');
     }
   })
 }
   checkAuth = (from) => {
   firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userId=user.uid
      var emailVerified=user.emailVerified
      this.setState({userId})
      if(from==='submitDetails'){this.toDatabase()}
      localStorage.set('loggedIn', 'true');
      localStorage.set('userId', userId);
      if(emailVerified===true){localStorage.set('emailVerified', 'true');}
      else{localStorage.set('emailVerified', 'false');}
    } else {
      localStorage.set('loggedIn', 'false');
    }
  })
}
   toDatabase=()=>{
    
    if(!this.state.userId)return
    var eventKey=this.props.theEventKey
    var itemsData={}
    ////console.log('looooooooobo')
    const theTime = new Date().getTime()
    var detailsData = {},scoreData={}
    var dataScore=this.props.currentSelection+'Score'
    var theSelection=this.props.currentSelection
     var thePick=theSelection+'Pick'
     var bps2=theSelection+'BPS'
     //var bps2=theSelection+'Ran'
    if(this.props.currentSelection==='week1Round'){
      detailsData = {
        teamName:this.state.teamName,
        flockName:this.state.ramFlockName,
        created: theTime,
        bestPossibleScore:this.state.bestPossibleScore,
        [bps2]:this.state.bestPossibleScore,
        currentScore:'0.00',
        [dataScore]:'0.00',
        currentRank:false, 
        week1RoundRank:false, 
        week2RoundRank:false, 
        week3RoundRank:false, 
        currentPick:this.props.currentSelection,
        week2RoundScore:'0',
        week3RoundScore:'0',
        [thePick]:true
        
      }
      scoreData={BPS:this.state.bestPossibleScore,score:0,
        week2RoundScore:'0',week3RoundScore:'0',
        [dataScore]:'0',currentPick:theSelection,
        ramName:this.state.teamName,picked:true,[thePick]:true,
        [bps2]:this.state.bestPossibleScore}
    }else{
      detailsData = {
        teamName:this.state.teamName,
        bestPossibleScore:this.state.bestPossibleScore,
        flockName:this.state.flockName,
        [dataScore]:'0.00', [thePick]:true,
        currentPick:this.props.currentSelection,
        [bps2]:this.state.bestPossibleScore
      }
      scoreData={BPS:this.state.bestPossibleScore,score:0,currentPick:theSelection,
        ramName:this.state.teamName,picked:true, [thePick]:true,
        [bps2]:this.state.bestPossibleScore}
      }
      //var scoreData={BPS:this.state.bestPossibleScore,score:0,ramName:this.state.teamName,picked:true}
   // }
   // detailsData[dataScore]='0.00'
    var i=0
    this.state.theItems.map((item,index)=>{
      //console.log('iteeem',item.id,item.bet)
      i++
      itemsData[item.id]=item.bet
          if(this.state.theItems.length===i){
           
        
    //return
    ////console.log('detailsData',detailsData)
    var theTeamName=this.state.teamName.replace(/ /g,"_")
    var theFlockName=this.state.flockName.replace(/ /g,"_")
    var uniqueRamNamesRef = firebase.database().ref('/theNames/ramNames/').child(this.state.currentEvent+'/'+this.props.theEventKey+'/')
    var uniqueFlockNamesRef = firebase.database().ref('/theNames/flockNames/').child(this.state.currentEvent+'/'+this.props.theEventKey+'/')
    uniqueRamNamesRef.child(theTeamName).once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      var theName=dataSnapshot.key
      //console.log('theName',theName,'theInfo',theInfo)
      //console.log('flockTeamName[0]',flockTeamName[0])
     // return
      if(!theInfo){
        if(flockTeamName[0]){
          var name1=flockTeamName[0].replace(/ /g,"_")
          uniqueRamNamesRef.child(name1).set(null)
        }
        ////CONTINUE
        this.toDatabase2(detailsData,itemsData,uniqueRamNamesRef,theTeamName,scoreData)
      }
      else{
        if(theInfo===this.state.userId){
          if(flockTeamName[0]){
            var name1=flockTeamName[0].replace(/ /g,"_")
            uniqueRamNamesRef.child(name1).set(null)
          }
          this.toDatabase2(detailsData,itemsData,uniqueRamNamesRef,theTeamName,scoreData)
          //console.log('continue 222222')
        }else{
        this.notify('RAM Name already taken')
        this.setState({teamNameErr:'RAM Name already taken, please try another one'})}
          ////console.log('change that shit')
      }})

    }
  })
   }
   toDatabase2=(detailsData,itemsData,uniqueRamNamesRef,theTeamName,scoreData)=>{
    var keysDbRef = firebase.database().ref('users/').child(this.state.userId+'/ramData/').child('upcomingEvents').child(this.state.currentEvent)
    var gamesDataRef = firebase.database().ref('users/').child(this.state.userId+'/ramData/').child('events').child(this.state.currentEvent)
    var ramsBets = firebase.database().ref('userBets/'+this.state.currentEvent+'/')
   // var adminRef = firebase.database().ref('userBets/admin/'+this.state.currentEvent+'/')
   

    var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.props.theEventKey)
    var adminRef = firebase.database().ref('/flocksSystem/flockNames/'+this.props.theEventKey+'/admin')
    
    var toAdmin=this.state.teamName+'!!'+this.state.ramFlockName+'!!'+this.state.myEmail+'!!'+this.state.myPhoneNo

    if(this.state.ramFlockName!=='Flockless'){
      membersFlockNamesRef.child('/members/'+this.state.flockNameNoSpace).child(this.state.userId).set(this.state.teamName)
      adminRef.child(this.state.userId).set(toAdmin)
      membersFlockNamesRef.child('/membersScores/'+this.state.flockNameNoSpace).child(this.state.userId).update(scoreData)
    }
   
   
   
   
    keysDbRef.child(this.props.theEventKey).set(true)
    gamesDataRef.child(this.props.theEventKey+'/details/').update(detailsData)
    gamesDataRef.child(this.props.theEventKey+'/bets/'+this.props.currentSelection).update(itemsData)
    uniqueRamNamesRef.child(theTeamName).set(this.state.userId)
    //adminRef.child(this.props.theEventKey+'/'+this.props.currentSelection).child(this.state.userId).set(new Date().getTime())
    ramsBets.child(this.props.theEventKey+'/').child(this.state.userId).update(itemsData,(error) => {
      if (error) {
        ////console.log('AN ERROR OCCURED WHILE POSTING YOUR PICKS TO FIREBASE')
      } else {
        ////console.log('Your picks have been submitted successfully') 
        this.notify('Your picks have been submitted successfully')
        Router.push('/reload')        
      }
    })
    // localStorage.set('upcomingRamUfcDetails', 'true');
    // this.setState({upcomingRamUfcDetails:true})
   }
   doNothing=(event)=>{
    event.preventDefault()
    event.stopPropagation()
   }
   selectedItems=(id,index,theBet,player1Points,player2Points)=>{
    ////console.log('the idddddddd',id,index,theBet,player1Points,player2Points)
    //return
    const theItems = [...this.state.theItems];
    const targetIndex = theItems.findIndex(f=>f.id===id); 
    //theItems[targetIndex].bestPossibleScore = 'player1';
    if(index===0){
      theItems[targetIndex].bestPossibleScore = Number(player1Points);
      if(theBet==='player1'){theItems[targetIndex].bet='';}
      else{ theItems[targetIndex].bet = 'player1';}
    }
    if(index===1){
      theItems[targetIndex].bestPossibleScore = Number(player2Points);
      if(theBet==='player2'){theItems[targetIndex].bet='';}
      else{ theItems[targetIndex].bet = 'player2';}
    }
    this.setState({theItems})

////console.log('theItems 1111111111',theItems)
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
  openFlockModal=()=>{
    if (navigator.onLine === false) {
      this.notify('No internet! please check your internet connection')
      return
    }
    this.setState({flockNameModal:!this.state.flockNameModal})
  }
  render() {
    var theEvent=''
    if(this.props.currentEvent==='ramUfc'){theEvent='RAM UFC'}
    if(this.props.currentEvent==='NCAAF'){theEvent='NCAAF'}
    if(this.props.currentEvent==='NFL'){theEvent='NFL'}
     if(this.props.currentEvent==='NFLRegular'){theEvent='NFL Regular'}
    return (
      <><div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
                    <h1>Enter RAM Details</h1>
                    <div className={styles.theMenuDiv}>
                    <p>{theEvent}</p>
                    <MdOutlineKeyboardArrowRight className={styles.theMenuIc}/>
                    <p>{this.props.eventTitle}</p>
                    </div>
                   
                    <div className={styles.detUpperDiv}><div className={styles.nameCont}>
                    <p className={styles.P1}>RAM Name</p>
                    <MdInfoOutline className={styles.nameIC}/>
                    </div>
                    <div className={styles.cont1}>
                    <MdOutlinePersonOutline   className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Enter your RAM name' type='text' id='teamName' value={this.state.teamName} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.teamNameErr}</p>
                    <div className={styles.nameCont}>
                    <p className={styles.P1}>Flock Name</p>
                    <MdInfoOutline className={styles.nameIC}/>
                    </div>
                    <div className={styles.cont2}>
                    <div className={styles.cont2b}>
                    <MdOutlinePersonOutline   className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Enter your Flock Name' type='text' id='flockName' readOnly value={this.state.ramFlockName} onChange={(event)=>this.inputChange(event)}></input>  
                     </div>
                    {/*<div className={styles.cont2b} onClick={()=>this.openFlockModal()}>
                    <MdOutlinePersonOutline   className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Enter your Flock Name' type='text' id='flockName' readOnly value={this.state.flockName2} onChange={(event)=>this.inputChange(event)}></input>  
                    <MdArrowDropDown className={styles.dropIcon} /></div>
                    {this.state.flockNameModal?<div className={styles.flockNameModal}>
                     {this.state.openNewFlockModal?this.state.ramFlockNames.map((item,index)=>{
                      return(
                        <p key={index} className={styles.flockNameList} onClick={()=>this.setState({flockName:item,submitedFlockName:item,flockName2:item,flockNameModal:false})}>{item}</p>
                      )
                     }):<div>
                      <p className={styles.noFlockP}>N/B You are not a member of any RAM flock/group at the moment. Flock names allow you to connect and play besides your family and friens as a group. Please fill in a Flock Name below and submit to continue.</p>
                      <input  className={styles.flockNameInput} placeholder='Enter your Flock Name' type='text' id='flockName' style={{color:'#000'}} value={this.state.flockName} onChange={(event)=>this.inputChange(event)}></input>  
                      <p className={styles.flockSubmitP} onClick={()=>this.submitFlockName()}>Submit</p>
                      </div>}
                    </div>:null}*/}
                    </div>
                    <p className={styles.pErr}>{this.state.flockNameErr}</p></div>
                    
                    <div className={styles.listCont}>
                    <p className={styles.selectP}>Select your picks</p>
                    <p className={styles.nbP1}>*All matches must be selected</p>
        {this.state.theItems.map((item,index)=>{
          var theId=item.id
          var theBet=item.bet         
          var player1Points=item.p1Points
          var player2Points=item.p2Points
          var details1=item.player1
          var details2=item.player2
          var tableArray=[details1+'#'+item.p1Points+'#'+item.bet,details2+'#'+item.p2Points+'#'+item.bet]
          var yourPick='N/A'
          var pickCol='#CB1E31'
          if(item.bet==='player1'){yourPick=item.player1,pickCol='#1ecb97'}
          if(item.bet==='player2'){yourPick=item.player2,pickCol='#1ecb97'}
          return(
           <div className={styles.listDiv} key={index}>
           <p className={styles.matchP}>Match #{index+1}</p>
           <div id={styles.table1Div}>
                        <table className={styles.table1}>
                            <tr id={styles.table1Tr1}>
                                <th><div className={styles.boxDiv}><MdCheck color="#292f51" size={15} /></div></th>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>
                            {tableArray.map((item, index) => {
                              var theItem=item.split('#')
                              var selected=theItem[2]
                             // ////console.log('the item',item)
                              var selectedToShow=selectedToShow=<div className={styles.boxDiv2} onClick={()=>this.selectedItems(theId,index,theBet,player1Points,player2Points)}><MdCheck color="#fff" size={15} /></div>
                              if(index===0&&selected==='player1'){
                                selectedToShow=<div className={styles.boxDiv3}><MdCheck color="#fff" size={15} onClick={()=>this.selectedItems(theId,index,theBet,player1Points,player2Points)}/></div>
                              }
                              if(index===1&&selected==='player2'){
                                selectedToShow=<div className={styles.boxDiv3}><MdCheck color="#fff" size={15} onClick={()=>this.selectedItems(theId,index,theBet,player1Points,player2Points)}/></div>
                              }
                              return(
<tr  id={styles.table1Tr2} key={index}>
                                         <td style={{cursor:'pointer'}}>
           {selectedToShow}
           </td>
                                        <td>{theItem[0]}</td>
                                        <td>+{theItem[1]}</td>
                                        </tr>
                              )
                            })}
                                        </table> </div>
           <p className={styles.pickP}>Your pick: <span style={{color:pickCol}}>{yourPick}</span></p>
           </div>
          )})}</div>
                    {!this.state.allPicked?<p className={styles.nbP2}>*Ensure all matches are picked to proceed</p>:null}
                    <button className={styles.logInBtn} onClick={()=>this.submitDetails()}>SUBMIT</button>
                </div>
                {this.state.showProgressBar?<ProgressBar/>:null}
                <ToastContainer/>
               </>
    )
  }
}

export default DetailsModal