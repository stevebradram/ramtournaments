import React, { Component } from 'react'
import styles from './DetailsModalCopy.module.scss'
import { MdLockOutline ,MdArrowDropDown ,MdInfoOutline,MdOutlineAddBox,MdOutlinePersonOutline  } from "react-icons/md";
import firebase from '../FirebaseClient'
import localStorage from 'local-storage'
import Router from 'next/router';
import { IoPersonSharp } from "react-icons/io5";
import { FcManager } from "react-icons/fc";
import { RiEdit2Fill } from "react-icons/ri";
import Resizer  from "react-image-file-resizer";
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../Helper/ProgressBar'
import { IoPersonOutline } from "react-icons/io5";
var theDetails=''
class DetailsModal extends Component {
  state={teamName:'',flockName:'',teamNameErr:'',flockNameErr:'',ramDetails:true,userId:'',theDetails:'',profilePhoto:'',profilePhoto2:'',currentEvent:'',
    compressedUri:'',buttonClick:true,showProgressBar:false,flockNameModal:false,ramFlockNames:[]}
  componentDidMount=()=>{
    theDetails=this.props.theDetails.split('::')
    this.setState({teamName:theDetails[0],flockName:theDetails[1],profilePhoto:theDetails[2],currentEvent:theDetails[3],ramFlockNames:[]})
    this.checkAuth()
    /*var ramDetails = localStorage.get('ramDetails');
    var userId = localStorage.get('userId');
    console.log('the props',this.props.theDetails)
    console.log('userId 55555555555',userId,ramDetails)
    if (ramDetails === 'true') { this.setState({ramDetails:true,userId:userId})}
    else{this.setState({ramDetails:false})}*/
    
  }
  inputChange = async (e) => {
    var value = e.target.value
    console.log('theId', e.target.id)
    value=value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s\s+/g, ' ');
    await this.setState({[e.target.id]: value})
      if (e.target.id ==='teamName'){
        if (this.state.teamName.length>=3){this.setState({teamNameErr:''})}
      }
      if (e.target.id ==='flockName'){
        console.log('hapa tu',e.target.id)
        if (this.state.flockName.length>=3){this.setState({flockNameErr:''})}
      }
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       var userId=user.uid
       this.setState({userId})
       this.getFlockNames(userId)
     } else {
       localStorage.set('loggedIn', 'false');
     }
   })
 }
 getFlockNames=(userId)=>{
  var flocks=[],i=0
  var myFlockNamesRef=firebase.database().ref('/users/').child(userId+'/userData/').child('flockNames')
  myFlockNamesRef.once('value',dataSnapshot=>{
    var flockCount=dataSnapshot.numChildren()
    if(!dataSnapshot.val()){
      console.log('hakuna kitu mzeeee')
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
  submitDetails=()=>{
    this.showProgressBar(3000)
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
    if (!this.state.buttonClick) return
    this.buttonClickStat(2000)
    if(!this.state.userId)return
    console.log('looooooooobo')
    //return
    //kufika set unqueeeeeeeeee
    //var gameRef = firebase.database().ref('users').child(this.state.userId).child('upcomingEvents').child(this.state.currentEvent)
    var uniqueRamNamesRef = firebase.database().ref('/theNames/ramNames/').child(this.state.currentEvent+'/'+this.props.theEventKey+'/'+this.props.eventType)
    var uniqueFlockNamesRef = firebase.database().ref('/theNames/flockNames/').child(this.state.currentEvent+'/'+this.props.theEventKey+'/'+this.props.eventType)
    
    var gamesDataRef = firebase.database().ref('users/'+this.state.userId+'/ramData/events/'+this.state.currentEvent+'/'+this.props.theEventKey+'/details/'+this.props.eventType+'/')
    
    if (this.state.teamName.length<3){this.setState({teamNameErr:'Team Name must be 3 characters and above'});return}
    if (this.state.flockName<3){this.setState({flockNameErr:'Flock Name must be 3 characters and above'});return}
    if(this.state.teamName===theDetails[0]&&this.state.flockName===theDetails[1]){
    if(this.state.profilePhoto!==theDetails[2]){
        console.log('UPLOADING PHOTO')
        this.savePhoto()
      }else{  
      console.log('the verdict Nothing has changed')
      Router.push('/reload')
    }
     }

      if(this.state.teamName!==theDetails[0]||this.state.flockName!==theDetails[1]){
      var theTeamName=this.state.teamName.replace(/ /g,"_")
      var theFlockName=this.state.flockName.replace(/ /g,"_")
      var theOldTeamName=theDetails[0].replace(/ /g,"_")
        console.log('the verdict something has changed')
        uniqueRamNamesRef.child(theTeamName).once('value',dataSnapshot=>{
          console.log('is thereee db',dataSnapshot)
          var theInfo=dataSnapshot.val()
          console.log('is thereee',theInfo)
          if(!theInfo){
            uniqueRamNamesRef.child(theTeamName).set(this.state.userId)
            uniqueFlockNamesRef.child(theFlockName).set(this.state.userId)
            gamesDataRef.child('flockName').set(this.state.flockName)
            gamesDataRef.child('teamName').set(this.state.teamName,(error) => {
              if (error) {
                console.log('AN ERROR OCCURED WHILE POSTING UFC RESULTS TO FIREBASE',)
              } else {
                console.log('POSTING UFC RESULTS TO FIREBASE WAS SUCCESSFUL') 
                uniqueRamNamesRef.child(theOldTeamName).set(null);
                if(this.state.profilePhoto!==theDetails[2]){
                  console.log('UPLOADING PHOTO')
                  this.savePhoto()
                }else{
                  Router.push('/reload')
                }        
              }
            })
          }else{
            if(theInfo===this.state.userId){

            }
            this.notify('RAM Name already taken')
            this.setState({teamNameErr:'RAM Name already taken, please try another one'})
            console.log('change that shit')
          }

       })
      }
   }
   doNothing=(event)=>{
    //event.preventDefault()
    //event.stopPropagation()
   }
    handleFileChange = (event) => {
    //setFile(event.target.files[0]); // Set the selected file
  };
  pickPhoto =async(event) =>{
    console.log('hapa kwa pic photoooooooooooo')
    var theFile=event.target.files[0]
    var phoroURL=URL.createObjectURL(event.target.files[0])
    console.log('phoroURL',phoroURL)
    this.setState({profilePhoto:phoroURL})
   // this.setState({shopPhoto:phoroURL})
     Resizer.imageFileResizer(
      theFile, // the file from input
      300, // width
      300, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      85, // quality
      0, // rotation
     //'blob',
      (uri) => {this.setState({compressedUri:uri})},
      "blob"
      )
}
savePhoto =async() =>{
  var gameRef = firebase.database().ref('/users/'+this.state.userId+'/userData/')
        const uploadTask =  firebase.storage().ref('profileImages/'+this.state.userId+'/profile').put(this.state.compressedUri);
        firebase.auth().onAuthStateChanged((user) => {
          if(user){
        uploadTask.on(
            "state_changed",
        snapshot=>{},
            error=>{
                console.log(error);
            },
            ()=>{
               firebase.storage()
                .ref('profileImages/'+user.uid)
                .child('profile')
                .getDownloadURL()
                .then(url=>{
                  gameRef.child('profilePhoto').set(url,(error) => {
                    if (error) {
                      console.log('AN ERROR OCCURED WHILE POSTING UFC RESULTS TO FIREBASE',)
                    } else {
                      console.log('the photo url',url)
                      this.setState({profilePhoto:url,compressedUri:''})
                      this.notify('UPLOAD SUCCESS')
                      Router.push('/reload')
                    }})
                
                  //Router.push('/reload')
                })
            }
        )
      }})
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
};
buttonClickStat=(time)=>{
  this.setState({buttonClick:false})
  this.timerHandle = setTimeout(
    () => this.setState({buttonClick:true}), 
    time)
}
showProgressBar = (time) => {
  this.setState({ showProgressBar: true})
  this.timerHandle = setTimeout(
    () => this.setState({ showProgressBar: false }),
    time)
}
openFlockModal=()=>{
  if (navigator.onLine === false) {
    this.notify('No internet! please check your internet connection')
    return
  }
  this.setState({flockNameModal:!this.state.flockNameModal})
}
  render() {
    return (
      <>
      <div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
                    <h1>Enter RAM Details</h1>
                    <div className={styles.imageDiv}>
          {this.state.profilePhoto.length?<img src={this.state.profilePhoto}/>:
          <FcManager  className={styles.personIC}/>}
          <input id="input" style={{display:'none'}} type="file" accept="image/*" onChange={(event)=>this.pickPhoto(event)}/>
          <div className={styles.addDiv}>
          <label htmlFor='input'  className={styles.imgDiv2}>
          <MdOutlineAddBox className={styles.addIC} /></label>
            {/*<MdOutlineAddBox className={styles.addIC}/>*/}
            </div>
          </div>
                    <div className={styles.nameCont}>
                    <p className={styles.P1}>RAM Name</p>
                    <MdInfoOutline className={styles.nameIC}/>
                    </div>
                    <div className={styles.cont1}>
                    <MdOutlinePersonOutline    className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Enter your RAM name' type='text' id='teamName' value={this.state.teamName} style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.teamNameErr}</p>
                    <div className={styles.nameCont}>
                    <p className={styles.P1}>Flock Name</p>
                    <MdInfoOutline className={styles.nameIC}/>
                    </div>
                    <div className={styles.cont2} onClick={()=>this.openFlockModal()}>
                    <MdOutlinePersonOutline    className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Enter your Flock Name' readOnly type='text' id='flockName' value={this.state.flockName} style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input>  
                    <MdArrowDropDown className={styles.dropIcon}/>
                    {this.state.flockNameModal?<div className={styles.flockNameModal}>
                     {this.state.ramFlockNames.length>0?this.state.ramFlockNames.map((item,index)=>{
                      return(
                        <p key={index} className={styles.flockNameList} onClick={()=>this.setState({flockName:item,flockNameModal:false})}>{item}</p>
                      )
                     }):null}
                    </div>:null}
                    </div>
                    <p className={styles.pErr}>{this.state.flockNameErr}</p>
                    <button className={styles.logInBtn} onClick={()=>this.state.buttonClick?this.submitDetails():null}>SUBMIT</button>
                </div>
                {this.state.showProgressBar ? <ProgressBar /> : null}
                <ToastContainer/>
                </>
    )
  }
}

export default DetailsModal