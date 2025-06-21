import '../styles/DashBoardPage.css';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../../apiConsumer/productsAPI';

export function SearchPanel(){
    const [selected,setSelected]=useState('');
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const getProducts=async ()=>{
            try{
                const result=await getProductsAPI();
                setProducts(result.data);
                console.log(result.data);
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
    // const Products=[{"id":1,"name":"potato"},{"id":2,"name":'tomato'},{"id":3,"name":'spinach'},{"id":4,"name":'brinjal'}]
    const query=selected.toLowerCase(); 
    const filteredProducts=products.filter((product)=>{
                return query===''||product.name.toLowerCase().includes(query);
            })
            
    return (
        <div className='searchPanel'>
            <input placeholder='Enter' value={selected} onChange={handleSearchChange}/>
            {filteredProducts.map((product,index)=>(
                <div key={index}>
                    <label>
                        {product.name}
                    </label>
                </div>
            ))}
        </div>
    )
}
