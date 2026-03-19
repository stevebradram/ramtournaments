import React, { Component } from 'react';
import styles from "./Chats.module.scss";
import postTime from '../Helper/postTime';
import Image from 'next/image'
var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineClose, MdAddComment } from "react-icons/md";
import firebase from '../FirebaseClient'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
class Chats extends Component {
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
      { id: 1756720723788, meso: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa', userId: 3, status: 'send' }
    ], theChatsId: '', areChatsAvailable: false, theChatsArray: [], lastMesoId: '', myUserId: '', isLogged: '', adminChatsItem: '',adminChatLastSeen:0
  }

  componentDidMount = () => {
    var theChats = this.state.theChats.sort(function (a, b) { return b.id - a.id });
    this.setState({ theChats })
    this.checkAuth()
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid
        this.setState({ myUserId: userId, isLogged: true })
        this.checkAdminChats(userId)
        this.checkChats(userId)
      } else {
        this.setState({ isLogged: false })
      }
    })
  }
  checkAdminChats = (myUid) => {
    var adminChatsRef = firebase.database().ref('/messaging/adminChats/')
    var adminLastSeenChatsRef = firebase.database().ref('/messaging/adminChatLastSeen/'+myUid+'/')
    // console..log('my chat id zzzzz', myUid)
    adminChatsRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        this.setState({ adminChatsItem: dataSnapshot.val() })
        adminLastSeenChatsRef.once('value', dataSnapshot => {
         if (dataSnapshot.exists()) {
          this.setState({adminChatLastSeen:dataSnapshot.val()})
         }})
        // console..log('rrrrrrrrrr',dataSnapshot.val())
      }

    })
  }
  checkChats = (myUid) => {
    var chatsRef = firebase.database().ref('/messaging/lastChats/' + myUid + '/')
    var userRef = firebase.database().ref('/users/')
    var theChats = []
    // console..log('my chat id', myUid)
    chatsRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        //// console..log('1 exiiiiiists',dataSnapshot.val())
        var theNo = dataSnapshot.numChildren(), i = 0

        // this.checkLastSeenChat(mesoId1, this.state.otheUserId)
        dataSnapshot.forEach((data) => {
          i++
          var theData = data.val()
          theData['id'] = data.key
          var otherUserID = data.val().otherUserID
          // console..log('my otherUserID id', otherUserID)
          userRef.child(otherUserID).child('userData').once('value', dataSnapshot => {
            var profilePhoto = dataSnapshot.val().profilePhoto
            var userName = dataSnapshot.val().name
            var matches = userName.match(/\b(\w)/g);
            var acronym = matches.join('');
            theData['userName'] = userName
            theData['acronym'] = acronym
            if (profilePhoto) { theData['profilePhoto'] = profilePhoto }
            else { theData['profilePhoto'] = 'N/A' }
            theChats.push(theData)
            if (theNo === i) {
              let objMax = ''
              if (theChats.length) { objMax = theChats.reduce((max, curren) => max.time > curren.time ? max : curren); }
              //// console..log('objMax',objMax,objMax['id'])
              // console..log('theChats1232323', theChats)
              // return
              this.setState({ areChatsAvailable: true, theChatsArray: theChats, lastMesoId: objMax['id'] }, () => {
                //// console..log('allChats', theChats)
                // this.upadateLastSeenChat(mesoId1,this.state.otheUserId)
                //this.realTimeUpdate(mesoId1)
              })

            }
          })

        })
      } else { this.setState({ areChatsAvailable: false }) }

    })
  }
  openMessages = (item) => {
    // console..log('clicked!', item)
    var theItem = { uid: item.otherUserID, acronym: item.acronym, profilePhoto: item.profilePhoto, userName: item.userName }
    this.props.onClick('fromChats', 'chatId', theItem)
  }
    openAdminMessages=() => {
    //this.notify('Going to admin messages')
    this.props.onClick('fromChatsToAdmin', 'chatId')
  }
  openFriends = () => {
    // console..log('clicked!')
    this.props.onClick('fromChats', 'openFriends', 'N/A')
  }
  closeMessenger = () => {
    // console..log('clicked!')
    this.props.onClick('fromChats', 'close', 'N/A')
  }

  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
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
    var adminMessageRead=true
    if(this.state.adminChatLastSeen<this.state.adminChatsItem['time']){adminMessageRead=true}
    return (
      <><div className={styles.container} onClick={(event) => this.doNothing(event)}>
        <div className={styles.headerDiv}>
          <h2>Chats</h2>
          <MdOutlineClose className={styles.backIc} onClick={() => this.closeMessenger()} />
        </div>
        <div className={styles.chatItenDiv} id={styles.chatItenDiv}  onClick={() => this.openAdminMessages()}>
          <div className={styles.imgDiv}>
            <Image className={styles.theImg} src={'/icon3.png'} alt={'RAM'} height={50} width={50} objectFit='fit' />
          </div>
          <div>
            <div className={styles.nameDiv}>
              {/*<p className={styles.nameP}>RAM</p>*/}
              <div style={{display:'flex',alignItems:'center'}}><p className={styles.nameP} style={{marginRight:5,fontWeight:700,fontSize:17}}>RAM</p><RiVerifiedBadgeFill color={'#428adb'}/></div>
              <p className={styles.timeP} style={{ color: adminMessageRead === false ? '#df5959ff' : null }}>{postTime(this.state.adminChatsItem['time'])}</p>
            </div>
            <p className={styles.mesoP} style={{fontWeight:500}}>{this.state.adminChatsItem['title']}</p>
            {adminMessageRead?null:<AiFillMessage className={styles.mesoIc}/>}
          </div>
        </div>

        {this.state.areChatsAvailable ? <div className={styles.chatsCont}>
          {this.state.theChatsArray.map((item, index) => {
            const messageRead = item.lastChatSeen ? item.lastChatSeen > item.time : false;
            return (
              <div className={styles.chatItenDiv} key={index} onClick={() => this.openMessages(item)}>
                <div className={styles.imgDiv}>
                  {item.profilePhoto !== 'N/A' ? <Image className={styles.theImg} src={item.profilePhoto} alt={'RAM User'} height={50} width={50} objectFit='fit' /> :
                    <p>{item.acronym}</p>}

                </div>
                <div>
                  <div className={styles.nameDiv}>
                    <p className={styles.nameP}>{item.userName}</p>
                    <p className={styles.timeP} style={{ color: messageRead === false ? '#df5959ff' : null }}>{postTime(item.time)}</p>
                  </div>
                  <p className={styles.mesoP}>{item.message}</p>
                  {messageRead ? null : <AiFillMessage className={styles.mesoIc} />}
                </div>
              </div>)
          })}
        </div> :
          <div className={styles.noDataDiv}>
            <p>Your chats will appear here</p>
          </div>}
        <div className={styles.addChat} onClick={() => this.openFriends()}>
          <MdAddComment className={styles.chatIc} />
        </div>
      </div><ToastContainer /></>
    );
  }
}

export default Chats;