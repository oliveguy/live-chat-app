import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const socket = io.connect("http://localhost:8080");
function Chat(props){
  // useEffect(()=>{

  // },[])
  return (
    <div className='chat'>
    <ul>
    {/* 만약 있다면 {}기존 chat history pulled by MongoDB */}
    {/* 새로운 채팅내용 MongoDB저장{ChatRoom#, userName, msg} */}
    </ul>
    <form action="" onClick={(e)=>{e.preventDefault();}}>
      <input type="text" />
      <input type="submit" />
    </form>
    </div>
  )
}

export default Chat

// fixed bottom
// https://velog.io/@sgyos000/chatting
// To specific user
// https://velog.io/@code_sign/ToyProject-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B1%84%ED%8C%85%EA%B3%BC-%EA%B7%93%EC%86%8D%EB%A7%90%EA%B9%8C%EC%A7%80-feat.-socket.io