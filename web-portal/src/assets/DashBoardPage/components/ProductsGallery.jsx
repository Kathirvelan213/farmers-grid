import '../styles/DashBoardPage.css';
import { ProductTile } from './ProductTile';

export function ProductsGallery({products}){
    return(
        <div className='productsGallery'>
            {products.map((product,index)=>(
                <ProductTile product={product} key={index}></ProductTile>
            ))}
        </div>
    )
}