import React, { Component } from 'react'
import styles from './LogIn.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import firebase from '../FirebaseClient'
import Router from 'next/router';
import localStorage from 'local-storage'
import ProgressBar from '../Helper/ProgressBar'
import { MdLockOutline ,MdOutlineMailOutline,MdOutlineAccountCircle,MdOutlineLocalPhone  } from "react-icons/md";
class LogIn extends Component {
    state={email:'',password:'',showLogIn:true,showRegister:false,showPasswordReset:false,regEmail:'',regName:'',regPassword:'',regPassword2:'',showProgressBar:false,
           emailErr:'',nameErr:'',passErr:'',pass2Err:'',emailValidated:false,nameValidated:false,logInEmail:'',logInPass:'',phoneNo:'',phoneNoErr:'',
           passValidated:false,pass2Validated:false,buttonClick:true,logInEmailErr:'',logInPassErr:'',resetEmail:'',resetEmailErr:'',theCol:'black',
          resetPassP:'A Reset Password link will be send to the entered email with instruction on how to reset your password.',showRamModal:false,
        teamName:'',flockName:'',teamNameErr:'',flockNameErr:''}
         
           componentDidMount=()=>{
            console.log('component mounted')
            
            //this.notify2('Success Validating Log In Information')
            //this.signOut()

           }
           resetInputChange = async (e) => {
            var value = e.target.value
            await this.setState({resetEmail:value})
            var validate = this.validateEmail(this.state.resetEmail)
            if(validate===false){
                this.setState({resetEmailErr:'Please enter a valid email'})
            }else{this.setState({resetEmailErr:''})}
           }
           inputChange = async (e) => {
            var value = e.target.value
            console.log('theId', e.target.id)
            await this.setState({[e.target.id]: value})

            //LOGIN INPUT
            if (e.target.id === 'email') {
                var validate = this.validateEmail(this.state.email)
                if(validate===false){
                    this.setState({logInEmailErr:'Please enter a valid email'})
                }else{this.setState({logInEmailErr:''})}
              }
              if (e.target.id === 'password') {
                if(this.state.password.length<6){
                    this.setState({logInPassErr:'Password field must be above 6 characters'})
                }else{this.setState({logInPassErr:''})}
              }

              //REGISTRATION INPUT
            if (e.target.id === 'regEmail') {
                this.setState({emailValidated:false})
                var validate = this.validateEmail(this.state.regEmail)
                if(validate===false){
                    this.setState({emailErr:'Please enter a valid email'})
                }else{this.setState({emailErr:'',emailValidated:true})}
              }
            if (e.target.id === 'regName') {
                this.setState({nameValidated:false})
              if(this.state.regName.length<3){
                  this.setState({nameErr:'Name field must be above 3 characters'})
              }else{this.setState({nameErr:'',nameValidated:true})}
            }
           
              if (e.target.id === 'regPassword') {
                this.setState({passValidated:false,pass2Validated:false})
                if(this.state.regPassword.length<6){
                    this.setState({passErr:'Password field must be above 6 characters'})
                }else{this.setState({passErr:'',passValidated:true})}
                if(this.state.regPassword!=this.state.regPassword2){
                    this.setState({pass2Validated:false})
                }else if(this.state.regPassword===this.state.regPassword2){
                    this.setState({pass2Validated:true})
                }
              }
              if (e.target.id === 'regPassword2') {
                this.setState({pass2Validated:false})
                if(this.state.regPassword!=this.state.regPassword2){
                    this.setState({pass2Err:'Passwords not matching',pass2Validated:false})
                }else{this.setState({pass2Err:'',pass2Validated:true})}
              }
              if (e.target.id ==='teamName'){
                if (this.state.teamName.length>=3){this.setState({teamNameErr:''})}
              }
              if (e.target.id ==='flockName'){
                console.log('hapa tu',e.target.id)
                if (this.state.flockName.length>=3){this.setState({flockNameErr:''})}
              }
              if (e.target.id ==='phoneNo'){
                console.log('hapa tu',e.target.id)
                if (this.state.phoneNo.length>=5){this.setState({phoneNoErr:''})}
                else{this.setState({phoneNoErr:'Phone Number field must be atleast above 5 characters'})}
              }
          }
          

          
        

