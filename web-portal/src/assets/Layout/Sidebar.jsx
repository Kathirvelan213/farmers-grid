import { useState } from 'react';
import './styles/layout.css'
import { Sidebar as ProSideBar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome,FaApple,FaUser, FaMoneyBill, FaComment } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar({className}){
    const location=useLocation();
    const [collapsed,setCollapsed]=useState(false);
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
                <MenuItem icon={<FaApple/>}
                    active={location.pathname==='/'}
                    component={<Link to='/'/>}> MyProducts </MenuItem>
                <MenuItem icon={<FaComment/>}
                    active={location.pathname==='/chat'}
                    component={<Link to='/chat'/>}>Chat </MenuItem>
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


