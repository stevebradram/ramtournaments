import React from 'react';
import {useEffect,useState} from 'react';
import styles from "./Messages.module.scss";
import { io}  from "socket.io-client"
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { socket } from "../socket";
//const socket = io("http://localhost:3001")
//var socket = io();  
//export const socket = io();
const Message3 = () => {
    const [message, setMessage]=useState("")
    const [socketId, setSocketId]=useState("")
    useEffect(()=>{
      //joinRoom()
socket.on("receive_message",(data)=>{
    console.log('rrrrrrrrrr 000000',new Date(),data.message,data.socketId)
  //alert(data.message)
 })
    },[socket])
    const joinRoom=()=>{
       console.log('room joining')
      setSocketId(new Date().getTime())
      console.log('socketId',socketId)
      if(socketId!==""){
      socket.emit("join_room",socketId)
    }
    }
    const sendMessage=()=>{
      console.log('rrrrrrrrrr 22222')
      //this.notify("Can't send a message at the moment")
      socket.emit("send_message",{message:message})
      }
    const doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }  
   const inputChange = async (e) => {
            var value = e.target.value
            setMessage(e.target.value)
            console.log('theId', e.target.value)
            //await this.setState({[e.target.id]: value})
  }
    return (
        <div className={styles.container} onClick={(event)=>doNothing(event)}>
                        <div className={styles.container2}>
                        <div className={styles.chatsCont}></div>
                             <div className={styles.editDiv}>
                                            <textarea className={styles.mesoInput} id='theMessage' placeholder='Write your message here'  multiple onChange={(event)=>inputChange(event)}/>
                                            <IoMdArrowDroprightCircle className={styles.sendIc} onClick={()=>sendMessage()} />
                                            </div>
            
        </div>
        </div>  
    );
};

export default Message3;