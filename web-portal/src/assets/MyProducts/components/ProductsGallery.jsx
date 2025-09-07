import '../styles/myProductsPage.css'
import { ProductTile } from './ProductTile'

export function ProductsGallery({items,setItems,keyField}){
    return(
        <div className='productsGallery'>
            {items.map((item)=>(
                <ProductTile item={item} key={item[keyField]} setItems={setItems}></ProductTile>
            ))}
        </div>
    )
}