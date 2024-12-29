import React, { Component } from 'react'
import style from '../styles/Profile/EditProfile.module.scss';
import { RiEdit2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { TiTick } from "react-icons/ti"
import { FiCheck } from "react-icons/fi"
import firebase from '../components/lib/FirebaseClient';
import { RiArrowDownSLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import disableScroll from 'disable-scroll';
import axios from "axios"
import OtpInput from 'react-otp-input';
import libphonenumber from 'google-libphonenumber';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Router from 'next/router'
import Resizer  from "react-image-file-resizer";
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../components/Helper/ProgressBar'
import cookie from "js-cookie"
import dayjs from 'dayjs';
import localStorage from 'local-storage'
import Meta from '../components/Meta'
var searchArray = '', theArea = '', selCategories = [],initCategories='', fullCat = '', initialLoc = '', myId = ''
var fb = '', ig = '', tw = '', sName = '', sDesc = '', sCats = '', inItsUName = ''
var aC = {
  color: '#ff6b08',
  borderBottom: '2px solid #ff6b08'
}
var iC = {
  color: '#000',
  borderBottom: '0px solid whiteSmoke'
}
var appVerifier=''
class EditTheProfile extends Component {
  state = {
    input: '',
    myName: '',
    myLocation: '',
    myEmail: '',
    myPhone: '',
    profilePhoto: '',
    myPassword: '',
    shopName: '',
    shopDesc: '',
    pLayout: true,
    sLayout: '',
    mLayout: '',
    pColor: aC,
    sColor: iC,
    mColor: iC,
    showModal: false,
    editableName: '',
    facebook: '',popup:false,
    instagram: '',deleteAccount:false,
    twitter: '',compressedUri:'',
    shopPhoto: '',
    placeHolder: '',
    shopStat: '',
    theFullAreaName: '',
    locationsArray: [],
    showModal2: false,
    changeName: '',
    readOnly: '',
    shopId: '',
    catArray: [],
    catNames: '',
    shopCats: '',
    theMongoData: [],
    email: '',
    errorMeso: '',
    theChange: '',
    initMail: '',
    initPass: '',
    initPhoneNo: '',
    finalPhoneNo: 0,
    showInput1: false,
    showInput2: false,
    showError1: '',
    showError2: '',
    showError1A: '',
    showError2B: '',
    inputA: '',
    inputB: '',
    saveBtn: false,
    matchStyle: { color:'#ff6b08' },
    changeThePass: false,
    inputType: 'text',
    continueChangePhoneNo:'',
    isSocial:false,
    faceError:'',instaError:'',twittError:'',charCount:50,showRegPass:false,
    showRegPassStat: 'password',
    showCodeDiv:false,
    verCode: '',
    verColor: { backgroundColor: '#FCAA73' },
    codeErr: '',savePhoto:false,
    seconds: null, reauthRes:'', reauthEmail:'', reauthPass:'',
    canResend: false,phoneNoErr:'',
    verId:'',reqInfo:'',buttonClick:true,phoneModal:false,initPhoneNo:'',
    thePhone3:'',countryName:'',thePhone2:'',isValid:'', countryCode:''
  }
  componentDidMount=async()=>{
    this.goAuth()
  }
  goAuth=()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.isAnonymous===true) {
          cookie.set('logInModalStatus2', 'false');
          cookie.set('logInModalStatus', 'true');
          Router.push('/')
          return
        }else{
          var info=user.isAnonymous+'$$$'+user.uid+'$$$'+user.phoneNumber+'$$$'
          +user.displayName+'$$$'+user.photoURL
          var reqInfo =info.split('$$$')
          myId=user.uid
          console.log('this.state.reqInfo',reqInfo)
          this.setState({reqInfo})
          this.fetchData()
        }
      }
    })
  }

  fetchData = async () => {
    console.log('this.state.reqInfo',this.state.reqInfo)
    var userInfoRef = firebase.database().ref('/atumii/allAccountInfo/' + this.state.reqInfo[1]);
    var passRef = firebase.database().ref('/atumii/syindu/' + this.state.reqInfo[1]+'/p');

    await passRef.once('value', snapshot => {
      const pass = snapshot.val()
      this.setState({ myPassword: pass, initPass: pass })
    })
    await userInfoRef.once('value', data => {
      if (data.exists()) {
        const myName = data.val().name
        const shopName = data.val().shopName
        var location = data.val().loc
        var country = data.val().country
        const shopPhoto = data.val().pf
        const shopInfo = data.val().shopInfo
        const myPhone = data.val().phone
        const myEmail = data.val().email
        var shopStat = data.val().shop
        var shopId = data.val().shopId
        var shopCats = data.val().shopCats
        var profilePhoto = data.val().pf
        sName = shopName
        sDesc = shopInfo
        sCats = shopCats
        inItsUName = data.val().sUName
        fb = data.val().fb
        ig = data.val().ig
        tw = data.val().tw
        if (!fb) { fb = '' } if (!ig) { ig = '' } if (!tw) { tw = '' }
        if (!shopStat) { shopStat = false }
        if (!profilePhoto || profilePhoto === 'false') { profilePhoto = false }
        if(!location){location=country}
        location = location.replaceAll('::', ', ')
        this.setState({
          myName,
          myEmail,
          shopDesc: shopInfo,
          myPhone,
          shopPhoto,
          shopName,
          myLocation: location,
          facebook: fb,
          instagram: ig,
          twitter: tw,
          shopStat: shopStat,
          profilePhoto: profilePhoto,
          shopId: shopId,
          shopCats: shopCats,
          initMail: myEmail,
          initPhoneNo: myPhone
        })
      }
    })
  }
  changeLayout = (event, name) => {
    event.preventDefault()
  this.setState({isSocial:false})
    if (name === 'profile') {
      this.setState({ pLayout: true, sLayout: false, mLayout: false, pColor: aC, sColor: iC, mColor: iC })
    }
    if (name === 'store') {
      selCategories = this.state.shopCats.replace(/ /g, '-').replace(/,-/g, ',')
      selCategories = selCategories.split(',')
    
      var theFinalCat = (selCategories + '').replace(/-/g, ' ').replace(/,/g, ', ')
      this.setState({ catNames: theFinalCat, pLayout: false, sLayout: true, mLayout: false, pColor: iC, sColor: aC, mColor: iC })
    }
    if (name === 'media') {
      this.setState({ pLayout: false, sLayout: false, mLayout: true, pColor: iC, sColor: iC, mColor: aC,isSocial:true })
    }
  }
  hideModal = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if(this.state.showCodeDiv===true)return
    this.setState({ showModal: false,phoneModal:false})
  }
  resendCode = async (event) => {
    event.preventDefault();
    if (this.state.canResend === false) return

   var phoneNo=this.state.finalPhoneNo
   firebase
   .auth()
   .signInWithPhoneNumber(phoneNo, appVerifier)
   .then((confirmationResult) => {
     let result = confirmationResult;
     this.setState({verId: result.verificationId})
     this.startTimer()
   })
   .catch((error) => {
     this.notify('An error occured while trying to create your account, please try again')
   });
  }
  cancelCode = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ showModal: false,showCodeDiv:false,showInput1: false, showInput2: false, inputType: 'text',charCount:charCount,
    inputA:'',inputB:'',editableName:'', showRegPassStat: 'password',showRegPass:false,showError1: '', showError2: '',errorMeso:'' })
  }
  modalClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  editInfo = async (event, name, placeHolder, changeName, readOnly,charCount) => {
    event.preventDefault()
    await this.setState({ showInput1: false, showInput2: false, inputType: 'text',charCount:charCount,phoneModal:false,
    inputA:'',inputB:'',editableName:'', showRegPassStat: 'password',showRegPass:false,showError1: '', showError2: '',errorMeso:''})
    if (!name) return
    if (placeHolder === 'Enter current password') {
      this.setState({
        errorMeso: 'Password must be at least 6 characters', theChange: 'password', showInput1: true,
        showInput2: true, showError1: 'Enter new password', showError2: 'Re-enter new password'
      })
    }
    if (placeHolder === 'Enter new email') {
      this.setState({ errorMeso: '', theChange: 'email', showInput2: true, showError2: 'Enter your password',input2Stat:'password' })
    }
    if (placeHolder === 'Enter new phone No') {
      this.notify('About to change your phone number. Remember you can only change your phone number once per day')
      this.setState({ errorMeso: 'Please enter a valid phone No', theChange: 'phone', showInput2: true, showError2: 'Enter your password',phoneModal:true,initPhoneNo:name})
    }
    if(changeName==='location'){this.setState({editableName:name})}
    this.setState({ showModal: true,placeHolder: placeHolder, changeName: changeName, readOnly })
  }
  onDataChange = async (event) => {
    var value = event.target.value
    await this.setState({ [event.target.id]: value, matchStyle: { color:'#ff6b08' }, changeThePass: false })
    if (this.state.theChange === 'password') {
      if (this.state.editableName && this.state.editableName.length > 6) {
        this.setState({ errorMeso: '' })
      } else {
        this.setState({ errorMeso: 'Password must be above 6 characters' })
      }
      if (this.state.inputA && this.state.inputA.length < 6) {
        this.setState({ showError1A: 'Password must be above 6 characters' })
      } else if (this.state.inputA && this.state.inputA.length >= 6) {
        this.setState({ showError1A: '' })
      }
      if (this.state.inputB && this.state.inputB.length < 6) {
        this.setState({ showError2B: 'Match password too short' })
      } else if (this.state.inputB && this.state.inputB.length >= 6) {
        if (this.state.inputA === this.state.inputB) {
          this.setState({ showError2B: 'Passwords match', matchStyle: { color: 'green' }, changeThePass: true })
        } else {
          this.setState({ showError2B: 'Passwords do not match' })
        }
      }
    }
    if (this.state.theChange === 'email') {
      var res = await this.validateEmail(this.state.editableName)
      if (res === true) {
        this.setState({ errorMeso: '' })
      } else { this.setState({ errorMeso: 'Please enter a valid email' }) }
      if (this.state.inputB && this.state.inputB.length >= 6) {
        this.setState({ showError2B: '' })
      } else {
        this.setState({ showError2B: 'Password must be above 6 characters' })
      }
      //var theMail=event.target.value.split('@')
      //var mail = theMail[0]
    }
    if (this.state.theChange === 'phone') {
      //this.validatePhoneNo(this.state.editableName)
    }

  }
  showProgressBar = (time) => {
    this.setState({ showLoadingBar: true})
    this.timerHandle = setTimeout(
      () => this.setState({ showLoadingBar: false }),
      time)
  }
  changePassword = (oldPassword, newPassword) => {
    var passRef = firebase.database().ref('atumii/syindu/' + this.state.reqInfo[1] + '/p');
    firebase.auth()
      .signInWithEmailAndPassword(this.state.myEmail, oldPassword)
      .then((user) => {
        firebase.auth().currentUser.updatePassword(newPassword).then(() => {
          this.setState({showModal: false,initPhoneNo:newPassword})
          passRef.set(newPassword).then(() => {
            this.notify('Password changed successfully')
            this.timerHandle = setTimeout(
              () => Router.reload(),
              2000)
          })
        }).catch((err) => {
          this.notify('Error occured while changing your password please try again')
        });

      }).catch((err) => {
        this.notify('Error occured while changing your password please try again')
      });
  }
  changeEmail = async (newEmail, password) => {
    var userInfoRef = firebase.database().ref();
    var emailUpdate={}
    emailUpdate['/atumii/allAccountInfo/' + this.state.reqInfo[1]+'/email']=newEmail
    emailUpdate['/atumii/userSnippet/' + this.state.reqInfo[1]+'/email']=newEmail
    firebase.auth().fetchSignInMethodsForEmail(newEmail).then((signInMethods) => {
      if (signInMethods.length) {
        this.notify('Error: This email is already used by another account, please try another email')
      } else {
        firebase.auth()
          .signInWithEmailAndPassword(this.state.myEmail, password)
          .then((usercred)=>{
            firebase.auth().currentUser.updateEmail(newEmail).then(()=>{
              userInfoRef.update(emailUpdate).then(() => {
                var user = usercred.user;
                user.sendEmailVerification()
                this.notify('Email changed successfully')
                this.setState({showModal:false,myEmail:newEmail,initMail:newEmail})
                Router.reload()
              })

            }).catch((err)=>{
              this.notify('An Error occured while trying to change your email, please try again')
            });

          }).catch((err)=>{
            this.notify('An Error occured while trying to change your email, please try again')
          });
      }
    })
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
  };
  changePhoneNo2 = async (phoneNo,password) => {
    //this.setState({continueChangePhoneNo:false})
    var countTime = dayjs(Date.now()).format('MMMM DD YYYY')
    countTime=countTime.replace(/ /g,'')
    if (!phoneNo.startsWith('+')) {
      phoneNo='+'+phoneNo
    }
    var phoneRef = firebase.database().ref('atumii/syaSimu/' + phoneNo);
    await phoneRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
        this.notify('Phone number entered is already registered with another account please enter another number')
        return
      }else{
        this.resetPhoneNo(phoneNo,password)
      }
    })
  }
  startTimer = async () => {
    await this.setState({ seconds: 30 })
    this.myInterval = setInterval(() => {
      const { seconds } = this.state
      this.setState(({ seconds }) => ({
        seconds: seconds - 1
      }))
      if (seconds === 0) {
        clearInterval(this.myInterval)
        this.setState({ seconds: null, canResend: true })
      } else if (seconds > 0) {
        this.setState({ canResend: false })
      }
    }, 1000)
    
  }
  resetPhoneNo=async(phoneNo,password)=>{
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    appVerifier = new firebase.auth.RecaptchaVerifier('save-user-button', { size: 'invisible' })
    firebase
    .auth()
    .signInWithPhoneNumber(phoneNo, appVerifier)
    .then((confirmationResult) => {
      let result = confirmationResult;
      this.setState({ showCodeDiv:true,verId: result.verificationId})
      this.startTimer()
    })
    .catch((error) => {
     // window.location.reload();
      this.notify('An error occured while trying to create your account, please try again')
    });
    }
  submitOTP = async (event) => {
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
     if (!this.state.buttonClick)return
    this.buttonClickStat(5000)
    event.preventDefault();
    var countTime = dayjs(Date.now()).format('MMMM DD YYYY')
    countTime=countTime.replace(/ /g,'')
    var phoneNo=this.state.thePhone2
    var generalDb = firebase.database().ref();
    var userInfoRef = firebase.database().ref('/atumii/allAccountInfo/' + this.state.reqInfo[1]+'/phone');
    if (this.state.verCode && this.state.verCode.length != 6 && this.state.verId){this.notify('Please enter the 6 digit verification code');return} 
    if (!this.state.verId || this.state.verId.length < 10) return

    let verificationCode = this.state.verCode
    let verificationId = this.state.verId
    const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode)
    firebase.auth().currentUser.updatePhoneNumber(phoneCredential).then(()=>{
      this.setState({showCodeDiv:false,showModal: false,myPhone:phoneNo})
      userInfoRef.set(phoneNo).then(() => {
        var updatePost = {};
        updatePost["atumii/syaSimu/" + phoneNo] = this.state.reqInfo[1];
        updatePost["atumii/syaSimu/" + this.state.initPhoneNo] = null;
        updatePost["atumii/allAccountInfo/" + this.state.reqInfo[1]+'/phone'] = phoneNo;
        updatePost["atumii/allAccountInfo/" + this.state.reqInfo[1]+'/lPNoChange'] = countTime;
        updatePost["atumii/userSnippet/" + this.state.reqInfo[1]+'/phone'] = phoneNo;
        generalDb.update(updatePost,  (error)=>{
          if (error) {
            this.notify('Error changing phone No')
          } else {
            this.saveProfileMongo('phone',phoneNo,this.state.shopId)
            this.notify('Phone No changed successfully')
          }
      });  
      })
        }).catch((err) => {
          this.setState({showCodeDiv:false,showModal: false,phoneModal:false})
            this.notify('Error: Wrong OTP code entered, please enter the right code send on your phone number')
          });

  }
  saveMailNoPass = async (name) => {
    this.setState({ saveBtn: true })
    var countTime = dayjs(Date.now()).format('MMMM DD YYYY')
    countTime=countTime.replace(/ /g,'')
    if (this.state.theChange === 'password') {
      if (!this.state.inputA || this.state.inputA.length < 6) {
        this.setState({ showError1A: 'New password must be above 6 characters' })
      }
      if (!this.state.inputB || this.state.inputB.length < 6) {
        this.setState({ showError2B: 'Match password must be above 6 characters' })
      }
      if (!this.state.inputA || this.state.inputA.length < 6||!this.state.inputB || this.state.inputB.length < 6
        ||!name||name.length < 6)return
      if (this.state.changeThePass === true) {
        if (this.state.inputA === this.state.inputB) {
          if (this.state.initPass != name) {
            this.notify('Error : You entered the wrong current password, please enter the correct password')
            return
          }
          if (this.state.inputA === name) {
            this.notify('Password not updated : New and old password are identical, please enter a different password')
          } else {
            this.changePassword(name, this.state.inputA)
          }

        }

      } else {
        alert('return post')
      }
    }
    if (this.state.theChange === 'email') {
      var res = this.validateEmail(name)
      if (res === false) {
        this.setState({ errorMeso: 'Please enter a valid email' })
      }
      if (name === this.state.initMail) {
        this.setState({ errorMeso: 'New email same as old email' })
        return
      }
      if (!this.state.inputB) {
        this.setState({ showError2B: 'Password must be above 6 characters' })
        return
      }
      if (res === true && this.state.inputB === this.state.initPass) {
        //alert('updated email')
        this.changeEmail(name, this.state.inputB)
      } else {
        this.setState({ showError2B: 'Wrong password entered' })
        this.notify('Error : You entered the wrong password, please enter the correct password')
        //alert('return email')
      }

    }
    if (this.state.theChange === 'phone') {
      //await this.validatePhoneNo(name)
      if (!this.state.inputB) {
        this.setState({ showError2B: 'Password must be above 6 characters' })
      }
      if (!this.state.isValid) {
        this.setState({ phoneNoErr: 'Please enter a valid phone No' })
        return
      }
      if (this.state.inputB === this.state.initPass) {
        if(this.state.thePhone2&&this.state.thePhone2.length>5&&this.state.isValid&&this.state.initPhoneNo!==''){
          var phoneNoRef = firebase.database().ref('/atumii/allAccountInfo/' + this.state.reqInfo[1]+'/lPNoChange');
          await phoneNoRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
            if(snapshot.val()===countTime){
              this.notify('Phone number already changed today. For security purposes you can only change your phone number once per day')
              this.setState({phoneModal:false,showModal: false})
            }else{this.changePhoneNo2(this.state.thePhone2,this.state.inputB)}
            }else{
              this.changePhoneNo2(this.state.thePhone2,this.state.inputB)
            }
          })
        }else{
          this.setState({ phoneNoErr: 'Please enter a valid phone number' })
          this.notify('Please enter a valid phone number') 
        }
      } else { this.setState({ showError2B: 'Wrong password entered' }) }
    }
  }
  checkThePhoneNo=async(phoneNo,event)=>{
    await this.setState({thePhone3:phoneNo,countryName:event.name})
    const PNF = libphonenumber.PhoneNumberFormat;
    var thePhoneString=''
    if(this.state.thePhone3!==null){thePhoneString=this.state.thePhone3.toString()}
    else{thePhoneString=''}
    if(thePhoneString===null||thePhoneString.length<3)return
    var countryCode=(event.countryCode).toUpperCase()
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    var isValid=phoneUtil.isValidNumberForRegion(phoneUtil.parse(phoneNo, countryCode), countryCode)
    const number = phoneUtil.parseAndKeepRawInput(phoneNo, countryCode);
    var nationalNo=number.getNationalNumber()
    var interNationalNo=phoneUtil.format(number, PNF.INTERNATIONAL)
    interNationalNo=interNationalNo.replace(/ /g,'')
    var doubleDialCode=event.dialCode+event.dialCode
    interNationalNo=interNationalNo.replace(doubleDialCode,event.dialCode)
    await this.setState({thePhone2:interNationalNo,isValid:isValid, countryCode:countryCode})
    if (isValid!==true) {
      this.setState({phoneNoErr: 'Please provide a valid phone number'})
    }else if(isValid===true){this.setState({phoneNoErr:''})}
  }
  fetchLocations = async (event) => {
    theArea = ''
    this.setState({ theFullAreaName: theArea })
    searchArray = []
    try {
      const theRef = firebase.database().ref('Locations/Country/Kenya/county');
      var array1 = []
      var array2 = []
      await theRef.once('value', (snapshot) => {
        snapshot.forEach((data) => {
          const locationName = data.key
          const theSubName = locationName.split('-').join(' ');
          array1 = {
            locationName: theSubName, fullLocation: locationName
          }
          array2.push(array1)
        })
        searchArray = array2
        this.setState({
          locationsArray: array2
        })
      })
    } catch (error) {

    }
  }
  fetchArea = async (event, fullLocation, locName) => {
    searchArray = []
    await this.setState({ locName: locName, fullLocName: fullLocation, theNameChange: '' })
    if (theArea != '' && theArea != fullLocation) {
      // theArea = theArea + ', ' + fullLocation
      theArea = fullLocation + ', ' + theArea
      theArea = theArea.replace(/  /g, ' ').replace(/-/g, ' ')
      this.setState({ showModal2: false, locationsArray: [],  editableName: theArea})
      this.editInfo(event, theArea, 'Location Change', 'location', true)

    } else {
      theArea = fullLocation
      try {
        const theRef = firebase.database().ref('Locations/Country/Kenya/area/' + this.state.fullLocName);
        var array1 = []
        var array2 = []
        await theRef.once('value', (snapshot) => {
          snapshot.forEach((data) => {
            const locationName = data.key
            const theSubName = locationName.split('-').join(' ');
            array1 = {
              locationName: theSubName, fullLocation: locationName
            }
            array2.push(array1)
          })
          searchArray = array2
          this.setState({
            locationsArray: array2
          })
        })
      } catch (error) {
      }
    }
  }
  fetchCats = async () => {
    var catArray = [], catArray2 = []
    var catsRef = firebase.database().ref('/categories/Data/plainCats/');
    await catsRef.once('value', (snapshot) => {
      snapshot.forEach((data) => {
        const subCatName = data.key
        const theSubName = subCatName.split('-').join(' ');
        catArray = {
          fullCat: subCatName, editedCat: theSubName
        }
        catArray2.push(catArray)
      })
      this.setState({
        catArray: catArray2
      })
    })
  }
  addCats = (name) => {
    if (!selCategories.includes(name)) {
      if (selCategories.length >= 5) {
        this.notify('Maximum number of categories to add reached')
        this.setState({ showModal2: false })
      } else {
        selCategories.push(name)
        var theFinalCat = (selCategories + '').replace(/-/g, ' ').replace(/,/g, ', ')
        this.setState({ catNames: theFinalCat })
      }
    } else {
      if (selCategories.length<=1){ this.notify('Shop must have at least one category')}else{
      selCategories = selCategories.filter((value) => value != name)
      var theFinalCat = (selCategories + '').replace(/-/g, ' ').replace(/,/g, ', ')
      this.setState({ catNames: theFinalCat })}
    }
  }
  hideModal2 = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ showModal2: false })
  }
  modalClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

  }
  openModal = (event, name, placeHolder) => {
    event.preventDefault()
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
    this.setState({ showModal2: true, editableName: name, placeHolder: placeHolder })
    if (name === 'loc') {
      this.fetchLocations()
    }
    if (name === 'cat') {
      this.fetchCats()
    }
  }
  saveEditInfo = (event) => {
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
    event.preventDefault()
    this.showProgressBar(3000)
    if (this.state.theChange === 'phone') {
      this.saveMailNoPass(theEditable)
      return
    }
    var theEditable = this.state.editableName
    if (!theEditable||theEditable===''){
      this.notify('Please fill or select an item')
      return
    }
    if (this.state.theChange === 'password' || this.state.theChange === 'email' || this.state.theChange === 'phone') {
      this.saveMailNoPass(theEditable)
      return
    }
    var userInfoRef = firebase.database().ref('/atumii/allAccountInfo/' + this.state.reqInfo[1]);
    var shopRef = firebase.database().ref('/shops/stores/' + this.state.shopId);

    if (this.state.changeName === 'location') {
      if (theEditable === this.state.myLocation) {
        this.setState({ showModal: false, showLoadingBar: false })
        this.notify('The new location is the same as the old location')
        return
      } else {
        userInfoRef.child('loc').set(theEditable)

        if (this.state.shopId && this.state.shopId.length >= 6) {
          shopRef.child('loc').set(theEditable, (error) => {
            if (error) {
              this.notify('A problem occured while saving your data please try again', this.setState({ showLoadingBar: false }))
            } else {
              this.setState({myLocation:theEditable})
              this.saveProfileMongo('loc',theEditable,this.state.shopId)}
          })
        }
      }
    }
    if (this.state.changeName === 'your new name') {
      if (theEditable === this.state.myName) {
        this.notify('The new name is the same as the old name')
        this.setState({ showLoadingBar: false,showModal: false })
        return
      } else {
        userInfoRef.child('name').set(theEditable, (error) => {
          if (error) {
            this.notify('A problem occured while saving your data please try again')
            this.setState({ showLoadingBar: false })
          } else {
            firebase.auth().onAuthStateChanged((user) => {
              if (user){
                  user.updateProfile({ displayName:theEditable})
              }})
            this.notify('Data saved successfully')
            this.setState({ showModal: false, myName: theEditable, showLoadingBar: false })
          }
        })

      }
    }
  }
  saveSocialLinks = (event) => {
    event.preventDefault()
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
     if (!this.state.buttonClick)return
     this.buttonClickStat(2000)
    var userInfoRef = firebase.database().ref('/atumii/allAccountInfo/' + this.state.reqInfo[1]);
    var socMedia = {}
    var sendToDb = 'false'
    if (this.state.facebook != '') {
      if (this.state.facebook != fb) {
        if (this.state.facebook.startsWith('https://facebook.com/') || this.state.facebook.startsWith('https://www.facebook.com/')) {
            sendToDb = 'true'
            socMedia['fb'] = this.state.facebook
            fb = this.state.facebook
            this.setState({faceError:''})
        } else {
            this.notify('Please fill in a proper facebook link')
            this.setState({faceError:'Please enter a valid link'})
            return
        }
    }}
    if (this.state.instagram != '') {
      if (this.state.instagram != ig) {
        if (this.state.instagram.startsWith('https://instagram.com/') || this.state.instagram.startsWith('https://www.instagram.com/')) {
            sendToDb = 'true'
            socMedia['ig'] = this.state.instagram
            ig = this.state.instagram
            this.setState({instaError:''})
        } else {
            this.notify('Please fill in a proper instagram link')
            this.setState({instaError:'Please enter a valid link'})
            return
        }

    }
    }
    if (this.state.twitter != '') {
      if (this.state.twitter != tw) {
          if (this.state.twitter.startsWith('https://twitter.com/') || this.state.twitter.startsWith('https://www.twitter.com/')) {
              sendToDb = 'true'
              socMedia['tw'] = this.state.twitter
              tw = this.state.twitter
              this.setState({twittError:''})
          } else {
              this.notify('Please fill in a proper twitter link')
              this.setState({twittError:'Please enter a valid link'})
              return
          }

      }
  }
    if (sendToDb === 'true') {
      userInfoRef.update(socMedia, (error) => {
        if (error) {
          this.notify('A problem occured while trying to save your links please try again')
        } else {
          this.notify('Links saved successfully')
        }
      });
    } else {
      this.notify('No changes to update')
    }


  }
  buttonClickStat=(time)=>{
    this.setState({buttonClick:false})
    this.timerHandle = setTimeout(
      () => this.setState({buttonClick:true}), 
      time)
  }
  saveStoreDetails =async (event) => {
    event.preventDefault() 
    if (navigator.onLine===false) {
      this.notify('No internet! please check your internet connection')
      return
     }
     if (!this.state.buttonClick)return
        this.buttonClickStat(2000)
    var generalDb = firebase.database().ref();
    if (!this.state.shopName || !this.state.shopDesc||!this.state.shopCats) return
    if (this.state.shopName.length < 3 || this.state.shopDesc.length < 10 || selCategories.length < 1) return
    this.showProgressBar(1000)
    var userInfoRef = firebase.database().ref()
    var theKey = userInfoRef.push().key
    var subKey = theKey.substring(theKey.length - 4)
    var shopUserName = this.state.shopName + '-' + subKey
    shopUserName=shopUserName.toLowerCase().replace(/ /g,'')
   var sendToDb = 'false'
   var theInfo=[],theInfo2=[],theInfo3={}
   var updatePost = {};
   if (this.state.shopName!=sName) {
    sendToDb='true'
    updatePost["shops/stores/" + this.state.shopId+'/shopName'] = this.state.shopName;
    updatePost["atumii/allAccountInfo/" + this.state.reqInfo[1]+'/shopName'] = this.state.shopName;
    theInfo3['name']=this.state.shopName

   }
   if (this.state.shopDesc!=sDesc) {
    sendToDb='true'
    updatePost["shops/stores/" + this.state.shopId+'/details'] = this.state.shopDesc;
    updatePost["atumii/allAccountInfo/" + this.state.reqInfo[1]+'/shopInfo'] = this.state.shopDesc;
    theInfo3['det']=this.state.shopDesc

   }
   if (sCats!=this.state.catNames) {
    sendToDb='true'
    updatePost["shops/stores/" + this.state.shopId+'/cats'] = this.state.catNames
    updatePost["atumii/allAccountInfo/" + this.state.reqInfo[1]+'/shopCats'] = this.state.catNames
    theInfo3['cats']=this.state.catNames
   }
   if (sendToDb==='false')return
    generalDb.update(updatePost,  (error)=>{
      if (error) {
        this.setState({showLoadingBar:false})
      } else {
        sName=this.state.shopName, sDesc=this.state.shopDesc, sCats=this.state.catNames
        //inItsUName=shopUserName
          this.sendToMongo2(theInfo3,this.state.shopId)
      }
  });
  }
  firePostArr=async()=>{
    var shopCatsRef = firebase.database().ref('/shops/shopCats/');
    var initCats = (sCats+'').replace(/ /g, '-').replace(/,-/g, ',')
    if (initCategories.length===0) {initCategories = initCats.split(',')}
 
   await selCategories.forEach((element)=>{
    if (!initCategories.includes(element)) {
      var cat=element.replace(/ /g,'')
      shopCatsRef.child(cat).set(firebase.database.ServerValue.increment(+1))
    } });
   initCategories=selCategories.slice(0);
  
  }

  sendToMongo2=async(payLoad,shopId)=>{
    await axios.post('http://192.168.100.9:5000/addMultiMongo', {payLoad,shopId})
    .then((res)=>{
     this.firePostArr()
     this.setState({showLoadingBar:false})
     if (res.data==='Data added') {
        Router.push('/')
     }else{this.notify('An error occured, please try again')}
    })
}

