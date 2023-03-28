import { useEffect, useState } from 'react';
import '../App.css';
import { Routes, Route, Link,useNavigate, Outlet } from 'react-router-dom'

function Setting(){
  let navigate = useNavigate()
  return(
    <div className='setting'>
      <h3>Setting</h3>
      <button onClick={()=>{ sessionStorage.clear(); navigate('/');}}>Log out</button>
    </div>
  )
}

export default Setting;