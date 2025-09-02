import React, { Component } from 'react';
import styles from "./Chats.module.scss";
import postTime from '../Helper/postTime';
import Image from 'next/image'
var theImg = 'https://images.pexels.com/photos/447186/pexels-photo-447186.jpeg'
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineClose,MdAddComment } from "react-icons/md";

class Chats extends Component {
    state={theChats:[
    {id:1693499400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1725121800000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1746117000000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1753979400000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1755707400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756398600000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1756571400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756657200000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'send'},
    {id:1756657800000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1756657920000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'read'},
    {id:1756658400000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756658460000,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'},
    {id:1756720200000,meso:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',userId:2,status:'read'},
    {id:1756720723788,meso:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',userId:3,status:'send'}
  ]}

    componentDidMount=()=>{
        var theChats = this.state.theChats.sort(function (a, b) { return b.id - a.id });
        this.setState({theChats})
    }
    
    openMessages=()=>{
        console.log('clicked!')
    this.props.onClick('fromChats','chatId')
    }
     openFriends=()=>{
        console.log('clicked!')
    this.props.onClick('fromChats','openFriends','N/A')
    }
    closeMessenger=()=>{
        console.log('clicked!')
        this.props.onClick('fromChats','close','N/A')
    }
    doNothing = (event) => {
    event.stopPropagation();
    event.preventDefault()
  }
    render() {
        return (
            <div className={styles.container} onClick={(event)=>this.doNothing(event)}>
                <div className={styles.headerDiv}>
                    <h2>Chats</h2>
                <MdOutlineClose   className={styles.backIc} onClick={()=>this.closeMessenger()}/>
                </div>
                <div className={styles.chatsCont}>
                {this.state.theChats.map((item,index)=>{
        
                 return(
                    <div className={styles.chatItenDiv} key={index} onClick={()=>this.openMessages()}>
                        <div className={styles.imgDiv}>
                       <Image className={styles.theImg} src={theImg}  alt={'RAM User'} height={50} width={50} objectFit='fit'/>
                        </div>
                        <div>
                          <div className={styles.nameDiv}>
                           <p className={styles.nameP}>Kim John</p>
                           <p className={styles.timeP} style={{color:item.status!=='read'?'#df5959ff':null}}>{postTime(item.id)}</p>
                            </div>
                            <p className={styles.mesoP}>{item.meso}</p>
                            
                               {item.status!=='read'?<AiFillMessage className={styles.mesoIc}/>:null}
                           
                        </div>
                    </div>)})}
                </div>
                <div className={styles.addChat} onClick={()=>this.openFriends()}>
                    <MdAddComment className={styles.chatIc}/>
                </div>
            </div>
        );
    }
}

export default Chats;