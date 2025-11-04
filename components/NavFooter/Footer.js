import React, { Component } from 'react'
import styles from './Footer.module.scss';
import Link from 'next/link';
import firebase from '../FirebaseClient'
import Router, { withRouter } from 'next/router';
export class Footer extends Component {
  state={isAdmin:false}
  componentDidMount=()=>{
    this.checkAuth()
  }
  checkAuth = () => {
    var userId=''
    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       userId=user.uid
       if(user.uid==='iHA7kUpK4EdZ7iIUUV0N7yvDM5G3'||user.uid==='zZTNto5p3XVSLYeovAwWXHjvkN43'||user.uid==='vKBbDsyLvqZQR1UR39XIJQPwwgq1'){
        this.setState({isAdmin:true})
       }
    }
   })
 }
  render() {
    return (
      <div className={styles.container}>
         <div className={styles.footerDiv}>
         <div className={styles.footerDiv1}>
         <Link href="/" style={{textDecoration:'none'}}><img style={{cursor:'pointer'}}  src={"ramicon.png"} ></img></Link>
         </div>
          <div className={styles.footerDiv2}>
          <Link href="/" className={styles.linkP}>HOME</Link>
          <Link href="/about" className={styles.linkP}>ABOUT US</Link>
          <Link href="/events" className={styles.linkP}>EVENT SCORES</Link>
          {/*<Link href="/leaderboard" className={styles.linkP}>LEADERBOARD</Link>*/}
          {this.state.isAdmin?<Link href="/admin" className={styles.linkP}>ADMIN</Link>:null}
          {/*<Link href="/" className={styles.linkP}>CONTACT US</Link>*/}
          </div>
          <div className={styles.footerDiv3}>
            <p>Copyright © 2025 RAM. All Rights Reserved</p>
          </div>
          {/*<p className={styles.footNote}>Developed by Clement 0724998745</p>*/}
        </div>
      </div>
    )
  }
}

export default Footer
