import '../styles/moreProducts.css'
import { NewProductTile } from './NewProductTile.jsx';

export function MoreProductsGallery({items,onClick,keyField}){
    return(
        <div className='moreProductsGallery'>
            {items.map((item)=>(
                <NewProductTile item={item} key={item[keyField]} onClick={onClick}></NewProductTile>
            ))}
        </div>
    )
}