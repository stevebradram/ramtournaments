import React, { Component } from 'react'
import style from './Testimonials.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {FaQuoteLeft,FaQuoteRight} from "react-icons/fa";
const theTopics=[
    {id:4,name:'Jeff',place:'Pittsburgh, PA',subTitle:"I like how RAM is set up.  It's a blend of a fantasy sport and a pick 'em, and I enjoy the strategy that it takes to win a tournament.", image:'https://images.pexels.com/photos/23879708/pexels-photo-23879708/free-photo-of-photo-of-a-tattooed-man-in-a-white-shirt-and-eyeglasses-posing-outside.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {id:2,name:'Dave',place:'New Brunswick, NJ', subTitle:"RAM gives you a whole new reason to watch big events and makes every underdog YOUR team!. Always an awesome experience.", image:'https://images.pexels.com/photos/5691039/pexels-photo-5691039.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {id:3,name:'Alex',place:'Boston, MA',subTitle:"RAM makes the best sporting events even better. The scoring methodology is spot on. Really raising the bar", image:'https://images.pexels.com/photos/12317475/pexels-photo-12317475.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {id:1,name:'Lucy ',place:'Miami, FL',subTitle:"I didn't follow sports before. RAM is easy to play, and I enjoy talking about March Madness and World Cup with my friends and family.", image:'https://images.pexels.com/photos/14208763/pexels-photo-14208763.jpeg?auto=compress&cs=tinysrgb&w=600'},
    ]
class Reel extends Component {
  state={
    theAdsArray:[],
    slidesToShow: 3,
    slidesToScroll: 2,
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
                <h2 className={style.headP}>Herd Testimonials</h2>
                <p className={style.headP2}>What RAM All Stars Say About Us</p>
                <Slider ref={c => (this.slider = c)} {...settings}>
                  
                {theTopics.map((item)=>{
                 //var theTitle=item.title.split('-')
                 return(
                       <div  className={style.titleDivCont} key={item.id}>    
                      <div className={style.testDiv}>
                      <h2 className={style.desc}><FaQuoteLeft className={style.quotA}/>{item.subTitle}<FaQuoteRight className={style.quotB}/></h2>
                      <div className={style.lowerCont}>
                     <img className={style.theImg} src={item.image} alt='Products Image'></img>
                     <div>
                       <p className={style.nameP}>{item.name}</p>
                       <p className={style.placeP}>{item.place}</p>
                     </div>
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
