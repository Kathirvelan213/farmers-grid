import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider'
export function ItemRecord({item}){
    const sasToken=useSas();

    return(
        <div className='itemRecord'>
            <img className='itemImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
            <label>{item.unitPrice}</label>
        </div>
    )
}