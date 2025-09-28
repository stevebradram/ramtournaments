import React, { Component } from 'react';

class Messages4 extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Messages4;
/*import React, { Component } from 'react';
import styles from "./Messages.module.scss";
import io from 'socket.io-client';
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { socket } from "../socket";
import Image from 'next/image'
import postTime from '../Helper/postTime';
import lastSeen from '../Helper/lastSeen';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';

class Messages4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      theMessage: '',
      theMessage: '', incomingData: [], profilePhoto: '', userName: '', acronym: '', lastSeen: '', myUserId: '', isLogged: '', otheUserId: '', areMessagesAvailable: '', theMessageId: '', theMessagesArray: [], lastMesoId: '', theLastSeenChat: 0,
      hasInitializedFirebase: true, areThereMessages: false, messageToken: ''
    };
  }
  componentDidMount() {
    console.log('theData', this.props.from)
    console.log('theData', this.props.theData)
    var theData = this.props.theData
    if (this.props.from === 'fromFriends' && theData !== 'N/A') {
      console.log('ddddddddd')
      this.setState({ profilePhoto: theData['profilePhoto'], userName: theData['userName'], acronym: theData['acronym'], lastSeen: theData['lastSeen'], otheUserId: theData['uid'] })
    }
    //this.props.theData['profilePhoto']
    this.setState({ theData: this.props.theData })
    this.checkAuth()

    socket.on('connect')
    socket.on("receive_message", (data) => { console.log('rrrrrrrrrr 000000',data.message) })
    socket.on("send_message")
  }
  joinRoom=(token)=>{
    if(token!==""){
      socket.emit("join_room",token)
    }
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid
        this.setState({ myUserId: userId, isLogged: true })
        console.log('my uiiiiid',userId)
        //this.checkData(userId)
        //this.theInterval()
        this.getMessageToken(userId)
      } else {
        this.setState({isLogged:false })
      }
    })
  }
  getMessageToken = (myUid) => {
    var messageTokenRef = firebase.database().ref('/messaging/messageToken/' + myUid + '/' + this.state.otheUserId)
    var messageTokenRef2 = firebase.database().ref('/messaging/messageToken/' + this.state.otheUserId + '/' + myUid)
    var theToken=myUid//new Date().getTime()
    messageTokenRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        this.setState({ messageToken: dataSnapshot.val() })
        //console.log('the ttttttttoken',dataSnapshot.val())
         this.joinRoom(dataSnapshot.val())
      } else {
        messageTokenRef.set(theToken)
        messageTokenRef2.set(theToken, (error) => {
          if (error) { this.notify('Error sending message') }
          else { 
            this.setState({ messageToken:theToken}) 
            this.joinRoom(theToken)
          }
        })
      }
    })
  }
  // componentDidUpdate(){
   //  console.log('updateddddd')
   //  socket.on("receive_message",(data)=>{
  //       console.log('rrrrrrrrrr 000000',new Date(),data.message)
       //alert(data.message)
   //   })
  // }
  componentWillUnmount() {
    socket.off('connect');
    socket.off('send_message');
    socket.off('receive_message');
    //socket.off('disconnect');
    //socket.close();
  }
  sendMessage = () => {
    //e.preventDefault();
    //socket.emit('sendMessage', this.state.theMessage);
    var room=this.state.messageToken
    console.log('this.state.theMessage', this.state.theMessage)
    console.log('this.state.otheUserId', this.state.otheUserId)
    console.log('room', room)
    //return
    socket.emit("send_message", { message: this.state.theMessage,room})
    // socket.emit("send_message",{message:message,socketId:socketId})
    //socket.emit("send_message",{message:message})
    // this.setState({ theMessage: '' });


  };
  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
  inputChange = async (e) => {
    var value = e.target.value
    console.log('theId', e.target.id)
    await this.setState({ [e.target.id]: value })
  }
  render() {
    return (
      <div className={styles.container} onClick={(event) => this.doNothing(event)}>
        <div className={styles.container2}>
          <div className={styles.chatsCont}>
            <h1>Socket.IO Chat</h1>
            <div>
              {this.state.messages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
            <div className={styles.editDiv}>
              <textarea className={styles.mesoInput} id='theMessage' placeholder='Write your message here' multiple onChange={(event) => this.inputChange(event)} />
              <IoMdArrowDroprightCircle className={styles.sendIc} onClick={() => this.sendMessage()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages4;*/