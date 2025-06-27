import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';
export function ItemRecord({item,setItems}){
    const sasToken=useSas();
    const [editState,setEditState]=useState(false);
    const [price,setPrice]=useState(item.unitPrice)
    
    if(item==null){
        return(<></>);
    }
    function handleSave(){
        setEditState(false);
        item.unitPrice=price;
        setItems(prev=>({...prev,[item.id]:item}));
    }
    return(
        <div className='itemRecord'>
            <img className='itemImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
            {!editState?
            <label>{price}</label>:
            <input value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>

            }
            {!editState?
            <button><FaEdit onClick={()=>setEditState(true)}></FaEdit></button>:
            <button><FaSave onClick={handleSave}></FaSave></button>}
            <button><FaTrash></FaTrash></button>
        </div>
    )
}