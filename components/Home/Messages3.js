import React from 'react';
import {useEffect,useState} from 'react';
import styles from "./Messages.module.scss";
import { io}  from "socket.io-client"
import { IoMdArrowDroprightCircle } from "react-icons/io";
//import { socket } from "../socket";
//const socket = io("http://localhost:4000")
const socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket", "polling"] // Forces websocket first to avoid some polling CORS issues
});
//var socket = io();  
//export const socket = io();
const Messages3 = () => {
    const [message, setMessage]=useState("")
    const [socketId, setSocketId]=useState("")
    useEffect(()=>{
      //joinRoom()
/*socket.on("receive_message",(data)=>{
    console.log('rrrrrrrrrr 000000',new Date(),data.message,data.socketId)
  //alert(data.message)
 })*/
  socket.emit('identify', '123456');

    socket.on('new_message', (payload) => {
      console.log("New message received:", payload);
      setInbox((prev) => [...prev, payload]);
    });

    return () => {
      socket.off('new_message');
    };
    },['123456'])
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
     // socket.emit("send_message",{message:message})
     socket.emit('send_private_message', {
      recipientId: '2244',
      senderId: '123456',
      message: 'mumua mundu'
    });
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
                                            <textarea className={styles.mesoInput} id='theMessage' placeholder='Write your message here message 3'  multiple onChange={(event)=>inputChange(event)}/>
                                            <IoMdArrowDroprightCircle className={styles.sendIc} onClick={()=>sendMessage()} />
                                            </div>
            
        </div>
        </div>  
    );
};

export default Messages3;