saveProfileMongo = async (det, post,shopId) => {
  await axios.post('http://192.168.100.9:5000/saveProfile', { det, post,shopId})
      .then((res) => {
        this.setState({ showLoadingBar: false})
        if (res.data === 'Data added') {
          this.setState({ showModal: false })
          this.notify('Data saved successfully')
        } else {
          this.setState({ showModal: false })
          this.notify('A problem occured while saving your data please try again')
        }
      })
}

  validateEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return false;
    } else {
      return true;
    }
  }
  validatePhoneNo(val) {
    if (val) {
      if (val.startsWith('+254')) {
        if (val.length === 13) {
          if (val.startsWith('+2547') || val.startsWith('+2541') || val.startsWith('+2542')) {
            this.setState({ finalPhoneNo: val, errorMeso: '' })
          } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
        } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
      }
      else if (val.startsWith('254')) {
        if (val.length === 12) {
          if (val.startsWith('2547') || val.startsWith('2541') || val.startsWith('2542')) {
            var no = '+' + val
            this.setState({ finalPhoneNo: no, errorMeso: '' })
          } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
        } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
      }
      else if (val.startsWith('07') || val.startsWith('01')) {
        if (val.length === 10) {
          var no = '+254' + val.substring(1);
          this.setState({ finalPhoneNo: no, errorMeso: '' })
        } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
      }
      else if (val.startsWith('7') || val.startsWith('1')) {
        if (val.length === 9) {
          var no = '+254' + val
          this.setState({ finalPhoneNo: no, errorMeso: '' })
        } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
      } else { this.setState({ errorMeso: 'Please provide a valid phone number', finalPhoneNo: 0 }) }
    } else {
      this.setState({ errorMeso: '', finalPhoneNo: 0 })
    }
  }
   checkValidURL=(str)=>{
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
     // alert("Please enter valid URL.");
      return false;
    } else {
      return true;
    }
  }
  regPassShow = (name, stat) => {
    this.setState({ showRegPass: name, showRegPassStat: stat })
  }
  handleChange = verCode => {
    this.setState({ verCode })
  }
  checkIfLocation=async(event)=>{
    if(this.state.placeHolder==='Location Change'){
      this.setState({showModal: false})
      this.openModal(event, 'loc', 'Select Location')
    }
  }
  logOutUser=async(event)=>{
    try {
      firebase.auth().signOut().then(() => {
          this.notify('Log Out successful')
          Router.push('/')
         })   
   } catch (error) {
      Router.push('/')
   }
  }
        reauthDataChange= async (event, id) => {
          var value = event.target.value
          await this.setState({ [id]: value })
          var res = await this.validateEmail(this.state.reauthEmail)
          this.setState({reauthRes:res})  
      }
      checkReauth= async () => {
        if (navigator.onLine===false) {
          this.notify('No internet! please check your internet connection')
          return
         }
        if (!this.state.buttonClick) return
        this.buttonClickStat(2000)
        var delRef = firebase.database().ref('admin/deleteUser/' + this.state.reqInfo[1])
        
        var res = await this.validateEmail(this.state.reauthEmail)
        if (res===true&&this.state.reauthPass&&this.state.reauthPass.length>5){
            if(this.state.myEmail!==this.state.reauthEmail||(this.state.initPass!==this.state.reauthPass)){
            this.notify('Email and Password entered do no match. Please try again')
            }else{
            const emailCredential = firebase.auth.EmailAuthProvider.credential(this.state.reauthEmail, this.state.reauthPass);
            var theCurrentUser = firebase.auth().currentUser
            theCurrentUser.reauthenticateWithCredential(emailCredential).then((usercred) => {
            delRef.set(this.state.myPhone)
            theCurrentUser.delete().then(() => {
                localStorage.clear(); 
                this.clearCookies()
              }).catch((error) => {
                Router.push('/')
              });
            })
            }
        }else{this.notify('INFO MISSING')}
    }
    clearCookies=async()=>{
      try {
        var result1 =  await fetch("/api/saveAuthToken", {
             method: "post",
             headers:{
                 "Content-Type":"application/json",
              },
              body: JSON.stringify({userIdToken:'','time':-1})
         })
         var result2 =  await fetch("/api/saveinfo", {
             method: "post",
             headers:{
                 "Content-Type":"application/json",
              },
              body: JSON.stringify({'info':'','time':-1})
         })
         console.log('result1',result1,'result2',result2)
         Router.push('/reauth3')
      } catch (error) {
          Router.push('/')
       }  
   }
    deleteAsync=async()=>{
      var k=0
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
           k++
           let key = store[i][0];
           let value = store[i][1];
           this.clearApp(key)
           if(keys.length===k){
              RNRestart.Restart();
           }
          });
        });
      });
  }
  pickPhoto =async(event) =>{
    var theFile=event.target.files[0]
    var phoroURL=URL.createObjectURL(event.target.files[0])
    this.setState({profilePhoto:phoroURL})
    this.setState({shopPhoto:phoroURL})
    Resizer.imageFileResizer(
      theFile, // the file from input
      300, // width
      300, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      85, // quality
      0, // rotation
     //'blob',
      (uri) => {this.setState({compressedUri:uri})},
      "blob"
      )
}
savePhoto =async(event) =>{
  if (navigator.onLine===false) {
    this.notify('No internet! please check your internet connection')
    return
   }
  if (!this.state.buttonClick) return
  this.buttonClickStat(2000)
  var updatePost={}
  var photoRef = firebase.database().ref();
        const uploadTask =  firebase.storage().ref('profileImages/'+myId+'/profile').put(this.state.compressedUri);
        firebase.auth().onAuthStateChanged((user) => {
          if(user){
        uploadTask.on(
            "state_changed",
        snapshot=>{},
            error=>{
               // console.log(error);
            },
            ()=>{
               firebase.storage()
                .ref('profileImages/'+myId)
                .child('profile')
                .getDownloadURL()
                .then(url=>{
                  updatePost['/atumii/allAccountInfo/'+myId+'/shopPhoto'] = url;
                  updatePost['/atumii/allAccountInfo/'+myId+'/pf'] = url;
                  updatePost['/atumii/userSnippet/'+myId+'/pf'] = url;
                 user.updateProfile({photoURL:url})
                  photoRef.update(updatePost).then(()=>{
                    if (this.state.shopId && this.state.shopId.length >= 6){
                      this.saveProfileMongo('img',url,this.state.shopId)}
                    this.setState({shopPhoto:url,profilePhoto:url,compressedUri:''})
                    this.notify('UPLOAD SUCCESS');})
                })
            }
        )
      }})
} 
  render() {
    var show = this.state.showCodeDiv;
    let templateToShow=''
     var timing = ''
     var timeColor = [], verColor = [], codeErr = ''
    if (show === true) {
      disableScroll.on()
        if (this.state.verCode.length === 6) {
          codeErr = '', verColor = { backgroundColor: '#ff6b08' }
        } else {
          codeErr = 'Verification code must be 6 digits', verColor = { backgroundColor: '#FCAA73' }
        }
        if (this.state.seconds <= 0 || this.state.seconds === null) { timeColor = { color: '#ff6b08', borderColor: '#ff6b08' } } else if (this.state.seconds > 0) { timeColor = { color: '#000', borderColor: '#000' } }
        if (this.state.seconds >= 10) { timing = 'Resend Code in 00:' + this.state.seconds }
        else if (this.state.seconds < 10) {
          if (this.state.seconds > 0) { timing = 'Resend Code in 00:0' + this.state.seconds }
          else if (this.state.seconds === null || this.state.seconds === 0) { timing = 'Resend Code' }
        }
        templateToShow = <div className={style.signInDiv3} >
          <h5 className={style.logInTitle}>Verification Code</h5>
          <p className={style.fieldSubTitle2}>Please enter the 6 digit code sent to the Phone No you entered</p>
          <OtpInput
            value={this.state.verCode || ''}
            onChange={this.handleChange}
            numInputs={6}
            // isInputNum={true}
            className={style.otpInput}
            separator={<span>-</span>}
          />
          <input className={style.inputs2} type='number' id='verCode' placeholder='Enter Code' value={this.state.verCode || ''} onChange={this.onDataChange} autoComplete="off"
          />
          <p className={style.requiredField}>{codeErr}</p>
          <div className={style.registerCont} style={verColor} onClick={(event) =>this.state.buttonClick?this.submitOTP(event):null}>
            <p>Verify</p>
          </div>
          <p className={style.privacy} id={style.privacyVer}>Didn't receive a verification code? Please click the button below to resend the verification code</p>
          <div id={style.resendDiv}>
            <p id={style.resendCode} style={timeColor} onClick={(event) => this.resendCode(event)}>{timing}</p>
            <p id={style.cancelCode}  onClick={(event) => this.cancelCode(event)}>Cancel</p>
            </div>
          
        </div>
  
      }else{ disableScroll.off()}
    if (this.state.profilePhoto === 'false') {
      <p></p>
    } else { <img className={style.homeProImg} src={this.state.profilePhoto} alt="Hurumart" /> }
    const locationList = this.state.locationsArray.map((item,index) => {
      return (
        <div className={style.listCont} key={index} onClick={(event) => this.fetchArea(event, item.fullLocation, item.locationName)}>
          <p>{item.locationName}</p>
        </div>
      )
    })

    const selCats = selCategories.map((item, index) => {
      var name = item.replace(/-/g, ' ')
      return (
        <div className={style.selCatCont} key={index}>
          <p className={style.selCatP} key={index} >{name}</p>
          <MdClose className={style.selCatIC} onClick={(event) => this.addCats(item)} />
        </div>

      )
    })
    const categoryList = this.state.catArray.map((item) => {
      var aStyle = []
      var iStyle = []
      aStyle = {
        backgroundColor: '#ff6b08',
        borderColor: '#ff6b08'
      }
      iStyle = {
        backgroundColor: '#fff',
        borderColor: 'whiteSmoke'
      }
      var theStyle = []
      if (selCategories.includes(item.fullCat)) {
        theStyle = aStyle
      } else {
        theStyle = iStyle
      }
      return (
        <div className={style.listCont} onClick={() => this.addCats(item.fullCat)} key={item.editedCat}>
          <div style={theStyle} className={style.tickDiv}>
            <TiTick className={style.tickIc} />
          </div>
          <p>{item.editedCat}</p>
        </div>
      )
    })
    var contToShow = ''
    if (this.state.editableName === 'loc') {
      contToShow = locationList
    } else if (this.state.editableName === 'cat') {
      contToShow = categoryList
    }
    if(this.state.showModal){
      disableScroll.on()
        }else{ disableScroll.off()}
    return (
      <><Meta title='Profile | Hurumart' description='Buy & Sell electronics, phones, tvs, cars, music, real estates on hurumart.co.ke for free. Hurumart Kenyas free online marketplace, Buy and sell in Kenya, Free Classified in Kenya, Post Free Ads' keywords='Hurumart, hurumart.com, hurumart.co.ke, Electronics, Computers, Desktops, Laptops, Monitors, Cell Phones, TVs, Televisions, Audio, Music, Fashion, Clothes, Bags, Shoes, Watches, Jewelry, Furniture, Houses For Rent, Cars For Hire, Home Appliances, Wedding wear, Health, Beauty, Baby Products, Toys, Games, Home, Garden, Lands For Sale, Tools, Hardware, Cars, Buses, Vehicles, Automotives,  Vehicle Parts and Accessories, Buy and Sell in Kenya, Post Free Ads, Free Classified in Kenya'/>
      <div className={style.container}>
        <div id="save-user-button" ></div>
        <div className={style.cont0}>
          <div className={style.headDiv}>
            <p className={style.p1} style={this.state.pColor} onClick={(event) => this.changeLayout(event, 'profile')}>Profile</p>
            <p className={style.p2} style={this.state.sColor} onClick={(event) => this.changeLayout(event, 'store')}>Store</p>
            <p className={style.p3} style={this.state.mColor} onClick={(event) => this.changeLayout(event, 'media')}>Social Media</p>
          </div>
          {this.state.pLayout ?
            <div className={style.cont1}>
              <div className={style.imgAccount}>
                <div className={style.imgDiv}>
                  <img className={style.homeProImg} src={this.state.profilePhoto} alt="Hurumart" />
                  <input id="input" style={{display:'none'}} type="file" accept="image/*" onChange={(event)=>this.pickPhoto(event)}/>
                </div>
                <div className={style.imgDiv2}>
                <label htmlFor='input'  className={style.imgDiv2}>
                  <RiEdit2Fill className={style.editIc} /></label>
                </div>
              
              </div>
              {this.state.compressedUri?<p style={{textAlign:'center',marginTop:10,borderRadius:5,cursor:'pointer', color:'#ff6b08'}} onClick={()=>this.state.buttonClick?this.savePhoto():null}>SAVE PHOTO</p>:null}
              <fieldset className={style.listItemsCont} onClick={(event) => this.editInfo(event, this.state.myName, 'Enter new name', 'your new name', false,30)}>
                <legend className={style.listInfoTitleP} >Change Name</legend>
                <input className={style.inputs} type='text' id='myName'  placeholder='Change Name' value={this.state.myName || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" />
              </fieldset>
              <fieldset className={style.listItemsCont} id={style.cont2} onClick={(event) => this.openModal(event, 'loc', 'Select Location')}>
                <legend className={style.listInfoTitleP} >Change Location</legend>
                <input className={style.inputs} type='text' id='myLocation' placeholder='Change Location' value={this.state.myLocation || ''}  autoComplete="off" readOnly />
                <RiArrowDownSLine />
              </fieldset>
              <fieldset className={style.listItemsCont} onClick={(event) => this.editInfo(event, this.state.myEmail, 'Enter new email', 'your new email', false,40)}>
                <legend className={style.listInfoTitleP} >Change Email</legend>
                <input className={style.inputs} type='email' id='myEmail' placeholder='Change Email' value={this.state.myEmail || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" readOnly />
              </fieldset>
              <fieldset className={style.listItemsCont} onClick={(event) => this.editInfo(event, this.state.myPhone, 'Enter new phone No', 'your new phone No', false,20)}>
                <legend className={style.listInfoTitleP} >Change Phone</legend>
                <input className={style.inputs} id='myPhone' placeholder='Change Phone' value={this.state.myPhone || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" readOnly />
              </fieldset>
              <fieldset className={style.listItemsCont} onClick={(event) => this.editInfo(event, this.state.myPassword, 'Enter current password', 'your new password', false,20)}>
                <legend className={style.listInfoTitleP} >Change Password</legend>
                <input className={style.inputs} type='password' id='myPassword' placeholder='Change Password' value={this.state.myPassword || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" readOnly />
              </fieldset>
              <p className={style.opP}>Other Options?</p>
              <div className={style.logAccount} onClick={(event)=>this.logOutUser()}>
                LOG OUT
              </div>

              <div className={style.delAccount} onClick={() =>this.setState({popup:true})}>
                DELETE ACCOUNT
              </div>
            </div> : null}
          {this.state.sLayout ?
            <div className={style.cont2}>
              {this.state.shopStat ?
                <div className={style.cont2A}>
                  <fieldset className={style.listItemsCont}>
                    <legend className={style.listInfoTitleP} >Shop Name</legend>
                    <input className={style.inputs} type='text' id='shopName' placeholder='Change Name' value={this.state.shopName || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" />
                  </fieldset>
                  <p style={{fontSize:10,marginTop:2,marginLeft:2,color:'#ff6b08'}}>{!this.state.shopName||this.state.shopName.length<3?'Minimum 3 characters':null}</p>
                  <fieldset className={style.listItemsCont}>
                    <legend className={style.listInfoTitleP} >Shop Description</legend>
                    <textarea className={style.inputsText} type='text' id='shopDesc' placeholder='Change Description' value={this.state.shopDesc || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" />
                  </fieldset>
              <p style={{fontSize:10,marginTop:2,marginLeft:2,color:'#ff6b08'}}>{!this.state.shopDesc||this.state.shopDesc.length<10?'Minimum 10 characters':null}</p>
                  <fieldset className={style.listItemsCont} id={style.cont2} onClick={(event) => this.openModal(event, 'cat', 'Select Category')}>
                    <legend className={style.listInfoTitleP} >Shop Categories</legend>
                    <input className={style.inputs} type='text' id='shopCat' placeholder='Select Categories' value={this.state.catNames || ''} autoComplete="off" readOnly />
                    <RiArrowDownSLine />
                  </fieldset>
                  <p style={{fontSize:10,marginTop:2,marginLeft:2,color:'#ff6b08'}}>{!this.state.catNames||this.state.catNames.length<10?'Minimum 1 category':null}</p>
                
                  <div className={style.selCatDiv}>{selCats}</div>
                  <div className={style.delAccount} onClick={(event)=>this.state.buttonClick?this.saveStoreDetails(event):null}>
                    SAVE DETAILS
                  </div>
                </div> :
                <div className={style.cont3A}>
                  <p className={style.noShopP1}>Oops! it seems you don't have a shop</p>
                  <p className={style.noShopP2}>Interested in creating your free online store?</p>
                  <p className={style.noShopP3}>Click on the create button below to start</p>
                  <div className={style.delAccount} onClick={()=>Router.push('/createshop')}>
                    CREATE SHOP
                  </div>
                </div>}
            </div> : null}
          {this.state.mLayout ?
            <div className={style.cont3}>
              <fieldset className={style.listItemsCont}>
                <legend className={style.listInfoTitleP} >Facebook Link</legend>
                <input className={style.inputs} type='text' id='facebook' placeholder='Enter Facebook Link' value={this.state.facebook || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" />
              </fieldset>
              <p className={style.requiredField}>{this.state.faceError}</p>
              <fieldset className={style.listItemsCont}>
                <legend className={style.listInfoTitleP} >Instagram Link</legend>
                <input className={style.inputs} type='text' id='instagram' placeholder='Enter Instagram Link' value={this.state.instagram || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" />
              </fieldset>
              <p className={style.requiredField}>{this.state.instaError}</p>
              <fieldset className={style.listItemsCont}>
                <legend className={style.listInfoTitleP} >Twitter Link</legend>
                <input className={style.inputs} type='text' id='twitter' placeholder='Enter Twitter Link' value={this.state.twitter || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" />
              </fieldset>
              <p className={style.requiredField}>{this.state.twittError}</p>
              <div className={style.delAccount} onClick={(event) =>this.state.buttonClick?this.saveSocialLinks(event):null}>
                SAVE LINKS
              </div>
            </div> : null}
        </div>
       
        {this.state.showModal ?
          <div className={style.editDiv} onClick={(event) => this.hideModal(event)}>           
            {show?<>{templateToShow}</>:<div className={style.contEdit} onClick={(event) => this.modalClick(event)}>
              <div className={style.head2}>
                <p id={style.editP}>Edit Profile</p>
                <MdClose className={style.closeIC} onClick={(event) => this.hideModal(event)} />
              </div>
              <p id={style.clickP}>Click on the save button below after entering {this.state.changeName}</p>
             
        {this.state.phoneModal?<>
        <p style={{ marginTop: 15, fontSize: 10, paddingBottom:5}}>Enter New Phone No</p>
        <PhoneInput inputStyle={{ minWidth: '100%', paddingTop: 20, paddingBottom: 20, borderRadius: 0 }}
          countryCodeEditable={false}
          country={'ke'}
          value={this.state.thePhone}
          onChange={(data, event) => this.checkThePhoneNo(data, event)}
        />
        <p style={{fontSize:10,color:'#ff6b08',marginTop:2}}>{this.state.phoneNoErr}</p>
        <p style={{fontSize:10,marginTop:5}}>You will be opted to enter a 6 digit otp message send to the Phone No entered above. Ensure the phone no entered above can receaive messages</p>
        </>:<><fieldset className={style.listItemsCont2} >
                <legend className={style.listInfoTitleP} >{this.state.placeHolder}</legend>
                <input className={style.inputs} type={this.state.inputType} id='editableName' maxLength={this.state.charCount} placeholder={this.state.placeHolder || ''} value={this.state.editableName || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" readOnly={this.state.readOnly} onClick={()=>this.checkIfLocation(event)}/>
              </fieldset>
              <p id={style.errorP}>{this.state.errorMeso}</p></>}
              {this.state.showInput1 ? <div><fieldset className={style.listItemsCont2} >
                <legend className={style.listInfoTitleP} >{this.state.showError1}</legend>
                <input className={style.inputs} type={this.state.showRegPassStat} id='inputA' placeholder={this.state.showError1 || ''} value={this.state.inputA || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" readOnly={this.state.readOnly} />
                {this.state.showRegPass ? <FaEyeSlash id={style.eyeIC} onClick={() => this.regPassShow(false, 'password')} /> : <FaEye id={style.eyeIC} onClick={() => this.regPassShow(true, 'text')} />}
              </fieldset> <p id={style.errorP}>{this.state.showError1A}</p></div> : null}
              {this.state.showInput2 ? <div><fieldset className={style.listItemsCont2} >
                <legend className={style.listInfoTitleP} >{this.state.showError2}</legend>
                <input className={style.inputs} type={this.state.showRegPassStat} id='inputB' placeholder={this.state.showError2 || ''} value={this.state.inputB || ''} onChange={(event) => this.onDataChange(event)} autoComplete="off" readOnly={this.state.readOnly} />
                {this.state.showRegPass ? <FaEyeSlash id={style.eyeIC} onClick={() => this.regPassShow(false, 'password')} /> : <FaEye id={style.eyeIC} onClick={() => this.regPassShow(true, 'text')} />}
              </fieldset><p id={style.errorP} style={this.state.matchStyle}>{this.state.showError2B}</p></div> : null}
              <p id={style.forgotP}>Forgot Password?</p>
              <div className={style.delAccount} onClick={(event) => this.saveEditInfo(event)}>
                SAVE
              </div>
            </div>}
          </div> : null}
        {this.state.showModal2 ?
          <div className={style.editDiv2} onClick={(event) => this.hideModal2(event)}>
            <div className={style.contEdit2} onClick={(event) => this.modalClick(event)}>
              <div className={style.head2}>
                <p>{this.state.placeHolder}</p>
                <div>
                  <FiCheck className={style.closeIC} onClick={(event) => this.hideModal2(event)} />
                  <MdClose className={style.closeIC} onClick={(event) => this.hideModal2(event)} />
                </div>
              </div>
              <div className={style.catLocModal}>
                {contToShow}
              </div>
            </div>
          </div> : null}
          {this.state.deleteAccount?
          <div className={style.editDiv} onClick={()=>this.setState({deleteAccount:false})}>           
          <div className={style.contEdit} onClick={(event) => this.modalClick(event)}>
            <div className={style.head2}>
              <p id={style.editP}>Delete Account</p>
              <MdClose className={style.closeIC} onClick={()=>this.setState({deleteAccount:false})} />
            </div>
            <p id={style.clickP}>Please enter your email and password below to delete your account</p>
              
               <fieldset className={style.listItemsCont2} >
                       <legend className={style.listInfoTitleP} >Email</legend>
                       <input className={style.inputs}  id='editableName' maxLength={40} placeholder='Enter your email' value={this.state.reauthEmail} onChange={(event) => this.reauthDataChange(event,'reauthEmail')} autoComplete="off" readOnly={this.state.readOnly}/>
                     </fieldset>
                     {this.state.reauthRes?null:<p id={style.errorP}>Please enter a valid email</p>}
                     <div><fieldset className={style.listItemsCont2} >
                       <legend className={style.listInfoTitleP} >Password</legend>
                       <input className={style.inputs} type={this.state.showRegPassStat} id='inputA' placeholder='Enter password' value={this.state.reauthPass} onChange={(event) => this.reauthDataChange(event,'reauthPass')} autoComplete="off" readOnly={this.state.readOnly}/>
                       {this.state.showRegPass ? <FaEyeSlash id={style.eyeIC} onClick={() => this.regPassShow(false, 'password')} /> : <FaEye id={style.eyeIC} onClick={() => this.regPassShow(true, 'text')} />}
                     </fieldset> <p id={style.errorP}>{this.state.reauthPass.length>5?null:'Password must be above 6 characters'}</p>
                     <div className={style.delAccount} onClick={()=>this.state.buttonClick?this.checkReauth() : null}>
                DELETE ACCOUNT
              </div>
                     </div></div></div>
          :null}
        {this.state.popup?<div style={{height:'100%',widows:'100%',position:'fixed',backgroundColor:'#00000022',top:0,bottom:0,right:0,left:0,alignItems:'center',display:'flex', justifyContent:'center'}} onClick={() =>this.setState({popup:false})}>
          <div  className={style.popup} onClick={(event) =>this.modalClick(event)}>
           <p style={{marginTop:10}}>Delete Account</p>
           <p style={{marginTop:10}}>Are you sure you want to delete your account?</p>
           <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',marginTop:20}}>
             <p className={style.cancel} onClick={() =>this.setState({popup:false})}>CANCEL</p>
             <p className={style.save} onClick={()=>this.setState({deleteAccount:true,popup:false})}>CONFIRM</p>
           </div>
          </div>
        </div>:null}
        {this.state.showLoadingBar ? <ProgressBar /> : null}
        <ToastContainer/>
      </div></>

    )
  }
}

export default EditTheProfile



   /*const appVerifier = await new firebase.auth.RecaptchaVerifier('recaptcha-container', { size: 'invisible' })
   const authProvider = new firebase.auth.PhoneAuthProvider()
   const verificationId = await authProvider.verifyPhoneNumber(this.state.finalPhoneNo, appVerifier)
   this.setState({verId:verificationId})*/