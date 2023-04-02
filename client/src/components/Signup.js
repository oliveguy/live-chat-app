import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link ,useNavigate, Outlet} from 'react-router-dom'

function Signup(){
  let navigate = useNavigate()
  const handleSubmit = e =>{
    e.preventDefault();
    let loginInfo = dateTime;
    axios.post('/api/register',{userID, userPWD, userName, userEmail, loginInfo})
    .then(res=>{
      alert(`Thank you ${userName} for sigining up!`)
      sessionStorage.setItem('user_id', userID);
      sessionStorage.setItem('user_name', userName);
      sessionStorage.setItem('user_email', userEmail);
      sessionStorage.setItem('user_lastLogin', loginInfo);
      navigate('/main/profile')
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  // Current time and date
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;
  // Input states
  const [userID, setID] = useState('');
  const [userPWD, setPWD] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setEmail] = useState('');

  return(
    <div className='signup'>
      <h2>Sign up</h2>
      <p>Sign up now for our live chatting app and discover a whole new world of communication that is fast, reliable, and convenient.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userID"
          placeholder='ID'
          value={userID}
          onChange={(e)=>setID(e.target.value)}
        />
        <input 
          type="password"
          name="userPWD"
          placeholder='Password'
          value={userPWD}
          onChange={(e)=>setPWD(e.target.value)}
        />
        <input 
          type="text"
          name="userName"
          placeholder='Your Name'
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}
        />
        <input 
          type="email"
          name="userEmail"
          placeholder='Email'
          value={userEmail}
          onChange={(e)=>setEmail(e.target.value)}
          />
        <div className='submitCancel'>
          <button type="submit">Submit</button>
          <button onClick={(e)=>{e.preventDefault(); navigate(-1)}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Signup;