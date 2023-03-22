import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      <h1>Your live-chat-app</h1>
      <h2>Sign up</h2>
      <Signup />
      <Login />
    </div>
  );
}

// LOGIN::https://ddeck.tistory.com/33 

export default App;
