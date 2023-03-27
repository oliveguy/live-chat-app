import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function Chat(){
  useEffect(()=>{
    const socket = io.connect("http://localhost:8080");
    console.log(socket)

  },[])

  return (
    <>
    <ul>

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