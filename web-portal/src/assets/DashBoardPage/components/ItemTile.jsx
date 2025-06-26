import { useSas } from '../../global/components/SasProvider'
import '../styles/DashBoardPage.css'

export function ItemTile({item,onClick}){
    const sasToken=useSas();

    return(
        <button className='itemTile' onClick={()=>onClick(item)}>
            <img className='itemImage' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
        </button>
    )
}