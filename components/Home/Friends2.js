import React, { Component } from 'react';
import styles from "./Friends.module.scss";
import postTime from '../Helper/postTime';
import Image from 'next/image'
import { MdOutlineClose,MdAddComment } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import firebase from '../FirebaseClient'

var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'


class Friends extends Component {
    state={theChats:[
    {id:1693499400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1725121800000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1746117000000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1753979400000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1755707400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756398600000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1756571400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756657200000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'send'},
    {id:1756657800000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1756657920000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'read'},
    {id:1756658400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756658460000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1756720200000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756720723788,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'}],
    friendsListArr:[],myUserId:'',isLogged:''
  }

    componentDidMount=()=>{
        var theChats = this.state.theChats.sort(function (a, b) { return b.id - a.id });
        this.setState({theChats})
        this.checkAuth()
    }
      checkAuth = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            var userId=user.uid
            console.log('myyyyyyyyyyyyyyyyyyy user id',userId)
            this.setState({myUserId:userId,isLogged:true})
            this.getData(userId)
          } else {
            this.setState({isLogged:false})
          }
        })
      }
      getData=(userId)=>{
        console.log('userId',userId)
        var messageRef = firebase.database().ref('/messaging/friends/'+userId)
        var userRef = firebase.database().ref('/users/')
      
        var friendsListArr=[]
         messageRef.once('value', dataSnapshot => {
          var theNo=dataSnapshot.numChildren(), i=0
          dataSnapshot.forEach((data) => {
            i++
           var theUserId=data.key
           var friendsList={uid:theUserId}
           userRef.child(theUserId).child('userData').once('value', dataSnapshot => {
            var profilePhoto=dataSnapshot.val().profilePhoto
            var userName=dataSnapshot.val().name
            var lastSeen=dataSnapshot.val().lastSeen
            var matches  = userName.match(/\b(\w)/g);
            var acronym = matches.join('');
            friendsList['userName']=userName
            friendsList['acronym']=acronym
            friendsList['lastSeen']=lastSeen
            if(profilePhoto){friendsList['profilePhoto']=profilePhoto}
            else{friendsList['profilePhoto']='N/A'}
            friendsListArr.push(friendsList)
             if(theNo===i){
                console.log('friendsListArr',friendsListArr)
                this.setState({friendsListArr})
            }
           })
           console.log('the uid',theUserId)
          })
          })
       //messageRef.set('kkkk')
      }
    openMessages=(item)=>{
        console.log('clicked!')
    this.props.onClick('fromFriends','chatId',item)
    }
    closeMessenger=()=>{
        console.log('clicked!')
        this.props.onClick('fromFriends','close','N/A')
    }
    doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
   oddOrEven=(x)=>{
  return ( x & 1 ) ? "odd" : "even";
}
    render() {
        return (
            <div className={styles.container} onClick={(event)=>this.doNothing(event)}>
                <div className={styles.headerDiv}>
                    <h2>Friends</h2>
                <MdOutlineClose   className={styles.backIc} onClick={()=>this.closeMessenger()}/>
                </div>
                <div className={styles.chatsCont}>
                {this.state.theChats.map((item,index)=>{
                var theNo=index+1
                console.log('is even',this.oddOrEven(theNo))
                var isEvenOdd=this.oddOrEven(theNo)
                //4fabcf
                 return(
                    <div className={styles.chatItenDiv} key={index} onClick={()=>this.openMessages(item)}>
                        <div className={styles.imgDiv} style={{backgroundColor:isEvenOdd==='even'?'#4fabcf':'#5d6779'}}>
                       {item.profilePhoto!=='N/A'?<Image className={styles.theImg} src={theImg}  alt={'RAM User'} height={50} width={50} objectFit='fit'/>:
                       <p className={styles.acroP}>{item.acronym}</p>}
                        </div>
                        <div>
                          <div className={styles.nameDiv}>
                           <p className={styles.nameP}>{item.userName?item.userName:'John Keem'}</p>
                            </div>
                            <p className={styles.mesoP}>Click to send message</p>
                            
                               <div className={styles.addChat}>
                               <MdAddComment className={styles.chatIc}/>
                                </div>
                           
                        </div>
                    </div>)})}
                </div>
            </div>
        );
    }
}

export default Friends;