import React, { Component, Image } from 'react';
import style from '../styles/profile.module.scss';
import firebase from '../components/FirebaseClient'
import { IoPersonCircle } from "react-icons/io5";
import Router, { useRouter, withRouter } from 'next/router'
import ProgressBar from '../components/Helper/ProgressBar'
import axios from "axios"

class profile extends Component {
    state = { userId: '', userLoggedIn: '', isAdmin: '', name: '', email: '', showProgressBar: false }
    componentDidMount = () => {
        this.checkAuth()
    }
    checkAuth = () => {
        var flocksDataRef = firebase.database().ref()
        var userId = ''
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userId = user.uid
                console.log('the idddd', userId)
                if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
                    this.setState({ isAdmin: true })
                    var theRef = 'users/' + userId + '/userData/'
                    flocksDataRef.child(theRef).once('value', dataSnapshot => {
                        console.log('dataSnapshot', dataSnapshot.val())
                        this.setState({ name: dataSnapshot.val().name, email: dataSnapshot.val().email })
                    })
                }
                this.setState({ userId, userLoggedIn: true })
            } else { Router.push('/') }
        })
    }
    accountDelete = async () => {

        firebase.auth().signOut().then(()=>{
            this.showProgressBar()
        },(error)=>{
            console.error('Sign Out Error', error);
        });

    }
    showProgressBar = () => {
        this.setState({ showProgressBar: true })
        setTimeout(
            () => { this.setState({ showProgressBar: false }), Router.push('/') },
            3000)
    }
    addData=async()=>{
        const apiEndpoint = 'https://theramtournament.com/getDataGTrafficData&apiKey=82315a13f42fe75c782f5def370b12e9';
        //const apiEndpoint = 'http://localhost:4000/getDataGTrafficData&apiKey=82315a13f42fe75c782f5def370b12e9';
        var theQuery = {id:'123456',name: 'John Doe Mall', category: 'Malls',Location:'Nairobi'};
        theQuery = JSON.stringify(theQuery);
        const response = await axios.post(apiEndpoint, theQuery);
        console.log('response',response.data.message)
        return
    }
    render() {
        return (
            <>
                <div className={style.container}>
                    <div id={style.container2}>
                        <div className={style.imageDiv}>
                            <IoPersonCircle className={style.icProfile} />
                        </div>
                        <p className={style.nameP}>{this.state.name}</p>
                        <p className={style.emailP}>{this.state.email}</p>
                        <p className={style.editP} onClick={() => this.addData()}>Edit Details</p>
                        <p className={style.deleteP} onClick={() => this.accountDelete()}>Delete Account</p>
                        <p className={style.warningP}>Warning!. The above action can not be reversed. Once you delete your account all your information is deleted from our site immediately</p>
                    </div>
                </div>
                {this.state.showProgressBar ? <ProgressBar /> : null}</>
        );
    }
}

export default profile;