import React, { Component } from 'react'
import style from './PastUpcomingEvents.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { SlOptionsVertical } from "react-icons/sl";
import dayjs from 'dayjs';
import firebase from '../FirebaseClient'
class Reel extends Component {
  state={
    theAdsArray:[],
    slidesToShow: 5,
    slidesToScroll: 5,
    theEventKey:this.props.theEventKey,
    isAdmin:false,
    selectHomeEvent:false, selectHomeEventId:''
  }
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
      }
      componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.checkAuth()
        this.setState({theEventKey:this.props.theEventKey,selectHomeEvent:this.props.selectHomeEvent,selectHomeEventId:this.props.selectHomeEventId})
      
      }
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
      }
    
      updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
        /*if (window.innerWidth<800) {this.setState({slidesToShow:1,slidesToScroll:1})
        }else{this.setState({slidesToShow:6,slidesToScroll:6})}*/
        if (window.innerWidth>1300){
          this.setState({slidesToShow:6,slidesToScroll:6})
        }
        if (window.innerWidth>1100&&window.innerWidth<1300){
          this.setState({slidesToShow:5,slidesToScroll:5})
        }
        if (window.innerWidth>800&&window.innerWidth<1100){
          this.setState({slidesToShow:4,slidesToScroll:4})
        }
        if (window.innerWidth>600&&window.innerWidth<800){
          this.setState({slidesToShow:3,slidesToScroll:3})
        }
        if (window.innerWidth>400&&window.innerWidth<600){
          this.setState({slidesToShow:2,slidesToScroll:2})
        }
        if (window.innerWidth>350&&window.innerWidth<400){
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
           if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
            this.setState({isAdmin:true}) 
           }
     }})}
    
    render() {
         let donateStyle=''
         let reelTextStyle=''
         var todayInMillis=new Date().getTime()
        const settings = { 
          infinite: true,
          slidesToShow:this.state.slidesToShow,
          slidesToScroll:this.state.slidesToScroll,
          className:"slides",
          dots: false,
          //fade: true,
          autoplay: true,
          pauseOnHover: false,
    speed: 700,
    autoplaySpeed: 5000,
    cssEase: "linear",
      
          };
        return (
            <div className={style.boduTitleMainCont}>
                {/*<h2 className={style.headP}>CUSTOMERS REVIEWS</h2>*/}
                <Slider ref={c => (this.slider = c)} {...settings}>
                  
                {this.props.allGames.map((item,index)=>{
                var eventTime = dayjs(item.endTime).format('DD MMM YYYY')
                var theColor='#292f51',timing='Active Event'
                if(item.endTime<todayInMillis&&(item.endTime-todayInMillis)<-86400000){
                  theColor='#919191'
                  timing='Past Event'
                }
                if(this.state.theEventKey===item.id){
                  theColor='#CB1E31'
                }
                console.log('this.state.theEventKey',this.state.theEventKey)
                 return(
                       <div  className={style.titleDivCont} key={item.id}> 
                         <div className={style.testDiv}>
                      <div className={style.bodyLowerCard} key={index} style={{color:theColor,borderColor:theColor}}  onClick={()=>this.loadOtherFights(item.id,item.title,item.fetchResultsTimeUpdate,item.getEventsTimeUpdate,item.oddsTimeUpdate,item.time)}>
                      <div><p className={style.headListP1}>{item.title}</p>
               <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
               <p style={{marginLeft:2,marginRight:2}}>-</p>
               <p className={style.headListP3}>{timing}</p></div></div>
               {this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||this.state.userId==='zZTNto5p3XVSLYeovAwWXHjvkN43'||this.state.userId==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'?<><SlOptionsVertical onClick={(event)=>this.chooseHomeEvent(event,item.id)}/>
                {this.state.selectHomeEvent&&this.state.selectHomeEventId==item.id?<div className={style.selectHomeEventDiv} onClick={()=>this.setState({selectHomeEvent:false})}><button onClick={(event)=>this.sendEvent(event,item.theData,item.id)}>Make home event</button></div>:null}</>:null}  
                    </div> 
                        </div>
                       </div>
                )})}

                </Slider>
                
            </div>
        )
    }
}
export default Reel
