import React, { Component } from 'react'
import style from "./MarchMadness.module.scss";
const first4 = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First 4' },
    {id:'2',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First 4' },
    {id:'3',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First 4' },
    {id:'4',time: '', timeInMillis: '',player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'First 4' },
  ]
const round1 = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 1' },
    {id:'2',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 1' },
    {id:'3',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 1' },
    {id:'4',time: '', timeInMillis: '',player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 1' },
  ]
  const round2 = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 2' },
    {id:'2',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 2' },
  ]
  const round3 = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Round 3' },
  ]
  const elite8 = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Elite 8' },
    {id:'2',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Elite 8' },
    {id:'3',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Elite 8' },
    {id:'4',time: '', timeInMillis: '',player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Elite 8' },
  ]
  const final4 = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Final 4' },
    {id:'2',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'Final 4' },
  ]
  const nationalChampionship = [
    {id:'1',time: '', timeInMillis:'', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: '', status1: '', status2: '', commenceTime: '', bet: '', winner: '', matchType: 'National Championship' },
  ]
class MarchMadness extends Component {
    state={firstFourDate:'',showCreateEventModal:false}
  render() {
    return (
      <div>
         <div className={style.noEventDiv}>
         <p>No event to show at the moment</p>
         <button>Create Event</button>
         </div>
         {this.state.showCreateEventModal?<div className={style.modal}>
         <div className={style.createEventDiv}>
            <p>Create March Madness Event</p>
            {/*firstFourDate:''*/}
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <p className={style.eventTitleP}>Enter First Four Start Date</p>
            <input  className={style.eventInput} placeholder='Enter your RAM name' type='date' id='firstFourDate' value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>Date must be filled</p>
            <button className={style.submitBtn}>Create Event</button>
         </div>
         </div>:null}
      </div>
    )
  }
}

export default MarchMadness