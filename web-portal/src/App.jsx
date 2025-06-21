import { useState } from 'react';
import { LoginPage } from './assets/LoginPage/LoginPage';
import { DashBoardPage } from './assets/DashBoardPage/DashBoardPage';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashBoardPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
