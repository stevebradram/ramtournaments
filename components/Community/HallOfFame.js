import React, { Component } from 'react'
import style from './HallOfFame.module.scss';
import firebase from '../FirebaseClient'

class HallOfFame extends Component {
  state={nflArr:[],ncaafArr:[],ncaabArr:[],fifaArr:[]}
  componentDidMount=()=>{
    this.getData()
  }
  getData=()=>{
    var hallOfFameRef = firebase.database().ref('/hallOfFame/')
    var theItems=[],i=0
    var nflArr=[],ncaafArr=[],ncaabArr=[],fifaArr=[]
    hallOfFameRef.once('value', dataSnapshot => {
        var count = dataSnapshot.numChildren()
        dataSnapshot.forEach((data) => {
          i++
          theItems.push(data.val())
          if(count===i){
            theItems.map((item,index)=>{
              if(item.sportType==='NCAAB'){ncaabArr.push(item)}
              if(item.sportType==='NCAAF'){ncaafArr.push(item)}
              if(item.sportType==='FIFA'){fifaArr.push(item)}
              if(item.sportType==='NFL'){nflArr.push(item)}
              if(theItems.length===index+1){
                this.setState({nflArr,ncaafArr,ncaabArr,fifaArr})
              }
              })
          }
        })
      })
  }
  render() {
    return (
      <div className={style.container}>
        <h2>THE LEGEND OF "RAMMY"</h2>
        <div className={style.mainDiv}>
        <div className={style.leftDiv}>
         <h3>MAJOR TOURNAMENTS</h3>
         <h4>NCAA MARCH MADNESS TOURNAMENT</h4>
         {this.state.ncaabArr.map((item,index)=>{
          return(
            <div className={style.listDiv} key={index}>
              <p><span className={style.span1}>{item.year}</span><span className={style.span2}>{' | '+item.flockName}</span><span className={style.span3}>{item.points+' (pts)'}</span><span className={style.span4}>{' - '+item.win}</span></p>
            </div>
          )
         })}
         <h4>FIFA WORLD CUP</h4>
         {this.state.fifaArr.map((item,index)=>{
          return(
            <div className={style.listDiv}  key={index}>
              <p><span className={style.span1}>{item.year}</span><span className={style.span2}>{' | '+item.flockName}</span><span className={style.span3}>{item.points+' (pts)'}</span><span className={style.span4}>{' - '+item.win}</span></p>
            </div>
          )
         })}
         <h3>COMPETITIONS</h3>
         <h4>NHL PLAYOFFS COMPETITION</h4>
         {this.state.ncaafArr.map((item,index)=>{
          return(
            <div className={style.listDiv}  key={index}>
              <p><span className={style.span1}>{item.year}</span><span className={style.span2}>{' | '+item.flockName}</span><span className={style.span3}>{item.points+' (pts)'}</span><span className={style.span4}>{' - '+item.win}</span></p>
            </div>
          )
         })}
         <h4>NFL PLAYOFFS COMPETITION</h4>
         {this.state.nflArr.map((item,index)=>{
          return(
            <div className={style.listDiv}  key={index}>
              <p><span className={style.span1}>{item.year}</span><span className={style.span2}>{' | '+item.flockName}</span><span className={style.span3}>{item.points+' (pts)'}</span><span className={style.span4}>{' - '+item.win}</span></p>
            </div>
          )
         })}
        </div>
        <div className={style.rightDiv}>
        <h5>CLIMB TO THE TOP</h5>
        <p>The Rammy is our highest and most prestigious award. This is for a full tournament winner and takes cunning, analytics and luck.</p>
        <p>These are the traits required to be the Ram above all Rams. The legend of the "Rammy" requires that one Ram rises above the others to lead his flock and the herd to greatness. Through trials, tribulations and sacrifice, that Ram emerged victorious to show the sheep that followed a better way to consume sports tournaments for entertainment</p>
        <p>They say that once the iconic "Rammy" made it to the top of the mountain it never left the pinnacle again.</p>
        </div>
        </div>
        </div>
    )
  }
}

export default HallOfFame
