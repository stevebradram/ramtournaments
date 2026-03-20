import React, { Component } from 'react';
import styles from "./AddFriends.module.scss";
import postTime from '../Helper/postTime';
import Image from 'next/image'
import { MdOutlineClose, MdAddComment, MdSend,MdOutlinePersonAddAlt,MdOutlineAdd } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import firebase from '../FirebaseClient'
import { Obfuscator } from '../Helper/Obfuscator';
import { ToastContainer, toast } from 'react-toastify';
class Friends extends Component {
  state = {friendsListArr: [],friendsListAvailable:false, myUserId: '', isLogged: '',showAddFrienModal:false,email:'',emailErr:''}

  componentDidMount = () => {
    this.checkAuth()
    ///this.getEmails()
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid
        var safeId = Obfuscator.mask(userId);
        //console.log('myyyyyyyyyyyyyyyyyyy user id',safeId, userId)
        this.setState({ myUserId: userId, isLogged: true })
        this.getData(userId)
      } else {
        this.setState({ isLogged: false })
      }
    })
  }
    getEmails = () => {
      var usersRef = firebase.database().ref('/users/')
      var emailsRef = firebase.database().ref('/emails/')
      var emailsList = {}
      usersRef.once('value', dataSnapshot => {
        var theNo = dataSnapshot.numChildren(), i = 0
        dataSnapshot.forEach((data) => {
          i++
         var theEM=data.val().userData.email
         var safeId = Obfuscator.mask(data.key);
         //var realID = Obfuscator.unmask(safeId);
         var safeEmail = Obfuscator.maskEmailForKey(theEM);
         //var realEmail = Obfuscator.unmaskEmailFromKey(safeEmail);
        //console.log('safe details',safeId,safeEmail)
        //console.log('myyyyyyyyyyyyyyyyyyy email',safeEmail,realEmail)
         // uid=this.maskUID(uid)
          //var safeId = Obfuscator.mask(data.key);
          //var theMail=data.val().userData.email
          //theMail=theMail.replace(/./g,'!!!!')
          //return
          //emailsRef.child(safeEmail).set(safeId)
          //console.log('the daaaaaaaata',uid,safeId,theMail)
          //var item={[safeEmail]:safeId}
          emailsList[safeEmail]=safeId
          if(theNo===i){
            //console.log('the cont',emailsList.length,theNo)
            //console.log('alllllllllll',emailsList)
            emailsRef.update(emailsList)
          }
        })
      })
      }
  getData = (userId) => {
    //console.log('userId', userId)
    var safeId = Obfuscator.mask(userId);
    var messageRef = firebase.database().ref('/messaging/friendRequests/' + safeId)
    var userRef = firebase.database().ref('/users/')

    var friendsListArr = []
    messageRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
      var theNo = dataSnapshot.numChildren(), i = 0
      dataSnapshot.forEach((data) => {
        i++
        var theUserId = data.key
        theUserId = Obfuscator.unmask(theUserId);
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
            //console.log('friendsListArr', friendsListArr)
            this.setState({ friendsListArr,friendsListAvailable:true})
          }
        })
        
        //console.log('the uid', theUserId)
      })
    }else{

    }
    })
    //messageRef.set('kkkk')
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
    //console.log('clicked!')
    this.props.onClick('fromAddFriends', 'close', 'N/A')
  }
  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
  oddOrEven = (x) => {
    return (x & 1) ? "odd" : "even";
  }
  acceptFriendRequest=(item)=>{
     var otherUserId=item.uid
    //console.log('iteeeeem',otherUserId,this.state.myUserId,item,this.state.friendsListArr)
     var friendsRef = firebase.database().ref('/messaging/friends/')
     var friendRequestRef = firebase.database().ref('/messaging/friendRequests/')
     var friendsNotRef = firebase.database().ref('/messaging/notifications/')
     friendsRef.child(this.state.myUserId).child(otherUserId).set(new Date().getTime())
     friendsRef.child(otherUserId).child(this.state.myUserId).set(new Date().getTime())
     var safeId = Obfuscator.mask(this.state.myUserId);
     var otherUserSafeId = Obfuscator.mask(otherUserId);
     friendRequestRef.child(safeId).child(otherUserSafeId).set(null,(error) => {
        if (error) { this.notify('An error occured') }
        else {
         friendsNotRef.child(this.state.myUserId).child('friends').set(null)
         friendsNotRef.child(this.state.myUserId).child('allNots').set(new Date().getTime())
         const friendsListArr = this.state.friendsListArr.filter(item => item.uid !== otherUserId);
         this.setState({friendsListArr})
        }})
  }
  submitRequest=()=>{
     var emailsRef = firebase.database().ref('/emails/')
     var friendRequestRef = firebase.database().ref('/messaging/friendRequests/')
     var friendsNotRef = firebase.database().ref('/messaging/notifications/')
     var validate = this.validateEmail(this.state.email)
        if(validate===false){
        this.setState({emailErr:'Please enter a valid email'})
        }else{
          var safeEmail = Obfuscator.maskEmailForKey(this.state.email);
          emailsRef.child(safeEmail).once('value', dataSnapshot => {
            if(dataSnapshot.exists()){
              var theUid=dataSnapshot.val()
              var otherUesrIdDeobfs=Obfuscator.unmask(theUid);
              var safeId = Obfuscator.mask(this.state.myUserId);
              //console.log('friend reqqqqq',theUid,safeId)
              friendRequestRef.child(theUid).child(safeId).set(new Date().getTime())
              friendsNotRef.child(otherUesrIdDeobfs).child('friends').child(this.state.myUserId).set(new Date().getTime())
              friendsNotRef.child(otherUesrIdDeobfs).child('allNots').set(new Date().getTime())
              this.notify('Friend request send successfully')
              this.setState({emailErr:'',showAddFrienModal:false})
            }
            else{this.setState({emailErr:'No user found matching the typed email'})}
          })
          }
  }
      validateEmail(val) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
          return false;
        } else {
          return true;
        }
      }
    inputChange = async (e) => {
    var value = e.target.value
    //console.log('theId', e.target.id)
    await this.setState({ [e.target.id]: value })
    var validate = this.validateEmail(value)
        if(validate===false){
        this.setState({emailErr:'Please enter a valid email'})
        }else{this.setState({emailErr:''})}
  }
  render() {
    return (
      <><div className={styles.container} onClick={(event) => this.doNothing(event)}>
        <div className={styles.headerDiv}>
          <h2>Friend Requests</h2>
          <MdOutlineClose className={styles.backIc} onClick={() => this.closeMessenger()} />
        </div>
        <div className={styles.noDataCont}>
          <div className={styles.noDataDiv} onClick={()=>this.setState({showAddFrienModal:true})}>
              <MdOutlinePersonAddAlt size={20} color='#fff'/>
                          <p>Add Friends</p>
                        </div></div>
        <div className={styles.chatsCont}>
          {this.state.friendsListAvailable?this.state.friendsListArr.map((item, index) => {
            var theNo = index + 1
            //console.log('is even', this.oddOrEven(theNo))
            var isEvenOdd = this.oddOrEven(theNo)
            //4fabcf
            return (
              <div className={styles.chatItenDiv} key={index} onClick={() => this.acceptFriendRequest(item)}>
                <div className={styles.imgDiv} style={{ backgroundColor: isEvenOdd === 'even' ? '#4fabcf' : '#5d6779' }}>
                  {item.profilePhoto !== 'N/A' ? <Image className={styles.theImg} src={item.profilePhoto} alt={'RAM User'} height={50} width={50} objectFit='fit' /> :
                    <p className={styles.acroP}>{item.acronym}</p>}
                </div>
                <div>
                  <div className={styles.nameDiv}>
                    <p className={styles.nameP}>{item.userName}</p>
                  </div>
                  <p className={styles.mesoP}>Click to add friend</p>
                    <div className={styles.addChat}>
                      <MdOutlineAdd  className={styles.chatIc} />
                    </div>

                </div>
              </div>)
          }):<div className={styles.noDataDiv2}>
                  <p>Friend requests send to you  will appear here</p>
                </div>}
        </div>
        
      </div>  {this.state.showAddFrienModal?<div className={styles.searchFriendsModal}>
        <div className={styles.searchFriendsDiv} onClick={(event) => this.doNothing(event)}>
          <p className={styles.addFrienTitleP}>Add Friend</p>
           <input className={styles.friendsInput} id='email' placeholder='Enter friends email here' value={this.state.email} multiple onChange={(event) => this.inputChange(event)} />
          <p className={styles.emailErr}>{this.state.emailErr}</p>
          <p className={styles.friendsSubmit} onClick={()=>this.submitRequest()}>Submit</p>
        </div>
        </div>:null}<ToastContainer /></>
    );
  }
}

export default Friends;