import { useSas } from '../../global/components/SasProvider.jsx'
import '../styles/moreProducts.css'

export function NewProductTile({item,onClick}){
    const sasToken=useSas();

    return(
        <button className='newProductTile' onClick={()=>onClick(item)}>
            <img className='newProductImage' src={`${item.imageUrl}?${sasToken}`}/>
            <label className='m-2'>{item.name}</label>
        </button>
    )
}