import React, { Component } from 'react';
import style from '../styles/profile.module.scss';
import firebase from '../components/FirebaseClient';
import { IoPersonCircle } from "react-icons/io5";
import Router from 'next/router';
import ProgressBar from '../components/Helper/ProgressBar';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlinePhotoCamera } from "react-icons/md";

class profile extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }
    state = {
        userId: '',
        userLoggedIn: '',
        isAdmin: '',
        name: '',
        email: '',
        phoneNo: '',
        showProgressBar: false,
        editName: '',
        editNameErr: '',
        editPhoneNumber: '',
        editPhoneNumberErr: '',
        editDetailsModal: false,
        profilePhoto: '',
        imageFile: null,
        downloadUrl: '',
        progress: 0,
        uploading: false,
        notificationsEnabled: true, // Preference state
    };

    componentDidMount = () => {
        this.checkAuth();
    };

    checkAuth = () => {
        var userDataRef = firebase.database().ref();
        var userId = '';
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userId = user.uid;
                if (user.uid === 'iHA7kUpK4EdZ7iIUUV0N7yvDM5G3' || user.uid === 'zZTNto5p3XVSLYeovAwWXHjvkN43' || user.uid === 'vKBbDsyLvqZQR1UR39XIJQPwwgq1' || user.uid === 'qXeqfrI5VNV7bPMkrzl0QsySmoi2') {
                    this.setState({ isAdmin: true });
                    var theRef = 'users/' + userId + '/userData/';
                    userDataRef.child(theRef).once('value', dataSnapshot => {
                        const val = dataSnapshot.val() || {};
                        this.setState({
                            name: val.name || '',
                            editName: val.name || '',
                            editPhoneNumber: val.phoneNo || '',
                            email: val.email || '',
                            phoneNo: val.phoneNo || '',
                            profilePhoto: val.profilePhoto || '',
                            notificationsEnabled: val.notificationsEnabled !== undefined ? val.notificationsEnabled : true
                        });
                    });
                }
                this.setState({ userId, userLoggedIn: true });
            } else { 
                Router.push('/'); 
            }
        });
    };

    reAuthUser = () => {
        var credential = firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password);
        try {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    user.reauthenticateWithCredential(credential).then(() => {
                        this.proceed(user);
                    })
                    .catch((error) => {
                        console.error("Re-authentication failed", error);
                        this.setState({ passwordErr: 'Incorrect password' });
                        this.notify('Incorrect password');
                    });
                } else {
                    this.notify('No user found');
                }
            });
        } catch (error) {
            console.error("Re-authentication failed", error);
            this.notify('An error occurred while deleting account, try again later');
        }
    };

    accountDelete = async () => {
        var generalRef = firebase.database().ref();
        generalRef.child('accountsToBeDeleted').child(this.state.userId).set(new Date().getTime(), (error) => {
            if (!error) {
                this.notify('Success deleting account');
                firebase.auth().signOut().then(() => {
                    this.showProgressBar();
                }, (error) => {
                    console.error('Sign out error', error);
                });
            }
        });
    };

    showProgressBar = () => {
        this.setState({ showProgressBar: true });
        setTimeout(() => { 
            this.setState({ showProgressBar: false });
            Router.push('/'); 
        }, 3000);
    };

    inputChange = async (e) => {
        var value = e.target.value;
        await this.setState({ [e.target.id]: value });
        if (e.target.id === 'editName') {
            this.setState({ nameValidated: false });
            if (this.state.editName.length < 3) {
                this.setState({ editNameErr: 'Name field must be above 3 characters' });
            } else { 
                this.setState({ editNameErr: '', nameValidated: true }); 
            }
        }
        if (e.target.id === 'editPhoneNumber') {
            if (this.state.editPhoneNumber.length >= 5) { 
                this.setState({ editPhoneNumberErr: '' }); 
            } else { 
                this.setState({ editPhoneNumberErr: 'Phone Number field must be at least 5 characters' }); 
            }
        }
    };

    submitEdits = async () => {
        if (this.state.editName.length < 3) { this.setState({ editNameErr: 'Name must be 3 characters and above' }); } else { this.setState({ editNameErr: '' }); }
        if (this.state.editPhoneNumber.length < 5) { this.setState({ editPhoneNumberErr: 'Phone Number must be 5 characters and above' }); } else { this.setState({ editPhoneNumberErr: '' }); }
        if (this.state.editName.length < 3 || this.state.editPhoneNumber.length < 5) return;

        var theItem = { name: this.state.editName, phoneNo: this.state.editPhoneNumber };
        var generalDb = firebase.database().ref();
        var theRef = '/users/' + this.state.userId + '/userData/';
        generalDb.child(theRef).update(theItem, (error) => {
            if (!error) {
                this.notify('Details updated successfully');
                this.setState({ name: this.state.editName, phoneNo: this.state.editPhoneNumber, editDetailsModal: false });
            } else {
                this.notify('Error updating details');
            }
        });
    };

    // Toggle Notifications Preference
    toggleNotifications = () => {
        const newStatus = !this.state.notificationsEnabled;
        const { userId } = this.state;

        // Optimistic UI update
        this.setState({ notificationsEnabled: newStatus });

        if (userId) {
            firebase.database().ref(`/users/${userId}/userData/`).update({
                notificationsEnabled: newStatus
            }, (error) => {
                if (!error) {
                    this.notify(newStatus ? 'Notifications enabled' : 'Notifications disabled');
                } else {
                    // Rollback state if update fails
                    this.setState({ notificationsEnabled: !newStatus });
                    this.notify('Failed to update notification settings');
                }
            });
        }
    };

    doNothing = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    notify = (message) => {
        toast.warn(message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    };

    triggerFileInput = () => {
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();
        }
    };

    handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            this.setState({ imageFile: selectedFile}, () => {
                this.handleUpload();
            });
        }
    };

    handleUpload = () => {
        const { imageFile, userId } = this.state;
        if (!imageFile) return;

        this.setState({ uploading: true });

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`profilePhotos/${userId}_${Date.now()}_${imageFile.name}`);
        const uploadTask = fileRef.put(imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress: percent });
            },
            (error) => {
                console.error('Upload failed:', error);
                this.setState({ uploading: false });
                this.notify('Failed to upload image');
            },
            async () => {
                const url = await uploadTask.snapshot.ref.getDownloadURL();
                
                if (userId) {
                    firebase.database().ref(`/users/${userId}/userData/`).update({ profilePhoto: url });
                }
                this.setState({
                    downloadUrl: url,
                    profilePhoto: url,
                    uploading: false,
                    imageFile: null
                });
                this.notify('Profile photo updated successfully');
            }
        );
    };

    render() {
        const { profilePhoto, uploading, progress, notificationsEnabled } = this.state;

        return (
            <>
                <input
                    type="file"
                    ref={this.fileInputRef}
                    onChange={this.handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <div className={style.container}>
                    <div id={style.container2}>
                        <div className={style.imageDiv}>
                            {profilePhoto && profilePhoto.length ? (
                                <img src={profilePhoto} alt="Profile" />
                            ) : (
                                <IoPersonCircle className={style.icProfile} />
                            )}
                        </div>
                        <div className={style.changePhotoDiv} onClick={this.triggerFileInput}>
                            {uploading ? `Uploading ${progress}%` : 'Change Photo'}
                        </div>
                        <p className={style.nameP}>{this.state.name}</p>
                        <p className={style.emailP}>{this.state.email}</p>
                        <p className={style.phoneP}>{this.state.phoneNo}</p>

                        {/* Notifications Toggle Selector */}
                        <div 
                            onClick={this.toggleNotifications}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                margin: '0px 0px 20px 0px', 
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}
                        >
                            {/* Visual Switch Pill */}
                            <div style={{
                                width: '35px',
                                height: '15px',
                                backgroundColor: notificationsEnabled ? '#5b9959' : '#ccc',
                                borderRadius: '11px',
                                position: 'relative',
                                transition: 'background-color 0.25s ease'
                            }}>
                                <div style={{
                                    width: '14px',
                                    height: '13px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '1px',
                                    left: notificationsEnabled ? '20px' : '3px',
                                    transition: 'left 0.25s ease'
                                }} />
                            </div>

                            {/* Dynamic Label Requirement */}
                            <span style={{ fontSize: '0.95rem', fontWeight: '500',marginLeft:5, color:notificationsEnabled ? '#5b9959' : '#ccc'}}>
                                {notificationsEnabled ? 'Notifications Enabled' : 'Notifications Disabled'}
                            </span>
                        </div>

                        <p className={style.editP} onClick={() => this.setState({ editDetailsModal: true })}>Edit Details</p>
                        <p className={style.deleteP} onClick={() => this.accountDelete()}>Delete Account</p>
                        <p className={style.warningP}>Warning!. The above action can not be reversed. Once you delete your account all your information is deleted from our site immediately</p>
                    </div>

                    {this.state.editDetailsModal ? (
                        <div className={style.editModal} onClick={() => this.setState({ editDetailsModal: false })}>
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
                        </div>
                    ) : null}
                </div>

                {this.state.showProgressBar ? <ProgressBar /> : null}
                <ToastContainer />
            </>
        );
    }
}

export default profile;