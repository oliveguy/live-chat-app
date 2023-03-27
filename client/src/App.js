import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';
function App() {
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(()=>{
    if(sessionStorage.getItem('user_id')){
      setLogin(true);
      setUserInfo([
        sessionStorage.getItem('user_id'),
        sessionStorage.getItem('user_name')
      ])
    }
  },[])
console.log(userInfo)
  return (
    <div className="App">
      <h1>Your live-chat-app</h1>
      <h2>Sign up</h2>
      <Signup />
      <Login />
      <Chat />
      <p>Welcome back! {<span>{userInfo[1]}</span>}</p>
    </div>
  );
}

// LOGIN::https://ddeck.tistory.com/33 

export default App;
