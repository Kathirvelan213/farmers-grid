import './styles/DashBoardPage.css';
import { MyProductsPanel } from './components/MyProductsPanel.jsx';
import { ProfilePanel } from './components/ProfilePanel.jsx';


export function DashBoardPage(){
    return (
        <div className='dashBoardPage'>
            <ProfilePanel></ProfilePanel>
            <div className='temp col-span-2'></div>
            <div className='row-span-2'></div>
            <div className='temp'></div>
            <div className='temp'></div>
            <MyProductsPanel className="col-span-2"></MyProductsPanel>
        </div>
    )
}
    
