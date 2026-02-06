import React, { Component } from 'react'
import styles from "@/styles/community.module.scss";
import firebase from '../components/FirebaseClient'
import { MdDeleteOutline,MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineAddBox,MdClose} from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
import News from '../components/Community/News'
import HallOfFame from '../components/Community/HallOfFame'
import CommMarchMadness from '../components/Community/CommMarchMadness'
import PastUpcomingEvents from '../components/Event/PastUpcomingEvents'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Router,{useRouter,withRouter} from 'next/router'
var theFlockArr = [{ name: 'Clement', score: 20 }, { name: 'Billygoat', score: 30 },
{ name: 'Elaine Kiiru', score: 40 }, { name: 'RAM Man', score: 50 }]
class leaderboard extends Component {
  constructor() {
    super();
    this.tableRef = React.createRef(null);
 }
  state = {
    openModal: false, openModal2: false, openModal4: false, theItems: [], isThereNullData: false, allGames: [], showProgressBar: false, isAdmin: false, endTime: '', communitySelection: 'News & Videos',creatorId:'',showNCAAB:false,count:0,showReel:false,
    dataAvailable: false, sportType: '', theEventKey: '', theEventTitle: '', userLoggedIn: false, nullData: [], theEvent: '', theTime: '', isTherNormalData: false, eventStartTime: '', currentSelection: '',currentSubSelection:'', menuToShow: 'Rams In Your Flock',
    currentFlockName: '', flockNameAvailable: false, eventStarted: true, ramsInMyFlockArr: [], theFlocksArr: [], theAdminFlocksArr: [],deleteModal:false,deleteName:'',userIdToBeDeleted:'',flockToBeDeleted:'',myFlockName:'',round1Arr:[],round2Arr:[],round3Arr:[],
    nflRegularEditsTime:[],thePicked:false,videoThumbnail:'',videoLink:'',videoTitle:'',videoModal:false,isAdmin:false
    
  }
  componentDidMount = () => {
    this.showProgressBar()
    this.checkAuth()
  }
    checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        console.log('userIddddddd',userId)
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
          this.setState({ isAdmin: true })
        }}
    })
  }
    showProgressBar = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      2000)
  }
    inputChange = async (e) => {
    var value = e.target.value
    this.setState({[e.target.id]:value})
  }
  uploadToDb= async () => {

  if(this.state.videoThumbnail!==''&&this.state.videoLink!==''&&this.state.videoTitle!==''){
    this.showProgressBar()
    this.notify('Uploading.....')
    var theThumbNail='https://img.youtube.com/vi/'+this.state.videoThumbnail+'/0.jpg' 
    var theVideoLink="https://youtu.be/"+this.state.videoLink
    var theDb = firebase.database().ref('/videos/')
    var theKey=theDb.push().key
    var theItem={id:theKey,thumbnail:theThumbNail,title:this.state.videoTitle,video:theVideoLink,time:new Date().getTime()}
    theDb.child(theKey).set(theItem, error => {
      if (!error) {
        this.setState({ videoModal: false })
        this.notify('Video send Succesfully')
        window.location.reload();
      }
    })

  }else{
    this.notify('All fields must be filled')
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
     doNothing=(event)=>{
    event.preventDefault()
    event.stopPropagation()
   }
  render() {
    return (
      <>
        <div className={styles.container}>
          <p className={styles.titleP}>Community</p>
          <div className={styles.headerCont}>
            {['News & Videos', 'Hall of Fame'].map((item, index) => {

              return (
                <div className={this.state.communitySelection === item ? styles.headerDiv : styles.headerDiv2} key={index} onClick={() => this.setState({ communitySelection: item })}>
                  <p>{item}</p>
                </div>
              )
            })}
            {this.state.isAdmin?<div className={styles.headerDiv2} onClick={()=>this.setState({videoModal:true})}>Add Video</div>:null}
            </div>
          {this.state.communitySelection==='News & Videos'?<News/>:null}
          {this.state.communitySelection==='Hall of Fame'?<HallOfFame/>:null}

          {this.state.videoModal?<div className={styles.modalCont} onClick={()=>this.setState({videoModal:false})}>
            <div className={styles.modalDiv} onClick={(event)=>this.doNothing(event)}>
              <MdClose className={styles.icClose} onClick={()=>this.setState({videoModal:false})}/>
            <p className={styles.vidTitleP}>Add Video</p> 
            <p className={styles.vidP}>Video Title</p>
             <input className={styles.eventInput} id='videoTitle' placeholder='Enter video title' value={this.state.videoTitle} onChange={(event) => this.inputChange(event)}></input>
            <p className={styles.vidP}>Video Link</p>
             <input className={styles.eventInput} id='videoLink' placeholder='Enter video Link' value={this.state.videoLink} onChange={(event) => this.inputChange(event)}></input>
            <p className={styles.vidP}>Video Thumnail</p>
             <input className={styles.eventInput} id='videoThumbnail' placeholder='Enter video thumbnail' value={this.state.videoThumbnail} onChange={(event) => this.inputChange(event)}></input>
            <p className={styles.submitP} onClick={()=>this.uploadToDb()}>Upload</p></div>
          </div>:null}
          </div>
       {this.state.showProgressBar ? <ProgressBar /> : null}
       <ToastContainer />
      </>
    )
  }
}

export default leaderboard
