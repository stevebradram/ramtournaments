import React, { Component } from 'react'
import style from './Results.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";

const theTopics=[
    {id:3,name:'Justin Jefferson',stat:'player', game:'NFL',points:'49.50',status:'+10.20', team:'Washington Footbal Team',subTitle:"Investing in sports is the future & I look forward to seeing how RAM will continue to innovate way we follow sports.", image:'https://images.pexels.com/photos/13311682/pexels-photo-13311682.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {id:1,name:'Chris Jones',game:'NFL',points:'36.20',status:'-8.20',team:'Kansas City Chiefs',subTitle:"RAM is the future of daily fantasy! Trade teams like stocks, build your portfolio, and dominate the competition.", image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08KUrlIGe0BBpM_pKqFKoTMPNJF42M5n9Sw&s'},
    {id:4,name:'Michael Jones',game:'NBA',points:'52.50',status:'+16.30',team:'Chicago Bulls', subTitle:"RAM is the future of daily fantasy! Trade teams like stocks, build your portfolio, and dominate the competition.", image:'https://images.pexels.com/photos/267761/pexels-photo-267761.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {id:2,name:'Fred Tucker',game:'NBA',points:'26.60',status:'-25.19',team:'Los Angeles Lakers',subTitle:"It is a great idea. It's a ton of fun and I found myself caring about the results of games that didn't actually happen.", image:'https://images.pexels.com/photos/2834918/pexels-photo-2834918.jpeg?auto=compress&cs=tinysrgb&w=600'},
    ]
    const standings=[
      {id:1,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:2,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:3,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:4,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:5,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:6,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:7,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:8,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'},
      {id:10,name:'Cleveland Cavaliers',win:'3',loss:'0',pct:'-',home:'1-0',away:'2-0',div:'1-0',conf:'3-0'}]
    var image1='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08KUrlIGe0BBpM_pKqFKoTMPNJF42M5n9Sw&s'
class Results extends Component {
  state={
    theAdsArray:[],
    slidesToShow: 3,
    slidesToScroll: 2,
    theMenu:'players'
  }
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
      }
      componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
      
      }
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
      }
    
      updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
        if (window.innerWidth>900) {this.setState({slidesToShow:3,slidesToScroll:3});return}
        if (window.innerWidth<600) {this.setState({slidesToShow:1,slidesToScroll:1});return}
        if (window.innerWidth<900) {this.setState({slidesToShow:2,slidesToScroll:2});return}
        
        
        
        //}else{this.setState({slidesToShow:3,slidesToScroll:3})}
      };
      next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }
     
    
    render() {
         let donateStyle=''
         let reelTextStyle=''
        const settings = { 
          infinite: true,
          slidesToShow:this.state.slidesToShow,
          slidesToScroll:this.state.slidesToScroll,
          className:"slides",
          dots: true,
          //fade: true,
          autoplay: true,
          pauseOnHover: false,
    speed: 700,
    autoplaySpeed: 5000,
    cssEase: "linear",
      
          };
        return (
            <div className={style.container}>
                {/*<h2 className={style.headP}>Events</h2>
                <p className={style.headP2}>What Rammers Say About Us</p>*/}
                <p className={style.eveP}>Current Event: <span>Basketball</span></p>
                <div className={style.eveDiv}>
                  <p id={this.state.theMenu==='players'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'players'})}>Players</p>
                  <p id={this.state.theMenu==='games'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'games'})}>Games</p>
                  <p id={this.state.theMenu==='standing'?style.playerP2:style.playerP} onClick={()=>this.setState({theMenu:'standing'})}>Standings</p>
                </div>
                <Slider ref={c => (this.slider = c)} {...settings}>                
                {theTopics.map((item)=>{
                  var theColor=''
                  var status=item.status
                  if(status.includes('-')){theColor='red'}else{theColor='#0cc27c'}
                 //var theTitle=item.title.split('-')
                 return(
                       <div  className={style.titleDivCont} key={item.id}>    
                      <div className={style.testDiv}>
                      {this.state.theMenu==='players'?<><div className={style.leftDiv}>
                      <div className={style.leftDiv1}>
                      <div className={style.leftDiv2}>
                        <img className={style.theImg} src={item.image} alt='Products Image'></img>
                      <p className={style.gameP}>{item.game}</p>
                      </div>
                      </div>
                      </div>
                      <div className={style.rightDiv}>
                      <div className={style.rightDivUpper}>
                      <p className={style.nameP}>{item.name}</p>
                      <p className={style.placeP}>{item.team}</p>
                      </div>
                      <div className={style.rightDivLower}>
                        <p className={style.pointsP}># {item.points}</p>
                        <div className={style.statDiv}>
                        <p className={style.statP} style={{color:theColor}}>{item.status}</p>
                        <TiArrowSortedDown className={style.downIc} style={{color:theColor}}/>
                        </div>
                        
                      </div>
                      </div></>:null}
                     
                     {this.state.theMenu==='games'?<div className={style.theCont0}>
                      <div className={style.theCont01}>
                        <p>NBA</p>
                        <p>Round of 16</p>
                      </div>
                      <div className={style.theCont}>
                      <div className={style.theContLeft}>
                      <img className={style.theImg1} src={image1} alt='Products Image'></img>
                      <p className={style.P1}>New York Knicks</p>
                      <p className={style.P2}>Score: <span>86</span></p>
                      {/*<p className={style.P3}>86</p>*/}
                      </div>
                      <BsFillLightningFill className={style.sepIc}/>
                      <div className={style.theContRight}>
                      <img className={style.theImg1} src={image1} alt='Products Image'></img>
                      <p className={style.P1}>New York Knicks</p>
                      <p className={style.P2}>Score: <span>86</span></p>
                      {/*<p>86</p>*/}
                      </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p>November 14, 2024</p>
                        <p>02:00 PM</p>
                      </div>
                      </div>:null}
                      </div>
                        </div>
                       
                )})}

                </Slider>
                <div className={style.pastDiv}><button className={style.pastBtn}>View All Events</button></div>

            </div>
        )
    }
}
export default Results
