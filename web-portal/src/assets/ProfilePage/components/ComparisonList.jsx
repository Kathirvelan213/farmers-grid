import '../styles/ProfilePage.css';
import { ComparisonRecord } from './ComparisonRecord';

export function ComparisonList({items,keyField,setItems}){    
    return(
        <div className='comparisonList'>
            {items.map((item)=>(
                <ComparisonRecord item={item} key={item[keyField]} setItems={setItems}></ComparisonRecord>
            ))}
        </div>
    )
}