import React, { Component } from 'react'
import style from './News.module.scss';
import ReactPlayer from 'react-player'
import firebase from '../FirebaseClient';
import {FaPlay} from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
class News extends Component {
    
    state={
        videoArray:[],
        currentId:'',
        isAdmin:false
    }

    componentDidMount(){
      this.fetchMusicVideos()
      this.checkAuth()
    }
       checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        //console.log('userIddddddd',userId)
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
          this.setState({ isAdmin: true })
        }}
    })
  }
    fetchMusicVideos=async()=>{
        var theRef=''
        try {
         theRef = firebase.database().ref('/videos/')//.orderByKey('videoNumber ');
          var array1=[]
          var array2=[],i=0
         await theRef.once('value', (dataSnapshot) => {
          var theCount = dataSnapshot.numChildren()
          dataSnapshot.forEach((data) => {
            i++
                const name = data.val().name
                const title = data.val().title
                const video= data.val().video
                const thumbnail= data.val().thumbnail
                const id =  data.val().id
                const videoNumber =  data.val().videoNumber
                //console.log("thumbnail", thumbnail)
                array1={
                    name: name, video: video, id:id, title:title, thumbnail:thumbnail,videoNumber:videoNumber
                }
                array2.push(array1)
                if(theCount===i){
                  array2=array2.sort(function(a, b){return b.videoNumber - a.videoNumber})
                  //console.log('rrrrra',array2)
                  this.setState({
                    videoArray:array2
                   })
                }

            })
          })
          //console.log('items', array2)
        } catch (error) {
          
        }
      }
      startvideo=(id)=>{
        //console.log("id", id)
        this.setState({
            currentId:id
        })
        
      }
      deleteVideo=(id)=>{
        var theDb = firebase.database().ref('/videos/')
        theDb.child(id).set(null)
        this.setState((prevState) => ({
        videoArray: prevState.videoArray.filter(item => item.id !== id)
        }));
        this.notify('Deleted successfully');
      }
          notify = (message) => {
        toast.warn(message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    };
    render() {
        const videoList=this.state.videoArray.map((item,index)=>{
            let playerToShow=''
            if (item.video===this.state.currentId) {
                playerToShow=<ReactPlayer ref={(video) => { this.video = video }}
                className={style.listVidCont}
                width='100%'
                height='100%'
                playing={true}
                onPlay={console.log('ready to play')}
                controls url={item.video}
                key={index}/>
            } else {
                playerToShow=<div className={style.reactPlayerDiv2} style={{backgroundImage:"url(" + item.thumbnail + ")"}} onClick={()=>this.startvideo(item.video)} key={index}>
               <div className={style.playDiv}>
               <FaPlay className={style.playIC}/></div> 
             </div> 
            }
            return(
                <div  className={style.reactPlayerDiv} key={index}>
                    <div  className={style.reactPlayerDiv3} >
                    {playerToShow}
                    {this.state.isAdmin?<div  className={style.editDiv}>
                    <p>{item.videoNumber}</p>
                    <div  className={style.deleteDiv} onClick={()=>this.deleteVideo(item.id)}><MdDeleteOutline /></div>
                </div>:null}
                    </div>
                <p className={style.artTitle}>{item.title}</p>
              
                </div>
               
            )})
        return (
            <><div className={style.container}>
                 {videoList}
                 
            </div><ToastContainer/></>
        )
    }
}

export default News