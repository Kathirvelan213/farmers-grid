import '../styles/ProfilePage.css'
import { useSas } from '../../global/components/SasProvider'


export function ComparisonRecord({item,setItems}){
    const sasToken=useSas();
    return(
        <div className='comparisonRecord'>
            <img className='comparisonImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
            <label>₹{item.myPrice}</label>
            <label>₹{item.othersPrice}</label>
        </div>
    )
}