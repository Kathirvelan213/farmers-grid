import { useSas } from '../../global/components/SasProvider'
import '../styles/DashBoardPage.css'

export function ProductTile({product}){
    const sasToken=useSas();

    return(
        <button className='productTile'>
            <img className='productImage' src={`${product.imageUrl}?${sasToken}`}/>
            <label>{product.name}</label>
        </button>
    )
}