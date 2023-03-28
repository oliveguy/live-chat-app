import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link ,useNavigate, Outlet} from 'react-router-dom'

function Login(){
  let navigate = useNavigate()
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
    axios.post('/api/login',
    {inputID, inputPWD, dateTime})
    .then((res)=> {
      sessionStorage.setItem('user_id', res.data.data.userID);
      sessionStorage.setItem('user_name', res.data.data.userName);
      document.location.href = '/';
    })
    .catch();
  }

  return (
    <div className='login'>
      <h2>Log-in</h2>
      <p>Welcome back!</p>
        <form action="" onSubmit={loginHandler}>
          <input type="text" name="userID" value={inputID} onChange={IDHandler} placeholder='user ID' required/>
          <input type="password" name="userPWD" value={inputPWD} onChange={PWDHandler}placeholder='Password' required/>
          <input type="submit" value="LOGIN" />
        </form>
        <p className='signup'>Don’t you have ID? just sign up here</p>
        <button onClick={()=>{ navigate('/signup') }}>Signup</button>
    </div>
  )
}

export default Login