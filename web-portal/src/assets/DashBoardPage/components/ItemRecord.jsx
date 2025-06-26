import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider'
export function ItemRecord({item}){
    const sasToken=useSas();
    if(item==null){
        return(<></>);
    }
    return(
        <div className='itemRecord'>
            <img className='itemImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
            {"unitPrice" in item?<label>{item.unitPrice}</label>:null}
        </div>
    )
}