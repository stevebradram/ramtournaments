import React, { Component } from 'react'
import style from './About.module.scss';
import Router,{useRouter,withRouter} from 'next/router'
class About extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.leftDiv}>
        <img className={style.img1} src='ram22.png'/>
        </div>
        <div className={style.rightDiv}>
         <p className={style.titleP}>A Few Words About Us</p>
         <p className={style.subTitleP}>RAM: Risk-Adjusted Madness</p>
         <p className={style.descP1}>RAM allows people from all circles to enjoy every round of major sports events with newfound excitement as you'll never have so much fun rooting for the underdogs.  It's the way your sports-viewing experience should be!  </p>
         <p className={style.descP2}>Players get to make picks in each round of a major sports playoffs or a world famous tournament (as the event unfolds and independently of other rounds).  In this way, unlike a normal bracket contest - you won't lose interest if your top teams are eliminated in the early rounds.  This feature allows fans to adjust their views on the tournament as surprising teams emerge and more information unfolds between rounds.</p>
         <p className={style.descP3}> Winning picks for each matchup are rewarded points relative to the risk a RAM tournament player is taking so you can selectively choose your underdog picks and favorites to have your optimal Fantasy Tournament experience. </p>
         <button onClick={()=>Router.push('/events')}>Read More</button>
        </div>
      </div>
    )
  }
}

export default About
