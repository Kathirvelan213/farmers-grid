import '../styles/DashBoardPage.css';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../../apiConsumer/productsAPI';
import { ProductsGallery } from './ProductsGallery';

export function SearchPanel(){
    const [selected,setSelected]=useState('');
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const getProducts=async ()=>{
            try{
                const result=await getProductsAPI();
                setProducts(result.data);
            }
            catch(e){
                console.error(e);
            }
        }
        getProducts();
    },[]);

    
    
    function handleSearchChange(e){
        setSelected(e.target.value);
    }
    const query=selected.toLowerCase(); 
    const filteredProducts=products.filter((product)=>{
                return query===''||product.name.toLowerCase().includes(query);
            })

    return (
        <div className='searchPanel'>
            <input placeholder='Enter' value={selected} onChange={handleSearchChange} className='searchBar'/>
            <ProductsGallery products={filteredProducts}></ProductsGallery>
        </div>
    )
}
