import '../styles/DashBoardPage.css';
import { ItemRecord } from './Itemrecord';

export function ItemsList({items}){
    return(
        <div className='itemList'>
            {items.map((item)=>(
                <ItemRecord item={item} key={item.id}></ItemRecord>
            ))}
        </div>
    )
}