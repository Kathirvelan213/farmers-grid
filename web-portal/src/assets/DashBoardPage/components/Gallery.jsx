import '../styles/DashBoardPage.css';
import { ItemTile } from './ItemTile';

export function Gallery({items}){
    return(
        <div className='itemGallery'>
            {items.map((item)=>(
                <ItemTile item={item} key={item.id}></ItemTile>
            ))}
        </div>
    )
}