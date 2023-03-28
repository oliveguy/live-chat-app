import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link,useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import io from 'socket.io-client';
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';
import Home from './components/Home';
function App() {
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  let navigate = useNavigate()

  useEffect(()=>{
    if(sessionStorage.getItem('user_id')){
      setLogin(true);
      setUserInfo([
        sessionStorage.getItem('user_id'),
        sessionStorage.getItem('user_name')
      ])
    }
  },[])
  return (
    <div className="App">
      <header>
        <p>Your live chatting app</p>
        <h1 onClick={()=>{ navigate("/")}}>TalkieTalk</h1>
        <p>
          { sessionStorage.getItem('user_id') ?
          <span>Welcome! <strong>{userInfo[1]}</strong></span>:
          <span></span>
          }
          </p>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>

    </div>
  );
}

// LOGIN::https://ddeck.tistory.com/33 

export default App;