           showLogIn=(status1,status2,status3)=>{
             console.log(this.state.status1,this.state.status2,this.state.status3)
          this.setState({showLogIn:status1,showRegister:status2,showPasswordReset:status3})
      }
      showRam=(status1,status2,status3)=>{
        this.setState({showRamModal:true,showLogIn:false})
       // this.showLogIn(status1,status2,status3)
 }
      stopProp=(event)=>{
        event.preventDefault();
        event.stopPropagation();
    }
    validateEmail(val) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
          return false;
        } else {
          return true;
        }
      }
      buttonClickStat=()=>{
        this.setState({buttonClick:false})
        this.timerHandle = setTimeout(
          () => this.setState({buttonClick:true}), 
          5000)
      }
      submitLogInCredentials= async () => {
        if (!this.state.buttonClick)return
        this.buttonClickStat()
        if (this.state.email===''){this.setState({logInEmailErr:'Email field must be filled'})}
        if (this.state.password===''){this.setState({logInPassErr:'Password field must be filled'})}
        if (this.state.email===''||this.state.password==='')return
        if(this.state.password.length<6)return
        var validate = this.validateEmail(this.state.email)
        if(validate===false){
        this.setState({logInEmailErr:'Please enter a valid email'})
        }else{this.setState({logInEmailErr:''})}
        if(validate===false)return
        //this.notify2('Success Validating Log In Information')
        console.log('the credentials',this.state.email, this.state.password)
        firebase.auth().fetchSignInMethodsForEmail(this.state.email).then((signInMethods) => {
          console.log('signInMethods ',signInMethods)
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((resp) => {
            this.setState({logInPassErr:''})
            var user = resp.user;
            var userId=user.uid
            console.log('the user info',userId,user)
            //this.props.onClick()
            localStorage.set('loggedIn', 'true');
            this.notify2('Logged In Successfully')
            Router.push('/reload')
           // window.location.reload();
          }).catch((error) => {
            this.setState({logInPassErr:'Email or Password is incorrect'})
            console.log('the error 0001',error.code)
            if(error.code==='auth/internal-error'){
              this.notify('The email or password entered is incorrect')
            }else{
                this.notify('An error occured while trying to Log In')
              }
          });
        }).catch((error) => {
          this.notify('The email or password entered is incorrect')
          console.log('the error 2',error.message)
        });
      }
      signOut = async () => {
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        Router.push('/loggingin')
      }, function(error) {
        console.error('Sign Out Error', error);
      });}
      showProgressBar=()=>{
        this.setState({showProgressBar:true})
        this.timerHandle = setTimeout(
          () => this.setState({showProgressBar:false}), 
          5000)
      }
      submitRegistrationInfo = async () => { 
        if (!this.state.buttonClick)return
        this.buttonClickStat()
        console.log('hapa kwa reg',this.state.regEmail)
        if (this.state.regEmail===''){this.setState({emailErr:'Email field must be filled'})}
        if (this.state.regName===''){this.setState({nameErr:'Name field must be filled'})}
        if (this.state.regPassword===''){this.setState({passErr:'Password field must be filled'})}
        if (this.state.phoneNo===''||this.state.phoneNo.length<5){this.setState({phoneNoErr:'Phone Number field must be atleast above 5 characters'})}
        console.log('hapa 111111111111')
        // if (this.state.regPassword2===''){this.setState({pass2Err:'Retype password field must be filled'})}
        //if (this.state.regEmail===''||this.state.regName===''||this.state.regPassword===''||this.state.regPassword2==='')return
        if (this.state.regEmail===''||this.state.regName===''||this.state.regPassword==='',this.state.phoneNo===''||this.state.phoneNo.length<5)return
        //if (this.state.emailValidated===false||this.state.nameValidated===false||this.state.passValidated===false||this.state.pass2Validated===false)return
        if (this.state.emailValidated===false||this.state.nameValidated===false||this.state.passValidated===false)return
        var validate = this.validateEmail(this.state.regEmail)
        console.log('hapa 22222222222222')
        if(validate===false){
        this.setState({emailErr:'Please enter a valid email'})
        }else{this.setState({emailErr:'',emailValidated:true})}
        if(validate===false)return
        console.log('hapa 333333333')
        //this.notify2('Success Validating Registration Information')
        console.log('almost successful')
        this.createAccount(this.state.regEmail,this.state.regPassword,this.state.regName,this.state.phoneNo)
      }
      createAccount=async(email,password,name,phoneNo)=>{
        this.showProgressBar()
        const theTime = new Date().getTime()
        const infoData = {
          name:name,
          email:email,
          phoneNo:phoneNo,
          created: theTime,
          pass:password,
       
        }
        var userInfoDb = firebase.database().ref('users/')
        var phoneNoInfoDb = firebase.database().ref('phoneNo')
        firebase.auth().fetchSignInMethodsForEmail(email).then((signInMethods) => {
          console.log('signInMethods ',signInMethods)
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((resp) => {
            var user = resp.user;
            var userId=user.uid
            console.log('here at the user info',user)
            phoneNoInfoDb.child(phoneNo).set(1)
            userInfoDb.child('/'+userId+'/userData/').set(infoData).then(() => {
              console.log('mambo ngoooooooooooooori')
              user.sendEmailVerification().then(() => {
               // this.props.onClick()
               console.log('hureeeeeeeeeeeee malisa',user)
                this.setState({showProgressBar:false})
                localStorage.set('loggedIn', 'true');
                this.notify2('Account created successfully')
                //window.location.reload();
                Router.push('/reload')
              }).catch((error) => {
                console.log('sendEmailVerification error',error.message)})
            })
          }).catch((error) => {
            console.log('the error 1',error.message)
            if(error.message==='The email address is already in use by another account.'){
              this.notify('Email entered is already registered please enter another email or Log In')
            }else{
                this.notify('An error occured while trying to create account')
              }
          });
        }).catch((error) => {
          this.notify('Email entered is already registered please enter another email or Log In')
          console.log('the error 2',error.message)
        });
    }
    submitLogIn = async (event) => {
      if (!this.state.buttonClick)return
      this.buttonClickStat()
      if (navigator.onLine === false) {
        this.notify('No internet! please check your internet connection')
        return
      }
      event.preventDefault();
      var res = this.validateEmail(this.state.logInEmail)
      if (this.state.logInEmail===null|| this.state.logInEmail.length < 6 || res === false) { this.setState({ logInEmailEmpty: 'Please enter a valid email' }); return };
      if (this.state.logInPass===null || this.state.logInPass.length < 6) { this.setState({ logInPassEmpty: 'Password field must be above 6 characters' }); return };
      firebase.auth().fetchSignInMethodsForEmail(this.state.logInEmail).then((signInMethods) => {
        if (!signInMethods.length) { this.setState({ logInEmailEmpty: 'Please try another email, the above provided email is not registered' }); return }
        else {
          this.showProgressBar()
          this.setState({ logInEmailEmpty: '', loading: true })
          firebase.auth().signInWithEmailAndPassword(this.state.logInEmail, this.state.logInPass)
            .then((resp) => {
              return (
                console.log('the user', resp.user),
                firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                  console.log('idToken2', idToken)
                  this.notify('Log In successful')
                  this.saveAuthToken(idToken)})
              )
  
            }).catch((error) => {
              console.log(error),
                this.setState({ loading: false, logInPassEmpty: 'Incorrect password for the above entered email.', disableClick: false })
            });
        }
      })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false }),
          this.notify('An error occured, please try again')
         
        });
    }
    resetPassword=()=>{
      if (this.state.resetEmail===''){this.setState({resetEmailErr:'Email field must be filled'})}
      if (this.state.resetEmail==='')return
      var validate = this.validateEmail(this.state.resetEmail)
      if(validate===false){
      this.setState({resetEmailErr:'Please enter a valid email'})
      }else{this.setState({resetEmailErr:''})}
      if(validate===false)return
      firebase.auth().sendPasswordResetEmail(this.state.resetEmail)
      .then((resp) => {
        console.log('the rees',resp)
        this.notify2('Reset password link send to your Email send successfuly')
        this.setState({resetPassP:'Reset password link has been send to the provided email',theCol:'red'})
        this.timerHandle = setTimeout(
          () => this.showLogIn(true,false,false), 
          4000)
      })
      .catch((error) => {
        this.notify('An error occured, please try again later')
        console.log('the rees',error)
       
      });
    }
      buttonClickStat=()=>{
        this.setState({buttonClick:false})
        this.timerHandle = setTimeout(
          () => this.setState({buttonClick:true}), 
          2000)
      }
      proceedToRegster=()=>{
       // if (this.state.teamName===''){this.setState({teamNameErr:'Team Name field must be filled'});return}
       // if (this.state.flockName===''){this.setState({flockNameErr:'Flock Name field must be filled'});return}
        if (this.state.teamName.length<3){this.setState({teamNameErr:'Team Name must be 3 characters and above'});return}
        if (this.state.flockName<3){this.setState({flockNameErr:'Flock Name must be 3 characters and above'});return}
        this.setState({showRegister:true,showRamModal:false})
      
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
      notify2=(message)=>{
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    render() {
        return (
            <>
            <div className={styles.container8}>
                {this.state.showLogIn?<div className={styles.container2} onClick={(event)=>this.stopProp(event)}>
                    <h1>Login</h1>
                    <p className={styles.P1}>Email</p>
                    <div className={styles.cont1}>
                    <MdOutlineMailOutline  className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Type your email' type='text' id='email' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.logInEmailErr}</p>
                    <p className={styles.P1}>Password</p>
                    <div className={styles.cont1}>
                    <MdLockOutline  className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Type your password' type='password' id='password' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input>  
                    </div>
                    <p className={styles.pErr}>{this.state.logInPassErr}</p>
                    <button className={styles.logInBtn} onClick={()=>this.submitLogInCredentials()}>LOGIN</button>
                    <ul className={styles.ul}>
                        <li onClick={()=>this.showLogIn(false,false,true)}>Forgot<span> Password?</span></li>
                        <li>Dont have an account?<span onClick={()=>this.showLogIn(false,true,false)}> Create Account</span> </li>
                    </ul>
                </div>:null}
                {this.state.showRamModal?<div className={styles.container2} onClick={(event)=>this.stopProp(event)}>
                    <h1>RAM Details</h1>
                    <p className={styles.P1}>Team Name</p>
                    <div className={styles.cont1}>
                    <MdOutlineMailOutline  className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Enter your Team name' type='text' id='teamName' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.teamNameErr}</p>
                    <p className={styles.P1}>Flock Name</p>
                    <div className={styles.cont1}>
                    <MdLockOutline  className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Enter your Flock Name' type='text' id='flockName' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input>  
                    </div>
                    <p className={styles.pErr}>{this.state.flockNameErr}</p>
                    <button className={styles.logInBtn} onClick={()=>this.proceedToRegster()}>PROCEED</button>
                </div>:null}
                    {this.state.showRegister?<div className={styles.container2} id={styles.container2} onClick={(event)=>this.stopProp(event)}>
                    <h1>Create Account</h1>
                    <p className={styles.P1}>Email</p>
                    <div className={styles.cont1}>
                    <MdOutlineMailOutline  className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Type your email' type='text' id='regEmail' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.emailErr}</p>
                    <p className={styles.P1}>Phone Number</p>
                    <div className={styles.cont1}>
                    <MdOutlineLocalPhone   className={styles.logInIcon}/>
                    <input  className={styles.logInInput}  placeholder='Type your phone number' type='number' id='phoneNo' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.phoneNoErr}</p>
                    <p className={styles.P1}>Your Name</p>
                    <div className={styles.cont1}>
                    <MdOutlineAccountCircle  className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Type your name' type='text' id='regName' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.nameErr}</p>
                    <p className={styles.P1}>Password</p>
                    <div className={styles.cont1}>
                    <MdLockOutline  className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Type your password' type='password' id='regPassword' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input>  
                    </div>
                    <p className={styles.pErr}>{this.state.passErr}</p>
                    {/*<p className={styles.P1}>Repeat Password</p>
                    <div className={styles.cont1}>
                    <MdLockOutline  className={styles.logInIcon}/> 
                    <input  className={styles.logInInput} placeholder='Retype your password' type='password' id='regPassword2' style={{color:'#000'}} onChange={(event)=>this.inputChange(event)}></input>  
                    </div>*/}
                    <p className={styles.pErr}>{this.state.pass2Err}</p>
                    <p className={styles.dataPrivacyP}>N/B No mobile or email information will be shared with third parties/affiliates for marketing or promotional purposes.</p>
                    <button className={styles.logInBtn} onClick={()=>this.submitRegistrationInfo()}>Create Account</button>
                   {/*<p className={styles.backP} onClick={()=>this.setState({showRegister:false,showRamModal:true})}>BACK</p>*/}
                    <ul className={styles.ul} style={{marginTop:20}}>
                        <li>Already have an account?<span onClick={()=>this.showLogIn(true,false,false)}> Log In</span> </li>
                    </ul>
                  </div>:null}
                   {this.state.showPasswordReset?<div className={styles.container2} onClick={(event)=>this.stopProp(event)}>
                    <h1>Reset Password</h1>
                    <p className={styles.P1}>Email</p>
                    <div className={styles.cont1}>
                    <MdOutlineMailOutline  className={styles.logInIcon}/>
                    <input  className={styles.logInInput} placeholder='Type your email' type='text' id='resetEmail' style={{color:'#000'}} onChange={(event)=>this.resetInputChange(event)}></input> 
                    </div>
                    <p className={styles.pErr}>{this.state.resetEmailErr}</p>
                    <p className={styles.resetP} style={{color:this.state.theCol}}>{this.state.resetPassP}</p>
                    <button className={styles.logInBtn} onClick={()=>this.resetPassword()}>Reset Password</button>
                    <ul className={styles.ul}>
                        <li>Already have an account?<span onClick={()=>this.showLogIn(true,false,false)}> Log In</span> </li>
                    </ul>
                </div>:null}
            </div>
            {this.state.showProgressBar?<ProgressBar/>:null}
            <ToastContainer/></>
        )
    }
}

export default LogIn
