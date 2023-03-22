import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Signup(){
  const handleSubmit = e =>{
    e.preventDefault();
    let loginInfo = dateTime;
    axios.post('/api/register',{userID, userPWD, userName, userEmail, loginInfo})
    .then(res=>{
      alert(`Thank you ${userName} for sigining up!`)
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
      <button type="submit">Submit</button>
    </form>
  )
}

export default Signup;