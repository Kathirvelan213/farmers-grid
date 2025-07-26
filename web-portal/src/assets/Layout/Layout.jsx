import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function Layout(){
    return(
        <div className="layout">
            <TopBar className="col-span-2"/> 
            <Sidebar/>
            <div className="mainContent">
                <Outlet/>
            </div>
        </div>
    )
}