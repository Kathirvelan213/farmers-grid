import { useState } from 'react';
import { LoginPage } from './assets/LoginPage/LoginPage';
import { DashBoard } from './assets/DashBoardPage/components/DashBoard';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
