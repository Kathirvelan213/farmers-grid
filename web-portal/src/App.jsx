import './App.css'
import { LoginPage } from './assets/LoginPage/LoginPage';
import { DashBoardPage } from './assets/DashBoardPage/DashBoardPage';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { ChatPage } from './assets/ChatPage/ChatPage';
import { useEffect } from 'react';
import SignalrService from './assets/SignalrService';
import User from './assets/global/UserDetails';
import { UsersPage } from './assets/UsersPage/UsersPage';
import { ProfilePage } from './assets/ProfilePage/ProfilePage';

function App() {
  useEffect(()=>{
    SignalrService.startConnection();
    User.getId();
  },[])
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashBoardPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path='/user/:userName' element={<ProfilePage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
