import React, { Component } from 'react'
import styles from './DetailsModal3.module.scss'
import { MdLockOutline ,MdArrowDropDown,MdInfoOutline,MdCheck,MdOutlineKeyboardArrowRight,MdOutlinePersonOutline } from "react-icons/md";
import firebase from '../FirebaseClient'
import localStorage from 'local-storage'
import Checkbox from "react-custom-checkbox";
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../Helper/ProgressBar'
import Router from 'next/router';
var flockTeamName=''
const mainCard=[
  {id:1,matchNo:1,time:'Nov 3 2024, 03:00PM',player1:'Brandon Moreno-Mexico',p1Rec:'21-8-2',p1Points:'1.42',player2:'Amir Albazi-Iraq',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player1.png',p2Photo:'player2.png',status1:'notPlayed',bestPossibleScore:'', status2:'',bet:'player2',winner:'player1',match:'Mens Flyweight'},
  {id:2,matchNo:2,time:'Nov 3 2024, 03:00PM',player1:'Erin Blanchfield-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Rose Namajunas-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player3.png',p2Photo:'player4.png',status1:'ongoing',bestPossibleScore:'',status2:'',bet:'player1',winner:'player2',match:'Womens Flyweight'},
  {id:3,matchNo:3,time:'Nov 3 2024, 03:00PM',player1:'Derrick Lewis-USA',p1Rec:'21-8-2',p1Points:'1.42',player2:'Jhonata Diniz-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player5.png',p2Photo:'player6.png',status1:'played',bestPossibleScore:'',status2:'',bet:'player2',winner:'player1',match:'Mens Heavyweight'},
  {id:4,matchNo:4,time:'Nov 3 2024, 03:00PM',player1:'Caio Machado-Brazil',p1Rec:'21-8-2',p1Points:'1.42',player2:'Brendson Ribeiro-Brazil',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player7.png',p2Photo:'player8.png',status1:'played',bestPossibleScore:'',status2:'',bet:'player2',winner:'player2',match:'Mens Light Heavyweight'},
  {id:5,matchNo:5,time:'Nov 3 2024, 03:00PM',player1:'Marc Andre Barriault-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Dustin Stoltzfus-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player9.png',p2Photo:'player10.png',status1:'played',status2:'',bet:'player1',winner:'player1',match:'Mens Middleweight'},
  {id:6,matchNo:6,time:'Nov 3 2024, 03:00PM',player1:'Mike Malott-Canada',p1Rec:'21-8-2',p1Points:'1.42',player2:'Trevin Giles-USA',p2Rec:'17-1-0',p2Points:'6.48',stat:'player', game:'UFC',p1Photo:'player11.png',p2Photo:'player12.png',status1:'played',status2:'',bestPossibleScore:'',bet:'player1',winner:'player2',match:'Mens Welterweight'},
  ]

class DetailsModal extends Component {
  state={}
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
  openFlockModal=()=>{
    if (navigator.onLine === false) {
      this.notify('No internet! please check your internet connection')
      return
    }
    this.setState({flockNameModal:!this.state.flockNameModal})
  }
  render() {
    var theEvent=''
    if(this.props.currentEvent==='ramUfc'){theEvent='RAM UFC'}
    return (
      <><div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
                    <div className={styles.listCont}>
                    <p className={styles.eventTitle}>March Madness 2026 - Round of 64</p>
                    <p className={styles.teamName}>RAM Name: Cleo Malick</p>
                    <p className={styles.flockName}>Flock Name: Kim Zeus</p>
        {mainCard.map((item,index)=>{
          var theId=item.id
          var theBet=item.bet         
          var player1Points=item.p1Points
          var player2Points=item.p2Points
          var details1=item.player1
          var details2=item.player2
          var tableArray=[details1+'#'+item.p1Points+'#'+item.bet,details2+'#'+item.p2Points+'#'+item.bet]
          var yourPick='N/A'
          var pickCol='#CB1E31'
          if(item.bet==='player1'){yourPick=item.player1,pickCol='#1ecb97'}
          if(item.bet==='player2'){yourPick=item.player2,pickCol='#1ecb97'}
          return(
           <div className={styles.listDiv} key={index}>
           <p className={styles.matchP}>Match #{index+1}</p>
           <div id={styles.table1Div}>
                        <table className={styles.table1}>
                            {/*<tr id={styles.table1Tr1}>
                                <th><div className={styles.boxDiv}><MdCheck color="#292f51" size={15} /></div></th>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>*/}
                            {tableArray.map((item, index) => {
                              var theItem=item?.split('#')
                              var selected=theItem[2]
                             //console.log('the item',item)
                              var selectedToShow=selectedToShow=<div className={styles.boxDiv2} onClick={()=>this.selectedItems(theId,index,theBet,player1Points,player2Points)}><MdCheck color="#fff" size={15} /></div>
                              if(index===0&&selected==='player1'){
                                selectedToShow=<div className={styles.boxDiv3}><MdCheck color="#fff" size={15} onClick={()=>this.selectedItems(theId,index,theBet,player1Points,player2Points)}/></div>
                              }
                              if(index===1&&selected==='player2'){
                                selectedToShow=<div className={styles.boxDiv3}><MdCheck color="#fff" size={15} onClick={()=>this.selectedItems(theId,index,theBet,player1Points,player2Points)}/></div>
                              }
                              return(
<tr  id={styles.table1Tr2} key={index}>
                                         <td style={{cursor:'pointer'}}>
           {selectedToShow}
           </td>
                                        <td>{theItem[0]}</td>
                                        <td>+{theItem[1]}</td>
                                        </tr>
                              )
                            })}
                                        </table> </div>
           </div>
          )})}</div>
                    
                </div>
               
               </>
    )
  }
}

export default DetailsModal