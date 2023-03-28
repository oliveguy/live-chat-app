import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

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
      sessionStorage.setItem('user_email', res.data.data.userEmail);
      sessionStorage.setItem('user_lastLogin', res.data.data.loginInfo);
      document.location.href = '/main/profile';
    })
    .catch((err)=>{if(err.response.data.data == 'noID'){
      alert('Id you typed in is not valid!');
      setInputID('');
      setInputPWD('');
    } else if(err.response.data.data == 'nopassword'){
      alert('Inccorect passord!');
      setInputPWD('');
    }
  });
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