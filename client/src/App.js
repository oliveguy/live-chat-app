import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';
import Home from './components/Home';
import Main from './components/Main';
import Profile from './components/Profile';
import Setting from './components/Setting';

function App() {
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  let navigate = useNavigate()
// User Information Saved in userInfo from SESSION
  useEffect(()=>{
    if(sessionStorage.getItem('user_id')){
      setLogin(true);
      setUserInfo([
        sessionStorage.getItem('user_id'),
        sessionStorage.getItem('user_name'),
        sessionStorage.getItem('user_email'),
        sessionStorage.getItem('user_lastLogin')
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
        <Route path="/main" element={<Main />} >
          <Route path="profile" element={<Profile userInfo={userInfo}/>} />
          <Route path="chat" element={<Chat />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>

    </div>
  );
}

// LOGIN::https://ddeck.tistory.com/33 

export default App;
