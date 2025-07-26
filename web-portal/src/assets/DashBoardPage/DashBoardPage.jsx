import './styles/DashBoardPage.css';
import { MyProductsPanel } from './components/MyProductsPanel';
import { ProfilePanel } from './components/ProfilePanel';
import { Sidebar } from '../Layout/Sidebar';


export function DashBoardPage(){
    return (
        <div className='dashBoardPage'>
            <ProfilePanel></ProfilePanel>
            <div className='temp col-span-2'></div>
            <Sidebar className='row-span-2'></Sidebar>
            <div className='temp'></div>
            <div className='temp'></div>
        <MyProductsPanel className="col-span-2"></MyProductsPanel>
        </div>
    )
}
    
