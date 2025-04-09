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
  state={firstRoundEdit,quarterFinalsEdit,submitErr:"",showProgressBar:false,isItSubmit:false}
   
  componentDidMount=()=>{
    var eventKey='NCAAF_'+new Date().getFullYear()+'-'+(new Date().getFullYear()+1)
    console.log('the event key',eventKey)
    console.log('the info',this.props.itemsToModal,this.props.eventToModal,this.props.theEventKey)
   // return
  }
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
  var eventKey='NCAAF_'+new Date().getFullYear()+'-'+(new Date().getFullYear()+1)
  var theTitle='NCAAF '+new Date().getFullYear()+'-'+(new Date().getFullYear()+1)
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
        var theArr={time:1734728400000,sportType:'NCAAF',title:theTitle}
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
              compItems.map((item, index) => {
                return (
                  <div className={styles.listDiv} key={index}>
                    <div className={styles.theCont0}>
                      <div className={styles.theCont01}>
                        <p>{item.matchType+' Match '+(index+1)}</p>
                        <p>{item.time.commenceTime}</p>
                      </div>
                      <div className={styles.theCont}>
                        <div className={styles.theContLeft}>
                          <div className={styles.imgDiv1}>
                            {item.p1Photo !== '' ? <img className={styles.theImg1} src={item.p1Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                          </div>
                          
                          <input className={styles.P1} id='apiId' value={item.apiId}  placeholder='Enter uid from odds api' onChange={(event) => this.inputChange(event, index, type)} />
                          <input className={styles.P2} id='p1Photo' value={item.p1Photo} placeholder='Enter team 1 Logo' readOnly/>
                          <input className={styles.P2} id='player1' value={item.player1} placeholder='Enter team 1 name' readOnly/>
                          {/*<input className={styles.P2} id='p1Rec' value={item.p1Rec} placeholder='Enter team 1 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                        </div>
                        <BsFillLightningFill className={styles.sepIc} />
                        <div className={styles.theContRight}>
                          <div className={styles.imgDiv2}>
                            {item.p2Photo !== '' ? <img className={styles.theImg1} src={item.p2Photo} alt='RAM'></img> : <RiTeamFill className={styles.teamIC} />}
                          </div>
                          <input className={styles.P1} id='team2Id'  value={item.commenceTime} placeholder='Enter team 2 id' readOnly/>
                          <input className={styles.P2} id='p2Photo' value={item.p2Photo} placeholder='Enter team 2 logo' readOnly />
                          <input className={styles.P2} id='player2' value={item.player2} placeholder='Enter team 2 name' readOnly />
                          {/*<input className={styles.P2} id='p2Rec' value={item.p2Rec} placeholder='Enter team 2 record' onChange={(event)=>this.inputChange(event,index,type)}/>*/}
                        </div>
                      </div>
                      <p className={styles.errorP}>{item.error}</p>
                    </div>
        
                  </div>
                )
              })
            )})
      )
      }
       render() {
    return (
      <><div className={styles.container2} onClick={(event)=>this.doNothing(event)}>
        
          <p className={styles.headP}>Enter NCAAF Match Details</p>
        {this.state.currentSelection==='firstRound'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>First Round</p>
       <div className={styles.listCont}>{this.itemComponent(firstRoundEdit,'NCAAF First Round','first round')}</div></div>:null}
       {this.state.currentSelection==='quarterFinals'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>Quarter Finals</p>
        <div className={styles.listCont}>{this.itemComponent(quarterFinalsEdit,'NCAAF Quarter Finals','quarter finals')}</div></div>:null}
        {this.state.currentSelection==='semiFinals'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>Semi Finals</p>
        <div className={styles.listCont}>{this.itemComponent(quarterFinalsEdit,'NCAAF Semi Finals','semi finals')}</div></div>:null}
        {this.state.currentSelection==='finals'?<div className={styles.divCont}>
        <p className={styles.listHeadP}>Finals</p>
        <div className={styles.listCont}>{this.itemComponent(quarterFinalsEdit,'NCAAF Finals','Finals')}</div></div>:null}
        {this.state.isItSubmit?<div className={styles.submitDiv}>
        <button className={styles.cancelBtn} onClick={()=>this.cancelEdit()}>Cancel</button>
        <button className={styles.submitBtn2} onClick={() => this.sendToDatabase()}>Submit</button>
        </div>:<button className={styles.submitBtn} onClick={()=>this.submitMatches()}>Preview</button>}
      </div>
      {this.state.showProgressBar?<ProgressBar/>:null}
       <ToastContainer/>
       </>
    )
  }
}

export default NCAAModal