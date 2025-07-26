import { useState } from 'react';
import './styles/layout.css'
import { Sidebar as ProSideBar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome,FaApple,FaUser } from 'react-icons/fa';

export function Sidebar({className}){
    const [collapsed,setCollapsed]=useState(false);
    return (
        <div>
            <ProSideBar collapsed={collapsed}>
            <Menu>
                {/* <SubMenu label="Charts">
                </SubMenu> */}
                <MenuItem icon={<FaHome/>}> Home </MenuItem>
                <MenuItem icon={<FaApple/>}> MyProducts </MenuItem>
                <MenuItem icon={<FaUser/>}>Users </MenuItem>
                <MenuItem> Prices </MenuItem>
            </Menu>
            </ProSideBar>
            <button onClick={()=>setCollapsed(prev=>!prev)}>{collapsed?'open':'close'}</button>
        </div>
    )
}


