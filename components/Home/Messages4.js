import React, { Component } from 'react';
import styles from "./Messages.module.scss";
import io from 'socket.io-client';
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { socket } from "../socket";

class Messages4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      theMessage: ''
    };
  }
   componentDidMount() {
    
      socket.on('connect')
      socket.on("receive_message",(data)=>{console.log('rrrrrrrrrr 000000',new Date(),data.message)})
      socket.on("send_message")

     /* socket.on('message', (data) => {
        this.setState(prevState => ({
          messages: [...prevState.messages, data]
        }));
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });*/
    }
   /* componentDidUpdate(){
      console.log('updateddddd')
      socket.on("receive_message",(data)=>{
          console.log('rrrrrrrrrr 000000',new Date(),data.message)
        //alert(data.message)
       })
    }*/
    componentWillUnmount() {
      socket.off('connect');
      socket.off('send_message');
      socket.off('receive_message');
      //socket.off('disconnect');
      //socket.close();
    }
    sendMessage = () => {
    //e.preventDefault();
    //socket.emit('sendMessage', this.state.theMessage);
    console.log('this.state.theMessage',this.state.theMessage)
    socket.emit("send_message",{message:this.state.theMessage})
    // socket.emit("send_message",{message:message,socketId:socketId})
    //socket.emit("send_message",{message:message})
   // this.setState({ theMessage: '' });

     
  };
    doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
    inputChange = async (e) => {
            var value = e.target.value
            console.log('theId', e.target.id)
            await this.setState({[e.target.id]: value})
  }
  render() {
    return (
      <div  className={styles.container} onClick={(event)=>this.doNothing(event)}>
         <div className={styles.container2}>
                <div className={styles.chatsCont}>
         <h1>Socket.IO Chat</h1>
        <div>
          {this.state.messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <div className={styles.editDiv}>
                                            <textarea className={styles.mesoInput} id='theMessage' placeholder='Write your message here'  multiple onChange={(event)=>this.inputChange(event)}/>
                                            <IoMdArrowDroprightCircle className={styles.sendIc} onClick={()=>this.sendMessage()} />
                                            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Messages4;