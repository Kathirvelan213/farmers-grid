import '../styles/DashBoardPage.css';
import { useState } from 'react';
import { Gallery } from './Gallery';

export function SearchPanel({items,filterKey}){
    const [selected,setSelected]=useState('');
       
    function handleSearchChange(e){
        setSelected(e.target.value);
    }

    const query=selected.toLowerCase(); 
    const filteredItems=items.filter((items)=>{
                return query===''||items[filterKey].toLowerCase().includes(query);
            })

    return (
        <div className='searchPanel'>
            <input placeholder='Enter' value={selected} onChange={handleSearchChange} className='searchBar'/>
            <Gallery items={filteredItems}></Gallery>
        </div>
    )
}
