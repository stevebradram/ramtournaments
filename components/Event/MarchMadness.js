import React, { Component } from 'react'
import style from "./MarchMadness.module.scss";
import { ToastContainer, toast } from 'react-toastify';
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
    state={firstFourDate:'',showCreateEventModal:false,round1:'',round1Err:'Date must be filled',round2:'',round2Err:'Date must be filled',sweet16:'',sweet16Err:'Date must be filled',elite8:'',elite8Err:'Date must be filled',final4:'',final4Err:'Date must be filled',final:'',finalErr:'Date must be filled'}
    inputChange = async (e) => {
      var value = e.target.value
      await this.setState({[e.target.id]: value})
      if (this.state.round1.length>=3){this.setState({round1Err:''})}
      if (this.state.round2.length>=3){this.setState({round2Err:''})}
      if (this.state.sweet16.length>=3){this.setState({sweet16Err:''})}
      if (this.state.elite8.length>=3){this.setState({elite8Err:''})}
      if (this.state.final4.length>=3){this.setState({final4Err:''})}
      if (this.state.final.length>=3){this.setState({finalErr:''})}
    }
    createEvent=()=>{
      if (this.state.round1.length<1||this.state.round2.length<1||this.state.sweet16.length<1||
        this.state.elite8.length<1||this.state.final4.length<1||this.state.final.length<1
      ){
        this.notify('All fields must be filled')
      }else{
        this.notify('Send successfully')
      }
    }
    notify=(message)=>{
      toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    render() {
    return (
      <>
      <div>
         <div className={style.noEventDiv}>
         <p>No event to show at the moment</p>
         <button>Create Event</button>
         </div>
         {this.state.showCreateEventModal?<div className={style.modal}>
         <div className={style.createEventDiv}>
            <p className={style.eventHeadP}>Create March Madness Event</p>
            <p className={style.eventTitleP}>Enter Round 1 Start Date/Time</p>
            <input  className={style.eventInput} id='round1' placeholder='Enter your RAM name' type='date'  value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>{this.state.round1Err}</p>
            <p className={style.eventTitleP}>Enter Round 2 Start Date/Time</p>
            <input  className={style.eventInput} id='round2' placeholder='Enter your RAM name' type='date'  value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>{this.state.round2Err}</p>
            <p className={style.eventTitleP}>Enter Sweet 16 Start Date/Time</p>
            <input  className={style.eventInput} id='sweet16' placeholder='Enter your RAM name' type='date'  value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>{this.state.sweet16Err}</p>
            <p className={style.eventTitleP}>Enter Elite 8 Start Date/Time</p>
            <input  className={style.eventInput} id='elite8' placeholder='Enter your RAM name' type='date'  value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>{this.state.elite8Err}</p>
            <p className={style.eventTitleP}>Enter Final 4 Start Date/Time</p>
            <input  className={style.eventInput} id='final4' placeholder='Enter your RAM name' type='date'  value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>{this.state.final4Err}</p>
            <p className={style.eventTitleP}>Enter National Championship Start Date/Time</p>
            <input  className={style.eventInput} id='final' placeholder='Enter your RAM name' type='date'  value={this.state.firstFourDate} onChange={(event)=>this.inputChange(event)}></input> 
            <p className={style.eventErrorP}>{this.state.finalErr}</p>
            <button className={style.submitBtn} onClick={()=>this.createEvent()}>Create Event</button>
         </div>
         </div>:null}
      </div>
      <ToastContainer />
      </>
    )
  }
}

export default MarchMadness