import React, { Component } from 'react'
import style from './HowToPlay.module.scss';
import { MdAddBox } from "react-icons/md";

const theTopics=[
    {id:1,name:'P. Mahome',tit1:'CK - QB', title:'Pick Your Event',subTitle:"RAM allows you to engage in the world's greatest sport events, including UFC fight nights, college basketball's March Madness, NFL football playoffs, and soccer's World Cup.", image:'ram21.png'},
    {id:2,name:'L. Jackson',tit1:'BAL - QB',title:'See Sports Scoring Updates',subTitle:"Scoring updates allow you to stay plugged in with the best sports events and compete against friends on who you think will win.", image:'ram17.png'},
    {id:3,name:'L. Jackson',tit1:'BAL - QB',title:'Win Cool Prizes',subTitle:"Get cool RAM gear and recognition for being the top of the herd when you win events.", image:'ram16.webp'},
    ]
class HowToPlay extends Component {
    render() {
        return (
            <div className={style.container}>
                <p className={style.header1P}>How to Play RAM</p>
                <p className={style.header2P}>It's easier than you think. Follow the below steps</p>
                <div className={style.cardCont}>
                {theTopics.map((item,index)=>{
                    var icon=<MdAddBox className={style.addIC}/>
                     return(
                    <div className={style.listDiv} key={index}>
                        <div className={style.imgCont}>
                        <div className={style.imgDiv1}>
                        <div className={style.imgDiv2}>
                        <img className={style.img1} src={item.image}/>
                        </div>
                        </div></div>
                    <div><p className={style.detP1}>{item.title}</p>
                    <p className={style.detP2}>{item.subTitle}</p></div>
                   </div>
                )})}
                </div>
            </div>
        )
    }
}

export default HowToPlay
