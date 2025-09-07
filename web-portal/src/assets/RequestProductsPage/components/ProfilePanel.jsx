import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider.jsx';

export function ProfilePanel({user}){
        const sasToken=useSas();
    
    return(
        <div className='profilePanel'>
            <img className='profilePic' src={`https://kathirsstorageaccount.blob.core.windows.net/farmers-grid-storage/Chilli.webp?${sasToken}`}/>
            <label className='self-end text-red-500 text-lg font-bold'>UserName</label>
            <label>turn up the heat</label>

        </div>
    )
}