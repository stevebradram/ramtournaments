import React, { Component } from 'react'
import style from './Team.module.scss';
import { MdAddBox } from "react-icons/md";

const theTopics=[
    {id:1,name:'Steve',tit1:'CK - QB', title:'Pick your team/player',subTitle:"RAM is the future of daily fantasy! Trade teams like stocks, build your portfolio, and dominate the competition.", image:'https://firebasestorage.googleapis.com/v0/b/ramtournamentsweb.firebasestorage.app/o/profileImages%2FSteve%20photo.jpg?alt=media&token=ed7050fe-d5c2-4845-aa2f-1a87ba535f8e'},
    {id:2,name:'Brad',tit1:'BAL - QB',title:'Follow up on their perfomance',subTitle:"It is a great idea. It's a ton of fun and I found myself caring about the results of games that didn't actually happen.", image:'https://firebasestorage.googleapis.com/v0/b/ramtournamentsweb.firebasestorage.app/o/profileImages%2FBrad%20photo.jpg?alt=media&token=59a82336-97ad-4259-a792-224e3783b1fa'},
    ]
class HowToPlay extends Component {
    render() {
        return (
            <div className={style.container}>
                <p className={style.header2P}>Meet the team</p>
                <p className={style.header1P}>RAM TEAM</p>
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
                         {/*<img className={style.img1} src={item.image}/>*/}
                    {/*<div className={style.headDiv} id={style.headDiv}>
                       
                        {icon}
                        <img className={style.img1} src={item.image}/>
                        <div className={style.headLowerDiv}>
                            <p className={style.nameP}>{item.name}</p>
                            <p className={style.titP}>{item.tit1}</p>
                        </div>
                    </div>
                    <div className={style.headDiv} id={style.headDiv2}>
                        {icon}
                        <img className={style.img1} src={item.image}/>
                        <div className={style.headLowerDiv}>
                            <p className={style.nameP}>{item.name}</p>
                            <p className={style.titP}>{item.tit1}</p>
                        </div>
                    </div>*/}
                    <p className={style.detP1}>{item.name}</p>
                    <p className={style.detP2}>Co-Founder</p>
                   </div>
                )})}
                </div>
            </div>
        )
    }
}

export default HowToPlay
