import '../styles/DashBoardPage.css';
import { ItemRecord } from './ItemRecord.jsx';

export function ItemsList({items,keyField,setItems}){    
    return(
        <div className='itemList'>
            {items.map((item)=>(
                <ItemRecord item={item} key={item[keyField]} setItems={setItems}></ItemRecord>
            ))}
        </div>
    )
}
