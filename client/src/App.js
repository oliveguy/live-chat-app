import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
useEffect(()=>{
  axios.get('/api/')
  .then((res)=>{
    console.log(res.data);
  })
  .catch((err)=>{
    console.log("error: "+err);
  })
})

  return (
    <div className="App">
      <p>Hello</p>
    </div>
  );
}

export default App;
