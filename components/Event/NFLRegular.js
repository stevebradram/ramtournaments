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
import { MdHeight, MdInfoOutline } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { TbCheckbox } from "react-icons/tb";
import { MdClose, MdCheck, MdOutlineShare } from "react-icons/md";
import theRamOdds from './ramOdds.json'
import ProgressBar from '../Helper/ProgressBar'
import axios from "axios"
import dayjs from 'dayjs';
import copy from 'copy-to-clipboard';
import Select from 'react-select'
import { confirm } from '../Helper/confirmDialog';
import index from '@/pages';
const options = [
  { "value": 1, "label": "Week 1" },
  { "value": 2, "label": "Week 2" },
  { "value": 3, "label": "Week 3" },
  { "value": 4, "label": "Week 4" },
  { "value": 5, "label": "Week 5" },
  { "value": 6, "label": "Week 6" },
  { "value": 7, "label": "Week 7" },
  { "value": 8, "label": "Week 8" },
  { "value": 9, "label": "Week 9" },
  { "value": 10, "label": "Week 10" },
  { "value": 11, "label": "Week 11" },
  { "value": 12, "label": "Week 12" },
  { "value": 13, "label": "Week 13" },
  { "value": 14, "label": "Week 14" },
  { "value": 15, "label": "Week 15" },
  { "value": 16, "label": "Week 16" },
  { "value": 17, "label": "Week 17" },
  { "value": 18, "label": "Week 18" }
]
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
    theMenu: 'week1Round', theItems: [], opendetailsModal: false, dataAvailable: false, theEvent: 'Upcoming Events',
    userId: '', userLoggedIn: false, isAdmin: false, teamName: '', flockName: '', openLoginModal: false, theEventTime: 0,
    currentScore: '', bestPossibleScore: '', currentRank: '', editDetailsModal: false, profilePhoto: '', theCurrentEvent: 'NFLRegular', pastEventsAvailable: false,
    pastGames: [], theEventTitle: '', theEventKey: '', ramUfcEarlyPrelimsArray: [], count: 0, currentEventUserInfo: {}, allMatches: [], expired: false, nflModal: false,
    week1RoundArray: [], week2RoundArray: [], week3RoundArray: [], week4RoundArray: [], finalArray: [], allEvents: [], currentSelection: 'week1Round', isWeek1DataAvailable: false, allGames: [],
    isWeek2DataAvailable: false, isWeek3DataAvailable: false, isWeek4DataAvailable: false, isFinalsDataAvailable: false, endTime: '', editType: 'stopweek1RoundEdit', eventToNFLModal: '', showCreateEventModal: true, showCreateEventModal2: false,
    isWeek1RoundPicked: false, isWeek2RoundPicked: false, isWeek3RoundPicked: false, isWeek4RoundPicked: false, isFinalsPicked: false, selectHomeEvent: false, itemsToNFLModal: [], week1Time: '', week1Err: '', week2Time: '', showChooseWeekModal: false,
    week2Time: '', week2Err: '', week3Time: '', week3Err: '', superBowlTime: '', superBowlErr: '', hasUserPicked: false, oddsUpdate: '', resultsUpdate: '', showConfirmModal: false, confirmMessage: '', confirmModalType: '',
    weekSelect: [{ id: 'WEEK 1', text: 'WEEK 2' }, { id: 'WEEK 2', text: 'WEEK 3' }, { id: 'WEEK 3', text: 'WEEK 4' }], selectedWeek: '', selectedWeek2: '', week1RoundPostTime: 0, week2RoundPostTime: 0, week3RoundPostTime: 0, week4RoundPostTime: 0, lastPostTime: 0, daysRangeModal: false,
    matchStartTime: '', matchEndTime: '', matchStartTimeErr: '', matchEndTimeErr: '', showProgressBar: false, chooseWeekErr: '', itemsToDetailsModal: [], cumulativeScore: 0, allowPicks: ['Week 2', 'Week 3', 'Week 4'], allowWeek1Pick: false, allowWeek2Pick: false, allowWeek3Pick: false, allowWeek4Pick: false,
    eventAlreadyFilled: false, theLink: '', stopweek1RoundEdit: 0, hasUserPlayed: false, pickedId: '', selectedFruit: '', selectedWeeks: [], fromWeekTo: '', fromWeekTo2: '', theValues: '', nflModalTitle: '', toDbId: '', toDbRound: '', theScoresMenu: '',enterEventModal:false
  }
  componentDidMount = () => {
    this.checkAuth()
    this.setState({ currentSelection: 'week1Round' })
  }

  handleChildClick = (title) => {
    this.setState({ count: this.state.count + 1, nflModal: false, selectedWeek: '', selectedWeek2: '', chooseWeekErr: '', nflModalTitle: '', toDbId: '', toDbRound: '' });
    if (title === 'Success') {
      this.checkAuth()
    }
    /*if(title==='getOdds'&&item.length>10){
    this.checkForOddsUpdate2(item)
    }
    ////console.log('azeeza', item)*/
  };
  handleDelete = async () => {
if (await confirm({ confirmation: 'Do you really want to delete this item?' })) {
// Perform delete action
}
};
  checkForOddsUpdate2 = async (theLink) => {
    try {
      var theQuery = encodeURIComponent(theLink)
      ////console.log('the theLink 000000', theLink)
      //return
      var editDbRef = firebase.database().ref('/theEvents/NFL/eventsIds/' + this.state.theEventKey + '/' + this.state.editType)
      editDbRef.once('value', dataSnapshot => {
        if ((new Date().getTime() > dataSnapshot.val())) {
          this.notify('Update odds time expired')
        }
        else {
          ////console.log('kufinish kudonjo')
          axios.get("http://localhost:4000/updateNFLOdds?term=" + theQuery)

            .then((res) => {
              var theItems = res.data.result
              this.notify('Success Updating NFL the odds')
              ////////console.log('theItems', theItems)

            })
        }
      })

    } catch (error) {
      ////////console.log('error', error)
    }
  }
  checkForOddsUpdate = async () => {
    try {

      if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
      var theLink = 'theEvents::NFLRegular::' + this.state.theEventKey + '::' + this.state.currentSelection
      var theQuery = encodeURIComponent(theLink)
      ////console.log('the theLink 11111', theLink)
      //return
      var editDbRef = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + this.state.theEventKey + '/' + this.state.editType)
      editDbRef.once('value', dataSnapshot => {

        if ((new Date().getTime() > dataSnapshot.val())) {
          this.notify('Update odds time expired')
          this.setState({ showProgressBar: false })
          ////console.log('the Z000000', new Date().getTime(), dataSnapshot.val())
        }
        else {
          ////console.log('the theLink RRRRRAAAAAAA', theLink)
          //axios.get("http://localhost:4000/updateNFLRegularOdds?term=" + theQuery)
          axios.get("https://theramtournament.com/updateNFLRegularOdds?term=" + theQuery)
            .then((res) => {
              this.setState({ showConfirmModal: false, showProgressBar: false })
              var theItems = res.data
              this.notify('Success Updating the NFL odds')

            })
        }
      })

    } catch (error) {
      ////////console.log('error', error)
    }
  }
  checkForOddsUpdateTime = () => {
    this.showProgressBar3()
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) {
      this.notify('Can not update odds. Event not yet populated')
      this.setState({ showConfirmModal: false, showProgressBar: false })
    }
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
    var stopEditTime = ''
    if (this.state.currentSelection === 'week1Round') { stopEditTime = 'stopweek1RoundEdit' }
    if (this.state.currentSelection === 'week2Round') { stopEditTime = 'stopweek2RoundEdit' }
    if (this.state.currentSelection === 'week3Round') { stopEditTime = 'stopweek3RoundEdit' }
    var theDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/' + stopEditTime)
    theDb.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        ////console.log('dataSnapshot.val()', dataSnapshot.val())
        if (dataSnapshot.val() === 'N/A') {
          ////console.log('yeeeeees 111111')
          //this.checkForOddsUpdate()
          this.setState({ showConfirmModal: false, showProgressBar: false })
          this.notify('Can not update odds. Event not yet populated')
        } else {
          if (new Date().getTime() >= dataSnapshot.val()) {
            this.setState({ showConfirmModal: false, showProgressBar: false })
            this.notify('Can not update odds. Event already started')
          } else {
            ////console.log('yeeeeees 2222222')
            this.checkForOddsUpdate()
          }
        }
      } else {
        this.setState({ showConfirmModal: false, showProgressBar: false })
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
      ////console.log('theLink', theLink)
      //return

      //await axios.get("http://localhost:4000/getNCAAFNFLResults?term="+theQuery)
      await axios.get("https://theramtournament.com/getNCAAFNFLResults?term=" + theQuery)
        .then((res) => {
          ////////console.log('theItems',res)
          var theOutcome = res.data
          ////////console.log('theItems',theOutcome)
          if (theOutcome === 'sucesss') { }
        })
    } catch (error) {
      ////////console.log('error',error)
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
  checkLink = async (userId) => {
    var flocksDataRef = firebase.database().ref('users/').child(userId + '/flockData/flockNames/' + this.state.theEventKey + '/link')
    flocksDataRef.once('value', dataSnapshot => {
      ////console.log('flocksDataRef the key', dataSnapshot.val())
      if (dataSnapshot.exists()) {
        this.setState({ theLink: dataSnapshot.val() })
      } else {
        this.setState({ theLink: '' })
      }
    })
  }
  checkUpcomingPastGames = async (userId) => {
    //return
    //////console.log('naingia2222222222222')
    var gamesInfo = firebase.database().ref('/theEvents/NFLRegular/eventsIds/')
    var i = 0, allGames = []

    await gamesInfo.once('value', dataSnapshot => {
      var gamesCount = dataSnapshot.numChildren()
      //////console.log('naingia 3333',gamesCount)
      dataSnapshot.forEach((data) => {
        ////console.log('naingia 44444', data.val())
        i++
        var pastG = {}, upcomingG = {}, theEvents = {}
        var key = data.key
        var time = data.val().time
        var firstWeekTime = data.val().firstWeekTime
        var theWeeks = data.val().theWeeks
        var theValues = data.val().theValues
        var stopweek1RoundEdit = data.val().stopweek1RoundEdit
        var title = data.val().title
        var sportType = data.val().sportType
        var endTime = data.val().endTime
        var theData = data.val()
        var currentSelection = data.val().currentSelection


        var week1RoundPostTime = data.val().week1RoundPostTime
        var week2RoundPostTime = data.val().week2RoundPostTime
        var week3RoundPostTime = data.val().week3RoundPostTime
        var week4RoundPostTime = data.val().week4RoundPostTime

        if (week1RoundPostTime) { this.setState({ week1RoundPostTime: week1RoundPostTime }) }
        if (week2RoundPostTime) { this.setState({ week2RoundPostTime: week2RoundPostTime }) }
        if (week3RoundPostTime) { this.setState({ week3RoundPostTime: week3RoundPostTime }) }
        if (week4RoundPostTime) { this.setState({ week3RoundPostTime: week4RoundPostTime }) }



        var oddsUpdate = data.val().oddsTimeUpdate
        var resultsUpdate = data.val().fetchResultsTimeUpdate
        if (!oddsUpdate) { oddsUpdate = 'N/A' } else { oddsUpdate = new Date(oddsUpdate).toLocaleString() }
        if (!resultsUpdate) { resultsUpdate = 'N/A' } else { resultsUpdate = new Date(resultsUpdate).toLocaleString() }

        theEvents = { id: key, time: time, title: title, sportType: sportType, endTime: endTime, theData: theData, oddsUpdate: oddsUpdate, resultsUpdate: resultsUpdate, stopweek1RoundEdit, theValues: theValues }
        allGames.push(theEvents)

        if (gamesCount === i) {
          ////console.log('zoote', allGames)
          var theEventTitle = '', theEventKey = '', theEventTime = 0, oddsUpdate = '', resultsUpdate = '', stopweek1RoundEdit = '', theValues = ''
          if (allGames.length > 0) { allGames = allGames.sort(function (a, b) { return a.time - b.time }); theEventTitle = allGames[0]['title']; theEventKey = allGames[0]['id'], theEventTime = allGames[0]['endTime'], currentSelection = allGames[0]['currentSelection'], endTime = allGames[0]['endTime'], oddsUpdate = allGames[0]['oddsUpdate'], resultsUpdate = allGames[0]['resultsUpdate'], stopweek1RoundEdit = allGames[0]['stopweek1RoundEdit'], theValues = allGames[0]['theValues'] }
        }
        var expired = false
        if ((theEventTime - new Date().getTime()) < 86400000) {
          expired = true
        }
        if (week1RoundPostTime) { this.setState({ isWeek1DataAvailable: true, editType: 'stopweek1RoundEdit' }) }
        if (week2RoundPostTime) { this.setState({ isWeek2DataAvailable: true, editType: 'stopweek2RoundEdit' }) }
        if (week3RoundPostTime) { this.setState({ isWeek3DataAvailable: true, editType: 'stopweek3RoundEdit' }) }
        if (week4RoundPostTime) { this.setState({ isWeek4DataAvailable: true, editType: 'stopweek4RoundEdit' }) }
        this.setState({ allEvents: allGames, theEventTitle, theEventKey, theEventTime, currentSelection: 'week1Round', expired, endTime, oddsUpdate, resultsUpdate, stopweek1RoundEdit, theValues }, () => {
          this.getNFLMatches(userId)
          this.checkLink(userId)
          var theScoresMenu = theValues.split('|')
          theScoresMenu = 'Week ' + theScoresMenu[0] + ' Round'
          this.setState({ theScoresMenu: theScoresMenu })
        })
      })
    })
  }
  getNFLMatches = async (userId, theValues) => {

    allMatches = []
    this.setState({ week1RoundArray: [], week2RoundArray: [], week3RoundArray: [], finalArray: [], theMenu: 'week1Round', dataAvailable: false, currentEventUserInfo: {} })
    var userInfoDb = firebase.database().ref('/theEvents/NFLRegular/').child(this.state.theEventKey)
    this.checkForPicks(this.state.theEventKey)
    userInfoDb.once('value', dataSnapshot => {

      var week1RoundCount = dataSnapshot.child('week1Round').numChildren()
      var week2RoundCount = dataSnapshot.child('week2Round').numChildren()
      var week3RoundCount = dataSnapshot.child('week3Round').numChildren()
      var week4RoundCount = dataSnapshot.child('week4Round').numChildren()
      var theInfo = dataSnapshot.val()

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
            array1 = array1.sort((b, a) => b.timeInMillis - a.timeInMillis);
            //console.log('week1RoundArray', array1)
            this.setState({ week1RoundArray: array1, theItems: array1, itemsToDetailsModal: array1 })
            this.getMatchesInfo(this.state.userId, 'week1Round', array1, 'week1RoundArray', 'isWeek1RoundPicked')

          }
        }
      }
      //return
      if (theInfo.week2Round) {
        var array1 = []
        //////////console.log('iko prelimsssssss')
        var i = 0
        for (var key in theInfo.week2Round) {
          i++
          var theData = theInfo.week2Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week2RoundCount) {
            //console.log('week2RoundArray', array1)
            array1 = array1.sort((b, a) => b.timeInMillis - a.timeInMillis);
            this.setState({ week2RoundArray: array1 })
            this.getMatchesInfo(this.state.userId, 'week2Round', array1, 'week2RoundArray', 'isWeek2RoundPicked')
          }
        }
        //prelimsArray
      }
      if (theInfo.week3Round) {
        var array1 = []
        //////////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.week3Round) {
          i++
          var theData = theInfo.week3Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week3RoundCount) {
            //console.log('week3RoundArray', array1)
            array1 = array1.sort((b, a) => b.timeInMillis - a.timeInMillis);
            this.setState({ week3RoundArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId, 'week3Round', array1, 'week3RoundArray', 'isWeek3RoundPicked')
            }
          }
        }
      }
      if (theInfo.week4Round) {
        var array1 = []
        //////////console.log('iko earlyPrelims')
        var i = 0
        for (var key in theInfo.week4Round) {
          i++
          var theData = theInfo.week4Round[key]
          var array2 = { theId: key, ...theData }
          array1.push(array2)
          if (i === week4RoundCount) {
            //console.log('week44444444444RoundArray', array1)
            array1 = array1.sort((b, a) => b.timeInMillis - a.timeInMillis);
            this.setState({ week4RoundArray: array1 })
            if (this.state.userId.length > 3) {
              this.getMatchesInfo(this.state.userId, 'week4Round', array1, 'week4RoundArray', 'isWeek4RoundPicked')

            }
          }
        }
      }
      // return
      // ////console.log('userId 565565',userId,this.state.theEventKey)
      // return
      var totalScore = 0
      var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
      var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFLRegular/" + this.state.theEventKey + '/details/')
      userInfoDb.once('value', dataSnapshot => {
        ////console.log('ndani 111111111111', dataSnapshot.exists())
        var dataExists = dataSnapshot.exists()
        if (!dataExists) return
        photoRefDb.once('value', dataSnapshot => {
          //////////console.log('proofile photo',dataSnapshot.val())
          if (dataSnapshot.val()) {
            this.setState({ profilePhoto: dataSnapshot.val() })
          }
        })
        userInfoDb.once('value', dataSnapshot => {
          if (!dataSnapshot.val()) return
          ////console.log('the type user 0000000000000', dataSnapshot.val())
          if (dataSnapshot.val()) {
            var theInfo = dataSnapshot.val()
            totalScore = Number(theInfo.week1RoundScore) + Number(theInfo.week2RoundScore) + Number(theInfo.week3RoundScore)
            this.setState({ currentEventUserInfo: theInfo, currentRank: theInfo.currentRank, cumulativeScore: totalScore, dataAvailable: true })
            // currentEventUserInfo = dataSnapshot.val()

            ////console.log('the dddddddd', theInfo)
          }
        })
      })
    })
    //////////console.log('hakuna early hureeeeeeeeeeeeeeeeeeeeeeeeee')
  }
  getMatchesInfo = async (userId, selection, theArr, arrName, isPicked) => {
    //////console.log('allMatches',userId,this.state.theEventKey,theArr,arrName)
    //return
    var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/NFLRegular/" + this.state.theEventKey + '/')
    var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
    var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFLRegular/" + this.state.theEventKey + '/details/')
    var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/NFLRegular/" + this.state.theEventKey + '/bets/')
    var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/NFLRegular/')
    var currentEventUserInfo = '', totalScore = 0


    userBetsDb.child(selection).once('value', dataSnapshot => {
      ////console.log('ndani 111111111111', dataSnapshot.exists())
      var dataExists = dataSnapshot.exists()

      if (dataExists) {
        if (selection === 'week1Round') { this.setState({ hasUserPlayed: true }) }
        var i = 0
        ////console.log('ndani 22222', dataSnapshot.val())
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
            ////console.log('round 19 item', theArr)
            this.setState({ [arrName]: theArr, [isPicked]: true })
          }
        }
      } else {
        if (selection === 'week1Round') { this.setState({ hasUserPlayed: false }) }
      }

    })
  }
  loadOtherEvent = async (theEventKey, theEventTitle, oddsUpdate, resultsUpdate, stopweek1RoundEdit, theValues) => {
    this.setState({ oddsUpdate, resultsUpdate, stopweek1RoundEdit, theValues })
    var eventsInfo = firebase.database().ref('/theEvents/eventsIds/' + theEventKey + '/time')
    //console.log('rrrrr', theEventKey, theEventTitle, currentSelection, oddsUpdate, resultsUpdate, stopweek1RoundEdit)
    //return
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
      this.setState({ theEventKey, theEventTitle, expired, isWeek1RoundPicked: false, isWeek2RoundPicked: false, isWeek3RoundPicked: false, isFinalsPicked: false, editType: 'stopweek1RoundEdit' }, () => {
        this.getNFLMatches(this.state.userId)
        this.checkLink(this.state.userId)
        var theScoresMenu = theValues.split('|')
        theScoresMenu = 'Week ' + theScoresMenu[0] + ' Round'
        this.setState({ theScoresMenu: theScoresMenu })
        //if ((currentSelection === 'week1Round')) { this.setState({ editType: 'stopweek1RoundEdit' }) }
        //if ((currentSelection === 'week2Round')) { this.setState({ editType: 'stopweek2RoundEdit' }) }
        //if ((currentSelection === 'week3Round')) { this.setState({ editType: 'stopweek3RoundEdit' }) }
      })
    })
  }

  hideModal = () => {
    this.setState({ opendetailsModal: false })
    ////////////console.log('Button clicked!');
  };
  openTheModal = async () => {
    var theVal = this.state.theValues.split('|')
    if (this.state.userLoggedIn === false) {
      this.notify("Please Log In to continue")
      this.setState({ openLoginModal: true })
      return
    }
    console.log('this.state.currentSelection', this.state.currentSelection)
    console.log('this.state.allowWeek1Pick', theVal, theVal[0], this.state.allowWeek1Pick, this.state.allowWeek2Pick, this.state.allowWeek3Pick, this.state.allowWeek4Pick)
    if (this.state.currentSelection === 'week1Round' && this.state.allowWeek1Pick === false) {
      var theNotMeso = 'Week ' + theVal[0] + ' pick not allowed at the moment. Please try again later'
      this.notify(theNotMeso)
      return
    }
    if (this.state.currentSelection === 'week2Round' && this.state.allowWeek2Pick === false) {
      var theNotMeso = 'Week ' + theVal[1] + ' pick not allowed at the moment. Please try again later'
      this.notify(theNotMeso)
      return
    }
    if (this.state.currentSelection === 'week3Round' && this.state.allowWeek3Pick === false) {
      var theNotMeso = 'Week ' + theVal[2] + ' pick not allowed at the moment. Please try again later'
      this.notify(theNotMeso)
      return
    }
    if (this.state.currentSelection === 'week4Round' && this.state.allowWeek4Pick === false) {
      var theNotMeso = 'Week ' + theVal[3] + ' pick not allowed at the moment. Please try again later'
      this.notify(theNotMeso)
      return
    }
    //console.log('this.state.currentSelection', this.state.currentSelection)
    //return

    var itemToModals = '', stopEditTime = ''
    if (this.state.currentSelection === 'week1Round') { itemToModals = this.state.week1RoundArray, stopEditTime = 'stopweek1RoundEdit' }
    if (this.state.currentSelection === 'week2Round') { itemToModals = this.state.week2RoundArray, stopEditTime = 'stopweek2RoundEdit' }
    if (this.state.currentSelection === 'week3Round') { itemToModals = this.state.week3RoundArray, stopEditTime = 'stopweek3RoundEdit' }
    if (this.state.currentSelection === 'week4Round') { itemToModals = this.state.week4RoundArray, stopEditTime = 'stopweek4RoundEdit' }
    this.setState({ itemsToDetailsModal: itemToModals })


    var i = 0, pointMissing = false
    ////console.log('this.state.theItems rr', this.state.currentSelection, this.state.editType, itemToModals)
    await itemToModals.map((item, index) => {
      i++
      //////console.log('item.p1Points',item.p1Points)
      if (item.p1Points === 'N/A' || item.p2Points === 'N/A') {
        pointMissing = true
      }
      if (itemToModals.length === index + 1) {
        if (pointMissing === true) {
          this.notify('Event points not yet populated')
        } else {
          var userPlayedRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/stopweek1RoundEdit')
          userPlayedRef.once('value', dataSnapshot => {
            if ((new Date().getTime() > dataSnapshot.val())) {
              if (this.state.hasUserPlayed === false) {
                this.notify("Event pick expired")
              } else {
                this.openTheModal2(stopEditTime)
              }
            } else {
              this.openTheModal2(stopEditTime)
            }
          })

        }
      }
    })
  }
  openTheModal2 = (stopEditTime) => {
    ////console.log('this.state.theEventKey', this.state.currentSelection, this.state.theEventKey, this.state.editType)
    //hasUserPlayed
    //return
    // var theDb =firebase.database().ref('/theEvents/eventsIds/'+theEventKey)


    var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/' + stopEditTime)
    editDbRef.once('value', dataSnapshot => {
      ////console.log('zeve mbyu 0001', dataSnapshot.val())
      ////console.log('zeve mbyu 002', dataSnapshot.val())
      if (dataSnapshot.val() === 'N/A') {
        this.notify('Event pick/edit not available at the moment')
      } else {

        ////console.log('now 005', new Date().getTime(), dataSnapshot.val())
        if ((new Date().getTime() > dataSnapshot.val())) {
          ////console.log('now 005', new Date().getTime(), dataSnapshot.val())
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
           //////console.log('the dddddddddddd',this.state.userId,dataSnapshot.val())
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
    ////console.log('data', data)
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
    var oddsApi = "https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    const response = await axios.get(oddsApi)
    var theOddsJson = response.data
    sortOddsJson(theOddsJson)
  }
  openRangeLModal = () => {
    ////console.log('detailsssssss', this.state.theEventKey, this.state.selectedWeek)
    if (this.state.selectedWeek === '') {
      this.setState({ chooseWeekErr: 'Data not filled in' })
      this.notify('Fill in week to continue')
      return
    }
    ////console.log('rrrrrrrrrrrrrrrrrrra')
    this.setState({ chooseWeekErr: '', daysRangeModal: true, showChooseWeekModal: false })
  }
  openNFLModal = () => {
    //console.log('detailsssssss', this.state.theEventKey, this.state.selectedWeek)
    //return
    if (this.state.selectedWeek === '') {
      this.setState({ chooseWeekErr: 'Data not filled in' })
      this.notify('Fill in week to continue')
      return
    }
    this.setState({ chooseWeekErr: '' })
    this.setState({ itemsToNFLModal: [], showChooseWeekModal: false })

    var editDbRef = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + this.state.theEventKey)
    var theSelection = ''
    if (this.state.selectedWeek === 'WEEK 1') { theSelection = 'week1Round', this.setState({ eventToNFLModal: 'week1Round', itemsToNFLModal: this.state.week1RoundArray, nflModal: true, lastPostTime: this.state.week1RoundPostTime }) }
    if (this.state.selectedWeek === 'WEEK 2') { theSelection = 'week2Round', this.setState({ eventToNFLModal: 'week2Round', itemsToNFLModal: this.state.week2RoundArray, nflModal: true, lastPostTime: this.state.week2RoundPostTime }) }
    if (this.state.selectedWeek === 'WEEK 3') { theSelection = 'week3Round', this.setState({ eventToNFLModal: 'week3Round', itemsToNFLModal: this.state.week3RoundArray, nflModal: true, lastPostTime: this.state.week3RoundPostTime }) }
    if (this.state.selectedWeek === 'WEEK 4') { theSelection = 'week4Round', this.setState({ eventToNFLModal: 'week4Round', itemsToNFLModal: this.state.week4RoundArray, nflModal: true, lastPostTime: this.state.week4RoundPostTime }) }
  }
  inputChange = async (e) => {
    var value = e.target.value
    ////console.log('valueee', value)

    await this.setState({ [e.target.id]: value })
    if (this.state.week1Time.length >= 3) { this.setState({ week1Err: '' }) }
    if (this.state.week2Time.length >= 3) { this.setState({ week2Err: '' }) }
    //this.state.matchEndTime
    if (this.state.matchEndTime.length >= 3) {
      ////console.log('zzezezezze')
      var lastMatchTime = this.state.matchEndTime.split(':')
      ////console.log('lastMatchTime', lastMatchTime)
      var part1 = lastMatchTime[0]
      var part2 = lastMatchTime[1]
      var part3 = lastMatchTime[2]
      part2 = Number(part2)
      if (part2 < 10) { part2 = part2 + 10 }
      else { part2 = part2 + 1 }
      part2 = part2 + ''
      if (part2.length <= 1) { part2 = '0' + part2 }
      var newTime = part1 + ':' + part2 + ':' + part3
      this.setState({ matchEndTime: newTime })
      ////console.log('newTimerrrrrrr', newTime)
    }
    if (this.state.week3Time.length >= 3) {

      this.setState({ week3Err: '' })
    }
    if (this.state.superBowlTime.length >= 3) { this.setState({ superBowlErr: '' }) }
  }
  inputChange2 = async (e, index) => {
    var value = e.target.value
    ////console.log('valueee', value)
    const theItems = [...this.state.selectedWeeks];
    theItems[index].theDate = value;
    this.setState({ selectedWeeks: theItems })
    ////console.log('valueee 44', theItems)

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
    var idStart = this.state.toDbId, matchType = this.state.toDbRound
    var oddsApi = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?commenceTimeFrom=" + firstEventTime + "&commenceTimeTo=" + lastEventTime + "&regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    //var oddsApi="https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?commenceTimeFrom=2025-02-09T23:30:00Z&commenceTimeTo=2025-01-26T23:30:00Z&regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
    //var oddsApi="https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?regions=us&markets=h2h&oddsFormat=american&apiKey=f059e49c28b51da7b69e03dc1122338b"
    ////console.log('oddsApi', oddsApi)
    ////console.log('the theOddsJson 019', idStart, matchType, this.state.selectedWeek)
    // return

    const response = await axios.get(oddsApi)
    var theOddsJson = response.data
    this.sortOddsJson(theOddsJson, idStart, matchType, this.state.selectedWeek)
    ////console.log('the theOddsJson', theOddsJson)

  }
  sortOddsJson = async (theOddsJson, idStart, matchType, selectedWeek) => {

    try {
      //////console.log('theOddsJson',theOddsJson)
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
            //////console.log('draftkings markets',item2.markets)
            //////console.log('draftkingsMarket 005',draftkingsMarket.outcomes)
            draftkingsMarket.map((item3) => {
              //////console.log('draftkingsMarket 006',item3.outcomes)
              const obj = Object.fromEntries(item3.outcomes.map(item => [item.name, item.price]));
              theOddsJson[index].draftkingsOdds = obj
            })
          }

          if (item1.bookmakers.length === i) {
            //////console.log('new array',theOddsJson)

            var m = 0
            theOddsJson.map((item12, index) => {
              m++
              //////console.log('item12.draftkingsOdds',item12.draftkingsOdds)
              var awayPoints = 0, homePoints = 0
              if (item12.draftkingsOdds === undefined || item12.draftkingsOdds.length == 0) {
                //////console.log('shit is undefined')
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
              //////console.log('item2.homeTeam',item2.homeTeam,item2.homeTeamPoints)

              if (homePoints <= 101 && homePoints >= -101) { hTPointsNum = 2.03 }
              if (awayPoints <= 101 && awayPoints >= -101) { aTPointsNum = 2.03 }


              ////console.log('hTPointsNum', hTPointsNum, 'aTPointsNum', aTPointsNum)

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
              ////console.log('new array laaast 225', newOddsJson)
            }
          }
        })
      })
    } catch (error) {
      ////console.log('ERROR OCURRED AT SORTING ODDS', error)
    }
  }
  getLogos = async (theArr, selectedWeek) => {
    var logosUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
    //const response = await axios.get(logosUrl);
    //////console.log(response.data);
    var smallResultsArr = []
    axios.get(logosUrl)
      .then((res) => {
        var resultsArr = res.data['sports']
        ////console.log('the logos 1111', resultsArr.length)
        var i = 0
        resultsArr.map((item, index) => {
          var theTeams = item['leagues'][index]['teams']
          theTeams.map((item, index) => {
            var theItem = item.team
            //////console.log('the teams',theItem)
            //////console.log('the team name',theItem['displayName'])
            // ////console.log('the team logos',theItem['logos'][0]['href'])
            var myItems = {}
            myItems['name'] = theItem['displayName']
            myItems['logo'] = theItem['logos'][0]['href']
            myItems['nickName'] = theItem['nickname']
            smallResultsArr.push(myItems)

            if (theTeams.length === index + 1) {
              ////console.log('smallResultsArr', smallResultsArr)
              theArr.map((item1, index) => {

                //return
                smallResultsArr.map((item2) => {
                  // ////console.log('item1.player1',item1.player1)
                  if (item1.player1 === item2.name) {
                    theArr[index]['p1Photo'] = item2.logo
                    theArr[index]['player1NickName'] = item2.nickName
                    ////console.log('ikooooooooooooooo')
                  }
                  if (item1.player2 === item2.name) {
                    theArr[index]['p2Photo'] = item2.logo
                    ////console.log('hakunaaaaaaaaaaaaaaa')
                    theArr[index]['player2NickName'] = item2.nickName
                  }

                })

              })
            }
            if (theTeams.length === index + 1) {
              ////console.log('theArr 22222222 kufinish', theArr)
              this.setState({ itemsToNFLModal: [], showChooseWeekModal: false, daysRangeModal: false, showProgressBar: false, eventAlreadyFilled: true })
              var theSelection = ''
              if (this.state.selectedWeek === 'WEEK 1') { theSelection = 'week1Round', this.setState({ eventToNFLModal: 'week1Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              if (this.state.selectedWeek === 'WEEK 2') { theSelection = 'week2Round', this.setState({ eventToNFLModal: 'week2Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              if (this.state.selectedWeek === 'WEEK 3') { theSelection = 'week3Round', this.setState({ eventToNFLModal: 'week3Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              if (this.state.selectedWeek === 'WEEK 4') { theSelection = 'week4Round', this.setState({ eventToNFLModal: 'week4Round', itemsToNFLModal: theArr, nflModal: true, lastPostTime: new Date().getTime() }) }
              //if (this.state.currentSelection==='superBowl') {this.setState({superBowlEdit:theArr,isItSubmit:true})}
              //this.sendToFirebase()
            }
          })

        })

      })
  }
  checkEvent2 = () => {
    var checkEventDb = firebase.database().ref('/theEvents/NFLRegular/eventsIds/')
    var currentYear = new Date().getFullYear()
    var nextYear = currentYear + 1
    var currentMillis = new Date().getTime()
    var i = 0, gameStartYear = ''
    var selectedWeeks = this.state.selectedWeeks
    //var cureentSelec=''
    selectedWeeks.map((item, index) => {
      if (index === 0) { gameStartYear = new Date(item.theDate).getFullYear() }
      selectedWeeks[index]['stopweek' + item.value + 'RoundEdit'] = 'N/A'
      var dateMillis = new Date(item.theDate).getTime()
      ////console.log('the millis',dateMillis)
      if (!item.theDate) { this.notify('Date must be filled'); return }
      if (currentMillis >= dateMillis) { this.notify('Date must be current or future'); return }
      i++
      if (selectedWeeks.length === i) {
        var eventKey = 'NFLRegular-' + gameStartYear + this.state.fromWeekTo
        var eventTitle = 'NFL REGULAR ' + gameStartYear + ' ' + this.state.fromWeekTo2
        ////console.log('mambo sambaba',gameStartYear,eventKey,eventTitle)
        ////console.log('zabee',selectedWeeks)
        //return
        checkEventDb.child(eventKey).once('value', dataSnapshot => {
          if (dataSnapshot.exists()) {
            this.createEvent2(eventKey, eventTitle, selectedWeeks)
            /*var isFilled = dataSnapshot.val().stopweek1RoundEdit
            if (isFilled === 'N/A') {
              this.createEvent(eventKey, eventTitle)
            } else {
              this.notify(week1Year + ' Event Already Filled')
            }*/
          } else {
            this.createEvent2(eventKey, eventTitle, selectedWeeks)
          }
        })

      }
    })
  }
  createEvent2 = (eventKey, eventTitle, selectedWeeks) => {
    var week1Arr = {}, week2Arr = {}, week3Arr = {}, j = 0, currentSelec = '', theWeeks = [], theValues = [], firstWeekTime = ''
    var generalDb = firebase.database().ref('/theEvents/NFLRegular/' + eventKey)
    //{ id: 'week1Game1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', player2NickName: 'N/A', player1NickName: 'N/A', stat: 'N/A', game: 'NFLRegular', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Week1 Round' },
    selectedWeeks.map((item, index) => {
      if (index === 0) { currentSelec = 'week' + item.value + 'Round', firstWeekTime = new Date(item.theDate).getTime() }
      var theEdLink = 'stopweek' + (index + 1) + 'RoundEdit'
      var theEdLink2 = 'allowWeek' + (index + 1) + 'Pick'
      theWeeks.push(item.label)
      theValues.push(item.value)
      var dateMillis = new Date(item.theDate).getTime()
      var theWeeksArr = {}
      var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/')
      var editDbRef2 = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + eventKey + '/')
      j++

      week1Round.map((item2, index) => {
        var theId = 'week' + item.value + 'Game' + (index + 1)
        var matchType = 'Week' + item.value + ' Round'
        var toRef = 'week' + j + 'Round'
        week1Round[index]['id'] = theId
        week1Round[index]['time'] = item.theDate
        week1Round[index]['timeInMillis'] = new Date(item.theDate).getTime()
        week1Round[index]['commenceTime'] = item.theDate
        week1Round[index]['time'] = item.theDate
        week1Round[index]['time'] = item.theDate
        week1Round[index]['matchType'] = matchType
        theWeeksArr[theId] = item2
        if (week1Round.length === index + 1) {
          //var theTime={theEdLink:dateMillis}
          editDbRef.child(theEdLink).set(dateMillis)
          editDbRef2.child(theEdLink).set(dateMillis)
          editDbRef.child(theEdLink2).set(false)
          editDbRef2.child(theEdLink2).set(false)
          // ////console.log('mambo sambaba',gameStartYear,eventKey,eventTitle)
          ////console.log('the arrrrrr',eventKey,eventTitle,theId,theWeeksArr)
          // ////console.log('week1Round 1111', week1Arr)
          generalDb.child('/' + toRef + '/').update(theWeeksArr)
        }
      })
      if (selectedWeeks.length === j) {
        //  var theEdLink='stopweek'+item.value+'RoundEdit'
        var lastWeekTime = item.theDate
        ////console.log('the theEdLink',theEdLink)
        //  editDbRef.child(theEdLink).set('N/A')
        ////console.log('the tiime',item.theDate,currentSelec)
        theWeeks = theWeeks.join('|'); theValues = theValues.join('|');
        var toTheEventsIds = {
          time: new Date(lastWeekTime).getTime(), title: eventTitle, sportType: 'NFLRegular', endTime: new Date(lastWeekTime).getTime(), getEventsTimeUpdate: new Date().getTime(),
          currentSelection: 'week1Round', theWeeks: theWeeks, theValues: theValues
        }

        editDbRef.update(toTheEventsIds)
        editDbRef2.update(toTheEventsIds)
        this.notify('Event created successfully')
        this.setState({ showCreateEventModal2: false, selectedWeeks: [] })
      }
    })
    return
    week1Round.map((item, index) => {
      week1Round[index]['timeInMillis'] = new Date(this.state.week1Time).getTime()
      week1Round[index]['commenceTime'] = this.state.week1Time
      week1Round[index]['time'] = this.state.week1Time
      week1Arr[item.id] = item

      if (week1Round.length === index + 1) {
        ////console.log('week1Round 1111', week1Arr)
        generalDb.child('/week1Round/').update(week1Arr)
      }
    })
    week2Round.map((item, index) => {
      week2Round[index]['timeInMillis'] = new Date(this.state.week2Time).getTime()
      week2Round[index]['commenceTime'] = this.state.week2Time
      week2Round[index]['time'] = this.state.week2Time
      week2Arr[item.id] = item
      if (week2Round.length === index + 1) {
        ////console.log('week2Arr 1111', week2Arr)
        generalDb.child('/week2Round/').update(week2Arr)
      }
    })
    week3Round.map((item, index) => {
      week3Round[index]['timeInMillis'] = new Date(this.state.week3Time).getTime()
      week3Round[index]['commenceTime'] = this.state.week3Time
      week3Round[index]['time'] = this.state.week3Time
      week3Arr[item.id] = item
      if (week3Round.length === index + 1) {
        ////console.log('week3Arr 1111', week3Arr)
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
      var eventTitle = 'NFL REGULAR ' + week1Year
      ////console.log('week1Year', week1Year, week2Year, week3Year, eventKey, eventTitle)

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
        ////console.log('week1Round 1111', week1Arr)
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
        ////console.log('week2Arr 1111', week2Arr)
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
        ////console.log('week3Arr 1111', week3Arr)
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

  pickWinner = (id, winner, time, p1Points) => {
    ////console.log('trtrt',id,winner,time,p1Points)
    //return
    if (p1Points === 'N/A') { this.notify('Points not yet populated at the moment'); return }
    var nowTime = new Date().getTime()
    var pickEditTime = time + 86400000
    /*if (winner !== 'N/A' && nowTime > pickEditTime) {
      this.notify('Winner already filled')
      return
    }*/
    if (nowTime < time) {
      this.notify('Match not yet started')
      return
    }
    if (this.state.currentSelection === 'week1Round') {
      var theItems = this.state.week1RoundArray
      theItems.forEach(item => { item.showChooseWinner = false });
      var index2 = this.state.week1RoundArray.map(function (x) { return x.id; }).indexOf(id);
      theItems[index2]['showChooseWinner'] = true
      this.setState({ week1RoundArray: theItems })
      ////console.log('heeeeeeeeere', theItems)
    }
    if (this.state.currentSelection === 'week2Round') {
      var theItems = this.state.week2RoundArray
      theItems.forEach(item => { item.showChooseWinner = false });
      var index2 = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      //var nowTime = new Date().getTime()
      theItems[index2]['showChooseWinner'] = true
      this.setState({ week2RoundArray: theItems })
      ////console.log('heeeeeeeeere', theItems)
    }
    if (this.state.currentSelection === 'week3Round') {
      ////console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var theItems = this.state.week3RoundArray
      theItems.forEach(item => { item.showChooseWinner = false });
      var index2 = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      //var nowTime = new Date().getTime()

      theItems[index2]['showChooseWinner'] = true
      this.setState({ week3RoundArray: theItems, pickedId: id })
      ////console.log('theItems', theItems)
    }
    if (this.state.currentSelection === 'week4Round') {
      ////console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var theItems = this.state.week4RoundArray
      theItems.forEach(item => { item.showChooseWinner = false });
      var index2 = this.state.week4RoundArray.map(function (x) { return x.id; }).indexOf(id);

      theItems[index2]['showChooseWinner'] = true
      this.setState({ week4RoundArray: theItems, pickedId: id })
      ////console.log('theItems', theItems)
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
      ////console.log('this.state.currentItems 008888', theItems)
    }
    if (this.state.currentSelection === 'week2Round') {
      var index2 = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week2RoundArray
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      ////console.log('this.state.currentItems 009', theItems)
      this.setState({ week2RoundArray: theItems })
    }
    if (this.state.currentSelection === 'week3Round') {
      var index2 = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week3RoundArray
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      ////console.log('this.state.currentItems 009', theItems)
      this.setState({ week3RoundArray: theItems })
    }
    if (this.state.currentSelection === 'week4Round') {
      var index2 = this.state.week4RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week4RoundArray
      theItems[index2]['chosenWinner'] = winner
      theItems[index2]['status1'] = 'played'
      ////console.log('this.state.currentItems 009', theItems)
      this.setState({ week4RoundArray: theItems })
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
      ////console.log('this.state.currentItems 0065656', theItems)
    }
    if (this.state.currentSelection === 'week2Round') {
      var index2 = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week2RoundArray
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      theItems[index2]['status1'] = 'N/A'
      this.setState({ week2RoundArray: theItems })
      ////console.log('this.state.currentItems 001', theItems)
    }
    if (this.state.currentSelection === 'week3Round') {
      var index2 = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week3RoundArray
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      theItems[index2]['status1'] = 'N/A'
      this.setState({ week3RoundArray: theItems })
      ////console.log('this.state.currentItems 001', theItems)
    }
    if (this.state.currentSelection === 'week4Round') {
      var index2 = this.state.week4RoundArray.map(function (x) { return x.id; }).indexOf(id);
      var theItems = this.state.week4RoundArray
      delete theItems[index2]['chosenWinner']
      delete theItems[index2]['showChooseWinner']
      theItems[index2]['status1'] = 'N/A'
      this.setState({ week4RoundArray: theItems })
      ////console.log('this.state.currentItems 001', theItems)
    }
  }
  submitWinner = (id, winner) => {
    // ////console.log('haaaaaaaaaaaapa 000000')
    // return
    if (this.state.currentSelection === 'week1Round') {
      var index = this.state.week1RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2' && winner !== 'itIsADraw') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner, id)
      }
    }
    if (this.state.currentSelection === 'week2Round') {
      var index = this.state.week2RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2' && winner !== 'itIsADraw') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner, id)
      }
    }
    if (this.state.currentSelection === 'week3Round') {
      var index = this.state.week3RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2' && winner !== 'itIsADraw') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner, id)
      }
    }
    if (this.state.currentSelection === 'week4Round') {
      var index = this.state.week4RoundArray.map(function (x) { return x.id; }).indexOf(id);
      if (winner !== 'player1' && winner !== 'player2' && winner !== 'itIsADraw') {
        this.notify('Nothing to submit')
      } else {
        this.checkForOutcomeSingle(index, winner, id)
      }
    }
  }
  //itIsADraw
  checkForOutcomeSingle = async (index, winner, id) => {
    try {
      if ((this.state.currentSelection === 'week1Round')) {
        this.checkForRoundOutcome(index, winner, this.state.week1RoundArray, 'week1RoundArray')
      }
      if ((this.state.currentSelection === 'week2Round')) {
        this.checkForRoundOutcome(index, winner, this.state.week2RoundArray, 'week2RoundArray')
      }
      if ((this.state.currentSelection === 'week3Round')) {
        //////console.log('haaaaaaaaaaaapa 4444444', index, winner,this.state.week3RoundArray)
        this.checkForRoundOutcome(index, winner, this.state.week3RoundArray, 'week3RoundArray')
      }
      if ((this.state.currentSelection === 'week4Round')) {
        //////console.log('haaaaaaaaaaaapa 4444444', index, winner,this.state.week3RoundArray)
        this.checkForRoundOutcome(index, winner, this.state.week4RoundArray, 'week4RoundArray')
      }
      //}
    } catch (error) {
      this.notify('An error occured, please try again later')
      ////////console.log('error',error)
    }
  }
  checkForRoundOutcome = async (index, winner, items, name) => {
    try {
      //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
      var shortArr = []
      ////console.log('haaaaaaaaaaaapa', this.state.currentSelection, index, winner)
      items[index]['winner'] = winner
      delete items[index]['chosenWinner']
      delete items[index]['showChooseWinner']
      this.setState({ [name]: items })
      items.map((item, index) => {
        ////console.log('shortArr', shortArr)
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
      //////console.log('this.state.shortArr 006 klklklk', shortArr)
      //return
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
      ////console.log('001', this.state.theEventKey, this.state.currentSelection, scoreName, theItems)
      ////console.log('theLink', theLink, theItems)ODDSA
      ////console.log('this.state.shortArr 006', shortArr)
      // return
      await axios.get("https://theramtournament.com/getSingleNFLRegularResults?term=" + theQuery)
        // await axios.get("https://theramtournament.com/getSingleNCAAFNFLResults?term=" + theQuery)
        // await axios.get("http://localhost:4000/getSingleNFLRegularResults?term="+theQuery)
        //await axios.get("http://localhost:4000/getSingleNCAAFNFLResults?term="+theQuery)
        .then((res) => {
          var theOutcome = res.data
          ////console.log('theOutcome', theOutcome)
          this.notify(theOutcome)
          if (theOutcome === 'Success Updating Results') {
            console.log('theOutcome', theOutcome)
            this.checkAuth()
          }
        })
    } catch (error) {
      ////////console.log('error',error)
    }
  }
  openConfirmModal = (message, type) => {
    //////console.log('kang',this.state.currentSelection)
    this.setState({ confirmMessage: message, showConfirmModal: true, confirmModalType: type })
  }
  proceed = () => {
    if (this.state.confirmModalType === 'oddsUpdate') { this.checkForOddsUpdateTime() }
    if (this.state.confirmModalType === 'resultsUpdate') { this.checkForOutcome() }
  }
  selectEvent = async (theMenu, theItems, editType, theScoresMenu) => {
    this.setState({ theMenu, currentSelection: theMenu, editType: editType, itemsToDetailsModal: theItems, theScoresMenu })
    //console.log('editType 4444444', theMenu, editType, theItems)
  }
  pickModal = (title, status, weekToPick) => {
    return (
      <div id={style.selectorDiv2} onClick={() => this.allowWeekPicks(title, status, weekToPick)}>
        <div className={status === true ? style.boxDiv3 : style.boxDiv3b}>
          <MdCheck size={15} /></div>
        <p style={{ color: status === true ? '#CB1E31' : null }}>{title}</p>
      </div>
    )
  }
  allowWeekPicks = (title, status, weekToPick) => {
    //console.log('this.state.theEventKey', this.state.theEventKey, status, weekToPick)
    //this.setState({[weekToPick]:!status})
    //return
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) {
      this.notify('Event not yet populated')

    }
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
    var theDb2 = firebase.database().ref('theEvents/NFLRegular/eventsIds/' + this.state.theEventKey + '/' + weekToPick)
    var theDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/' + weekToPick)
    // return
    theDb.set(!status, error => {
      if (!error) {
        theDb2.set(!status)
        this.setState({ [weekToPick]: !status })
        this.notify('Selected Succesfully')
      }
    })
  }

  checkForPicks = (theEventKey) => {
    var theDb = firebase.database().ref('/theEvents/eventsIds/' + theEventKey)
    theDb.once('value', dataSnapshot => {
      ////console.log('yhhhhhhhhhhhh', dataSnapshot.val())
      var allowWeek1Pick = dataSnapshot.val().allowWeek1Pick
      var allowWeek2Pick = dataSnapshot.val().allowWeek2Pick
      var allowWeek3Pick = dataSnapshot.val().allowWeek3Pick
      var allowWeek4Pick = dataSnapshot.val().allowWeek4Pick
      if (allowWeek1Pick) { this.setState({ allowWeek1Pick }) } else { this.setState({ allowWeek1Pick: false }) }
      if (allowWeek2Pick) { this.setState({ allowWeek2Pick }) } else { this.setState({ allowWeek2Pick: false }) }
      if (allowWeek3Pick) { this.setState({ allowWeek3Pick }) } else { this.setState({ allowWeek3Pick: false }) }
      if (allowWeek4Pick) { this.setState({ allowWeek4Pick }) } else { this.setState({ allowWeek4Pick: false }) }
    })
    //allowWeek2Pick:false,allowWeek3Pick:false,allowWeek4Pick:false
  }
  enterEventDetails2 = () => {
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) {
      this.notify("Can't enter event details before event is created")
      this.setState({ showConfirmModal: false, showProgressBar: false })
    }
    if (!this.state.currentSelection || !this.state.theEventKey || this.state.theEventKey.length < 3) return
    this.setState({ showChooseWeekModal: true, eventAlreadyFilled: false })

  }
  copyLink = () => {
    copy(this.state.theLink);
    this.notify('Link copied successfully')
  }
  itemComp = (theItems, isPicked) => {
    return (
      <div className={style.divCont}>
        <div className={style.listCont}>
          {theItems.map((item, index) => {
            //console.log('iteeeem',item)
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
            var myOutcome = 'LOST', myOutcomeSpan = '+0', myOutcomeCol = '#CB1E31', statColor = '#fff'
            if (item.winner === 'player1') { player1Color = '#1ecb97' } else { player1Color = '#CB1E31' }
            if (item.winner === 'player2') { player2Color = '#1ecb97' } else { player2Color = '#CB1E31' }

            if (item.winner === 'player1' && item.bet === 'player1') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p1Points, myOutcomeCol = '#1ecb97' }
            if (item.winner === 'player2' && item.bet === 'player2') { myOutcome = 'WON', myOutcomeSpan = '+' + item.p2Points, myOutcomeCol = '#1ecb97' }
            if (item.winner === 'itIsADraw') { myOutcome = 'DRAW', statP1 = 'Draw', statP2 = 'Draw', player1Color = '#eee', player2Color = '#eee', myOutcomeCol = '#8b8b8b', statColor = '#8b8b8b' }
            //myOutcome
            var myPick = ''
            if (item.bet === 'player1') { myPick = item.player1 }
            if (item.bet === 'player2') { myPick = item.player2 }
            var theTime = dayjs(item.timeInMillis).format('MMM D, YYYY h:mm A')
            var matchNo = item.theId.replace(/(\d+)/g, ' $1 ');
            matchNo = matchNo.replace(/\b\w/g, char => char.toUpperCase());
            matchNo = matchNo.split(" ").slice(0, 3).join(" ");
            //console.log('this.state.eventKey',this.state.theEventKey)
            if (this.state.theEventKey === 'NFLRegular-2025') {
              matchNo = this.state.theScoresMenu.split(' ').slice(0, 2).join(' ')
              matchNo = matchNo + ' Game'
            }
            return (
              <div className={style.listDiv} key={index}>
                <div className={style.theCont0}>
                  <div className={style.theCont01}>
                    <p>{matchNo + ' ' + (index + 1)}</p>
                    <p>{theTime}</p>
                  </div>
                  {this.state.isAdmin ? <div className={style.pickWinnerDiv} onClick={() => this.pickWinner(item.id, item.winner, item.timeInMillis, item.p1Points)}>
                    <p>Pick Winner</p>
                  </div> : null}
                  {item.status1 === 'notPlayed' ? <>{timeDiff > 300000 ? <div className={style.theCountDiv}><Countdown date={item.timeInMillis} className={style.theCount} /></div> : <p className={style.eventStatP} style={{ color: '#CB1E31' }}>Ongoing</p>}</> :
                    <p className={style.eventStatP} style={{ color: playStatCol }}>{playStat}</p>}


                  <div className={style.theCont}>
                    <div className={style.theContLeft}>
                      <div className={style.imgDiv1} style={{ borderColor: item.status1 === 'played' ? player1Color : 'transparent' }}>
                        {item.p1Photo !== 'N/A' ? <img className={style.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={style.teamIC} />}
                        {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: player1Color, color: statColor }}>{statP1}</p> : null}
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
                        {item.status1 === 'played' ? <p className={style.gameP} style={{ backgroundColor: player2Color, color: statColor }}>{statP2}</p> : null}
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
                  {isPicked && this.state.userLoggedIn ? <div id={style.statDiv}>
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
                      {item.chosenWinner && item.chosenWinner === 'itIsADraw' ? <p>Draw</p> : null}
                      {!item.chosenWinner || item.chosenWinner === 'N/A' ? <p>N/A</p> : null}

                    </div>
                    <div className={item.chosenWinner === 'itIsADraw' ? style.listDivB4B : style.listDivB4} onClick={() => this.chosenWinner(item.id, 'itIsADraw')}>
                      <TbCheckbox size={15} />
                      <p>Draw</p>
                    </div>
                    <button onClick={() => this.submitWinner(item.id, item.chosenWinner)}>Submit</button>
                  </div></div> : null}
              </div>
            )
          })}</div></div>
    )
  }
  theWeeksSelection = (selectedOption) => {
    //return
    if (selectedOption.length <= 4) {
      selectedOption = selectedOption.sort(function (a, b) { return a.value - b.value })
      const maxValue = Math.max(...selectedOption.map(item => item.value));
      const minValue = Math.min(...selectedOption.map(item => item.value));
      var weeksId = '-Wk' + minValue + '-Wk' + maxValue
      var weeksId2 = 'Wk' + minValue + '-Wk' + maxValue
      if (maxValue === minValue) { weeksId = '-Wk' + maxValue, weeksId2 = 'Wk' + maxValue }
      this.setState({ selectedWeeks: selectedOption, fromWeekTo: weeksId, fromWeekTo2: weeksId2 })
    } else {
      this.notify(`You can only select up to 4 items.`);
    }
    return
    console.log('50000', selectedOption.length)

    //isOptionDisabled={() =>this.state.selectedWeeks.length>=4}
  }
  chooseEveWeek = (theWeek2, theWeek, toDbId, toDbRound, stopWeekEdit) => {
    var editDbRef = firebase.database().ref('/theEvents/NFLRegular/eventsIds/' + this.state.theEventKey + '/' + stopWeekEdit)
    editDbRef.once('value', dataSnapshot => {
      if (dataSnapshot.exists()) {
        var dbTime = dataSnapshot.val()
        if (new Date().getTime() > dbTime) {
         this.chooseWeekState()
         // this.notify('You can not edit an event that already started')
         this.setState({ selectedWeek:theWeek2, selectedWeek2: theWeek2, chooseWeekErr: '', nflModalTitle: theWeek, toDbId: toDbId, toDbRound: toDbRound })
        } else {
          this.setState({ selectedWeek:theWeek2, selectedWeek2: theWeek2, chooseWeekErr: '', nflModalTitle: theWeek, toDbId: toDbId, toDbRound: toDbRound })
        }
      }
    })
  }
  chooseWeekState=()=>{
 this.setState({enterEventModal:true})
  }
  render() {
    // //////console.log('this.state.isWeek1DataAvailable',this.state.isWeek1DataAvailable)
    ////////console.log('this.state.isWeek2DataAvailable',this.state.isWeek2DataAvailable)
    ////////console.log('this.state.isWeek3DataAvailable',this.state.isWeek3DataAvailable)
    ////////console.log('this.state.isFinalsDataAvailable',this.state.isFinalsDataAvailable)
    ////console.log('this.state.currentSelection', this.state.currentSelection)
    console.log('this.state.theEventTitle',this.state.theEventTitle,this.state.sportType)
    var flockTeamName = ''
    var itemToModals = ''
    var isPastEvent = ''
    var bpsTitle = 'Week 2 Round'
    var todayInMillis = new Date().getTime()
     var titleToShow=this.state.theEventTitle.replace(/  +/g, ' ')
      var theWeek=''
      if(this.state.theEventTitle==='NFL REGULAR  2025'){
        titleToShow='NFL 2025 Wk1-Wk3'
      }else{
        titleToShow=titleToShow.split(' ')
    if(titleToShow[3]){theWeek=' '+titleToShow[3]}
      titleToShow=titleToShow[0]+' '+titleToShow[2]+' '+theWeek}
     
    var showBestPossible = ''
    if (this.state.endTime < todayInMillis && (this.state.endTime - todayInMillis) < -86400000) {
      isPastEvent = false
    } else { isPastEvent = true }


    if (this.state.currentSelection === 'week1Round') { itemToModals = this.state.week1RoundArray, showBestPossible = this.state.isWeek1RoundPicked, bpsTitle = 'Week 2 Round' }
    if (this.state.currentSelection === 'week2Round') { itemToModals = this.state.week2RoundArray, showBestPossible = this.state.isWeek2RoundPicked, bpsTitle = 'Week 3 Round' }
    if (this.state.currentSelection === 'week3Round') { itemToModals = this.state.week3RoundArray, showBestPossible = this.state.isWeek3RoundPicked, bpsTitle = 'Week 4 Round' }
    if (this.state.currentSelection === 'week4Round') { itemToModals = this.state.week4RoundArray, showBestPossible = this.state.isWeek4RoundPicked, bpsTitle = 'Week 4 Round' }
    //if (this.state.currentSelection === 'superBowl') { itemToModals = this.state.finalArray, showBestPossible = this.state.isFinalsPicked }
    var theBPS = 0.00, theWeeklyScore = 0.00, theWeeklyRank = 'N/A'
    if (this.state.currentSelection === 'week1Round') { if (this.state.currentEventUserInfo['week1RoundBPS']) { theBPS = this.state.currentEventUserInfo['week1RoundBPS'], theWeeklyScore = this.state.currentEventUserInfo['week1RoundScore'], theWeeklyRank = this.state.currentEventUserInfo['week1RoundRank'] } }
    if (this.state.currentSelection === 'week2Round') { if (this.state.currentEventUserInfo['week2RoundBPS']) { theBPS = this.state.currentEventUserInfo['week2RoundBPS'], theWeeklyScore = this.state.currentEventUserInfo['week2RoundScore'], theWeeklyRank = this.state.currentEventUserInfo['week2RoundRank'] } }
    if (this.state.currentSelection === 'week3Round') { if (this.state.currentEventUserInfo['week3RoundBPS']) { theBPS = this.state.currentEventUserInfo['week3RoundBPS'], theWeeklyScore = this.state.currentEventUserInfo['week3RoundScore'], theWeeklyRank = this.state.currentEventUserInfo['week3RoundRank'] } }
    if (this.state.currentSelection === 'week4Round') { if (this.state.currentEventUserInfo['week4RoundBPS']) { theBPS = this.state.currentEventUserInfo['week4RoundBPS'], theWeeklyScore = this.state.currentEventUserInfo['week4RoundScore'], theWeeklyRank = this.state.currentEventUserInfo['week4RoundRank'] } }


    if (this.state.dataAvailable) { flockTeamName = this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] }
    else { flockTeamName = false }
    //if(this.state.dataAvailable){itemToModals=this.state.theItems}else{itemToModals=this.state.ramUfcMaincardArray}
    const customStyles = {
      control: (base) => ({
        ...base,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        fontSize: 12,
        boxShadow: "none",
        width: '250px',
        padding: 0,
        "&:hover": { borderColor: "#888" },
      }),
      option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isFocused ? "#e6f7ff" : isSelected ? "#bae7ff" : "white",
        color: isSelected ? "black" : "gray",
        cursor: "pointer",

      }),
      menu: (base) => ({
        ...base,
        zIndex: 5,
      }),
    };
    return (
      <><div className={style.container}>
        {/*<div className={style.eventsCont}>
          <p className={style.eventsP} id={this.state.theEvent === 'Upcoming Events' ? style.playerP1 : style.playerP} onClick={() => this.setState({ theEvent: 'Upcoming Events' })}>UPCOMING EVENTS</p>
          <p className={style.eventsP} style={{ color: this.state.pastEventsAvailable ? null : '#b2b2b2', borderColor: this.state.pastEventsAvailable ? null : '#b2b2b2' }} id={this.state.theEvent === 'Past Events' ? style.playerP1 : style.playerP} onClick={() => this.state.pastEventsAvailable ? this.setState({ theEvent: 'Past Events' }) : null}>PAST EVENTS</p>
        </div>*/}
        {this.state.allEvents.length > 0 ? <div className={style.matchesHeadDiv}>
          {this.state.allEvents.map((item, index) => {
            //console.log('kakaka',item)
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
              <div className={style.headList} key={index} style={{ color: theColor, borderColor: theColor }} onClick={() => this.loadOtherEvent(item.id, item.title, item.oddsUpdate, item.resultsUpdate, item.stopweek1RoundEdit, item.theValues)}>
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
          <p className={style.eventP} onClick={() => this.enterEventDetails2()}>Enter Event Details</p>
          <p className={style.eventP2} onClick={() => this.setState({ showCreateEventModal2: true })}>Create New NFL Event</p>
        </div> : null}
        <p className={style.eveP}>Event: <span>{titleToShow}</span></p>
        {this.state.theLink.length > 1 && new Date().getTime() < this.state.stopweek1RoundEdit ? <div className={style.shareDiv} onClick={() => this.copyLink()}>
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
        {this.state.isAdmin ?
          <div>
            <p id={style.picksP}>Allow Week Picks</p>
            <div id={style.selectorDiv}>
              {this.state.theValues.split('|').map((item, index) => {
                var theIndex = index + 1
                var stateWeek = 'allowWeek' + theIndex + 'Pick'
                var theWeek = 'Week ' + item
                console.log('{this.state[stateWeek]',this.state[stateWeek])
                return (
                  <div id={style.selectorDiv2} key={index} onClick={() => this.allowWeekPicks(theWeek, this.state[stateWeek], stateWeek)}>
                    <div className={this.state[stateWeek] === true ? style.boxDiv3 : style.boxDiv3b}>
                      <MdCheck size={15} /></div>
                    <p style={{ color: this.state[stateWeek] === true ? '#CB1E31' : null }}>{theWeek}</p>
                  </div>
                )
              })}
              {/*this.pickModal('Week 2', this.state.allowWeek2Pick, 'allowWeek2Pick')}
              {this.pickModal('Week 3', this.state.allowWeek3Pick, 'allowWeek3Pick')}
              {this.pickModal('Week 4', this.state.allowWeek4Pick, 'allowWeek4Pick')*/}
              {/*return (
                <div id={style.selectorDiv2} key={index} onClick={() => this.setState({ selectedWeek:item.id,selectedWeek2:item.text,chooseWeekErr:''})}>
                  <div className={this.state.allowPicks === item ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color: this.state.selectedWeek === item ? '#CB1E31' : null }}>{item}</p>
                </div>
              )*/}
            </div></div> : null}
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
          {this.state.theValues.split('|').map((item, index) => {
            var theIndex = index + 1
            var theMenu = 'week' + theIndex + 'Round'
            var theArr = 'week' + theIndex + 'RoundArray'
            var theWeekEdit = 'stopweek' + theIndex + 'RoundEdit'
            var theScoresMenu = 'Week ' + item + ' Round'
            return (
              <p key={index} id={this.state.theMenu === theMenu ? style.playerP2 : style.playerP} onClick={() => this.selectEvent(theMenu, this.state[theArr], theWeekEdit, theScoresMenu)}>{'WEEK ' + item}</p>
            )
          })}
          {/*this.state.week1RoundArray.length ? <p id={this.state.theMenu === 'week1Round' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('week1Round', this.state.week1RoundArray, 'stopweek1RoundEdit')}>WEEK 2</p> : null}
          {this.state.week2RoundArray.length ? <p id={this.state.theMenu === 'week2Round' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('week2Round', this.state.week2RoundArray, 'stopweek2RoundEdit')}>WEEK 3</p> : null}
          {this.state.week3RoundArray.length ? <p id={this.state.theMenu === 'week3Round' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('week3Round', this.state.week3RoundArray, 'stopweek3RoundEdit')}>WEEK 4</p> : null*/}

        </div>
        <div className={style.scoresCont}>
          <div className={style.scoresCont1}>
            <p className={style.currentP}>{this.state.theScoresMenu}</p>
            <p className={style.scoreP1}>Best possibe Score:<br /></p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? theBPS : '0.00'} points</p>
          </div>
          <div className={style.scoresCont2}>
            <p className={style.currentP}>{this.state.theScoresMenu}</p>
            <p className={style.scoreP1}>Current Score</p>
            <p className={style.scoreP2}>{this.state.dataAvailable ? theWeeklyScore : '0.00'} points</p>
          </div>
          <div className={style.scoresCont3}>
            <p className={style.currentP}>{this.state.theScoresMenu}</p>
            <p className={style.scoreP1}>Current Rank in NFL</p>
            <p className={style.scoreP2}>{this.state.dataAvailable && this.state.currentRank ? theWeeklyRank : 'N/A'}</p>
          </div>
        </div>
        <div className={style.divCont}>
          {this.state.theMenu === 'week1Round' ? <div className={style.divCont}>{this.itemComp(this.state.week1RoundArray, this.state.isWeek1RoundPicked)}</div> : null}
          {this.state.theMenu === 'week2Round' ? <div className={style.divCont}>{this.itemComp(this.state.week2RoundArray, this.state.isWeek2RoundPicked)}</div> : null}
          {this.state.theMenu === 'week3Round' ? <div className={style.divCont}>{this.itemComp(this.state.week3RoundArray, this.state.isWeek3RoundPicked)}</div> : null}
          {this.state.theMenu === 'week4Round' ? <div className={style.divCont}>{this.itemComp(this.state.week4RoundArray, this.state.isWeek4RoundPicked)}</div> : null}

        </div>
      </div>
        {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent={this.state.theCurrentEvent} theItems={itemToModals} flockTeamName={flockTeamName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentSelection} /></div> : null}
        {this.state.openLoginModal ? <div className={style.detailsModal} onClick={() => this.setState({ openLoginModal: false })}><LogIn /></div> : null}
        {this.state.editDetailsModal ? <div className={style.detailsModal} onClick={e => e.currentTarget === e.target && this.setState({ editDetailsModal: false })} ><EditDetails theDetails={this.state.currentEventUserInfo['teamName'] + '::' + this.state.currentEventUserInfo['flockName'] + '::' + this.state.profilePhoto + '::' + this.state.theCurrentEvent} eventType={this.state.theMenu} theEventKey={this.state.theEventKey} /></div> : null}

        {this.state.nflModal ? <div className={style.detailsModal} onClick={() => this.setState({ nflModal: false })}><NFLModal eventToNFLModal={this.state.eventToNFLModal} itemsToNFLModal={this.state.itemsToNFLModal} theEventKey={this.state.theEventKey} lastPostTime={this.state.lastPostTime} eventAlreadyFilled={this.state.eventAlreadyFilled} nflModalTitle={this.state.nflModalTitle} onClick={this.handleChildClick} /></div> : null}
        {!this.state.showCreateEventModal ? <div className={style.detailsModal} onClick={() => this.setState({ showCreateEventModal: false })}>
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
        {this.state.showCreateEventModal2 ? <div className={style.detailsModal} onClick={() => this.setState({ showCreateEventModal2: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p className={style.eventHeadP}>Create NFL Regular Event</p>
            <div style={{ marginTop: 20 }}>
              <Select onChange={(selectedOption) => { this.theWeeksSelection(selectedOption) }} value={this.state.selectedWeeks} options={options} className={style.selectCont} isMulti styles={customStyles} />
            </div>
            {this.state.selectedWeeks.map((item, index) => {
              return (
                <div key={index}>
                  <p className={style.eventTitleP}>Enter {item.label} Matches Start Date/Time</p>
                  <input className={style.eventInput} id='week1Time' placeholder='Enter your RAM name' type='datetime-local' value={item.theDate || ''} onChange={(event) => this.inputChange2(event, index)}></input>
                  <p className={style.eventErrorP}>{this.state.week1Err}</p>

                </div>
              )

            })}

            {/*<p className={style.eventTitleP}>Enter Week 3 Matches Start Date/Time</p>
            <input className={style.eventInput} id='week2Time' placeholder='Enter your RAM name' type='datetime-local' value={this.state.week2Time} onChange={(event) => this.inputChange(event)}></input>
            <p className={style.eventErrorP}>{this.state.week2Err}</p>
            <p className={style.eventTitleP}>Enter Week 4 Matches Start Date/Time</p>
            <input className={style.eventInput} id='week3Time' placeholder='Enter your RAM name' type='datetime-local' value={this.state.week3Time} onChange={(event) => this.inputChange(event)}></input>
            <p className={style.eventErrorP}>{this.state.week3Err}</p>*/}
            <button className={style.submitBtn} onClick={() => this.checkEvent2()}>Create Event</button>
          </div>
        </div> : null}
        {this.state.daysRangeModal ? <div className={style.detailsModal} onClick={() => this.setState({ daysRangeModal: false })}>
          <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
            <p className={style.eventHeadP}>Enter {this.state.nflModalTitle} Matches Start and End  Time </p>
            <p className={style.eventTitleP}>Enter {this.state.nflModalTitle} Matches Start Date/Time(From odds API)</p>

            {/*<DateTimePicker id='round1'onChange={(event)=>this.onChange(event)} value={this.state.round1} />*/}
            <input className={style.eventInput} id='matchStartTime' placeholder='e.g 2025-09-05T00:20:00Z' value={this.state.matchStartTime} onChange={(event) => this.inputChange(event)}></input>
            {/*<input id='week1GamesNo' className={style.week1GamesNo} placeholder='Week 1 Games No' value={this.state.week1GamesNo} onChange={(event) => this.inputChange(event)}></input>*/}
            <p className={style.eventErrorP}>{this.state.matchStartTimeErr}</p>
            <p className={style.eventTitleP}>Enter {this.state.nflModalTitle} Matches End Date/Time(From odds API)</p>
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
            {this.state.theValues.split('|').map((item, index) => {
              var theIndex = index + 1
              var stateWeek = 'allowWeek' + theIndex + 'Pick'
              var theWeek = 'WEEK ' + item
              var theWeek2 = 'WEEK ' + theIndex
              var toDbRound = 'Week' + item + ' Round'
              var toDbId = 'week' + item + 'Game'
              var stopWeekEdit = 'stopweek' + theIndex + 'RoundEdit'

              //stopweek1RoundEdit
              return (
                <div className={style.selectorDiv} key={index} onClick={() => this.chooseEveWeek(theWeek2, theWeek, toDbId, toDbRound, stopWeekEdit)}>
                  <div className={this.state.selectedWeek === theWeek2 ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color: this.state.selectedWeek === theWeek2 ? '#CB1E31' : null }}>{theWeek}</p>
                </div>
              )
            })}

            {/*this.state.weekSelect.map((item, index) => {
              return (
                <div className={style.selectorDiv} key={index} onClick={() => this.setState({ selectedWeek: item.id, selectedWeek2: item.text, chooseWeekErr: '' })}>
                  <div className={this.state.selectedWeek === item.id ? style.boxDiv3 : style.boxDiv3b}>
                    <MdCheck size={15} /></div>
                  <p style={{ color: this.state.selectedWeek === item.id ? '#CB1E31' : null }}>{item.text}</p>
                </div>
              )
            })*/}
            <p style={{ color: '#CB1E31', marginTop: 10, fontWeight: 500, fontSize: 16 }}>{this.state.chooseWeekErr}</p>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
              <button style={{ backgroundColor: '#ddd', border: 'none', color: 'black', padding: '7px 15px', cursor: 'pointer' }} onClick={() => this.setState({ selectedWeek: '', selectedWeek2: '', chooseWeekErr: '', nflModalTitle: '', toDbId: '', toDbRound: '', showChooseWeekModal: false })}>Cancel</button>
              <button style={{ backgroundColor: '#292f51', border: '1px solid #292f51', color: '#fff', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.openRangeLModal()}>Autofill</button>
              <button style={{ backgroundColor: '#CB1E31', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.openNFLModal()}>Proceed</button>
            </div>
          </div></div> : null}
          {this.state.enterEventModal?<div className={style.detailsModal} onClick={()=>this.setState({enterEventModal:false})}>
                  <div className={style.delModal} onClick={(e)=>this.doNothing(e)}>
                    <p className={style.delModalP1}>Enter Event Details?</p>
                    <p className={style.delModalP2}>The matches seem to have started. Are you sure you want to proceed?</p>
                    <p className={style.delModalP2} style={{color:'red'}}>This cannot be reversed!</p>
                    <div>
                      <button className={style.delModalDelBtn} onClick={()=>this.setState({enterEventModal:false})}>Continue</button>
                      <button className={style.canModalDelBtn} onClick={()=>this.setState({enterEventModal:false,selectedWeek: '', selectedWeek2: '', chooseWeekErr: '', nflModalTitle: '', toDbId: '', toDbRound: '', showChooseWeekModal: false})}>Cancel</button>
                    </div>
                  </div>
                  </div>:null}
        <ToastContainer />
        {this.state.showProgressBar ? <ProgressBar /> : null}
      </>
    )
  }
}

export default NCAA

