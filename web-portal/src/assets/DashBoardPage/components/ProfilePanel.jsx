import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider.jsx';
import { useAuth } from '../../global/components/AuthProvider.jsx';

export function ProfilePanel(){
        const sasToken=useSas();
    const {user,loading,getMyInfo,clearMyInfo}=useAuth();
    
    return(
        <div className='profilePanel'>
            <img className='profilePic' src={`https://kathirsstorageaccount.blob.core.windows.net/farmers-grid-storage/Chilli.webp?${sasToken}`}/>
            <label className='self-end text-red-500 text-lg font-bold'>{user.userName}</label>
            <label>{user.role}</label>

        </div>
    )
}