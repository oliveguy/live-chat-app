import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate, Outlet } from 'react-router-dom'
import profile from '../profile.png';
import talk from '../talk.png';
import setting from '../setting.png';
function Main(){
  let navigate = useNavigate()
  const[select,setSelect] = useState('');
  useEffect(()=>{
    if(!sessionStorage.getItem('user_id')){
      alert('You need to login to see this page')
      navigate('/');
    }
  },[])
  return(
    <div className='main'>
      <nav className='mainNav'>
        <a onClick={(e)=>{ e.preventDefault(); navigate('/main/profile'); setSelect('');setSelect(0);}}><img src={profile} alt="profile" className={select==0?'select':''}/></a>
        <a onClick={(e)=>{ e.preventDefault(); navigate('/main/chat'); setSelect('');setSelect(1);}}><img src={talk} alt="talk" className={select==1?'select':''}/></a>
        <a onClick={(e)=>{ e.preventDefault(); navigate('/main/setting'); setSelect('');setSelect(2);}}><img src={setting} alt="setting" className={select==2?'select':''}/></a>
      </nav>
      <Outlet></Outlet>
    </div>
  )
}

export default Main;