import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider.jsx';

export function AddProductPanel({item}){
    const sasToken=useSas();
    
    if(item==null){
        return(<></>)
    }
    return (
        <div className='itemRecord'>
            <img className='itemImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
        </div>
    )
}