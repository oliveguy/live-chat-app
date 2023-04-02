import { useEffect, useState } from 'react';
import '../App.css';
import { Routes, Route, Link,useNavigate, Outlet } from 'react-router-dom'

function Profile(props){
  let user = sessionStorage
  return(
    <div className='profile'>
      <h3>User's Information</h3>
      <ul>
        <li>ID: <strong>{user.user_id}</strong></li>
        <li>Name: <strong>{user.user_name}</strong></li>
        <li>Email: <strong>{user.user_email}</strong></li>
        <li>Last Login: <strong>{user.user_lastLogin}</strong></li>
      </ul>
    </div>
  )
}
export default Profile;