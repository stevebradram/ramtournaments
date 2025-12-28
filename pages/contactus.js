import React, { Component } from 'react'
import style from '../styles/contacts.module.scss';
import {MdOutlinePhone,MdOutlineEmail,MdPersonOutline} from "react-icons/md";
import {FaGlobe,FaLinkedinIn} from "react-icons/fa";
import Meta from '../components/Meta'
export class contacts extends Component {
  state={
    name:'',
    email:'',
    phone:'',
    comment:'',
    showThanksDiv:false,
    nameErr:false,
    emailErr:false,
    phoneNoErr:false,
    commentErr:false,
    allFields1:'',
    allFields2:''}
    inputChange(event) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({[event.target.id]:event.target.value});
      //console.log('the result',event.target.value)
    }
    sendMessage=()=>{
      var missingInfo=''
      if(this.state.name.length<2){
        missingInfo=true
        this.setState({nameErr:'This field must be filled'})
      }else{this.setState({nameErr:''})}
      if(this.state.email.length<2){
          missingInfo=true
          this.setState({emailErr:'This field must be filled'})
      }else{this.setState({emailErr:''})}
      if(this.state.phone.length<2){
          missingInfo=true
          this.setState({phoneNoErr:'This field must be filled'})
      }else{this.setState({phoneNoErr:''})}
      if(this.state.comment.length<2){
          missingInfo=true
          this.setState({commentErr:'This field must be filled'})
      }else{this.setState({commentErr:''})}

      if(missingInfo===true){
          this.setState({allFields1:'Missing Information',allFields2:'All Fields Must Be Filled'})  
      }else{
          this.setState({allFields1:'Thank you for your message',allFields2:'We will get back to you in the next few hours.'})  
      }
      this.setState({showThanksDiv:true});
      setTimeout(() => {
          this.setState({showThanksDiv:false});
        }, 5000);
    }
  render() {
    return (
      <>
       <Meta title='RAM - Contacts'/>
      <div className={style.mainDiv}>
        <div className={style.mainDiv1}>
        <div className={style.mainDiv1A}>
        <img className={style.productImage} src='./pic27.png' alt='Products Image'></img>
        </div>
        <div className={style.mainDiv1B}>
          <p className={style.P1}>WE WOULD</p>
          <p className={style.P2}>LOVE TO <span className={style.P3}>CONNECT</span></p>
          <p className={style.P4}>WITH YOU!</p>
         
          <p className={style.P7}>WE WOULD LOVE TO CONNECT WITH YOU</p>
        </div>
        </div>

        <div className={style.mainDiv2}>
        <div className={style.mainDiv2A}>
          <div className={style.divFind}><p className={style.P5}>You can find us at any of the</p>
          <p className={style.P6}>channels below!</p></div>
        <div className={style.contDiv1}>
          <MdOutlinePhone className={style.icon}/>
          <p>+1 212 555 1234</p>
        </div>
        <div className={style.contDiv1}>
          <MdOutlineEmail className={style.icon}/>
          <p>theramtournament@gmail.com</p>
        </div>
        <div className={style.contDiv1}>
          <MdPersonOutline className={style.icon}/>
          <p>RAM Suites</p>
        </div>
        <div className={style.contDiv1}>
          <FaGlobe className={style.icon}/>
          <p>https://ramtournament.com/</p>
        </div>
        <div className={style.contDiv1}>
          <FaLinkedinIn className={style.icon}/>
          <p>RAM Tournaments</p>
        </div>
        </div>
        <div className={style.mainDiv2B}>
          <div className={style.contaDiv}>
            <p className={style.contP}>Contact Us</p>
            <input  className={style.contactsInput} placeholder='Full Names' type='text' id='name' value={this.state.name}  onChange={(event)=>this.inputChange(event)}></input>
            {this.state.nameErr?<p className={style.errP}>{this.state.nameErr}</p>:null}
            <input  className={style.contactsInput} placeholder='Email' type='email' id='email'  onChange={(event)=>this.inputChange(event)}></input>
            {this.state.emailErr?<p className={style.errP}>{this.state.emailErr}</p>:null}
            <input  className={style.contactsInput} placeholder='Phone Number' type='number' id='phone'  onChange={(event)=>this.inputChange(event)}></input>
            {this.state.phoneNoErr?<p className={style.errP}>{this.state.phoneNoErr}</p>:null}
            <textarea
                        className={style.contactsInput2}
          value={this.state.comment}
          onChange={(event)=>this.inputChange(event)}
          placeholder='Comment'
          id='comment'
          rows={5}
          cols={5}
        />
        {this.state.commentErr?<p className={style.errP}>{this.state.commentErr}</p>:null}
         <p className={style.sendP} onClick={()=>this.sendMessage()}>SEND</p>
          </div>
        
        </div>
        
        </div>
        {/*<div className={style.mainDiv3A} id={style.map1}>
        <img className={style.productImage2} src='./pic26.png' alt='Location Image'></img>
        </div>
        <div className={style.mainDiv3A} id={style.map2}>
        <img className={style.productImage2} src='./pic26b.png' alt='Location Image'></img>
        </div>*/}
        {this.state.showThanksDiv?<div className={style.thanksDiv}>
                <p>{this.state.allFields1}</p>
                <p>{this.state.allFields2}</p>
            </div>:null}
      </div>
      </>
    )
  }
}

export default contacts
