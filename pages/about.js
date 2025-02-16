import React, { Component } from 'react'
import style from "@/styles/About.module.scss";
import Exp from '../components/Home/Exp'
import Team from '../components/About/Team'
import Testimonials from '../components/Home/Testimonials'
class About extends Component {
  render() {
    return (
      <div className={style.mainCont}>
      <div className={style.container}>
        <div className={style.leftDiv}>
        <img className={style.img1} src='ram22.png'/>
        </div>
        <div className={style.rightDiv}>
         <p className={style.titleP}>A Few Words About Us</p>
         <p className={style.subTitleP}>RAM: Risk-Adjusted Madness</p>
         <li>What is RAM?</li>
         <p className={style.descP1}>A risk-weighted pick'em game that allows people from all circles to enjoy major sports events with newfound excitement. You'll never have so much fun rooting for the underdog. </p>
         <li>How does RAM work?</li>
         <p className={style.descP2}>Players get to make picks in each round of a major sports playoffs or a world famous tournament (as the event unfolds and independently of other rounds).  In this way, unlike a normal bracket contest - you won't lose interest if your top teams are eliminated in the early rounds.  This feature allows fans to adjust their views on the tournament as surprising teams emerge and more information unfolds between rounds.</p>
         <li>How do you win?</li>
         <p className={style.descP3}> Winning picks for each matchup are rewarded points relative to the risk a RAM tournament player is taking so you can selectively choose your underdog picks and favorites to have your optimal Fantasy Tournament experience. The points you earn are commensurate with the actual risks you take.</p>
         <li>What makes the madness 'Risk-Adjusted'?</li>
         <p className={style.descP3}>RAM Tournament players pick a winner of a game (or series of games) and then points are assigned via a weighted-points scoring approach.  For example, if the tournament was the NCAA Men's Basketball Tournament and you pick a 16-seed to win (and they actually did), then you would net around 76  RAM points for that one pick (versus around 1.2 RAM points for picking the 1-seed).  NOTE:  The first round of each RAM Tournament presents the best chance of scoring the greatest amount of points since there are the most choices to be made in that initial round.</p>
        </div>
      </div>
      <div className={style.container} id={style.container}>
        <div className={style.leftDiv}>
        <img className={style.img1} src='ram22.png'/>
        </div>
        <div className={style.rightDiv}>
         <p className={style.subTitleP}>More About Us</p>
         <li>There are phases to each RAM Tournament.</li>
         <p className={style.descP1}>If you fall behind others in your RAM Fantasy Tournament, then you could take more risk for more reward in the next phases of the tournament.</p>
         <li>Prizes are sweet and the Tournament is free.</li>
         <p className={style.descP2}>Prizes are sweet and the Tournament is free.  We are just trying to build a fun community!    For each RAM Tournament, we provide a physical trophy to the winner, and we recognize those in the Top 5, the best team name, as well as the "Top Flock" (see below) of the tournament.</p>
         <li>There can be only one!</li>
         <p className={style.descP3}>Ultimately, the player with the most points at the end of the event wins the RAM (Risk Adjusted Madness) Fantasy Tournament.  For a major tournament, the overall winner will receive "The RAMMY" - a unique one-of-a-kind trophy made especially for the RAM Champion - and for a minor tournament (e.g., the playoffs for a major U.S. sport), the prize is a custom "Round Winner Pint Glass" trophy.</p>
         <li>Create/join a flock with your friends and thrive in the herd together!</li>
         <p className={style.descP3}>After entering the tournament with this entry form here, you'll receive each entry form for each phase of the tournament.  With the first entry form, you will have an opportunity to note your "Flock".  Coordinate with your friends/colleagues to ensure you have the same name for your Flock, and you can see how your Flock is doing against others (compete together) and also how you are doing as a RAM against other RAMs in your flock (locking horns 1:1). </p>
        </div>
      </div>
      <Team/>
      <Testimonials/>
      </div>
    )
  }
}

export default About