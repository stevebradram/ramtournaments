import React, { Component } from 'react'
import style from './News.module.scss';
import ReactPlayer from 'react-player'
import firebase from '../FirebaseClient';
import {FaPlay} from 'react-icons/fa';
class News extends Component {
    
    state={
        videoArray:[],
        currentId:''
    }

    componentDidMount(){
      this.fetchMusicVideos()
    }

    fetchMusicVideos=async()=>{
        var theRef=''
        try {
         theRef = firebase.database().ref('/videos/');
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
                const id = data.key
                console.log("thumbnail", thumbnail)
                array1={
                    name: name, video: video, id:id, title:title, thumbnail:thumbnail
                }
                array2.push(array1)
                if(theCount===i){
                  this.setState({
                    videoArray:array2
                   })
                }

            })
          })
          console.log('items', array2)
        } catch (error) {
          
        }
      }
      startvideo=(id)=>{
        console.log("id", id)
        this.setState({
            currentId:id
        })
        
      }
    render() {
        const videoList=this.state.videoArray.slice(0,this.props.vidCount).map((item,index)=>{
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
                    </div>
                <p className={style.artTitle}>{item.title}</p>
                </div>
               
            )})
        return (
            <div className={style.container}>
                 {videoList}
                 
            </div>
        )
    }
}

export default News