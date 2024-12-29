import React, { Component } from 'react'
import styles from "./NCAAModal.module.scss";
import { BsFillLightningFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../FirebaseClient'
import ProgressBar from '../Helper/ProgressBar'
var theImage1='https://images.pexels.com/photos/17650220/pexels-photo-17650220/free-photo-of-can-of-sprite-on-white-background.jpeg?auto=compress&cs=tinysrgb&w=600'
var theImage2='https://images.pexels.com/photos/19882427/pexels-photo-19882427/free-photo-of-elevate-your-style-with-vibrant-kicks-explore-a-spectrum-of-colors-in-our-sneaker-collection-step-into-bold-hues-and-showcase-your-unique-footwear-fashion.jpeg?auto=compress&cs=tinysrgb&w=600'
const firstRoundEdit=[
    {id:'idilulya1',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'First Round'},
    {id:'idilulya2',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'First Round'},
    {id:'idilulya3',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'First Round'},
    {id:'idilulya4',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'First Round'},
    ]
const quarterFinalsEdit=[
      {id:'idilulya5',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'Quarter Finals'},
      {id:'idilulya6',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'Quarter Finals'},
      {id:'idilulya7',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'Quarter Finals'},
      {id:'idilulya8',time:'2024-12-14T19:00:00Z',timeInMillis:0,player1:'Team 1',p1Points:'',p1Rec:'2-5-6',p2Rec:'1-2-3',player2:'player 2',p2Points:'',p1Photo:theImage1,p2Photo:theImage2,match:'Quarter Finals'},
    ]

class NCAAModal extends Component {
  state={firstRoundEdit,quarterFinalsEdit,submitErr:"",showProgressBar:false}
    doNothing=(event)=>{
        event.preventDefault()
        event.stopPropagation()
       }
       inputChange = async (e,index,type) => {
        var value = e.target.value
        console.log('theId', e.target.id)
        if(type==='first round'){
          firstRoundEdit[index][e.target.id]=value
          await this.setState({firstRoundEdit})
          console.log("firstRoundEdit",firstRoundEdit)
        }
        if(type==='quarter finals'){
          quarterFinalsEdit[index][e.target.id]=value
          await this.setState({quarterFinalsEdit})
          console.log("quarterFinalsEdit",quarterFinalsEdit)
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
      showProgressBar=()=>{
        this.setState({showProgressBar:true})
        this.timerHandle = setTimeout(
          () => this.setState({showProgressBar:false}), 
          5000)
      }
       submitMatches=()=>{
  this.showProgressBar()
  var eventKey='NCAAF_2024-2025'
  var generalDb=firebase.database().ref('/events1000/ncaaf/'+eventKey+'/')
  var eventsIdDb=firebase.database().ref('/events1000/')
  if (navigator.onLine === false) {
    this.notify('No internet! please check your internet connection')
    return
  }
  var i=0,allItems=[],theItems=[...firstRoundEdit,...quarterFinalsEdit]
  theItems.map((item,index)=>{
  i++
  if(item.id===''||item.time===''||item.player1===''||item.p1Rec===''||item.p2Rec===''||item.player2===''||item.p1Photo===''||item.p2Photo===''){
    this.setState({submitErr:'All items must be filled'})
    this.notify('All items must be filled')
    this.setState({showProgressBar:false})
    return
  }
  theItems[index]['timeInMillis']=new Date(item.time).getTime()
    allItems.push(item)
    if(theItems.length===i){
      var toDbFirstArr={},toDbQuarterAr={},v=0
     
      allItems.map((item)=>{
        v++
        if(item.match==='First Round'){
          toDbFirstArr[item.id]=item
        }else{
          toDbQuarterAr[item.id]=item
        }
        var theArr={time:1734728400000,sportType:'NCAAF',title:'NCAAF 2024-2025'}
        console.log('toDbFirstArr',toDbFirstArr)
        console.log('toDbQuarterAr',toDbQuarterAr)
        if(theItems.length===v){
          console.log('kufinish kumalo',toDbFirstArr,toDbQuarterAr)
          eventsIdDb.child('eventsIds/'+eventKey+'/').update(theArr)
          generalDb.child('firstRound').update(toDbFirstArr)
          generalDb.child('quarterFinals').update(toDbQuarterAr,(error) => {
            if (error) {
              this.notify('An error occured while uploading data')
              this.setState({showProgressBar:false})
            }else{
              this.notify('Data uploaded successfully')
              this.setState({showProgressBar:false})
              this.props.onClick()
            }
        })
        }
      })
      console.log('allItems',allItems)
    }
   
  })
       }
       itemComponent=(compItems,eventType,type)=>{
        return(
          compItems.map((item,index)=>{
            return(
           <div className={styles.listDiv} key={index}>
                  <div className={styles.theCont0}>
                        <div className={styles.theCont01}>
                          <p>{eventType}</p>
                          <p>{item.time}</p>
                        </div>
                        <div className={styles.theCont}>
                        <div className={styles.theContLeft}>
                          <div className={styles.imgDiv1}>
                        {item.p1Photo!==''?<img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img>:<RiTeamFill className={styles.teamIC}/>}
                        </div>
                        <input className={styles.P1} id='id' value={item.id} placeholder='Enter match id' onChange={(event)=>this.inputChange(event,index,type)}/>
                        <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter team 1 logo' onChange={(event)=>this.inputChange(event,index,type)}/>
                        <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' onChange={(event)=>this.inputChange(event,index,type)}/>
                        <input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>
                        </div>
                        <BsFillLightningFill className={styles.sepIc}/>
                        <div className={styles.theContRight}>
                        <div className={styles.imgDiv2}>
                        {item.p2Photo!==''?<img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img>:<RiTeamFill className={styles.teamIC}/>}    
                        </div>
                        <input className={styles.P1} id='time' value={item.time} placeholder='Enter match time' onChange={(event)=>this.inputChange(event,index,type)}/>
                        <input className={styles.P2} id='p2Photo' value={item.p2Photo} placeholder='Enter team 2 logo' onChange={(event)=>this.inputChange(event,index,type)}/>
                        <input className={styles.P2} id='player2' value={item.player2} placeholder='Enter team 2 name' onChange={(event)=>this.inputChange(event,index,type)}/>
                        <input className={styles.P2} id='p2Rec' value={item.p2Rec} placeholder='Enter team 2 record' onChange={(event)=>this.inputChange(event,index,type)}/>
                        </div>
                        </div>
                        </div>       
           </div>
            )})
      )
      }
       render() {
    return (
      <><div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
        
          <p className={styles.headP}>Enter NCAAF Match Details</p>
        <div className={styles.divCont}>
        <p className={styles.listHeadP}>First Round</p>
       <div className={styles.listCont}>{this.itemComponent(firstRoundEdit,'NCAAF First Round','first round')}</div></div>
        <div className={styles.divCont}>
        <p className={styles.listHeadP}>Quarter Finals</p>
        <div className={styles.listCont}>{this.itemComponent(quarterFinalsEdit,'NCAAF Quarter Finals','quarter finals')}</div></div>
        <button className={styles.submitBtn} onClick={()=>this.submitMatches()}>Submit</button>
      </div>
      {this.state.showProgressBar?<ProgressBar/>:null}
       <ToastContainer/>
       </>
    )
  }
}

export default NCAAModal