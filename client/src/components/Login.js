import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Login(){
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;

  const [inputID, setInputID] = useState('');
  const [inputPWD, setInputPWD] = useState('');

  const IDHandler = (e)=>{
    setInputID(e.target.value)
  }
  const PWDHandler = (e)=>{
    setInputPWD(e.target.value)
  }
  const loginHandler =(e)=>{
    e.preventDefault();
    axios.post('/api/login',{inputID, inputPWD, dateTime})
    .then(res=> console.log(res.data))
    .catch();
  }

  return (
    <>
    <h2>Login</h2>
    <form action="" onSubmit={loginHandler}>
      <input type="text" name="userID" value={inputID} onChange={IDHandler} placeholder='userID' />
      <input type="password" name="userPWD" value={inputPWD} onChange={PWDHandler}placeholder='password' />
      <input type="submit" value="LOGIN" />
    </form>
    </>
  )
}

export default Login