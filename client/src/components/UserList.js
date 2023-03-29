import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Outlet } from 'react-router-dom'
import ScrollToBottmom from 'react-scroll-to-bottom';
import { io } from 'socket.io-client';
const socket = io("http://localhost:8080");

function Userlist(props){
  // USER LISTING
  const [userlist, setUserList] = useState([])
  useEffect(()=>{
      axios.get('/api/userlist')
      .then((res=>{
        setUserList(res.data)
      }))
  },[])
  // Sending msg
  const [currentMsg, setCurrentMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const sendMsg = async()=>{
    if(currentMsg !== ''){
      let current = new Date();
      let cTime = current.getHours() + ":" + current.getMinutes();
      let dateTime = cTime;
      dateTime = current.toLocaleString('en-US',{hour:'numeric',minute:'numeric', hour12:true})
      const msg ={
        author: props.userInfo[1],
        message: currentMsg,
        time: dateTime
      };
      await socket.emit('userMSG', msg);
    }
  }

  useEffect(()=>{
    socket.on('broadcast',(data)=>{
      setMsgList((list)=>[...list,data])
      setCurrentMsg('');
    })
  },[socket])

  return(
    <div className="userSpace">
      <ul className='userlist'>
        <li><h3>User List</h3></li>
        {userlist.map((user)=>{
          return (
            <li key={user.userID}>
              <span className='name'>{user.userName}</span>
              <span className='email'>{user.userEmail}</span>
            </li>
            )
        })
        }
      </ul>
      <div className='chatWindowWrapper'>
        <div className='chatWindow'>
          <ul className='msgContainer'>
            <ScrollToBottmom className='msgContainer'>
            {msgList.map((msgContent)=>{
              return(
              <li className={props.userInfo[1] == msgContent.author ? "you":"other"}>
                <div className='nameTime'>
                  <span className='chatName'>{msgContent.author}</span>
                  <span>{msgContent.time}</span>
                </div>
                <span className='msg'>{msgContent.message}</span>
              </li>
              )
            })}
            </ScrollToBottmom>
          </ul>
          <div className='field'>
            <input
            type="text"
            value ={currentMsg}
            onChange={(e)=>{
              setCurrentMsg(e.target.value);
            }}
            onKeyPress={(e)=>{
              e.key == "Enter" && sendMsg()
            }}
            placeholder="Type your message here"/>
            <button onClick={sendMsg}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userlist;