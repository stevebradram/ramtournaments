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
const mainCard=[
  {id:1,matchNo:1,time:'Nov 3 2024, 03:00PM',player1:'Brandon Moreno-Mexico',p1Rec:'21-8-2',p1Points:'1.42',player2:'Amir Albazi-Iraq',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',bestPossibleScore:'', status2:'',bet:'',winner:'player1',match:'Mens Flyweight'},
  {id:2,matchNo:2,time:'Nov 3 2024, 03:00PM',player1:'Erin Blanchfield-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Rose Namajunas-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player3.png',p2Photo:'player4.png',status1:'ongoing',bestPossibleScore:'',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
  {id:3,matchNo:3,time:'Nov 3 2024, 03:00PM',player1:'Derrick Lewis-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Jhonata Diniz-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player5.png',p2Photo:'player6.png',status1:'played',bestPossibleScore:'',status2:'',bet:'',winner:'player1',match:'Mens Heavyweight'},
  {id:4,matchNo:4,time:'Nov 3 2024, 03:00PM',player1:'Caio Machado-Brazil',p1Rec:'21-8-2',p1Points:'1.42',player2:'Brendson Ribeiro-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player7.png',p2Photo:'player8.png',status1:'played',bestPossibleScore:'',status2:'',bet:'player2',winner:'player2',match:'Mens Light Heavyweight'},
  {id:5,matchNo:5,time:'Nov 3 2024, 03:00PM',player1:'Marc Andre Barriault-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Dustin Stoltzfus-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player9.png',p2Photo:'player10.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Middleweight'},
  {id:6,matchNo:6,time:'Nov 3 2024, 03:00PM',player1:'Mike Malott-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Trevin Giles-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player11.png',p2Photo:'player12.png',status1:'played',status2:'',bestPossibleScore:'',bet:'player1',winner:'player2',match:'Mens Welterweight'},
  ]

class DetailsModal extends Component {
  state={teamName:'',flockName:'',flockName2:'',teamNameErr:'',flockNameErr:'',upcomingRamUfcDetails:true,
    userId:'',theItems:this.props.theItems,allPicked:true,currentEvent:'',mySelection:[],oldRamName:'',
    bestPossibleScore:0,buttonClick:true,showProgressBar:false,ramFlockNames:[],flockNameModal:false,openNewFlockModal:true}
  componentDidMount=()=>{
    console.log('iteeems',this.props.theItems)
    this.props.hideModal
    var upcomingRamUfcDetails = localStorage.get('upcomingRamUfcDetails');
    var userId = localStorage.get('userId');
    //console.log('userId 55555555555',userId,upcomingRamUfcDetails)
    //console.log('this.props.flockTeamName',this.props.flockTeamName)
    if(this.props.flockTeamName!==false){
      //console.log('this.props.flockTeamName yoooooooooooooh')
      flockTeamName=this.props.flockTeamName.split('::')
      this.setState({teamName:flockTeamName[0],flockName:flockTeamName[1],flockName2:flockTeamName[1]})
    }
    this.setState({currentEvent:this.props.currentEvent,ramFlockNames:[]})
    if (upcomingRamUfcDetails === 'true') { this.setState({upcomingRamUfcDetails:true,userId:userId})}
    else{this.setState({upcomingRamUfcDetails:false})}

    this.getAuth()
  }
  inputChange = async (e) => {
    var value = e.target.value
    //console.log('theId', e.target.id)
    value=value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, ' ');
    await this.setState({[e.target.id]: value})
      if (e.target.id ==='teamName'){
        if (this.state.teamName.length>=3){this.setState({teamNameErr:''})}
      }
      if (e.target.id ==='flockName'){
        //console.log('hapa tu',e.target.id)
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
    var myFlockNamesRef=firebase.database().ref('/users/').child(userId+'/userData/').child('flockNames')
    myFlockNamesRef.once('value',dataSnapshot=>{
      var flockCount=dataSnapshot.numChildren()
      if(!dataSnapshot.val()){
        console.log('hakuna kitu mzeeee')
        this.setState({openNewFlockModal:false})
      }else{console.log('kunaaaaaaaaaa kitu mzeeee')}
      dataSnapshot.forEach((data,index) => {
        i++
       console.log('the flock names',data.key,flockCount)
       var theKey=data.key.replace(/_/g,' ')
       flocks.push(theKey)
       if(flockCount===i){
        this.setState({ramFlockNames:flocks})
        console.log('the flockssss',flocks)
       }
      })
    })
  }
  submitFlockName=()=>{
    if (!this.state.buttonClick)return
    this.buttonClickStat()
    if (this.state.flockName<3){this.setState({flockNameErr:'Flock Name must be selected'});return}
    this.checkAuth('submitFlockName')
  }
  flockNameToDatabase=(userId)=>{
    var theFlockName=this.state.flockName.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, ' ');
        theFlockName=theFlockName.replace(/ /g,"_")
       
      
    var myFlockNamesRef=firebase.database().ref('/users/').child(userId+'/userData/').child('flockNames')
    var uniqueFlockNameRef = firebase.database().ref('/flockNames/uniques/'+theFlockName)
    var uniqueFlockMembersRef = firebase.database().ref('/flockNames/members/'+theFlockName).child(userId);
   
    uniqueFlockNameRef.once('value',dataSnapshot=>{
      if(!dataSnapshot.val()){
       console.log('there is no data')
       uniqueFlockNameRef.set(userId)
    uniqueFlockMembersRef.set('Admin')
    myFlockNamesRef.child(theFlockName).set(userId,(error) => {
        if (error) {
          this.notify('An error occured while updating  flock name')
        }else{
          var flocks=this.state.ramFlockNames
          flocks.push(this.state.flockName)
          this.setState({flockNameModal:false,openNewFlockModal:true,ramFlockNames:flocks,flockName2:this.state.flockName})
          this.notify('Flock name updated successfully')
        }
    })
      }else{
        console.log('there is dataaaa',dataSnapshot.val())
        //this.notify('Flock Name already taken, please enter another name')
        this.setState({flockNameErr:'Flock Name already taken, please enter another name'});
        return
      }
      })
      
  }
  submitDetails=()=>{
    if (!this.state.buttonClick)return
    this.buttonClickStat()
    var mySelection=[]
    //console.log('this.state.theItems',this.state.theItems)
    //return
    //console.log('the details',this.state.theItems)
    //console.log('the user id',this.state.userId)

    if (this.state.teamName.length<3){this.setState({teamNameErr:'Team Name must be 3 characters and above'});return}
    if (this.state.flockName<3){this.setState({flockNameErr:'Flock Name must be 3 characters and above'});return}
    var i=0,theAmount=[]
    this.state.theItems.map((item,index)=>{
      
     
      var amount=0
      if(item.bet==='player1'){
        amount=Number(item.p1Points)
        //console.log('the amount 1',Number(item.p1Points))
        theAmount.push(amount)
      }
      if(item.bet==='player2'){
        amount=Number(item.p2Points)
        //console.log('the amount 2',Number(item.p2Points))
        theAmount.push(amount)
      }
      
      //console.log('the amount',theAmount)
      //if(!item.bet||item.bet===''){console.log('it iiiis',item.bet,index)}
      if(!item.bet||item.bet===''){
        this.setState({allPicked:false})
        this.notify('Ensure all matches are picked to proceed')
      return}
      var theArr={id:item.id,player1:item.fighter1Name,player2:item.fighter2Name,bet:item.bet,matchNo:item.matchNo}
      mySelection.push(theArr)
      //console.log('mySelection',mySelection)
      i++
      if(i===this.state.theItems.length){
        const sum = theAmount.reduce((partialSum, a) => partialSum + a, 0);
        //console.log('the suummmm',sum)
        this.setState({allPicked:true,mySelection:mySelection,bestPossibleScore:sum.toFixed(2)},()=>{
        this.checkAuth('submitDetails')
 
        })
        //console.log('tumemalizaaaaaa',this.state.mySelection)
        //return
       
      }
      
    })
    /*//console.log('this.state.userId',this.state.userId)
    if(!this.state.userId)return
    //console.log('looooooooobo')
    //return
    var userInfoDb = firebase.database().ref('users').child(this.state.userId)
    
     userInfoDb.child('teamName').set(this.state.teamName)
     userInfoDb.child('flockName').set(this.state.flockName)
     .then(det=>{
      //console.log('the det ttttttttttttt',det)
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
      if(from==='submitFlockName'){this.flockNameToDatabase(userId)}
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
    //console.log('looooooooobo')
    const theTime = new Date().getTime()
    const detailsData = {
      teamName:this.state.teamName,
      flockName:this.state.flockName,
      created: theTime,
      bestPossibleScore:this.state.bestPossibleScore,
      currentScore:'0.00',
      currentRank:false
    }
  
    var i=0
    this.state.theItems.map((item,index)=>{
      console.log('iteeem',item.id,item.bet)
      i++
      itemsData[item.id]=item.bet
          if(this.state.theItems.length===i){
           
        
    //return
    //console.log('detailsData',detailsData)
    var theTeamName=this.state.teamName.replace(/ /g,"_")
    var theFlockName=this.state.flockName.replace(/ /g,"_")
    var uniqueRamNamesRef = firebase.database().ref('/theNames/ramNames/').child(this.state.currentEvent+'/'+this.props.theEventKey+'/')
    var uniqueFlockNamesRef = firebase.database().ref('/theNames/flockNames/').child(this.state.currentEvent+'/'+this.props.theEventKey+'/')
    uniqueRamNamesRef.child(theTeamName).once('value',dataSnapshot=>{
      var theInfo=dataSnapshot.val()
      var theName=dataSnapshot.key
      console.log('theName',theName,'theInfo',theInfo)
      console.log('flockTeamName[0]',flockTeamName[0])
     // return
      if(!theInfo){
        if(flockTeamName[0]){
          var name1=flockTeamName[0].replace(/ /g,"_")
          uniqueRamNamesRef.child(name1).set(null)
        }
        ////CONTINUE
        this.toDatabase2(detailsData,theFlockName,uniqueFlockNamesRef,itemsData,uniqueRamNamesRef,theTeamName)
      }
      else{
        if(theInfo===this.state.userId){
          if(flockTeamName[0]){
            var name1=flockTeamName[0].replace(/ /g,"_")
            uniqueRamNamesRef.child(name1).set(null)
          }
          this.toDatabase2(detailsData,theFlockName,uniqueFlockNamesRef,itemsData,uniqueRamNamesRef,theTeamName)
          console.log('continue 222222')
        }else{
        this.notify('RAM Name already taken')
        this.setState({teamNameErr:'RAM Name already taken, please try another one'})}
          //console.log('change that shit')
      }})

    }
  })
   }
   toDatabase2=(detailsData,theFlockName,uniqueFlockNamesRef,itemsData,uniqueRamNamesRef,theTeamName)=>{
    var keysDbRef = firebase.database().ref('users/').child(this.state.userId+'/ramData/').child('upcomingEvents').child(this.state.currentEvent)
    var gamesDataRef = firebase.database().ref('users/').child(this.state.userId+'/ramData/').child('events').child(this.state.currentEvent)
    var ramsBets = firebase.database().ref('userBets/'+this.state.currentEvent+'/')
   
    keysDbRef.child(this.props.theEventKey).set(true)
    gamesDataRef.child(this.props.theEventKey+'/details/').update(detailsData)
    gamesDataRef.child(this.props.theEventKey+'/bets/').update(itemsData)
    uniqueRamNamesRef.child(theTeamName).set(this.state.userId)
    uniqueFlockNamesRef.child(theFlockName).set(this.state.userId)
    ramsBets.child(this.props.theEventKey+'/').child(this.state.userId).update(itemsData,(error) => {
      if (error) {
        //console.log('AN ERROR OCCURED WHILE POSTING YOUR PICKS TO FIREBASE')
      } else {
        //console.log('Your picks have been submitted successfully') 
        this.notify('Your picks have been submitted successfully')
        Router.push('/reload')        
      }
    })
     localStorage.set('upcomingRamUfcDetails', 'true');
     this.setState({upcomingRamUfcDetails:true})
   }
   doNothing=(event)=>{
    event.preventDefault()
    event.stopPropagation()
   }
   selectedItems=(id,index,theBet,player1Points,player2Points)=>{
    //console.log('the idddddddd',id,index,theBet,player1Points,player2Points)
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

//console.log('theItems 1111111111',theItems)
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
                    <div className={styles.cont2b} onClick={()=>this.openFlockModal()}>
                    <MdOutlinePersonOutline   className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Enter your Flock Name' type='text' id='flockName' readOnly value={this.state.flockName2} onChange={(event)=>this.inputChange(event)}></input>  
                    <MdArrowDropDown className={styles.dropIcon} /></div>
                    {this.state.flockNameModal?<div className={styles.flockNameModal}>
                     {this.state.openNewFlockModal?this.state.ramFlockNames.map((item,index)=>{
                      return(
                        <p key={index} className={styles.flockNameList} onClick={()=>this.setState({flockName:item,flockName2:item,flockNameModal:false})}>{item}</p>
                      )
                     }):<div>
                      <p className={styles.noFlockP}>N/B You are not a member of any RAM flock/group at the moment. Flock names allow you to connect and play besides your family and friens as a group. Please fill in a Flock Name below and submit to continue.</p>
                      <input  className={styles.flockNameInput} placeholder='Enter your Flock Name' type='text' id='flockName' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input>  
                      <p className={styles.flockSubmitP} onClick={()=>this.submitFlockName()}>Submit</p>
                      </div>}
                    </div>:null}
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
          var details1=item.fighter1Name
          var details2=item.fighter2Name
          var tableArray=[details1+'#'+item.p1Points+'#'+item.bet,details2+'#'+item.p2Points+'#'+item.bet]
          var yourPick='N/A'
          var pickCol='#CB1E31'
          if(item.bet==='player1'){yourPick=item.fighter1Name,pickCol='#1ecb97'}
          if(item.bet==='player2'){yourPick=item.fighter2Name,pickCol='#1ecb97'}
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
                             // //console.log('the item',item)
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