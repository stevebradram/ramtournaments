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
import { io}  from "socket.io-client"
var socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket", "polling"] // Forces websocket first to avoid some polling CORS issues
});
var isFirstTime=false
//import io from "socket.io-client"
var lastSeenTime = 1756721809290, theLastTime = ''
var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'
const mainCard=[
  {id:1,matchNo:1,time:'Nov 3 2024, 03:00PM',player1:'Brandon Moreno-Mexico',p1Rec:'21-8-2',p1Points:'1.42',player2:'Amir Albazi-Iraq',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',bestPossibleScore:'', status2:'',bet:'',winner:'player1',match:'Mens Flyweight'},
  {id:2,matchNo:2,time:'Nov 3 2024, 03:00PM',player1:'Erin Blanchfield-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Rose Namajunas-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player3.png',p2Photo:'player4.png',status1:'ongoing',bestPossibleScore:'',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
  {id:3,matchNo:3,time:'Nov 3 2024, 03:00PM',player1:'Derrick Lewis-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Jhonata Diniz-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player5.png',p2Photo:'player6.png',status1:'played',bestPossibleScore:'',status2:'',bet:'',winner:'player1',match:'Mens Heavyweight'},
  {id:4,matchNo:4,time:'Nov 3 2024, 03:00PM',player1:'Caio Machado-Brazil',p1Rec:'21-8-2',p1Points:'1.42',player2:'Brendson Ribeiro-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player7.png',p2Photo:'player8.png',status1:'played',bestPossibleScore:'',status2:'',bet:'player2',winner:'player2',match:'Mens Light Heavyweight'},
  {id:5,matchNo:5,time:'Nov 3 2024, 03:00PM',player1:'Marc Andre Barriault-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Dustin Stoltzfus-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player9.png',p2Photo:'player10.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Middleweight'},
  {id:6,matchNo:6,time:'Nov 3 2024, 03:00PM',player1:'Mike Malott-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Trevin Giles-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player11.png',p2Photo:'player12.png',status1:'played',status2:'',bestPossibleScore:'',bet:'player1',winner:'player2',match:'Mens Welterweight'},
  ]
class Messages extends Component {
  constructor() {
    super();
    this.messagesEndRef = React.createRef(null);
  }
  state = {
    theMessage: '', incomingData: [], profilePhoto: '', userName: '', acronym: '', lastSeen: '', myUserId: '', isLogged: '', otheUserId: '', areMessagesAvailable: '', theMessageId: '', theMessagesArray: [], lastMesoId: '', theLastSeenChat: 0,
    hasInitializedFirebase: true, areThereMessages: false,isWindowInFocus: true,otherUserLastSeen:'Offline',isFirstTime:'',myMesoId:'',otherUserMesoId:''
  }

  componentDidMount = () => {
   
   /* socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket", "polling"] // Forces websocket first to avoid some polling CORS issues
});*/
    this.scrollToBottom()
    
    //console.log('theData',this.props.theData)
    var theData = this.props.theData
    console.log('theData 365214',this.props.from,theData)
    if (this.props.from === 'fromFriends' && theData !== 'N/A') {
      console.log('ddddddddd')
      this.setState({ profilePhoto: theData['profilePhoto'], userName: theData['userName'], acronym: theData['acronym'], lastSeen: theData['lastSeen'], otheUserId: theData['uid'] })
    }
    
    //this.props.theData['profilePhoto']
    this.setState({ theData: this.props.theData })
    this.checkAuth()
    /* const { isWindowInFocus } = this.props;
      if (!isWindowInFocus) {
        console.log('page visible 1111',isWindowInFocus)
      }*/
      socket.on('new_message', (payload,callback) => {
      console.log("New message received 004:", payload,'message',payload.message);
      console.log('Details message:',payload.message);
       this.upadateLastSeenChat(this.state.otherUserMesoId, this.state.otheUserId)
       var {theMessagesArray}=this.state
        theMessagesArray.push(payload.message)
         this.setState({theMessagesArray, lastMesoId:payload.mesoId,areMessagesAvailable:true})
    console.log('theMessagesArray 001',this.state.theMessagesArray)
    if (typeof callback === 'function') {
    callback({ status: 'received' }); 
  }
   
    });
    socket.on('message_status_update', (data) => {
  console.log("Status update for message:", data.mesoId, "is now:", data.status);
   this.setState({theLastSeenChat:new Date().getTime()})
   this.upadateLastSeenChat(this.state.theMessageId, this.state.myUserId)
  //  this.checkLastSeenChat(mesoId2, this.state.otheUserId)
});
socket.on('user_presence_update', (data) => {
    if (data.userId === this.state.otheUserId) {
        // Use react-toastify to show the notification
        toast.info("The other user just joined the chat!", {
            position: "top-center",
            autoClose: 3000
        });
         if (data.status === 'offline') {
          this.setState({otherUserLastSeen:new Date().getTime()})
   console.log('update offline')
  }else if (data.status === 'viewing_chat') {
    this.setState({otherUserLastSeen:'Online'})
   console.log('update viewing chat')
  }
        this.setState({theLastSeenChat:new Date().getTime()})
        console.log('data.userId',data.userId,this.state.otheUserId,new Date().getTime())
        var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.myUserId + '/' + this.state.theMessageId + '/lastChatSeen/')
         chatRef.once('value', dataSnapshot => {
         if (dataSnapshot.exists()){chatRef.set(new Date().getTime())}})
        console.log('new Date().getTime()',new Date().getTime())
      // this.checkLastSeenChat(mesoId2, this.state.otheUserId)
        // Optionally update UI to show they are "Active Now"
        //this.setState({ lastSeen: 'Active Now' });
    }
});
     
  }
  handleUnload = (e) => {
  // We don't log here because the console will be gone.
  // We just execute the kill command.
  if (socket) {
    socket.disconnect();
  }
}
   listentoWindow = isVisible => {
    console.log('page visible 22222',isVisible)
      this.setState({
        isWindowInFocus: isVisible,
      });
    }
  theInterval = () => {
    setInterval(() => {
      //console.log("the tiime",new Date().getTime());
      this.setState({ count2: this.state.count2 + 1 });
    }, 1000);
  }
  componentDidUpdate() {
    this.scrollToBottom()
   
  }
  checkOnlinePresence=(otherUserId)=>{
     var onlineRef = firebase.database().ref('/online/'+otherUserId+'/online/');
    onlineRef.once('value', dataSnapshot => {this.setState({otherUserLastSeen:dataSnapshot.val()})})
   
  }
  onlinePresence=(myUserId,value)=>{
     var userRef = firebase.database().ref('/online/'+myUserId+'/online/');
    userRef.set(value)
  }
  componentWillUnmount() {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.myUserId + '/' + this.state.theMessageId + '/time')
    chatRef.off('value');
   // var userRef = firebase.database().ref('/online/'+this.state.myUserId+'/online/');
   // userRef.set(null)
   this.onlinePresence(this.state.myUserId,new Date().getTime())
    console.log('called componentWillUnmount',socket)
   // window.removeEventListener('beforeunload', this.handleUnload);
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
        console.log('my iddddd friends',userId)
        this.checkMessages(userId)
        //this.checkOnline(userId)
        this.onlinePresence(userId,'Online')
        this.checkOnlinePresence(this.state.otheUserId)

       
         if (socket.connected) {
        socket.emit('identify', userId);
        socket.emit('opened_chat', {myUserId: userId,otherUserId: this.state.otheUserId});
      }else {
        console.log('no connected socketttttttttt')
        socket.connect(); // Force reconnection if it's dead
        socket.once('connect', () => {
          socket.emit('identify', userId);
          socket.emit('opened_chat', {myUserId: userId,otherUserId: this.state.otheUserId});

        });
      }
        //this.theInterval()

      } else {
        this.setState({ isLogged: false })
      }
    })
  }
  closeMessenger = () => {
    //console.log('clicked!')
    this.props.onClick('fromMessages', 'chatId', 'N/A')
  }
  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
  checkMessages = (myUid) => {
    //console.log('uids',myUid,this.state.otheUserId)
    var myUidKey = myUid.slice(-10);
    var otherUidKey = this.state.otheUserId.slice(-10);
    var mesoId1 = myUidKey + otherUidKey
    var mesoId2 = otherUidKey + myUidKey
    this.setState({myMesoId:mesoId1,otherUserMesoId:mesoId2})
    //console.log('mesoidddddddd',mesoId1,mesoId2)
    var messageRef1 = firebase.database().ref('/messaging/messages/' + myUid + '/' + mesoId1)
    var messageRef2 = firebase.database().ref('/messaging/messages/' + myUid + '/' + mesoId2)
    var theMessages = []
    messageRef1.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        //console.log('1 exiiiiiists',dataSnapshot.val())
        var theNo = dataSnapshot.numChildren(), i = 0
        this.setState({ theMessageId: mesoId1 })//,areThereMessages:true})
        this.checkLastSeenChat(mesoId1, myUid)
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          theData['id'] = data.key
          theMessages.push(theData)
          if (theNo === i) {
            let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
            //console.log('objMax',objMax,objMax['id'])
            console.log('theMessages1',theMessages)
            this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId: objMax['id'] }, () => {
              this.upadateLastSeenChat(mesoId2,this.state.otheUserId)
              //this.realTimeUpdate(mesoId1)
            })

          }
        })
      } else {
       /* messageRef2.once('value', dataSnapshot => {
          if (dataSnapshot.exists()) {
            //console.log('2 exiiiiiists',dataSnapshot.val())
            var theNo = dataSnapshot.numChildren(), i = 0
            this.setState({ theMessageId: mesoId2 })//,areThereMessages:true})
            this.checkLastSeenChat(mesoId2, this.state.otheUserId)
            dataSnapshot.forEach((data) => {
              i++
              var theData = data.val()
              theData['id'] = data.key
              theMessages.push(theData)
              if (theNo === i) {
                let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
                //console.log('objMax',objMax,objMax['id'])
                console.log('theMessages2',theMessages)
                this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId: objMax['id'] }, () => {
                   this.upadateLastSeenChat(mesoId2,this.state.otheUserId)
                 // this.realTimeUpdate(mesoId2)
                })
              }
            })

          } else {
            this.setState({ areMessagesAvailable: false })
          }
        })*/
      }
    })
  }
  upadateLastSeenChat = (messageId, otherUserId) => {
    //console.log('otherUserId to be updated',otherUserId,'ny id',this.state.myUserId)
    var chatRef = firebase.database().ref('/messaging/lastChats/' + otherUserId + '/' + messageId + '/lastChatSeen/')
    chatRef.set(new Date().getTime())
  }
  checkOnline = (userId) => {
    var amOnline = firebase.database().ref(".info/connected")
    var userRef = firebase.database().ref('/online/'+userId+'/online/');
    amOnline.on('value',snapshot=>{
      if (snapshot.val()) {
        userRef.onDisconnect().remove(()=>{
          console.log('internet disconnected',new Date().getTime())
        });
        userRef.set(true,()=>{
       console.log('internert connected',new Date().getTime())
        });
      }
    });
  }
  checkLastSeenChat = (messageId, myUid) => {
    var chatRef = firebase.database().ref('/messaging/lastChats/' + myUid + '/' + messageId + '/lastChatSeen/')
    chatRef.once('value', dataSnapshot => { this.setState({ theLastSeenChat: dataSnapshot.val() }) 
    console.log('theLastSeenChat',messageId,myUid,dataSnapshot.val())
  })
  }
  updateMessages = () => {
    var messageRef = firebase.database().ref('/messaging/messages/' + this.state.myUserId + '/' + this.state.theMessageId).orderByKey().startAfter(this.state.lastMesoId);
    var theMessages = [...this.state.theMessagesArray], updateMessages = []
    console.log('weeeeeee', theMessages)
    // return
    messageRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var theNo = dataSnapshot.numChildren(), i = 0
        // this.checkLastSeenChat(this.state.theMessageId,this.state.otheUserId)
        dataSnapshot.forEach((data) => {
          //console.log('the new data',data.val())
          i++
          var theData = data.val()
          theData['id'] = data.key
          theMessages.push(theData)
          updateMessages.push(theData)
          if (theNo === i) {
            //console.log('updateMessages',theMessages)
            let objMax = updateMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
            //console.log('objMax',objMax,objMax['id'])
            //console.log('theMessages2',theMessages)
            this.upadateLastSeenChat(this.state.theMessageId, this.state.otheUserId)
            this.setState({ areMessagesAvailable: true, theMessagesArray: theMessages, lastMesoId: objMax['id'] })
          }
        })
      } else {
        //console.log('no daaata currentlyyyyyy')
      }
    })
  }
  realTimeUpdate = async (messageId) => {
    //var chatRef = firebase.database().ref('/messaging/lastChats/'+this.state.myUserId+'/'+messageId)
    //chatRef.off('value');
    //chatRef.off('child_changed');
    //return

    var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.myUserId + '/' + messageId + '/time')

    //console.log('starting realtime update',new Date().getTime())
    if (messageId === null || messageId.length < 4) return
    if (this.state.hasInitializedFirebase === false) return
    //console.log('rrrrrrr 599999',this.state.myUserId,messageId)
    await chatRef.on('value', snapshot => {

      console.log('something changeeeeeeeeeeeed', new Date().getTime())
      this.updateMessages()
      this.hasInitializedFirebase()
      // chatRef.off('child_changed');
      //this.fetchDataReload(this.state.messagesId)

    })
  }
  realTimeLastChatUpdate = async (messageId) => {
    //return
    var chatRef = firebase.database().ref('/messaging/lastChats/' + this.state.otheUserId + '/' + messageId)
    ////console.log('rrrrrrr',this.state.myUserId,messageId)
    if (messageId === null || messageId.length < 4) return
    //console.log('rrrrrrr 599999',this.state.myUserId,messageId)
    await chatRef.on('value', snapshot => {
      //console.log('something changeeeeeeeeeeeed')
      this.updateMessages()
      //this.fetchDataReload(this.state.messagesId)

    })
  }
  hasInitializedFirebase = () => {
    this.setState({ hasInitializedFirebase: false })
    this.timerHandle = setTimeout(
      () => this.setState({ hasInitializedFirebase: true }),
      1000)
  }
 /* postMyPicks= () => {
    var teamName=this.props.teamName
    var flockName=this.props.flockName
    var selectedPickTitle=this.props.selectedPickTitle
    var theGames=this.props.theGames
    var sportTitle=this.props.sportType+' - '+selectedPickTitle
    var pickDetails=teamName+'####'+flockName+'####'+sportTitle
    var theMessage=this.props.sportType+' - '+selectedPickTitle
    console.log('dettssssss',teamName,flockName,selectedPickTitle,sportTitle,theGames)
    if(pickDetails.length&&theGames.length){
    this.sendPickMessage(pickDetails,theGames,theMessage)
    }
    
  }
    sendPickMessage = (pickDetails,theGames,theMessage) => {
    var messageRef = firebase.database().ref('/messaging/messages/')
    var chatRef = firebase.database().ref('/messaging/lastChats/')
    var theKey = chatRef.push().key
    var myUidKey = this.state.myUserId.slice(-10);
    var otherUidKey = this.state.otheUserId.slice(-10);
    var theMessagesArray=this.state.theMessagesArray
    var mesoId = ''
    if (this.state.theMessageId.length < 5) {
      mesoId = myUidKey + otherUidKey
    } else {
      mesoId = this.state.theMessageId
    }
   console.log('dettssssss',theMessage,pickDetails,mesoId,this.state.myUserId,this.state.otheUserId,theGames)
    //return
    if (theMessage.length >= 1 && mesoId !== '') {
      var theMessage = { message:theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.otheUserId,status:'picks',pickDetails:pickDetails,thePicks:theGames}
      var theChat = { message:theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.otheUserId,status:'picks',pickDetails:pickDetails,thePicks:theGames,lastChatSeen: new Date().getTime() }
      if (this.state.areThereMessages === false) { theChat['1stSenderId'] = this.state.myUserId }
      messageRef.child(this.state.myUserId).child(mesoId).child(theKey).set(theMessage)
      messageRef.child(this.state.otheUserId).child(mesoId).child(theKey).set(theMessage)
      chatRef.child(this.state.myUserId).child(mesoId).set(theMessage)
      chatRef.child(this.state.otheUserId).child(mesoId).set(theChat, (error) => {
        if (error) { this.notify('Error sending message') }
        else { 
           theMessage['id']=mesoId
          socket.emit('send_private_message', {
      from:'sendMessage',
      recipientId:this.state.otheUserId,
      senderId:this.state.myUserId,
      message:theMessage,
      mesoId:mesoId
    });
   
    theMessagesArray.push(theMessage)
    console.log('theMessagesArray 001',theMessagesArray)
    this.setState({theMessagesArray, lastMesoId:mesoId})     
    this.notify('Message send successfully');this.setState({ theMessageId: mesoId }) }
      })
    } else {
      this.notify('You can not send an empty message')
    }
  }*/
  sendMessage = () => {
    var messageRef = firebase.database().ref('/messaging/messages/')
    var chatRef = firebase.database().ref('/messaging/lastChats/')
    var theKey = chatRef.push().key
    //console.log('rrrrrrrrrr',theKey)
    var myUidKey = this.state.myUserId.slice(-10);
    var otherUidKey = this.state.otheUserId.slice(-10);
    var theMessagesArray=this.state.theMessagesArray
     var mesoId =myUidKey + otherUidKey
    var otherUserMesoId=otherUidKey+myUidKey
    //console.log('mesoId',mesoId)
    // return

    if (this.state.theMessage.length >= 1 && mesoId !== '') {
      var theMessage = { message: this.state.theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.otheUserId }
      var theChat = { message: this.state.theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.otheUserId}
      if (this.state.areThereMessages === false) { theChat['1stSenderId'] = this.state.myUserId }
      messageRef.child(this.state.myUserId).child(mesoId).child(theKey).set(theMessage)
      messageRef.child(this.state.otheUserId).child(otherUserMesoId).child(theKey).set(theMessage)
      chatRef.child(this.state.myUserId).child(mesoId).update(theChat)
      chatRef.child(this.state.otheUserId).child(otherUserMesoId).update(theChat, (error) => {
        if (error) { this.notify('Error sending message') }
        else { 
           theMessage['id']=mesoId
          socket.emit('send_private_message', {
      from:'sendMessage',
      recipientId:this.state.otheUserId,
      senderId:this.state.myUserId,
      message:theMessage,
      mesoId:mesoId
    });
   
    theMessagesArray.push(theMessage)
    console.log('theMessages theChat 001',theMessage,theChat)
    console.log('theMessagesArray 001',theMessagesArray)
    this.setState({theMessagesArray, lastMesoId:mesoId,areMessagesAvailable:true})     
    this.notify('Message send successfully'); this.setState({ theMessage: '' }); this.setState({ theMessageId: mesoId }) }
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
   // console.log('hehehe',this.state.areMessagesAvailable,this.state.theMessagesArray)
    return (
     <PageVisibility onChange={this.listentoWindow}>
        <><div className={styles.container} onClick={(event) => this.doNothing(event)}>
          <div className={styles.container2}>
            <div className={styles.chatsCont} /*style={{backgroundImage: "url(" + "chatBack.jpg" + ")"}}*/>
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
                    {item.senderID !== this.state.myUserId ? <div className={styles.chatItenDiv}><div className={styles.imgDiv}>
                      <Image className={styles.theImg} src={theImg} alt={'RAM User'} height={30} width={30} objectFit='fit' />
                    </div>
                      <div className={styles.theMessageDiv}>
                        {item.status==='picks'?<MessagesGames status='otherUser' myPicks={item.thePicks} pickDetails={item.pickDetails}/>:null}
                        <p className={styles.mesoP}>{item.message}</p>
                        <div className={styles.timeDiv1}>
                          <p className={styles.timeP}>{theMessageTime}</p>
                        </div>
                      </div></div> :
                      <div className={styles.chatItenDiv1}>
                        <div className={styles.chatItenDiv2}>
                          <div className={styles.theMessageDiv2}>
                        {item.status==='picks'?<MessagesGames status='me' myPicks={item.thePicks} pickDetails={item.pickDetails}/>:null}
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
                <p className={styles.lastSeenP} style={{color:this.state.otherUserLastSeen==='Online'?'#3abba5ff':null}}>{this.state.otherUserLastSeen==='Online'||this.state.otherUserLastSeen==='Offline'?this.state.otherUserLastSeen==='Online'?'Online':'Offline':'Last Seen '+lastSeen(this.state.otherUserLastSeen)}</p>

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