import React, { Component } from 'react';
import style from "./WorldCup.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import { MdCheck } from "react-icons/md";
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
import { MdClose,MdOutlineShare } from "react-icons/md";
import Image from 'next/image'
var flagImg = 'https://a.espncdn.com/i/teamlogos/soccer/500/164.png'
var groupATeams = [{ id: 'groupATeam1', teamName: 'Mexico', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/203.png', outCome: 'Proceed', rank: 24, points: 4.8 }, { id: 'groupATeam2', teamName: 'South Africa', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/467.png', outCome: 'Proceed', rank: 96, points: 2.3 }, { id: 'groupATeam3', teamName: 'South Korea', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/451.png', outCome: 'Eliminated', rank: 24, points: 1.52 }, { id: 'groupATeam4', teamName: 'Czechia', teamFlag: 'https://a.espncdn.com/i/teamlogos/soccer/500/450.png', outCome: 'N/A', rank: 103, points: 3.52 }]
var chosenTeams = []
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
        isAdmin: true, showCreateEventModal: false, groupStage: '', groupStageErr: '', roundOf32: '', round32Err: '', roundOf16: '', roundOf16Err: '',
        quarterFinals: '', groupATeamsErr: '', semiFinals: '', semiFinalsErr: '', final: '', finalErr: '', currentRound: 'round1', theMenu: 'roundOf16', groupStagePopulated: false,
        groupAArr: [], groupBArr: [], groupCArr: [], groupDArr: [], groupEArr: [], groupFArr: [], groupGArr: [], groupHArr: [], groupIArr: [], groupJArr: [], groupKArr: [], groupLArr: [], userLoggedIn: '', isAdmin: false, userId: '', roundOf32Arr: [], chosenTeams: [],dataAvailable:false,
        quarterFinalsArr: [], semiFinalsArr: [], finalArr: [], roundOf16Arr: [], theEventKey: 'WorldCup2026', openEnterTeamsModal: false, team1Name: '', team1Points: '', team1Flag: '', team2Name: '', team2Points: '', team2Flag: '', team3Name: '', team3Points: '', team3Flag: '', team4Name: '', team4Points: '', team4Flag: '',theLink:'',theEventTitle:'World Cup 2026'
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
                if (userId) { this.getWorldCupMatches() }
                //this.getMatchesInfo(userId)
            } else {
                this.setState({ userLoggedIn: false })
                this.getWorldCupMatches()
            }
        })
    }
    getWorldCupMatches = () => {
        var groupAArr = [], groupBArr = [], groupCArr = [], groupDArr = [], groupEArr = [], groupFArr = [], groupGArr = [], groupHArr = [], groupIArr = [], groupJArr = [], groupKArr = [], groupLArr = [], allMatches = []
        this.setState({ eastRound1Arr: [], eastRound2Arr: [], eastroundOf16Arr: [], eastquarterFinalsArr: [], dataAvailable: false, currentEventUserInfo: {} })
        var matchesRef = firebase.database().ref('/theEvents/WorldCup/').child(this.state.theEventKey + '/' + 'groupStage/')
        matchesRef.once('value', dataSnapshot => {
            if (!dataSnapshot.exists()) { this.setState({ groupStagePopulated: false }) }
            else {
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
                this.combineMatchesInfo(round1Arr,'groupAArr',this.state.groupAArr)
                this.combineMatchesInfo(round1Arr,'groupBArr',this.state.groupBArr)
                
            }
        })
    }
    combineMatchesInfo=async(roundArr,groupName,groupArr)=>{
                const updatedGroupAArr= groupArr.map(team => {
                if (roundArr.hasOwnProperty(team.id)) {return { ...team, bet: true };}
                const { bet, ...rest } = team;return rest;});
                this.setState({[groupName]:updatedGroupAArr})    
    }
    getMatchesInfo = async () => {
        var userId = this.state.userId
        var selectedMatchesKeyDb = firebase.database().ref('/users/').child(userId).child("/ramData/upcomingEvents/WorldCup/" + this.state.theEventKey + '/')
        var photoRefDb = firebase.database().ref('/users/').child(userId + '/userData/').child('profilePhoto')
        var userInfoDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/WorldCup/" + this.state.theEventKey + '/details/')
        var userBetsDb = firebase.database().ref('/users/').child(userId).child("/ramData/events/WorldCup/" + this.state.theEventKey + '/bets/')
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
                    //console.log('round 14 item',round2Count,round2Arr)
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
                    //console.log('round 14 item',round2Count,round2Arr)
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
                            //console.log('sweet16Count ', this.state.sweet16Arr)
                        }
                    }
                }
                var elite8Exists = dataSnapshot.child('elite8').exists()
                if (elite8Exists) {
                    var i = 0
                    elite8Arr = theData.elite8
                    //console.log('round 14 item',round2Count,round2Arr)
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
                            //console.log('elite8Arr ', this.state.elite8Arr)
                        }
                    }
                } else {
                    //console.log('elite 8 not existing')
                }
                var final4Exists = dataSnapshot.child('final4').exists()
                if (final4Exists) {
                    var i = 0
                    final4Arr = theData.final4
                    //console.log('round 14 item',round2Count,round2Arr)
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
                            //console.log('final4Arr ', this.state.final4Arr)
                        }
                    }
                }

                var finalRoundExists = dataSnapshot.child('finalRound').exists()
                if (finalRoundExists) {
                    var i = 0
                    finalRoundArr = theData.finalRound
                    //console.log('round 14 item',round2Count,round2Arr)
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
                            //console.log('finalRoundArr ', this.state.finalArr)
                        }
                    }
                }
                return

                var finalRoundExists = dataSnapshot.child('finalRound').exists()
                if (finalRoundExists) { finalRoundArr = theData.finalRound }
                //console.log('round1Exists', round1Exists)
                //console.log('round1 data', theData.round1)
            })
        })
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
        await this.setState({ [e.target.id]: value })
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
            updates[id1] = { id: id1, teamName: this.state.team1Name, points: this.state.team1Points, teamFlag: this.state.team1Flag, outCome: 'N/A', group: group };
            updates[id2] = { id: id2, teamName: this.state.team2Name, points: this.state.team2Points, teamFlag: this.state.team2Flag, outCome: 'N/A', group: group };
            updates[id3] = { id: id3, teamName: this.state.team3Name, points: this.state.team3Points, teamFlag: this.state.team3Flag, outCome: 'N/A', group: group };
            updates[id4] = { id: id4, teamName: this.state.team4Name, points: this.state.team4Points, teamFlag: this.state.team4Flag, outCome: 'N/A', group: group };


            /*  team1Item['id'] = idPart1+'Team1'; team1Item['teamName'] = this.state.team1Name; team1Item['points'] = this.state.team1Points; team1Item['teamFlag'] = this.state.team1Flag; team1Item['outCome'] = 'N/A';team1Item['group'] =group;
              team2Item['id'] = idPart1+'Team2'; team2Item['teamName'] = this.state.team2Name; team2Item['points'] = this.state.team2Points; team2Item['teamFlag'] = this.state.team2Flag; team2Item['outCome'] = 'N/A';team2Item['group'] =group;
              team3Item['id'] = idPart1+'Team3'; team3Item['teamName'] = this.state.team3Name; team3Item['points'] = this.state.team3Points; team3Item['teamFlag'] = this.state.team3Flag; team3Item['outCome'] = 'N/A';team3Item['group'] =group;
              team4Item['id'] = idPart1+'Team4'; team4Item['teamName'] = this.state.team4Name; team4Item['points'] = this.state.team4Points; team4Item['teamFlag'] = this.state.team4Flag; team4Item['outCome'] = 'N/A';team4Item['group'] =group;*/
            //itemArr.push(team1Item);itemArr.push(team2Item);itemArr.push(team3Item);itemArr.push(team4Item)
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
        this.notify('Slection not available at the moment');
        return
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var groupArrName = theGroup + 'Arr', theItem = {}
        var groupArr = this.state[groupArrName]
        chosenTeams = [...new Set(chosenTeams)];
        const count = Object.keys(chosenTeams).length;
        if (count === 2) { this.notify('You can only choose upto 2 teams'); return }
        else {
            theItem[id] = name
            chosenTeams.push(theItem)
            //chosenTeams[id]=name
        }
        const updatedItems = groupArr.map(team => {
            if (team.id === id) {
                return { ...team, bet: true }; // Add/Update the bet field
            }
            return team; // Leave others as they are
        });
        this.setState({ [groupArrName]: updatedItems, chosenTeams })
        // groupArr['bet']=chosenTeams
        console.log('it is 001', chosenTeams)
        console.log('it is', updatedItems, groupArr, chosenTeams, id, name, points, group)//groupBArr
    }
    deselectItems = (id, name, points, group) => {
        this.notify('Slection not available at the moment');
        return
        const idToRemove = id
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var groupArrName = theGroup + 'Arr'
        var groupArr = this.state[groupArrName]
        chosenTeams = chosenTeams.filter(id => id !== idToRemove);
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
    openTheModal= () => {
     this.notify('Slection not available at the moment');
     return
    }
    saveWinners = (group) => {
        var theGroup = group.charAt(0).toLowerCase() + group.slice(1).replace(" ", "");
        var count = Object.keys(chosenTeams).length, updates = {}
        if (count != 2) { this.notify('Two teams must be chosen'); return }
        this.state.chosenTeams.forEach((obj) => {
            const [key, value] = Object.entries(obj)[0];
            // This creates { "groupATeam1": "Mexico", "groupATeam2": "South Africa" }
            updates[key] = value;
        });
        var gamesDataRef = firebase.database().ref('users/').child(this.state.userId + '/ramData/').child('events').child('WorldCup')
        gamesDataRef.child(this.state.theEventKey + '/bets/' + this.state.currentRound).update(updates)
        console.log('chosenTeams updates', updates, this.state.chosenTeams)
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
                {this.state.isAdmin ? <p className={style.winnerPickP} onClick={() => this.setState({ openEnterTeamsModal: group })}>Fill In {group} Teams</p> : <p className={style.winnerPickP} onClick={() => this.notify('Selection not available at the moment')}>Pick {group} Winners</p>}
                {this.state.isAdmin && this.state.openEnterTeamsModal === group ? <div className={style.fillTeamsCont}>
                    <p className={style.teamTitleP}>{group} Team 1</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team1Name' placeholder='Enter team name' type='text' value={this.state.team1Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team1Points' placeholder='Team points' type='number' value={this.state.team1Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team1Flag' placeholder='Paste team flag' type='text' value={this.state.team1Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 2</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team2Name' placeholder='Enter team name' type='text' value={this.state.team2Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team2Points' placeholder='Team points' type='number' value={this.state.team2Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team2Flag' placeholder='Paste team flag' type='text' value={this.state.team2Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 3</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team3Name' placeholder='Enter team name' type='text' value={this.state.team3Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team3Points' placeholder='Team points' type='number' value={this.state.team3Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team3Flag' placeholder='Paste team flag' type='text' value={this.state.team3Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 4</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team4Name' placeholder='Enter team name' type='text' value={this.state.team4Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team4Points' placeholder='Team points' type='number' value={this.state.team4Points} onChange={(event) => this.teamsInputChange(event)}></input>
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
        var thePicks=[]
        return (
            <div className={style.itemComp}>
              <div className={style.groupDiv}><p className={style.groupP}>{group}</p><p className={style.editDivP} onClick={() => this.setState({ openEnterTeamsModal: group })}>Edit</p></div>  
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
                            if (item.bet) {thePicks.push(item.teamName)}
                            console.log('the thePicks',thePicks)
                            var textColor = '#292f51'
                            var selectedToShow = selectedToShow = <div className={style.boxDiv} onClick={() => this.selectedItems(item.id, item.teamName, item.points, item.group)}><MdCheck color="#fff" size={15} /></div>
                            if (item.bet) {
                                selectedToShow = <div className={style.boxDiv3}><MdCheck color="#fff" size={15} onClick={() => this.deselectItems(item.id, item.teamName, item.points, item.group)} /></div>
                            }
                            if (item.outCome === 'Proceed') { textColor = '#1ecb97' }
                            if (item.outCome === 'Eliminated') { textColor = '#CB1E31' }
                            return (
                                <tr id={style.table1Tr2} key={index}>
                                    <td style={{ cursor: 'pointer' }}>{selectedToShow}</td>
                                    <td>
                                        <img className={style.flagImg} src={item.teamFlag} alt={'RAM'} />
                                    </td>
                                    <td>{item.teamName}</td>
                                    <td>{item.points}</td>
                                    <td style={{ color: textColor }}>{item.outCome}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className={style.myPicksDiv}>
                    <p className={style.myPicksP1}>My Picks: {thePicks.length?(thePicks[0]?thePicks[0]:'')+(thePicks[1]?', '+thePicks[1]:''):'N/A'}</p>
                    <p className={style.myPicksP2}>Points Earned: N/A</p>
                </div>
                <p className={style.winnerPickP} style={{ background: '#246fac' }} onClick={() => this.saveWinners(group)}>Save {group} Winners</p>
                              {this.state.isAdmin && this.state.openEnterTeamsModal === group ? <div className={style.fillTeamsCont}>
                    <p className={style.teamTitleP}>{group} Team 1</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team1Name' placeholder='Enter team name' type='text' value={this.state.team1Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team1Points' placeholder='Team points' type='number' value={this.state.team1Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team1Flag' placeholder='Paste team flag' type='text' value={this.state.team1Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 2</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team2Name' placeholder='Enter team name' type='text' value={this.state.team2Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team2Points' placeholder='Team points' type='number' value={this.state.team2Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team2Flag' placeholder='Paste team flag' type='text' value={this.state.team2Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 3</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team3Name' placeholder='Enter team name' type='text' value={this.state.team3Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team3Points' placeholder='Team points' type='number' value={this.state.team3Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team3Flag' placeholder='Paste team flag' type='text' value={this.state.team3Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.teamTitleP}>{group} Team 4</p>
                    <div className={style.teamsInputCont}>
                        <input className={style.teamsInput1} id='team4Name' placeholder='Enter team name' type='text' value={this.state.team4Name} onChange={(event) => this.teamsInputChange(event)}></input>
                        <input className={style.teamsInput2} id='team4Points' placeholder='Team points' type='number' value={this.state.team4Points} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <div>
                        <input className={style.teamsInput3} id='team4Flag' placeholder='Paste team flag' type='text' value={this.state.team4Flag} onChange={(event) => this.teamsInputChange(event)}></input>
                    </div>
                    <p className={style.saveMatchesP} onClick={() => this.saveTeams(group)}>SAVE MATCHES</p>
                </div> : null}
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
    render() {
         var  titleToShow = '',currentBPS='0.00',theCurrentScore='0.00',currentRank='N/A'
    if (this.state.currentRound === 'round1') {titleToShow = 'Group Stage' }
    if (this.state.currentRound === 'round2') { titleToShow = 'Round of 32' }
    if (this.state.currentRound === 'finalRound') {
      if (this.state.theMenu === 'roundOf16') { titleToShow = 'Roun of 16' }
      if (this.state.theMenu === 'quarterFinals') { titleToShow = 'Quarter Finals' }
      if (this.state.theMenu === 'semiFinals') { titleToShow = 'Semi Finals' }
      if (this.state.theMenu === 'final') { titleToShow = 'Finals' }
    }
        return (
            <>
                <div>
                    <div>
                         {/*<div className={style.profileDiv}>
              <div className={style.imageDiv}>
                {this.state.profilePhoto.length ? <img src={this.state.profilePhoto} /> :
                  <IoPersonSharp className={style.personIC} />}
              </div>
              <div className={style.detailsDiv}>
                <p>RAM Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['teamName'] : 'N/A'}</p>
                <p>Flock Name: {this.state.dataAvailable ? this.state.currentEventUserInfo['flockName'] : 'N/A'}</p>
                {this.state.dataAvailable ? <p id={style.editP} onClick={() => this.opeModal2()}>Edit Profile</p> : <p id={style.editP} onClick={() => this.openTheModal()}>Make Picks</p>}
              </div>
            </div>*/}
                        {this.state.isAdmin ? <div className={style.eventCreationDiv}>
                            <p className={style.eventP} onClick={() => this.openMarchMadnessModal()}>Enter Event Details</p>
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
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default WorldCup;