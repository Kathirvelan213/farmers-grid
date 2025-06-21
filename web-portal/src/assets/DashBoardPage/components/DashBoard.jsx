import '../styles/DashBoardPage.css';
import { useState } from 'react';

export function SearchPanel(){
    const [selected,setSelected]=useState('');
    function handleSearchChange(e){
        setSelected(e.target.value);
    }
    
    const Products=[{"id":1,"name":"potato"},{"id":2,"name":'tomato'},{"id":3,"name":'spinach'},{"id":4,"name":'brinjal'}]
    const query=selected.toLowerCase(); 
    return (
        <div className='searchPanel'>
            <input placeholder='Enter' value={selected} onChange={handleSearchChange}/>
            {Products.filter((product)=>{
                return query===''||product.name.toLowerCase().includes(query);
            }).map((filterdProduct,index)=>(
                <div key={index}>
                    <label>
                        {filterdProduct.name}
                    </label>
                </div>
            ))}
        </div>
    )
}
