import React, { Component } from 'react'
import style from "./MarchMadness.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import firebase from '../FirebaseClient'
const round1 = [
  { id: 'round1A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
  { id: 'round1D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
]
const round2 = [
  { id: 'round2A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
]
const sweet16 = [
  { id: 'sweet16A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 3' },
]
const elite8 = [
  { id: 'elite8A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Elite 8' },
  { id: 'elite8B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Elite 8' },
  { id: 'elite8C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Elite 8' },
  { id: 'elite8D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Elite 8' },
]
const final4 = [
  { id: 'final4A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Final 4' },
  { id: 'final4B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Final 4' },
]
const nationalChampionship = [
  { id: 'nationalChampionship1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'National Championship' },
]
class MarchMadness extends Component {
  state = { firstFourDate: '', showCreateEventModal:false, round1: '2025-03-20T00:00', round1Err: 'Date must be filled', round2: '', round2Err: 'Date must be filled', sweet16: '', sweet16Err: 'Date must be filled', elite8: '', elite8Err: 'Date must be filled', final4: '', final4Err: 'Date must be filled', final: '', finalErr: 'Date must be filled' }
  inputChange = async (e) => {

    var value = e.target.value
    await this.setState({ [e.target.id]: value })
    if (this.state.round1.length >= 3) { this.setState({ round1Err: '' }) }
    if (this.state.round2.length >= 3) { this.setState({ round2Err: '' }) }
    if (this.state.sweet16.length >= 3) { this.setState({ sweet16Err: '' }) }
    if (this.state.elite8.length >= 3) { this.setState({ elite8Err: '' }) }
    if (this.state.final4.length >= 3) { this.setState({ final4Err: '' }) }
    if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) }
  }
  onChange = async (e) => {

    var value = e.target.value
  }
  createEvent = () => {
    var round1Arr = {}, round2Arr = {}, sweet16Arr = {}, elite8Arr = {}, final4Arr = {}, finalArr = {}

    console.log('round1 length', round1.length)
    var eventKey = 'marchMadness' + new Date().getFullYear()
    var eventTitle = 'March Madness' + new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents/NCAAB/' + eventKey)

    round1.map((item, index) => {
      round1[index]['timeInMillis'] = new Date(this.state.round1).getTime()
      round1[index]['commenceTime'] = this.state.round1
      round1[index]['time'] = this.state.round1
      round1Arr[item.id] = item
      if (round1.length === index + 1) {
        generalDb.child('round1').update(round1Arr)
      }
    })


    round2.map((item, index) => {
      round2[index]['timeInMillis'] = new Date(this.state.round2).getTime()
      round2[index]['commenceTime'] = this.state.round2
      round2[index]['time'] = this.state.round2
      round2Arr[item.id] = item
      if (round2.length === index + 1) {
        generalDb.child('round2').update(round2Arr)
      }
    })

    sweet16.map((item, index) => {
      sweet16[index]['timeInMillis'] = new Date(this.state.sweet16).getTime()
      sweet16[index]['commenceTime'] = this.state.sweet16
      sweet16[index]['time'] = this.state.sweet16
      sweet16Arr[item.id] = item
      if (sweet16.length === index + 1) {
        generalDb.child('sweet16').update(sweet16Arr)
      }
    })

    elite8.map((item, index) => {
      elite8[index]['timeInMillis'] = new Date(this.state.elite8).getTime()
      elite8[index]['commenceTime'] = this.state.elite8
      elite8[index]['time'] = this.state.elite8
      elite8Arr[item.id] = item
      if (elite8.length === index + 1) {
        generalDb.child('elite8').update(elite8Arr)
      }
    })

    final4.map((item, index) => {
      final4[index]['timeInMillis'] = new Date(this.state.final4).getTime()
      final4[index]['commenceTime'] = this.state.final4
      final4[index]['time'] = this.state.final4
      final4Arr[item.id] = item
      if (final4.length === index + 1) {
        generalDb.child('final4').update(final4Arr)
      }
    })

      nationalChampionship.map((item, index) => {
      nationalChampionship[index]['timeInMillis'] = new Date(this.state.final).getTime()
      nationalChampionship[index]['commenceTime'] = this.state.final
      nationalChampionship[index]['time'] = this.state.final
      finalArr[item.id] = item
      if (nationalChampionship.length === index + 1) {
        generalDb.child('nationalChampionship').update(finalArr(error => {
          if (error) {
            this.notify('An error occured while creating event, try again')
          } else {
            this.notify('Event created successfully')
            var toTheEventsIds = { time:new Date(this.state.round1).getTime(), title:eventTitle, sportType:'NCAAB', endTime:new Date(this.state.final).getTime(), getEventsTimeUpdate: new Date().getTime() }
            var editDbRef=firebase.database().ref('/theEvents/eventsIds/'+eventKey+'/')
            var editDbRef2=firebase.database().ref('/theEvents/NFL/eventsIds/'+eventKey+'/')
            editDbRef.set(toTheEventsIds)
            editDbRef2.set(toTheEventsIds)
          }
        }))
      }
    })
    console.log('this.state.round1', this.state.round1)
    console.log('this.state.round2', this.state.round2)
    console.log('this.state.sweet16', this.state.sweet16)
    console.log('this.state.elite8', this.state.elite8)
    console.log('this.state.final4', this.state.final4)
    console.log('this.state.final', this.state.final)
    if (this.state.round1.length >= 3) { this.setState({ round1Err: '' }) } else { this.setState({ round1Err: 'Date must be filled' }) }
    if (this.state.round2.length >= 3) { this.setState({ round2Err: '' }) } else { this.setState({ round2Err: 'Date must be filled' }) }
    if (this.state.sweet16.length >= 3) { this.setState({ sweet16Err: '' }) } else { this.setState({ sweet16Err: 'Date must be filled' }) }
    if (this.state.elite8.length >= 3) { this.setState({ elite8Err: '' }) } else { this.setState({ elite8Err: 'Date must be filled' }) }
    if (this.state.final4.length >= 3) { this.setState({ final4Err: '' }) } else { this.setState({ final4Err: 'Date must be filled' }) }
    if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) } else { this.setState({ finalErr: 'Date must be filled' }) }
    if (this.state.round1.length < 1 || this.state.round2.length < 1 || this.state.sweet16.length < 1 ||
      this.state.elite8.length < 1 || this.state.final4.length < 1 || this.state.final.length < 1
    ) {
      this.notify('All fields must be filled')
    } else {
      this.notify('Send successfully')

    }
  }
  notify = (message) => {
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
          {this.state.showCreateEventModal ? <div className={style.modal}>
            <div className={style.createEventDiv}>
              <p className={style.eventHeadP}>Create March Madness Event</p>
              <p className={style.eventTitleP}>Enter Round 1 Start Date/Time</p>
              {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
              <input className={style.eventInput} id='round1' placeholder='Enter your RAM name' type='datetime-local' value={this.state.round1} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.round1Err}</p>
              <p className={style.eventTitleP}>Enter Round 2 Start Date/Time</p>
              <input className={style.eventInput} id='round2' placeholder='Enter your RAM name' type='datetime-local' value={this.state.round2} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.round2Err}</p>
              <p className={style.eventTitleP}>Enter Sweet 16 Start Date/Time</p>
              <input className={style.eventInput} id='sweet16' placeholder='Enter your RAM name' type='datetime-local' value={this.state.sweet16} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.sweet16Err}</p>
              <p className={style.eventTitleP}>Enter Elite 8 Start Date/Time</p>
              <input className={style.eventInput} id='elite8' placeholder='Enter your RAM name' type='datetime-local' value={this.state.elite8} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.elite8Err}</p>
              <p className={style.eventTitleP}>Enter Final 4 Start Date/Time</p>
              <input className={style.eventInput} id='final4' placeholder='Enter your RAM name' type='datetime-local' value={this.state.final4} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.final4Err}</p>
              <p className={style.eventTitleP}>Enter National Championship Start Date/Time</p>
              <input className={style.eventInput} id='final' placeholder='Enter your RAM name' type='datetime-local' value={this.state.final} onChange={(event) => this.inputChange(event)}></input>
              <p className={style.eventErrorP}>{this.state.finalErr}</p>
              <button className={style.submitBtn} onClick={() => this.createEvent()}>Create Event</button>
            </div>
          </div> : null}
        </div>
        <ToastContainer />
      </>
    )
  }
}

export default MarchMadness