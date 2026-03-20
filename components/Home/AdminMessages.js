import React, { Component } from 'react';
import styles from "./AdminMessages.module.scss";
import Image from 'next/image'
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';
import PageVisibility from 'react-page-visibility';
var theLastTime = ''
class Messages extends Component {
  constructor() {
    super();
    this.messagesEndRef = React.createRef(null);
  }
  state = {
    thetitle:'', message: '', incomingData: [], profilePhoto: '', userName: '', acronym: '', lastSeen: '', myUserId: '', isLogged: '', otheUserId: '', areMessagesAvailable:false, theMessageId: '', theMessagesArray: [], lastMesoId: '', theLastSeenChat: 0,
    hasInitializedFirebase: true, areThereMessages: false,isWindowInFocus: true,isAdmin:false
  }

  componentDidMount = () => {
    this.scrollToBottom()
    this.checkAuth()
  }
  componentDidUpdate() {
    this.scrollToBottom()
   
  }
  componentWillUnmount() {
    var chatRef = firebase.database().ref('/messaging/adminChats/')
    chatRef.off('value');
  }

  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid,isAdmin=false
         if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1') {
          isAdmin=true;this.setState({ isAdmin: true })
        }
        this.setState({ myUserId: userId, isLogged: true })
        this.checkMessages(isAdmin)
      } else {
        this.setState({ isLogged: false })
      }
    })
  }
  closeMessenger = () => {
     this.props.onClick('fromMessages', 'chatId', 'N/A')
  }
  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
  checkMessages = (isAdmin) => {
    var messageRef = firebase.database().ref('/messaging/adminMessages/')
    var theMessages = []
    messageRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theNo = dataSnapshot.numChildren(), i = 0
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          var uid = data.val().adminId
           var userRef = firebase.database().ref('/users/'+uid+'/userData/name/')
          if(isAdmin){userRef.once('value', dataSnapshot => {
            var name=dataSnapshot.val()
            theData['name']=name
            theMessages.push(theData)
            if (theNo === i) {
            let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
            var lastMesoId=objMax['id']
            //console.log('theMessages1',theMessages)
            this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId:lastMesoId }, () => {
            this.upadateLastSeenChat()
            })
          }
           })}else{
if (theNo === i) {
            let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
            var lastMesoId=objMax['id']
            //console.log('theMessages1',theMessages)
            this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId:lastMesoId }, () => {
            this.upadateLastSeenChat()})}
           } 
        })
      } else {
            this.setState({ areMessagesAvailable: false })
          }
    })
  }
  upadateLastSeenChat = () => {
    var chatRef = firebase.database().ref('/messaging/adminChatLastSeen/'+this.state.myUserId+ '/')
    chatRef.set(new Date().getTime())
  }

  sendMessage = () => {
    var messageRef = firebase.database().ref('/messaging/adminMessages/')
    var chatRef = firebase.database().ref('/messaging/adminChats/')
    var theKey = chatRef.push().key
    var theMessagesArray = this.state.theMessagesArray
    if (this.state.message.length >= 1 && this.state.message.includes('###')) {
        var theMessage=this.state.message.split('###')
        var title=theMessage[0]
        var message=theMessage[1]
      //var theMessage = { title:title, message:message, time: new Date().getTime()}
      var theMessage={id:theKey, time:new Date().getTime(), title:title, message:message,  howManyReaders:0,adminId:this.state.myUserId}
      messageRef.child(theKey).set(theMessage)
      chatRef.set(theMessage, (error) => {
        if (error) { this.notify('Error sending message') }
        else { 
            theMessagesArray.push(theMessage)
            this.notify('Message send successfully'); 
            this.setState({message:''}); this.setState({lastMesoId:theKey,theMessagesArray,areMessagesAvailable: true})}
      })
    } else {
      this.notify('You can not send an empty message')
    }
  }
  inputChange = async (e) => {
    var value = e.target.value
    //console.log('theId', e.target.id)
    await this.setState({ [e.target.id]: value })
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
  render() {
    return (
     <PageVisibility onChange={this.listentoWindow}>
        <><div className={styles.container} onClick={(event) => this.doNothing(event)}>
          <div className={styles.container2}>
            <div className={styles.chatsCont}>
              {this.state.areMessagesAvailable ? <>{this.state.theMessagesArray.map((item, index) => {
                var postDate = '', showTime = false, theMessageTime = ''
                var theTime = dayjs(item.time).format('MMMM DD YYYY')
                var todayTime = dayjs(new Date())
                var daysDiff = todayTime.diff(theTime, 'day')
                var hourDiff = todayTime.diff(theTime, 'hour')
                var minDiff = todayTime.diff(theTime, 'minute')
                if (hourDiff < 1) {
                  if (minDiff <= 1) { theMessageTime = 'Just Now' }
                  else if (minDiff > 1) { theMessageTime = minDiff + ' Min' }
                } else { theMessageTime = dayjs(item.time).format('HH:mm') }
                if (theLastTime !== theTime) {
                  theLastTime = theTime
                  if (daysDiff === 0) { postDate = 'Today' }
                  if (daysDiff === 1) { postDate = 'Yesterday' }
                  if (daysDiff > 1 && daysDiff < 7) { postDate = dayjs(item.time).format('dddd') }
                  if (daysDiff >= 7) { postDate = dayjs(item.time).format('DD MMM YYYY') }
                  showTime = true
                } else {
                  showTime = false
                }
                var isItSeen = ''
                if (this.state.theLastSeenChat >= item.time) { isItSeen = true } else { isItSeen = false }
                return (
                  <div key={index}>
                    {showTime ? <div className={styles.postTimeDiv}><p className={styles.postP}>{postDate}</p></div> : null}
                   <div className={styles.chatItenDiv}><div className={styles.imgDiv}>
                      <Image className={styles.theImg} src={'/icon3.png'} alt={'RAM User'} height={30} width={30} objectFit='fit' />
                    </div>
                      <div className={styles.theMessageDiv}>
                        {/*<div className={styles.verifiedataitle}><p className={styles.userNameP} style={{marginRight:5}}>RAM</p><RiVerifiedBadgeFill  color={'#428adb'}/></div>*/}
                        <p className={styles.titleP}>{item.title}</p>
                        <p className={styles.mesoP}>{item.message}</p>
                        {this.state.isAdmin?<div className={styles.timeDiv3}>
                            <p className={styles.adminP}>Admin: {item.name}</p>
                          <p className={styles.timeP}>{theMessageTime}</p>
                        </div>:<div className={styles.timeDiv1}>
                          <p className={styles.timeP}>{theMessageTime}</p>
                        </div>}
                      </div></div> 
                  </div>)
              })}
                <div ref={this.messagesEndRef}></div></> :
                <div className={styles.noDataDiv}>
                  <p>Admin messages will appear here</p>
                </div>}
            </div>
            <div className={styles.headerDiv}>
              <HiArrowNarrowLeft className={styles.backIc} onClick={() => this.closeMessenger()} />
              <div className={styles.userImgDiv}>
                <Image className={styles.theUserImg} src={'/icon3.png'} alt={'RAM'} height={40} width={40} objectFit='fit' /> 
              </div>
              <div>
                <div className={styles.verifiedDiv}><p className={styles.userNameP} style={{marginRight:5}}>RAM</p><RiVerifiedBadgeFill color={'#428adb'}/></div>
                <p className={styles.lastSeenP}>Official RAM Account </p>

              </div>
            </div>
            {this.state.isAdmin?<div className={styles.editDiv}>
              <textarea className={styles.mesoInput} id='message' placeholder='Write your message here' value={this.state.message} multiple onChange={(event) => this.inputChange(event)} />
              <IoMdArrowDroprightCircle className={styles.sendIc} onClick={() => this.sendMessage()} style={{ color: this.state.message.length >= 3 ? null : '#d3d3d3ff' }} />
            </div>:null}
          </div></div>
        <ToastContainer /></>
      </PageVisibility>
    );
  }
}

export default Messages;