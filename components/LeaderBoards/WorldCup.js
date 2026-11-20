import React, { Component } from 'react';
import firebase from '../FirebaseClient';
import styles from './TheMarchMadness.module.scss';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ToastContainer, toast } from 'react-toastify';

class WorldCup extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef(null);
    this.getAlert = this.getAlert.bind(this);
  }

  state = {
    round1Arr: [],
    round2Arr: [],
    currentSelection: 'groupStage',
    theItems: [],
    finalRoundExists: false,
    isAdmin: false,
    userId: '',
    overallArr: [],
    overallRoundExists: '',
    finalRoundArr: [],
    finalRoundMenu: '',
    theCount: ''
  };

  loadBadges=()=>{
    firebase.database().ref('/userBadges').on('value',(snap)=>{
      this.setState({userBadges:snap.val()||{}})
    })
  }
  renderBadges=(uid)=>{
    var all=this.state.userBadges||{}
    var b=all[uid]
    if(!b){return null}
    var keys=Object.keys(b)
    if(!keys.length){return null}
    return (<span style={{marginLeft:5,whiteSpace:'nowrap'}}>
      {keys.map((k)=>{
        var it=b[k]||{}
        var tip=(it.label||'Winner')+(it.year?(' ('+it.year+')'):'')
        return <span key={k} title={tip} style={{marginRight:1}}>{it.icon||'\u{1F3C6}'}</span>
      })}
    </span>)
  }
  renderBadgeAdmin=(item)=>{
    var all=this.state.userBadges||{}
    var b=all[item.id]||{}
    var keys=Object.keys(b)
    return (<span style={{whiteSpace:'nowrap'}}>
      {keys.map((k)=>{
        var it=b[k]||{}
        return <span key={k} style={{marginRight:5}} title={it.label||''}>{it.icon||'\u{1F3C6}'}<span style={{cursor:'pointer',color:'#CB1E31',marginLeft:1,fontWeight:'bold'}} onClick={()=>this.removeBadge(item.id,k)}>{'\u00D7'}</span></span>
      })}
      <span style={{cursor:'pointer',fontWeight:'bold'}} onClick={()=>this.setState({badgeModal:true,badgeUid:item.id,badgeName:item.teamName,badgeIcon:'\u{1F3C6}',badgeLabel:'',badgeYear:''})}>+</span>
    </span>)
  }
  saveBadge=()=>{
    var uid=this.state.badgeUid
    var label=(this.state.badgeLabel||'').trim()
    if(!uid||!label){return}
    var key='b'+new Date().getTime()
    firebase.database().ref('/userBadges/'+uid+'/'+key).set({
      icon:this.state.badgeIcon||'\u{1F3C6}',
      label:label,
      year:String(this.state.badgeYear||'').trim()
    },(err)=>{
      if(!err){this.setState({badgeModal:false,badgeLabel:'',badgeYear:''})}
    })
  }
  removeBadge=(uid,key)=>{
    firebase.database().ref('/userBadges/'+uid+'/'+key).remove()
  }
  componentDidMount = () => {
    this.loadBadges()
    this.checkAuth();
  };

  getAlert() {
    alert('getAlert from Child');
  }

  parseNotification = (val) => {
    return val !== false;
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let isAdmin = false;
        const userId = user.uid;
        if (
          user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' ||
          user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' ||
          user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1'
        ) {
          this.setState({ isAdmin: true });
          isAdmin = true;
        }
        this.setState({ userId, userLoggedIn: true });
        this.getRound1Matches(isAdmin);
        this.getRound2Matches(isAdmin);
        this.getFinalRound(isAdmin);
        this.getOverall(isAdmin);
      } else {
        this.getRound1Matches(false);
        this.getRound2Matches(false);
        this.getFinalRound(false);
        this.getOverall(false);
      }
    });
  };

  getRound1Matches = async (isAdmin) => {
    const leadersRef = firebase.database().ref('/userBets/WorldCup/' + this.props.theEventKey + '/');

    leadersRef.once('value', async (dataSnapshot) => {
      if (!dataSnapshot.exists()) return;

      const userPromises = [];

      dataSnapshot.forEach((data) => {
        const theId = data.key;

        const userTask = (async () => {
          const isTherData = await firebase
            .database()
            .ref('/users/')
            .child(theId)
            .child('/ramData/events/WorldCup/' + this.props.theEventKey + '/bets/round1/')
            .once('value');

          if (isTherData.exists()) {
            let theEmail = 'N/A';
            let thePhone = 'N/A';
            let notificationStatus = true;

            if (isAdmin) {
              const adminSnap = await firebase.database().ref('/users/' + theId + '/userData').once('value');
              if (adminSnap.exists()) {
                const adminData = adminSnap.val();
                theEmail = adminData.email || 'N/A';
                thePhone = adminData.phoneNo || 'N/A';
                notificationStatus = this.parseNotification(adminData.notificationsEnabled);
              }
            }

            const detailsSnap = await firebase
              .database()
              .ref('/users/')
              .child(theId)
              .child('/ramData/events/WorldCup/' + this.props.theEventKey + '/details/')
              .once('value');

            if (detailsSnap.exists()) {
              const userBetData = detailsSnap.val();
              return {
                id: theId,
                flockName: userBetData.flockName,
                teamName: userBetData.teamName,
                bestPossibleScore: userBetData.round1BPS,
                score: userBetData.round1Score || 0,
                email: theEmail,
                phone: thePhone,
                nots: notificationStatus ? 'True' : 'False'
              };
            }
          }
          return null;
        })();

        userPromises.push(userTask);
      });

      const results = await Promise.all(userPromises);
      const finalArray = results.filter((item) => item !== null).sort((a, b) => b.score - a.score);

      this.setState({
        round1Arr: finalArray,
        theItems: finalArray,
        areMessagesAvailable: finalArray.length > 0
      });
    });
  };

  getFinalRound = (isAdmin) => {
    const eventIdsDb = firebase.database().ref('/theEvents/eventsIds/' + this.props.theEventKey + '/currentSelection');
    eventIdsDb.once('value', (dataSnapshot) => {
      this.setState({ finalRoundMenu: dataSnapshot.exists() ? dataSnapshot.val() : false });
    });

    const leadersRef = firebase.database().ref('/userBets/WorldCup/' + this.props.theEventKey + '/');
    leadersRef.once('value', async (dataSnapshot) => {
      if (!dataSnapshot.exists()) {
        this.setState({ finalRoundExists: false });
        return;
      }

      this.setState({ finalRoundExists: true });
      const userPromises = [];

      dataSnapshot.forEach((data) => {
        const theId = data.key;
        const task = (async () => {
          const isTherData = await firebase
            .database()
            .ref('/users/' + theId + '/ramData/events/WorldCup/' + this.props.theEventKey + '/bets/roundOf16/')
            .once('value');

          if (isTherData.exists()) {
            let theEmail = 'N/A';
            let thePhone = 'N/A';
            let notificationStatus = true;

            if (isAdmin) {
              const adminSnap = await firebase.database().ref('/users/' + theId + '/userData').once('value');
              if (adminSnap.exists()) {
                const adminData = adminSnap.val();
                theEmail = adminData.email || 'N/A';
                thePhone = adminData.phoneNo || 'N/A';
                notificationStatus = this.parseNotification(adminData.notificationsEnabled);
              }
            }

            const detailsSnap = await firebase
              .database()
              .ref('/users/' + theId + '/ramData/events/WorldCup/' + this.props.theEventKey + '/details/')
              .once('value');

            if (detailsSnap.exists()) {
              const userBetData = detailsSnap.val();
              const roundOf16BPS = userBetData.roundOf16BPS || 0;
              const quarterFinalsBPS = userBetData.quarterFinalsBPS || 0;
              const semiFinalsBPS = userBetData.semiFinalsBPS || 0;
              const finalRoundBPS = userBetData.finalRoundBPS || 0;
              const roundOf16Score = userBetData.roundOf16Score || 0;
              const quarterFinalsScore = userBetData.quarterFinalsScore || 0;
              const semiFinalsScore = userBetData.semiFinalsScore || 0;
              const finalScore = userBetData.finalScore || 0;

              const score = (
                Number(roundOf16Score) +
                Number(quarterFinalsScore) +
                Number(semiFinalsScore) +
                Number(finalScore)
              ).toFixed(2);

              return {
                id: theId,
                flockName: userBetData.flockName,
                teamName: userBetData.teamName,
                email: theEmail,
                phone: thePhone,
                roundOf16BPS,
                quarterFinalsBPS,
                finalRoundBPS,
                semiFinalsBPS,
                roundOf16Score,
                quarterFinalsScore,
                semiFinalsScore,
                finalScore,
                score,
                nots: notificationStatus ? 'True' : 'False'
              };
            }
          }
          return null;
        })();
        userPromises.push(task);
      });

      const results = await Promise.all(userPromises);
      const finalArray = results.filter((item) => item !== null).sort((a, b) => b.score - a.score);
      this.setState({ finalRoundArr: finalArray });
    });
  };

  getOverall = (isAdmin) => {
    const leadersRef = firebase.database().ref('/userBets/WorldCup/' + this.props.theEventKey);
    leadersRef.once('value', async (dataSnapshot) => {
      if (!dataSnapshot.exists()) {
        this.setState({ overallRoundExists: false });
        return;
      }

      this.setState({ overallRoundExists: true });
      const userPromises = [];

      dataSnapshot.forEach((data) => {
        const theId = data.key;
        const task = (async () => {
          let theEmail = 'N/A';
          let thePhone = 'N/A';
          let notificationStatus = true;

          if (isAdmin) {
            const adminSnap = await firebase.database().ref('/users/' + theId + '/userData').once('value');
            if (adminSnap.exists()) {
              const adminData = adminSnap.val();
              theEmail = adminData.email || 'N/A';
              thePhone = adminData.phoneNo || 'N/A';
              notificationStatus = this.parseNotification(adminData.notificationsEnabled);
            }
          }

          const detailsSnap = await firebase
            .database()
            .ref('/users/' + theId + '/ramData/events/WorldCup/' + this.props.theEventKey + '/details/')
            .once('value');

          if (detailsSnap.exists()) {
            const userBetData = detailsSnap.val();
            const round1Score = userBetData.round1Score || 0;
            const round2Score = userBetData.round2Score || 0;
            const roundOf16Score = userBetData.roundOf16Score || 0;
            const quarterFinalsScore = userBetData.quarterFinalsScore || 0;
            const semiFinalsScore = userBetData.semiFinalsScore || 0;
            const finalScore = userBetData.finalScore || 0;

            const score = (
              Number(round1Score) +
              Number(round2Score) +
              Number(roundOf16Score) +
              Number(quarterFinalsScore) +
              Number(semiFinalsScore) +
              Number(finalScore)
            ).toFixed(2);

            return {
              id: theId,
              flockName: userBetData.flockName,
              teamName: userBetData.teamName,
              round1Score,
              round2Score,
              email: theEmail,
              phone: thePhone,
              roundOf16Score,
              quarterFinalsScore,
              semiFinalsScore,
              finalScore,
              score,
              nots: notificationStatus ? 'True' : 'False'
            };
          }
          return null;
        })();
        userPromises.push(task);
      });

      const results = await Promise.all(userPromises);
      const finalArray = results.filter((item) => item !== null).sort((a, b) => b.score - a.score);
      this.setState({ overallArr: finalArray });
    });
  };

  getRound2Matches = (isAdmin) => {
    const leadersRef = firebase.database().ref('/userBets/WorldCup/' + this.props.theEventKey + '/');
    leadersRef.once('value', async (dataSnapshot) => {
      if (!dataSnapshot.exists()) return;

      const userPromises = [];
      dataSnapshot.forEach((data) => {
        const theId = data.key;
        const task = (async () => {
          const isTherData = await firebase
            .database()
            .ref('/users/' + theId + '/ramData/events/WorldCup/' + this.props.theEventKey + '/bets/round2/')
            .once('value');

          if (isTherData.exists()) {
            let theEmail = 'N/A';
            let thePhone = 'N/A';
            let notificationStatus = true;

            if (isAdmin) {
              const adminSnap = await firebase.database().ref('/users/' + theId + '/userData').once('value');
              if (adminSnap.exists()) {
                const adminData = adminSnap.val();
                theEmail = adminData.email || 'N/A';
                thePhone = adminData.phoneNo || 'N/A';
                notificationStatus = this.parseNotification(adminData.notificationsEnabled);
              }
            }

            const detailsSnap = await firebase
              .database()
              .ref('/users/' + theId + '/ramData/events/WorldCup/' + this.props.theEventKey + '/details/')
              .once('value');

            if (detailsSnap.exists()) {
              const userBetData = detailsSnap.val();
              return {
                id: theId,
                flockName: userBetData.flockName,
                teamName: userBetData.teamName,
                bestPossibleScore: userBetData.round2BPS,
                score: userBetData.round2Score || 0,
                email: theEmail,
                phone: thePhone,
                nots: notificationStatus ? 'True' : 'False'
              };
            }
          }
          return null;
        })();
        userPromises.push(task);
      });

      const results = await Promise.all(userPromises);
      const finalArray = results.filter((item) => item !== null).sort((a, b) => b.score - a.score);
      this.setState({ round2Arr: finalArray });
    });
  };

  getCurrentRound = (round) => {
    if (round === 'groupStage') this.setState({ theItems: this.state.round1Arr });
    if (round === 'roundOf32') this.setState({ theItems: this.state.round2Arr });
    if (round === 'overall') this.setState({ theItems: this.state.overallArr });
    if (round === 'finalRound') this.setState({ theItems: this.state.finalRoundArr });

    this.setState({ currentSelection: round });
  };

  notify = (message) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  render() {
    const sortData = [...this.state.theItems].sort((a, b) => b.score - a.score);

    return (
      <>
        <div>
          <div className={styles.eve2Div}>
            <p
              id={this.state.currentSelection === 'groupStage' ? styles.theSubMenuP2 : null}
              onClick={() => this.getCurrentRound('groupStage')}
            >
              Group Stage
            </p>
            <p
              id={this.state.currentSelection === 'roundOf32' ? styles.theSubMenuP2 : null}
              onClick={() => this.getCurrentRound('roundOf32')}
            >
              Round of 32
            </p>
            <p
              id={this.state.currentSelection === 'finalRound' ? styles.theSubMenuP2 : null}
              onClick={() => this.getCurrentRound('finalRound')}
            >
              Final Round
            </p>
            <p
              id={this.state.currentSelection === 'overall' ? styles.theSubMenuP2 : null}
              onClick={() => this.getCurrentRound('overall')}
            >
              Overall
            </p>
          </div>
          <div className={styles.menu2Div1}>
            {this.state.isAdmin ? (
              <div id={styles.exportDiv}>
                <div id={styles.exportDiv1} onClick={() => this.notify('Downloading...')}>
                  <DownloadTableExcel
                    filename={this.state.theEventKey}
                    sheet="users"
                    currentTableRef={this.tableRef.current}
                  >
                    <p className={styles.exportP}>Export Document</p>
                  </DownloadTableExcel>
                </div>
              </div>
            ) : null}
            <div id={styles.table1Div}>
              <table className={styles.table1} ref={this.tableRef}>
                <thead>
                  <tr id={styles.table1Tr1}>
                    <th>
                      Overall <br />
                      Rank
                    </th>
                    <th>RAM Name</th>
                    <th>Flock Name</th>
                    {this.state.currentSelection === 'groupStage' || this.state.currentSelection === 'roundOf32' ? (
                      <>
                        <th>
                          Best Possible <br />
                          Score
                        </th>
                        <th>Current Score</th>
                      </>
                    ) : null}
                    {this.state.currentSelection === 'finalRound' ? (
                      <>
                        <th>
                          Cumulative <br />
                          Score
                        </th>
                        <th>Round of 16</th>
                        <th>Quarter Finals</th>
                        <th>Semi Finals</th>
                        <th>Finals</th>
                      </>
                    ) : null}
                    {this.state.currentSelection === 'overall' ? (
                      <>
                        <th>
                          Cumulative <br />
                          Score
                        </th>
                        <th>Group Stage</th>
                        <th>Round of 32</th>
                        <th>Round of 16</th>
                        <th>Quarter Finals</th>
                        <th>Semi Finals</th>
                        <th>Finals</th>
                      </>
                    ) : null}
                    {this.state.isAdmin ? (
                      <>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Nots</th>
                        <th>Badges</th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {sortData.map((item, index) => (
                    <tr
                      key={index}
                      id={styles.table1Tr2}
                      style={{
                        backgroundColor:
                          item.id === this.state.userId ? '#292f51' : index === 0 ? '#CB1E31' : null,
                        color: item.id === this.state.userId ? 'white' : index === 0 ? '#ffffff' : '#292f51'
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{item.teamName}{this.renderBadges(item.id)}</td>
                      <td>{item.flockName}</td>
                      {this.state.currentSelection === 'groupStage' || this.state.currentSelection === 'roundOf32' ? (
                        <>
                          <td>{item.bestPossibleScore}</td>
                          <td>{item.score}</td>
                        </>
                      ) : null}
                      {this.state.currentSelection === 'finalRound' ? (
                        <>
                          <td>{this.state.finalRoundExists ? item.score : '0.00'}</td>
                          <td>{this.state.finalRoundExists ? item.roundOf16Score : '0.00'}</td>
                          <td>{this.state.finalRoundExists ? item.quarterFinalsScore : '0.00'}</td>
                          <td>{this.state.finalRoundExists ? item.semiFinalsScore : '0.00'}</td>
                          <td>{this.state.finalRoundExists ? item.finalScore : '0.00'}</td>
                        </>
                      ) : null}
                      {this.state.currentSelection === 'overall' ? (
                        <>
                          <td>{item.score ? item.score : '0.00'}</td>
                          <td>{item.round1Score ? item.round1Score : '0.00'}</td>
                          <td>{item.round2Score ? item.round2Score : '0.00'}</td>
                          <td>{item.roundOf16Score ? item.roundOf16Score : '0.00'}</td>
                          <td>{item.quarterFinalsScore ? item.quarterFinalsScore : '0.00'}</td>
                          <td>{item.semiFinalsScore ? item.semiFinalsScore : '0.00'}</td>
                          <td>{item.finalScore ? item.finalScore : '0.00'}</td>
                        </>
                      ) : null}
                      {this.state.isAdmin ? (
                        <>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.nots}</td>
                          <td>{this.renderBadgeAdmin(item)}</td>
                        </>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
         {this.state.badgeModal?<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.55)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>this.setState({badgeModal:false})}>
           <div style={{backgroundColor:'#fff',padding:20,borderRadius:8,width:320,maxWidth:'90%'}} onClick={(e)=>e.stopPropagation()}>
             <h3 style={{marginTop:0,marginBottom:4,color:'#292f51'}}>Add badge</h3>
             <p style={{marginTop:0,marginBottom:14,color:'#292f51',fontSize:13}}>{this.state.badgeName}</p>
             <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Icon</label>
             <select value={this.state.badgeIcon||'\u{1F3C6}'} onChange={(e)=>this.setState({badgeIcon:e.target.value})} style={{width:'100%',padding:6,marginBottom:10}}>
               <option value={'\u{1F40F}'}>{'\u{1F40F}'} Ram</option>
               <option value={'\u{1F3C6}'}>{'\u{1F3C6}'} Trophy</option>
               <option value={'\u{1F947}'}>{'\u{1F947}'} Gold medal</option>
               <option value={'\u{1F948}'}>{'\u{1F948}'} Silver medal</option>
               <option value={'\u{1F949}'}>{'\u{1F949}'} Bronze medal</option>
               <option value={'\u{1F37A}'}>{'\u{1F37A}'} Pint glass</option>
               <option value={'\u{1F451}'}>{'\u{1F451}'} Crown</option>
               <option value={'\u2B50'}>{'\u2B50'} Star</option>
               <option value={'\u{1FA9C}'}>{'\u{1FA9C}'} Ladder</option>
             </select>
             <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Label</label>
             <input value={this.state.badgeLabel||''} onChange={(e)=>this.setState({badgeLabel:e.target.value})} placeholder='2026 Champion' style={{width:'100%',padding:6,marginBottom:10,boxSizing:'border-box'}}/>
             <label style={{display:'block',fontSize:12,color:'#292f51',marginBottom:3}}>Year</label>
             <input value={this.state.badgeYear||''} onChange={(e)=>this.setState({badgeYear:e.target.value})} placeholder='2026' style={{width:'100%',padding:6,marginBottom:16,boxSizing:'border-box'}}/>
             <div style={{display:'flex',justifyContent:'flex-end'}}>
               <button onClick={()=>this.setState({badgeModal:false})} style={{marginRight:8,padding:'6px 12px',cursor:'pointer'}}>Cancel</button>
               <button onClick={()=>this.saveBadge()} style={{padding:'6px 12px',backgroundColor:'#CB1E31',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Add badge</button>
             </div>
           </div>
         </div>:null}
          <ToastContainer />
      </>
    );
  }
}

export default WorldCup;
