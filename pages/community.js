import React, { Component } from 'react'
import styles from "@/styles/community.module.scss";
import firebase from '../components/FirebaseClient'
import { MdDeleteOutline,MdKeyboardDoubleArrowRight } from "react-icons/md";
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
    nflRegularEditsTime:[],thePicked:false
    
  }
  componentDidMount = () => {
    this.showProgressBar()
  }
    showProgressBar = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      2000)
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
            })}</div>
          {this.state.communitySelection==='News & Videos'?<News/>:null}
          {this.state.communitySelection==='Hall of Fame'?<HallOfFame/>:null}
          
        </div>
       {this.state.showProgressBar ? <ProgressBar /> : null}
      </>
    )
  }
}

export default leaderboard
