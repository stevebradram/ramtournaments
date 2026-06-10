import React, { Component } from 'react';
import style from "./WorldCup.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import { MdCheck, MdInfoOutline, MdOutlinePersonOutline, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";
import firebase from '../FirebaseClient'
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import { IoPersonSharp } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { RiTeamFill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import copy from 'copy-to-clipboard';
import { BsFillLightningFill } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { TbCheckbox } from "react-icons/tb";
import { MdClose, MdOutlineShare } from "react-icons/md";
import RamOdds from '../TheJSONS/ramOdds'
import Image from 'next/image'
var flagImg = 'https://a.espncdn.com/i/teamlogos/soccer/500/164.png'
var groupATeams = [{ id: 'groupATeam1', teamName: 'Mexico', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/203.png', outCome: 'Proceed', rank: 24, points: 4.8 }, { id: 'groupATeam2', teamName: 'South Africa', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/467.png', outCome: 'Proceed', rank: 96, points: 2.3 }, { id: 'groupATeam3', teamName: 'South Korea', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/451.png', outCome: 'Eliminated', rank: 24, points: 1.52 }, { id: 'groupATeam4', teamName: 'Czechia', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/450.png', outCome: 'N/A', rank: 103, points: 3.52 }]
var chosenTeams = [], ramOddsMap = '', teamsChosenOdds = []
var theGameEvents=['Group Stage','Round of 32','Round of 16','Quarter Finals','Semi Finals','Finals']
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
        isAdmin: true, showCreateEventModal: false, groupStage: '', groupStageErr: '', roundOf32: '', round32Err: '', roundOf16: '', roundOf16Err: '', enterTeamNameInfoModal: false, team1Odds: '0.00', team2Odds: '0.00', team3Odds: '0.00', team4Odds: '0.00', profilePhoto: '',theTime:'',
        quarterFinals: '', groupATeamsErr: '', semiFinals: '', semiFinalsErr: '', final: '', finalErr: '', currentRound: 'round1', theMenu: 'roundOf16', groupStagePopulated: false, teamName: '', flockName: '', teamNameErr: '', flockNameErr: '', myEmail: '', myPhoneNo: '', flockNameNoSpace: '', ramFlockName: 'Flockless',
        groupAArr: [], groupBArr: [], groupCArr: [], groupDArr: [], groupEArr: [], groupFArr: [], groupGArr: [], groupHArr: [], groupIArr: [], groupJArr: [], groupKArr: [], groupLArr: [], userLoggedIn: '', isAdmin: false, userId: '', roundOf32Arr: [], chosenTeams: [], dataAvailable: false, teamsChosenOdds: [], currentEventUserInfo: '',theGameEvent:'',
        quarterFinalsArr: [], semiFinalsArr: [], finalArr: [], roundOf16Arr: [], theEventKey: 'WorldCup2026', openEnterTeamsModal: false, team1Name: '', team1Points: '', team1Flag: '', team2Name: '', team2Points: '', team2Flag: '', team3Name: '', team3Points: '', team3Flag: '', team4Name: '', team4Points: '', team4Flag: '', theLink: '', theEventTitle: 'World Cup 2026'
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
            this.setState({ currentEventUserInfo: dataSnapshot.val(), teamName: dataSnapshot.val().teamName, dataAvailable: true })

        })
        myFlockNamesRef.once('value', dataSnapshot => {
            if (dataSnapshot.exists()) {
                var theFlockName = dataSnapshot.val().name
                theFlockName = theFlockName?.split("|").join(" ")
                this.setState({ ramFlockName: theFlockName, flockNameNoSpace: dataSnapshot.val().name })
            } else {
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
            this.setState({theTime:dataSnapshot.val()})
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
            if(userId){this.checkLink(userId);this.groupStageStartTime()}
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
                        this.getWorldCupMatchesFinal()
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
    getWorldCupMatchesFinal = () => {
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
                }
            }

        })
    }
    getTheMatchesInfo = async () => {
        var userBetsDb = firebase.database().ref('/users/').child(this.state.userId).child("/ramData/events/WorldCup/" + this.state.theEventKey + '/bets/')
        userBetsDb.once('value', dataSnapshot => {
            var theData = dataSnapshot.val()
            var round1Arr = [], round2Arr = [], finalRoundArr = [], sweet16Arr = [], elite8Arr = [], final4Arr = []
            var round1Exists = dataSnapshot.child('round1').exists()
            var round1Count = dataSnapshot.child('round1').numChildren()
            var round2Count = dataSnapshot.child('round2').numChildren()
            var sweet16Count = dataSnapshot.child('sweet16').numChildren()
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
                this.getUserDetails()

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
        var theOdds = '',oddsInput=false
        if (e.target.id === 'team1Points') { theOdds = 'team1Odds',oddsInput=true}
        if (e.target.id === 'team2Points') { theOdds = 'team2Odds',oddsInput=true}
        if (e.target.id === 'team3Points') { theOdds = 'team3Odds',oddsInput=true}
        if (e.target.id === 'team4Points') { theOdds = 'team4Odds',oddsInput=true}
        console.log('theValue', theValue)

        //if(value>100)
        if(oddsInput){if (value < -10000) { theValue = 1.01 }
        if (value > 12620) { theValue = 1247.20 }
        if (value <= 101 && value >= -101) { theValue = 2.03 }}
       await this.setState({ [e.target.id]: value})
        if(oddsInput){
            this.setState({[theOdds]: theValue })}
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
                                stopRound1Edit: 'N/A', stopRound2Edit: 'N/A', stoproundOf16Edit: 'N/A', stopquarterFinalsEdit: 'N/A', stopquarterFinalsEdit: 'N/A', stopFinalEdit: 'N/A', currentSelection: 'groupStage', year: theYear, groupStagePopulated: false
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
    openTheModal = () => {
        var pickEvent=false
        var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
        editDbRef.child('currentPick').once('value', dataSnapshot => {
         if (dataSnapshot.exists()) {
         this.setState({theGameEvent:dataSnapshot.val()})
         var theGameEvent=dataSnapshot.val()
         if (this.state.currentRound === 'round1'&&theGameEvent === 'Group Stage'){pickEvent=true}
         if (this.state.currentRound === 'round2'&&theGameEvent === 'Round of 32'){pickEvent=true}
         if (this.state.theMenu === 'roundOf16'&&theGameEvent === 'Round of 16'){pickEvent=true}
         if (this.state.theMenu === 'quarterFinals'&&theGameEvent === 'Quarter Finals'){pickEvent=true}
         if (this.state.theMenu === 'semiFinals'&&theGameEvent === 'Semi Finals'){pickEvent=true}
         if (this.state.theMenu === 'final'&&theGameEvent === 'Finals'){pickEvent=true}
         if (this.state.currentRound === 'round1'&&pickEvent===true) { this.setState({ enterTeamNameInfoModal: true })}
        }else{
            this.notify('Selection not available at the moment')
        }
         })
    }

       teamFlockNameCheck=()=>{
        if(!this.state.userId)return
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
        var theTeamName=this.state.teamName.replace(/ /g,"_")
        var flockTeamName=this.props.flockTeamName?.split('::')
        var uniqueRamNamesRef = firebase.database().ref('/theNames/ramNames/').child('WorldCup/'+this.state.theEventKey+'/')
        uniqueRamNamesRef.child(theTeamName).once('value',dataSnapshot=>{
            if(dataSnapshot.exists()){
                var theId=dataSnapshot.val()
                var theName=dataSnapshot.key
                if(theId===this.state.userId){
                uniqueRamNamesRef.child(theName).set(null)
                this.saveTeamNameInfo(theTeamName,uniqueRamNamesRef,totalOddsSum)
                }else{
                 this.notify('RAM Name already taken')
                 this.setState({teamNameErr:'RAM Name already taken, please try another one'})
                }
            }else{
                this.saveTeamNameInfo(theTeamName,uniqueRamNamesRef,totalOddsSum)
            }
        })
     }
    saveTeamNameInfo = (theTeamName,uniqueRamNamesRef,totalOddsSum) => {
        //ramFlockName teamName teamNameErr
        var gamesDataRef = firebase.database().ref('users/').child(this.state.userId + '/ramData/events/WorldCup/' + this.state.theEventKey + '/')
        var ramsBets = firebase.database().ref('userBets/WorldCup/')
        var membersFlockNamesRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.theEventKey)
        var adminRef = firebase.database().ref('/flocksSystem/flockNames/'+this.state.theEventKey+'/admin')
        var keysDbRef = firebase.database().ref('users/').child(this.state.userId+'/ramData/').child('upcomingEvents/WorldCup/')
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
         console.log('detailsData', theTeamName,uniqueRamNamesRef)
        // return
     var toAdmin = this.state.teamName + '!!' + this.state.ramFlockName + '!!' + this.state.myEmail + '!!' + this.state.myPhoneNo
    if(this.state.ramFlockName!=='Flockless'){
      membersFlockNamesRef.child('/members/'+this.state.flockNameNoSpace).child(this.state.userId).set(this.state.teamName)
      adminRef.child(this.state.userId).set(toAdmin)
      membersFlockNamesRef.child('/membersScores/'+this.state.flockNameNoSpace).child(this.state.userId).update(scoreData)
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
    this.notify('Match not yet started')
    return
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
      //console.log('this.state.currentItems 002', theItems)
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
     /* if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }*/
      var theItems = this.state.allRound2MatchesArr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ allRound2MatchesArr: theItems })
    }
    if (this.state.currentSelection === 'finalRound') {
    if (this.state.theMenu === 'sweet16') {
      //console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.sweet16Arr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.sweet16Arr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
      /*if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }*/

      var theItems = this.state.sweet16Arr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ sweet16Arr: theItems })
      //console.log('theItems', theItems)
    }
    if (this.state.theMenu === 'elite8') {
      //console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.elite8Arr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.elite8Arr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
     /* if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }*/

      var theItems = this.state.elite8Arr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ elite8Arr: theItems })
      //console.log('theItems', theItems)
    }
    if (this.state.theMenu === 'final4') {
      //console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.final4Arr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.final4Arr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
     /* if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }*/

      var theItems = this.state.final4Arr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ final4Arr: theItems })
      //console.log('iteeeems final4Arr', theItems)
    }
    if (this.state.theMenu === 'finalRound') {
      //console.log('this.currentSelection', this.state.currentSelection, time, nowTime)
      var index2 = this.state.finalArr.map(function (x) { return x.id; }).indexOf(id);
      var nowTime = new Date().getTime()
      var theItems = this.state.finalArr

      if (nowTime < time) {
        this.notify('Match not yet started')
        return
      }
     /* if (winner !== 'N/A') {
        this.notify('Winner already filled')
        return
      }*/
      var theItems = this.state.finalArr
      theItems[index2]['showChooseWinner'] = true
      this.setState({ finalArr: theItems })
      //console.log('iteeeems finalArr', theItems)
    }}
  }
    openWorldCupModal = async () => {
     this.notify('No details to enter at the moment')
     return
      var gamesInfo = firebase.database().ref('/theEvents/NCAAB/eventsIds/' + this.state.theEventKey)
      gamesInfo.once('value', dataSnapshot => {
        var currentSelection = dataSnapshot.val().currentSelection
        var stopRound1Edit = dataSnapshot.val().stopRound1Edit
        var stopRound2Edit = dataSnapshot.val().stopRound2Edit
        var stopSweet16Edit = dataSnapshot.val().stopSweet16Edit
        var stopElite8Edit = dataSnapshot.val().stopElite8Edit
        var stopFinal4Edit = dataSnapshot.val().stopFinal4Edit
        var stopFinalEdit = dataSnapshot.val().stopFinalRoundEdit
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
        if (currentSelection === 'round1' && stopRound1Edit !== 'N/A' && time > (stopRound1Edit + 3600000)) { currentSelection = 'round2' }
        if (currentSelection === 'round2' && stopRound2Edit !== 'N/A' && time > (stopRound2Edit + 3600000)) { currentSelection = 'sweet16' }
        if (currentSelection === 'sweet16' && stopSweet16Edit !== 'N/A' && time > (stopSweet16Edit + 3600000)) { currentSelection = 'elite8' }
        if (currentSelection === 'elite8' && stopElite8Edit !== 'N/A' && time > (stopElite8Edit + 3600000)) { currentSelection = 'final4' }
        if (currentSelection === 'final4' && stopFinal4Edit !== 'N/A' && time > (stopFinal4Edit + 3600000)) { currentSelection = 'finalRound' }
  
        //console.log('currentSelection', currentSelection, time, stopRound1Edit)
        //return
        //return
        if (currentSelection === 'round1') {
          if (stopRound1Edit !== 'N/A' && time > stopRound1Edit) { this.notify('Event already started'); return }
          else {
            modalTitle = 'March Madness ' + year + ' > Round 1'
            this.setState({ itemToModals: this.state.allRound1MatchesArr, marchMadnessModal: true, modalTitle, selectionToModal: 'round1' })
          }
        }
        if (currentSelection === 'round2') {
          if (stopRound2Edit !== 'N/A' && time > stopRound2Edit) { this.notify('Event already started'); return }
          else {
            modalTitle = 'March Madness ' + year + ' > Round 2'
            this.setState({ itemToModals: this.state.allRound2MatchesArr, marchMadnessModal: true, modalTitle, selectionToModal: 'round2' })
          }
        }
        if (currentSelection === 'sweet16') {
          if (stopSweet16Edit !== 'N/A' && time > stopSweet16Edit) { this.notify('Event already started'); return }
          else {
            modalTitle = 'March Madness ' + year + ' > Sweet 16'
            this.setState({ itemToModals: this.state.sweet16Arr, marchMadnessModal: true, modalTitle, selectionToModal: 'sweet16' })
          }
        }
        if (currentSelection === 'elite8') {
          if (stopElite8Edit !== 'N/A' && time > stopElite8Edit) { this.notify('Event already started'); return }
          else {
            modalTitle = 'March Madness ' + year + ' > Elite 8'
            this.setState({ itemToModals: this.state.elite8Arr, marchMadnessModal: true, modalTitle, selectionToModal: 'elite8' })
          }
        }
        if (currentSelection === 'final4') {
          if (stopFinal4Edit !== 'N/A' && time > stopFinal4Edit) { this.notify('Event already started'); return }
          else {
            modalTitle = 'March Madness ' + year + ' > Final 4'
            this.setState({ itemToModals: this.state.final4Arr, marchMadnessModal: true, modalTitle, selectionToModal: 'final4' })
          }
        }
        if (currentSelection === 'finalRound') {
          if (stopFinalEdit !== 'N/A' && time > stopFinalEdit) {
            if (time > Number(stopFinalEdit + 86400000)) { this.notify('Event Expired'); return }
            else { this.notify('Event already started'); return }
          }
          else {
            modalTitle = 'March Madness ' + year + ' > Championship'
            this.setState({ itemToModals: this.state.finalArr, marchMadnessModal: true, modalTitle, selectionToModal: 'finalRound' })
          }
        }
      })
    }
    openEnterTeamsModal = () => {
    this.setState({ openEnterTeamsModal: group, team1Points: '', team2Points: '', team3Points: '', team4Points: '', team1Odds: '0.00', team2Odds: '0.00', team3Odds: '0.00', team4Odds: '0.00',team1Name: '', team2Name: '', teamName: '', team4Name: '',team1Flag: '', team2Flag: '', team3Flag: '', team4Flag: '' })
     }
      checkGameEventChosen= () => {
        if(this.state.theEventKey){
        var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey)
        editDbRef.child('currentPick').once('value', dataSnapshot => {
         if (dataSnapshot.exists()) {this.setState({theGameEvent:dataSnapshot.val()})}
        })}
     }
     chooseGameEvent= (item) => {
        var editDbRef = firebase.database().ref('/theEvents/eventsIds/' + this.state.theEventKey+'/currentPick/')
        if(this.state.theGameEvent===item){
         editDbRef.set(null)
         this.setState({theGameEvent:''})
        }else{
         editDbRef.set(item,(error)=>{
            if(!error){this.setState({theGameEvent:item})}
        })
      }
     }
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
    groupItemComp = (group, theItems) => {
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var theGroupArr=theGroup+'Arr'
        const team1Item = (theItems ?? []).find(item => item.id === (theGroup+'Team1'));
        const team2Item = (theItems ?? []).find(item => item.id === (theGroup+'Team2'));
        const team3Item = (theItems ?? []).find(item => item.id === (theGroup+'Team3'));
        const team4Item = (theItems ?? []).find(item => item.id === (theGroup+'Team4'));
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
                            var textColor = '#292f51', teamName = item.teamName
                            var selectedToShow = selectedToShow = <div className={style.boxDiv} onClick={() => this.openTheModal()}><MdCheck color="#fff" size={15} /></div>
                            if (item.bet) {
                                selectedToShow = <div className={style.boxDiv3}><MdCheck color="#fff" size={15} onClick={() => this.openTheModal()} /></div>
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
                <p className={style.winnerPickP} style={{ background: '#246fac' }} onClick={() => this.openTheModal()}>{thePicks.length ? 'EDIT YOUR PICKS' : 'MAKE YOUR PICKS'}</p>
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
                         {this.state.isAdmin&&this.state.groupStagePopulated ?
          <div>
            <p id={style.picksP}>Allow World Cup Picks</p> 
            <div id={style.selectorDiv}>
              {theGameEvents.map((item, index) => {
                return (
                  <div id={style.selectorDiv2} key={index} onClick={() => this.chooseGameEvent(item)}>
                    <div className={this.state.theGameEvent === item? style.boxDiv3 : style.boxDiv3b}>
                      <MdCheck size={15} /></div>
                    <p style={{ color: this.state.theGameEvent === item ? '#CB1E31' : null }}>{item}</p>
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
                    {this.state.currentRound === 'round2' ? <div className={style.divCont}>{this.itemComp(this.state.roundOf32Arr)}</div> : null}
                    {this.state.currentRound === 'finalRound' ?
                        <>{this.state.theMenu === 'roundOf16' ? <div className={style.divCont}>{this.itemComp(this.state.roundOf16Arr)}</div> : null}
                            {this.state.theMenu === 'quarterFinals' ? <div className={style.divCont}>{this.itemComp(this.state.quarterFinalsArr)}</div> : null}
                            {this.state.theMenu === 'semiFinals' ? <div className={style.divCont}>{this.itemComp(this.state.semiFinalsArr)}</div> : null}
                            {this.state.theMenu === 'final' ? <div className={style.divCont}>{this.itemComp(this.state.finalArr)}</div> : null}</>
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
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default WorldCup;