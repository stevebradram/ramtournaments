import React, { Component, Image } from 'react';
import style from '../styles/profile.module.scss';
import firebase from '../components/FirebaseClient'
import { IoPersonCircle } from "react-icons/io5";
import Router, { useRouter, withRouter } from 'next/router'
import ProgressBar from '../components/Helper/ProgressBar'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

class profile extends Component {
    state = { userId: '', userLoggedIn: '', isAdmin: '', name: '', email: '', phoneNo: '', showProgressBar: false, editName: '', editNameErr: '', editPhoneNumber: '', editPhoneNumberErr: '', editDetailsModal: true }
    componentDidMount = () => {
        this.checkAuth()
    }
    checkAuth = () => {
        var flocksDataRef = firebase.database().ref()
        var userId = ''
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userId = user.uid
                //console.log('the idddd', userId)
                if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
                    this.setState({ isAdmin: true })
                    var theRef = 'users/' + userId + '/userData/'
                    flocksDataRef.child(theRef).once('value', dataSnapshot => {
                        //console.log('dataSnapshot', dataSnapshot.val())
                        this.setState({ name: dataSnapshot.val().name, editName: dataSnapshot.val().name, editPhoneNumber: dataSnapshot.val().phoneNo, email: dataSnapshot.val().email, phoneNo: dataSnapshot.val().phoneNo })
                    })
                }
                this.setState({ userId, userLoggedIn: true })
            } else { Router.push('/') }
        })
    }
        reAuthUser = () => {
        var credential = auth.EmailAuthProvider.credential(this.state.email, this.state.password);
        try {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    user.reauthenticateWithCredential(credential).then(() => {
                        this.proceed(user)
                    })
                        .catch((error) => {
                            console.error("Re-authentication failed 898989", error);
                            this.setState({passwordErr:'Incorrect password'})
                            this.notify('Incorrect password')
                        });
                } else {
                    this.notify('No user found')
                }
            })
        } catch (error) {
            console.error("Re-authentication failed", error);
            this.notify('An error occured while deleting account, try again later')
        }
    }
    accountDelete = async () => {
        var generalRef = firebase.database().ref()
        generalRef.child('accountsToBeDeleted').child(this.state.userId).set(new Date().getTime(), (error) => {
            if (!error) {
                this.notify('Success deleting account')
               // user.delete().then(() => {
                    firebase.auth().signOut().then(() => {
                        this.showProgressBar()
                    }, (error) => {

                    });

               /* }, (error) => {
                    console.error('Sign Out Error', error);
                    this.notify('Error occured while deleting account, try again later')
                });*/
            }
        })



    }
    showProgressBar = () => {
        this.setState({ showProgressBar: true })
        setTimeout(
            () => { this.setState({ showProgressBar: false }), Router.push('/') },
            3000)
    }

    inputChange = async (e) => {
        var value = e.target.value
        //console.log('theId', e.target.id)
        await this.setState({ [e.target.id]: value })
        if (e.target.id === 'editName') {
            this.setState({ nameValidated: false })
            if (this.state.editName.length < 3) {
                this.setState({ editNameErr: 'Name field must be above 3 characters' })
            } else { this.setState({ editNameErr: '', nameValidated: true }) }
        }
        if (e.target.id === 'editPhoneNumber') {
            //console.log('hapa tu',e.target.id)
            if (this.state.editPhoneNumber.length >= 5) { this.setState({ editPhoneNumberErr: '' }) }
            else { this.setState({ editPhoneNumberErr: 'Phone Number field must be atleast above 5 characters' }) }
        }
    }
    submitEdits = async () => {
        if (this.state.editName.length < 3) { this.setState({ editNameErr: 'Name must be 3 characters and above' }) } else { this.setState({ editNameErr: '' }) }
        if (this.state.editPhoneNumber.length < 5) { this.setState({ editPhoneNumberErr: 'Phone Number must be 5 characters and above' }) } else { this.setState({ editPhoneNumberErr: '' }) }
        if (this.state.editName.length < 3) return
        if (this.state.editPhoneNumber.length < 5) return
        var theItem = { name: this.state.editName, phoneNo: this.state.editPhoneNumber }
        var generalDb = firebase.database().ref()
        var theRef = '/users/' + this.state.userId + '/userData/'
        generalDb.child(theRef).update(theItem, (error) => {
            if (!error) {
                this.notify('Details updated successfully')
                this.setState({ name: this.state.editName, phoneNo: this.state.editPhoneNumber, editDetailsModal: false })
            } else {
                this.showToastModal('Error', 'Error updating details')
            }
        })
    }
    doNothing = (event) => {
        event.stopPropagation();
        event.preventDefault()
    }
    notify = (message) => {
        toast.warn(message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
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
                        <p className={style.phoneP}>{this.state.phoneNo}</p>
                        <p className={style.editP} onClick={() => this.setState({ editDetailsModal: true })}>Edit Details</p>
                        <p className={style.deleteP} onClick={() => this.accountDelete()}>Delete Account</p>
                        <p className={style.warningP}>Warning!. The above action can not be reversed. Once you delete your account all your information is deleted from our site immediately</p>
                    </div>
                    {this.state.editDetailsModal ? <div className={style.editModal} onClick={() => this.setState({ editDetailsModal: false })}>
                        <div className={style.editCard} onClick={(e) => this.doNothing(e)}>
                            <p className={style.editCardP1}>Edit Details</p>
                            <p className={style.editCardP2}>Enter Name</p>
                            <input className={style.theInput} placeholder='Enter your name' type='text' id='editName' style={{ color: '#000' }} onChange={(event) => this.inputChange(event)} value={this.state.editName} />
                            <p className={style.inputErr}>{this.state.editNameErr}</p>
                            <p className={style.editCardP2}>Enter Phone Number</p>
                            <input className={style.theInput} placeholder='Enter your phone number' type='number' id='editPhoneNumber' style={{ color: '#000' }} onChange={(event) => this.inputChange(event)} value={this.state.editPhoneNumber} />
                            <p className={style.inputErr}>{this.state.editPhoneNumberErr}</p>
                            <p className={style.submitBtn} onClick={() => this.submitEdits()}>Submit</p>
                        </div>
                    </div> : null}
                </div>
                {this.state.showProgressBar ? <ProgressBar /> : null}
                <ToastContainer /></>
        );
    }
}

export default profile;