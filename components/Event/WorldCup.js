import React, { Component } from 'react';
import style from "./WorldCup.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import { MdCheck, MdOutlinePersonOutline, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import { IoPersonSharp } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { RiTeamFill } from "react-icons/ri";
import copy from 'copy-to-clipboard';
import { BsFillLightningFill } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { TbCheckbox } from "react-icons/tb";
import { MdClose, MdOutlineShare } from "react-icons/md";
import RamOdds from '../TheJSONS/ramOdds'
import Image from 'next/image'
import axios from "axios"
import WorldCupModal from './WorldCupModal'
import DetailsModal from './WorldCupDetailsModal';
var flagImg = 'https://a.espncdn.com/i/teamlogos/soccer/500/164.png'
var groupATeams = [{ id: 'groupATeam1', teamName: 'Mexico', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/203.png', outCome: 'Proceed', rank: 24, points: 4.8 }, { id: 'groupATeam2', teamName: 'South Africa', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/467.png', outCome: 'Proceed', rank: 96, points: 2.3 }, { id: 'groupATeam3', teamName: 'South Korea', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/451.png', outCome: 'Eliminated', rank: 24, points: 1.52 }, { id: 'groupATeam4', teamName: 'Czechia', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/450.png', outCome: 'N/A', rank: 103, points: 3.52 }]
var chosenTeams = [], ramOddsMap = '', teamsChosenOdds = []
var theGameEvents = ['Group Stage', 'Round of 32', 'Round of 16', 'Quarter Finals', 'Semi Finals', 'Finals']
var theR16FromDb = {
  "r16Match1": {
    "id": "r16Match1",
    "player1": "Canada",
    "player2": "Morocco",
    "p1Points": 8.59,
    "p2Points": 1.86
  },
  "r16Match2": {
    "id": "r16Match2",
    "player1": "Paraguay",
    "player2": "France",
    "p1Points": 82.4,
    "p2Points": 1.39
  },
  "r16Match3": {
    "id": "r16Match3",
    "player1": "Brazil",
    "player2": "Norway",
    "p1Points": 1.89,
    "p2Points": 7.41
  },
  "r16Match4": {
    "id": "r16Match4",
    "player1": "Mexico",
    "player2": "England",
    "p1Points": 5.13,
    "p2Points": 3.09
  },
  "r16Match5": {
    "id": "r16Match5",
    "player1": "Portugal",
    "player2": "Spain",
    "p1Points": 7.04,
    "p2Points": 1.97
  },
  "r16Match6": {
    "id": "r16Match6",
    "player1": "USA",
    "player2": "Belgium",
    "p1Points": 3.77,
    "p2Points": 3.94
  },
  "r16Match7": {
    "id": "r16Match7",
    "player1": "Switzerland",
    "player2": "Colombia",
    "p1Points": 5.88,
    "p2Points": 2.67
  },
  "r16Match8": {
    "id": "r16Match8",
    "player1": "Argentina",
    "player2": "Egypt",
    "p1Points": 1.57,
    "p2Points": 15.26
  }
};
var theQFromDb={
  "qfMatch1": {
    "id": "qfMatch1",
    "player1": "France",
    "player2": "Morocco",
    "p1Points": 1.63,
    "p2Points": 10.82
  },
  "qfMatch2": {
    "id": "qfMatch2",
    "player1": "Spain",
    "player2": "Belgium",
    "p1Points": 1.66,
    "p2Points": 9.33
  },
  "qfMatch3": {
    "id": "qfMatch3",
    "player1": "Norway",
    "player2": "England",
    "p1Points": 7.26,
    "p2Points": 1.94
  },
  "qfMatch4": {
    "id": "qfMatch4",
    "player1": "Argentina",
    "player2": "Switzerland",
    "p1Points": 1.8,
    "p2Points": 9.33
  }
}
const groupStage = [
    { id: 'groupAMatch1', group: 'Group A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupAMatch2', group: 'Group A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupAMatch3', group: 'Group A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupAMatch4', group: 'Group A', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupBMatch1', group: 'Group B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupBMatch2', group: 'Group B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupBMatch3', group: 'Group B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupBMatch4', group: 'Group B', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupCMatch1', group: 'Group C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupCMatch2', group: 'Group C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupCMatch3', group: 'Group C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupCMatch4', group: 'Group C', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupDMatch1', group: 'Group D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupDMatch2', group: 'Group D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupDMatch3', group: 'Group D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupDMatch4', group: 'Group D', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupEMatch1', group: 'Group E', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupEMatch2', group: 'Group E', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupEMatch3', group: 'Group E', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupEMatch4', group: 'Group E', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupFMatch1', group: 'Group F', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupFMatch2', group: 'Group F', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupFMatch3', group: 'Group F', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupFMatch4', group: 'Group F', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupGMatch1', group: 'Group G', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupGMatch2', group: 'Group G', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupGMatch3', group: 'Group G', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupGMatch4', group: 'Group G', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupHMatch1', group: 'Group H', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupHMatch2', group: 'Group H', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupHMatch3', group: 'Group H', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupHMatch4', group: 'Group H', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupIMatch1', group: 'Group I', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupIMatch2', group: 'Group I', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupIMatch3', group: 'Group I', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupIMatch4', group: 'Group I', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupJMatch1', group: 'Group J', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupJMatch2', group: 'Group J', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupJMatch3', group: 'Group J', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupJMatch4', group: 'Group J', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupKMatch1', group: 'Group K', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupKMatch2', group: 'Group K', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupKMatch3', group: 'Group K', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupKMatch4', group: 'Group K', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupLMatch1', group: 'Group L', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupLMatch2', group: 'Group L', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupLMatch3', group: 'Group L', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
    { id: 'groupLMatch4', group: 'Group L', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round 1' },
];
const roundOf32 = [
    { id: 'r32Match1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match5', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match6', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match7', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match8', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match9', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match10', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match11', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match12', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match13', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match14', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match15', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
    { id: 'r32Match16', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 32' },
];
const roundOf16 = [
    { id: 'r16Match1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match5', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match6', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match7', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
    { id: 'r16Match8', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Round of 16' },
];
const quarterFinals = [
    { id: 'qfMatch1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter-Final' },
    { id: 'qfMatch2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter-Final' },
    { id: 'qfMatch3', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter-Final' },
    { id: 'qfMatch4', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Quarter-Final' },
];
const semiFinals = [
    { id: 'sfMatch1', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Semi-Final' },
    { id: 'sfMatch2', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Semi-Final' },
];
const final = [
    { id: 'finalMatch', time: '', timeInMillis: '', player1: 'N/A', p1Points: 'N/A', p1Rec: 'N/A', p2Rec: 'N/A', player2: 'N/A', p2Points: 'N/A', stat: 'N/A', game: 'WorldCup', p1Photo: 'N/A', p2Photo: 'N/A', status1: 'notPlayed', status2: '', commenceTime: '', bet: '', winner: 'N/A', matchType: 'Final' },
];

class WorldCup extends Component {
    state = {
        showCreateEventModal: false, groupStage: '', groupStageErr: '', roundOf32: '', round32Err: '', roundOf16: '', roundOf16Err: '', enterTeamNameInfoModal: false, team1Odds: '0.00', team2Odds: '0.00', team3Odds: '0.00', team4Odds: '0.00', profilePhoto: '', theTime: '', showConfirmModal: false, confirmMessage: '', confirmTeam: '', itemToModals: '', worldCupModal: false, modalTitle: '', selectionToModal: '',
        quarterFinals: '', groupATeamsErr: '', semiFinals: '', semiFinalsErr: '', final: '', finalErr: '', currentRound: 'finalRound', theMenu: 'roundOf16', groupStagePopulated: false, teamName: '', flockName: '', teamNameErr: '', flockNameErr: '', myEmail: '', myPhoneNo: '', flockNameNoSpace: '', ramFlockName: 'Flockless', showPickWinnerModal: false, selectedId: '', selectedGroup: '',
        groupAArr: [], groupBArr: [], groupCArr: [], groupDArr: [], groupEArr: [], groupFArr: [], groupGArr: [], groupHArr: [], groupIArr: [], groupJArr: [], groupKArr: [], groupLArr: [], userLoggedIn: '', isAdmin: false, userId: '', roundOf32Arr: [], chosenTeams: [], dataAvailable: false, teamsChosenOdds: [], currentEventUserInfo: '', theGameEvent: '', selectedGroupArr: '', opendetailsModal: false,
        quarterFinalsArr: [], semiFinalsArr: [], finalArr: [], roundOf16Arr: [], theEventKey: 'WorldCup2026', openEnterTeamsModal: false, team1Name: '', team1Points: '', team1Flag: '', team2Name: '', team2Points: '', team2Flag: '', team3Name: '', team3Points: '', team3Flag: '', team4Name: '', team4Points: '', team4Flag: '', theLink: '', theEventTitle: 'World Cup 2026', menuSelection: '',
    }
    componentDidMount = () => {
        this.checkAuth()

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
                if (userId) { this.getWorldCupMatches(userId) }
                //this.getMatchesInfo(userId)
            } else {
                this.setState({ userLoggedIn: false })
                this.getWorldCupMatches('')
            }
        })
    }
        reArrangeRoundOf16 = () => {
        var userRef = firebase.database().ref('/userBets/WorldCup/WorldCup2026/')
        // var userRef = firebase.database().ref('/users/')
        userRef.once('value', dataSnapshot => {
            var theCount = 0, theNo = dataSnapshot.numChildren()
            dataSnapshot.forEach((data) => {
                theCount++
                var theId = data.key
                var value = data.val()
                var round2 = data.val().round2
                var final = data.val().final
                var theRoundOf16 = data.val().roundOf16
               // console.log('value', theId, value)
              //  console.log('round2', round2)
              //  console.log('final', final)
                if (!theRoundOf16&&round2) {
                    const r16MatchesArray = Object.entries(round2)
                        .filter(([matchId]) => matchId.startsWith("r16"))
                        .map(([matchId, winner]) => ({
                            [matchId]: winner // Dynamically sets the match ID as the key
                        }));
                    console.log('r16MatchesArray', theId, r16MatchesArray)
                    const unifiedObject = Object.assign({}, ...r16MatchesArray);
                    if (r16MatchesArray.length > 0) {
                        console.log('hapo sawa', theId, this.state.theEventKey, r16MatchesArray)
                        //var betsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/bets/roundOf16/')
                        //var ramsBets = firebase.database().ref('/userBets/WorldCup/WorldCup2026/' + theId + '/roundOf16/')

                        var betsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/bets/roundOf16/')
                        var detailsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/details/')
                        var ramsBets = firebase.database().ref('/userBets/WorldCup/WorldCup2026/' + theId + '/roundOf16/')
                        var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/WorldCup2026/')

                        //betsRef.set(unifiedObject)
                        //ramsBets.set(unifiedObject)
                                      console.log('unifiedObject',unifiedObject)
                        const matchesData = theR16FromDb; // Your first JSON
                        const myPicks = unifiedObject;             // Your second JSON

                        const bestPossiblePoints = this.calculateBestPossiblePoints(matchesData, myPicks);
                        console.log('hapo sawa', theId,bestPossiblePoints)
                       // return
                       var detObject={roundOf16Pick:true,roundOf16BPS:bestPossiblePoints}
                        betsRef.set(unifiedObject)
                        ramsBets.set(unifiedObject)
                        detailsRef.update(detObject)

                        detailsRef.child('flockName').once('value', dataSnapshot => {
                        var theFlockName=dataSnapshot.val()
                        if(theFlockName==='Flockless'){console.log('No FlockName 1',theFlockName)}
                        else{
                             var detObject={roundOf16Pick:true,roundOf16BPS:bestPossiblePoints}
                            theFlockName=theFlockName.replace(/ /g,"|")
                            console.log('Has FlockName 1',theFlockName.replace(/ /g,"|"))
                            membersFlockNamesRef.child('/membersScores/'+theFlockName).child(theId).update(detObject)
                        }
                        })
                    }
                }
                if (!theRoundOf16&&final) {
                    const r16MatchesArray = Object.entries(final)
                        .filter(([matchId]) => matchId.startsWith("r16"))
                        .map(([matchId, winner]) => ({
                            [matchId]: winner // Dynamically sets the match ID as the key
                        }));
                    console.log('r16MatchesArray', theId, r16MatchesArray)
                    const unifiedObject = Object.assign({}, ...r16MatchesArray);
                    if (r16MatchesArray.length > 0) {
                                          var betsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/bets/roundOf16/')
                        var ramsBets = firebase.database().ref('/userBets/WorldCup/WorldCup2026/' + theId + '/roundOf16/')

                        var betsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/bets/roundOf16/')
                        var detailsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/details/')
                        var ramsBets = firebase.database().ref('/userBets/WorldCup/WorldCup2026/' + theId + '/roundOf16/')
                        var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/WorldCup2026/')

                        //betsRef.set(unifiedObject)
                        //ramsBets.set(unifiedObject)
                                      console.log('unifiedObject',unifiedObject)
                        const matchesData = theR16FromDb; // Your first JSON
                        const myPicks = unifiedObject;             // Your second JSON

                        const bestPossiblePoints = this.calculateBestPossiblePoints(matchesData, myPicks);
                        console.log('hapo sawa', theId,bestPossiblePoints)
                        //return
                        var detObject={roundOf16Pick:true,roundOf16BPS:bestPossiblePoints}
                        betsRef.set(unifiedObject)
                        ramsBets.set(unifiedObject)
                        detailsRef.update(detObject)

                        detailsRef.child('flockName').once('value', dataSnapshot => {
                        var theFlockName=dataSnapshot.val()
                        if(theFlockName==='Flockless'){console.log('No FlockName 1',theFlockName)}
                        else{
                             var detObject={roundOf16Pick:true,roundOf16BPS:bestPossiblePoints}
                            theFlockName=theFlockName.replace(/ /g,"|")
                            console.log('Has FlockName 1',theFlockName.replace(/ /g,"|"))
                            membersFlockNamesRef.child('/membersScores/'+theFlockName).child(theId).update(detObject)
                        }
                     })

                    }
                }
            })
        })
    }
    reArrangeQuarterFinals = () => {
        var userRef = firebase.database().ref('/userBets/WorldCup/WorldCup2026/')
        // var userRef = firebase.database().ref('/users/')
        userRef.once('value', dataSnapshot => {
            var theCount = 0, theNo = dataSnapshot.numChildren()
            dataSnapshot.forEach((data) => {
                theCount++
                var theId = data.key
                var value = data.val()
                var roundOf16 = data.val().roundOf16
                var theQuarterFinals = data.val().quarterFinals
               // var final = data.val().final
              //  console.log('value', theId, value)
              //  console.log('roundOf16', roundOf16)
               // console.log('final', final)
                if (roundOf16) {
                    const r16MatchesArray = Object.entries(roundOf16)
                        .filter(([matchId]) => matchId.startsWith("qfM"))
                        .map(([matchId, winner]) => ({
                            [matchId]: winner // Dynamically sets the match ID as the key
                        }));
                  //  console.log('r16MatchesArray', theId, r16MatchesArray)
                    const unifiedObject = Object.assign({}, ...r16MatchesArray);
                    if (r16MatchesArray.length > 0) {
                       
                        var betsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/bets/quarterFinals/')
                        var detailsRef = firebase.database().ref('/users/' + theId + '/ramData/events/WorldCup/WorldCup2026/details/')
                        var ramsBets = firebase.database().ref('/userBets/WorldCup/WorldCup2026/' + theId + '/quarterFinals/')
                        var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/WorldCup2026/')
                        
                        //var theItem={}
                        console.log('unifiedObject',unifiedObject)
                        const matchesData = theQFromDb; // Your first JSON
                        const myPicks = unifiedObject;             // Your second JSON

                        const bestPossiblePoints = this.calculateBestPossiblePoints(matchesData, myPicks);
                        console.log('hapo sawa', theId,bestPossiblePoints)
                      
                       var detObject={quarterFinalsRemake:true,quarterFinalsPick:true,currentPick:'quarterFinals',theMenu:'quarterFinals',quarterFinalsBPS:bestPossiblePoints}
                        betsRef.set(unifiedObject)
                        ramsBets.set(unifiedObject)
                        detailsRef.update(detObject)

                        detailsRef.child('flockName').once('value', dataSnapshot => {
                        var theFlockName=dataSnapshot.val()
                        if(theFlockName==='Flockless'){console.log('No FlockName 1',theFlockName)}
                        else{
                             var detObject={currentPick:'quarterFinals',theMenu:'quarterFinals',quarterFinalsPick:true,quarterFinalsBPS:bestPossiblePoints}
                            theFlockName=theFlockName.replace(/ /g,"|")
                            console.log('Has FlockName 1',theFlockName.replace(/ /g,"|"))
                            membersFlockNamesRef.child('/membersScores/'+theFlockName).child(theId).update(detObject)
                        }
                        })
                       
                    }
                }
        })
    })
}
calculateBestPossiblePoints = (matchesData, myPicks) => {
  let totalPoints = 0;

  
  Object.keys(myPicks).forEach((matchId) => {
    const pickedPlayerKey = myPicks[matchId]; 
    const matchDetails = matchesData[matchId]; 

    if (matchDetails) {
  
      const pointsKey = pickedPlayerKey === 'player1' ? 'p1Points' : 'p2Points';
      
      const pointsValue = matchDetails[pointsKey];
      
      if (pointsValue && typeof pointsValue === 'number') {
        totalPoints += pointsValue;
      }
    }
  });

  // Rounding to 2 decimal places to handle floating-point precision math
  return parseFloat(totalPoints.toFixed(2));
}
    remakeFlocks = async () => {
        var userRef = firebase.database().ref('/users/')
        userRef.once('value', dataSnapshot => {
            var theCount = 0, theNo = dataSnapshot.numChildren()
            dataSnapshot.forEach((data) => {
                theCount++
                var theUid = data.key, flockNameWithSpaces = ''
                var theFlockData = data.val().flockData//.WorldCup2026.name
                if (theFlockData) {
                    theFlockData = theFlockData['flockNames']['WorldCup2026']
                    if (theFlockData) {
                        theFlockData = theFlockData['name']
                        flockNameWithSpaces = theFlockData.split('|').join(' ')
                        userRef.child(theUid).child('/ramData/events/WorldCup/WorldCup2026/details/flockName/').set(flockNameWithSpaces)
                    } else { theFlockData = '' }
                } else { theFlockData = '' }
                console.log('theFlockName 001', theCount, theUid, flockNameWithSpaces, theFlockData)
                if (theCount === theNo) { console.log('Count finished') }
            })
        })

    }
    getUserDetails = (userId) => {//teamName
        var userRef = firebase.database().ref('/users/' + this.state.userId + '/userData/')
        var detailsRef = firebase.database().ref('/users/' + this.state.userId + '/ramData/events/WorldCup/' + this.state.theEventKey + '/details/')
        var myFlockNamesRef = firebase.database().ref('/users/').child(this.state.userId + '/flockData/flockNames/').child(this.state.theEventKey)
        var photoRefDb = firebase.database().ref('/users/').child(this.state.userId + '/userData/').child('profilePhoto')
        photoRefDb.once('value', dataSnapshot => {
            //console.log('proofile photo',dataSnapshot.val())
            if (dataSnapshot.val()) {
                this.setState({ profilePhoto: dataSnapshot.val() })
            }
        })
        userRef.once('value', dataSnapshot => {
            var myEmail = dataSnapshot.val().email
            var myPhoneNo = dataSnapshot.val().phoneNo
            this.setState({ myEmail, myPhoneNo })

        })
        detailsRef.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                this.setState({ currentEventUserInfo: dataSnapshot.val(), teamName: dataSnapshot.val().teamName, dataAvailable: true })
            }

        })
        myFlockNamesRef.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                console.log('it existssssssssssssssss 222222', dataSnapshot.val().name)
                var theFlockName = dataSnapshot.val().name
                theFlockName = theFlockName?.split("|").join(" ")
                this.setState({ ramFlockName: theFlockName, flockNameNoSpace: dataSnapshot.val().name })
            } else {
                console.log('it existssssssssssssssss 33333333')
                this.setState({ ramFlockName: 'Flockless', flockNameNoSpace: 'Flockless' })
            }
        })
    }
    checkLink = async (userId) => {
        var flocksDataRef = firebase.database().ref('users/').child(userId + '/flockData/flockNames/' + this.state.theEventKey + '/link')
        //console.log('flocksDataRef the key',userId,this.state.theEventKey)
        flocksDataRef.once('value', dataSnapshot => {

            if (dataSnapshot.exists()) {
                this.setState({ theLink: dataSnapshot.val() })
            } else {
                this.setState({ theLink: '' })
            }
        })
    }
    copyLink = () => {
        copy(this.state.theLink);
        this.notify('Link copied successfully')
    }

    groupStageStartTime = () => {
        var startDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
        startDbRef.child('groupStageStartTime').once('value', dataSnapshot => {
            this.setState({ theTime: dataSnapshot.val() })
            //console.log('flocksDataRef the start', dataSnapshot.val(),this.state.theEventKey)
        })
    }

    getWorldCupMatches = (userId) => {
        var groupAArr = [], groupBArr = [], groupCArr = [], groupDArr = [], groupEArr = [], groupFArr = [], groupGArr = [], groupHArr = [], groupIArr = [], groupJArr = [], groupKArr = [], groupLArr = [], allMatches = []
        this.setState({ eastRound1Arr: [], eastRound2Arr: [], eastroundOf16Arr: [], eastquarterFinalsArr: [], dataAvailable: false, currentEventUserInfo: {} })
        var matchesRef = firebase.database().ref('/theEvents/WorldCup/').child(this.state.theEventKey + '/' + 'groupStage/')
        matchesRef.once('value', dataSnapshot => {
            if (!dataSnapshot.exists()) { this.setState({ groupStagePopulated: false }) }
            else {
                if (userId) { this.checkLink(userId); this.groupStageStartTime() }
                this.checkGameEventChosen()
                var theCount = dataSnapshot.numChildren()
                this.setState({ groupStagePopulated: true })
                //if(theCount>=48){this.setState({ groupStagePopulated: true })}
                //if(theCount<48)return;
                var i = 0
                dataSnapshot.forEach((data) => {
                    i++
                    var group = data.val().group
                    if (group === 'Group A') { groupAArr.push(data.val()) }
                    if (group === 'Group B') { groupBArr.push(data.val()) }
                    if (group === 'Group C') { groupCArr.push(data.val()) }
                    if (group === 'Group D') { groupDArr.push(data.val()) }
                    if (group === 'Group E') { groupEArr.push(data.val()) }
                    if (group === 'Group F') { groupFArr.push(data.val()) }
                    if (group === 'Group G') { groupGArr.push(data.val()) }
                    if (group === 'Group H') { groupHArr.push(data.val()) }
                    if (group === 'Group I') { groupIArr.push(data.val()) }
                    if (group === 'Group J') { groupJArr.push(data.val()) }
                    if (group === 'Group K') { groupKArr.push(data.val()) }
                    if (group === 'Group L') { groupLArr.push(data.val()) }
                    //allMatches.push(data.val())
                    if (theCount === i) {
                        //var combinedArr = [round1EastArr, round1WestArr, round1SouthArr, round1midWestArr]
                        // allMatches = Array.prototype.concat(...combinedArr);
                        //allMatches=[...round1EastArr]
                        console.log('allMatches 55555555', groupAArr)
                        this.setState({ groupAArr, groupBArr, groupCArr, groupDArr, groupEArr, groupFArr, groupGArr, groupHArr, groupIArr, groupJArr, groupKArr, groupLArr })
                        this.getWorldCupMatches2()
                        this.getWorldCupMatchesFinal(userId)
                    }
                })
            }
        })

    }
    getWorldCupMatches2 = () => {
        var roundOf32Arr = []
        this.setState({ eastRound1Arr: [], eastRound2Arr: [], eastroundOf16Arr: [], eastquarterFinalsArr: [], dataAvailable: false, currentEventUserInfo: {} })
        var matchesRef = firebase.database().ref('/theEvents/WorldCup/').child(this.state.theEventKey + '/' + 'roundOf32/')
        matchesRef.once('value', dataSnapshot => {
            var theCount = dataSnapshot.numChildren()
            var i = 0
            dataSnapshot.forEach((data) => {
                i++
                roundOf32Arr.push(data.val())
                if (theCount === i) {
                    //console.log('allMatches round 2', allMatches)
                    this.setState({ roundOf32Arr })
                }
            })
        })
    }
    getWorldCupMatchesFinal = (userId) => {
        var roundOf16Arr = [], quarterFinalsArr = [], semiFinalsArr = [], finalArr = [], allMatches = []
        this.setState({ southRound1Arr: [], southRound2Arr: [], southroundOf16Arr: [], southquarterFinalsArr: [], dataAvailable: false, currentEventUserInfo: {} })
        var matchesRef = firebase.database().ref('/theEvents/WorldCup/').child(this.state.theEventKey + '/' + 'final/')
        matchesRef.once('value', dataSnapshot => {
            var roundOf16Count = dataSnapshot.child('roundOf16').numChildren()
            var quarterFinalsCount = dataSnapshot.child('quarterFinals').numChildren()
            var semiFinalsCount = dataSnapshot.child('semiFinals').numChildren()
            var finalCount = dataSnapshot.child('finalRound').numChildren()
            var theInfo = dataSnapshot.val()
            var roundOf16 = theInfo.roundOf16
            var quarterFinals = theInfo.quarterFinals
            var semiFinals = theInfo.semiFinals
            var finalRound = theInfo.finalRound
            var i = 0, g = 0, h = 0, j = 0, k = 0, l = 0, m = 0
            for (var key in roundOf16) {
                i++
                var theData = roundOf16[key]
                roundOf16Arr.push(theData)
                allMatches.push(theData)
                if (roundOf16Count === i) {
                    this.setState({ roundOf16Arr: roundOf16Arr })
                    //console.log('roundOf16Arr', roundOf16Arr)
                }
            }
            for (var key in quarterFinals) {
                g++
                var theData = quarterFinals[key]
                quarterFinalsArr.push(theData)
                allMatches.push(theData)
                if (quarterFinalsCount === g) {
                    this.setState({ quarterFinalsArr: quarterFinalsArr })
                    //console.log('round2Arr', quarterFinalsArr)
                }
            }
            for (var key in semiFinals) {
                h++
                var theData = semiFinals[key]
                semiFinalsArr.push(theData)
                allMatches.push(theData)
                if (semiFinalsCount === h) {
                    this.setState({ semiFinalsArr: semiFinalsArr })
                    //console.log('quarterFinalsArr', quarterFinalsArr)
                }
            }
            for (var key in finalRound) {
                j++
                var theData = finalRound[key]
                finalArr.push(theData)
                allMatches.push(theData)
                if (finalCount === j) {
                    this.setState({ finalArr: finalArr, allRoundFinalArr: allMatches })
                    //console.log('finalArr 001000', finalArr)
                    if (this.state.currentRound === 'finalRound') {
                        this.setState({ currentItems: roundOf16Arr })
                    }
                    // this.getMatchesInfo()
                    this.getTheMatchesInfo()
                    this.getUserDetails()
                    this.getMatchesInfo(userId)

                }
            }

        })
    }

    getMatchesInfo = async (userId) => {
        console.log('userId', userId)
        var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/WorldCup/" + this.state.theEventKey + '/')
        var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
        var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/WorldCup/" + this.state.theEventKey + '/details/')
        var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/WorldCup/" + this.state.theEventKey + '/bets/')
        var gamesDataRef = firebase.database().ref('users/').child(userId + '/ramData/').child('/events/WorldCup/')
        var currentEventUserInfo = '', finalRoundScore = 0
        await selectedMatchesKeyDb.once('value', dataSnapshot => {
            //console.log('the key',dataSnapshot.val())
            if (!dataSnapshot.val()) return
            photoRefDb.once('value', dataSnapshot => {
                //console.log('proofile photo',dataSnapshot.val())
                if (dataSnapshot.val()) {
                    this.setState({ profilePhoto: dataSnapshot.val() })
                }
            })
            userInfoDb.once('value', dataSnapshot => {
                if (!dataSnapshot.val()) return
                //console.log('the type user 0000000000000', dataSnapshot.val())
                if (dataSnapshot.val()) {
                    var theInfo = dataSnapshot.val()
                    currentEventUserInfo = dataSnapshot.val()
                    finalRoundScore = Number(theInfo.roundOf16Score) + Number(theInfo.quarterFinalsScore) + Number(theInfo.semiFinalsScore) + Number(theInfo.finalsScore)
                    this.setState({ currentEventUserInfo: theInfo, finalRoundScore, dataAvailable: true })
                }
            })
            userBetsDb.once('value', dataSnapshot => {
                var theData = dataSnapshot.val()
                var round1Arr = [], roundOf32Arr = [], finalRoundArr = [], roundOf16Arr = [], quarterFinalsArr = [], semiFinalsArr = [], finalArr = []
                var round2Count = dataSnapshot.child('round2').numChildren()
                var roundOf16Count = dataSnapshot.child('roundOf16').numChildren()
                var quarterFinalsCount = dataSnapshot.child('quarterFinals').numChildren()
                var semiFinalsCount = dataSnapshot.child('semiFinals').numChildren()
                var finalRoundCount = dataSnapshot.child('finalRound').numChildren()
                var round2Exists = dataSnapshot.child('round2').exists()
                // 
                if (round2Exists) {
                    var i = 0
                    roundOf32Arr = theData.round2
                    //console.log('round 14 item',round2Count,roundOf32Arr)
                    for (var key in roundOf32Arr) {
                        i++
                        var theId = key
                        var betPlayer = roundOf32Arr[key]
                        this.state.roundOf32Arr.map((item2, index) => {
                            if (item2.id === theId) {
                                item2['bet'] = betPlayer
                            }
                        })
                        if (round2Count === i) {
                            this.setState({ roundOf32Arr: this.state.roundOf32Arr })
                            //console.log('round 19 item',this.state.roundOf32Arr,this.state.round2EastArr)
                        }
                    }
                }
                var roundOf16Exists = dataSnapshot.child('roundOf16').exists()
                if (roundOf16Exists) {
                    var i = 0
                    roundOf16Arr = theData.roundOf16
                    //console.log('round 14 item',round2Count,round2Arr)
                    for (var key in roundOf16Arr) {
                        i++
                        var theId = key
                        var betPlayer = roundOf16Arr[key]
                        this.state.roundOf16Arr.map((item2, index) => {
                            if (item2.id === theId) {
                                item2['bet'] = betPlayer
                            }
                        })
                        if (roundOf16Count === i) {
                            this.setState({ roundOf16Arr: this.state.roundOf16Arr })
                            //console.log('roundOf16Count ', this.state.roundOf16Arr)
                        }
                    }
                }
                // roundOf32Arr roundOf16Arr quarterFinalsArr semiFinalsArr finalArr
                var quarterFinalsExists = dataSnapshot.child('quarterFinals').exists()
                if (quarterFinalsExists) {
                    var i = 0
                    quarterFinalsArr = theData.quarterFinals
                    //console.log('round 14 item',round2Count,round2Arr)
                    for (var key in quarterFinalsArr) {
                        i++
                        var theId = key
                        var betPlayer = quarterFinalsArr[key]
                        this.state.quarterFinalsArr.map((item2, index) => {
                            if (item2.id === theId) {
                                item2['bet'] = betPlayer
                            }
                        })
                        if (quarterFinalsCount === i) {
                            this.setState({ quarterFinalsArr: this.state.quarterFinalsArr })
                            //console.log('quarterFinalsArr ', this.state.quarterFinalsArr)
                        }
                    }
                } else {
                    //console.log('elite 8 not existing')
                }
                var semiFinalsExists = dataSnapshot.child('semiFinals').exists()
                if (semiFinalsExists) {
                    var i = 0
                    semiFinalsArr = theData.final4
                    //console.log('round 14 item',round2Count,round2Arr)
                    for (var key in semiFinalsArr) {
                        i++
                        var theId = key
                        var betPlayer = semiFinalsArr[key]
                        this.state.semiFinalsArr.map((item2, index) => {
                            if (item2.id === theId) {
                                item2['bet'] = betPlayer
                            }
                        })
                        if (semiFinalsCount === i) {
                            this.setState({ semiFinalsArr: this.state.semiFinalsArr })
                            //console.log('semiFinalsArr ', this.state.semiFinalsArr)
                        }
                    }
                }

                var finalRoundExists = dataSnapshot.child('finalRound').exists()
                if (finalRoundExists) {
                    var i = 0
                    finalArr = theData.finalRound
                    //console.log('round 14 item',round2Count,round2Arr)
                    for (var key in finalArr) {
                        i++
                        var theId = key
                        var betPlayer = finalArr[key]
                        this.state.finalArr.map((item2, index) => {
                            if (item2.id === theId) {
                                item2['bet'] = betPlayer
                            }
                        })
                        if (semiFinalsCount === i) {
                            this.setState({ finalArr: this.state.finalArr })
                            //console.log('finalRoundArr ', this.state.finalArr)
                        }
                    }
                }
            })

        })
    }

    getTheMatchesInfo = async () => {
        var userBetsDb = firebase.database().ref('/users/').child(this.state.userId).child("/ramData/events/WorldCup/" + this.state.theEventKey + '/bets/')
        userBetsDb.once('value', dataSnapshot => {
            var theData = dataSnapshot.val()
            var round1Arr = [], round2Arr = [], finalRoundArr = [], roundOf16Arr = [], quarterFinalsArr = [], semiFinalsArr = []
            var round1Exists = dataSnapshot.child('round1').exists()
            if (round1Exists) {
                var i = 0
                round1Arr = theData.round1
                this.combineMatchesInfo(round1Arr, 'groupAArr', this.state.groupAArr)
                this.combineMatchesInfo(round1Arr, 'groupBArr', this.state.groupBArr)
                this.combineMatchesInfo(round1Arr, 'groupCArr', this.state.groupCArr)
                this.combineMatchesInfo(round1Arr, 'groupDArr', this.state.groupDArr)
                this.combineMatchesInfo(round1Arr, 'groupEArr', this.state.groupEArr)
                this.combineMatchesInfo(round1Arr, 'groupFArr', this.state.groupFArr)
                this.combineMatchesInfo(round1Arr, 'groupGArr', this.state.groupGArr)
                this.combineMatchesInfo(round1Arr, 'groupHArr', this.state.groupHArr)
                this.combineMatchesInfo(round1Arr, 'groupIArr', this.state.groupIArr)
                this.combineMatchesInfo(round1Arr, 'groupJArr', this.state.groupJArr)
                this.combineMatchesInfo(round1Arr, 'groupKArr', this.state.groupKArr)
                this.combineMatchesInfo(round1Arr, 'groupLArr', this.state.groupLArr)


            }
        })
    }
    combineMatchesInfo = async (roundArr, groupName, groupArr) => {
        const updatedGroupAArr = groupArr.map(team => {
            if (roundArr.hasOwnProperty(team.id)) { return { ...team, bet: true }; }
            const { bet, ...rest } = team; return rest;
        });
        this.setState({ [groupName]: updatedGroupAArr })
    }
    inputChange = async (e) => {
        var value = e.target.value
        await this.setState({ [e.target.id]: value })
        if (this.state.groupStage.length >= 3) { this.setState({ groupStageErr: '' }) }
        if (this.state.roundOf32.length >= 3) { this.setState({ round32Err: '' }) }
        if (this.state.roundOf16.length >= 3) { this.setState({ roundOf16Err: '' }) }
        if (this.state.quarterFinals.length >= 3) { this.setState({ quarterFinalsErr: '' }) }
        if (this.state.semiFinals.length >= 3) { this.setState({ semiFinalsErr: '' }) }
        if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) }
    }
    teamsInputChange = async (e) => {
        var value = e.target.value
        //console.log('theGroupArr',this.state[theGroupArr])
        // ramOddsMap=new Map([RamOdds])
        var theValue = RamOdds[value]
        var theOdds = '', oddsInput = false
        if (e.target.id === 'team1Points') { theOdds = 'team1Odds', oddsInput = true }
        if (e.target.id === 'team2Points') { theOdds = 'team2Odds', oddsInput = true }
        if (e.target.id === 'team3Points') { theOdds = 'team3Odds', oddsInput = true }
        if (e.target.id === 'team4Points') { theOdds = 'team4Odds', oddsInput = true }
        console.log('theValue', theValue)

        //if(value>100)
        if (oddsInput) {
            if (value < -10000) { theValue = 1.01 }
            if (value > 12620) { theValue = 1247.20 }
            if (value <= 101 && value >= -101) { theValue = 2.03 }
        }
        await this.setState({ [e.target.id]: value })
        if (oddsInput) {
            this.setState({ [theOdds]: theValue })
        }
        //else{this.setState({ [e.target.id]: value})}
    }
    saveTeams = async (group) => {
        var idPart1 = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var generalDb = firebase.database().ref('/theEvents/WorldCup/' + this.state.theEventKey)
        var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/groupStagePopulated/')
        var editDbRef2 = firebase.database().ref('/theEvents/WorldCup/eventsIds/' + this.state.theEventKey + '/groupStagePopulated/')
        var itemArr = [], team1Item = {}, team2Item = {}, team3Item = {}, team4Item = {}
        const updates = {}
        if (this.state.team1Name.length < 3 || this.state.team2Name.length < 3 || this.state.team3Name.length < 3 || this.state.team4Name.length < 3 ||
            this.state.team1Flag.length < 3 || this.state.team2Flag.length < 3 || this.state.team3Flag.length < 3 || this.state.team4Flag.length < 3 ||
            this.state.team1Points.length < 1 || this.state.team2Points.length < 1 || this.state.team3Points.length < 1 || this.state.team4Points.length < 1) { this.notify('All fields must be filled') }
        else {
            var id1 = idPart1 + 'Team1', id2 = idPart1 + 'Team2', id3 = idPart1 + 'Team3', id4 = idPart1 + 'Team4'
            updates[id1] = { id: id1, teamName: this.state.team1Name, points: this.state.team1Points, odds: this.state.team1Odds, teamFlag: this.state.team1Flag, outCome: 'N/A', group: group };
            updates[id2] = { id: id2, teamName: this.state.team2Name, points: this.state.team2Points, odds: this.state.team2Odds, teamFlag: this.state.team2Flag, outCome: 'N/A', group: group };
            updates[id3] = { id: id3, teamName: this.state.team3Name, points: this.state.team3Points, odds: this.state.team3Odds, teamFlag: this.state.team3Flag, outCome: 'N/A', group: group };
            updates[id4] = { id: id4, teamName: this.state.team4Name, points: this.state.team4Points, odds: this.state.team4Odds, teamFlag: this.state.team4Flag, outCome: 'N/A', group: group };


            console.log('the iteeeeeeeeeeeeeeeeem', updates)
            generalDb.child('groupStage').update(updates, (error) => {
                if (!error) {
                    editDbRef.set(true)
                    editDbRef2.set(true)
                    this.setState({ team1Name: '', team1Points: '', team1Flag: '', team2Name: '', team2Points: '', team2Flag: '', team3Name: '', team3Points: '', team3Flag: '', team4Name: '', team4Points: '', team4Flag: '', openEnterTeamsModal: false })
                    this.notify('Teams updated successfully')
                    this.getWorldCupMatches()
                } else { this.notify('An error occured while updating. Try again later') }
            })

        }
    }
    checkExistence = () => {
        var theYear = new Date(this.state.groupStage).getFullYear()
        if (theYear < new Date().getFullYear()) { this.notify("Event can only be created for the future"); return }
        var eventKey = 'WorldCup' + theYear
        var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/')
        timeInfoDb.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                this.notify('That Years Event Already Exists')
            } else {
                this.createEvent(eventKey, theYear)
            }

        })
    }
    createEvent = (eventKey, theYear) => {
        var groupStageArr = {}, roundOf32Arr = {}, roundOf16Arr = {}, quarterFinalsArr = {}, semiFinalsArr = {}, finalArr = {}
        var eventTitle = 'World Cup ' + theYear
        var generalDb = firebase.database().ref('/theEvents/WorldCup/' + eventKey)
        if (this.state.groupStage.length >= 3) { this.setState({ groupStageErr: '' }) } else { this.setState({ groupStageErr: 'Date must be filled' }) }
        if (this.state.roundOf32.length >= 3) { this.setState({ round32Err: '' }) } else { this.setState({ round32Err: 'Date must be filled' }) }
        if (this.state.roundOf16.length >= 3) { this.setState({ roundOf16Err: '' }) } else { this.setState({ roundOf16Err: 'Date must be filled' }) }
        if (this.state.quarterFinals.length >= 3) { this.setState({ quarterFinalsErr: '' }) } else { this.setState({ quarterFinalsErr: 'Date must be filled' }) }
        if (this.state.semiFinals.length >= 3) { this.setState({ semiFinalsErr: '' }) } else { this.setState({ semiFinalsErr: 'Date must be filled' }) }
        if (this.state.final.length >= 3) { this.setState({ finalErr: '' }) } else { this.setState({ finalErr: 'Date must be filled' }) }
        if (this.state.groupStage.length < 1 || this.state.roundOf32.length < 1 || this.state.roundOf16.length < 1 ||
            this.state.quarterFinals.length < 1 || this.state.semiFinals.length < 1 || this.state.final.length < 1
        ) {
            this.notify('All fields must be filled')
        } else {
            roundOf32.map((item, index) => {
                roundOf32[index]['timeInMillis'] = new Date(this.state.roundOf32).getTime()
                roundOf32[index]['commenceTime'] = this.state.roundOf32
                roundOf32[index]['time'] = this.state.roundOf32

                roundOf32Arr[item.id] = item
                if (roundOf32.length === index + 1) {
                    generalDb.child('/roundOf32/').update(roundOf32Arr)
                }
            })
            roundOf16.map((item, index) => {
                roundOf16[index]['timeInMillis'] = new Date(this.state.roundOf16).getTime()
                roundOf16[index]['commenceTime'] = this.state.roundOf16
                roundOf16[index]['time'] = this.state.roundOf16

                roundOf16Arr[item.id] = item
                if (roundOf16.length === index + 1) {
                    generalDb.child('/final/roundOf16/').update(roundOf16Arr)
                }
            })

            quarterFinals.map((item, index) => {
                quarterFinals[index]['timeInMillis'] = new Date(this.state.quarterFinals).getTime()
                quarterFinals[index]['commenceTime'] = this.state.quarterFinals
                quarterFinals[index]['time'] = this.state.quarterFinals

                quarterFinalsArr[item.id] = item
                if (quarterFinals.length === index + 1) {
                    generalDb.child('/final/quarterFinals/').update(quarterFinalsArr)
                }
            })

            semiFinals.map((item, index) => {
                semiFinals[index]['timeInMillis'] = new Date(this.state.semiFinals).getTime()
                semiFinals[index]['commenceTime'] = this.state.semiFinals
                semiFinals[index]['time'] = this.state.semiFinals

                semiFinalsArr[item.id] = item
                if (semiFinals.length === index + 1) {
                    generalDb.child('/final/semiFinals/').update(semiFinalsArr)
                }
            })

            final.map((item, index) => {
                final[index]['timeInMillis'] = new Date(this.state.final).getTime()
                final[index]['commenceTime'] = this.state.final

                final[index]['time'] = this.state.final
                finalArr[item.id] = item
                if (final.length === index + 1) {
                    generalDb.child('/final/finalRound/').update(finalArr, (error) => {
                        if (error) {
                            this.notify('An error occured while creating event, try again')
                        } else {
                            var toTheEventsIds = {
                                time: new Date(this.state.groupStage).getTime(), title: eventTitle, sportType: 'WorldCup', endTime: new Date(this.state.final).getTime(), getEventsTimeUpdate: new Date().getTime(),
                                stopRound1Edit: 'N/A', stopRound2Edit: 'N/A', stopRoundOf16Edit: 'N/A', stopQuarterFinalsEdit: 'N/A', stopSemiFinalsEdit: 'N/A', stopFinalEdit: 'N/A', currentSelection: 'groupStage', year: theYear, groupStagePopulated: false
                            }
                            var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/groupStagePopulated/')
                            var editDbRef2 = firebase.database().ref('/theEvents/WorldCup/eventsIds/' + eventKey + '/groupStagePopulated/')

                            var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + eventKey + '/')
                            var editDbRef2 = firebase.database().ref('/theEvents/WorldCup/eventsIds/' + eventKey + '/')
                            editDbRef.set(toTheEventsIds)
                            editDbRef2.set(toTheEventsIds)
                            this.notify('Event created successfully')
                            this.setState({ showCreateEventModal: false, theEventKey: eventKey })
                        }
                    })
                }
            })

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
    doNothing = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    getCurrentRound = (round) => {
        this.setState({ currentRound: round })
        if (round === 'round2') {
            this.setState({ currentItems: this.state.roundOf32Arr, theSubMenu: 'round2' })
        }
        return
        if (round === 'finalRound') {
            this.setState({ currentItems: this.state.roundOf16Arr, theSubMenu: 'finalRound', theMenu: 'roundOf16' })
        }

    }
    selectEvent = (theMenu) => {
        this.setState({ theMenu })
    }
    selectedItems = (id, name, points, group) => {
        // this.notify('Slection not available at the moment');
        //return
        const chosenTeamsCount = Object.keys(chosenTeams ?? {}).length
        if (chosenTeamsCount >= 32) { this.notify('You can only choose upto 32 teams'); return }
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var groupArrName = theGroup + 'Arr', theItem = {}
        var groupArr = this.state[groupArrName]
        console.log('groupArr', id, name, groupArr)
        //  return
        var betMap = (groupArr ?? [])
            .filter(item => item.bet === true)
            .reduce((acc, item) => {

                acc[item.id] = item.teamName;
                return acc;
            }, {});

        console.log('betMap 1', betMap, 'chosenTeams', chosenTeams)
        const totalBets = Object.keys(betMap ?? {}).length;
        if (totalBets > 2) { this.notify('You can only choose upto 3 teams'); return }
        else {
            betMap[id] = name
            chosenTeams = { ...chosenTeams, ...betMap };
        }
        const updatedItems = groupArr.map(team => {
            if (team.id === id) {
                return { ...team, bet: true }; // Add/Update the bet field
            }
            return team; // Leave others as they are
        });

        this.setState((prevState) => {
            const currentChosenTeams = prevState.chosenTeams ?? {};

            // 2. Combine the old dictionary items with your new betMap updates
            const updatedChosenTeams = {
                ...currentChosenTeams,
                ...betMap
            };

            // 3. Return the newly merged state object
            return {
                [groupArrName]: updatedItems,
                chosenTeams: updatedChosenTeams
            };
        });
        // console.log('it is 001', chosenTeams)
        // console.log('it is', updatedItems, groupArr, chosenTeams, id, name, points, group, betMap)//groupBArr
    }
    deselectItems = (id, name, points, group) => {
        // this.notify('Slection not available at the moment');
        // return
        const idToRemove = id
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var groupArrName = theGroup + 'Arr'
        var groupArr = this.state[groupArrName]
        // chosenTeams = chosenTeams.filter(id => id !== idToRemove);
        var betMap = (groupArr ?? [])
            .filter(item => item.bet === true)
            .reduce((acc, item) => {
                acc[item.id] = item.teamName;
                return acc;
            }, {});
        delete betMap[idToRemove];
        delete chosenTeams[idToRemove];
        delete teamsChosenOdds[idToRemove];
        //teamsChosenOdds = {...teamsChosenOdds,...betOdds};
        //chosenTeams = {...chosenTeams,...betMap};
        console.log('betMap 2', betMap, 'chosenTeams', chosenTeams)

        const updatedItems = groupArr.map(team => {
            if (team.id === id) {
                // This extracts 'bet' out and puts everything else into 'rest'
                const { bet, ...rest } = team;
                return rest;
            }
            return team;
        });
        this.setState({ [groupArrName]: updatedItems, chosenTeams })
        console.log('chosenTeams', id, chosenTeams, updatedItems)
    }
    openConfirmationModal = (outcome, teamName, items, id) => {
        if (outcome) { this.notify('Team outcome already filled') }
        else {
            var theMessage = 'Choose one of the options below for selected team to continue'
            this.setState({ showConfirmModal: true, confirmTeam: teamName, confirmMessage: theMessage, selectedId: id })
        }

    }
    openTheModal2 = (itemToModals, stopEdit) => {
        var timeInfoDb = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/' + stopEdit)
        console.log('stopEdit',stopEdit)
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
    openTheModal = () => {
        var pickEvent = false
        var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
        editDbRef.child('currentPick').once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                this.setState({ theGameEvent: dataSnapshot.val() })
                var theGameEvent = dataSnapshot.val()
                if (this.state.currentRound === 'round1' && theGameEvent === 'Group Stage') { pickEvent = true }
                if (this.state.currentRound === 'round2' && theGameEvent === 'Round of 32') { pickEvent = true }
                if (this.state.theMenu === 'roundOf16' && theGameEvent === 'Round of 16') { pickEvent = true }
                if (this.state.theMenu === 'quarterFinals' && theGameEvent === 'Quarter Finals') { pickEvent = true }
                if (this.state.theMenu === 'semiFinals' && theGameEvent === 'Semi Finals') { pickEvent = true }
                if (this.state.theMenu === 'final' && theGameEvent === 'Finals') { pickEvent = true }
                if (this.state.currentRound === 'round1' && pickEvent === true) { this.setState({ enterTeamNameInfoModal: true }) }
            } else {
                this.notify('Selection not available at the moment')
            }
        })
    }

    teamFlockNameCheck = () => {
        if (!this.state.userId) return
        const count = Object.keys(chosenTeams ?? {}).length
        if (this.state.teamName.length < 3) { this.setState({ teamNameErr: 'Ram name must be 3 characters and above' }); this.notify('Ram name must be 3 characters and above'); return }
        this.setState({ teamNameErr: '' })
        if (count < 32) { this.notify('A total of 32 teams must be chosen'); return }
        const totalOddsSum = Object.values(teamsChosenOdds ?? {})
            .reduce((acc, currentVal) => {
                // Convert string value to a decimal number, falling back to 0 if empty/malformed
                const parsedValue = parseFloat(currentVal) || 0;
                return acc + parsedValue;
            }, 0);
        var theTeamName = this.state.teamName.replace(/ /g, "_")
        var flockTeamName = this.props.flockTeamName?.split('::')
        var uniqueRamNamesRef = firebase.database().ref('/theNames/ramNames/').child('WorldCup/' + this.state.theEventKey + '/')
        uniqueRamNamesRef.child(theTeamName).once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                var theId = dataSnapshot.val()
                var theName = dataSnapshot.key
                if (theId === this.state.userId) {
                    uniqueRamNamesRef.child(theName).set(null)
                    this.saveTeamNameInfo(theTeamName, uniqueRamNamesRef, totalOddsSum)
                } else {
                    this.notify('RAM Name already taken')
                    this.setState({ teamNameErr: 'RAM Name already taken, please try another one' })
                }
            } else {
                this.saveTeamNameInfo(theTeamName, uniqueRamNamesRef, totalOddsSum)
            }
        })
    }
    saveTeamNameInfo = (theTeamName, uniqueRamNamesRef, totalOddsSum) => {

        var gamesDataRef = firebase.database().ref('users/').child(this.state.userId + '/ramData/events/WorldCup/' + this.state.theEventKey + '/')
        var ramsBets = firebase.database().ref('userBets/WorldCup/')
        var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/' + this.state.theEventKey)
        var adminRef = firebase.database().ref('/flocksSystem/flockNames/' + this.state.theEventKey + '/admin')
        var keysDbRef = firebase.database().ref('users/').child(this.state.userId + '/ramData/').child('upcomingEvents/WorldCup/')
        /*  gamesDataRef.child('details').once('value',dataSnapshot=>{
              if(dataSnapshot.exists()){
  
              }else{
  
              }
          })*/

        const formattedSum = totalOddsSum.toFixed(2);
        var itemsData = {}, theSelection = this.state.currentRound
        var dataScore = theSelection + 'Score'
        var thePick = theSelection + 'Pick'
        var bps2 = theSelection + 'BPS'
        var detailsData = {
            teamName: this.state.teamName,
            flockName: this.state.ramFlockName,
            created: new Date().getTime(),
            bestPossibleScore: formattedSum,
            currentScore: '0.00',
            round1Score: '0',
            round2Score: '0',
            finalRoundScore: '0',
            roundOf16BPS: '0',
            roundOf16Score: '0',
            quarterFinalsBPS: '0',
            quarterFinalsScore: '0',
            semiFinalBPS: '0',
            semiFinalScore: '0',
            currentRank: false,
            currentPick: 'round1',
            round1Rank: false,
            round2Rank: false,
            finalRoundRank: false,
            round1BPS: formattedSum,
            round2BPS: '0',
            finalsBPS: '0',
            finalsScore: '0',
            round1Picked: true,
            round2Picked: false,
            finalRoundPicked: false
        }
        var scoreData = {
            BPS: formattedSum, score: 0,
            round1Score: '0', round2Score: '0', finalsScore: '0',
            roundOf16Score: '0', quarterFinalsScore: '0', semiFinalScore: '0',
            currentPick: theSelection, theMenu: 'round1',
            ramName: this.state.teamName, picked: true, [thePick]: true,
            [bps2]: formattedSum
        }
        // console.log('formattedSum', formattedSum)
        // console.log('chosenTeams', chosenTeams)
        console.log('detailsData', theTeamName, uniqueRamNamesRef)
        // return
        var toAdmin = this.state.teamName + '!!' + this.state.ramFlockName + '!!' + this.state.myEmail + '!!' + this.state.myPhoneNo
        if (this.state.ramFlockName !== 'Flockless') {
            membersFlockNamesRef.child('/members/' + this.state.flockNameNoSpace).child(this.state.userId).set(this.state.teamName)
            adminRef.child(this.state.userId).set(toAdmin)
            membersFlockNamesRef.child('/membersScores/' + this.state.flockNameNoSpace).child(this.state.userId).update(scoreData)
        }
        keysDbRef.child(this.state.theEventKey).set(true)
        uniqueRamNamesRef.child(theTeamName).set(this.state.userId)
        gamesDataRef.child('/bets/round1/').set(chosenTeams)
        ramsBets.child(this.state.theEventKey + '/').child(this.state.userId + '/round1/').set(chosenTeams)
        gamesDataRef.child('details').set(detailsData, (error) => {
            if (error) {
                //console.log('AN ERROR OCCURED WHILE POSTING YOUR PICKS TO FIREBASE')
            } else {
                //console.log('Your picks have been submitted successfully') 
                this.notify('Your picks have been submitted successfully')
                this.setState({ enterTeamNameInfoModal: false })
            }
        })

    }
    pickWinner = (id, winner, time) => {
       /* var theGameEvent=this.state.theGameEvent,currentRound='',theMenu=''
        if (theGameEvent === 'Round of 32') {this.setState({currentRound:'round2',theMenu:''});currentRound='round2',theMenu=''}
        if (theGameEvent === 'Round of 16') {this.setState({currentRound:'finalRound',theMenu:'roundOf16'});currentRound='finalRound',theMenu='roundOf16'}
        if (theGameEvent === 'Quarter Finals') {this.setState({currentRound:'finalRound',theMenu:'quarterFinals'});currentRound='finalRound',theMenu='quarterFinals'}
        if (theGameEvent === 'Semi Finals') {this.setState({currentRound:'finalRound',theMenu:'semiFinals'});currentRound='finalRound',theMenu='semiFinals'}
        if (theGameEvent === 'Finals') {this.setState({currentRound:'finalRound',theMenu:'final'});currentRound='finalRound',theMenu='final'}
                console.log('this.state.theMenu 004',theGameEvent,this.state.currentRound,this.state.theMenu)*/
       // return
     
        var nowTime = new Date().getTime()
        console.log('this.currentRound', this.state.currentRound)
        if (this.state.currentRound === 'round2') {
            console.log('this.currentRound', this.state.currentRound, time, nowTime)
            var index2 = this.state.roundOf32Arr.map(function (x) { return x.id; }).indexOf(id);
            var nowTime = new Date().getTime()
            var theItems = this.state.roundOf32Arr

            if (nowTime < time) {
                this.notify('Match not yet started')
                return
            }
             /*if (winner !== 'N/A') {
               this.notify('Winner already filled')
               return
             }*/
            var theItems = this.state.roundOf32Arr
            theItems[index2]['showChooseWinner'] = true
            this.setState({ roundOf32Arr: theItems })
        }
        if (this.state.currentRound === 'finalRound') {
            if (this.state.theMenu === 'roundOf16') {
                //console.log('this.currentRound', this.state.currentRound, time, nowTime)
                var index2 = this.state.roundOf16Arr.map(function (x) { return x.id; }).indexOf(id);
                var nowTime = new Date().getTime()
                var theItems = this.state.roundOf16Arr

                if (nowTime < time) {
                    this.notify('Match not yet started')
                    return
                }
               /* if (winner !== 'N/A') {
                  this.notify('Winner already filled')
                  return
                }*/

                var theItems = this.state.roundOf16Arr
                theItems[index2]['showChooseWinner'] = true
                this.setState({ roundOf16Arr: theItems })
                //console.log('theItems', theItems)
            }
            if (this.state.theMenu === 'quarterFinals') {
                //console.log('this.currentRound', this.state.currentRound, time, nowTime)
                var index2 = this.state.quarterFinalsArr.map(function (x) { return x.id; }).indexOf(id);
                var nowTime = new Date().getTime()
                var theItems = this.state.quarterFinalsArr

                if (nowTime < time) {
                    this.notify('Match not yet started')
                    return
                }
                 /*if (winner !== 'N/A') {
                   this.notify('Winner already filled')
                   return
                 }*/

                var theItems = this.state.quarterFinalsArr
                theItems[index2]['showChooseWinner'] = true
                this.setState({ quarterFinalsArr: theItems })
                //console.log('theItems', theItems)
            }
            if (this.state.theMenu === 'semiFinals') {
                //console.log('this.currentRound', this.state.currentRound, time, nowTime)
                var index2 = this.state.semiFinalsArr.map(function (x) { return x.id; }).indexOf(id);
                var nowTime = new Date().getTime()
                var theItems = this.state.semiFinalsArr

                if (nowTime < time) {
                    this.notify('Match not yet started')
                    return
                }
               /* if (winner !== 'N/A') {
                   this.notify('Winner already filled')
                   return
                 }*/

                var theItems = this.state.semiFinalsArr
                theItems[index2]['showChooseWinner'] = true
                this.setState({ semiFinalsArr: theItems })
                //console.log('iteeeems semiFinalsArr', theItems)
            }
            if (this.state.theMenu === 'final') {
                //console.log('this.currentRound', this.state.currentRound, time, nowTime)
                var index2 = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
                var nowTime = new Date().getTime()
                var theItems = this.state.finalArr

                if (nowTime < time) {
                    this.notify('Match not yet started')
                    return
                }
                 /*if (winner !== 'N/A') {
                   this.notify('Winner already filled')
                   return
                 }*/
                var theItems = this.state.finalArr
                theItems[index2]['showChooseWinner'] = true
                this.setState({ finalArr: theItems })
                //console.log('iteeeems finalArr', theItems)
            }
        }
    }
    chosenWinner = (id, winner) => {
        if (this.state.currentRound === 'round2') {
            var index2 = this.state.roundOf32Arr.map(function (x) { return x.id; }).indexOf(id);
            var theItems = this.state.roundOf32Arr
            theItems[index2]['chosenWinner'] = winner
            theItems[index2]['status1'] = 'played'
            this.setState({ roundOf32Arr: theItems })
            //console.log('this.state.currentItems 009', theItems)
        }
        if (this.state.currentRound === 'finalRound') {
            if (this.state.theMenu === 'roundOf16') {
                var index2 = this.state.roundOf16Arr.map(function (x) { return x.id; }).indexOf(id);
                var theItems = this.state.roundOf16Arr
                theItems[index2]['chosenWinner'] = winner
                theItems[index2]['status1'] = 'played'
                this.setState({ roundOf16Arr: theItems })
                // console.log('this.state.currentItems 009', theItems)
            }
            if (this.state.theMenu === 'quarterFinals') {
                var index2 = this.state.quarterFinalsArr.map(function (x) { return x.id; }).indexOf(id);
                var theItems = this.state.quarterFinalsArr
                theItems[index2]['chosenWinner'] = winner
                theItems[index2]['status1'] = 'played'
                this.setState({ quarterFinalsArr: theItems })
                //console.log('this.state.currentItems 009', theItems)
            }
            if (this.state.theMenu === 'semiFinals') {
                var index2 = this.state.semiFinalsArr.map(function (x) { return x.id; }).indexOf(id);
                var theItems = this.state.semiFinalsArr
                theItems[index2]['chosenWinner'] = winner
                theItems[index2]['status1'] = 'played'
                this.setState({ semiFinalsArr: theItems })
                //console.log('this.state.currentItems 010', theItems)
            }
            if (this.state.theMenu === 'final') {
                var index2 = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
                var theItems = this.state.finalArr
                theItems[index2]['chosenWinner'] = winner
                theItems[index2]['status1'] = 'played'
                this.setState({ finalArr: theItems })
                //console.log('this.state.currentItems 010', theItems)
            }
        }

    }
    submitWinner = (id, winner) => {
        //console.log('haaaaaaaaaaaapa 000000')
        if (this.state.currentRound === 'round2') {
            var index = this.state.roundOf32Arr.map(function (x) { return x.id; }).indexOf(id);
            if (winner !== 'player1' && winner !== 'player2') {
                this.notify('Nothing to submit')
            } else {
                this.checkForOutcome2(index, winner)
            }
        }
        if (this.state.currentRound === 'finalRound') {
            if (this.state.theMenu === 'roundOf16') {
                var index = this.state.roundOf16Arr.map(function (x) { return x.id; }).indexOf(id);
                if (winner !== 'player1' && winner !== 'player2') {
                    this.notify('Nothing to submit')
                } else {
                    this.checkForOutcome2(index, winner)
                }
            }
            if (this.state.theMenu === 'quarterFinals') {
                var index = this.state.quarterFinalsArr.map(function (x) { return x.id; }).indexOf(id);
                if (winner !== 'player1' && winner !== 'player2') {
                    this.notify('Nothing to submit')
                } else {
                    this.checkForOutcome2(index, winner)
                }
            }
            if (this.state.theMenu === 'semiFinals') {
                var index = this.state.semiFinalsArr.map(function (x) { return x.id; }).indexOf(id);
                if (winner !== 'player1' && winner !== 'player2') {
                    this.notify('Nothing to submit')
                } else {
                    this.checkForOutcome2(index, winner)
                }
            }
            if (this.state.theMenu === 'final') {
                var index = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
                if (winner !== 'player1' && winner !== 'player2') {
                    this.notify('Nothing to submit')
                } else {
                    this.checkForOutcome2(index, winner)
                }
            }
        }
    }
    checkForOutcome2 = async (index, winner) => {
        try {
            //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
            var shortArr = []
            if ((this.state.currentRound === 'round2')) {
                this.checkForOutcome3(index, winner)
            }
            if ((this.state.currentRound === 'finalRound')) {
                if ((this.state.theMenu === 'roundOf16')) {
                    this.checkForFinalRoundOutcome(index, winner, this.state.roundOf16Arr, 'roundOf16Arr')
                }
                if ((this.state.theMenu === 'quarterFinals')) {
                    this.checkForFinalRoundOutcome(index, winner, this.state.quarterFinalsArr, 'quarterFinalsArr')
                }
                if ((this.state.theMenu === 'semiFinals')) {
                    this.checkForFinalRoundOutcome(index, winner, this.state.semiFinalsArr, 'semiFinalsArr')
                }
                if ((this.state.theMenu === 'final')) {
                    this.checkForFinalRoundOutcome(index, winner, this.state.finalArr, 'finalArr')
                }
            }
        } catch (error) {
            //console.log('error',error)
        }

    }


    checkForOutcome3 = async (index, winner) => {
        try {
            //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
            var shortArr = []
            //console.log('haaaaaaaaaaaapa 2222 round 2', index, winner)
            var theRound2Arr = this.state.roundOf32Arr
            theRound2Arr[index]['winner'] = winner
            delete theRound2Arr[index]['chosenWinner']
            delete theRound2Arr[index]['showChooseWinner']
            this.setState({ roundOf32Arr: theRound2Arr })
            this.state.roundOf32Arr.map((item, index) => {
                //console.log('shortArr', shortArr)
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
            if (this.state.theEventKey === '', this.state.currentRound === '', scoreName === '', this.state.roundOf32Arr.length < 1) return
            var scoreName = ''
            if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
            if (this.state.currentRound === 'round2') { scoreName = 'round2Score' }
            let theItems = JSON.stringify(shortArr);
            var theLink = 'theEvents::WorldCup::' + this.state.theEventKey + '::' + this.state.currentRound + '::' + scoreName + '::' + theItems
            if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
            var theQuery = encodeURIComponent(theLink)
            console.log('001', this.state.theEventKey, this.state.currentRound, scoreName, theItems)
            //console.log('theLink', theLink, theItems)
            //console.log('this.state.shortArr 006', shortArr)
            //return
            await axios.get("https://theramtournament.com/getWorldCupResults2?term=" + theQuery)
                //await axios.get("http://localhost:4000/getWorldCupResults2?term="+theQuery)
                .then((res) => {
                    var theOutcome = res.data
                    this.notify(theOutcome)
                    if (theOutcome === 'Success Updating Results') {
                        this.checkAuth()
                    }
                })
        } catch (error) {
            //console.log('error',error)
        }
    }
    checkForFinalRoundOutcome = async (index, winner, items, name) => {
        try {
            //var index = this.state.allRound1MatchesArr.map(function(x) {return x.id; }).indexOf(id);
            var shortArr = []
            //console.log('haaaaaaaaaaaapa', this.state.currentRound, index, winner)
            items[index]['winner'] = winner
            delete items[index]['chosenWinner']
            delete items[index]['showChooseWinner']
            this.setState({ [name]: items })
            items.map((item, index) => {
                //console.log('shortArr', shortArr)
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
            var theSelection = this.state.currentRound
            if (this.state.currentRound === 'finalRound') { theSelection = this.state.theMenu }
            if (this.state.theEventKey === '', theSelection === '', scoreName === '', items.length < 1) return
            var scoreName = ''
            if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
            //if(this.state.currentRound==='sweet16'){scoreName='round1Score'}
            //if(this.state.currentRound==='round2'){scoreName='round2Score'}
            scoreName = theSelection + 'Score'
            let theItems = JSON.stringify(shortArr);
            var theLink = 'theEvents::WorldCup::' + this.state.theEventKey + '::' + theSelection + '::' + scoreName + '::' + theItems
            if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
            var theQuery = encodeURIComponent(theLink)
            console.log('001', this.state.theEventKey, this.state.currentRound, scoreName, theItems)
            //console.log('theLink', theLink, theItems)
            //console.log('this.state.shortArr 006', shortArr)
            //return
            await axios.get("https://theramtournament.com/getWorldCupResults2?term=" + theQuery)
                //await axios.get("http://localhost:4000/getWorldCupResults2?term="+theQuery)
                .then((res) => {
                    var theOutcome = res.data
                    this.notify(theOutcome)
                    if (theOutcome === 'Success Updating Results') {
                        this.checkAuth()
                    }
                })
        } catch (error) {
            //console.log('error',error)
        }
    }
    openEnterTeamsModal = () => {
        this.setState({ openEnterTeamsModal: group, team1Points: '', team2Points: '', team3Points: '', team4Points: '', team1Odds: '0.00', team2Odds: '0.00', team3Odds: '0.00', team4Odds: '0.00', team1Name: '', team2Name: '', teamName: '', team4Name: '', team1Flag: '', team2Flag: '', team3Flag: '', team4Flag: '' })
    }
    checkGameEventChosen = () => {
        if (this.state.theEventKey) {
            var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
            editDbRef.child('currentPick').once('value', dataSnapshot => {
                if (dataSnapshot.exists()) { 
                    this.setState({ theGameEvent: dataSnapshot.val() })
                 }
            })
            editDbRef.child('menuSelection').once('value', dataSnapshot => {
                if (dataSnapshot.exists()) { 
                    this.setState({ menuSelection: dataSnapshot.val() }) 
                }

            })
        }
    }
    chooseGameEvent = (item, menuSelection) => {
        var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey + '/')
        if (menuSelection === 'picks') {
            if (this.state.theGameEvent === item) {
                editDbRef.child('currentPick').set(null)
                this.setState({ theGameEvent: '' })
            } else {
                editDbRef.child('currentPick').set(item, (error) => {
                    if (!error) { this.setState({ theGameEvent: item }) }
                })
            }
        } else {
            editDbRef.child('menuSelection').once('value', dataSnapshot => {
                if (dataSnapshot.exists()) {
                    if (dataSnapshot.val() === item) {
                        editDbRef.child('menuSelection').set(null)
                        this.setState({ menuSelection: '' })
                    } else { editDbRef.child('menuSelection').set(item); this.setState({ menuSelection: item }) }
                } else {
                    editDbRef.child('menuSelection').set(item)
                    this.setState({ menuSelection: item })
                }
            })
        }
    }
    openWorldCupModal = async () => {
        // this.notify('No details to enter at the moment '+this.state.menuSelection)
        var menuSelection = this.state.menuSelection
        var gamesInfo = firebase.database().ref('/theEvents/WorldCup/eventsIds/' + this.state.theEventKey)
        gamesInfo.once('value', dataSnapshot => {
            var stopRound2Edit = dataSnapshot.val().stopRound2Edit
            var stopRoundOf16Edit = dataSnapshot.val().stopRoundOf16Edit
            var stopQuarterFinalsEdit = dataSnapshot.val().stopQuarterFinalsEdit
            var stopSemiFinalsEdit = dataSnapshot.val().stopSemiFinalsEdit
            var stopFinalEdit = dataSnapshot.val().stopFinalEdit
            var year = new Date().getFullYear();

            var modalTitle = ''
            var eventYear = year
            var time = new Date().getTime()
            console.log('this.state.roundOf32Arr', this.state.roundOf32Arr)

            if (menuSelection === 'Round of 32') {
                if (stopRound2Edit !== 'N/A' && time > stopRound2Edit) { this.notify('Event already started'); return }
                else {
                    modalTitle = 'World Cup ' + year + ' > Round of 32'
                    this.setState({ itemToModals: this.state.roundOf32Arr, worldCupModal: true, modalTitle, selectionToModal: 'roundOf32' })
                }
            }
            if (menuSelection === 'Round of 16') {
                // if (stopRoundOf16Edit !== 'N/A' && time > stopRoundOf16Edit) { this.notify('Event already started'); return }
                // else {
                modalTitle = 'World Cup ' + year + ' > Round of 16'
                this.setState({ itemToModals: this.state.roundOf16Arr, worldCupModal: true, modalTitle, selectionToModal: 'roundOf16' })
                //  }
            }
            if (menuSelection === 'Quarter Finals') {
                console.log('tuko menuSelection',menuSelection)
                if (stopQuarterFinalsEdit !== 'N/A' && time > stopQuarterFinalsEdit) { this.notify('Event already started'); return }
                else {
                    console.log('tuko hereeeeeeeee')
                    modalTitle = 'World Cup ' + year + ' > Quarter Finals'
                    this.setState({ itemToModals: this.state.quarterFinalsArr, worldCupModal: true, modalTitle, selectionToModal: 'quarterFinals' })
                }
            }
            if (menuSelection === 'Semi Finals') {
                if (stopSemiFinalsEdit !== 'N/A' && time > stopSemiFinalsEdit) { this.notify('Event already started'); return }
                else {
                    modalTitle = 'World Cup ' + year + ' > Semi Finals'
                    this.setState({ itemToModals: this.state.semiFinalsArr, worldCupModal: true, modalTitle, selectionToModal: 'semiFinals' })
                }
            }
            if (menuSelection === 'Finals') {
                if (stopFinalEdit !== 'N/A' && time > stopFinalEdit) {
                    if (time > Number(stopFinalEdit + 86400000)) { this.notify('Event Expired'); return }
                    else { this.notify('Event already started'); return }
                }
                else {
                    modalTitle = 'World Cup ' + year + ' > Finals'
                    this.setState({ itemToModals: this.state.finalArr, worldCupModal: true, modalTitle, selectionToModal: 'finalRound' })
                }
            }
        })
    }
    pickGroupWinners = (group, groupArr) => {
        this.setState({ showPickWinnerModal: true, selectedGroup: group, selectedGroupArr: groupArr })

    }
    eliminate = () => {
        console.log('this.state.selectedId', this.state.selectedId)
        var groupArr = this.state.selectedGroupArr
        var matchDbRef = firebase.database().ref('/theEvents/WorldCup/' + this.state.theEventKey + '/groupStage/' + this.state.selectedId)
        matchDbRef.child('outCome').set('Eliminated', (error) => {
            if (!error) {
                const targetTeam = groupArr.find(team => team.id === this.state.selectedId);
                if (targetTeam) { targetTeam.outCome = 'Eliminated' }
                this.setState({ showConfirmModal: false, selectedGroupArr: groupArr })
                this.getWorldCupResults('Eliminated')
            }
        })

    }
    openWorldCupDetailsModal = async () => {
       //this.reArrangeRoundOf16()
       //this.reArrangeQuarterFinals()
       //return
        /*  var pickEvent = false
       var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
       editDbRef.child('currentPick').once('value', dataSnapshot => {
           if (dataSnapshot.exists()) {
               this.setState({ theGameEvent: dataSnapshot.val() })
               var theGameEvent = dataSnapshot.val()
               if (this.state.currentRound === 'round2' && theGameEvent === 'Round of 32') { itemToModals = this.state.roundOf32Arr, modalTitle = 'World Cup ' + year + ' > Round of 32', stopEdit = 'stopRound2Edit'}
               if (this.state.theMenu === 'roundOf16' && theGameEvent === 'Round of 16') { pickEvent = true }
               if (this.state.theMenu === 'quarterFinals' && theGameEvent === 'Quarter Finals') { pickEvent = true }
               if (this.state.theMenu === 'semiFinals' && theGameEvent === 'Semi Finals') { pickEvent = true }
               if (this.state.theMenu === 'final' && theGameEvent === 'Finals') { pickEvent = true }
               if (this.state.currentRound === 'round1' && pickEvent === true) { this.setState({ enterTeamNameInfoModal: true }) }
           } else {
               this.notify('Selection not available at the moment')
           }
       })*/

        var menuSelection = this.state.theGameEvent
        console.log('menuSelection', menuSelection)
        if (this.state.userLoggedIn === false) {
            this.notify("Please Log In to continue")
            this.setState({ openLoginModal: true })
            return
        }
        var itemToModals = '', modalTitle = '', stopEdit = ''
        var year = new Date().getFullYear()
        if (menuSelection === 'Round of 32') {this.setState({currentRound:'round2',theMenu:''});itemToModals = this.state.roundOf32Arr, modalTitle = 'World Cup ' + year + ' > Round of 32', stopEdit = 'stopRound2Edit'}
        if (menuSelection === 'Round of 16') {
            this.setState({currentRound:'finalRound',theMenu:'roundOf16'});itemToModals = this.state.roundOf16Arr, modalTitle = 'World Cup ' + year + ' > Round of 16', stopEdit = 'stopRoundOf16Edit'
        }
        if (menuSelection === 'Quarter Finals') {
            this.setState({currentRound:'finalRound',theMenu:'quarterFinals'});itemToModals = this.state.quarterFinalsArr, modalTitle = 'World Cup ' + year + ' > Quarter Finals', stopEdit = 'stopQuarterFinalsEdit'
        }
        if (menuSelection === 'Semi Finals') {
            this.setState({currentRound:'finalRound',theMenu:'semiFinals'});itemToModals = this.state.semiFinalsArr, modalTitle = 'World Cup ' + year + ' > Semi Finals', stopEdit = 'stopSemiFinalsEdit'
        }
        if (menuSelection === 'Finals') {
            this.setState({currentRound:'finalRound',theMenu:'final'});itemToModals = this.state.finalArr, modalTitle = 'World Cup ' + year + ' > Finals', stopEdit = 'stopFinalEdit'
        }

        var i = 0, pointMissing = false
        console.log('this.state.theItems', itemToModals)
        //itemToModals=itemToModals.slice(0,1)
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
                    this.openTheModal2(itemToModals, stopEdit)
                    console.log('itemToModals', itemToModals)
                    this.setState({ itemToModals, modalTitle })
                }
            }
        })
    }
    proceed = () => {
        console.log('this.state.selectedId', this.state.selectedId)
        var groupArr = this.state.selectedGroupArr
        var matchDbRef = firebase.database().ref('/theEvents/WorldCup/' + this.state.theEventKey + '/groupStage/' + this.state.selectedId)
        matchDbRef.child('outCome').set('Proceed', (error) => {
            if (!error) {
                const targetTeam = groupArr.find(team => team.id === this.state.selectedId);
                if (targetTeam) { targetTeam.outCome = 'Proceed' }
                this.setState({ showConfirmModal: false, selectedGroupArr: groupArr })
                this.getWorldCupResults('Proceed')
            }
        })

    }
    checkForOutcome = async (theItems, outcome) => {
        try {
            var scoreName = 'round1Score'
            if (this.state.theEventKey === '', this.state.currentRound === '', scoreName === '') return
            if (!this.state.theEventKey || this.state.theEventKey.length < 3) return
            theItems = JSON.stringify(theItems);
            var theLink = 'theEvents::WorldCup::' + this.state.theEventKey + '::groupStage::' + scoreName + '::' + outcome + '::round1'
            if (!this.state.theEventKey || this.state.theEventKey.length === 0) return
            // axios.post('http://localhost:4000/getWorldCupResults', {
            axios.post('https://theramtournament.com/getWorldCupResults', {
                eventPath: theLink,
                teams: theItems,
                status: "Proceed",
                round: "round1"
            })
                .then((res) => {
                    var theOutcome = res.data
                    this.notify(theOutcome)
                    if (theOutcome === 'Success Updating Results') {
                        this.getWorldCupMatches(this.state.userId)
                    }
                })
        } catch (error) {
            this.notify('Error updating results')
            console.log('error', error)
        }
    }
    getWorldCupResults = (outcome) => {
        var allGroupStageArr = []
        var matchesRef = firebase.database().ref('/theEvents/WorldCup/').child(this.state.theEventKey + '/' + 'groupStage/')
        matchesRef.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                var theCount = dataSnapshot.numChildren()
                var i = 0
                dataSnapshot.forEach((data) => {
                    i++
                    allGroupStageArr.push(data.val())
                    if (theCount === i) {
                        console.log('all group stage', outcome, allGroupStageArr)
                        this.checkForOutcome(allGroupStageArr, outcome)
                    }
                })
            }
        })
    }
    handleChildClick = (title, items) => {
        this.setState({ count: this.state.count + 1, worldCupModal: false, [title]: items });
        //console.log('azeeza', items)
    };
    dummyItems = (group, theItems) => {
        return (
            <div className={style.itemComp}>
                <p className={style.groupP}>{group}</p>
                <div id={style.table1Div}>
                    <table className={style.table1}>
                        <tr id={style.table1Tr1}>
                            <th>Pick</th>
                            <th>Flag</th>
                            <th>Country</th>
                            <th>Points</th>
                            <th>Outcome</th>
                        </tr>
                        {theItems.map((item, index) => {
                            var textColor = '#292f51'
                            var selectedToShow = selectedToShow = <div className={style.boxDiv} onClick={() => this.notify('Teams not yet filled')}><MdCheck color="#fff" size={15} /></div>
                            if (item.outCome === 'Proceed') { textColor = '#1ecb97' }
                            if (item.outCome === 'Eliminated') { textColor = '#CB1E31' }
                            return (
                                <tr id={style.table1Tr2} key={index}>
                                    <td style={{ cursor: 'pointer' }}>{selectedToShow}</td>
                                    <td><FaFontAwesomeFlag size={20} /></td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className={style.myPicksDiv}>
                    <p className={style.myPicksP1}>My Picks: N/A</p>
                    <p className={style.myPicksP2}>Points Earned: N/A</p>
                </div>
                {this.state.isAdmin ? <p className={style.winnerPickP} onClick={() => this.setState({ openEnterTeamsModal: group, team1Points: '', team2Points: '', team3Points: '', team4Points: '', team1Odds: '0.00', team2Odds: '0.00', team3Odds: '0.00', team4Odds: '0.00' })}>Fill In {group} Teams</p> : <p className={style.winnerPickP} onClick={() => this.notify('Selection not available at the moment')}>Pick {group} Winners</p>}
                {this.state.isAdmin && this.state.openEnterTeamsModal === group ? <div className={style.fillTeamsCont}>
                    <p className={style.teamTitleP}>{group} Team 1</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team1Name' placeholder='Enter team name' type='text' value={this.state.team1Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team1Points' placeholder='Team points' type='number' value={this.state.team1Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team1Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team1Flag' placeholder='Paste team flag' type='text' value={this.state.team1Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 2</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team2Name' placeholder='Enter team name' type='text' value={this.state.team2Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team2Points' placeholder='Team points' type='number' value={this.state.team2Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team2Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team2Flag' placeholder='Paste team flag' type='text' value={this.state.team2Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 3</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team3Name' placeholder='Enter team name' type='text' value={this.state.team3Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team3Points' placeholder='Team points' type='number' value={this.state.team3Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team3Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team3Flag' placeholder='Paste team flag' type='text' value={this.state.team3Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 4</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team4Name' placeholder='Enter team name' type='text' value={this.state.team4Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team4Points' placeholder='Team points' type='number' value={this.state.team4Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team4Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team4Flag' placeholder='Paste team flag' type='text' value={this.state.team4Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.saveMatchesP} onClick={() => this.saveTeams(group)}>SAVE MATCHES</p>
                </div> : null}
            </div>
        )
    }
    winnerItemComp = (group, theItems) => {
        var group = this.state.selectedGroup
        var theItems = this.state.selectedGroupArr
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        const totalOdds = (theItems ?? []).filter(item => item.bet === true)
            .reduce((acc, curr) => {
                const val = parseFloat(curr.odds);
                return acc + (!isNaN(val) ? val : 0);
            }, 0).toFixed(2);
        var thePicks = [], thePoints = []
        //
        return (
            <div className={style.itemComp}>
                <div className={style.groupDiv}><p className={style.groupP}>{'Select winners for ' + group}</p></div>
                <div id={style.table1Div}>
                    <table className={style.table1}>
                        <tr id={style.table1Tr1}>
                            <th>Pick</th>
                            <th style={{ paddingLeft: 10 }}>Flag</th>
                            <th style={{ paddingLeft: 10 }}>Country</th>
                            <th>Points</th>
                            <th style={{ paddingLeft: 20 }}>Outcome</th>
                        </tr>
                        {theItems.map((item, index) => {
                            if (item.outCome === 'Proceed') { thePicks.push(item.teamName), thePoints = thePoints + (item.odds) }
                            var isWinner = false, isLost = false, outcome = '', outcomeColor = ''
                            if (item.outCome === 'Proceed') { isWinner = true, outcome = 'Proceed', outcomeColor = '#1ecb97' }
                            if (item.outCome === 'Eliminated') { isLost = true, outcome = 'Eliminated', outcomeColor = '#CB1E31' }
                            var textColor = '#292f51', teamName = item.teamName
                            var selectedOutcome = <div className={style.boxDiv} onClick={() => this.openConfirmationModal(outcome, teamName, group, item.id)}><MdCheck color="#fff" size={15} /></div>
                            if (outcome) {
                                selectedOutcome = <div className={style.boxDiv3} style={{ backgroundColor: outcomeColor, borderColor: outcomeColor }} onClick={() => this.openConfirmationModal(outcome, teamName, group, item.id)}><MdCheck color="#fff" size={15} /></div>
                            }
                            if (item.teamName.length > 15) { teamName = teamName.slice(0, 15) + '...' }
                            return (
                                <tr id={style.table1Tr2} key={index}>
                                    <td style={{ cursor: 'pointer' }}>{selectedOutcome}</td>
                                    <td style={{ paddingLeft: 10, color: outcomeColor }}>
                                        <div className={style.flagImgDiv}><img className={style.flagImg} src={item.teamFlag} alt={'RAM'} /></div>
                                    </td>
                                    <td style={{ paddingLeft: 10, color: outcomeColor }}>{teamName}</td>
                                    <td style={{ color: outcomeColor }}>{item.odds}</td>
                                    <td style={{ color: outcomeColor, paddingLeft: 20 }}>{item.outCome}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className={style.myPicksDiv}>
                    <p className={style.myPicksP1}>Winners: {thePicks.length ? (thePicks[0] ? thePicks[0] : '') + (thePicks[1] ? ', ' + thePicks[1] : '') + (thePicks[2] ? ', ' + thePicks[2] : '') : 'N/A'}</p>
                </div>
                <div className={style.pickWinnerDiv2}>
                    <p className={style.winnerPickP} style={{ background: '#246fac' }} onClick={() => this.setState({ showPickWinnerModal: false })}>CLOSE</p>
                </div>
            </div>
        )
    }
    groupItemComp = (group, theItems) => {
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var theGroupArr = theGroup + 'Arr'
        const team1Item = (theItems ?? []).find(item => item.id === (theGroup + 'Team1'));
        const team2Item = (theItems ?? []).find(item => item.id === (theGroup + 'Team2'));
        const team3Item = (theItems ?? []).find(item => item.id === (theGroup + 'Team3'));
        const team4Item = (theItems ?? []).find(item => item.id === (theGroup + 'Team4'));
        // console.log('theItems 1111',team1Item,theGroup, theItems)
        const totalOdds = (theItems ?? []).filter(item => item.bet === true)
            .reduce((acc, curr) => {
                const val = parseFloat(curr.odds);
                return acc + (!isNaN(val) ? val : 0);
            }, 0).toFixed(2);
        var thePicks = [], thePoints = []
        //
        return (
            <div className={style.itemComp}>
                <div className={style.groupDiv}><p className={style.groupP}>{group}</p>{this.state.isAdmin ? <p className={style.editDivP} onClick={() => this.setState({ openEnterTeamsModal: group, team1Points: '', team2Points: '', team3Points: '', team4Points: '', team1Odds: '0.00', team2Odds: '0.00', team3Odds: '0.00', team4Odds: '0.00' })}>Edit</p> : null}</div>
                <div id={style.table1Div}>
                    <table className={style.table1}>
                        <tr id={style.table1Tr1}>
                            <th>Pick</th>
                            <th style={{ paddingLeft: 10 }}>Flag</th>
                            <th style={{ paddingLeft: 10 }}>Country</th>
                            <th>Points</th>
                            <th style={{ paddingLeft: 20 }}>Outcome</th>
                        </tr>
                        {theItems.map((item, index) => {
                            if (item.bet) { thePicks.push(item.teamName), thePoints = thePoints + (item.odds) }
                            //  console.log('the thePicks', thePicks)
                            var textColor = '#292f51', teamName = item.teamName, textColor2 = '#292f51'
                            var selectedToShow = selectedToShow = <div className={style.boxDiv} onClick={() => this.openTheModal()}><MdCheck color="#fff" size={15} /></div>
                            if (item.bet) {
                                selectedToShow = <div className={style.boxDiv3}><MdCheck color="#fff" size={15} onClick={() => this.openTheModal()} /></div>
                            }
                            if (item.outCome === 'Proceed') { textColor = '#1ecb97', textColor2 = '#1ecb97' }
                            if (item.outCome === 'Eliminated') { textColor = '#CB1E31' }
                            if (item.teamName.length > 15) { teamName = teamName.slice(0, 15) + '...' }
                            return (
                                <tr id={style.table1Tr2} key={index}>
                                    <td style={{ cursor: 'pointer' }}>{selectedToShow}</td>
                                    <td style={{ paddingLeft: 10 }}>
                                        <div className={style.flagImgDiv}><img className={style.flagImg} src={item.teamFlag} alt={'RAM'} /></div>
                                    </td>
                                    <td style={{ paddingLeft: 10, color: textColor2 }}>{teamName}</td>
                                    <td style={{ color: textColor2 }}>{item.odds}</td>
                                    <td style={{ color: textColor, paddingLeft: 20 }}>{item.outCome}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className={style.myPicksDiv}>
                    <p className={style.myPicksP1}>My Picks: {thePicks.length ? (thePicks[0] ? thePicks[0] : '') + (thePicks[1] ? ', ' + thePicks[1] : '') + (thePicks[2] ? ', ' + thePicks[2] : '') : 'N/A'}</p>
                    <p className={style.myPicksP2}>Points: {totalOdds}</p>
                </div>
                <div className={style.pickWinnerDiv2}>
                    <p className={style.winnerPickP} style={{ background: '#246fac' }} onClick={() => this.openTheModal()}>{thePicks.length ? 'EDIT YOUR PICKS' : 'MAKE YOUR PICKS'}</p>
                    {this.state.isAdmin ? <p className={style.winnerPickP2} style={{ background: '#1ecb97' }} onClick={() => this.pickGroupWinners(theGroup, theItems)}>PICK WINNERS</p> : null}
                </div>

                {this.state.isAdmin && this.state.openEnterTeamsModal === group ? <div className={style.fillTeamsCont}>
                    <p className={style.teamTitleP}>{group} Team 1</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team1Name' placeholder='Enter team name' type='text' value={this.state.team1Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team1Points' placeholder='Team points' type='number' value={this.state.team1Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team1Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team1Flag' placeholder='Paste team flag' type='text' value={this.state.team1Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 2</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team2Name' placeholder='Enter team name' type='text' value={this.state.team2Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team2Points' placeholder='Team points' type='number' value={this.state.team2Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team2Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team2Flag' placeholder='Paste team flag' type='text' value={this.state.team2Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 3</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team3Name' placeholder='Enter team name' type='text' value={this.state.team3Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team3Points' placeholder='Team points' type='number' value={this.state.team3Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team3Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team3Flag' placeholder='Paste team flag' type='text' value={this.state.team3Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 4</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team4Name' placeholder='Enter team name' type='text' value={this.state.team4Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team4Points' placeholder='Team points' type='number' value={this.state.team4Points} onChange={(event) => this.teamsInputChange(event)}></input>
                        <p className={style.teamsPointsP}>{this.state.team4Odds}</p>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team4Flag' placeholder='Paste team flag' type='text' value={this.state.team4Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.saveMatchesP} onClick={() => this.saveTeams(group)}>SAVE MATCHES</p>
                </div> : null}
            </div>
        )
    }

    groupItemComp2 = (group, theItems) => {
        //  console.log('theItems 222222', theItems)
        const totalOdds = (theItems ?? []).filter(item => item.bet === true)
            .reduce((acc, curr) => {
                const val = parseFloat(curr.odds);
                return acc + (!isNaN(val) ? val : 0);
            }, 0).toFixed(2);
        var betMap = (theItems ?? []).filter(item => item.bet === true).reduce((acc, item) => { acc[item.id] = item.teamName; return acc; }, {});
        var betOdds = (theItems ?? []).filter(item => item.bet === true).reduce((acc, item) => { acc[item.id] = item.odds; return acc; }, {});

        //teamsChosenOdds
        chosenTeams = { ...chosenTeams, ...betMap };
        teamsChosenOdds = { ...teamsChosenOdds, ...betOdds };
        //  console.log('betMap2222222 betMap', betMap, 'chosenTeams', chosenTeams, 'teamsChosenOdds', teamsChosenOdds)
        // const activeBetNames = (theItems ?? []).filter(item => item.bet === true).map(item => item.teamName);

        var thePicks = [], thePoints = []
        return (
            <div className={style.itemComp3}>
                <div className={style.groupDiv}><p className={style.groupP}>{group}</p></div>
                <div id={style.table1Div}>
                    <table className={style.table1}>
                        <tr id={style.table1Tr1}>
                            <th>Pick</th>
                            <th style={{ paddingLeft: 10 }}>Flag</th>
                            <th style={{ paddingLeft: 10 }}>Country</th>
                            <th>Points</th>

                        </tr>
                        {theItems.map((item, index) => {
                            if (item.bet) { thePicks.push(item.teamName), thePoints = thePoints + (item.odds) }
                            //  console.log('the thePicks', thePoints, thePicks)
                            var textColor = '#292f51', teamName = item.teamName
                            var selectedToShow = selectedToShow = <div className={style.boxDiv} onClick={() => this.selectedItems(item.id, item.teamName, item.points, item.group)}><MdCheck color="#fff" size={15} /></div>
                            if (item.bet) {
                                selectedToShow = <div className={style.boxDiv3}><MdCheck color="#fff" size={15} onClick={() => this.deselectItems(item.id, item.teamName, item.points, item.group)} /></div>
                            }
                            if (item.outCome === 'Proceed') { textColor = '#1ecb97' }
                            if (item.outCome === 'Eliminated') { textColor = '#CB1E31' }
                            if (item.teamName.length > 15) { teamName = teamName.slice(0, 15) + '...' }
                            return (
                                <tr id={style.table1Tr2} key={index}>
                                    <td style={{ cursor: 'pointer' }}>{selectedToShow}</td>
                                    <td style={{ paddingLeft: 10 }}>
                                        <div className={style.flagImgDiv}><img className={style.flagImg} src={item.teamFlag} alt={'RAM'} /></div>
                                    </td>
                                    <td style={{ paddingLeft: 10 }}>{teamName}</td>
                                    <td>{item.odds}</td>

                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className={style.myPicksDiv}>
                    <p className={style.myPicksP1}>My Picks: {thePicks.length ? (thePicks[0] ? thePicks[0] : '') + (thePicks[1] ? ', ' + thePicks[1] : '') + (thePicks[2] ? ', ' + thePicks[2] : '') : 'N/A'}</p>
                    <p className={style.myPicksP2}>Points: {totalOdds}</p>
                </div>
            </div>
        )
    }
    itemComp = (theItems, isPicked) => {
        console.log('isPicked', isPicked)
        isPicked = this.state.currentEventUserInfo[isPicked]
        if (!isPicked) { isPicked = false }

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
                        isPicked
                        return (
                            <div className={style.listDiv} key={index}>
                                <div className={style.theCont0}>
                                    <div className={style.theCont01}>
                                        <p>Match {index + 1}</p>
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
                                            {item.player1 !== 'N/A' ? <p className={style.P1}>{item.player1}</p> :
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
                                            {item.player2 !== 'N/A' ? <p className={style.P1}>{item.player2}</p> :
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
                                        <div className={style.joinRamDiv}><button className={style.joinRamBtn} onClick={() => this.openWorldCupDetailsModal()}>MAKE YOUR PICK</button></div>
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
    render() {//userDetails
        var titleToShow = '', currentBPS = '0.00', theCurrentScore = '0.00', currentRank = 'N/A'
        if (this.state.currentRound === 'round1') { titleToShow = 'Group Stage', currentBPS = this.state.currentEventUserInfo['round1BPS'], theCurrentScore = this.state.currentEventUserInfo['round1Score'], currentRank = this.state.currentEventUserInfo['round1Rank'] }
        if (this.state.currentRound === 'round2') { titleToShow = 'Round of 32', currentBPS = this.state.currentEventUserInfo['round2BPS'], theCurrentScore = this.state.currentEventUserInfo['round2Score'], currentRank = this.state.currentEventUserInfo['round2Rank'] }
        if (this.state.currentRound === 'finalRound') {
            currentRank = this.state.currentEventUserInfo['finalRoundRank']
            if (this.state.theMenu === 'roundOf16') { titleToShow = 'Roun of 16', currentBPS = this.state.currentEventUserInfo['roundOf16BPS'], theCurrentScore = this.state.currentEventUserInfo['roundOf16Score'] }
            if (this.state.theMenu === 'quarterFinals') { titleToShow = 'Quarter Finals', currentBPS = this.state.currentEventUserInfo['quarterFinalsBPS'], theCurrentScore = this.state.currentEventUserInfo['quarterFinalsScore'] }
            if (this.state.theMenu === 'semiFinals') { titleToShow = 'Semi Finals', currentBPS = this.state.currentEventUserInfo['semiFinalBPS'], theCurrentScore = this.state.currentEventUserInfo['semiFinalScore'] }
            if (this.state.theMenu === 'final') { titleToShow = 'Finals', currentBPS = this.state.currentEventUserInfo['finalsBPS'], theCurrentScore = this.state.currentEventUserInfo['finalsScore'] }
        }
        return (
            <>
                <div>
                    <div>
                        <div className={style.profileDiv}>
                            <div className={style.imageDiv}>
                                {this.state.profilePhoto.length ? <img src={this.state.profilePhoto} /> :
                                    <IoPersonSharp className={style.personIC} />}
                            </div>
                            <div className={style.detailsDiv}>
                                <p>RAM Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['teamName'] : 'N/A'}</p>
                                <p>Flock Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['flockName'] : 'N/A'}</p>
                                {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.openTheModal()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal()}>Make Picks</p>}
                            </div>
                        </div>
                        {this.state.isAdmin ? <div className={style.eventCreationDiv}>
                            <p className={style.eventP} onClick={() => this.openWorldCupModal()}>Enter Event Details</p>
                            <p className={style.eventP2} onClick={() => this.setState({ showCreateEventModal: true })}>Create New World Cup Event</p>
                        </div> : null}
                    </div>
                    <p className={style.eveP}>Event: <span>{this.state.theEventTitle}</span></p>
                    <div className={style.linksDiv}>
                        {this.state.theLink.length > 1 && new Date().getTime() < this.state.theTime ? <div className={style.shareDiv} onClick={() => this.copyLink()}>
                            <p>Flock Invite Link</p>
                            <FaRegCopy />
                        </div> : null}
                    </div>
                    <div className={style.picksDiv} onClick={() => this.openWorldCupDetailsModal()}>
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
                    {this.state.isAdmin &&this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'&& this.state.groupStagePopulated ?
                        <div>
                            <p id={style.picksP}>Allow World Cup Picks</p>
                            <div id={style.selectorDiv}>
                                {theGameEvents.map((item, index) => {
                                    return (
                                        <div id={style.selectorDiv2} key={index} onClick={() => this.chooseGameEvent(item, 'picks')}>
                                            <div className={this.state.theGameEvent === item ? style.boxDiv3 : style.boxDiv3b}>
                                                <MdCheck size={15} /></div>
                                            <p style={{ color: this.state.theGameEvent === item ? '#CB1E31' : null }}>{item}</p>
                                        </div>
                                    )
                                })}


                            </div></div> : null}
                    {this.state.isAdmin &&this.state.userId==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'&& this.state.groupStagePopulated ?
                        <div>
                            <p id={style.picksP}>Current Selection</p>
                            <div id={style.selectorDiv}>
                                {theGameEvents.map((item, index) => {
                                    return (
                                        <div id={style.selectorDiv2} key={index} onClick={() => this.chooseGameEvent(item, 'selection')}>
                                            <div className={this.state.menuSelection === item ? style.boxDiv3 : style.boxDiv3b}>
                                                <MdCheck size={15} /></div>
                                            <p style={{ color: this.state.menuSelection === item ? '#CB1E31' : null }}>{item}</p>
                                        </div>
                                    )
                                })}


                            </div></div> : null}
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
                            <p className={style.scoreP1}>Current Rank in World Cup</p>
                            <p className={style.scoreP2}>{this.state.dataAvailable && currentRank !== false ? currentRank : 'N/A'}</p>
                        </div>
                    </div>
                    <div className={style.eve2Div}>
                        <p id={this.state.currentRound === 'round1' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round1')}>Round 1: Group Stage</p>
                        <p id={this.state.currentRound === 'round2' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('round2')}>Round 2: Round of 32</p>
                        <p id={this.state.currentRound === 'finalRound' ? style.theSubMenuP2 : null} onClick={() => this.getCurrentRound('finalRound')}>Final Round: Round of 16 to Finals</p>
                    </div>
                    {this.state.currentRound === 'finalRound' ? <div className={style.eveDiv}>
                        <p id={this.state.theMenu === 'roundOf16' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('roundOf16')}>ROUND OF 16</p>
                        <p id={this.state.theMenu === 'quarterFinals' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('quarterFinals')}>QUARTER FINALS</p>
                        <p id={this.state.theMenu === 'semiFinals' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('semiFinals')}>SEMI FINALS</p>
                        <p id={this.state.theMenu === 'final' ? style.playerP2 : style.playerP} onClick={() => this.selectEvent('final')}>FINALS</p>

                    </div> : null}
                    {this.state.showPickWinnerModal ? <div className={style.modal} onClick={() => this.setState({ showPickWinnerModal: false })}>
                        <div className={style.itemCont} style={{ width: '400px' }} onClick={(e) => this.doNothing(e)}>{this.winnerItemComp()}</div>
                    </div> : null}
                    {this.state.showCreateEventModal ? <div className={style.modal} onClick={() => this.setState({ showCreateEventModal: false })}>
                        <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
                            <p className={style.eventHeadP}>Create World Cup Event</p>
                            <p className={style.eventTitleP}>Enter Group Stage Start Date/Time</p>
                            <input className={style.eventInput} id='groupStage' placeholder='Enter your RAM name' type='datetime-local' value={this.state.groupStage} onChange={(event) => this.inputChange(event)}></input>
                            <p className={style.eventErrorP}>{this.state.groupStageErr}</p>
                            <p className={style.eventTitleP}>Enter Round of 32 Start Date/Time</p>
                            <input className={style.eventInput} id='roundOf32' placeholder='Enter your RAM name' type='datetime-local' value={this.state.roundOf32} onChange={(event) => this.inputChange(event)}></input>
                            <p className={style.eventErrorP}>{this.state.round32Err}</p>
                            <p className={style.eventTitleP}>Enter Round of 16 Start Date/Time</p>
                            <input className={style.eventInput} id='roundOf16' placeholder='Enter your RAM name' type='datetime-local' value={this.state.roundOf16} onChange={(event) => this.inputChange(event)}></input>
                            <p className={style.eventErrorP}>{this.state.roundOf16Err}</p>
                            <p className={style.eventTitleP}>Enter Quarter Finals Start Date/Time</p>
                            <input className={style.eventInput} id='quarterFinals' placeholder='Enter your RAM name' type='datetime-local' value={this.state.quarterFinals} onChange={(event) => this.inputChange(event)}></input>
                            <p className={style.eventErrorP}>{this.state.quarterFinalsErr}</p>
                            <p className={style.eventTitleP}>Enter Semi Finals Start Date/Time</p>
                            <input className={style.eventInput} id='semiFinals' placeholder='Enter your RAM name' type='datetime-local' value={this.state.semiFinals} onChange={(event) => this.inputChange(event)}></input>
                            <p className={style.eventErrorP}>{this.state.semiFinalsErr}</p>
                            <p className={style.eventTitleP}>Enter Final Start Date/Time</p>
                            <input className={style.eventInput} id='final' placeholder='Enter your RAM name' type='datetime-local' value={this.state.final} onChange={(event) => this.inputChange(event)}></input>
                            <p className={style.eventErrorP}>{this.state.finalErr}</p>
                            <button className={style.submitBtn} onClick={() => this.checkExistence()}>Create Event</button>
                        </div>
                    </div> : null}
                    {this.state.currentRound === 'round1' ? <div className={style.itemContainer}>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupAArr.length ? this.groupItemComp('Group A', this.state.groupAArr) : this.dummyItems('Group A', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupBArr.length ? this.groupItemComp('Group B', this.state.groupBArr) : this.dummyItems('Group B', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupCArr.length ? this.groupItemComp('Group C', this.state.groupCArr) : this.dummyItems('Group C', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupDArr.length ? this.groupItemComp('Group D', this.state.groupDArr) : this.dummyItems('Group D', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupEArr.length ? this.groupItemComp('Group E', this.state.groupEArr) : this.dummyItems('Group E', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupFArr.length ? this.groupItemComp('Group F', this.state.groupFArr) : this.dummyItems('Group F', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupGArr.length ? this.groupItemComp('Group G', this.state.groupGArr) : this.dummyItems('Group G', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupHArr.length ? this.groupItemComp('Group H', this.state.groupHArr) : this.dummyItems('Group H', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupIArr.length ? this.groupItemComp('Group I', this.state.groupIArr) : this.dummyItems('Group I', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupJArr.length ? this.groupItemComp('Group J', this.state.groupJArr) : this.dummyItems('Group J', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupKArr.length ? this.groupItemComp('Group K', this.state.groupKArr) : this.dummyItems('Group K', groupATeams)}</div>
                        <div className={style.itemCont}>{this.state.groupStagePopulated && this.state.groupLArr.length ? this.groupItemComp('Group L', this.state.groupLArr) : this.dummyItems('Group L', groupATeams)}</div>
                    </div> : null}
                    {this.state.currentRound === 'round2' ? <div className={style.divCont}>{this.itemComp(this.state.roundOf32Arr, 'round2Pick')}</div> : null}
                    {this.state.currentRound === 'finalRound' ?
                        <>{this.state.theMenu === 'roundOf16' ? <div className={style.divCont}>{this.itemComp(this.state.roundOf16Arr, 'roundOf16Pick')}</div> : null}
                            {this.state.theMenu === 'quarterFinals' ? <div className={style.divCont}>{this.itemComp(this.state.quarterFinalsArr, 'quarterFinalsPick')}</div> : null}
                            {this.state.theMenu === 'semiFinals' ? <div className={style.divCont}>{this.itemComp(this.state.semiFinalsArr, 'semiFinalsPick')}</div> : null}
                            {this.state.theMenu === 'final' ? <div className={style.divCont}>{this.itemComp(this.state.finalArr, 'finalsPick')}</div> : null}</>
                        : null}
                    {this.state.enterTeamNameInfoModal ? <div className={style.modal} onClick={() => this.setState({ enterTeamNameInfoModal: false })}>
                        <div className={style.groupStagePicksDiv} onClick={(e) => this.doNothing(e)}>
                            <h1 className={style.theTitleP}>Enter RAM Details</h1>
                            <div className={style.theMenuDiv}>
                                <p>World Cup</p>
                                <MdOutlineKeyboardArrowRight className={style.theMenuIc} />
                                <p>{this.state.theEventTitle}</p>
                            </div>
                            <div ><div className={style.nameCont}>
                                <p className={style.P1}>RAM Name</p>

                            </div>
                                <div className={style.cont1}>
                                    <MdOutlinePersonOutline className={style.logInIcon} />
                                    <input className={style.logInInput} placeholder='Enter your RAM name' type='text' id='teamName' value={this.state.teamName} onChange={(event) => this.inputChange(event)}></input>
                                </div>
                                <p className={style.pErr}>{this.state.teamNameErr}</p>
                                <div className={style.nameCont}>
                                    <p className={style.P1}>Flock Name</p>

                                </div>
                                <div className={style.cont2}>
                                    <div className={style.cont2b}>
                                        <MdOutlinePersonOutline className={style.logInIcon} />
                                        <input className={style.logInInput} placeholder='Enter your Flock Name' type='text' id='ramFlockName' readOnly value={this.state.ramFlockName} onChange={(event) => this.inputChange(event)}></input>
                                    </div>
                                </div>
                                <p className={style.pickTeamsP}>Pick your teams below</p>
                                {/*<p>Total of 32 teams made up 24 teams of first 2 teams on the group stage and 8 teams consisting of no 3 team most likely to qualify across all 12 groups</p>*/}
                                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, color: '#1ecb7a' }}>A total of 32 teams must be picked</p>
                                <ul style={{ paddingLeft: 15 }}>
                                    <li style={{ fontSize: 13, marginBottom: 3, color: '#292f51', fontWeight: 500 }}>24 teams: The top 2 finishers from each of the 12 groups.</li>
                                    <li style={{ fontSize: 13, marginBottom: 20, color: '#292f51', fontWeight: 500 }}>8 teams: The highest-ranked 3rd-place teams across all groups.</li>
                                </ul>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group A', this.state.groupAArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group B', this.state.groupBArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group C', this.state.groupCArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group D', this.state.groupDArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group E', this.state.groupEArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group F', this.state.groupFArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group G', this.state.groupGArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group H', this.state.groupHArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group I', this.state.groupIArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group J', this.state.groupJArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group K', this.state.groupKArr)}</div>
                                <div className={style.itemCont2}>{this.groupItemComp2('Group L', this.state.groupLArr)}</div>
                                <p className={style.saveP} onClick={() => this.teamFlockNameCheck()}>SAVE</p>
                            </div></div></div> : null}
                    {this.state.showConfirmModal ? <div className={style.detailsModal} onClick={() => this.setState({ showConfirmModal: false })}>
                        <div className={style.createEventDiv} onClick={(e) => this.doNothing(e)}>
                            <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#292f51' }}>Confirm</p>
                            <p style={{ marginTop: 2, marginBottom: 2, fontSize: 14, fontWeight: 600 }}>Team: {this.state.confirmTeam}</p>
                            <p style={{ marginBottom: 20 }}>{this.state.confirmMessage}</p>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <button style={{ backgroundColor: '#ddd', border: 'none', color: 'black', padding: '7px 15px', cursor: 'pointer' }} onClick={() => this.setState({ showConfirmModal: false })}>Cancel</button>
                                <button style={{ backgroundColor: '#CB1E31', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.eliminate()}>Eliminated</button>
                                <button style={{ backgroundColor: '#1ecb7a', border: 'none', color: 'white', padding: '7px 15px', marginLeft: 10, cursor: 'pointer' }} onClick={() => this.proceed()}>Proceeding</button>
                            </div></div></div> : null}
                    {this.state.worldCupModal ? <div className={style.detailsModal} onClick={() => this.setState({ worldCupModal: false })}><WorldCupModal eventToWorldCupModal={this.state.selectionToModal} itemsToWorldCupModal={this.state.itemToModals} theEventKey={this.state.theEventKey} onClick={this.handleChildClick} /></div> : null}
                    {this.state.opendetailsModal ? <div className={style.detailsModal} onClick={() => this.setState({ opendetailsModal: false })}><DetailsModal currentEvent='WorldCup' theItems={this.state.itemToModals} flockTeamName={this.state.ramFlockName} eventTitle={this.state.theEventTitle} theEventKey={this.state.theEventKey} currentSelection={this.state.currentRound} modalTitle={this.state.modalTitle} theMenu={this.state.theMenu} /></div> : null}
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default WorldCup;