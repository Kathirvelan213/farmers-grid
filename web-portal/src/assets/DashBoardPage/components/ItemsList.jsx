import '../styles/DashBoardPage.css';
import { ItemRecord } from './Itemrecord';

export function ItemsList({items,keyField}){
    return(
        <div className='itemList'>
            {items.map((item)=>(
                <ItemRecord item={item} key={item[keyField]}></ItemRecord>
            ))}
        </div>
    )
}