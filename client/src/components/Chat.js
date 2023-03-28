import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

function Chat(){
  useEffect(()=>{
    const socket = io.connect("http://localhost:8080");
    console.log(socket) // Connected with WebSocket

  },[])

  return (
    <>
    <ul>
    {/* 만약 있다면 {}기존 chat history pulled by MongoDB */}
    {/* 새로운 채팅내용 MongoDB저장{ChatRoom#, userName, msg} */}
    </ul>
    <form action="">
      <input type="text" />
      <input type="submit" />
    </form>
    </>
  )
}

export default Chat

// fixed bottom
// https://velog.io/@sgyos000/chatting