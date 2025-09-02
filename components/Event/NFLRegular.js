import React, { Component } from 'react'
import style from "./NFLRegular.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsFillLightningFill } from "react-icons/bs";
import Countdown from 'react-countdown';
import DetailsModal from './NFLRegDetailsModal'
import EditDetails from './DetailsModalCopy'
import NFLModal from './NFLRegModal'
import LogIn from '../LogInReg/LogIn'
import localStorage from 'local-storage'
import firebase from '../FirebaseClient'
import { IoPersonSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { TbCheckbox } from "react-icons/tb";
import { MdClose, MdCheck } from "react-icons/md";
import theRamOdds from './ramOdds.json'
import ProgressBar from '../Helper/ProgressBar'
import axios from "axios"
import dayjs from 'dayjs';
var allMatches = []
//week 2 start=>2025-09-12T00:15:00Z  end=>2025-09-16T02:00:00Z 
//week 3 start=>2025-09-19T00:15:00Z  end=>2025-09-23T00:15:00Z
//week 4 start=>2025-09-26T00:15:00Z  end=>2025-09-30T00:15:00Z
const week1Round = [
  { id: 'week1Game1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game5', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game6', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game7', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game8', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game9', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game10', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game11', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game12', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game13', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game14', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game15', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
  { id: 'week1Game16', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' }
]
const week2Round = [
  { id: 'week2Game1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game5', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game6', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game7', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game8', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game9', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game10', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game11', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game12', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game13', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game14', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game15', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
  { id: 'week2Game16', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week2 Round' },
]
const week3Round = [
  { id: 'week3Game1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game5', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game6', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game7', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game8', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game9', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game10', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game11', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game12', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game13', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game14', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game15', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
  { id: 'week3Game16', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week3 Round' },
]
class NCAA extends Component {
  state = {
    theMenu: 'week1Round', theItems: [], opendetailsModal: false, getRamDetails: false, dataAvailable: false, theEvent: 'Upcoming Events', currentID: 1,
    theRamUfc: '', theMarchMadness: false, theNfl: false, theFifa: '', userId: '', userLoggedIn: false, eventToShow: false, isAdmin: false,
    teamName: '', flockName: '', openLoginModal: false, clickHere1: 'CLICK HERE TO MAKE YOUR PICKS', clickHere2: 'CLICK HERE TO ENTER THE GAME', theEventTime: 0,
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'NFLRegular', pastEventsAvailable: false,
    eventRamUfc: '', eventMarchMadness: '', eventNfl: '', ramUfcMaincardArray: [], pastGames: [], theEventTitle: '', theEventKey: '', ramUfcEarlyPrelimsArray: [], count: 0,
    ramUfcPrelimsArray: [], nflArray: [], marchMadnessArray: [], ufcSubHeadings: '', upcomingGames: [], currentEventUserInfo: {}, allMatches: [], expired: false, nflModal: false,
    week1RoundArray: [], week2RoundArray: [], week3RoundArray: [], finalArray: [], allEvents: [], currentSelection: '', isWeek1DataAvailable: false, allGames: [],
    isWeek2DataAvailable: false, isWeek3DataAvailable: false, isFinalsDataAvailable: false, endTime: '', editType: 'stopweek1RoundEdit', eventToNFLModal: '', showCreateEventModal: false,
    isWeek1RoundPicked: false, isWeek2RoundPicked: false, isWeek3RoundPicked: false, isFinalsPicked: false, selectHomeEvent: false, itemsToNFLModal: [], week1Time: '', week1Err: '', week2Time: '', showChooseWeekModal: false,
    week2Time: '', week2Err: '', week3Time: '', week3Err: '', superBowlTime: '', superBowlErr: '', hasUserPicked: false, oddsUpdate: '', resultsUpdate: '', showConfirmModal: false, confirmMessage: '', confirmModalType: '',
    weekSelect: [{id:'WEEK 1',text:'WEEK 2'},{id:'WEEK 2',text:'WEEK 3'},{id:'WEEK 3',text:'WEEK 4'}], selectedWeek: '',selectedWeek2:'', week1RoundPostTime: 0, week2RoundPostTime: 0, week3RoundPostTime: 0, lastPostTime: 0, daysRangeModal: false,
    matchStartTime: '', matchEndTime: '', matchStartTimeErr: '', matchEndTimeErr: '', showProgressBar: false,chooseWeekErr:'',itemsToDetailsModal:[],cumulativeScore:0,allowPicks:['Week 2','Week 3','Week 4'],allowWeek2Pick:false,allowWeek3Pick:false,allowWeek4Pick:false,
    eventAlreadyFilled:false
  }
  componentDidMount = () => {
    this.checkAuth()
  }

  handleChildClick = () => {
    this.setState({ count: this.state.count + 1, nflModal: false });
    /*if(title==='getOdds'&&item.length>10){
    this.checkForOddsUpdate2(item)
    }
    console.log('azeeza', item)*/
  };
  checkForOddsUpdate2 = async (theLink) => {
    try {
      var theQuery = encodeURIComponent(theLink)
      console.log('the theLink 000000', theLink)
      //return
      var editDbRef = firebase.database().ref('/theEvents/NFL/eventsIds/' + this.state.theEventKey + '/' + this.state.editType)
      editDbRef.once('value', dataSnapshot => {
        if ((new Date().getTime() > dataSnapshot.val())) {
          this.notify('Update odds time expired')
        }
        else {
          console.log('kufinish kudonjo')
          axios.get("http://localhost:4000/updateNFLOdds?term=" + theQuery)

            .then((res) => {
              var theItems = res.data.result
              this.notify('Success Updating NFL the odds')
              ////console.log('theItems', theItems)

            })
        }
      })

    } catch (error) {
      ////console.log('error', error)
    }
  }
  checkForOddsUpdate = async () => {
    try {

      if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
      var theLink = 'theEvents::NFLRegular::' + this.state.theEventKey + '::' + this.state.currentSelection
      var theQuery = encodeURIComponent(theLink)
      console.log('the theLink 11111', theLink)
      //return
      var editDbRef = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + this.state.theEventKey + '/' + this.state.editType)
      editDbRef.once('value', dataSnapshot => {

        if ((new Date().getTime() > dataSnapshot.val())) {
          this.notify('Update odds time expired')
          this.setState({showProgressBar:false})
          console.log('the Z000000', new Date().getTime(), dataSnapshot.val())
        }
        else {
          console.log('the theLink RRRRRAAAAAAA', theLink)
          //axios.get("http://localhost:4000/updateNFLRegularOdds?term=" + theQuery)
          axios.get("https://theramtournament.com/updateNFLRegularOdds?term=" + theQuery)
            .then((res) => {
              this.setState({showConfirmModal:false,showProgressBar:false})
              var theItems = res.data
              this.notify('Success Updating the NFL odds')

            })
        }
      })

    } catch (error) {
      ////console.log('error', error)
    }
  }
  checkForOddsUpdateTime=()=>{
    this.showProgressBar3()
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3){
      this.notify('Can not update odds. Event not yet populated')
      this.setState({showConfirmModal:false,showProgressBar:false})
    }
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
    var stopEditTime=''
    if (this.state.currentSelection === 'week1Round') { stopEditTime = 'stopweek1RoundEdit'}
    if (this.state.currentSelection === 'week2Round') { stopEditTime = 'stopweek2RoundEdit' }
    if (this.state.currentSelection === 'week3Round') { stopEditTime = 'stopweek3RoundEdit'}
     var theDb =firebase.database().ref('/theEvents/eventsIds/'+this.state.theEventKey+'/'+stopEditTime)
     theDb.once('value', dataSnapshot => {
      if(dataSnapshot.exists()){
        console.log('dataSnapshot.val()',dataSnapshot.val())
         if(dataSnapshot.val()==='N/A'){
          console.log('yeeeeees 111111')
            //this.checkForOddsUpdate()
             this.setState({showConfirmModal:false,showProgressBar:false})
            this.notify('Can not update odds. Event not yet populated')
         }else{
         if(new Date().getTime()>=dataSnapshot.val()){
           this.setState({showConfirmModal:false,showProgressBar:false})
           this.notify('Can not update odds. Event already started')
         }else{
           console.log('yeeeeees 2222222')
            this.checkForOddsUpdate()
         }
         }
      }else{
         this.setState({showConfirmModal:false,showProgressBar:false})
         this.notify('Can not update odds. Event not yet populated')
      }
     })
  }
  checkForOutcome = async () => {
    try {
      //theEvents::NCAAF::ncaaf20242025::firstRound
      var scoreName = ''
      if (!this.state.theEventKey || this.state.theEventKey.length < 3) return

      //var theLink2='theEvents::ramUfc::'+theK
      if (this.state.currentSelection === 'wildCard') { scoreName = 'wildCardScore' }
      if (this.state.currentSelection === 'week2Round') { scoreName = 'week2RoundScore' }
      if (this.state.currentSelection === 'conferenceChampionship') { scoreName = 'conferenceChampionshipScore' }
      if (this.state.currentSelection === 'superBowl') { scoreName = 'superBowlScore' }
      var theLink = 'theEvents::NFL::' + this.state.theEventKey + '::' + this.state.currentSelection + '::' + scoreName
      if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
      //var theLink='theEvents::NFL::'+this.state.theEventKey+'::'+this.state.currentSelection+'::'+scoreName+'::'+theItems
      var theQuery = encodeURIComponent(theLink)
      console.log('theLink', theLink)
      //return

      //await axios.get("http://localhost:4000/getNCAAFNFLResults?term="+theQuery)
      await axios.get("https://theramtournament.com/getNCAAFNFLResults?term=" + theQuery)
        .then((res) => {
          ////console.log('theItems',res)
          var theOutcome = res.data
          ////console.log('theItems',theOutcome)
          if (theOutcome === 'sucesss') { }
        })
    } catch (error) {
      ////console.log('error',error)
    }
  }
  checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
          this.setState({ isAdmin: true })
        }
        this.setState({ userId, userLoggedIn: true })
        if (userId) { this.checkUpcomingPastGames(userId) }

      } else {
        this.setState({ userLoggedIn: false })
        this.checkUpcomingPastGames(userId)
      }
    })
  }

  checkUpcomingPastGames = async (userId) => {
    //return
    //console.log('naingia2222222222222')
    var gamesInfo = firebase.database().ref('/theEvents/NFLRegular/eventsIds/')
    var i = 0, allGames = []

    await gamesInfo.once('value', dataSnapshot => {
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
        var theData = data.val()
        var currentSelection = data.val().currentSelection
        

        var week1RoundPostTime = data.val().week1RoundPostTime
        var week2RoundPostTime = data.val().week2RoundPostTime
        var week3RoundPostTime = data.val().week3RoundPostTime

        if (week1RoundPostTime) { this.setState({ week1RoundPostTime: week1RoundPostTime }) }
        if (week2RoundPostTime) { this.setState({ week2RoundPostTime: week2RoundPostTime }) }
        if (week3RoundPostTime) { this.setState({ week3RoundPostTime: week3RoundPostTime }) }

        

        var oddsUpdate = data.val().oddsTimeUpdate
        var resultsUpdate = data.val().fetchResultsTimeUpdate
        if (!oddsUpdate) { oddsUpdate = 'N/A' } else { oddsUpdate = new Date(oddsUpdate).toLocaleString() }
        if (!resultsUpdate) { resultsUpdate = 'N/A' } else { resultsUpdate = new Date(resultsUpdate).toLocaleString() }

        theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, currentSelection: currentSelection, theData: theData, oddsUpdate: oddsUpdate, resultsUpdate: resultsUpdate }
        allGames.push(theEvents)

        if (gamesCount === i) {
          var theEventTitle = '', theEventKey = '', theEventTime = 0, oddsUpdate = '', resultsUpdate = ''
          if (allGames.length > 0) { allGames = allGames.sort(function (a, b) { return a.time - b.time }); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'], endTime = allGames[0]['endTime'], oddsUpdate = allGames[0]['oddsUpdate'], resultsUpdate = allGames[0]['resultsUpdate'] }
        }
        var expired = false
        if ((theEventTime - new Date().getTime()) < 86400000) {
          expired = true
        }
        if (week1RoundPostTime){ this.setState({ isWeek1DataAvailable: true,editType: 'stopweek1RoundEdit' })}
        if (week2RoundPostTime){ this.setState({ isWeek2DataAvailable: true,editType: 'stopweek2RoundEdit' })}
        if (week3RoundPostTime){ this.setState({ isWeek3DataAvailable: true,editType: 'stopweek3RoundEdit' })}
       /* if ((currentSelection === 'week1Round')) {
          this.setState({ isWeek1DataAvailable: true, isWeek2DataAvailable: false, isWeek3DataAvailable: false, editType: 'stopweek1RoundEdit' })
        }
        if ((currentSelection === 'week2Round')) {
          this.setState({ isWeek1DataAvailable: true, isWeek2DataAvailable: true, isWeek3DataAvailable: false, editType: 'stopweek2RoundEdit' })
        }
        if ((currentSelection === 'week3Round')) {
          this.setState({ isWeek1DataAvailable: true, isWeek2DataAvailable: true, isWeek3DataAvailable: true, editType: 'stopweek3RoundEdit' })
        }*/
        this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection:'week1Round', expired, endTime, oddsUpdate, resultsUpdate }, () => {
          this.getNFLMatches(userId)
          //////console.log('currentSelection',this.state.currentSelection)
        })
      })
    })
  }
  getNFLMatches =async (userId) => {
    allMatches = []
    this.setState({ week1RoundArray: [], week2RoundArray: [], week3RoundArray: [], finalArray: [], theMenu: 'week1Round', dataAvailable: false, currentEventUserInfo: {} })
    var userInfoDb = firebase.database().ref('/theEvents/NFLRegular/').child(this.state.theEventKey)
    this.checkForPicks(this.state.theEventKey)
    userInfoDb.once('value', dataSnapshot => {
      //////console.log('children count',dataSnapshot.child('mainCard').numChildren());
      //////console.log('prelims count',dataSnapshot.child('prelims').numChildren()); 
      var week1RoundCount = dataSnapshot.child('week1Round').numChildren()
      var week2RoundCount = dataSnapshot.child('week2Round').numChildren()
      var week3RoundCount = dataSnapshot.child('week3Round').numChildren()
      var theInfo = dataSnapshot.val()
      //console.log('the event eventSelection', theInfo)
      ////console.log('ncaaf20242025', theInfo.finals)
      if (theInfo.week1Round) {
        var array1 = []
        var i = 0
        for (var key in theInfo.week1Round) {
          i++
          var theData = theInfo.week1Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week1RoundCount) {
           
            //array1= array1.sort(({timeInMillis:a}, {timeInMillis:b}) => b-a);
             array1 = array1.sort((b, a) => b.timeInMillis-a.timeInMillis);
             console.log('whole maincard Array',array1)
            this.setState({ week1RoundArray: array1, theItems: array1,itemsToDetailsModal:array1})
            this.getMatchesInfo(this.state.userId, 'week1Round',array1,'week1RoundArray','isWeek1RoundPicked')
          }
        }
      }
      //return
      if (theInfo.week2Round) {
        var array1 = []
        //////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.week2Round) {
          i++
          var theData = theInfo.week2Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week2RoundCount) {
            //////console.log('whole prelimms Array',array1)
            array1 = array1.sort((b, a) => b.timeInMillis-a.timeInMillis);
            this.setState({ week2RoundArray: array1 })
            this.getMatchesInfo(this.state.userId, 'week2Round',array1,'week2RoundArray','isWeek2RoundPicked')
          }
        }
        //prelimsArray
      }
          if (theInfo.week3Round) {
        var array1 = []
        //////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.week3Round) {
          i++
          var theData = theInfo.week3Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week3RoundCount) {
            //console.log('wholeweek3RoundArray',array1)
            array1 = array1.sort((b, a) => b.timeInMillis-a.timeInMillis);
            this.setState({ week3RoundArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId, 'week3Round',array1,'week3RoundArray','isWeek3RoundPicked')
            }
          }
        }
      } 
     // return
        var totalScore=0
        var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
        var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFLRegular/" + this.state.theEventKey + '/details/')
        userInfoDb.once('value', dataSnapshot => {
        console.log('ndani 111111111111',dataSnapshot.exists())
        var dataExists = dataSnapshot.exists()
        if(!dataExists)return
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
              totalScore = Number(theInfo.week1RoundScore) + Number(theInfo.week2RoundScore) + Number(theInfo.week3RoundScore)
              this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank,cumulativeScore:totalScore,dataAvailable:true})
             // currentEventUserInfo = dataSnapshot.val()
             
              console.log('the dddddddd',theInfo)
            }
          })
        })

        return
      if (theInfo.week2Round) {
        var array1 = []
        //////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.week2Round) {
          i++
          var theData = theInfo.week2Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week2RoundCount) {
            //////console.log('whole prelimms Array',array1)
            this.setState({ week2RoundArray: array1 })
            this.getMatchesInfo(this.state.userId, 'week1Round')
          }
        }
        //prelimsArray
      } else {
        //////console.log('hakuna prelimsssssss')
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId, 'week1Round')
        }
      }
      ////console.log('iko finalssssssssssssssssss 0000')
      if (theInfo.week3Round) {
        var array1 = []
        //////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.week3Round) {
          i++
          var theData = theInfo.week3Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week3RoundCount) {
            //console.log('wholeweek3RoundArray',array1)
            this.setState({ week3RoundArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId, 'week2Round')
              this.getMatchesInfo(this.state.userId, 'week3Round')
            }
          }
        }
      } else {
        if (this.state.userId.length > 3) {
          this.getMatchesInfo(this.state.userId, 'week2Round')

          //////console.log('hakuna early prelimsssssss')
        }
      }
    })
    //////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
  }
  getMatchesInfo = async (userId, selection,theArr,arrName,isPicked) => {
    //console.log('allMatches',userId,this.state.theEventKey,theArr,arrName)
    //return
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NFLRegular/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFLRegular/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFLRegular/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NFLRegular/')
    var currentEventUserInfo = '', totalScore = 0
   
   
     userBetsDb.child(selection).once('value', dataSnapshot => {
      console.log('ndani 111111111111',dataSnapshot.exists())
        var dataExists = dataSnapshot.exists()
        if(dataExists){
          var i=0
          console.log('ndani 22222',dataSnapshot.val())
          var theData = dataSnapshot.val()
          var theCount = dataSnapshot.numChildren()
           for (var key in theData) {
            i++
            var theId = key
            var betPlayer = theData[key]
            theArr.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (theCount === i) {
              console.log('round 19 item',theArr)
              this.setState({[arrName]:theArr,[isPicked]:true})
            }
          }
        }

        return
        var week2RoundExists = dataSnapshot.child('week2Round').exists()
        var week3RoundExists = dataSnapshot.child('week3Round').exists()

        var week1RoundCount = dataSnapshot.child('week1Round').numChildren()
        var week2RoundCount = dataSnapshot.child('week2Round').numChildren()
        var week3RoundCount = dataSnapshot.child('week3Round').numChildren()

 
        if (week1RoundExists) {
          var i = 0
          week1RoundArr = theData.week1Round
          //console.log('round 14 item',round1Count,round1Arr)
          for (var key in week1RoundArr) {
            i++
            var theId = key
            var betPlayer = week1RoundArr[key]
            this.state.week1RoundArray.map((item2, index) => {
              if (item2.id === theId) {
                item2['bet'] = betPlayer
              }
            })
            if (week1RoundCount === i) {
              console.log('round 19 item',week1RoundArr)
              this.setState({week1RoundArray:week1RoundArr})
            }
          }
        }
   
      })
   
   
     return
   
   
    userInfoDb.once('value', dataSnapshot => {
      if (!dataSnapshot.val()) { this.setState({ hasUserPicked: false }) }
      else {
        this.setState({ hasUserPicked: true })
        selectedMatchesKeyDb.once('value', dataSnapshot => {
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
            //console.log('the type user 0000000000000', dataSnapshot.val())
            if (dataSnapshot.val()) {
              var theInfo = dataSnapshot.val()
              this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank })
              currentEventUserInfo = dataSnapshot.val()
              totalScore = Number(theInfo.firstRoundScore) + Number(theInfo.quarterFinalsScore) + Number(theInfo.semiFinalsScore) + Number(theInfo.finalsScore)
              //console.log('the dddddddd',theInfo)

            }
          })
          var thetrrrr = ''
          ////console.log('this.state.currentSelection', this.state.currentSelection)
          // //console.log('week1RoundArray',this.state.week1RoundArray,'week2RoundArray',this.state.week2RoundArray,'week3RoundArray',this.state.week3RoundArray)
          if (selection === 'wildCard') {
            thetrrrr = this.state.week1RoundArray
          }
          if (selection === 'week2Round') {
            thetrrrr = this.state.week2RoundArray
          }
          if (selection === 'conferenceChampionship') {
            thetrrrr = this.state.week3RoundArray
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
            if (itemsCount === 6) { this.setState({ isWeek1RoundPicked: true }) }
            if (itemsCount === 10) { this.setState({ isWeek1RoundPicked: true, isWeek2RoundPicked: true }) }
            if (itemsCount === 12) { this.setState({ isWeek1RoundPicked: true, isWeek2RoundPicked: true, isWeek3RoundPicked: true }) }
            if (itemsCount === 13) { this.setState({ isWeek1RoundPicked: true, isWeek2RoundPicked: true, isWeek3RoundPicked: true, isFinalsPicked: true }) }
            if (selection === 'wildCard' && itemsCount < 6) return
            if (selection === 'week2Round' && itemsCount < 10) return
            if (selection === 'conferenceChampionship' && itemsCount < 12) return
            if (selection === 'superBowl' && itemsCount < 13) return
            console.log('MEGA count', this.state.theEventKey, selection, itemsCount)
            console.log('MEGA isWeek1RoundPicked', this.state.isWeek1RoundPicked)
            console.log('MEGA isWeek2RoundPicked', this.state.isWeek2RoundPicked)
            console.log('MEGA isWeek3RoundPicked', this.state.isWeek3RoundPicked)
            console.log('MEGA isFinalsPicked', this.state.isFinalsPicked)
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
              }
            })
          })

        })
      }
    })
  }
  loadOtherEvent = async (theEventKey, theEventTitle, currentSelection, oddsUpdate, resultsUpdate) => {
    this.setState({ oddsUpdate, resultsUpdate })
    var eventsInfo = firebase.database().ref('/theEvents/eventsIds/' + theEventKey + '/time')
    await eventsInfo.once('value', dataSnapshot => {
      var theInfo = dataSnapshot.val()
      var theEventTime = dataSnapshot.val()
      var expired = false
      if ((theEventTime - new Date().getTime()) < 86400000) {
        expired = true
      }
      if (navigator.onLine === false) {
        this.notify('No internet! please check your internet connection')
        return
      }
      //this.setState({isWeek1RoundPicked:false,isWeek2RoundPicked:false,isWeek3RoundPicked:false,isFinalsPicked:false})
      this.setState({ theEventKey, theEventTitle, expired, currentSelection, isWeek1RoundPicked: false, isWeek2RoundPicked: false, isWeek3RoundPicked: false, isFinalsPicked: false }, () => {
        this.getNFLMatches()
        if ((currentSelection === 'week1Round')) { this.setState({ editType: 'stopweek1RoundEdit' }) }
        if ((currentSelection === 'week2Round')) { this.setState({ editType: 'stopweek2RoundEdit' }) }
        if ((currentSelection === 'week3Round')) { this.setState({ editType: 'stopweek3RoundEdit' }) }
      })
    })
  }

  hideModal = () => {
    this.setState({ opendetailsModal: false })
    ////////console.log('Button clicked!');
  };
  openTheModal = async () => {
    if (this.state.userLoggedIn === false) {
      this.notify("Please Log In to continue")
      this.setState({ openLoginModal: true })
      return
    } 
    if(this.state.currentSelection === 'week1Round'&&this.state.allowWeek2Pick===false){
      this.notify("Week 2 picking not allowed at the moment. Please try again later")
      return
    }
    if(this.state.currentSelection === 'week2Round'&&this.state.allowWeek3Pick===false){
      this.notify("Week 3 picking not allowed at the moment. Please try again later")
      return
    }
    if(this.state.currentSelection === 'week3Round'&&this.state.allowWeek4Pick===false){
      this.notify("Week 4 picking not allowed at the moment. Please try again later")
      return
    }
    var itemToModals = ''
    if (this.state.currentSelection === 'week1Round') { itemToModals = this.state.week1RoundArray }
    if (this.state.currentSelection === 'week2Round') { itemToModals = this.state.week2RoundArray }
    if (this.state.currentSelection === 'week3Round') { itemToModals = this.state.week3RoundArray }
    this.setState({itemsToDetailsModal:itemToModals})

    
    var i = 0, pointMissing = false
    console.log('this.state.theItems rr', this.state.currentSelection,this.state.editType, itemToModals)
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
          this.openTheModal2()
        }
      }
    })
  }
  openTheModal2 = () => {
    console.log('this.state.theEventKey', this.state.currentSelection, this.state.theEventKey, this.state.editType)
    //return
    // var theDb =firebase.database().ref('/theEvents/eventsIds/'+theEventKey)
    var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/' + this.state.editType)
    editDbRef.once('value', dataSnapshot => {
       console.log('zeve mbyu 0001',dataSnapshot.val())
      console.log('zeve mbyu 002',dataSnapshot.val())
      if (dataSnapshot.val() === 'N/A') {
        this.notify('Event pick/edit not available at the moment')
      } else {
         console.log('now 005', new Date().getTime(), dataSnapshot.val())
        if ((new Date().getTime() > dataSnapshot.val())) {
          console.log('now 005', new Date().getTime(), dataSnapshot.val())
          if (this.state.currentSelection === 'week3Round') {
            this.notify("Event pick expired")
          } else { this.notify("Can't make a pick when the event has already started") }
        }
        else {
          this.setState({ openLoginModal: false, opendetailsModal: true })
        }
      }

      /* if(this.state.currentSelection!=='wildCard'){
         var theDbRef=firebase.database().ref('/userBets/scoreBoards/NFL/'+this.state.theEventKey)
         theDbRef.child(this.state.userId).once('value', dataSnapshot => {
           //console.log('the dddddddddddd',this.state.userId,dataSnapshot.val())
            if(dataSnapshot.exists()){this.setState({ openLoginModal:false,opendetailsModal: true })}
            else{this.notify("Can't make a pick when the event has already started")}
         })
       }else{
         this.setState({ openLoginModal:false, opendetailsModal:true})
       }*/
       
    })
  }
  opeModal2 = () => {
    if (this.state.expired) {
      this.notify('Event pick/edit time expired')
      return
    }
    this.setState({ editDetailsModal: true })
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
  chooseHomeEvent = (event) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ selectHomeEvent: true })
  }
  sendEvent = (event, data, id) => {
    event.stopPropagation()
    event.preventDefault()
    data['id'] = id
    console.log('data',data)
    //return
    var theDb = firebase.database().ref('/theEvents/eventToShowHomePage/')
    theDb.set(data, error => {
      if (!error) {
        this.setState({ selectHomeEvent: false })
        this.notify('Selected Succesfully')
      }
    })
  }
  updateEvent = async () => {
    var oddsApi = "https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
    const response = await axios.get(oddsApi)
    var theOddsJson = response.data
    sortOddsJson(theOddsJson)
  }
  openRangeLModal= () => {
   console.log('detailsssssss', this.state.theEventKey, this.state.selectedWeek)
    if (this.state.selectedWeek === ''){
      this.setState({chooseWeekErr:'Data not filled in'})
      this.notify('Fill in week to continue')
      return
    }
    console.log('rrrrrrrrrrrrrrrrrrra')
    this.setState({chooseWeekErr:'',daysRangeModal:true,showChooseWeekModal: false})
  }
  openNFLModal = () => {
    console.log('detailsssssss', this.state.theEventKey, this.state.selectedWeek)
    if (this.state.selectedWeek === ''){
      this.setState({chooseWeekErr:'Data not filled in'})
      this.notify('Fill in week to continue')
      return
    }
    this.setState({chooseWeekErr:''})
    this.setState({ itemsToNFLModal: [], showChooseWeekModal: false })

    var editDbRef = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + this.state.theEventKey)
    var theSelection = ''
    if (this.state.selectedWeek === 'WEEK 1') { theSelection = 'week1Round', this.setState({ eventToNFLModal: 'week1Round', itemsToNFLModal: this.state.week1RoundArray, nflModal: true, lastPostTime: this.state.week1RoundPostTime }) }
    if (this.state.selectedWeek === 'WEEK 2') { theSelection = 'week2Round', this.setState({ eventToNFLModal: 'week2Round', itemsToNFLModal: this.state.week2RoundArray, nflModal: true, lastPostTime: this.state.week2RoundPostTime }) }
    if (this.state.selectedWeek === 'WEEK 3') { theSelection = 'week3Round', this.setState({ eventToNFLModal: 'week3Round', itemsToNFLModal: this.state.week3RoundArray, nflModal: true, lastPostTime: this.state.week3RoundPostTime }) }

    return
    editDbRef.once('value', dataSnapshot => {
      var data = dataSnapshot.val()
      var selection = data.currentSelection
      var week1EditExpiry = data.stopweek1RoundEdit
      var week2EditExpiry = data.stopweek2RoundEdit
      var week3EditExpiry = data.stopweek3RoundEdit
      var superBowlEditExpiry = data.stopSuperBowlEdit
      if (selection === 'week1Round' && week1EditExpiry !== 'N/A' && new Date().getTime() > week1EditExpiry) {
        console.log('week 1  expired')
        this.setState({ eventToNFLModal: 'week2Round', itemsToNFLModal: this.state.week2RoundArray, nflModal: true })
      } else if (selection === 'week1Round' && (new Date().getTime() < week1EditExpiry) || week1EditExpiry === 'N/A') {
        var allArray = [...this.state.week1RoundArray, ...this.state.week2RoundArray, ...this.state.week3RoundArray, ...this.state.finalArray]
        this.setState({ eventToNFLModal: 'week1Round', itemsToNFLModal: this.state.week1RoundArray, nflModal: true })
        console.log('hapa kwa all finalArray', this.state.week1RoundArray)
      }
      if (selection === 'week2Round' && week2EditExpiry !== 'N/A' && new Date().getTime() > week2EditExpiry) {
        console.log('divisional Round expired')
        this.setState({ eventToNFLModal: 'conferenceChampionship', itemsToNFLModal: this.state.week3RoundArray, nflModal: true })
      } else if (selection === 'week2Round' && new Date().getTime() < week2EditExpiry) {
        this.setState({ eventToNFLModal: 'week2Round', itemsToNFLModal: this.state.week2RoundArray, nflModal: true })
      }
      if (selection === 'conferenceChampionship' && week3EditExpiry !== 'N/A' && new Date().getTime() > week3EditExpiry) {
        console.log('hapa kwa superbowl 111', this.state.finalArray)
        //return
        this.setState({ eventToNFLModal: 'superBowl', itemsToNFLModal: this.state.finalArray, nflModal: true })
      } else if (selection === 'conferenceChampionship' && new Date().getTime() < week3EditExpiry) {
        this.setState({ eventToNFLModal: 'conferenceChampionship', itemsToNFLModal: this.state.week3RoundArray, nflModal: true })
      }
      if (selection === 'superBowl' && superBowlEditExpiry !== 'N/A' && new Date().getTime() > superBowlEditExpiry) {
        console.log('wild card expired')
        this.notify("Can't enter event details to an expired event")
      } else if (selection === 'superBowl' && new Date().getTime() < superBowlEditExpiry) {
        console.log('hapa kwa superbowl')
        this.setState({ eventToNFLModal: 'superBowl', itemsToNFLModal: this.state.finalArray, nflModal: true })
      }
      /*console.log('zeve mbyu',dataSnapshot.val(),new Date().getTime())
     if((new Date().getTime()>dataSnapshot.val())){
      this.notify('Event pick/edit time expired')
     }*/
    })
    //this.setState({nflModal:true,eventToNFLModal:''})
  }
  inputChange = async (e) => {
    var value = e.target.value
    console.log('valueee', value)

    await this.setState({ [e.target.id]: value })
    if (this.state.week1Time.length >= 3) { this.setState({ week1Err: '' }) }
    if (this.state.week2Time.length >= 3) { this.setState({ week2Err: '' }) }
    //this.state.matchEndTime
     if (this.state.matchEndTime.length >= 3) { 
console.log('zzezezezze')
      var lastMatchTime=this.state.matchEndTime.split(':')
      console.log('lastMatchTime',lastMatchTime)
      var part1=lastMatchTime[0]
      var part2=lastMatchTime[1]
      var part3=lastMatchTime[2]
      part2=Number(part2)
      if(part2<10){part2=part2+10}
      else{part2=part2+1}
      part2=part2+''
      if(part2.length<=1){part2='0'+part2}
      var newTime=part1+':'+part2+':'+part3
      this.setState({matchEndTime:newTime})
      console.log('newTimerrrrrrr',newTime)
     }
    if (this.state.week3Time.length >= 3) { 
      
      this.setState({ week3Err: '' }) } 
    if (this.state.superBowlTime.length >= 3) { this.setState({ superBowlErr: '' }) }
  }
  enterEventDetails = () => {
    if (this.state.matchStartTime.length >= 3) { this.setState({ matchStartTimeErr: '' }) } else { this.setState({ matchStartTimeErr: 'Date must be filled' }) }
    if (this.state.matchEndTime.length >= 3) { this.setState({ matchEndTimeErr: '' }) } else { this.setState({ matchEndTimeErr: 'Date must be filled' }) }
    if (this.state.matchStartTime.length < 1 || this.state.matchEndTime.length < 1) {
      this.notify('All fields must be filled')
    } else {
       this.showProgressBar2()
      this.fillEventDetails(this.state.matchStartTime, this.state.matchEndTime)
    }
  }
    showProgressBar3 = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      30000)
  }
  showProgressBar = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      5000)
  }
    showProgressBar2 = () => {
    this.setState({ showProgressBar: true })
    this.timerHandle = setTimeout(
      () => this.setState({ showProgressBar: false }),
      30000)
  }
  fillEventDetails = async (firstEventTime, lastEventTime) => {
    this.showProgressBar()
    var idStart = '', matchType = ''
    if (this.state.selectedWeek === 'WEEK 1') { idStart = 'week1Game', matchType = 'Week1 Round' }
    if (this.state.selectedWeek === 'WEEK 2') { idStart = 'week2Game', matchType = 'Week2 Round' }
    if (this.state.selectedWeek === 'WEEK 3') { idStart = 'week3Game', matchType = 'Week3 Round' }
    if (this.state.currentSelection === 'superBowl') { idStart = 'superBowlMatch' }
    var oddsApi = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?commenceTimeFrom=" + firstEventTime + "&commenceTimeTo=" + lastEventTime + "&regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
    //var oddsApi="https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?commenceTimeFrom=2025-02-09T23:30:00Z&commenceTimeTo=2025-01-26T23:30:00Z&regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
    //var oddsApi="https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    console.log('oddsApi', oddsApi)
    const response = await axios.get(oddsApi)
    var theOddsJson = response.data
    this.sortOddsJson(theOddsJson, idStart, matchType, this.state.selectedWeek)
    console.log('the theOddsJson', theOddsJson)

  }
  sortOddsJson = async (theOddsJson, idStart, matchType, selectedWeek) => {

    try {
      //console.log('theOddsJson',theOddsJson)
      //return
      var jCount = 0
      theOddsJson.map((item1, index) => {
        var i = 0, newOddsJson = []
        jCount++
        item1.bookmakers.map((item2) => {
          i++
          var draftkingsMarket = []
          if (item2.key === 'draftkings') {

            draftkingsMarket = item2.markets
            //console.log('draftkings markets',item2.markets)
            //console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
            draftkingsMarket.map((item3) => {
              //console.log('draftkingsMarket 006',item3.outcomes)
              const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
              theOddsJson[index].draftkingsOdds = obj
            })
          }

          if (item1.bookmakers.length === i) {
            //console.log('new array',theOddsJson)

            var m = 0
            theOddsJson.map((item12, index) => {
              m++
              //console.log('item12.draftkingsOdds',item12.draftkingsOdds)
              var awayPoints = 0, homePoints = 0
              if (item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0) {
                //console.log('shit is undefined')
              } else {
                var homeFighterName = item12.home_team
                var awayFighterName = item12.away_team
                awayPoints = item12.draftkingsOdds[awayFighterName]
                homePoints = item12.draftkingsOdds[homeFighterName]
              }

              var hTPointsNum = Number(theRamOdds[homePoints])
              var aTPointsNum = Number(theRamOdds[awayPoints])
              if (homePoints < -10000) { hTPointsNum = 1.01 }
              if (awayPoints < -10000) { aTPointsNum = 1.01 }
              if (homePoints > 12620) { hTPointsNum = 1247.20 }
              if (awayPoints > 12620) { aTPointsNum = 1247.20 }
              //console.log('item2.homeTeam',item2.homeTeam,item2.homeTeamPoints)

              if (homePoints <= 101 && homePoints >= -101) { hTPointsNum = 2.03 }
              if (awayPoints <= 101 && awayPoints >= -101) { aTPointsNum = 2.03 }


              console.log('hTPointsNum', hTPointsNum, 'aTPointsNum', aTPointsNum)

              var matchTime = new Date(item12.commence_time);
              var newItem = {
                player2: item12.away_team, player1: item12.home_team, apiId: item12.id, commenceTime: item12.commence_time,
                timeInMillis: matchTime.getTime(), p2Points: aTPointsNum, p1Points: hTPointsNum, id: idStart + (index + 1), time: matchTime.getTime(),
                p1Rec: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A',
                p2Photo: 'N/A', status1: 'notPlayed', status2: '', bet: '', winner: 'N/A', matchType: matchType, p1Rec: 'N/A', p2Rec: 'N/A'
              }
              newOddsJson.push(newItem)
            })
            if (m === theOddsJson.length) {
              // this.setState({theNewArr:newOddsJson})
              //newOddsJson
              this.getLogos(newOddsJson, selectedWeek)
              console.log('new array laaast', newOddsJson)
            }
          }
        })
      })
    } catch (error) {
      console.log('ERROR OCURRED AT SORTING ODDS', error)
    }
  }
  getLogos = async (theArr, selectedWeek) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    //console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            //console.log('the teams',theItem)
            //console.log('the team name',theItem['displayName'])
            // console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              console.log('theArr 22222222 kufinish', theArr)
              this.setState({ itemsToNFLModal: [], showChooseWeekModal: false,daysRangeModal:false,showProgressBar: false,eventAlreadyFilled:true})
              var theSelection = ''
              if (this.state.selectedWeek === 'WEEK 1') { theSelection = 'week1Round', this.setState({ eventToNFLModal: 'week1Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              if (this.state.selectedWeek === 'WEEK 2') { theSelection = 'week2Round', this.setState({ eventToNFLModal: 'week2Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              if (this.state.selectedWeek === 'WEEK 3') { theSelection = 'week3Round', this.setState({ eventToNFLModal: 'week3Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              //if (this.state.currentSelection==='superBowl') {this.setState({superBowlEdit:theArr,isItSubmit:true})}
              //this.sendToFirebase()
            }
          })

        })

      })
  }
  checkEvent = () => {
    var checkEventDb = firebase.database().ref('/theEvents/NFLRegular/eventsIds/')
    var currentYear = new Date().getFullYear()
    var nextYear = currentYear + 1


    if (this.state.week1Time.length >= 3) { this.setState({ week1Err: '' }) } else { this.setState({ round1Err: 'Date must be filled' }) }
    if (this.state.week2Time.length >= 3) { this.setState({ week2Err: '' }) } else { this.setState({ quarterFinalsErr: 'Date must be filled' }) }
    if (this.state.week3Time.length >= 3) { this.setState({ week3Err: '' }) } else { this.setState({ semiFinalsErr: 'Date must be filled' }) }


    if (this.state.week1Time.length < 1 || this.state.week2Time.length < 1 || this.state.week3Time.length < 1
    ) {
      this.notify('All fields must be filled')
    } else {
      var week1Year = new Date(this.state.week1Time).getFullYear()
      var week2Year = new Date(this.state.week2Time).getFullYear()
      var week3Year = new Date(this.state.week3Time).getFullYear()
      if (week1Year < currentYear) { this.setState({ week1Err: 'Year must be current or future' }); return }
      if (week2Year < currentYear) { this.setState({ week2Err: 'Year must be current or future' }); return }
      if (week3Year < currentYear) { this.setState({ week3Err: 'Year must be current or future' }); return }

      var eventKey = 'NFLRegular-' + week1Year
      var eventTitle = 'NFL REGULAR  ' + week1Year
      console.log('week1Year', week1Year, week2Year, week3Year, eventKey, eventTitle)

      //return
      checkEventDb.child(eventKey).once('value', dataSnapshot => {
        if (dataSnapshot.exists()) {
          var isFilled = dataSnapshot.val().stopweek1RoundEdit
          if (isFilled === 'N/A') {
            this.createEvent(eventKey, eventTitle)
          } else {
            this.notify(week1Year + ' Event Already Filled')
          }
        } else {
          this.createEvent(eventKey, eventTitle)
        }
      })
    }
  }
  createEvent = (eventKey, eventTitle) => {
    var week1Arr = {}, week2Arr = {}, week3Arr = {}
    var generalDb = firebase.database().ref('/theEvents/NFLRegular/' + eventKey)
    week1Round.map((item, index) => {
      week1Round[index]['timeInMillis'] = new Date(this.state.week1Time).getTime()
      week1Round[index]['commenceTime'] = this.state.week1Time

      ///adding
      /*round1[index]['player1'] = item.id+'team 1'
      round1[index]['player2'] = item.id+'team 2'
      
      var isOdd=this.isOdd(index+1)
      if(isOdd){round1[index]['winner'] = item.id+'team 1'}
      else{round1[index]['winner'] = item.id+'team 2'}*/
      ////
      week1Round[index]['time'] = this.state.week1Time
      week1Arr[item.id] = item

      if (week1Round.length === index + 1) {
        console.log('week1Round 1111', week1Arr)
        generalDb.child('/week1Round/').update(week1Arr)
      }
    })
    week2Round.map((item, index) => {
      week2Round[index]['timeInMillis'] = new Date(this.state.week2Time).getTime()
      week2Round[index]['commenceTime'] = this.state.week2Time
      week2Round[index]['time'] = this.state.week2Time

      ///adding
      /*quarterFinals[index]['player1'] = item.id+'team 1'
      quarterFinals[index]['player2'] = item.id+'team 2'
 
      quarterFinals[index]['p1Points'] = 4
      quarterFinals[index]['p2Points'] = 3
 
      var isOdd=this.isOdd(index+1)
     if(isOdd){round1[index]['winner'] = item.id+'team 1'}
     else{round1[index]['winner'] = item.id+'team 2'}*/
      ////

      week2Arr[item.id] = item
      if (week2Round.length === index + 1) {
        console.log('week2Arr 1111', week2Arr)
        generalDb.child('/week2Round/').update(week2Arr)
      }
    })
    week3Round.map((item, index) => {
      week3Round[index]['timeInMillis'] = new Date(this.state.week3Time).getTime()
      week3Round[index]['commenceTime'] = this.state.week3Time
      week3Round[index]['time'] = this.state.week3Time
      ///adding
      /* semiFinals[index]['player1'] = item.id+'team 1'
       semiFinals[index]['player2'] = item.id+'team 2'
 
       semiFinals[index]['p1Points'] = 4
       semiFinals[index]['p2Points'] = 3
 
       var isOdd=this.isOdd(index+1)
       if(isOdd){round1[index]['winner'] = item.id+'team 1'}
       else{round1[index]['winner'] = item.id+'team 2'}*/
      ////
      week3Arr[item.id] = item
      if (week3Round.length === index + 1) {
        console.log('week3Arr 1111', week3Arr)
        generalDb.child('/week3Round/').update(week3Arr, (error) => {
          if (error) {
            this.notify('An error occured while creating event, try again')
          } else {
            var toTheEventsIds = {
              time: new Date(this.state.week3Time).getTime(), title: eventTitle, sportType: 'NFLRegular', endTime: new Date(this.state.week3Time).getTime(), getEventsTimeUpdate: new Date().getTime(),
              stopweek1RoundEdit: 'N/A', stopweek2RoundEdit: 'N/A', stopweek3RoundEdit: 'N/A', currentSelection: 'week1Round'
            }
            var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/')
            var editDbRef2 = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + eventKey + '/')
            editDbRef.set(toTheEventsIds)
            editDbRef2.set(toTheEventsIds)
            this.notify('Event created successfully')
            this.setState({ showCreateEventModal: false })
          }
        })
      }
    })
  }
  doNothing = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  pickWinner = (id, winner, time, selection,p1Points) => {
    //console.log('trtrt',this.state.currentSelection,selection)
    //return
    if (p1Points === 'N/A') {this.notify('Points not yet populated at the moment');return}
    if (this.state.currentSelection !== selection) {
      this.notify('Not available at the moment')
      return
    }
    var nowTime = new Date().getTime()
    if (this.state.currentSelection === 'week1Round') {
      var index2 = this.state.week1RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      /* if(nowTime<time){
         this.notify('Match not yet started')
         return
       }*/
       if(winner!=='N/A'){
        this.notify('Winner already filled')
         return
       }
      var theItems = this.state.week1RoundArray
      theItems[index2]['showChooseWinner'] = true
      this.setState({ week1RoundArray: theItems })
      console.log('this.state.currentItems 002', theItems)
    }
    if (this.state.currentSelection === 'week2Round') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.week2RoundArray

     /* if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }*/
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }
      var theItems = this.state.week2RoundArray
      theItems[index2]['showChooseWinner'] = true
      this.setState({ week2RoundArray: theItems })
    }
    if (this.state.currentSelection === 'week3Round') {
      console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.week3RoundArray

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }
      var theItems = this.state.week3RoundArray
      theItems[index2]['showChooseWinner'] = true
      this.setState({ week3RoundArray: theItems })
      console.log('theItems', theItems)
    }
  }
  chosenWinner = (id, winner) => {
    if (this.state.currentSelection === 'week1Round') {
      var index2 = this.state.week1RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week1RoundArray
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      // theItems[index2]['isItPlayed']='played'
      this.setState({ week1RoundArray: theItems })
      console.log('this.state.currentItems 008888', theItems)
    }
    if (this.state.currentSelection === 'week2Round') {
      var index2 = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week2RoundArray
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 009', theItems)
      this.setState({ week2RoundArray: theItems })
    }
    if (this.state.currentSelection === 'week3Round') {
      var index2 = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week3RoundArray
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      console.log('this.state.currentItems 009', theItems)
      this.setState({ week3RoundArray: theItems })
    }
  }
  closePickWinner = (id) => {
    if (this.state.currentSelection === 'week1Round') {
      var index2 = this.state.week1RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week1RoundArray
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      theItems[index2]['status1'] = 'N/A'
      this.setState({ week1RoundArray: theItems })
      console.log('this.state.currentItems 0065656', theItems)
    }
    if (this.state.currentSelection === 'week2Round') {
      var index2 = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week2RoundArray
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      theItems[index2]['status1'] = 'N/A'
      this.setState({ week2RoundArray: theItems })
      console.log('this.state.currentItems 001', theItems)
    }
    if (this.state.currentSelection === 'week3Round') {
      var index2 = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week3RoundArray
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      theItems[index2]['status1'] = 'N/A'
      this.setState({ week3RoundArray: theItems })
      console.log('this.state.currentItems 001', theItems)
    }
  }
  submitWinner = (id, winner) => {
   // console.log('haaaaaaaaaaaapa 000000')
   // return
    if (this.state.currentSelection === 'week1Round') {
      var index = this.state.week1RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner)
      }
    }
    if (this.state.currentSelection === 'week2Round') {
      var index = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner)
      }
    }
    if (this.state.currentSelection === 'week3Round') {
      var index = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner)
      }
    }
  }
  checkForOutcomeSingle = async (index, winner) => {
    try {
      //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
      var shortArr = []
      console.log('haaaaaaaaaaaapa 2222', index, winner)

      if ((this.state.currentSelection === 'week1Round')) {
        this.checkForRoundOutcome(index, winner, this.state.week1RoundArray, 'week1RoundArray')
      }
      if ((this.state.currentSelection === 'week2Round')) {
        this.checkForRoundOutcome(index, winner, this.state.week2RoundArray, 'week2RoundArray')
      }
      if ((this.state.currentSelection === 'week3Round')) {
        this.checkForRoundOutcome(index, winner, this.state.week3RoundArray, 'week3RoundArray')
      }
    } catch (error) {
      ////console.log('error',error)
    }
  }
  checkForRoundOutcome = async (index, winner, items, name) => {
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
      var theLink = 'theEvents::NFLRegular::' + this.state.theEventKey + '::' + this.state.currentSelection + '::' + scoreName + '::' + theItems
      if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
      var theQuery = encodeURIComponent(theLink)
      console.log('001', this.state.theEventKey, this.state.currentSelection, scoreName, theItems)
      console.log('theLink', theLink, theItems)
      console.log('this.state.shortArr 006', shortArr)
      //return
       await axios.get("https://theramtournament.com/getSingleNCAAFNFLResults?term=" + theQuery)
     //await axios.get("http://localhost:4000/getSingleNCAAFNFLResults?term="+theQuery)
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
  openConfirmModal = (message, type) => {
    //console.log('kang',this.state.currentSelection)
    this.setState({ confirmMessage: message, showConfirmModal: true, confirmModalType: type })
  }
  proceed = () => {
    if (this.state.confirmModalType === 'oddsUpdate') { this.checkForOddsUpdateTime() }
    if (this.state.confirmModalType === 'resultsUpdate') { this.checkForOutcome() }
  }
  selectEvent = async(theMenu, theItems,editType) => {
    this.setState({ theMenu,currentSelection:theMenu,editType:editType,itemsToDetailsModal:theItems}) 
    console.log('editType 4444444',this.state.editType)

  
    
  }
  pickModal=(title,status,weekToPick)=>{
     return (
                <div id={style.selectorDiv2} onClick={()=>this.allowWeekPicks(title,status,weekToPick)}>
                  <div className={status === true ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color:status === true ?'#CB1E31':null}}>{title}</p>
                </div>
              )
  }
  allowWeekPicks=(title,status,weekToPick)=>{
     console.log('this.state.theEventKey',this.state.theEventKey)
    //this.setState({[weekToPick]:!status})
    //return
     if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3){
      this.notify('Event not yet populated')
     
    }
     if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
    var theDb2 = firebase.database().ref('theEvents/NFLRegular/eventsIds/'+this.state.theEventKey+'/'+weekToPick)
     var theDb =firebase.database().ref('/theEvents/eventsIds/'+this.state.theEventKey+'/'+weekToPick)
    theDb.set(!status, error => {
      if (!error) {
        theDb2.set(!status)
        this.setState({[weekToPick]:!status})
        this.notify('Selected Succesfully')
      }
    })
  }
  
  checkForPicks=(theEventKey)=>{
     var theDb =firebase.database().ref('/theEvents/eventsIds/'+theEventKey)
     theDb.once('value', dataSnapshot => {
      console.log('yhhhhhhhhhhhh',dataSnapshot.val())
      var allowWeek2Pick=dataSnapshot.val().allowWeek2Pick
      var allowWeek3Pick=dataSnapshot.val().allowWeek3Pick
      var allowWeek4Pick=dataSnapshot.val().allowWeek4Pick
      if(allowWeek2Pick){this.setState({allowWeek2Pick})}else{this.setState({allowWeek2Pick:false})}
      if(allowWeek3Pick){this.setState({allowWeek3Pick})}else{this.setState({allowWeek3Pick:false})}
      if(allowWeek4Pick){this.setState({allowWeek4Pick})}else{this.setState({allowWeek4Pick:false})}
     })
    //allowWeek2Pick:false,allowWeek3Pick:false,allowWeek4Pick:false
  }
  render() {
    // //console.log('this.state.isWeek1DataAvailable',this.state.isWeek1DataAvailable)
    ////console.log('this.state.isWeek2DataAvailable',this.state.isWeek2DataAvailable)
    ////console.log('this.state.isWeek3DataAvailable',this.state.isWeek3DataAvailable)
    ////console.log('this.state.isFinalsDataAvailable',this.state.isFinalsDataAvailable)
    console.log('this.state.currentSelection',this.state.currentSelection)
    var flockTeamName = ''
    var itemToModals = ''
    var isPastEvent = ''
    var bpsTitle = 'Week 2 Round'
    var todayInMillis = new Date().getTime()
    var titleToShow1=this.state.theEventTitle.replace(/  +/g, ' ')
    var titleToShow='NFL Season'
    console.log('this.state.theEventTitle',titleToShow1)
    if(this.state.theEventTitle){
    titleToShow1=titleToShow1.split(' ')
    titleToShow=titleToShow1[0]+' '+titleToShow1[2]+' Season'}
    var showBestPossible = ''
    if (this.state.endTime < todayInMillis && (this.state.endTime - todayInMillis) < -86400000) {
      isPastEvent = false
    } else { isPastEvent = true }


    if (this.state.currentSelection === 'week1Round') { itemToModals = this.state.week1RoundArray, showBestPossible = this.state.isWeek1RoundPicked,bpsTitle='Week 2 Round' }
    if (this.state.currentSelection === 'week2Round') { itemToModals = this.state.week2RoundArray, showBestPossible = this.state.isWeek2RoundPicked,bpsTitle='Week 3 Round' }
    if (this.state.currentSelection === 'week3Round') { itemToModals = this.state.week3RoundArray, showBestPossible = this.state.isWeek3RoundPicked,bpsTitle='Week 4 Round' }
    //if (this.state.currentSelection === 'superBowl') { itemToModals = this.state.finalArray, showBestPossible = this.state.isFinalsPicked }
    var theBPS=0.00,theWeeklyScore=0.00,theWeeklyRank='N/A'
    if(this.state.currentSelection==='week1Round'){if(this.state.currentEventUserInfo['week1RoundBPS']){theBPS=this.state.currentEventUserInfo['week1RoundBPS'],theWeeklyScore=this.state.currentEventUserInfo['week1RoundScore'],theWeeklyRank=this.state.currentEventUserInfo['week1RoundRank']}}
    if(this.state.currentSelection==='week2Round'){if(this.state.currentEventUserInfo['week2RoundBPS']){theBPS=this.state.currentEventUserInfo['week2RoundBPS'],theWeeklyScore=this.state.currentEventUserInfo['week2RoundScore'],theWeeklyRank=this.state.currentEventUserInfo['week2RoundRank']}}
    if(this.state.currentSelection==='week3Round'){if(this.state.currentEventUserInfo['week3RoundBPS']){theBPS=this.state.currentEventUserInfo['week3RoundBPS'],theWeeklyScore=this.state.currentEventUserInfo['week3RoundScore'],theWeeklyRank=this.state.currentEventUserInfo['week3RoundRank']}}


    if (this.state.dataAvailable) { flockTeamName = this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] }
    else { flockTeamName = false }
    //if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    return (
      <><div className={style.container}>
        {/*<div className={style.eventsCont}>
          <p className={style.eventsP} id={this.state.theEvent === 'Upcoming Events' ? style.playerP1 : style.playerP} onClick={() => this.setState({ theEvent: 'Upcoming Events' })}>UPCOMING EVENTS</p>
          <p className={style.eventsP} style={{ color: this.state.pastEventsAvailable ? null : '#b2b2b2', borderColor: this.state.pastEventsAvailable ? null : '#b2b2b2' }} id={this.state.theEvent === 'Past Events' ? style.playerP1 : style.playerP} onClick={() => this.state.pastEventsAvailable ? this.setState({ theEvent: 'Past Events' }) : null}>PAST EVENTS</p>
        </div>*/}
        {this.state.allEvents.length > 0 ? <div className={style.matchesHeadDiv}>
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
              <div className={style.headList} key={index} style={{ color: theColor, borderColor: theColor }} onClick={() => this.loadOtherEvent(item.id, item.title, item.currentSelection, item.oddsUpdate, item.resultsUpdate)}>
                <div><p className={style.headListP1}>{item.title}</p>
                  <div className={style.headListDiv2}><p className={style.headListP2}>{eventTime}</p>
                    <p style={{ marginLeft: 2, marginRight: 2 }}>-</p>
                    <p className={style.headListP3}>{timing}</p></div></div>
                {this.state.isAdmin ? <><SlOptionsVertical onClick={(event) => this.chooseHomeEvent(event)} />
                  {this.state.selectHomeEvent ? <div className={style.selectHomeEventDiv} onClick={() => this.setState({ selectHomeEvent: false })}><button onClick={(event) => this.sendEvent(event, item.theData, item.id)}>Make home event</button></div> : null}</> : null}
              </div>
            )
          })}
        </div> : null}
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
          <p className={style.eventP} onClick={() => this.setState({ showChooseWeekModal: true,eventAlreadyFilled:false })}>Enter Event Details</p>
          <p className={style.eventP2} onClick={() => this.setState({ showCreateEventModal: true })}>Create New NFL Event</p>
        </div> : null}
        <p className={style.eveP}>Event: <span>{titleToShow}</span></p>
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
        {this.state.isAdmin?
        <div>
          <p id={style.picksP}>Allow Week Picks</p>
          <div id={style.selectorDiv}>
            {this.pickModal('Week 2',this.state.allowWeek2Pick,'allowWeek2Pick')}
            {this.pickModal('Week 3',this.state.allowWeek3Pick,'allowWeek3Pick')}
            {this.pickModal('Week 4',this.state.allowWeek4Pick,'allowWeek4Pick')}
              {/*return (
                <div id={style.selectorDiv2} key={index} onClick={() => this.setState({ selectedWeek:item.id,selectedWeek2:item.text,chooseWeekErr:''})}>
                  <div className={this.state.allowPicks === item ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color: this.state.selectedWeek === item ? '#CB1E31' : null }}>{item}</p>
                </div>
              )*/}
            </div></div>:null}
        {this.state.isAdmin ? <div className={style.resultsCont}>
          <div className={style.resultsDiv}>
            <button className={style.resultsBtn} onClick={() => this.openConfirmModal('Are you sure you want to update the NFL Match Odds?', 'oddsUpdate')}>Update Match Odds</button>
            <p className={style.lastUpdateP}>Last Update {this.state.oddsUpdate}</p>
          </div>
          {/*<div className={style.resultsDiv}>
            <button className={style.resultsBtn} onClick={() => this.openConfirmModal('Are you sure you want to get the NFL Match Results?', 'resultsUpdate')}>Fetch Results Updates</button>
            <p className={style.lastUpdateP}>Last Update {this.state.resultsUpdate}</p>
          </div>*/}
        </div> : null}
        <div className={style.eveDiv}>
          {this.state.week1RoundArray.length ? <p id={this.state.theMenu === 'week1Round' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('week1Round', this.state.week1RoundArray,'stopweek1RoundEdit')}>WEEK 2</p> : null}
          {this.state.week2RoundArray.length ? <p id={this.state.theMenu === 'week2Round' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('week2Round', this.state.week2RoundArray,'stopweek2RoundEdit')}>WEEK 3</p> : null}
          {this.state.week3RoundArray.length ? <p id={this.state.theMenu === 'week3Round' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('week3Round', this.state.week3RoundArray,'stopweek3RoundEdit')}>WEEK 4</p> : null}

        </div>
        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.currentP}>{bpsTitle}</p>
            <p className={style.scoreP1}>Best possibe Score:<br /></p>
            <p className={style.scoreP2}>{this.state.dataAvailable  ? theBPS : '0.00'} points</p>
          </div>
          <div className={style.scoresCont2}>
             <p className={style.currentP}>{bpsTitle}</p>
            <p className={style.scoreP1}>Current Score</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? theWeeklyScore : '0.00'} points</p>
          </div>
          <div className={style.scoresCont3}>
             <p className={style.currentP}>{bpsTitle}</p>
            <p className={style.scoreP1}>Current Rank in NFL</p>
            <p className={style.scoreP2}>{this.state.dataAvailable && this.state.currentRank ? theWeeklyRank : 'N/A'}</p>
          </div>
        </div>
        <div className={style.divCont}>
          {this.state.theMenu === 'week1Round' ? <div className={style.divCont}>
            <div className={style.listCont}>
              {this.state.week1RoundArray.map((item, index) => {
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
                        <p>Week 2 Match {index+1}</p>
                        <p>{theTime}</p>
                      </div>
                      {this.state.isAdmin ? <div className={style.pickWinnerDiv} onClick={() => this.pickWinner(item.id, item.winner, item.timeInMillis, 'week1Round',item.p1Points)}>
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
                          {item.player1NickName !== 'N/A' ? <p className={style.P1}>{item.player1NickName}</p> :
                            <p className={style.P1}>TBA</p>}
                          <p className={style.countryP}>{item.fighter1Country}</p>
                          <p className={style.P2}>{item.p1Rec}</p>
                        </div>
                        <BsFillLightningFill className={style.sepIc} />
                        <div className={style.theContRight}>
                          <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                            {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                            {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                          </div>
                          {item.player2NickName !== 'N/A' ? <p className={style.P1}>{item.player2NickName}</p> :
                            <p className={style.P1}>TBA</p>}
                          <p className={style.countryP}>{item.fighter2Country}</p>
                          <p>{item.country}</p>
                          <p className={style.P2}>{item.p2Rec}</p>
                        </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {this.state.isWeek1RoundPicked && this.state.userLoggedIn ? <div id={style.statDiv}>
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
            </div></div> : null}
          {this.state.theMenu === 'week2Round' ? <div className={style.divCont}>
            <div className={style.listCont}>{/*this.itemComponent(this.state.week2RoundArray, 'NCAAF Quarter Finals')*/}
              {this.state.week2RoundArray.map((item, index) => {
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
                        <p>Week 3 Match {index+1}</p>
                        <p>{theTime}</p>
                      </div>
                      {this.state.isAdmin ? <div className={style.pickWinnerDiv} onClick={() => this.pickWinner(item.id, item.winner, item.timeInMillis, 'week2Round',item.p1Points)}>
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
                          {item.player1NickName !== 'N/A' ? <p className={style.P1}>{item.player1NickName}</p> :
                            <p className={style.P1}>TBA</p>}
                          <p className={style.countryP}>{item.fighter1Country}</p>
                          <p className={style.P2}>{item.p1Rec}</p>
                        </div>
                        <BsFillLightningFill className={style.sepIc} />
                        <div className={style.theContRight}>
                          <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                            {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                            {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                          </div>
                          {item.player2NickName !== 'N/A' ? <p className={style.P1}>{item.player2NickName}</p> :
                            <p className={style.P1}>TBA</p>}
                          <p className={style.countryP}>{item.fighter2Country}</p>
                          <p>{item.country}</p>
                          <p className={style.P2}>{item.p2Rec}</p>
                        </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {this.state.isWeek2RoundPicked && this.state.userLoggedIn ? <div id={style.statDiv}>
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
            </div></div> : null}
          {this.state.theMenu === 'week3Round' ? <div className={style.divCont}>
            <div className={style.listCont}>
              {this.state.week3RoundArray.map((item, index) => {
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
                        <p>Week 4 Match {index+1}</p>
                        <p>{theTime}</p>
                      </div>
                      {this.state.isAdmin ? <div className={style.pickWinnerDiv} onClick={() => this.pickWinner(item.id, item.winner, item.timeInMillis, 'week3Round',item.p1Points)}>
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
                          {item.player1NickName !== 'N/A' ? <p className={style.P1}>{item.player1NickName}</p> :
                            <p className={style.P1}>TBA</p>}
                          <p className={style.countryP}>{item.fighter1Country}</p>
                          <p className={style.P2}>{item.p1Rec}</p>
                        </div>
                        <BsFillLightningFill className={style.sepIc} />
                        <div className={style.theContRight}>
                          <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                            {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                            {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                          </div>
                          {item.player2NickName !== 'N/A' ? <p className={style.P1}>{item.player2NickName}</p> :
                            <p className={style.P1}>TBA</p>}
                          <p className={style.countryP}>{item.fighter2Country}</p>
                          <p>{item.country}</p>
                          <p className={style.P2}>{item.p2Rec}</p>
                        </div>
                      </div>
                      <div className={style.dateDiv}>
                        <p className={style.p1Points}>{item.p1Points}</p>
                        <p className={style.usP}>POINTS</p>
                        <p className={style.p2Points}>{item.p2Points}</p>
                      </div>
                      {this.state.isWeek3RoundPicked && this.state.userLoggedIn ? <div id={style.statDiv}>
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
              })}</div></div> : null}
          {/*<p className={style.titleP}>Super Bowl</p>
          <div className={style.listCont} style={{ justifyContent: 'center' }}>           
        {this.state.finalArray.map((item, index) => {
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
        if (item.bet === 'player1') {myPick = item.player1}
        if (item.bet === 'player2') {myPick = item.player2}
        var theTime=dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
        return (
          <div className={style.listDiv} key={index}>
            <div className={style.theCont0}>
              <div className={style.theCont01}>
                <p>Super Bowl</p>
                <p>{theTime}</p>
              </div>
              {this.state.isAdmin?<div className={style.pickWinnerDiv} onClick={()=>this.pickWinner(item.id,item.winner,item.timeInMillis,'superBowl')}>
              <p>Pick Winner</p>
              </div>:null}
              {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


              <div className={style.theCont}>
                <div className={style.theContLeft}>
                  <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                    {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player1' ? '#1ecb97' : '#CB1E31' }}>{statP1}</p> : null}
                  </div>
                  {item.player1NickName!=='N/A'?<p className={style.P1}>{item.player1NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter1Country}</p>
                  <p className={style.P2}>{item.p1Rec}</p>
                </div>
                <BsFillLightningFill className={style.sepIc} />
                <div className={style.theContRight}>
                  <div className={style.imgDiv2} style={{ borderColor: item.status1 === 'played' ? player2Color : 'transparent' }}>
                    {item.p2Photo !== 'N/A' ? <img className={style.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                    {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: item.winner === 'player2' ? '#1ecb97' : '#CB1E31' }}>{statP2}</p> : null}
                  </div>
                  {item.player2NickName!=='N/A'?<p className={style.P1}>{item.player2NickName}</p>: 
                  <p className={style.P1}>TBA</p>}
                  <p className={style.countryP}>{item.fighter2Country}</p>
                  <p>{item.country}</p>
                  <p className={style.P2}>{item.p2Rec}</p>
                </div>
              </div>
              <div className={style.dateDiv}>
                <p className={style.p1Points}>{item.p1Points}</p>
                <p className={style.usP}>POINTS</p>
                <p className={style.p2Points}>{item.p2Points}</p>
              </div>
              {this.state.hasUserPicked&&this.state.isFinalsPicked&&this.state.userLoggedIn? <div id={style.statDiv}>
                <p className={style.pickP}>Your Pick: <span style={{ color: item.status1 === 'played' ? myOutcomeCol : null }}>{myPick}</span></p>
                <h3 className={style.statP}>Outcome: {item.status1 === 'played' ? <><span className={style.statS1} style={{ color: myOutcomeCol }}>{myOutcome}</span><span className={style.statS2} style={{ color: myOutcomeCol }}>{myOutcomeSpan}</span></> : <span>N/A</span>}</h3>
                <p></p>
              </div> :
                <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openTheModal()}>MAKE YOUR PICK</button></div>
              }
            </div>
            {this.state.isAdmin&&item.showChooseWinner?<div className={style.listDivB}>
              <MdClose className={style.closeIc} onClick={()=>this.closePickWinner(item.id)}/>
              <div>
                <p className={style.chooseP}>Choose Winner</p>
                <div className={item.chosenWinner==='player1'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player1')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player1}</p>
                </div>
                <div className={item.chosenWinner==='player2'?style.listDivB2C:style.listDivB2} onClick={()=>this.chosenWinner(item.id,'player2')}>
                  <TbCheckbox size={20}/>
                  <p>{item.player2}</p>
                </div>
                <div className={style.listDivB3}>
                  <TbCheckbox size={16}/>
                  {item.chosenWinner&&item.chosenWinner==='player1'?<p>{item.player1}</p>:null}
                  {item.chosenWinner&&item.chosenWinner==='player2'?<p>{item.player2}</p>:null}
                  {!item.chosenWinner||item.chosenWinner==='N/A'?<p>N/A</p>:null}
                  
                </div>
                <button onClick={()=>this.submitWinner(item.id,item.chosenWinner)}>Submit</button>
            </div></div>:null}
          </div>
        )
  })}</div>*/}
        </div>
      </div>
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={itemToModals} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentSelection} /></div> : null}
        {this.state.openLoginModal ? <div className={style.detailsModal} onClick={() => this.setState({ openLoginModal: false })}><LogIn /></div> : null}
        {this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null}

        {this.state.nflModal ? <div className={style.detailsModal} onClick={() => this.setState({ nflModal: false })}><NFLModal eventToNFLModal={this.state.eventToNFLModal} itemsToNFLModal={this.state.itemsToNFLModal} theEventKey={this.state.theEventKey} lastPostTime={this.state.lastPostTime} eventAlreadyFilled={this.state.eventAlreadyFilled} onClick={this.handleChildClick} /></div> : null}
        {this.state.showCreateEventModal ? <div className={style.detailsModal} onClick={() => this.setState({ showCreateEventModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p className={style.eventHeadP}>Create NFL Regular Event </p>
            <p className={style.eventTitleP}>Enter Week 2 Matches Start Date/Time</p>

            {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
            <input className={style.eventInput} id='week1Time' placeholder='Enter your RAM name' type='datetime-local' value={this.state.week1Time} onChange={(event) => this.inputChange(event)}></input>
            {/*<input id='week1GamesNo' className={style.week1GamesNo} placeholder='Week 1 Games No' value={this.state.week1GamesNo} onChange={(event) => this.inputChange(event)}></input>*/}
            <p className={style.eventErrorP}>{this.state.week1Err}</p>
            <p className={style.eventTitleP}>Enter Week 3 Matches Start Date/Time</p>
            <input className={style.eventInput} id='week2Time' placeholder='Enter your RAM name' type='datetime-local' value={this.state.week2Time} onChange={(event) => this.inputChange(event)}></input>
            <p className={style.eventErrorP}>{this.state.week2Err}</p>
            <p className={style.eventTitleP}>Enter Week 4 Matches Start Date/Time</p>
            <input className={style.eventInput} id='week3Time' placeholder='Enter your RAM name' type='datetime-local' value={this.state.week3Time} onChange={(event) => this.inputChange(event)}></input>
            <p className={style.eventErrorP}>{this.state.week3Err}</p>

            <button className={style.submitBtn} onClick={() => this.checkEvent()}>Create Event</button>
          </div>
        </div> : null}
        {this.state.daysRangeModal ? <div className={style.detailsModal} onClick={() => this.setState({ daysRangeModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p className={style.eventHeadP}>Enter {this.state.selectedWeek2} Matches Start and End  Time </p>
            <p className={style.eventTitleP}>Enter {this.state.selectedWeek2} Matches Start Date/Time(From odds API)</p>

            {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
            <input className={style.eventInput} id='matchStartTime' placeholder='e.g 2025-09-05T00:20:00Z' value={this.state.matchStartTime} onChange={(event) => this.inputChange(event)}></input>
            {/*<input id='week1GamesNo' className={style.week1GamesNo} placeholder='Week 1 Games No' value={this.state.week1GamesNo} onChange={(event) => this.inputChange(event)}></input>*/}
            <p className={style.eventErrorP}>{this.state.matchStartTimeErr}</p>
            <p className={style.eventTitleP}>Enter {this.state.selectedWeek2} Matches End Date/Time(From odds API)</p>
            <input className={style.eventInput} id='matchEndTime' placeholder='e.g 2025-09-09T00:15:00Z' value={this.state.matchEndTime} onChange={(event) => this.inputChange(event)}></input>
            <p className={style.eventErrorP}>{this.state.matchEndTimeErr}</p>
            <button className={style.submitBtn} onClick={() => this.enterEventDetails()}>Create Event</button>

          </div>
        </div> : null}
        {this.state.showConfirmModal ? <div className={style.detailsModal} onClick={() => this.setState({ showConfirmModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#292f51' }}>Confirm</p>
            <p style={{ marginBottom: 20 }}>{this.state.confirmMessage}</p>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button style={{ backgroundColor: '#ddd', border: 'none', color: 'black', padding: '7px 15px', cursor: 'pointer' }} onClick={() => this.setState({ showConfirmModal: false })}>Cancel</button>
              <button style={{ backgroundColor: '#CB1E31', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.proceed()}>Proceed</button>
            </div></div></div> : null}
        {this.state.showChooseWeekModal ? <div className={style.detailsModal} onClick={() => this.setState({ showChooseWeekModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p className={style.weekP}>Choose Event Week</p>
            {this.state.weekSelect.map((item, index) => {
              return (
                <div className={style.selectorDiv} key={index} onClick={() => this.setState({ selectedWeek:item.id,selectedWeek2:item.text,chooseWeekErr:''})}>
                  <div className={this.state.selectedWeek === item.id ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color: this.state.selectedWeek === item.id ? '#CB1E31' : null }}>{item.text}</p>
                </div>
              )
            })}
             <p style={{color:'#CB1E31',marginTop:10,fontWeight:500,fontSize:16}}>{this.state.chooseWeekErr}</p>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
              <button style={{ backgroundColor: '#ddd', border: 'none', color: 'black', padding: '7px 15px', cursor: 'pointer' }} onClick={() => this.setState({ showChooseWeekModal: false })}>Cancel</button>
              <button style={{ backgroundColor: '#292f51', border: '1px solid #292f51', color: '#fff', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.openRangeLModal()}>Autofill</button>
              <button style={{ backgroundColor: '#CB1E31', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.openNFLModal()}>Proceed</button>
            </div>
          </div></div> : null}
        <ToastContainer />
         {this.state.showProgressBar ? <ProgressBar /> : null}
      </>
    )
  }
}

export default NCAA

