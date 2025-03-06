import React, { Component } from 'react'
import styles from "@/styles/Leaderboard.module.scss";
import firebase from '../components/FirebaseClient'
import { MdOutlineFolderOff } from "react-icons/md";
import { PiFolderDashedThin } from "react-icons/pi";
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
import Router from 'next/router';
class leaderboard extends Component {
  state={openModal:false,openModal2:false,openModal3:false,openModal4:false,theItems:[],isThereNullData:false,allGames:[],showProgressBar:false,isAdmin:false,theUsers:[],
    dataAvailable:false,sportType:'',theEventKey:'',theEventTitle:'',userLoggedIn:false,nullData:[],theEvent:'',theTime:'',isTherNormalData:false,eventStartTime:''}
  componentDidMount=()=>{
     //this.getScoreBoardData()
     this.showProgressBar()
     this.checkAuth()
     
  }
  checkAuth = () => {
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
        this.setState({isAdmin:true})
        this.getUsers()
       }else{
        Router.push('/events')
       }
    }else{
      Router.push('/events')
     }
   })
 }
 getUsers=async(userId)=>{
  //return
  var theUsers=[],i=0
  var userInfoDb=firebase.database().ref('/users/')//.orderByChild('userData')
  
  await  userInfoDb.once('value',dataSnapshot=>{
    var theCount=dataSnapshot.numChildren()
    var i=0
    dataSnapshot.forEach((data) => {
      i++
      var theD=data.val().userData
      if(!theD.name)return
      var theItem={name:theD.name,phone:theD.phoneNo,email:theD.email,created:theD.created}
      theUsers.push(theItem)
      if(theCount===i){
        console.log('the users',theUsers)
        var sortedArr=theUsers.sort(function(a, b){return b.created - a.created});
        this.setState({theUsers:sortedArr})
      }
    })
  })
 }
  notify=(message)=>{
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
  showProgressBar=()=>{
    this.setState({showProgressBar:true})
    this.timerHandle = setTimeout(
      () => this.setState({showProgressBar:false}), 
      2000)
  }
    render() {
     
        return (
          <>
      {this.state.isAdmin?<div className={styles.container}>
      <p className={styles.titleP} style={{marginBottom:40}}>RAM Users</p>
      <div className={styles.menu2Div1}>
      <div id={styles.table1Div}>
      <table className={styles.table1}>
        <tr id={styles.table1Tr1}>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No</th>
          <th>Joined</th>
        </tr>
        {this.state.theUsers.map((item, index) => {
          var created = dayjs(item.created).format('DD MMM YYYY')
          return (
            <tr key={index} id={styles.table1Tr2}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{created}</td>
            </tr>
            )
        })}
      </table>
      </div>
      </div></div>:null}
            </>
        )
    }
}

export default leaderboard
