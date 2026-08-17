import React, { Component } from 'react';
import style from './HallOfFame.module.scss';
import firebase from '../FirebaseClient';
import { ToastContainer, toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";

class HallOfFame extends Component {
  state = {
    nflArr: [],
    ncaafArr: [],
    ncaabArr: [],
    fifaArr: [],
    showModal: false,
    sportType: 'NCAAB',
    flockName: '',
    points: '',
    win: '',
    year: '',
    errMsg: '',
    isAdmin:false
  };

  componentDidMount = () => {
    this.checkAuth();
    this.getData();
  };
checkAuth = () => {
    var userId = ''
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid
        //console.log('userIddddddd',userId)
        if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
          this.setState({ isAdmin: true })
        }}
    })
  }
  getData = () => {
    var hallOfFameRef = firebase.database().ref('/hallOfFame/');
    hallOfFameRef.once('value', (dataSnapshot) => {
      var nflArr = [], ncaafArr = [], ncaabArr = [], fifaArr = [];
      dataSnapshot.forEach((child) => {
        var id = child.key;
        var item = child.val();
        item['id']=id
        if (item.sportType === 'NCAAB') ncaabArr.push(item);
        if (item.sportType === 'NCAAF') ncaafArr.push(item);
        if (item.sportType === 'FIFA') fifaArr.push(item);
        if (item.sportType === 'NFL') nflArr.push(item);
        ncaabArr=ncaabArr.sort(function(a, b){return b.year - a.year})
        fifaArr=fifaArr.sort(function(a, b){return b.year - a.year})
        ncaafArr=ncaafArr.sort(function(a, b){return b.year - a.year})
        nflArr=nflArr.sort(function(a, b){return b.year - a.year})
        console.log('fifaArr',fifaArr)
      });
      this.setState({ nflArr, ncaafArr, ncaabArr, fifaArr });
    });
  };
      deleteWinner=(id,sport)=>{
        var theDb = firebase.database().ref('/hallOfFame/')
        theDb.child(id).set(null)
        this.setState((prevState) => ({
        [sport]: prevState[sport].filter(item => item.id !== id)
    }));
    this.notify('Deleted successfully');
      }
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      sportType: 'NCAAB',
      flockName: '',
      points: '',
      win: '',
      year: '',
      errMsg: ''
    }));
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { sportType, flockName, points, win, year, ncaabArr, fifaArr, ncaafArr, nflArr } = this.state;

    // Validate all fields
    if (!flockName.trim() || !points || !win.trim() || !year) {
      this.notify('Please fill out all fields before submitting.');
      return;
    }
 
    // Determine sequence index for ID formatting (e.g. hof_nfl_01)
    let currentArr = [];
    if (sportType === 'NCAAB') currentArr = ncaabArr;
    else if (sportType === 'FIFA') currentArr = fifaArr;
    else if (sportType === 'NCAAF') currentArr = ncaafArr;
    else if (sportType === 'NFL') currentArr = nflArr;

    const count = currentArr.length + 1;
    const formattedCount = String(count).padStart(2, '0');
    const customId = `hof_${sportType.toLowerCase()}_${formattedCount}`;

    const newRecord = {
      sportType,
      flockName: flockName.trim(),
      points: parseFloat(points),
      win: win.trim(),
      year: parseInt(year, 10)
    };

    // Save to Firebase under generated ID
    firebase
      .database()
      .ref(`/hallOfFame/${customId}`)
      .set(newRecord, (error) => {
        if (!error) {
          this.getData();
          this.toggleModal();
          this.notify('Added successfully');
        } else {
          this.notify('Error uploading to Firebase. Try again.');
        }
      });
  };
     notify = (message) => {
        toast.warn(message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    };

  render() {
    return (
      <><div className={style.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>THE LEGEND OF "RAMMY"</h2>
          
        </div>

        <div className={style.mainDiv}>
          <div className={style.leftDiv}>
            {this.state.isAdmin?<div onClick={this.toggleModal} style={styles.addBtn}>
            + Add Winner
          </div>:null}
            <h3>MAJOR TOURNAMENTS</h3>
            <h4>NCAA MARCH MADNESS TOURNAMENT</h4>
            {this.state.ncaabArr.map((item, index) => (
              <div className={style.listDiv} key={index}>
                {this.state.isAdmin?<div  className={style.deleteDiv} onClick={()=>this.deleteWinner(item.id,'ncaabArr')}><MdDeleteOutline color='#CB1E31'/></div>:null}
                <p>
                  <span className={style.span1}>{item.year}</span>
                  <span className={style.span2}>{' | ' + item.flockName}</span>
                  <span className={style.span3}>{item.points + ' (pts)'}</span>
                  <span className={style.span4}>{' - ' + item.win}</span>
                </p>
              </div>
            ))}

            <h4>FIFA WORLD CUP</h4>
            {this.state.fifaArr.map((item, index) => (
              <div className={style.listDiv} key={index}>
                {this.state.isAdmin?<div  className={style.deleteDiv} onClick={()=>this.deleteWinner(item.id,'fifaArr')}><MdDeleteOutline color='#CB1E31'/></div>:null}
                <p>
                  <span className={style.span1}>{item.year}</span>
                  <span className={style.span2}>{' | ' + item.flockName}</span>
                  <span className={style.span3}>{item.points + ' (pts)'}</span>
                  <span className={style.span4}>{' - ' + item.win}</span>
                </p>
              </div>
            ))}

            <h3>COMPETITIONS</h3>
            <h4>NHL PLAYOFFS COMPETITION</h4>
            {this.state.ncaafArr.map((item, index) => (
              <div className={style.listDiv} key={index}>
                {this.state.isAdmin?<div  className={style.deleteDiv} onClick={()=>this.deleteWinner(item.id, 'ncaafArr')}><MdDeleteOutline color='#CB1E31'/></div>:null}
                <p>
                  <span className={style.span1}>{item.year}</span>
                  <span className={style.span2}>{' | ' + item.flockName}</span>
                  <span className={style.span3}>{item.points + ' (pts)'}</span>
                  <span className={style.span4}>{' - ' + item.win}</span>
                </p>
              </div>
            ))}

            <h4>NFL PLAYOFFS COMPETITION</h4>
            {this.state.nflArr.map((item, index) => (
              <div className={style.listDiv} key={index}>
                {this.state.isAdmin?<div  className={style.deleteDiv} onClick={()=>this.deleteWinner(item.id,'fifaArr')}><MdDeleteOutline color='#CB1E31'/></div>:null}
                <p>
                  <span className={style.span1}>{item.year}</span>
                  <span className={style.span2}>{' | ' + item.flockName}</span>
                  <span className={style.span3}>{item.points + ' (pts)'}</span>
                  <span className={style.span4}>{' - ' + item.win}</span>
                </p>
              </div>
            ))}
          </div>

          <div className={style.rightDiv}>
            <h5>CLIMB TO THE TOP</h5>
            <p>
              The Rammy is our highest and most prestigious award. This is for a full tournament winner and takes cunning, analytics and luck.
            </p>
            <p>
              These are the traits required to be the Ram above all Rams. The legend of the "Rammy" requires that one Ram rises above the others to lead his flock and the herd to greatness. Through trials, tribulations and sacrifice, that Ram emerged victorious to show the sheep that followed a better way to consume sports tournaments for entertainment
            </p>
            <p>They say that once the iconic "Rammy" made it to the top of the mountain it never left the pinnacle again.</p>
          </div>
        </div>

        {/* Inline CSS Modal */}
        {this.state.showModal && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <span style={styles.closeBtn} onClick={this.toggleModal}>
                &times;
              </span>
              <h3 style={styles.modalTitle}>Add Winner</h3>

              {this.state.errMsg && <div style={styles.errorText}>{this.state.errMsg}</div>}

              <form onSubmit={this.handleSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Sport Type</label>
                  <select
                    name="sportType"
                    value={this.state.sportType}
                    onChange={this.handleInputChange}
                    style={styles.input}
                  >
                    <option value="NCAAB">NCAA March Madness (NCAAB)</option>
                    <option value="FIFA">FIFA World Cup (FIFA)</option>
                    <option value="NCAAF">NHL Playoffs (NCAAF)</option>
                    <option value="NFL">NFL Playoffs (NFL)</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Flock Name</label>
                  <input
                    type="text"
                    name="flockName"
                    placeholder="Enter flock name"
                    value={this.state.flockName}
                    onChange={this.handleInputChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Points</label>
                  <input
                    type="number"
                    step="any"
                    name="points"
                    placeholder="Enter points (e.g. 89.58)"
                    value={this.state.points}
                    onChange={this.handleInputChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Win Title</label>
                  <input
                    type="text"
                    name="win"
                    placeholder="e.g. RAMMY WINNER! or PINT GLASS WINNER"
                    value={this.state.win}
                    onChange={this.handleInputChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Year</label>
                  <input
                    type="number"
                    name="year"
                    placeholder="Enter year (e.g. 2026)"
                    value={this.state.year}
                    onChange={this.handleInputChange}
                    style={styles.input}
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div><ToastContainer /></>
    );
  }
}

// Inline CSS Object
const styles = {
  addBtn: {
    //backgroundColor: '#2d3250',
    color: '#2d3250',
    border: '1px solid #2d3250',
    borderRadius: '4px',
    padding: '5px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width:'120px'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#ffffff',
    width: '380px',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'relative',
    fontFamily: 'inherit'
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '20px',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333333',
    cursor: 'pointer'
  },
  modalTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#2d3250'
  },
  inputGroup: {
    marginBottom: '14px'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#555555',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#333333',
    boxSizing: 'border-box',
    outline: 'none'
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#2d3250',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '13px',
    marginBottom: '12px'
  }
};

export default HallOfFame;