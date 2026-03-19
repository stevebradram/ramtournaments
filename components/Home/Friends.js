import React, { Component } from 'react';
import styles from "./Friends.module.scss";
import postTime from '../Helper/postTime';
import Image from 'next/image'
import { MdOutlineClose, MdAddComment, MdSend } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import firebase from '../FirebaseClient'
import { ToastContainer, toast } from 'react-toastify';
var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'
import { io}  from "socket.io-client"
/*var socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket", "polling"] // Forces websocket first to avoid some polling CORS issues
});*/
var socket = io("https://theramtournament.com", {
  withCredentials: true,
  transports: ["websocket"], 
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5
});

class Friends extends Component {
  state = {
    theChats: [
      { id: 1693499400000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'read' },
      { id: 1725121800000, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' },
      { id: 1746117000000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'read' },
      { id: 1753979400000, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' },
      { id: 1755707400000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'read' },
      { id: 1756398600000, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' },
      { id: 1756571400000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'read' },
      { id: 1756657200000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'send' },
      { id: 1756657800000, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' },
      { id: 1756657920000, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'read' },
      { id: 1756658400000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'read' },
      { id: 1756658460000, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' },
      { id: 1756720200000, meso: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', userId: 2, status: 'read' },
      { id: 1756720723788, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' }],
    friendsListArr: [], myUserId: '', isLogged: ''
  }

  componentDidMount = () => {
    var theChats = this.state.theChats.sort(function (a, b) { return b.id - a.id });
    this.setState({ theChats })
    this.checkAuth()
    socket.on("connect", () => {
        console.log("Connected to Socket Server:", socket.id);
    });
  }
    componentWillUnmount() {
       if (socket) socket.disconnect();
    }
  
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid
        console.log('myyyyyyyyyyyyyyyyyyy user id', userId)
        this.setState({ myUserId: userId, isLogged: true })
        this.getData(userId)
      } else {
        this.setState({ isLogged: false })
      }
    })
  }
  getData = (userId) => {
    console.log('userId', userId)
    var messageRef = firebase.database().ref('/messaging/friends/' + userId)
    var userRef = firebase.database().ref('/users/')
    var friendsListArr = []
    messageRef.once('value', dataSnapshot => {
      var theNo = dataSnapshot.numChildren(), i = 0
      dataSnapshot.forEach((data) => {
        i++
        var theUserId = data.key
        var friendsList = { uid: theUserId }
        userRef.child(theUserId).child('userData').once('value', dataSnapshot => {
          var profilePhoto = dataSnapshot.val().profilePhoto
          var userName = dataSnapshot.val().name
          var lastSeen = dataSnapshot.val().lastSeen
          var matches = userName.match(/\b(\w)/g);
          var acronym = matches.join('');
          friendsList['userName'] = userName
          friendsList['acronym'] = acronym
          friendsList['lastSeen'] = lastSeen
          if (profilePhoto) { friendsList['profilePhoto'] = profilePhoto }
          else { friendsList['profilePhoto'] = 'N/A' }
          friendsListArr.push(friendsList)
          if (theNo === i) {
            console.log('friendsListArr', friendsListArr)
            this.setState({ friendsListArr })
          }
        })
        console.log('the uid', theUserId)
      })
    })
    //messageRef.set('kkkk')
  }
  openMessages = (item) => {
    if (this.props.from === 'events') { this.postMyPicks(item) }
    else { this.props.onClick('fromFriends', 'chatId', item) }
  }
  postMyPicks = (item) => {
    var teamName = this.props.teamName
    var flockName = this.props.flockName
    var selectedPickTitle = this.props.selectedPickTitle
    var theGames = this.props.theGames
    var sportTitle = this.props.sportType + ' - ' + selectedPickTitle
    var pickDetails = teamName + '####' + flockName + '####' + sportTitle
    var theMessage = this.props.sportType + ' - ' + selectedPickTitle
    console.log('dettssssss', teamName, flockName, selectedPickTitle, sportTitle, item, theGames)
    if (pickDetails.length && theGames.length) {
      this.sendPickMessage(pickDetails, theGames, theMessage, item)
    }

  }
  sendPickMessage = (pickDetails, theGames, theMessage, item) => {
    var otheUserId = item.uid
    var messageRef = firebase.database().ref('/messaging/messages/')
    var chatRef = firebase.database().ref('/messaging/lastChats/')
    var theKey = chatRef.push().key
    var myUidKey = this.state.myUserId.slice(-10);
    var otherUidKey = otheUserId.slice(-10);
    var mesoId =myUidKey + otherUidKey
    var otherUserMesoId=otherUidKey+myUidKey// myUidKey + otherUidKey
    // console.log('dettssssss',theMessage,pickDetails,mesoId,this.state.myUserId,otheUserId,theGames)
    // return
    if (theMessage.length >= 1 && mesoId !== '') {
      var theMessageItem = { message: theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: otheUserId, status: 'picks', pickDetails: pickDetails, thePicks: theGames}
       var myChat = { message: theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: otheUserId }
      var otherUserChat = { message: theMessage, time: new Date().getTime(), status: 'sent', senderID: this.state.myUserId, otherUserID: this.state.myUserId }
      if (this.state.areThereMessages === false) { myChat['1stSenderId'] = this.state.myUserId }
      messageRef.child(this.state.myUserId).child(mesoId).child(theKey).set(theMessageItem)
      messageRef.child(otheUserId).child(otherUserMesoId).child(theKey).set(theMessageItem)
      chatRef.child(this.state.myUserId).child(mesoId).update(myChat)
      chatRef.child(otheUserId).child(otherUserMesoId).update(otherUserChat, (error) => {
        if (error) { this.notify('Error sending message') }
        else {
           socket.emit('send_private_message', {
      from:'sendMessage',
      recipientId:otheUserId,
      senderId:this.state.myUserId,
      message:theMessageItem,
      mesoId:mesoId})
          this.notify('Message send successfully');
          this.props.onClick('fromFriends', 'chatId', item)
           }
      })
    } else {
      this.notify('You can not send an empty message')
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
  closeMessenger = () => {
    console.log('clicked!')
    this.props.onClick('fromFriends', 'close', 'N/A')
  }
  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
  oddOrEven = (x) => {
    return (x & 1) ? "odd" : "even";
  }
  render() {
    return (
      <><div className={styles.container} onClick={(event) => this.doNothing(event)}>
        <div className={styles.headerDiv}>
          <h2>Friends</h2>
          <MdOutlineClose className={styles.backIc} onClick={() => this.closeMessenger()} />
        </div>
        <div className={styles.chatsCont}>
          {this.state.friendsListArr.map((item, index) => {
            var theNo = index + 1
            console.log('is even', this.oddOrEven(theNo))
            var isEvenOdd = this.oddOrEven(theNo)
            //4fabcf
            return (
              <div className={styles.chatItenDiv} key={index} onClick={() => this.openMessages(item)}>
                <div className={styles.imgDiv} style={{ backgroundColor: isEvenOdd === 'even' ? '#4fabcf' : '#5d6779' }}>
                  {item.profilePhoto !== 'N/A' ? <Image className={styles.theImg} src={theImg} alt={'RAM User'} height={50} width={50} objectFit='fit' /> :
                    <p className={styles.acroP}>{item.acronym}</p>}
                </div>
                <div>
                  <div className={styles.nameDiv}>
                    <p className={styles.nameP}>{item.userName ? item.userName : 'John Keem'}</p>
                  </div>
                  {this.props.from === '!events' ? <p className={styles.mesoP}>Click to send message</p> : <p className={styles.mesoP}>Click to share picks</p>}
                  {this.props.from === 'events' ?
                    <div className={styles.addChat} style={{ backgroundColor: 'red' }}>
                      <MdSend className={styles.chatIc} />
                    </div> :
                    <div className={styles.addChat}>
                      <MdAddComment className={styles.chatIc} />
                    </div>}

                </div>
              </div>)
          })}
        </div>
      </div> <ToastContainer /></>
    );
  }
}

export default Friends;