import './App.css'
import { LoginPage } from './assets/LoginPage/LoginPage';
import { DashBoardPage } from './assets/DashBoardPage/DashBoardPage';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { ChatPage } from './assets/ChatPage/ChatPage';
import { useEffect } from 'react';
import SignalrService from './assets/SignalrService';

function App() {
  useEffect(()=>{
    SignalrService.startConnection();
  },[])
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashBoardPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
