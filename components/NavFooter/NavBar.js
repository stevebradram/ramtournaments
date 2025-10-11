import React, { Component } from 'react';
import styles from './NavBar.module.scss'
import { MdFlight, MdCardTravel, MdFlightTakeoff, MdClose } from "react-icons/md";
import { FaSearch, FaHome, FaCarAlt, FaFacebook, FaInstagram, FaTwitterSquare, FaYoutubeSquare, FaBars } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import Router, { withRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localStorage from 'local-storage'
import { FaRegMessage } from "react-icons/fa6";
import LogIn from '../LogInReg/LogIn'
import Chats from '../Home/Chats'
import Messages from '../Home/Messages2'
import Friends from '../Home/Friends2'
import Link from 'next/link';
import ProgressBar from '../Helper/ProgressBar'
import firebase from '../FirebaseClient'
import CreateLeagueModal from './CreateLeagueModal'
import Countdown from 'react-countdown';
import { TypeAnimation } from 'react-type-animation';
class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryName: '',
      openAccDiv: false,
      openLogInModal: false,
      isLogged: false,
      progress: false,
      count:0,
      createLeagueModal:false,
      showEventCreator:true,
      theCount:0,
      isAdmin:false,
      countdownStart:1741960288732,
      countdownStop:1742487300000,
      theNotification:'',
      showChats:false,
      showMessages:false,
      showFriends:false,
      theData:'',from:'',count2:0
    }
  }
  onScroll = () => {
    const isTop = window.scrollY > 50;
    const nav = document.getElementById(styles.navDiv);
    if (isTop) {
      nav.classList.add(styles.shopScrolled);
    } else {
      nav.classList.remove(styles.shopScrolled);
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    this.checkAuth()
    
    console.log('the time 001',new Date().getTime())
    console.log('the time 0025999',new Date('2025-01-26T20:00:00Z').getTime())

    var linkInfo = window.location.href.split("/");
    linkInfo=linkInfo.pop()
    if(linkInfo.length>15){this.setState({showEventCreator:false})}
    console.log('linkInfo naaav',linkInfo)
    this.getData()
  }

  getData=()=>{
    var messageRef = firebase.database().ref('/notifications/message/')
    messageRef.once('value', dataSnapshot => {
    this.setState({theNotification:dataSnapshot.val()})
    console.log('theNotification',dataSnapshot.val())
    })
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    // window.removeAllListeners("scroll");
  }
  getUserInfo=(id)=>{
    var userInfoDb=firebase.database().ref('/users/'+id)
    userInfoDb.once('value',dataSnapshot=>{
      var theUserInfo=dataSnapshot.val()
      var flockName=theUserInfo.flockName
      var profilePhoto=theUserInfo.profilePhoto
      if(!flockName){localStorage.set('ramDetails', 'false')}
      else{localStorage.set('ramDetails', 'true')}
      if(profilePhoto){localStorage.set('profilePhoto', profilePhoto)}
      else{localStorage.set('profilePhoto', 'false')}
      console.log('flockName',flockName)
      var teamName=theUserInfo.teamName
      var fullName=theUserInfo.name
      var userDetails=flockName+'::::'+teamName+'::::'+fullName
      localStorage.set('userDetails', userDetails);
     console.log('dataSnapshot',theUserInfo)
    })
  }
  checkAuth = () => {
    var isLogged = localStorage.get('loggedIn');
    if (isLogged === 'true') { this.setState({ isLogged: true,openLogInModal:false }) }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId=user.uid
        var emailVerified=user.emailVerified
        this.getUserInfo(userId)
        console.log('the user info',user)
         this.setState({isAdmin:true})
        if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'||user.uid==='qXeqfrI5VNV7bPMkrzl0QsySmoi2'){
          this.setState({isAdmin:true})
         }
        this.setState({ isLogged: true,openLogInModal:false })
        localStorage.set('loggedIn', 'true');
        localStorage.set('userId', userId);
        if(emailVerified===true){localStorage.set('emailVerified', 'true');}
        else{localStorage.set('emailVerified', 'false');}
        var userRef = firebase.database().ref('/users/'+userId+'/userData/lastSeen')
        userRef.set(new Date().getTime())
      } else {
        this.setState({ isLogged: false })
        localStorage.set('loggedIn', 'false');
      }
    })
  }
  signOut = async () => {
    this.setState({progress:true})
    firebase.auth().signOut().then(()=>{
      console.log('Signed Out');
      localStorage.set('loggedIn', 'false');
      this.setState({progress:false})
      Router.push('/')
    }, function(error) {
      this.setState({progress:false})
      console.error('Sign Out Error', error);
    });}
  searchChange = (event) => {
    this.setState({
      queryName: event.target.value
    })
  }
  openTheAcDiv = async () => {
    await this.setState({
      openAccDiv: true
    })
  }
  closeTheAcDiv = async () => {
    await this.setState({
      openAccDiv: false
    })
  }
  stopShift = (event) => {
    //event.stopPropagation();
    // event.preventDefault()
  }
  scrollToDiv = async (id) => {
    //this.props.goToDiv(id)
    Router.push(id)
  }
  scrollToDiv2 = async (id) => {
    this.setState({ openAccDiv: false })
    Router.push(id)

  }
  goToDonShop = async (id) => {
    this.setState({ openAccDiv: false })
    Router.push(id)

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
  /* handleChildClick = () => {
    this.setState({openLogInModal:false})
    console.log('openLogInModal')
  };*/
  handleChildClick = (title) => {
    console.log('aziiiza')
    this.setState({ count: this.state.count + 1});
    if(title==='closeLogInModal'){
    this.setState({openLogInModal: false})
    }
    if(title==='closeLeagueModal'){
      this.setState({createLeagueModal:false})
    }
    
  };
    handleChatsClick = (from,text,theData) => {
      console.log('theMeso',from,text)
     // return
     this.setState({from})
       this.setState({ theCount: this.state.theCount + 1});
      if(from==='fromChats'){
        if(text==='close'){this.setState({ showMessages:false,showChats:false});}
        else if(text==='openFriends'){this.setState({ showMessages:false,showChats:false,showFriends:true});}
        else{this.setState({ showMessages:true,showChats:false});}
      }
       if(from==='fromFriends'){
        if(text==='close'){this.setState({ showMessages:false,showChats:true,showFriends:false});}
        else{this.setState({ showMessages:true,showChats:false,showFriends:false,theData});}
      }
      if(from==='fromMessages'){
        this.setState({ showMessages:false,showChats:true});
      }
   
    }
  theTypeAnimation = (text1, text2) => {
    return (
      <TypeAnimation
        sequence={[
          text1,
          2000,
          text2,
          2000
        ]}
        wrapper="span"
        speed={50}
        className={styles.picksP}
        repeat={Infinity}
      />
    )
  }
  render() {
    var theNotification=this.state.theNotification
    return (
      <>
        <div className={styles.navDiv} id={styles.navDiv}>
          <div className={styles.navDiv0}>
            <div className={styles.navDiv2}>
              {/*<img style={{cursor:'pointer'}}  src={"ram2.png"} onClick={()=>this.scrollToDiv('/')}></img>*/}
              <Link href="/" className={styles.logo001}>
                <img id={styles.triiMG} src={"ram8.png"} ></img>
                <img id={styles.logoImg} src={"ram1.png"} onClick={() => this.scrollToDiv('/')}></img>
                <div className={styles.logoDiv1}> </div>
                <div className={styles.logoDiv2}>
                  <p className={styles.ramP}>RAM</p>
                  <p className={styles.fantP}>Fantasy Tournaments</p>
                </div>

              </Link>
              {/*<div className={styles.logoCont0}><div className={styles.logoCont}>
                   <img style={{cursor:'pointer'}}  src={"ram1.png"} onClick={()=>this.scrollToDiv('/')}></img>
                   <div className={styles.logoDiv1}> </div>
                   <div className={styles.logoDiv2}>
                     <p className={styles.ramP}>RAM</p>
                     <p className={styles.fantP}>Fantasy Tournaments</p>
                     </div>
                   </div>
                   <img style={{cursor:'pointer'}} className={styles.triiMG}  src={"ram3.png"} onClick={()=>this.scrollToDiv('/')}></img>
                   </div>*/}
              {/*<Link href="/" style={{textDecoration:'none'}}><p className={styles.logoP}>HURU<span>TEC</span></p></Link>*/}
              {/*<img style={{cursor:'pointer'}}  src={"logo.png"} onClick={()=>this.scrollToDiv('/')}></img>*/}
              <div className={styles.navMain}>
                <div className={styles.navDiv3}>
                  {/*<Link href="/" className={styles.navMainLi}>HOME</Link>*/}
                  {/*<Link href="/about" className={styles.navMainLi}>ABOUT US</Link>*/}
                  <Link href="/events" className={styles.navMainLi}>EVENT SCORES</Link>
                  {/*<Link href="/"   className={styles.navMainLi}>HOW TO PLAY</Link>*/}
                  {/*<Link href="/leaderboard" className={styles.navMainLi}>LEADERBOARD</Link>*/}
                  <Link href="/community" passHref className={styles.navMainLi}>COMMUNITY</Link>
                </div>
              </div>
              <div className={styles.logDiv}>
               {this.state.isAdmin?<div className={styles.logDmesoDiv} onClick={()=>this.setState({ showMessages:false,showChats:true})}>
                <div className={styles.logDmesoDiv2}>
                  <p>1</p>
                 <AiFillMessage className={styles.mesoIc}/>
                </div></div> :null}
                {/*<Link href="/" className={styles.talkDiv}>LOG IN</Link>
                <Link href="/" className={styles.talkDiv1}>SIGN UP</Link>*/}
                {this.state.isLogged ? <button className={styles.logOutBtn} onClick={() =>this.signOut()}>LOG OUT</button> :
                  <button className={styles.talkDiv1} onClick={() => this.setState({ openLogInModal: !this.state.openLogInModal })}>LOG IN</button>}
              </div>

              {/*<Link href="/#CONTACTS" className={styles.talkDiv}>
                 <p>Lets Talk</p>
                 <FaRegMessage />
                </Link>*/}
            </div>
            {this.state.openAccDiv ? <MdClose className={styles.optionsIcon} size={40} onClick={() => this.closeTheAcDiv()} /> :
              <FaBars className={styles.optionsIcon} size={30} onClick={() => this.openTheAcDiv()} />}
          </div>
          {this.state.openAccDiv ? <div className={styles.optionsDiv}>
            <Link href="/" onClick={() => this.closeTheAcDiv()} className={styles.optionsDivLi}>HOME</Link>
            <Link href="/about" onClick={() => this.closeTheAcDiv()} className={styles.optionsDivLi}>ABOUT US</Link>
            <Link href="/events" onClick={() => this.closeTheAcDiv()} className={styles.optionsDivLi}>EVENT SCORES</Link>
            <Link href="/leaderboard" onClick={() => this.closeTheAcDiv()} className={styles.optionsDivLi}>LEADERBOARD</Link>
            <Link href="/community" onClick={() => this.closeTheAcDiv()} className={styles.optionsDivLi}>COMMUNITY</Link>
            {/*<Link href="/"onClick={()=>this.closeTheAcDiv()} className={styles.talkDiv2}>LOG IN</Link>
                <Link href="/"onClick={()=>this.closeTheAcDiv()} className={styles.talkDiv3}>SIGN UP</Link>*/}
            
            {this.state.isLogged ?<Link href="/"  onClick={() =>this.signOut()}  className={styles.logOutL}>LOG OUT</Link>:
            <Link href="/" onClick={() =>this.setState({ openLogInModal: !this.state.openLogInModal })} className={styles.talkDiv3}>LOG IN</Link>}
          
          </div> : null}
          <ToastContainer />
           {this.state.isLogged&&this.state.showEventCreator?<div className={styles.flockDiv} >
           <div className={styles.flockDiv1} >
            <p className={styles.flockDivP1} onClick={()=>this.setState({createLeagueModal:true})}>Create Flock & invite your friends</p>
            {/*<p className={styles.flockDivP2}>Invite Your Friends</p>*/} 
            </div>
            <div className={styles.flockDiv2}>
              {/*<p>UFC Summer Series…starting on May 10th for 3 events in May and June!</p>*/}
              {/*<TypeAnimation
      sequence={[
        'Events News:',
        1000,
        theNotification,
        1000,
        
      ]}
      wrapper="span"
      speed={50}
      className={styles.typeP}
      repeat={Infinity}
    />*/}
    {theNotification.length>1?this.theTypeAnimation('Events News:', theNotification):null}
            </div>
           </div>:null}
           
           {new Date().getTime()>this.state.countdownStart&&new Date().getTime()<this.state.countdownStop?<div className={styles.flockDiv} style={{backgroundColor:'#fff'}}><div className={styles.theCountDiv}><p>March Madness Countdown</p><Countdown date={this.state.countdownStop} className={styles.theCount} /></div></div>:null}
           
        </div>
        {this.state.openLogInModal ? <div className={styles.logInModal} onClick={() => this.setState({ openLogInModal: false })}>
          <LogIn onClick={()=>this.handleChildClick}/>
        </div> : null}
        {this.state.progress ? <ProgressBar message='Logging Out' /> : null}
        {this.state.isLogged&&this.state.createLeagueModal ? <div className={styles.createLeagueModal} onClick={e => e.currentTarget === e.target && this.setState({ createLeagueModal: false })} ><CreateLeagueModal onClick={this.handleChildClick}/></div> : null}
        {this.state.isLogged&&this.state.showChats?<div className={styles.chatModal} onClick={() => this.setState({ showChats: false })}><Chats onClick={this.handleChatsClick}/></div>:null}
        {this.state.isLogged&&this.state.showMessages?<div className={styles.chatModal} onClick={() => this.setState({ showMessages: false })}><Messages onClick={this.handleChatsClick} theData={this.state.theData} from={this.state.from}/></div>:null}
          {this.state.isLogged&&this.state.showFriends?<div className={styles.chatModal} onClick={() => this.setState({ showChats: false })}><Friends onClick={this.handleChatsClick}/></div>:null}
      </>
    )
  }
}
export default NavBar