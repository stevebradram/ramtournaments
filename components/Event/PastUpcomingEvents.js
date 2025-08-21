import React, { Component } from 'react'
import style from './PastUpcomingEvents.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { SlOptionsVertical } from "react-icons/sl";
import dayjs from 'dayjs';
import firebase from '../FirebaseClient'
import { FaArrowAltCircleLeft,FaArrowAltCircleRight  } from "react-icons/fa";

class Reel extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        //this.state = { width:  window.innerWidth, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      state={
        theAdsArray:[],
        slidesToShow: 5,
        slidesToScroll: 5,
        theEventKey:this.props.theEventKey,
        isAdmin:false,
       
        theItemsNo:'',
        selectHomeEvent:false, 
        selectHomeEventId:'',
        showArrows:true,
       
      }
      componentDidMount(){
        this.setState({showArrows:false})
        if (typeof window !== "undefined") {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        }
        this.checkAuth()
        this.setState({theEventKey:this.props.theEventKey,selectHomeEvent:this.props.selectHomeEvent,selectHomeEventId:this.props.selectHomeEventId,theItemsNo:this.props.allGames.length})
       // console.log('this.props.allGames.length',this.props.allGames.length)
      }
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
      }
    
      updateWindowDimensions = () => {
        //console.log('widthhhhh',this.state.width)
        this.setState({ width: window.innerWidth});
       // return
        //console.log('this.state.theItemsNo',this.props.allGames.length)
       // this.setState({showArrows:false})
        return
        /*if (window.innerWidth<800) {this.setState({slidesToShow:1,slidesToScroll:1})
        }else{this.setState({slidesToShow:6,slidesToScroll:6})}*/
        var theGamesNo=this.props.allGames.length
        if (window.innerWidth>1300){
          if(this.state.theItemsNo>6){this.setState({showArrows:true}),showArrows=true}
          this.setState({slidesToShow:6,slidesToScroll:6})
          console.log('haaapa 1111',this.state.showArrows)
        }
        if (window.innerWidth>1100&&window.innerWidth<1300){
          if(theGamesNo>5){this.setState({showArrows:true}),showArrows=true}
          this.setState({slidesToShow:5,slidesToScroll:5})
          console.log('haaapa 2222',showArrows)
        }
        if (window.innerWidth>800&&window.innerWidth<1100){
          if(theGamesNo>4){this.setState({showArrows:true}),showArrows=true}
          this.setState({slidesToShow:4,slidesToScroll:4})
          console.log('haaapa 3333',this.state.showArrows)
        }
        if (window.innerWidth>600&&window.innerWidth<800){
          if(theGamesNo>3){this.setState({showArrows:true},showArrows=true)}
          this.setState({slidesToShow:3,slidesToScroll:3})
          console.log('haaapa 4444',this.state.showArrows)
        }
        if (window.innerWidth>400&&window.innerWidth<600){
          if(theGamesNo>2){this.setState({showArrows:true}),showArrows=true}
          this.setState({slidesToShow:2,slidesToScroll:2})
        }
        if (window.innerWidth>350&&window.innerWidth<400){
          if(theGamesNo>2){this.setState({showArrows:true}),showArrows=true}
          this.setState({slidesToShow:2,slidesToScroll:2})
        }
      };
      next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }
      checkAuth = () => {
        firebase.auth().onAuthStateChanged((user) => {
         if (user) {
           if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'||user.uid==='qXeqfrI5VNV7bPMkrzl0QsySmoi2'){
            this.setState({isAdmin:true}) 
           }
     }})}
    
     loadOtherFights=(theEventKey,theEventTitle,fetchResultsTimeUpdate,getEventsTimeUpdate,oddsTimeUpdate,theTime,sportType,currentSelection,endTime,stopEdits)=>{
      console.log('the iiittttttt',stopEdits)
      var nowDate=new Date().getTime(),isEventExpired=false
      if(nowDate>(endTime+86400000)){isEventExpired=true}
          else{this.setState({isEventExpired:false})}
      this.props.onClick(this.props.from,theEventKey,theEventTitle,fetchResultsTimeUpdate,getEventsTimeUpdate,oddsTimeUpdate,theTime,sportType,currentSelection,isEventExpired,endTime,stopEdits)
      this.setState({theEventKey})
     }
     chooseHomeEvent=(event,item,id)=>{
      event.stopPropagation()
      event.preventDefault()
      var todayInMillis=new Date().getTime()
      //if(todayInMillis+(86400000*90)<event.time)
      this.setState({selectHomeEvent:true,selectHomeEventId:id})
      }
      sendEvent=(event,data,id)=>{
        event.stopPropagation()
        event.preventDefault()
        data['id']=id
        var theDb=firebase.database().ref("/theEvents/eventToShowHomePage/")
        theDb.set(data,(error) => {
          if (error) {
            this.notify('An error occured while updating')
          }else{
            this.setState({selectHomeEvent:false})
            this.notify('Selected Succesfully')
          }
      })
    }
    render() {
        // console.log('this.props.allGames',this.props.allGames)
         let donateStyle=''
         let reelTextStyle=''
         var todayInMillis=new Date().getTime()
         
         var theGamesNo=this.props.allGames.length
         var showArrows=false,slidesToShow='',slidesToScroll=''
         if (typeof window !== "undefined") {
        if (window.innerWidth>1300){
          if(theGamesNo>6){showArrows=true}
          slidesToShow=6,slidesToScroll=6
          console.log('haaapa 1111',showArrows)
        }
        if (window.innerWidth>1100&&window.innerWidth<1300){
          if(theGamesNo>5){showArrows=true}
          slidesToShow=5,slidesToScroll=5
         // console.log('haaapa 2222',showArrows)
        }
        if (window.innerWidth>800&&window.innerWidth<1100){
          if(theGamesNo>4){showArrows=true}
          slidesToShow=4,slidesToScroll=4
          //console.log('haaapa 3333',showArrows)
        }
        if (window.innerWidth>600&&window.innerWidth<800){
          if(theGamesNo>3){showArrows=true}
          slidesToShow=3,slidesToScroll=3
          //console.log('haaapa 4444',showArrows)
        }
        if (window.innerWidth>400&&window.innerWidth<600){
          if(theGamesNo>2){showArrows=true}
          slidesToShow=2,slidesToScroll=2
          //console.log('haaapa 5555',showArrows)
        }
        if (window.innerWidth>350&&window.innerWidth<400){
          if(theGamesNo>2){showArrows=true}
          slidesToShow=2,slidesToScroll=2
          //console.log('haaapa 6666',showArrows)
        }
        if (window.innerWidth>300&&window.innerWidth<400){
          if(theGamesNo>2){showArrows=true}
          slidesToShow=2,slidesToScroll=2
          //console.log('haaapa 6666',showArrows)
        }
        if (window.innerWidth>250&&window.innerWidth<300){
          if(theGamesNo>2){showArrows=true}
          slidesToShow=2,slidesToScroll=2
          //console.log('haaapa 6666',showArrows)
        }
        if (window.innerWidth<250){
          if(theGamesNo>2){showArrows=true}
          slidesToShow=1,slidesToScroll=1
          //console.log('haaapa 6666',showArrows)
        }
      }
      
        
        const settings = { 
          infinite: true,
          slidesToShow:slidesToShow,
          slidesToScroll:slidesToScroll,
          className:"slides",
          dots: false,
          arrows:false,
          //fade: true,
          autoplay: true,
          color:'red',
          pauseOnHover: false,
    speed: 700,
    autoplaySpeed: 10000,
    cssEase: "linear",
      
          };
    var userGames=[],adminGames=[],allGames=[]
          this.props.allGames.map((item,index)=>{
            
            if((todayInMillis+(86400000*90)<item.time)&&!this.state.isAdmin){
              adminGames.push(item)
             // console.log('to the admins')
            }else{
             // console.log('to the users')
              adminGames.push(item)
              userGames.push(item)}
            if(this.props.allGames.length===index+1){
              if(this.state.isAdmin){
                allGames=adminGames
              }else{ allGames=userGames}
             
            }
          })     
        return (
            <div className={style.boduTitleMainCont}>
               <div className={style.boduTitleMainCont2}>
                {/*<h2 className={style.headP}>CUSTOMERS REVIEWS</h2>*/}
                <Slider ref={c => (this.slider = c)} {...settings}>
                  
                {allGames.map((item,index)=>{
                var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
                var theColor='#292f51',timing='Active Event'
                if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
                  theColor='#919191'
                  timing='Past Event'
                }
                if(this.state.theEventKey===item.id){
                  theColor='#CB1E31'
                }
              //  console.log('this.state.theEventKey',this.state.theEventKey)
                 return(
                       <div  className={style.titleDivCont} key={item.id}> 
                         <div className={style.testDiv}>
                      <div className={style.bodyLowerCard} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title,item.fetchResultsTimeUpdate,item.getEventsTimeUpdate,item.oddsTimeUpdate,item.time,item.sportType,item.currentSelection,item.endTime,item.stopEdits)}>
                      <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.isAdmin?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event,item,item.id)}/>
                {this.state.selectHomeEvent&&this.state.selectHomeEventId==item.id?<div className={style.selectHomeEventDiv} onClick={()=>this.setState({selectHomeEvent:false})}><button onClick={(event)=>this.sendEvent(event,item.theData,item.id)}>Make home event</button></div>:null}</>:null}  
                    </div> 
                        </div>
                       
                        
                       </div>
                )})}
                        
                </Slider></div>
                      {showArrows?<div className={style.arrowDiv}>
                        <FaArrowAltCircleLeft className={style.arrowIc} onClick={()=>this.previous()}/>
                        <FaArrowAltCircleRight className={style.arrowIc} onClick={()=>this.next()}/>
                        </div>:null}
            </div>
        )
    }
}
export default Reel
