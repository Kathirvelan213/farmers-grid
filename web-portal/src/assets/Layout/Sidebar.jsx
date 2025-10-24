import { useState } from 'react';
import './styles/layout.css'
import { Sidebar as ProSideBar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome,FaApple,FaUser, FaMoneyBill, FaComment, FaList } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../global/components/AuthProvider';

export function Sidebar({className}){
    const location=useLocation();
    const [collapsed,setCollapsed]=useState(false);
    const {user,loading}=useAuth();
    if(loading){
      return <div>loading</div>
    }
    return (
        <div>
            <ProSideBar collapsed={collapsed}>
            <Menu>
                {/* <SubMenu label="Charts">
                </SubMenu> */}
                <MenuItem 
                    icon={<FaHome/>} 
                    active={location.pathname==='/'}
                    component={<Link to='/'/>}> Home </MenuItem>
                {user.role=='Seller'&&<MenuItem icon={<FaApple/>}
                    active={location.pathname==='/'}
                    component={<Link to='/myProducts'/>}> MyProducts </MenuItem>}
                {user.role=='Retailer'&&<MenuItem icon={<FaApple/>}
                    active={location.pathname==='/'}
                    component={<Link to='/myRequests'/>}> MyRequests </MenuItem>}
                <MenuItem icon={<FaComment/>}
                    active={location.pathname==='/chat'}
                    component={<Link to='/chat'/>}>Chat </MenuItem>
                <MenuItem icon={<FaList/>}
                    active={location.pathname==='/requests'}
                    component={<Link to='/requests'/>}>Requests </MenuItem>
                <MenuItem icon={<FaUser />}
                    active={location.pathname==='/users'}
                    component={<Link to='/users'/>}>Users </MenuItem>
                <MenuItem
                    icon={<FaMoneyBill/>}
                    active={location.pathname==='/'}
                    component={<Link to='/'/>}> Prices </MenuItem>
            </Menu>
            </ProSideBar>
            <button onClick={()=>setCollapsed(prev=>!prev)}>{collapsed?'open':'close'}</button>
        </div>
    )
}


