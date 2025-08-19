import '../styles/DashBoardPage.css';
import { ItemTile } from './ItemTile.jsx';

export function Gallery({items,onClick,keyField}){
    return(
        <div className='itemGallery'>
            {items.map((item)=>(
                <ItemTile item={item} key={item[keyField]} onClick={onClick}></ItemTile>
            ))}
        </div>
    )
}