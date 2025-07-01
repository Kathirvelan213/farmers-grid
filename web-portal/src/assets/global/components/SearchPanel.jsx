import '../styles/global.css';
import { useState } from 'react';

export function SearchPanel({items,filterKey,DisplayComponent,displayComponentProps,searchBarOverrideStyle,searchPanelOverrideStyle,placeholderText}){
    const [selected,setSelected]=useState('');
       
    function handleSearchChange(e){
        setSelected(e.target.value);
    }

    const query=selected.toLowerCase(); 
    const filteredItems=items.filter((items)=>{
                return query===''||items[filterKey].toLowerCase().includes(query);
            })

    return (
        <div className={`searchPanel ${searchPanelOverrideStyle??''}`}>
            <input placeholder={placeholderText??'Enter'} value={selected} onChange={handleSearchChange} className={`searchBar ${searchBarOverrideStyle??''}`}/>
            <DisplayComponent items={filteredItems} {...displayComponentProps}></DisplayComponent>
        </div>
    )
}
