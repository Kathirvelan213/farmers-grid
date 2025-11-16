import './App.css'
import { LoginPage } from './assets/LoginPage/LoginPage';
import { DashBoardPage } from './assets/DashBoardPage/DashBoardPage';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { ChatPage } from './assets/ChatPage/ChatPage';
import { useEffect } from 'react';
import SignalrService from './assets/SignalrService';
// import User from './assets/global/UserDetails';
import { UsersPage } from './assets/UsersPage/UsersPage';
import { ProfilePage } from './assets/ProfilePage/ProfilePage';
import {RequestProductsPage} from './assets/RequestProductsPage/RequestProductsPage'
import { Navigate } from "react-router-dom";
import { useAuth } from './assets/global/components/AuthProvider';
import { UnauthorizedPage } from './assets/UnauthorizedPage/UnauthorizedPage';
import { Layout } from './assets/Layout/Layout';
import { MyProductsPage } from './assets/MyProducts/MyProductsPage';
import { RequestsPage } from './assets/RequestsPage/RequestsPage.jsx';
import { TransportationPage } from './assets/TransportationPage/TransportationPage.jsx';


function ProtectedRoute({children,allowedRoles}){
    const {user,loading,getMyInfo,clearMyInfo}=useAuth();
    if(!user){
      return <Navigate to='/login'/>;
    }
    if(allowedRoles && !allowedRoles.includes(user.role)){
      return <Navigate to='/unauthorized'/>;
    }
    if(loading){
      return <div>loading</div>
    }
    return children;
}


function App() {
  useEffect(()=>{
    SignalrService.startConnection();
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/" element={<Layout/>}>

            <Route path='/' element={<ProtectedRoute> <DashBoardPage/> </ProtectedRoute>}/>
            <Route path='/chat' element={<ProtectedRoute> <ChatPage/> </ProtectedRoute>}/>
            <Route path='/users' element={<ProtectedRoute> <UsersPage/> </ProtectedRoute>}/>
            <Route path='/user/:userName' element={<ProtectedRoute> <ProfilePage/> </ProtectedRoute>}/>
            <Route path='/myRequests' element={<ProtectedRoute allowedRoles={['Retailer']}><RequestProductsPage/> </ProtectedRoute>}/>
            <Route path='/myProducts' element={<ProtectedRoute allowedRoles={['Seller']}><MyProductsPage/> </ProtectedRoute>}/>
            <Route path='/requests' element={<ProtectedRoute><RequestsPage/> </ProtectedRoute>}/>
            <Route path='/transportation' element={<ProtectedRoute><TransportationPage/> </ProtectedRoute>}/>
            <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
