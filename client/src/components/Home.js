import { useEffect, useState } from 'react';
import '../App.css';
import { Routes, Route, Link ,useNavigate, Outlet} from 'react-router-dom'

function Home(){
  let navigate = useNavigate()
  return(
  <div className="home">
    <h2 className="homeT">T</h2>
    <h3>Connect with people worldwide in real-time</h3>
    <p>Welcome to TalkieTalk!, where you can connect with people from around the world in real-time and enjoy seamless communication through instant messaging</p>
    {!sessionStorage.getItem('user_id') ?
      <div className='cta'>
        <button onClick={()=>{ navigate('/login') }}>LOGIN</button>
        <button onClick={()=>{ navigate('/signup') }}>SIGNUP</button>
      </div>:
      <div className='cta'>
        <button onClick={()=>{ navigate('/main/profile') }}>Go to main</button>
        <button onClick={()=>{ sessionStorage.clear(); navigate('/');}}>Log out</button>
      </div>
    }
    <p className='shortP'>Experience the power of real-time communication with our live chatting app! Connect with friends, family, and new acquaintances from around the world with ease. Join our community and start chatting today!</p>

  </div>
  )
}

export default Home;