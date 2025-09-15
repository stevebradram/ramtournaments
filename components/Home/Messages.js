import React, { Component } from 'react';
import styles from "./Messages.module.scss";
import Image from 'next/image'
import postTime from '../Helper/postTime';
import lastSeen from '../Helper/lastSeen';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';
//import io from "socket.io-client"
var lastSeenTime=1756721809290,theLastTime=''
var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'
var  theChats=[{ id:12,time:1693499400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2},
    { id:12,time:1725121800000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3},
    { id:12,time:1746117000000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2},
    { id:12,time:1753979400000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3},
    { id:12,time:1755707400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2},
    { id:12,time:1756398600000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3},
    { id:12,time:1756571400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2},
    { id:12,time:1756657200000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2},
    { id:12,time:1756508400000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3},
    { id:12,time:1756508400000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3},
    { id:12,time:1756658400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2},
    { id:12,time:1756824686869,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3}
  ]
class Messages extends Component {
       constructor() {
         super();
         this.messagesEndRef = React.createRef(null);
      }
    state={theChats:[
    { id:12,time:1693499400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:2,senderID:2,status:'read'},
    { id:13,time:1725121800000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'},
    { id:14,time:1746117000000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:2,senderID:2,status:'read'},
    { id:15,time:1753979400000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'},
    { id:16,time:1755707400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:3,senderID:2,status:'read'},
    { id:17,time:1756398600000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'},
    { id:18,time:1756571400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:2,senderID:2,status:'read'},
    { id:19,time:1756657200000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:2,senderID:2,status:'sent'},
    { id:20,time:1756657800000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'},
    { id:21,time:1756657920000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'},
    { id:22,time:1756658400000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:2,senderID:2,status:'sent'},
    { id:23,time:1756658460000,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'},
    { id:24,time:1756720200000,message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',otherUserID:2,senderID:2,status:'sent'},
    { id:25,time:1756824686869,message:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',otherUserID:2,senderID:3,status:'sent'}],
    theMessage:'',incomingData:[],profilePhoto:'',userName:'',acronym:'',lastSeen:'',myUserId:'',isLogged:'',otheUserId:'',areMessagesAvailable:'',theMessageId:'',theMessagesArray:[],lastMesoId:'',theLastSeenChat:0,
    hasInitializedFirebase :true,areThereMessages:false
  }

    componentDidMount=()=>{
        this.scrollToBottom()
        console.log('theData',this.props.from)
        console.log('theData',this.props.theData)
        var theData=this.props.theData
        if(this.props.from==='fromFriends'&&theData!=='N/A'){
            console.log('ddddddddd')
            this.setState({profilePhoto:theData['profilePhoto'],userName:theData['userName'],acronym:theData['acronym'],lastSeen:theData['lastSeen'],otheUserId:theData['uid']})
        }
        //this.props.theData['profilePhoto']
        this.setState({theData:this.props.theData})
        this.checkAuth()
    }
       theInterval=()=>{
       setInterval(() => {
              console.log("the tiime",new Date().getTime());
              this.setState({count2:this.state.count2+1});
            }, 1000);
          }
  componentDidUpdate () {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
     checkAuth = () => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                var userId=user.uid
                this.setState({myUserId:userId,isLogged:true})
                this.checkData(userId)
                this.theInterval()
              } else {
                this.setState({isLogged:false})
              }
            })
          }
    closeMessenger=()=>{
        console.log('clicked!')
    this.props.onClick('fromMessages','chatId','N/A')
    }
  doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
  checkData=(myUid)=>{
    console.log('uids',myUid,this.state.otheUserId)
  var myUidKey = myUid.slice(-10);
  var otherUidKey = this.state.otheUserId.slice(-10);
  var mesoId1=myUidKey+otherUidKey
  var mesoId2=otherUidKey+myUidKey
  console.log('mesoidddddddd',mesoId1,mesoId2)
  var messageRef1 = firebase.database().ref('/messaging/messages/'+myUid+'/'+mesoId1)
  var messageRef2 = firebase.database().ref('/messaging/messages/'+myUid+'/'+mesoId2)
  var theMessages=[]
  messageRef1.once('value', dataSnapshot => {
    if(dataSnapshot.exists()){
        console.log('1 exiiiiiists',dataSnapshot.val())
          var theNo=dataSnapshot.numChildren(), i=0
          this.setState({theMessageId:mesoId1})//,areThereMessages:true})
           //this.checkLastSeenChat(mesoId1,this.state.otheUserId)
          dataSnapshot.forEach((data) => {
            i++
            var theData=data.val()
            theData['id']=data.key
            theMessages.push(theData)
            if(theNo===i){
                let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
                console.log('objMax',objMax,objMax['id'])
                console.log('theMessages1',theMessages)
                this.setState({areMessagesAvailable:true,theMessagesArray:theMessages,lastMesoId:objMax['id']},()=>{
                 //this.upadateLastSeenChat(mesoId1,this.state.otheUserId)
                 //this.realTimeUpdate(mesoId1)
                })
               
            }
          })
    }else{
    messageRef2.once('value', dataSnapshot => {
    if(dataSnapshot.exists()){
         console.log('2 exiiiiiists',dataSnapshot.val())
         var theNo=dataSnapshot.numChildren(), i=0
          this.setState({theMessageId:mesoId2})//,areThereMessages:true})
          //this.checkLastSeenChat(mesoId2,this.state.otheUserId)
          dataSnapshot.forEach((data) => {
            i++
            var theData=data.val()
            theData['id']=data.key
            theMessages.push(theData)
            if(theNo===i){
                let objMax = theMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
                console.log('objMax',objMax,objMax['id'])
                console.log('theMessages2',theMessages)
                this.setState({areMessagesAvailable:true,theMessagesArray:theMessages,lastMesoId:objMax['id']},()=>{
               // this.upadateLastSeenChat(mesoId2,this.state.otheUserId)
                //this.realTimeUpdate(mesoId2)
                })
            }
          })

    }else{
    this.setState({areMessagesAvailable:false})
    }
    })
    }
  })
  }
    upadateLastSeenChat=(messageId,otherUserId)=>{
        console.log('otherUserId to be updated',otherUserId,'ny id',this.state.myUserId)
    var chatRef = firebase.database().ref('/messaging/lastChats/'+otherUserId+'/'+messageId+'/lastChatSeen/')
    chatRef.set(new Date().getTime())
  }
    checkLastSeenChat=(messageId,otherUserId)=>{
    var chatRef = firebase.database().ref('/messaging/lastChats/'+otherUserId+'/'+messageId+'/lastChatSeen/')
    chatRef.once('value', dataSnapshot => {this.setState({theLastSeenChat:dataSnapshot.val()})})
  }
    updateMessages=()=>{
       var messageRef = firebase.database().ref('/messaging/messages/'+this.state.myUserId+'/'+this.state.theMessageId).orderByKey().startAfter(this.state.lastMesoId);
        var theMessages=[...this.state.theMessagesArray],updateMessages=[]
        console.log('weeeeeee',theMessages)
       // return
        messageRef.once('value', dataSnapshot => {
           if(dataSnapshot.exists()){
            var theNo=dataSnapshot.numChildren(),i=0
            // this.checkLastSeenChat(this.state.theMessageId,this.state.otheUserId)
           dataSnapshot.forEach((data) => {
            console.log('the new data',data.val())
             i++
            var theData=data.val()
            theData['id']=data.key
            theMessages.push(theData)
            updateMessages.push(theData)
            if(theNo===i){
              console.log('updateMessages',theMessages)
             let objMax = updateMessages.reduce((max, curren) => max.time > curren.time ? max : curren);
                console.log('objMax',objMax,objMax['id'])
                console.log('theMessages2',theMessages)
             this.upadateLastSeenChat(this.state.theMessageId,this.state.otheUserId)
             this.setState({areMessagesAvailable:true,theMessagesArray:theMessages,lastMesoId:objMax['id']})
            }
           })
           }else{
            console.log('no daaata currentlyyyyyy')
           }
        })
    }
    realTimeUpdate = async (messageId) => {
        //var chatRef = firebase.database().ref('/messaging/lastChats/'+this.state.myUserId+'/'+messageId)
        //chatRef.off('value');
        //chatRef.off('child_changed');
        //return
     
    var chatRef = firebase.database().ref('/messaging/lastChats/'+this.state.myUserId+'/'+messageId)
    //console.log('rrrrrrr',this.state.myUserId,messageId)
    if (messageId === null || messageId.length < 4) return
     console.log('rrrrrrr 599999',this.state.myUserId,messageId)
    await chatRef.on('child_changed', snapshot => {
   if(this.state.hasInitializedFirebase===false) return  
    console.log('something changeeeeeeeeeeeed')
    this.updateMessages()
    this.hasInitializedFirebase()
   // chatRef.off('child_changed');
      //this.fetchDataReload(this.state.messagesId)

    })
  }
      realTimeLastChatUpdate = async (messageId) => {
        //return
    var chatRef = firebase.database().ref('/messaging/lastChats/'+this.state.otheUserId+'/'+messageId)
    //console.log('rrrrrrr',this.state.myUserId,messageId)
    if (messageId === null || messageId.length < 4) return
     console.log('rrrrrrr 599999',this.state.myUserId,messageId)
    await chatRef.on('value', snapshot => {
    console.log('something changeeeeeeeeeeeed')
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
  sendMessage=()=>{
  var messageRef = firebase.database().ref('/messaging/messages/')
  var chatRef = firebase.database().ref('/messaging/lastChats/')
  var theKey=chatRef.push().key
  console.log('rrrrrrrrrr',theKey)
  var myUidKey = this.state.myUserId.slice(-10);
  var otherUidKey = this.state.otheUserId.slice(-10);
  var mesoId=''
  if(this.state.theMessageId.length<5){
     mesoId=myUidKey+otherUidKey
  }else{
     mesoId=this.state.theMessageId  
  }
  console.log('mesoId',mesoId)
 // return
  
  if(this.state.theMessage.length>=1&&mesoId!==''){
   var theMessage={message:this.state.theMessage,time:new Date().getTime(),status:'sent',senderID:this.state.myUserId,otherUserID:this.state.otheUserId}
   var theChat={message:this.state.theMessage,time:new Date().getTime(),status:'sent',senderID:this.state.myUserId,otherUserID:this.state.otheUserId,lastChatSeen:new Date().getTime()}
   if(this.state.areThereMessages===false){theChat['1stSenderId']=this.state.myUserId}
   messageRef.child(this.state.myUserId).child(mesoId).child(theKey).set(theMessage)
   messageRef.child(this.state.otheUserId).child(mesoId).child(theKey).set(theMessage)
   chatRef.child(this.state.myUserId).child(mesoId).set(theMessage)
   chatRef.child(this.state.otheUserId).child(mesoId).set(theChat,(error) => {
            if (error){this.notify('Error sending message')}
            else{this.notify('Message send successfully');this.setState({theMessage:''});this.setState({theMessageId:mesoId})}
   })
  }else{
   this.notify('You can not send an empty message')
  }
  }
  inputChange = async (e) => {
            var value = e.target.value
            console.log('theId', e.target.id)
            await this.setState({[e.target.id]: value})
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
            <>
            <div className={styles.container} onClick={(event)=>this.doNothing(event)}>
                <div className={styles.container2}>
                <div className={styles.chatsCont} /*style={{backgroundImage: "url(" + "chatBack.jpg" + ")"}}*/>
                {/*this.state.areMessagesAvailable?<>{this.state.theMessagesArray.map((item,index)=>{*/}
                {this.state.areMessagesAvailable?<>{this.state.theChats.map((item,index)=>{
                 var postDate = '',showTime=false,theMessageTime=''
                 var theTime = dayjs(item.time).format('MMMM DD YYYY')
                 var todayTime=dayjs(new Date())
                 var daysDiff=todayTime.diff(theTime, 'day')
                 var hourDiff=todayTime.diff(theTime, 'hour')
                 var minDiff=todayTime.diff(theTime, 'minute')
                 if(hourDiff<1){
                      if(minDiff<=1){theMessageTime='Just Now'}
                      else if(minDiff>1){theMessageTime=minDiff+' Min'}
                 }else{theMessageTime= dayjs(item.time).format('HH:mm')}
                 if(theLastTime !== theTime){
                 theLastTime = theTime
                 if (daysDiff=== 0) { postDate = 'Today' }
                 if (daysDiff === 1) { postDate = 'Yesterday' }
                 if (daysDiff>1&&daysDiff<7) { postDate = dayjs(item.time).format('dddd')}
                 if (daysDiff>=7){postDate=dayjs(item.time).format('DD MMM YYYY')}
                 showTime=true
                 }else{
                 showTime=false
                 }
                 var isItSeen=''
                 if(this.state.theLastSeenChat>=item.time){isItSeen=true}else{isItSeen=false}
                 return(
                    <div key={index}>
                    {showTime?<div className={styles.postTimeDiv}><p className={styles.postP}>{postDate}</p></div>:null}
                    {item.senderID!==2?<div className={styles.chatItenDiv}><div className={styles.imgDiv}>
                       <Image className={styles.theImg} src={theImg}  alt={'RAM User'} height={30} width={30} objectFit='fit'/>
                        </div>
                        <div className={styles.theMessageDiv}>
                            <p className={styles.mesoP}>{item.message}</p>
                             <div className={styles.timeDiv1}>
                           <p className={styles.timeP}>{theMessageTime}</p>
                          </div>
                        </div></div>:
                        <div className={styles.chatItenDiv1}>
                          <div className={styles.chatItenDiv2}>
                        <div className={styles.theMessageDiv2}>
                            <p className={styles.mesoP} style={{marginRight:item.message.length<=3?30:null}}>{item.message}</p>
                             <div className={styles.timeDiv2}>
                           <p className={styles.timeP2}>{theMessageTime}</p>
                           <IoCheckmarkDoneSharp color={isItSeen?'#df5959ff':null}/>
                          </div>
                        </div>
                        <div className={styles.imgDiv2}>
                       <Image className={styles.theImg} src={theImg}  alt={'RAM User'} height={30} width={30} objectFit='fit'/>
                        </div>
                    </div></div>}
                    </div>)})}
                    <div ref={this.messagesEndRef}></div></>:
                    <div className={styles.noDataDiv}>
                        <p>Your messages will appear here</p>
                    </div>}
                </div>
                 <div className={styles.headerDiv}>
                    <HiArrowNarrowLeft  className={styles.backIc} onClick={()=>this.closeMessenger()}/>
                        <div className={styles.userImgDiv}>
                        {this.state.profilePhoto!=='N/A'?<Image className={styles.theUserImg} src={this.state.profilePhoto}  alt={'RAM User'} height={40} width={40} objectFit='fit'/>:
                                              <p className={styles.acroP}>{this.state.acronym}</p>}
                        </div>
                        <div>
                            <p className={styles.userNameP}>{this.state.userName}</p>
                            <p className={styles.lastSeenP}>Last Seen {lastSeen(lastSeenTime)} </p>
                            
                        </div>
                    </div>
                <div className={styles.editDiv}>
                <textarea className={styles.mesoInput} id='theMessage' placeholder='Write your message here' value={this.state.theMessage} multiple onChange={(event)=>this.inputChange(event)}/>
                <IoMdArrowDroprightCircle className={styles.sendIc} onClick={()=>this.sendMessage()} style={{color:this.state.theMessage.length>=3?null:'#d3d3d3ff'}}/>
                </div>
            </div></div>
             <ToastContainer />
             </>
        );
    }
}

export default Messages;