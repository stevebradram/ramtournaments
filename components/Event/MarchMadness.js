import React, { Component } from 'react'
import style from "./MarchMadness.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineShare } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import Countdown from 'react-countdown';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { BsFillLightningFill } from "react-icons/bs";
import { TbCheckbox } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import DetailsModal from './MarchMadnessDetailsModal';
import EditDetails from './DetailsModalFlockSystem'
import MarchMadnessModal from './MarchMadnessModal'
import TheMarchMadness from '../LeaderBoards/TheMarchMadness'
import axios from "axios"
var thePoints = [{ seed: 1, val: 1.01 }, { seed: 2, val: 1.08 }, { seed: 3, val: 1.17 }, { seed: 4, val: 1.27 }, { seed: 5, val: 1.54 }, { seed: 6, val: 1.61 }, { seed: 7, val: 1.63 }, { seed: 8, val: 2.02 },
{ seed: 9, val: 1.95 }, { seed: 10, val: 2.58 }, { seed: 11, val: 2.62 }, { seed: 12, val: 2.86 }, { seed: 13, val: 4.75 }, { seed: 14, val: 6.91 }, { seed: 15, val: 13.81 }, { seed: 16, val: 76 }
]
const round1 = [
  { id: 'round1AEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '1', team2Seed: '16', matchType: 'Round 1' },
  { id: 'round1BEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '2', team2Seed: '15', matchType: 'Round 1' },
  { id: 'round1CEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '3', team2Seed: '14', matchType: 'Round 1' },
  { id: 'round1DEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '4', team2Seed: '13', matchType: 'Round 1' },
  { id: 'round1EEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '5', team2Seed: '12', matchType: 'Round 1' },
  { id: 'round1GEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '6', team2Seed: '11', matchType: 'Round 1' },
  { id: 'round1HEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '7', team2Seed: '10', matchType: 'Round 1' },
  { id: 'round1IEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '8', team2Seed: '9', matchType: 'Round 1' },
  { id: 'round1AWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '1', team2Seed: '16', matchType: 'Round 1' },
  { id: 'round1BWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '2', team2Seed: '15', matchType: 'Round 1' },
  { id: 'round1CWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '3', team2Seed: '14', matchType: 'Round 1' },
  { id: 'round1DWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '4', team2Seed: '13', matchType: 'Round 1' },
  { id: 'round1EWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '5', team2Seed: '12', matchType: 'Round 1' },
  { id: 'round1GWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '6', team2Seed: '11', matchType: 'Round 1' },
  { id: 'round1HWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '7', team2Seed: '10', matchType: 'Round 1' },
  { id: 'round1IWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '8', team2Seed: '9', matchType: 'Round 1' },
  { id: 'round1ASouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '1', team2Seed: '16', matchType: 'Round 1' },
  { id: 'round1BSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '2', team2Seed: '15', matchType: 'Round 1' },
  { id: 'round1CSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '3', team2Seed: '14', matchType: 'Round 1' },
  { id: 'round1DSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '4', team2Seed: '13', matchType: 'Round 1' },
  { id: 'round1ESouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '5', team2Seed: '12', matchType: 'Round 1' },
  { id: 'round1GSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '6', team2Seed: '11', matchType: 'Round 1' },
  { id: 'round1HSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '7', team2Seed: '10', matchType: 'Round 1' },
  { id: 'round1ISouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '8', team2Seed: '9', matchType: 'Round 1' },
  { id: 'round1AMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '1', team2Seed: '16', matchType: 'Round 1' },
  { id: 'round1BMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '2', team2Seed: '15', matchType: 'Round 1' },
  { id: 'round1CMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '3', team2Seed: '14', matchType: 'Round 1' },
  { id: 'round1DMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '4', team2Seed: '13', matchType: 'Round 1' },
  { id: 'round1EMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '5', team2Seed: '12', matchType: 'Round 1' },
  { id: 'round1GMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '6', team2Seed: '11', matchType: 'Round 1' },
  { id: 'round1HMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '7', team2Seed: '10', matchType: 'Round 1' },
  { id: 'round1IMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', team1Seed: '8', team2Seed: '9', matchType: 'Round 1' },
]
const round2 = [
  { id: 'round2AEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2BEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2CEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2DEast', place: 'east', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2AWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2BWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2CWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2DWest', place: 'west', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2ASouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2BSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2CSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2DSouth', place: 'south', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2AMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2BMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2CMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
  { id: 'round2DMidWest', place: 'midWest', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 2' },
]
const sweet16 = [
  { id: 'sweet16A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16E', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16F', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16G', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
  { id: 'sweet16H', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'NCAAB', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Sweet 16' },
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
  state = {
    firstFourDate: '', showCreateEventModal: false, round1: '', round1Err: 'Date must be filled', round2: '', round2Err: 'Date must be filled', sweet16: '', sweet16Err: 'Date must be filled', elite8: '', elite8Err: 'Date must be filled', final4: '', final4Err: 'Date must be filled', final: '',
    finalErr: 'Date must be filled', userId: '', userLoggedIn: false, isAdmin: false, allEvents: [], profilePhoto: '', noEventToShow: true, theRound1Arr: [], theRound2Arr: [], theSweet16Arr: [], theElite8Arr: [], theFinal4Arr: [], theChampionshipArr: [], theMenu: '', theItems: [], theSubMenu: 'round1', count: 0,
    eastRound1Arr: [], eastRound2Arr: [], eastSweet16Arr: [], eastElite8Arr: [], dataAvailable: false, currentEventUserInfo: {}, currentItems: [], westRound1Arr: [], westRound2Arr: [], westSweet16Arr: [], westElite8Arr: [], southRound1Arr: [], southRound2Arr: [], southSweet16Arr: [], southElite8Arr: [],
    midWestRound1Arr: [], midWestRound2Arr: [], midWestSweet16Arr: [], midWestElite8Arr: [], final4Arr: [], finalArr: [], showUpperBar: true, currentRound: '', currentFinalsSubRound: '', theLink: '', theTime: '', round1EastArr: [], round1WestArr: [], round1SouthArr: [], round1midWestArr: [], allRound1MatchesArr: [], oldRound1Array: [],
    round2EastArr: [], round2WestArr: [], round2SouthArr: [], round2midWestArr: [], allRound2MatchesArr: [], allRoundFinalArr: [], sweet16Arr: [], elite8Arr: [], opendetailsModal: false, itemToModals: [], modalTitle: '', finalRoundScore: '', editDetailsModal: false, marchMadnessModal: false, selectHomeEvent: false, selectHomeEventId: '',
    stopRound1Edit: '', stopRound2Edit: '', stopSweet16Edit: '', stopElite8Edit: '', stopFinal4Edit: '', stopFinalEdit: '', currentSelection: '', eventYear: '', theEventTitle: '', theEventKey: '', theEventTime: '',selectionToModal:''
  }

  componentDidMount = () => {
    this.checkAuth()
  }

  inputChange = async (e) => {

    var value = e.target.value
    console.log('valueee', value)
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
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1') {
          this.setState({ isAdmin: true })
        }
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId) }
        //this.getMatchesInfo(userId)
      } else {
        this.setState({ userLoggedIn: false })
        this.checkUpcomingPastGames(userId)
      }
    })
  }
  checkUpcomingPastGames = async (userId) => {
    var gamesInfo = firebase.database().ref('/theEvents/NCAAB/eventsIds/')
    var i = 0, allGames = []

    await gamesInfo.once('value', dataSnapshot => {
      if (!dataSnapshot.exists()) {
        this.setState({ noEventToShow: true });
        console.log('no event to shooooooooooooooow')
      }
      else {
        this.setState({ noEventToShow: false })

        var gamesCount = dataSnapshot.numChildren()
        //console.log('naingia 3333',gamesCount)
        dataSnapshot.forEach((data) => {
          //console.log('naingia 44444',data)
          i++
          var pastG = {}, upcomingG = {}, theEvents = {}
          var key = data.key
          var time = data.val().time
          var title = data.val().title
          var sportType = data.val().sportType
          var endTime = data.val().endTime
          var eventYear = data.val().year
          var theData = data.val()
          var currentSelection = data.val().currentSelection

          var stopRound1Edit = data.val().stopRound1Edit
          var stopRound2Edit = data.val().stopRound2Edit

          var stopSweet16Edit = data.val().stopSweet16Edit
          var stopElite8Edit = data.val().stopElite8Edit
          var stopFinal4Edit = data.val().stopFinal4Edit
          var stopFinalEdit = data.val().stopFinalEdit


          theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection, theData: theData, stopRound1Edit: stopRound1Edit, stopRound2Edit: stopRound2Edit, stopFinalEdit: stopFinalEdit, stopSweet16Edit, stopElite8Edit, stopFinal4Edit, eventYear: eventYear }
          allGames.push(theEvents)

          if (gamesCount === i) {
            var theEventTitle = '', theEventKey = '', theEventTime = 0, theTime = '',
              stopRound1Edit = '', stopRound2Edit = '', stopFinalEdit = '', stopSweet16Edit = '',
              stopElite8Edit = '', stopFinal4Edit = '', eventYear = ''
            if (allGames.length > 0) {
              allGames = allGames.sort((a, b)=> b.time - a.time ); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'], theTime = allGames[0]['time'], endTime = allGames[0]['endTime']
              stopRound1Edit = allGames[0]['stopRound1Edit'], stopRound2Edit = allGames[0]['stopRound2Edit'], stopFinalEdit = allGames[0]['stopFinalEdit'], stopSweet16Edit = allGames[0]['stopSweet16Edit'], stopElite8Edit = allGames[0]['stopElite8Edit'], stopFinal4Edit = allGames[0]['stopFinal4Edit'], eventYear = allGames[0]['eventYear']
            }
          }

          var expired = false
          if ((theEventTime - new Date().getTime()) < 86400000) {
            expired = true
          }
          var theMenu = '', currentRound = ''
          if (currentSelection === 'round1' || currentSelection === 'round2') { theMenu = 'east', currentRound = currentSelection } else { theMenu = 'sweet16', currentRound = 'finalRound' }
          this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection, currentRound, theMenu, expired, endTime, theTime, stopRound1Edit, stopRound2Edit, stopFinalEdit, stopFinal4Edit, stopSweet16Edit, stopElite8Edit, eventYear }, () => {
            this.getNCAABMatches()
            this.checkLink(userId)
            console.log('currentSelection', this.state.stopRound1Edit, this.state.stopRound2Edit, this.state.stopFinalEdit)
          })
        })
      }
    })
  }
  checkLink = async (userId) => {
    var flocksDataRef = firebase.database().ref('users/').child(userId + '/flockData/flockNames/' + this.state.theEventKey + '/link')
    flocksDataRef.once('value', dataSnapshot => {
      console.log('flocksDataRef the key', dataSnapshot.val())
      if (dataSnapshot.exists()) {
        this.setState({ theLink: dataSnapshot.val() })
      } else {
        this.setState({ theLink: '' })
      }
    })
  }
  getMatchesInfo = async () => {
    var userId = this.state.userId
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NCAAB/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NCAAB/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NCAAB/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NCAAB/')
    var currentEventUserInfo = '', finalRoundScore = 0
    await selectedMatchesKeyDb.once('value', dataSnapshot => {
      //////console.log('the key',dataSnapshot.val())
      if (!dataSnapshot.val()) return
      photoRefDb.once('value', dataSnapshot => {
        //////console.log('proofile photo',dataSnapshot.val())
        if (dataSnapshot.val()) {
          this.setState({ profilePhoto: dataSnapshot.val() })
        }
      })
      userInfoDb.once('value', dataSnapshot => {
        if (!dataSnapshot.val()) return
        console.log('the type user 0000000000000', dataSnapshot.val())
        if (dataSnapshot.val()) {
          var theInfo = dataSnapshot.val()
          currentEventUserInfo = dataSnapshot.val()
          finalRoundScore = Number(theInfo.sweet16Score) + Number(theInfo.elite8Score) + Number(theInfo.final4Score) + Number(theInfo.finalRoundScore)
          this.setState({ currentEventUserInfo: theInfo, finalRoundScore, dataAvailable: true })
        }
      })
      userBetsDb.once('value', dataSnapshot => {
        var theData = dataSnapshot.val()
        var round1Arr = [], round2Arr = [], finalRoundArr = [], sweet16Arr = [], elite8Arr = [], final4Arr = []
        var round1Exists = dataSnapshot.child('round1').exists()
        var round1Count = dataSnapshot.child('round1').numChildren()
        var round2Count = dataSnapshot.child('round2').numChildren()
        var sweet16Count = dataSnapshot.child('sweet16').numChildren()

        var elite8Count = dataSnapshot.child('elite8').numChildren()
        var final4Count = dataSnapshot.child('final4').numChildren()
        var finalRoundCount = dataSnapshot.child('finalRound').numChildren()
        if (round1Exists) {
          var i = 0
          round1Arr = theData.round1
          //console.log('round 14 item',round1Count,round1Arr)
          for (var key in round1Arr) {
            i++
            var theId = key
            var betPlayer = round1Arr[key]
            this.state.allRound1MatchesArr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
                /* if (item2.status1 === 'played') {
                   if (item2.winner === 'player1' && betPlayer) { currentScore.push(item.p1Points);thePoints.push(item.p1Points);}
                   if (item2.winner === 'player2' && betPlayer) { currentScore.push(item.p2Points);thePoints.push(item.p2Points);}
                 }*/
              }
            })
            if (round1Count === i) {
              //console.log('round 19 item',this.state.allRound1MatchesArr)
              this.setState({ allRound1MatchesArr: this.state.allRound1MatchesArr })
            }
          }
        }
        var round2Exists = dataSnapshot.child('round2').exists()
        if (round2Exists) {
          var i = 0
          round2Arr = theData.round2
          // console.log('round 14 item',round2Count,round2Arr)
          for (var key in round2Arr) {
            i++
            var theId = key
            var betPlayer = round2Arr[key]
            this.state.allRound2MatchesArr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (round2Count === i) {
              this.setState({ allRound2MatchesArr: this.state.allRound2MatchesArr })
              //console.log('round 19 item',this.state.allRound2MatchesArr,this.state.round2EastArr)
            }
          }
        }
        var sweet16Exists = dataSnapshot.child('sweet16').exists()
        if (sweet16Exists) {
          var i = 0
          sweet16Arr = theData.sweet16
          // console.log('round 14 item',round2Count,round2Arr)
          for (var key in sweet16Arr) {
            i++
            var theId = key
            var betPlayer = sweet16Arr[key]
            this.state.sweet16Arr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (sweet16Count === i) {
              this.setState({ sweet16Arr: this.state.sweet16Arr })
              console.log('sweet16Count ', this.state.sweet16Arr)
            }
          }
        }
        var elite8Exists = dataSnapshot.child('elite8').exists()
        if (elite8Exists) {
          var i = 0
          elite8Arr = theData.elite8
          // console.log('round 14 item',round2Count,round2Arr)
          for (var key in elite8Arr) {
            i++
            var theId = key
            var betPlayer = elite8Arr[key]
            this.state.elite8Arr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (elite8Count === i) {
              this.setState({ elite8Arr: this.state.elite8Arr })
              console.log('elite8Arr ', this.state.elite8Arr)
            }
          }
        } else {
          console.log('elite 8 not existing')
        }
        var final4Exists = dataSnapshot.child('final4').exists()
        if (final4Exists) {
          var i = 0
          final4Arr = theData.final4
          // console.log('round 14 item',round2Count,round2Arr)
          for (var key in final4Arr) {
            i++
            var theId = key
            var betPlayer = final4Arr[key]
            this.state.final4Arr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (final4Count === i) {
              this.setState({ final4Arr: this.state.final4Arr })
              console.log('final4Arr ', this.state.final4Arr)
            }
          }
        }

        var finalRoundExists = dataSnapshot.child('finalRound').exists()
        if (finalRoundExists) {
          var i = 0
          finalRoundArr = theData.finalRound
          // console.log('round 14 item',round2Count,round2Arr)
          for (var key in finalRoundArr) {
            i++
            var theId = key
            var betPlayer = finalRoundArr[key]
            this.state.finalArr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (final4Count === i) {
              this.setState({ finalArr: this.state.finalArr })
              console.log('finalRoundArr ', this.state.finalArr)
            }
          }
        }
        return

        var finalRoundExists = dataSnapshot.child('finalRound').exists()
        if (finalRoundExists) { finalRoundArr = theData.finalRound }
        console.log('round1Exists', round1Exists)
        console.log('round1 data', theData.round1)
      })

      return
      var thetrrrr = ''
      ////console.log('this.state.currentSelection', this.state.currentSelection)
      // //console.log('firstRoundArray',this.state.firstRoundArray,'quarterFinalsArray',this.state.quarterFinalsArray,'semiFinalsArray',this.state.semiFinalsArray)
      if (selection === 'wildCard') {
        thetrrrr = this.state.allRound1MatchesArr
      }
      if (selection === 'divisionalRound') {
        thetrrrr = this.state.allRound2MatchesArr
      }
      if (selection === 'conferenceChampionship') {
        thetrrrr = this.state.semiFinalsArray
      }
      if (selection === 'superBowl') {
        thetrrrr = this.state.finalArray
      }

      //var thetrrrr=[...this.state.ramUfcMaincardArray,...this.state.ramUfcPrelimsArray,...this.state.ramUfcEarlyPrelimsArray]

      userBetsDb.once('value', dataSnapshot => {
        //////console.log('the bets data',dataSnapshot.val())
        //////console.log('this.state.theItems',this.state.theItems)
        if (!dataSnapshot.val()) return
        var itemsCount = dataSnapshot.numChildren()
        //console.log('selection',selection,'itemsCount',itemsCount)
        if (itemsCount === 6) { this.setState({ isFirstRoundPicked: true }) }
        if (itemsCount === 10) { this.setState({ isFirstRoundPicked: true, isQuarterFinalsPicked: true }) }
        if (itemsCount === 12) { this.setState({ isFirstRoundPicked: true, isQuarterFinalsPicked: true, isSemiFinalsPicked: true }) }
        if (itemsCount === 13) { this.setState({ isFirstRoundPicked: true, isQuarterFinalsPicked: true, isSemiFinalsPicked: true, isFinalsPicked: true }) }
        if (selection === 'wildCard' && itemsCount < 6) return
        if (selection === 'divisionalRound' && itemsCount < 10) return
        if (selection === 'conferenceChampionship' && itemsCount < 12) return
        if (selection === 'superBowl' && itemsCount < 13) return
        console.log('MEGA count', selection, itemsCount)
        var i = 0, thePoints = [], currentScore = []
        dataSnapshot.forEach((data, index) => {
          i++
          //  //console.log('thank DAATA',selection,data.val())
          thetrrrr.map((item) => {
            //////console.log('thank you sir',item.winner)
            if (item.id === data.key) {
              ////console.log('thank you sir')
              item['bet'] = data.val()
              if (item.status1 === 'played') {

                //////console.log('item.winner',item.winner)
                //////console.log('my beeeeet',data.val())
                //////console.log('item.p1Points',item.p1Points)
                //////console.log('item.p2Points',item.p2Points)
                if (item.winner === 'player1' && data.val() === 'player1') { currentScore.push(item.p1Points); thePoints.push(item.p1Points); }
                if (item.winner === 'player2' && data.val() === 'player2') { currentScore.push(item.p2Points); thePoints.push(item.p2Points); }
                //////console.log('p1 pointsss',currentScore)

              } else {
                if (data.val() === 'player1') {
                  thePoints.push(item.p1Points);//////console.log('the points',item.p1Points)
                }
                if (data.val() === 'player2') {
                  thePoints.push(item.p2Points);//////console.log('the points',item.p2Points)
                }
              }
            }
          })
          if (itemsCount === i) {

            this.setState({ dataAvailable: true })
            return
          }
        })
      })

    })
  }
  getNCAABMatches = () => {
    var round1EastArr = [], round1WestArr = [], round1SouthArr = [], round1midWestArr = [], allMatches = []
    this.setState({ eastRound1Arr: [], eastRound2Arr: [], eastSweet16Arr: [], eastElite8Arr: [], dataAvailable: false, currentEventUserInfo: {} })
    console.log('this.state.theEventKey', this.state.theEventKey, this.state.currentRound)
    //return
    var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey + '/' + 'round1')
    matchesRef.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      var i = 0
      dataSnapshot.forEach((data) => {
        i++
        var place = data.val().place
        if (place === 'east') {
          round1EastArr.push(data.val())
        }
        if (place === 'west') {
          round1WestArr.push(data.val())
        }
        if (place === 'south') {
          round1SouthArr.push(data.val())
        }
        if (place === 'midWest') {
          round1midWestArr.push(data.val())
        }
        //allMatches.push(data.val())
        if (theCount === i) {
          var combinedArr = [round1EastArr, round1WestArr, round1SouthArr, round1midWestArr]
          allMatches = Array.prototype.concat(...combinedArr);
          //allMatches=[...round1EastArr]
          // console.log('allMatches 55555555',allMatches)
          this.setState({
            round1EastArr: round1EastArr, round1WestArr: round1WestArr, round1SouthArr: round1SouthArr,
            round1midWestArr: round1midWestArr, oldRound1Array: allMatches,
            allRound1MatchesArr: [...round1EastArr, ...round1WestArr, ...round1SouthArr, ...round1midWestArr]
          })
          if (this.state.currentRound === 'round1') {
            this.setState({ currentItems: round1EastArr })
          }
        }
      })
    })


    this.getNCAABMatches2()
    this.getNCAABMatchesFinal()
    return
    this.getNCAABMatches4()
    this.getNCAABFinal4()
    //this.getMatchesInfo()
  }
  getNCAABMatches2 = () => {
    var round2EastArr = [], round2WestArr = [], round2SouthArr = [], round2midWestArr = [], allMatches = []
    this.setState({ eastRound1Arr: [], eastRound2Arr: [], eastSweet16Arr: [], eastElite8Arr: [], dataAvailable: false, currentEventUserInfo: {} })
    var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey + '/' + 'round2')
    matchesRef.once('value', dataSnapshot => {
      var theCount = dataSnapshot.numChildren()
      var i = 0
      dataSnapshot.forEach((data) => {
        i++
        var place = data.val().place
        if (place === 'east') {
          round2EastArr.push(data.val())
        }
        if (place === 'west') {
          round2WestArr.push(data.val())
        }
        if (place === 'south') {
          round2SouthArr.push(data.val())
        }
        if (place === 'midWest') {
          round2midWestArr.push(data.val())
        }
        allMatches.push(data.val())
        if (theCount === i) {
          console.log('allMatches round 2', allMatches)
          this.setState({
            round2EastArr: round2EastArr, round2WestArr: round2WestArr, round2SouthArr: round2SouthArr,
            round2midWestArr: round2midWestArr, allRound2MatchesArr: [...round2EastArr, ...round2WestArr, ...round2SouthArr, ...round2midWestArr]
          })

          if (this.state.currentRound === 'round2') {
            this.setState({ currentItems: round2EastArr })
          }
        }
      })
    })
  }
  getNCAABMatchesFinal = () => {
    var sweet16Arr = [], elite8Arr = [], final4Arr = [], finalArr = [], allMatches = []
    this.setState({ southRound1Arr: [], southRound2Arr: [], southSweet16Arr: [], southElite8Arr: [], dataAvailable: false, currentEventUserInfo: {} })
    var matchesRef = firebase.database().ref('/theEvents/NCAAB/').child(this.state.theEventKey + '/final/')
    matchesRef.once('value', dataSnapshot => {
      var sweet16Count = dataSnapshot.child('sweet16').numChildren()
      var elite8Count = dataSnapshot.child('elite8').numChildren()
      var final4Count = dataSnapshot.child('final4').numChildren()
      var finalCount = dataSnapshot.child('finalRound').numChildren()
      var theInfo = dataSnapshot.val()
      var sweet16 = theInfo.sweet16
      var elite8 = theInfo.elite8
      var final4 = theInfo.final4
      var final = theInfo.finalRound
      var i = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0
      for (var key in sweet16) {
        i++
        var theData = sweet16[key]
        sweet16Arr.push(theData)
        allMatches.push(theData)
        if (sweet16Count === i) {
          this.setState({ sweet16Arr: sweet16Arr })
          console.log('sweet16Arr', sweet16Arr)
        }
      }
      for (var key in elite8) {
        g++
        var theData = elite8[key]
        elite8Arr.push(theData)
        allMatches.push(theData)
        if (elite8Count === g) {
          this.setState({ elite8Arr: elite8Arr })
          console.log('round2Arr', elite8Arr)
        }
      }
      for (var key in final4) {
        h++
        var theData = final4[key]
        final4Arr.push(theData)
        allMatches.push(theData)
        if (final4Count === h) {
          this.setState({ final4Arr: final4Arr })
          console.log('final4Arr', final4Arr)
        }
      }
      for (var key in final) {
        j++
        var theData = final[key]
        finalArr.push(theData)
        allMatches.push(theData)
        if (finalCount === j) {
          this.setState({ finalArr: finalArr, allRoundFinalArr: allMatches })
          console.log('finalArr 001000', finalArr)
          if (this.state.currentRound === 'finalRound') {
            this.setState({ currentItems: sweet16Arr })
          }
          this.getMatchesInfo()
        }
      }

    })
  }
  isOdd = (num) => { return num % 2; }
  checkExistence = () => {
    var theYear = new Date(this.state.round1).getFullYear()
    if (theYear < new Date().getFullYear()) { this.notify("Event can only be created for the future"); return }
    var eventKey = 'marchMadness' + theYear
    var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/stopRound1Edit/')
    timeInfoDb.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        if (dataSnapshot.val() === 'N/A') {
          this.createEvent(eventKey, theYear)
        } else {
          this.notify('That Years Event Already Exists')
        }
      } else {
        this.createEvent(eventKey, theYear)
      }

    })
  }
  createEvent = (eventKey, theYear) => {
    var round1Arr = {}, round2Arr = {}, sweet16Arr = {}, elite8Arr = {}, final4Arr = {}, finalArr = {}
    console.log('round1 length', round1.length)
    var eventTitle = 'March Madness ' + theYear
    var generalDb = firebase.database().ref('/theEvents/NCAAB/' + eventKey)

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

      round1.map((item, index) => {
        round1[index]['timeInMillis'] = new Date(this.state.round1).getTime()
        round1[index]['commenceTime'] = this.state.round1

        ///adding
        /*round1[index]['player1'] = item.id+'team 1'
        round1[index]['player2'] = item.id+'team 2'
        
        var isOdd=this.isOdd(index+1)
        if(isOdd){round1[index]['winner'] = item.id+'team 1'}
        else{round1[index]['winner'] = item.id+'team 2'}*/
        ////
        round1[index]['time'] = this.state.round1
        round1Arr[item.id] = item
        var team1Seed = Number(item.team1Seed)
        var team2Seed = Number(item.team2Seed)
        thePoints.map((item2) => {
          if (team1Seed === item2.seed) { round1[index]['p1Points'] = item2.val }
          if (team2Seed === item2.seed) { round1[index]['p2Points'] = item2.val }
        })
        if (round1.length === index + 1) {
          console.log('round1Arr 1111', round1Arr)
          generalDb.child('/round1/').update(round1Arr)
        }
      })
      round2.map((item, index) => {
        round2[index]['timeInMillis'] = new Date(this.state.round2).getTime()
        round2[index]['commenceTime'] = this.state.round2
        round2[index]['time'] = this.state.round2

        ///adding
        /*round2[index]['player1'] = item.id+'team 1'
        round2[index]['player2'] = item.id+'team 2'

        round2[index]['p1Points'] = 4
        round2[index]['p2Points'] = 3

        var isOdd=this.isOdd(index+1)
       if(isOdd){round1[index]['winner'] = item.id+'team 1'}
       else{round1[index]['winner'] = item.id+'team 2'}*/
        ////

        round2Arr[item.id] = item
        if (round2.length === index + 1) {
          generalDb.child('/round2/').update(round2Arr)
        }
      })
      sweet16.map((item, index) => {
        sweet16[index]['timeInMillis'] = new Date(this.state.sweet16).getTime()
        sweet16[index]['commenceTime'] = this.state.sweet16
        sweet16[index]['time'] = this.state.sweet16
        ///adding
        /* sweet16[index]['player1'] = item.id+'team 1'
         sweet16[index]['player2'] = item.id+'team 2'
 
         sweet16[index]['p1Points'] = 4
         sweet16[index]['p2Points'] = 3
 
         var isOdd=this.isOdd(index+1)
         if(isOdd){round1[index]['winner'] = item.id+'team 1'}
         else{round1[index]['winner'] = item.id+'team 2'}*/
        ////
        sweet16Arr[item.id] = item
        if (sweet16.length === index + 1) {
          generalDb.child('/final/sweet16/').update(sweet16Arr)
        }
      })

      elite8.map((item, index) => {
        elite8[index]['timeInMillis'] = new Date(this.state.elite8).getTime()
        elite8[index]['commenceTime'] = this.state.elite8
        elite8[index]['time'] = this.state.elite8
        ///adding
        /*elite8[index]['player1'] = item.id+'team 1'
        elite8[index]['player2'] = item.id+'team 2'
 
        elite8[index]['p1Points'] = 4
        elite8[index]['p2Points'] = 3

        var isOdd=this.isOdd(index+1)
       if(isOdd){round1[index]['winner'] = item.id+'team 1'}
       else{round1[index]['winner'] = item.id+'team 2'}*/
        ////
        elite8Arr[item.id] = item
        if (elite8.length === index + 1) {
          generalDb.child('/final/elite8/').update(elite8Arr)
        }
      })

      final4.map((item, index) => {
        final4[index]['timeInMillis'] = new Date(this.state.final4).getTime()
        final4[index]['commenceTime'] = this.state.final4
        final4[index]['time'] = this.state.final4
        ///adding
        /*final4[index]['player1'] = item.id+'team 1'
        final4[index]['player2'] = item.id+'team 2'
 
        final4[index]['p1Points'] = 4
        final4[index]['p2Points'] = 3

        var isOdd=this.isOdd(index+1)
      if(isOdd){round1[index]['winner'] = item.id+'team 1'}
      else{round1[index]['winner'] = item.id+'team 2'}*/
        ////
        final4Arr[item.id] = item
        if (final4.length === index + 1) {
          generalDb.child('/final/final4/').update(final4Arr)
        }
      })

      nationalChampionship.map((item, index) => {
        nationalChampionship[index]['timeInMillis'] = new Date(this.state.final).getTime()
        nationalChampionship[index]['commenceTime'] = this.state.final

        ///adding
        /*nationalChampionship[index]['player1'] = item.id+'team 1'
        nationalChampionship[index]['player2'] = item.id+'team 2'
 
        nationalChampionship[index]['p1Points'] = 4
        nationalChampionship[index]['p2Points'] = 3

        var isOdd=this.isOdd(index+1)
       if(isOdd){round1[index]['winner'] = item.id+'team 1'}
       else{round1[index]['winner'] = item.id+'team 2'}*/
        ////

        nationalChampionship[index]['time'] = this.state.final
        finalArr[item.id] = item
        if (nationalChampionship.length === index + 1) {
          generalDb.child('/final/finalRound/').update(finalArr, (error) => {
            if (error) {
              this.notify('An error occured while creating event, try again')
            } else {
              var toTheEventsIds = {
                time: new Date(this.state.round1).getTime(), title: eventTitle, sportType: 'NCAAB', endTime: new Date(this.state.final).getTime(), getEventsTimeUpdate: new Date().getTime(),
                stopRound1Edit: 'N/A', stopRound2Edit: 'N/A', stopSweet16Edit: 'N/A', stopElite8Edit: 'N/A', stopFinal4Edit: 'N/A', stopFinalEdit: 'N/A', currentSelection: 'round1', year: theYear
              }
              var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/')
              var editDbRef2 = firebase.database().ref('/theEvents/NCAAB/eventsIds/' + eventKey + '/')
              editDbRef.set(toTheEventsIds)
              editDbRef2.set(toTheEventsIds)
              this.notify('Event created successfully')
              this.setState({ showCreateEventModal: false })
            }
          })
        }
      })

    }
  }

  /*createEvent2 = () => {
    var round1Arr={},round1EastArr = {},round1WestArr = {},round1SouthArr = {},round1MidWestArr = {}, round2Arr = {}, sweet16Arr = {}, elite8Arr = {}, final4Arr = {}, finalArr = {}

    console.log('round1 length', round1.length)
    var eventKey = 'marchMadness' + new Date().getFullYear()
    var eventTitle = 'March Madness' + new Date().getFullYear()
    var generalDb = firebase.database().ref('/theEvents/NCAAB/' + eventKey)

   
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
      round1.map((item, index) => {
        round1[index]['timeInMillis'] = new Date(this.state.round1).getTime()
        round1[index]['commenceTime'] = this.state.round1
        round1[index]['time'] = this.state.round1
       
        round1EastArr[item.id+'east'] = item
        round1EastArr[index]['id']=item.id+'east'
        round1WestArr[item.id+'west'] = item
        round1WestArr[index]['id']=item.id+'west'
        round1SouthArr[item.id+'south'] = item
        round1SouthArr[index]['id']=item.id+'south'
        round1MidWestArr[item.id+'midWest'] = item
        round1MidWestArr[index]['id']=item.id+'midWest'
        if (round1.length === index + 1) {
          var combinedArr=[round1EastArr,round1WestArr,round1SouthArr,round1MidWestArr]
          const newArr = Array.prototype.concat(...combinedArr);
          console.log('combinedArr',newArr)
          return
          var round1Ref=firebase.database().ref('/theEvents/NCAAB/' + eventKey+'/round1')
          round1Ref.child('/west/').update(round1Arr)
          round1Ref.child('/east/').update(round1Arr)
          round1Ref.child('/south/').update(round1Arr)
          round1Ref.child('/midWest/').update(round1Arr)
        }
      })
  
    return
      round2.map((item, index) => {
        round2[index]['timeInMillis'] = new Date(this.state.round2).getTime()
        round2[index]['commenceTime'] = this.state.round2
        round2[index]['time'] = this.state.round2
        round2Arr[item.id] = item
        if (round2.length === index + 1) {
          var round2Ref=firebase.database().ref('/theEvents/NCAAB/' + eventKey+'/round2')
          round2Ref.child('/west/').update(round2Arr)
          round2Ref.child('/east/').update(round2Arr)
          round2Ref.child('/south/').update(round2Arr)
          round2Ref.child('/midWest/').update(round2Arr)
        }
      })
  
      sweet16.map((item, index) => {
        sweet16[index]['timeInMillis'] = new Date(this.state.sweet16).getTime()
        sweet16[index]['commenceTime'] = this.state.sweet16
        sweet16[index]['time'] = this.state.sweet16
        sweet16Arr[item.id] = item
        if (sweet16.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents/NCAAB/' + eventKey+'/final')
          finalRef.child('/sweet16/').update(sweet16Arr)
        }
      })
  
      elite8.map((item, index) => {
        elite8[index]['timeInMillis'] = new Date(this.state.elite8).getTime()
        elite8[index]['commenceTime'] = this.state.elite8
        elite8[index]['time'] = this.state.elite8
        elite8Arr[item.id] = item
        if (elite8.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents/NCAAB/' + eventKey+'/final')
          finalRef.child('/elite8/').update(elite8Arr)
        }
      })
  
      final4.map((item, index) => {
        final4[index]['timeInMillis'] = new Date(this.state.final4).getTime()
        final4[index]['commenceTime'] = this.state.final4
        final4[index]['time'] = this.state.final4
        final4Arr[item.id] = item
        if (final4.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents/NCAAB/' + eventKey+'/final')
          finalRef.child('final4').update(final4Arr)
        }
      })
  
        nationalChampionship.map((item, index) => {
        nationalChampionship[index]['timeInMillis'] = new Date(this.state.final).getTime()
        nationalChampionship[index]['commenceTime'] = this.state.final
        nationalChampionship[index]['time'] = this.state.final
        finalArr[item.id] = item
        if (nationalChampionship.length === index + 1) {
          var finalRef=firebase.database().ref('/theEvents/NCAAB/' + eventKey+'/final')
          finalRef.child('nationalChampionship').update(finalArr,(error) => {
            if (error) {
              this.notify('An error occured while creating event, try again')
            } else {
              var toTheEventsIds = { time:new Date(this.state.round1).getTime(), title:eventTitle, sportType:'NCAAB', endTime:new Date(this.state.final).getTime(), getEventsTimeUpdate: new Date().getTime(),
                stopRound1Edit:'N/A',stopRound2Edit:'N/A',stopSweet16Edit:'N/A',stopElite8Edit:'N/A',stopFinal4Edit:'N/A',stopFinalEdit:'N/A',currentSelection:'round1'
               }
              var editDbRef=firebase.database().ref('/theEvents/eventsIds/'+eventKey+'/')
              var editDbRef2=firebase.database().ref('/theEvents/NCAAB/eventsIds/'+eventKey+'/')
              editDbRef.set(toTheEventsIds)
              editDbRef2.set(toTheEventsIds)
              this.notify('Event created successfully')
              this.setState({showCreateEventModal:false})
            }
          })
        }
      })

    }
  }*/

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
  selectEvent = (theMenu) => {
    this.setState({ theMenu })
    //console.log('this.state.currentRound',this.state.currentRound,theMenu)
    //return
    if (this.state.currentRound === 'round1') {
      if (theMenu === 'east') { this.setState({ currentItems: this.state.round1EastArr, theSubMenu: 'round1' }) }
      if (theMenu === 'west') { this.setState({ currentItems: this.state.round1WestArr, theSubMenu: 'round1' }) }
      if (theMenu === 'south') { this.setState({ currentItems: this.state.round1SouthArr, theSubMenu: 'round1' }) }
      if (theMenu === 'midwest') { this.setState({ currentItems: this.state.round1midWestArr, theSubMenu: 'round1' }) }
    }
    if (this.state.currentRound === 'round2') {
      if (theMenu === 'east') { this.setState({ currentItems: this.state.round2EastArr, theSubMenu: 'round2' }) }
      if (theMenu === 'west') { this.setState({ currentItems: this.state.round2WestArr, theSubMenu: 'round2' }) }
      if (theMenu === 'south') { this.setState({ currentItems: this.state.round2SouthArr, theSubMenu: 'round2' }) }
      if (theMenu === 'midwest') { this.setState({ currentItems: this.state.round2midWestArr, theSubMenu: 'round2' }) }
    }
    if (this.state.currentRound === 'finalRound') {
      if (theMenu === 'sweet16') { this.setState({ currentItems: this.state.sweet16Arr, theSubMenu: 'finalRound' }) }
      if (theMenu === 'elite8') { this.setState({ currentItems: this.state.elite8Arr, theSubMenu: 'finalRound' }) }
      if (theMenu === 'final4') { this.setState({ currentItems: this.state.final4Arr, theSubMenu: 'finalRound' }) }
      if (theMenu === 'finalRound') { this.setState({ currentItems: this.state.finalArr, theSubMenu: 'finalRound' }) }
    }

  }
  selectSubEvent = (type, theMenu) => {
    //this.setState({ eastRound1Arr:[],eastRound2Arr:[],eastSweet16Arr:[],eastElite8Arr:[], dataAvailable: false, currentEventUserInfo: {} })

    if (theMenu === 'east') {
      if (type === 'round1') { this.setState({ currentItems: this.state.eastRound1Arr }) }
      if (type === 'round2') { this.setState({ currentItems: this.state.eastRound2Arr }) }
      if (type === 'sweet16') { this.setState({ currentItems: this.state.eastSweet16Arr }) }
      if (type === 'elite8') { this.setState({ currentItems: this.state.eastElite8Arr }) }
    }
    if (theMenu === 'west') {
      if (type === 'round1') { this.setState({ currentItems: this.state.westRound1Arr }) }
      if (type === 'round2') { this.setState({ currentItems: this.state.westRound2Arr }) }
      if (type === 'sweet16') { this.setState({ currentItems: this.state.westSweet16Arr }) }
      if (type === 'elite8') { this.setState({ currentItems: this.state.westElite8Arr }) }
    }
    if (theMenu === 'south') {
      if (type === 'round1') { this.setState({ currentItems: this.state.southRound1Arr }) }
      if (type === 'round2') { this.setState({ currentItems: this.state.southRound2Arr }) }
      if (type === 'sweet16') { this.setState({ currentItems: this.state.southSweet16Arr }) }
      if (type === 'elite8') { this.setState({ currentItems: this.state.southElite8Arr }) }
    }
    if (theMenu === 'midwest') {
      if (type === 'round1') { this.setState({ currentItems: this.state.midWestRound1Arr }) }
      if (type === 'round2') { this.setState({ currentItems: this.state.midWestRound2Arr }) }
      if (type === 'sweet16') { this.setState({ currentItems: this.state.midWestSweet16Arr }) }
      if (type === 'elite8') { this.setState({ currentItems: this.state.midWestElite8Arr }) }
    }
    this.setState({ theSubMenu: type })
  }
  getCurrentRound = (round) => {
    console.log('roundddd 5656565', round)
    this.setState({ currentRound: round })
    if (round === 'round1') {
      this.setState({ currentItems: this.state.round1EastArr, theSubMenu: 'round1', theMenu: 'east' })
    }
    if (round === 'round2') {
      this.setState({ currentItems: this.state.round2EastArr, theSubMenu: 'round2', theMenu: 'east' })
    }
    if (round === 'finalRound') {

      this.setState({ currentItems: this.state.sweet16Arr, theSubMenu: 'finalRound', theMenu: 'sweet16' })
    }

  }


  loadOtherEvent = (theEventKey, theEventTitle, time, stopRound1Edit, stopRound2Edit, stopSweet16Edit, stopElite8Edit, stopFinal4Edit, stopFinalEdit, eventYear, currentSelection, oddsUpdate, resultsUpdate) => {
    //console.log('eventYear',eventYear);return
    var theMenu = ''
    if (currentSelection === 'round1' || currentSelection === 'round2') { theMenu = 'east' } else { theMenu = 'sweet16' }
    this.setState({ theEventKey, theEventTitle, theTime: time, stopRound1Edit, stopRound2Edit, stopSweet16Edit, stopElite8Edit, stopFinal4Edit, stopFinalEdit, eventYear, currentSelection, currentRound: currentSelection, theMenu }, () => {
      this.getNCAABMatches()
      this.checkLink(this.state.userId)
    })
  }
  copyLink = () => {
    copy(this.state.theLink);
    this.notify('Link copied successfully')
  }
  openTheModal = async () => {
    if (this.state.userLoggedIn === false) {
      this.notify("Please Log In to continue")
      this.setState({ openLoginModal: true })
      return
    }
    var itemToModals = '', modalTitle = '', stopEdit = ''
    var year = new Date().getFullYear()
    if (this.state.currentRound === 'round1') { itemToModals = this.state.allRound1MatchesArr, modalTitle = 'March Madness ' + year + ' > Round 1', stopEdit = 'stopRound1Edit' }
    if (this.state.currentRound === 'round2') { itemToModals = this.state.allRound2MatchesArr, modalTitle = 'March Madness ' + year + ' > Round 2', stopEdit = 'stopRound2Edit' }
    if (this.state.currentRound === 'finalRound') {
      if (this.state.theMenu === 'sweet16') {
        itemToModals = this.state.sweet16Arr, modalTitle = 'March Madness ' + year + ' > Sweet 16', stopEdit = 'stopSweet16Edit'
      }
      if (this.state.theMenu === 'elite8') {
        itemToModals = this.state.elite8Arr, modalTitle = 'March Madness ' + year + ' > Elite 8', stopEdit = 'stopElite8Edit'
      }
      if (this.state.theMenu === 'final4') {
        itemToModals = this.state.final4Arr, modalTitle = 'March Madness ' + year + ' > Final 4', stopEdit = 'stopFinal4Edit'
      }
      if (this.state.theMenu === 'finalRound') {
        itemToModals = this.state.finalArr, modalTitle = 'March Madness ' + year + ' > Championship', stopEdit = 'stopFinalEdit'
      }
    }
    var i = 0, pointMissing = false
    console.log('this.state.theItems', itemToModals)
    await itemToModals.map((item, index) => {
      i++
      //console.log('item.p1Points',item.p1Points)
      if (item.p1Points === 'N/A' || item.p2Points === 'N/A') {
        pointMissing = true
      }
      if (itemToModals.length === index + 1) {
        if (pointMissing === true) {
          this.notify('Event points not yet populated')
        } else {
          this.openTheModal2(stopEdit)
          console.log('itemToModals', itemToModals)
          this.setState({ itemToModals, modalTitle })
        }
      }
    })
  }
  openTheModal2 = (stopEdit) => {
    var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/' + stopEdit)
    timeInfoDb.once('value', dataSnapshot => {
      var theEventTime = dataSnapshot.val()
      if (theEventTime === 'N/A') {
        this.notify('Event not yet available for pick')
        return
      } else {
        if ((new Date().getTime() > theEventTime)) {
          this.notify('Event pick/edit time expired')
          return
        } else {
          if (this.state.userLoggedIn === true) {
            this.setState({ opendetailsModal: true, openLoginModal: false })
          } else {
            this.setState({ openLoginModal: true, opendetailsModal: false })
          }
        }
      }
    })

  }
  openMarchMadnessModal2=()=> {

  }
  openMarchMadnessModal = async () => {

    var gamesInfo = firebase.database().ref('/theEvents/NCAAB/eventsIds/' + this.state.theEventKey)
    gamesInfo.once('value', dataSnapshot => {
      var currentSelection = dataSnapshot.val().currentSelection
      var stopRound1Edit=dataSnapshot.val().stopRound1Edit
      var stopRound2Edit=dataSnapshot.val().stopRound2Edit
      var stopSweet16Edit=dataSnapshot.val().stopSweet16Edit
      var stopElite8Edit=dataSnapshot.val().stopElite8Edit
      var stopFinal4Edit=dataSnapshot.val().stopFinal4Edit
      var stopFinalEdit=dataSnapshot.val().stopFinalRoundEdit
      var year = this.state.eventYear
      
     /* if (currentSelection === 'round1') {
        if (this.state.stopRound1Edit !== 'N/A') { }
      }
      if (currentSelection === 'round2') { }
      if (currentSelection === 'sweet16') { }
      if (currentSelection === 'elite8') { }
      if (currentSelection === 'final4') { }
      if (currentSelection === 'finalRound') { }*/

    //if (currentSelection === 'finalRound') { }  
    
    var itemToModals = '', modalTitle = ''
    var eventYear = this.state.eventYear
    var time = new Date().getTime()
    if (currentSelection === 'round1'&&stopRound1Edit !== 'N/A' && time > (stopRound1Edit+3600000)){currentSelection='round2'}
    if (currentSelection === 'round2'&&stopRound2Edit !== 'N/A' && time > (stopRound2Edit+3600000)){currentSelection='sweet16'}
    if (currentSelection === 'sweet16'&&stopSweet16Edit !== 'N/A' && time > (stopSweet16Edit+3600000)){currentSelection='elite8'}
    if (currentSelection === 'elite8'&&stopElite8Edit !== 'N/A' && time > (stopElite8Edit+3600000)){currentSelection='final4'}
    if (currentSelection === 'final4'&&stopFinal4Edit !== 'N/A' && time > (stopFinal4Edit+3600000)){currentSelection='finalRound'}

    console.log('currentSelection',currentSelection,time,stopRound1Edit)
      //return
    //return
    if (currentSelection === 'round1') {
      if (stopRound1Edit !== 'N/A' && time > stopRound1Edit) { this.notify('Event already started'); return }
      else{
        modalTitle = 'March Madness ' + year + ' > Round 1'
        this.setState({ itemToModals:this.state.allRound1MatchesArr, marchMadnessModal: true, modalTitle,selectionToModal:'round1' })
    }}
    if (currentSelection === 'round2') {
      if (stopRound2Edit !== 'N/A' && time > stopRound2Edit) { this.notify('Event already started'); return }
      else{
        modalTitle = 'March Madness ' + year + ' > Round 2'
        this.setState({ itemToModals:this.state.allRound2MatchesArr, marchMadnessModal: true, modalTitle,selectionToModal:'round2' })
    }}
    if (currentSelection === 'sweet16') {
      if (stopSweet16Edit !== 'N/A' && time > stopSweet16Edit) { this.notify('Event already started'); return }
      else{
        modalTitle = 'March Madness ' + year + ' > Sweet 16'
        this.setState({ itemToModals:this.state.sweet16Arr, marchMadnessModal: true, modalTitle,selectionToModal:'sweet16' })
    }}
    if (currentSelection === 'elite8') {
      if (stopElite8Edit !== 'N/A' && time > stopElite8Edit) { this.notify('Event already started'); return }
      else{
        modalTitle = 'March Madness ' + year + ' > Elite 8'
        this.setState({ itemToModals:this.state.elite8Arr, marchMadnessModal: true, modalTitle,selectionToModal:'elite8' })
    }}
    if (currentSelection === 'final4') {
      if (stopFinal4Edit !== 'N/A' && time > stopFinal4Edit) { this.notify('Event already started'); return }
      else{
        modalTitle = 'March Madness ' + year + ' > Final 4'
        this.setState({ itemToModals:this.state.final4Arr, marchMadnessModal: true, modalTitle,selectionToModal:'final4' })
    }}
    if (currentSelection === 'finalRound') {
      if (stopFinalEdit !== 'N/A' && time > stopFinalEdit) { 
        if(time>Number(stopFinalEdit+86400000)){this.notify('Event Expired');return}
        else{this.notify('Event already started'); return}}
      else{
        modalTitle = 'March Madness ' + year + ' > Championship'
        this.setState({ itemToModals:this.state.finalArr, marchMadnessModal: true, modalTitle,selectionToModal:'finalRound' })
    }
  }
  })
    return
    if (this.state.currentRound === 'round1') { itemToModals = this.state.allRound1MatchesArr, modalTitle = 'March Madness ' + year + ' > Round 1' }
    if (this.state.currentRound === 'round2') { itemToModals = this.state.allRound2MatchesArr, modalTitle = 'March Madness ' + year + ' > Round 2' }
    if (this.state.currentRound === 'finalRound') {
      if (this.state.theMenu === 'sweet16') {
        itemToModals = this.state.sweet16Arr, modalTitle = 'March Madness ' + year + ' > Sweet 16'
      }
      if (this.state.theMenu === 'elite8') {
        itemToModals = this.state.elite8Arr, modalTitle = 'March Madness ' + year + ' > Elite 8'
      }
      if (this.state.theMenu === 'final4') {
        itemToModals = this.state.final4Arr, modalTitle = 'March Madness ' + year + ' > Final 4'
      }
      if (this.state.theMenu === 'finalRound') {
        itemToModals = this.state.finalArr, modalTitle = 'March Madness ' + year + ' > Championship'
      }
      //console.log('itemToModals rrrrrr',itemToModals)
      //return
      this.setState({ itemToModals, marchMadnessModal: true, modalTitle })

    } else {
      this.setState({ itemToModals, marchMadnessModal: true, modalTitle })
    }


  }
  doNothing = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  opeModal2 = () => {
    this.openTheModal()
    return
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    } else {
      if (!this.state.dataAvailable) {
        this.notify('Event not picked')
        this.openTheModal()
        return
      } else {
        this.setState({ editDetailsModal: true })
      }
    }
  }
  handleChildClick = (title, items) => {
    this.setState({ count: this.state.count + 1, marchMadnessModal: false, [title]: items });
    console.log('azeeza', items)
  };
  checkForOddsUpdate = () => {
    this.notify('Not available at the moment'); return
  }

  chooseHomeEvent = (event, id) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ selectHomeEvent: true, selectHomeEventId: id })
  }

  sendEvent = (event, data, id) => {
    event.stopPropagation()
    event.preventDefault()
    data['id'] = id
    var theDb = firebase.database().ref("/theEvents/eventToShowHomePage/")
    theDb.set(data, (error) => {
      if (error) {
        this.notify('An error occured while updating')
      } else {
        this.setState({ selectHomeEvent: false })
        this.notify('Selected Succesfully')
      }
    })
  }
  closePickWinner = (id) => {
    if (this.state.currentRound === 'round1') {
      var index2 = this.state.allRound1MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.allRound1MatchesArr
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      this.setState({ allRound1MatchesArr: theItems })
      console.log('this.state.currentItems 001', theItems)
    }
    if (this.state.currentRound === 'round2') {
      var index2 = this.state.allRound2MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.allRound2MatchesArr
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      this.setState({ allRound2MatchesArr: theItems })
      console.log('this.state.currentItems 001', theItems)
    }
    if (this.state.currentRound === 'finalRound') {
      var theItems = [], stateName = ''
      if (this.state.currentSelection === 'sweet16') { theItems = this.state.sweet16Arr, stateName = 'sweet16Arr' }
      if (this.state.currentSelection === 'elite8') { theItems = this.state.elite8Arr, stateName = 'elite8Arr' }
      if (this.state.currentSelection === 'final4') { theItems = this.state.final4Arr, stateName = 'final4Arr' }
      if (this.state.currentSelection === 'finalRound') { theItems = this.state.finalArr, stateName = 'finalArr' }
      var index2 = theItems.map(function (x) { return x.id; }).indexOf(id);
      //var theItems=this.state.allRound2MatchesArr
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      this.setState({ [stateName]: theItems })
      console.log('this.state.currentItems 001', theItems)
    }
  }
  pickWinner = (id, winner, time) => {
    var nowTime = new Date().getTime()
    if (this.state.currentSelection === 'round1') {
      var index2 = this.state.allRound1MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }
      var theItems = this.state.allRound1MatchesArr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ allRound1MatchesArr: theItems })
      console.log('this.state.currentItems 002', theItems)
    }
    if (this.state.currentSelection === 'round2') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.allRound2MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.allRound2MatchesArr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }

      var theItems = this.state.allRound2MatchesArr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ allRound2MatchesArr: theItems })
    }
    if (this.state.currentSelection === 'sweet16') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.sweet16Arr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.sweet16Arr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }

      var theItems = this.state.sweet16Arr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ sweet16Arr: theItems })
      console.log('theItems', theItems)
    }
    if (this.state.currentSelection === 'elite8') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.elite8Arr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.elite8Arr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }

      var theItems = this.state.elite8Arr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ elite8Arr: theItems })
      console.log('theItems', theItems)
    }
    if (this.state.currentSelection === 'final4') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.final4Arr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.final4Arr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }

      var theItems = this.state.final4Arr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ final4Arr: theItems })
      console.log('iteeeems final4Arr', theItems)
    }
    if (this.state.currentSelection === 'finalRound') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.finalArr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }
      var theItems = this.state.finalArr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ finalArr: theItems })
      console.log('iteeeems finalArr', theItems)
    }
  }
  chosenWinner = (id, winner) => {
    if (this.state.currentSelection === 'round1') {
      var index2 = this.state.allRound1MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.allRound1MatchesArr
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      // theItems[index2]['isItPlayed']='played'
      this.setState({ allRound1MatchesArr: theItems })
      console.log('this.state.currentItems 008', theItems)
    }
    if (this.state.currentSelection === 'round2') {
      var index2 = this.state.allRound2MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.allRound2MatchesArr
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 009', theItems)
    }
    if (this.state.currentSelection === 'sweet16') {
      var index2 = this.state.sweet16Arr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.sweet16Arr
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 009', theItems)
    }
    if (this.state.currentSelection === 'elite8') {
      var index2 = this.state.elite8Arr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.elite8Arr
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 009', theItems)
    }
    if (this.state.currentSelection === 'final4') {
      var index2 = this.state.final4Arr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.final4Arr
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 010', theItems)
    }
    if (this.state.currentSelection === 'finalRound') {
      var index2 = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.finalArr
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 010', theItems)
    }

  }
  submitWinner = (id, winner) => {
    console.log('haaaaaaaaaaaapa 000000')
    if (this.state.currentSelection === 'round1') {
      var index = this.state.allRound1MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcome(index, winner)
      }
    }
    if (this.state.currentSelection === 'round2') {
      var index = this.state.allRound2MatchesArr.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcome(index, winner)
      }
    }
    if (this.state.currentSelection === 'sweet16') {
      var index = this.state.sweet16Arr.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcome(index, winner)
      }
    }
    if (this.state.currentSelection === 'elite8') {
      var index = this.state.elite8Arr.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcome(index, winner)
      }
    }
    if (this.state.currentSelection === 'final4') {
      var index = this.state.final4Arr.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcome(index, winner)
      }
    }
    if (this.state.currentSelection === 'finalRound') {
      var index = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcome(index, winner)
      }
    }
  }
  checkForOutcome = async (index, winner) => {
    try {
      //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
      var shortArr = []
      console.log('haaaaaaaaaaaapa 2222', index, winner)

      if (this.state.currentSelection === 'round1') {

        var theRound1Arr = this.state.allRound1MatchesArr
        theRound1Arr[index]['winner'] = winner
        delete theRound1Arr[index]['chosenWinner']
        delete theRound1Arr[index]['showChooseWinner']
        this.setState({ allRound1MatchesArr: theRound1Arr })
        this.state.allRound1MatchesArr.map((item, index) => {
          console.log('shortArr', shortArr)
          shortArr['p1Points'] = item.p1Points
          shortArr['p2Points'] = item.p2Points
          shortArr['winner'] = item.winner
          shortArr['status1'] = item.status1
          shortArr['id'] = item.id
          var theItem = {
            p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner,
            status1: item.status1, id: item.id
          }
          shortArr.push(theItem)
        })
        if (this.state.theEventKey === '', this.state.currentSelection === '', scoreName === '', this.state.allRound1MatchesArr.length < 1) return
        var scoreName = ''
        if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
        if (this.state.currentSelection === 'round1') { scoreName = 'round1Score' }
        if (this.state.currentSelection === 'round2') { scoreName = 'round2Score' }
        let theItems = JSON.stringify(shortArr);
        var theLink = 'theEvents::NCAAB::' + this.state.theEventKey + '::' + this.state.currentSelection + '::' + scoreName + '::' + theItems
        if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
        var theQuery = encodeURIComponent(theLink)
        console.log('001', this.state.theEventKey, this.state.currentSelection, scoreName, theItems)
        console.log('theLink', theLink, theItems)
        console.log('this.state.shortArr 006', shortArr)
        await axios.get("https://theramtournament.com/getMarchMadnessResults?term=" + theQuery)
          //await axios.get("http://localhost:4000/getMarchMadnessResults?term="+theQuery)
          .then((res) => {
            var theOutcome = res.data
            this.notify(theOutcome)
            if (theOutcome === 'Success Updating Results') {
              this.checkAuth()
            }
          })
      }
      if ((this.state.currentSelection === 'round2')) {
        this.checkForOutcome2(index, winner)
      }
      if ((this.state.currentSelection === 'sweet16')) {
        this.checkForFinalRoundOutcome(index, winner, this.state.sweet16Arr, 'sweet16Arr')
      }
      if ((this.state.currentSelection === 'elite8')) {
        this.checkForFinalRoundOutcome(index, winner, this.state.elite8Arr, 'elite8Arr')
      }
      if ((this.state.currentSelection === 'final4')) {
        this.checkForFinalRoundOutcome(index, winner, this.state.final4Arr, 'final4Arr')
      }
      if ((this.state.currentSelection === 'finalRound')) {
        this.checkForFinalRoundOutcome(index, winner, this.state.finalArr, 'finalArr')
      }
    } catch (error) {
      ////console.log('error',error)
    }

  }


  checkForOutcome2 = async (index, winner) => {
    try {
      //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
      var shortArr = []
      console.log('haaaaaaaaaaaapa 2222 round 2', index, winner)
      var theRound2Arr = this.state.allRound2MatchesArr
      theRound2Arr[index]['winner'] = winner
      delete theRound2Arr[index]['chosenWinner']
      delete theRound2Arr[index]['showChooseWinner']
      this.setState({ allRound2MatchesArr: theRound2Arr })
      this.state.allRound2MatchesArr.map((item, index) => {
        console.log('shortArr', shortArr)
        shortArr['p1Points'] = item.p1Points
        shortArr['p2Points'] = item.p2Points
        shortArr['winner'] = item.winner
        shortArr['status1'] = item.status1
        shortArr['id'] = item.id
        var theItem = {
          p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner,
          status1: item.status1, id: item.id
        }
        shortArr.push(theItem)
      })
      if (this.state.theEventKey === '', this.state.currentSelection === '', scoreName === '', this.state.allRound2MatchesArr.length < 1) return
      var scoreName = ''
      if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
      if (this.state.currentSelection === 'round1') { scoreName = 'round1Score' }
      if (this.state.currentSelection === 'round2') { scoreName = 'round2Score' }
      let theItems = JSON.stringify(shortArr);
      var theLink = 'theEvents::NCAAB::' + this.state.theEventKey + '::' + this.state.currentSelection + '::' + scoreName + '::' + theItems
      if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
      var theQuery = encodeURIComponent(theLink)
      console.log('001', this.state.theEventKey, this.state.currentSelection, scoreName, theItems)
      console.log('theLink', theLink, theItems)
      console.log('this.state.shortArr 006', shortArr)

      await axios.get("https://theramtournament.com/getMarchMadnessResults?term=" + theQuery)
        //await axios.get("http://localhost:4000/getMarchMadnessResults?term="+theQuery)
        .then((res) => {
          var theOutcome = res.data
          this.notify(theOutcome)
          if (theOutcome === 'Success Updating Results') {
            this.checkAuth()
          }
        })
    } catch (error) {
      ////console.log('error',error)
    }
  }
  checkForFinalRoundOutcome = async (index, winner, items, name) => {
    try {
      //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
      var shortArr = []
      console.log('haaaaaaaaaaaapa', this.state.currentSelection, index, winner)
      items[index]['winner'] = winner
      delete items[index]['chosenWinner']
      delete items[index]['showChooseWinner']
      this.setState({ [name]: items })
      items.map((item, index) => {
        console.log('shortArr', shortArr)
        shortArr['p1Points'] = item.p1Points
        shortArr['p2Points'] = item.p2Points
        shortArr['winner'] = item.winner
        shortArr['status1'] = item.status1
        shortArr['id'] = item.id
        var theItem = {
          p1Points: item.p1Points, p2Points: item.p2Points, winner: item.winner,
          status1: item.status1, id: item.id
        }
        shortArr.push(theItem)
      })
      if (this.state.theEventKey === '', this.state.currentSelection === '', scoreName === '', items.length < 1) return
      var scoreName = ''
      if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
      //if(this.state.currentSelection==='sweet16'){scoreName='round1Score'}
      //if(this.state.currentSelection==='round2'){scoreName='round2Score'}
      scoreName = this.state.currentSelection + 'Score'
      let theItems = JSON.stringify(shortArr);
      var theLink = 'theEvents::NCAAB::' + this.state.theEventKey + '::' + this.state.currentSelection + '::' + scoreName + '::' + theItems
      if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
      var theQuery = encodeURIComponent(theLink)
      console.log('001', this.state.theEventKey, this.state.currentSelection, scoreName, theItems)
      console.log('theLink', theLink, theItems)
      console.log('this.state.shortArr 006', shortArr)
      //return
      await axios.get("https://theramtournament.com/getMarchMadnessResults?term=" + theQuery)
        //await axios.get("http://localhost:4000/getMarchMadnessResults?term="+theQuery)
        .then((res) => {
          var theOutcome = res.data
          this.notify(theOutcome)
          if (theOutcome === 'Success Updating Results') {
            this.checkAuth()
          }
        })
    } catch (error) {
      ////console.log('error',error)
    }
  }
  render() {
    var flockTeamName = false
    var todayInMillis = new Date().getTime()
    var title1 = ''
    var currentRank = ''//this.state.currentEventUserInfo[this.state.currentSelection+'Rank']

    console.log('this.state.currentEventUserInfo 254', this.state.currentSelection, this.state.currentEventUserInfo[this.state.currentSelection + 'Rank'], this.state.currentSelection, this.state.currentEventUserInfo)
    var currentBPS = '', theCurrentScore = ''
    if (this.state.currentRound === 'finalRound') {
      currentBPS = this.state.currentEventUserInfo[this.state.theMenu + 'BPS']
      if (currentBPS == undefined) { currentBPS = '0' }
      theCurrentScore = this.state.currentEventUserInfo[this.state.theMenu + 'Score']
      if (theCurrentScore == undefined) { theCurrentScore = '0' }
      if (this.state.currentEventUserInfo[this.state.theMenu + 'Rank'] === undefined) { currentRank = false }
      else { currentRank = this.state.currentEventUserInfo[this.state.theMenu + 'Rank'] }
    } else {
      currentBPS = this.state.currentEventUserInfo[this.state.currentRound + 'BPS']
      if (currentBPS == undefined) { currentBPS = '0' }
      theCurrentScore = this.state.currentEventUserInfo[this.state.currentRound + 'Score']
      if (theCurrentScore == undefined) { theCurrentScore = '0' }
      if (this.state.currentEventUserInfo[this.state.currentRound + 'Rank'] === undefined) { currentRank = false }
      else { currentRank = this.state.currentEventUserInfo[this.state.currentRound + 'Rank'] }
    }

    console.log('this.state.currentEventUserInfo', currentBPS, this.state.currentEventUserInfo)
    //
    if (this.state.theMenu === 'east') { title1 = 'East' }
    if (this.state.theMenu === 'west') { title1 = 'West' }
    if (this.state.theMenu === 'south') { title1 = 'South' }
    if (this.state.theMenu === 'midwest') { title1 = 'Midwest' }
    var roundToModal = '', titleToShow = ''
    if (this.state.currentRound === 'round1') { roundToModal = 'round1', titleToShow = 'Round 1' }
    if (this.state.currentRound === 'round2') { roundToModal = 'round2', titleToShow = 'Round 2' }
    if (this.state.currentRound === 'finalRound') {
      roundToModal = this.state.theMenu
      if (this.state.theMenu === 'sweet16') { titleToShow = 'Sweet 16' }
      if (this.state.theMenu === 'elite8') { titleToShow = 'Elite 8' }
      if (this.state.theMenu === 'final4') { titleToShow = 'Final 4' }
      if (this.state.theMenu === 'finalRound') { titleToShow = 'Championship' }
    }
    if (this.state.dataAvailable) { flockTeamName = this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] }
    else { flockTeamName = false }
    return (
      <>
        <div className={style.container}>

          {this.state.allEvents.length > 0 ? <><div className={style.matchesHeadDiv}>
            {this.state.allEvents.map((item, index) => {
              var eventTime = dayjs(item.endTime).format('DD MMM YYYY')

              var theColor = '#292f51', timing = 'Active Event'
              if (item.endTime < todayInMillis && (item.endTime - todayInMillis) < -86400000) {
                theColor = '#919191'
                timing = 'Past Event'
              }
              if (this.state.theEventKey === item.id) {
                theColor = '#CB1E31'
              }
              return (
                <div className={style.headList} key={index} style={{ color: theColor, borderColor: theColor }} onClick={() => this.loadOtherEvent(item.id, item.title, item.time, item.stopRound1Edit, item.stopRound2Edit, item.stopSweet16Edit, item.stopElite8Edit, item.stopFinal4Edit, item.stopFinalEdit, item.eventYear, item.currentSelection, item.oddsUpdate, item.resultsUpdate, item.theMenu)}>
                  <div><p className={style.headListP1}>{item.title}</p>
                    <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
                      <p style={{ marginLeft: 2, marginRight: 2 }}>-</p>
                      <p className={style.headListP3}>{timing}</p></div></div>
                  {this.state.isAdmin ? <><SlOptionsVertical onClick={(event) => this.chooseHomeEvent(event, item.id)} />
                    {this.state.selectHomeEvent && this.state.selectHomeEventId == item.id ? <div className={style.selectHomeEventDiv} onClick={() => this.setState({ selectHomeEvent: false })}><button onClick={(event) => this.sendEvent(event, item.theData, item.id)}>Make home event</button></div> : null}</> : null}
                </div>
              )
            })}
          </div>
            <div className={style.profileDiv}>
              <div className={style.imageDiv}>
                {this.state.profilePhoto.length ? <img src={this.state.profilePhoto} /> :
                  <IoPersonSharp className={style.personIC} />}
              </div>
              <div className={style.detailsDiv}>
                <p>RAM Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['teamName'] : 'N/A'}</p>
                <p>Flock Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['flockName'] : 'N/A'}</p>
                {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.opeModal2()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal()}>Make Picks</p>}
              </div>
            </div>
            {this.state.isAdmin ? <div className={style.eventCreationDiv}>
              <p className={style.eventP} onClick={() => this.openMarchMadnessModal()}>Enter Event Details</p>
              <p className={style.eventP2} onClick={() => this.setState({ showCreateEventModal: true })}>Create New March Madness Event</p>
            </div> : null}
            <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
            {this.state.theLink.length > 1 && new Date().getTime() < this.state.theTime ? <div className={style.shareDiv} onClick={() => this.copyLink()}>
              <p>Flock Invite Link</p>
              <MdOutlineShare />
            </div> : null}
            <div className={style.picksDiv} onClick={() => this.openTheModal()}>
              {/*<p className={style.picksP}>CLICK HERE MAKE YOUR PICKS</p>*/}
              {this.state.dataAvailable ?
                <TypeAnimation
                  sequence={[
                    'CLICK HERE TO MAKE YOUR PICKS',
                    2000,
                    'CLICK HERE TO ENTER THE GAME',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  className={style.picksP}
                  repeat={Infinity}
                /> : <TypeAnimation
                  sequence={[
                    'CLICK HERE TO EDIT YOUR PICKS',
                    2000,
                    'CLICK HERE TO EDIT THE GAME',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  className={style.picksP}
                  repeat={Infinity}
                />}
            </div>
            {/*this.state.isAdmin?<div className={style.resultsCont}>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={() => this.checkForOddsUpdate()}>Update Match Odds</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.oddsTimeUpdate}</p>
                  </div>
                  <div className={style.resultsDiv}>
                  <button className={style.resultsBtn} onClick={() => this.checkForOutcome2()}>Fetch Results Updates</button>
                  <p className={style.lastUpdateP}>Last Update {this.state.fetchResultsTimeUpdate}</p>
                  </div>
                  </div>:null*/}
            <div className={style.scoresCont}>
              <div className={style.scoresCont1}>
                <p className={style.currentP}>{titleToShow}</p>
                <p className={style.scoreP1}>Best possibe Score:</p>
                <p className={style.scoreP2}>{this.state.dataAvailable ? currentBPS : '0.00'} points</p>
              </div>
              <div className={style.scoresCont2}>
                <p className={style.currentP}>{titleToShow}</p>
                <p className={style.scoreP1}>Current Score</p>
                <p className={style.scoreP2}>{this.state.dataAvailable ? theCurrentScore : '0.00'} points</p>
              </div>
              <div className={style.scoresCont3}>
                <p className={style.currentP}>{titleToShow}</p>
                <p className={style.scoreP1}>Current Rank in NCAAB</p>
                <p className={style.scoreP2}>{this.state.dataAvailable && currentRank !== false ? currentRank : 'N/A'}</p>
              </div>
            </div>
            <div className={style.eve2Div}>
              {this.state.currentSelection !== 'round1' && this.state.currentSelection !== 'round2' ? <>
                <p id={this.state.currentRound === 'finalRound' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('finalRound')}>Final Round: Sweet 16 to Championship</p>
                <p id={this.state.currentRound === 'round2' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round2')}>Round 2: Round of 32</p>
                <p id={this.state.currentRound === 'round1' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round1')}>Round 1: Round of 64</p></> : null}
              {this.state.currentSelection === 'round1' ? <>
                <p id={this.state.currentRound === 'round1' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round1')}>Round 1: Round of 64</p>
                <p id={this.state.currentRound === 'round2' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round2')}>Round 2: Round of 32</p>
                <p id={this.state.currentRound === 'finalRound' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('finalRound')}>Final Round: Sweet 16 to Championship</p></> : null}
              {this.state.currentSelection === 'round2' ? <>
                <p id={this.state.currentRound === 'round2' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round2')}>Round 2: Round of 32</p>
                <p id={this.state.currentRound === 'round1' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round1')}>Round 1: Round of 64</p>
                <p id={this.state.currentRound === 'finalRound' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('finalRound')}>Final Round: Sweet 16 to Championship</p></> : null}

            </div>

            {this.state.currentRound === 'round1' ? <div className={style.eveDiv}>
              <p id={this.state.theMenu === 'east' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('east')}>EAST</p>
              <p id={this.state.theMenu === 'west' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('west')}>WEST</p>
              <p id={this.state.theMenu === 'south' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('south')}>SOUTH</p>
              <p id={this.state.theMenu === 'midwest' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('midwest')}>MID WEST</p>
            </div> : null}
            {this.state.currentRound === 'round2' ? <div className={style.eveDiv}>
              <p id={this.state.theMenu === 'east' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('east')}>EAST</p>
              <p id={this.state.theMenu === 'west' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('west')}>WEST</p>
              <p id={this.state.theMenu === 'south' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('south')}>SOUTH</p>
              <p id={this.state.theMenu === 'midwest' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('midwest')}>MID WEST</p>
            </div> : null}
            {this.state.currentRound === 'finalRound' ? <div className={style.eveDiv}>
              <p id={this.state.theMenu === 'sweet16' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('sweet16')}>SWEET 16</p>
              <p id={this.state.theMenu === 'elite8' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('elite8')}>ELITE 8</p>
              <p id={this.state.theMenu === 'final4' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('final4')}>FINAL 4</p>
              <p id={this.state.theMenu === 'finalRound' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('finalRound')}>CHAMPIONSHIP</p>

            </div> : null}
            {/*this.state.showUpperBar?<div className={style.eve2Div}>
            <p id={this.state.theSubMenu==='round1'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('round1',this.state.theMenu)}>Round 1</p>
            <p id={this.state.theSubMenu==='round2'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('round2',this.state.theMenu)}>Round 2</p>
            <p id={this.state.theSubMenu==='sweet16'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('sweet16',this.state.theMenu)}>Sweet 16</p>
            <p id={this.state.theSubMenu==='elite8'?style.theSubMenuP2:null} onClick={()=>this.selectSubEvent('elite8',this.state.theMenu)}>Elite 8</p>
           </div>:null*/}

            <div className={style.listCont}>
              {this.state.currentItems.map((item, index) => {
                var playStat = ''
                var playStatCol = ''
                if (item.status1 === 'notPlayed') { playStat = 'Upcoming Event', playStatCol = '#292f51' }
                if (item.status1 === 'ongoing') { playStat = 'Ongoing Event', playStatCol = '#CB1E31' }
                if (item.status1 === 'played') { playStat = 'Finished Event', playStatCol = '#919191' }
                var timeDiff = item.timeInMillis - new Date().getTime()
                var statP1 = item.winner === 'player1' ? 'Won' : 'Lost'
                var statP2 = item.winner === 'player2' ? 'Won' : 'Lost'
                var player1Color = ''
                var player2Color = ''
                var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31'
                if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
                if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }
                if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
                if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
                //myOutcome
                var myPick = ''
                if (item.bet === 'player1') { myPick = item.player1 }
                if (item.bet === 'player2') { myPick = item.player2 }
                var theTime = dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
                return (
                  <div className={style.listDiv} key={index}>
                    <div className={style.theCont0}>
                      <div className={style.theCont01}>
                        {this.state.showUpperBar ? <p>March Madness {item.matchType} {this.state.currentRound !== 'finalRound' ? '- ' + title1 : null}</p> :
                          <p>March Madness - {item.matchType}</p>}
                        <p>{theTime}</p>
                      </div>
                      {this.state.isAdmin ? <div className={style.pickWinnerDiv} onClick={() => this.pickWinner(item.id, item.winner, item.timeInMillis)}>
                        <p>Pick Winner</p>
                      </div> : null}

                      {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                        <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


                      <div className={style.theCont}>
                        <div className={style.theContLeft}>
                          <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                            {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                            {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                          </div>
                          <p className={style.P1}>{item.player1 === 'N/A' ? 'TBA' : item.player1}</p>
                          {item.team2Seed ? <p className={style.countryP}>{'#' + item.team1Seed}</p> : null}
                          <p className={style.P2}>{item.p1Rec}</p>
                        </div>
                        <BsFillLightningFill className={style.sepIc} />
                        <div className={style.theContRight}>
                          <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                            {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                            {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                          </div>
                          <p className={style.P1}>{item.player2 === 'N/A' ? 'TBA' : item.player2}</p>
                          {item.team2Seed ? <p className={style.countryP}>{'#' + item.team2Seed}</p> : null}
                          <p>{item.country}</p>
                          <p className={style.P2}>{item.p2Rec}</p>
                        </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {item.bet && this.state.userLoggedIn ? <div id={style.statDiv}>
                        <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                        <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                        <p></p>
                      </div> :
                        <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
                      }
                    </div>
                    {this.state.isAdmin && item.showChooseWinner ? <div className={style.listDivB}>
                      <MdClose className={style.closeIc} onClick={() => this.closePickWinner(item.id)} />
                      <div>
                        <p className={style.chooseP}>Choose Winner</p>
                        <div className={item.chosenWinner === 'player1' ? style.listDivB2C : style.listDivB2} onClick={() => this.chosenWinner(item.id, 'player1')}>
                          <TbCheckbox size={20} />
                          <p>{item.player1}</p>
                        </div>
                        <div className={item.chosenWinner === 'player2' ? style.listDivB2C : style.listDivB2} onClick={() => this.chosenWinner(item.id, 'player2')}>
                          <TbCheckbox size={20} />
                          <p>{item.player2}</p>
                        </div>
                        <div className={style.listDivB3}>
                          <TbCheckbox size={16} />
                          {item.chosenWinner && item.chosenWinner === 'player1' ? <p>{item.player1}</p> : null}
                          {item.chosenWinner && item.chosenWinner === 'player2' ? <p>{item.player2}</p> : null}
                          {!item.chosenWinner || item.chosenWinner === 'N/A' ? <p>N/A</p> : null}

                        </div>
                        <button onClick={() => this.submitWinner(item.id, item.chosenWinner)}>Submit</button>
                      </div></div> : null}
                  </div>
                )
              })}
            </div>

          </> : null}



          {this.state.noEventToShow ?
            <div className={style.noEventDiv}>
              <p>No event to show at the moment</p>
              {this.state.isAdmin ? <button onClick={() => this.setState({ showCreateEventModal: true })}>Create Event</button>
                : null}
            </div> : null}


          {this.state.showCreateEventModal ? <div className={style.modal} onClick={() => this.setState({ showCreateEventModal: false })}>
            <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
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
              <button className={style.submitBtn} onClick={() => this.checkExistence()}>Create Event</button>
            </div>
          </div> : null}
        </div>
        <ToastContainer />
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent='NCAAB' theItems={this.state.itemToModals} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentRound} modalTitle={this.state.modalTitle} theMenu={this.state.theMenu} /></div> : null}
        {/*this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null*/}
        {this.state.marchMadnessModal ? <div className={style.detailsModal} onClick={() => this.setState({ marchMadnessModal: false })}><MarchMadnessModal eventToNCAABModal={this.state.selectionToModal} itemsToNCAABModal={this.state.itemToModals} theEventKey={this.state.theEventKey}  onClick={this.handleChildClick} /></div> : null}

      </>
    )
  }
}

export default MarchMadness