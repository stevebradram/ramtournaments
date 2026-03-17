import React, { Component } from 'react';
import styles from "./Messages.module.scss";
import Image from 'next/image'
import postTime from '../Helper/postTime';
import lastSeen from '../Helper/lastSeen2';
import MessagesGames from './MessagesGames'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';
import PageVisibility from 'react-page-visibility';
import { io } from "socket.io-client"
var socket = io("https://theramtournament.com", {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5
});
var isFirstTime = false
var lastSeenTime = 1756721809290, theLastTime = ''
var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'

class Messages extends Component {
  constructor() {
    super();
    this.messagesEndRef = React.createRef(null);
  }
  state = {
    theMessage: '', incomingData: [], profilePhoto: '', userName: '', acronym: '', lastSeen: '', myUserId: '', isLogged: '', otheUserId: '', areMessagesAvailable: '', theMessageId: '', theMessagesArray: [], lastMesoId: '', theLastSeenChat: 0,
    hasInitializedFirebase: true, areThereMessages: false, isWindowInFocus: true, otherUserLastSeen: 'Offline', isFirstTime: '', myMesoId: '', otherUserMesoId: ''
  }
  componentDidMount = () => {
    this.scrollToBottom()
   // console.log('theData rrrrrrrrra', this.props.theData)
    var theData = this.props.theData
  //  console.log('theData 365214', this.props.from, theData)
    if (this.props.from === 'fromFriends' && theData !== 'N/A') {
      this.setState({ profilePhoto: theData['profilePhoto'], userName: theData['userName'], acronym: theData['acronym'], otheUserId: theData['uid'] })
    }
    if (this.props.from === 'fromChats' && theData !== 'N/A') {
      this.setState({ profilePhoto: theData['profilePhoto'], userName: theData['userName'], acronym: theData['acronym'], otheUserId: theData['uid'] })
    }
    this.setState({ theData: this.props.theData })
    this.checkAuth()
    socket.on('new_message', (payload, callback) => {
      console.group('new mesoooooooooooooo',payload)
      this.upadateLastSeenChat(this.state.otherUserMesoId, this.state.otheUserId)
      this.setState(prevState => ({
                theMessagesArray: [...prevState.theMessagesArray, payload.message],
                lastMesoId: payload.mesoId,
                areMessagesAvailable: true
            }));
      if (typeof callback === 'function') {
        callback({ status: 'received' });
      }
    });
    socket.on('message_status_update', (data) => {
      this.setState({ theLastSeenChat: new Date().getTime() })
      this.upadateLastSeenChat(this.state.theMessageId, this.state.myUserId)
    });
    socket.on('user_presence_update', (data) => {
      if (data.userId === this.state.otheUserId) {
        toast.info("The other user just joined the chat!", {
          position: "top-center",
          autoClose: 3000
        });
        if (data.status === 'offline') {
          this.setState({ otherUserLastSeen: new Date().getTime() })
        } else if (data.status === 'viewing_chat') {
          this.setState({ otherUserLastSeen: 'Online' })
          this.setState({ theLastSeenChat: new Date().getTime() })
          var myUidKey = this.state.myUserId.slice(-10);
          var otherUidKey = this.state.otheUserId.slice(-10);
          var mesoId = myUidKey + otherUidKey
          var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.myUserId + '/' + mesoId +'/')
          chatRef.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) { chatRef.child('lastChatSeen').set(new Date().getTime()) }
          })
        }
      }
    });
  }
  handleUnload = (e) => {
    if (socket) {
      socket.disconnect();
    }
  }
  listentoWindow = isVisible => {
    this.setState({ isWindowInFocus: isVisible });
  }
  theInterval = () => {
    setInterval(() => {
      this.setState({ count2: this.state.count2 + 1 });
    }, 1000);
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  checkOnlinePresence = (otherUserId) => {
    var onlineRef = firebase.database().ref('/online/' + otherUserId + '/online/');
    onlineRef.once('value', dataSnapshot => { this.setState({ otherUserLastSeen: dataSnapshot.val() }) })
  }
  onlinePresence = (myUserId, value) => {
    var userRef = firebase.database().ref('/online/' + myUserId + '/online/');
    userRef.set(value)
  }
  componentWillUnmount() {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.myUserId + '/' + this.state.theMessageId + '/time')
    chatRef.off('value');
    this.onlinePresence(this.state.myUserId, new Date().getTime())
    if (socket) socket.disconnect();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid
        this.setState({ myUserId: userId, isLogged: true })
        this.checkMessages(userId)
        this.onlinePresence(userId, 'Online')
        this.checkOnlinePresence(this.state.otheUserId)
        if (socket.connected) {
          socket.emit('identify', userId);
          socket.emit('opened_chat', { myUserId: userId, otherUserId: this.state.otheUserId });
        } else {
          socket.connect();
          socket.once('connect', () => {
            socket.emit('identify', userId);
            socket.emit('opened_chat', { myUserId: userId, otherUserId: this.state.otheUserId });
          });
        }
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
  checkMessages = (myUid) => {
    var myUidKey = myUid.slice(-10);
    var otherUidKey = this.state.otheUserId.slice(-10);
    var mesoId1 = myUidKey + otherUidKey
    var mesoId2 = otherUidKey + myUidKey
    this.setState({ myMesoId: mesoId1, otherUserMesoId: mesoId2 })
    var messageRef1 = firebase.database().ref('/messaging/messages/' + myUid + '/' + mesoId1)
    var theMessages = []
    messageRef1.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theNo = dataSnapshot.numChildren(), i = 0
        this.setState({ theMessageId: mesoId1 })
        this.checkLastSeenChat(mesoId1, myUid)
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          theData['id'] = data.key
          theMessages.push(theData)
          if (theNo === i) {
            let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
            this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId: objMax['id'] }, () => {
              this.upadateLastSeenChat(mesoId2, this.state.otheUserId)
            })
          }
        })
      }
    })
  }
  upadateLastSeenChat = (messageId, otherUserId) => {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + otherUserId + '/' + messageId + '/lastChatSeen/')
    chatRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) { chatRef.set(new Date().getTime()) }
    })
  }
  checkOnline = (userId) => {
    var amOnline = firebase.database().ref(".info/connected")
    var userRef = firebase.database().ref('/online/' + userId + '/online/');
    amOnline.on('value', snapshot => {
      if (snapshot.val()) {
        userRef.onDisconnect().remove();
        userRef.set(true);
      }
    });
  }
  checkLastSeenChat = (messageId, myUid) => {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + myUid + '/' + messageId + '/lastChatSeen/')
    chatRef.once('value', dataSnapshot => {
      this.setState({ theLastSeenChat: dataSnapshot.val() })
    })
  }
  updateMessages = () => {
    var messageRef = firebase.database().ref('/messaging/messages/' + this.state.myUserId + '/' + this.state.theMessageId).orderByKey().startAfter(this.state.lastMesoId);
    var theMessages = [...this.state.theMessagesArray], updateMessages = []
    messageRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theNo = dataSnapshot.numChildren(), i = 0
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          theData['id'] = data.key
          theMessages.push(theData)
          updateMessages.push(theData)
          if (theNo === i) {
            let objMax = updateMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
            this.upadateLastSeenChat(this.state.theMessageId, this.state.otheUserId)
            this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId: objMax['id'] })
          }
        })
      }
    })
  }
  realTimeUpdate = async (messageId) => {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.myUserId + '/' + messageId + '/time')
    if (messageId === null || messageId.length < 4) return
    if (this.state.hasInitializedFirebase === false) return
    await chatRef.on('value', snapshot => {
      this.updateMessages()
      this.hasInitializedFirebase()
    })
  }
  realTimeLastChatUpdate = async (messageId) => {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.otheUserId + '/' + messageId)
    if (messageId === null || messageId.length < 4) return
    await chatRef.on('value', snapshot => {
      this.updateMessages()
    })
  }
  hasInitializedFirebase = () => {
    this.setState({ hasInitializedFirebase: false })
    this.timerHandle = setTimeout(() => this.setState({ hasInitializedFirebase: true }), 1000)
  }
  sendMessage = () => {
    var messageRef = firebase.database().ref('/messaging/messages/')
    var chatRef = firebase.database().ref('/messaging/lastChats/')
    var theKey = chatRef.push().key
    var myUidKey = this.state.myUserId.slice(-10);
    var otherUidKey = this.state.otheUserId.slice(-10);
    var theMessagesArray = this.state.theMessagesArray
    var mesoId = myUidKey + otherUidKey
    var otherUserMesoId = otherUidKey + myUidKey
    if (this.state.theMessage.length >= 1 && mesoId !== '') {
      var theMessage = { message: this.state.theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.otheUserId }
      var myChat = { message: this.state.theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.otheUserId }
      var otherUserChat = { message: this.state.theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.myUserId }
      if (this.state.areThereMessages === false) { myChat['1stSenderId'] = this.state.myUserId }
      messageRef.child(this.state.myUserId).child(mesoId).child(theKey).set(theMessage)
      messageRef.child(this.state.otheUserId).child(otherUserMesoId).child(theKey).set(theMessage)
      chatRef.child(this.state.myUserId).child(mesoId).update(myChat)
      chatRef.child(this.state.otheUserId).child(otherUserMesoId).update(otherUserChat, (error) => {
        if (error) { this.notify('Error sending message') }
        else {
          theMessage['id'] = mesoId
          socket.emit('send_private_message', { from: 'sendMessage', recipientId: this.state.otheUserId, senderId: this.state.myUserId, message: theMessage, mesoId: mesoId });
          theMessagesArray.push(theMessage)
          this.setState({ theMessagesArray, lastMesoId: mesoId, areMessagesAvailable: true })
          this.notify('Message send successfully'); this.setState({ theMessage: '' }); this.setState({ theMessageId: mesoId })
        }
      })
    } else {
      this.notify('You can not send an empty message')
    }
  }
  inputChange = async (e) => {
    var value = e.target.value
    await this.setState({ [e.target.id]: value })
  }
  notify = (message) => {
    toast.warn(message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
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
                } else { showTime = false }
                var isItSeen = ''
                if (this.state.theLastSeenChat >= item.time) { isItSeen = true } else { isItSeen = false }
                return (
                  <div key={index}>
                    {showTime ? <div className={styles.postTimeDiv}><p className={styles.postP}>{postDate}</p></div> : null}
                    {item.senderID !== this.state.myUserId ? <div className={styles.chatItenDiv}><div className={styles.imgDiv}>
                      <Image className={styles.theImg} src={theImg} alt={'RAM User'} height={30} width={30} objectFit='fit' />
                    </div>
                      <div className={styles.theMessageDiv}>
                        {item.status === 'picks' ? <MessagesGames status='otherUser' myPicks={item.thePicks} pickDetails={item.pickDetails} /> : null}
                        <p className={styles.mesoP}>{item.message}</p>
                        <div className={styles.timeDiv1}>
                          <p className={styles.timeP}>{theMessageTime}</p>
                        </div>
                      </div></div> :
                      <div className={styles.chatItenDiv1}>
                        <div className={styles.chatItenDiv2}>
                          <div className={styles.theMessageDiv2}>
                            {item.status === 'picks' ? <MessagesGames status='me' myPicks={item.thePicks} pickDetails={item.pickDetails} /> : null}
                            <p className={styles.mesoP} style={{ marginRight: item.message.length <= 3 ? 30 : null }}>{item.message}</p>
                            <div className={styles.timeDiv2}>
                              <p className={styles.timeP2}>{theMessageTime}</p>
                              <IoCheckmarkDoneSharp color={isItSeen ? '#df5959ff' : null} />
                            </div>
                          </div>
                          <div className={styles.imgDiv2}>
                            <Image className={styles.theImg} src={theImg} alt={'RAM User'} height={30} width={30} objectFit='fit' />
                          </div>
                        </div></div>}
                  </div>)
              })}
                <div ref={this.messagesEndRef}></div></> :
                <div className={styles.noDataDiv}>
                  <p>Your messages will appear here</p>
                </div>}
            </div>
            <div className={styles.headerDiv}>
              <HiArrowNarrowLeft className={styles.backIc} onClick={() => this.closeMessenger()} />
              <div className={styles.userImgDiv}>
                {this.state.profilePhoto !== 'N/A' ? <Image className={styles.theUserImg} src={this.state.profilePhoto} alt={'RAM User'} height={40} width={40} objectFit='fit' /> :
                  <p className={styles.acroP}>{this.state.acronym}</p>}
              </div>
              <div>
                <p className={styles.userNameP}>{this.state.userName}</p>
                <p className={styles.lastSeenP} style={{ color: this.state.otherUserLastSeen === 'Online' ? '#3abba5ff' : null }}>{this.state.otherUserLastSeen === 'Online' || this.state.otherUserLastSeen === 'Offline' ? this.state.otherUserLastSeen === 'Online' ? 'Online' : 'Offline' : 'Last Seen ' + lastSeen(this.state.otherUserLastSeen)}</p>
              </div>
            </div>
            <div className={styles.editDiv}>
              <textarea className={styles.mesoInput} id='theMessage' placeholder='Write your message here' value={this.state.theMessage} multiple onChange={(event) => this.inputChange(event)} />
              <IoMdArrowDroprightCircle className={styles.sendIc} onClick={() => this.sendMessage()} style={{ color: this.state.theMessage.length >= 3 ? null : '#d3d3d3ff' }} />
            </div>
          </div></div>
          <ToastContainer /></>
      </PageVisibility>
    );
  }
}
export default Messages;