import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { ChangePriceAPI,RemoveProductsAPI } from '../../apiConsumer/productsAPI';
import { useState } from 'react';
export function ItemRecord({item,setItems}){
    const sasToken=useSas();
    const [editState,setEditState]=useState(false);
    const [price,setPrice]=useState(item.unitPrice)
    
    async function handleSave(){
        setEditState(false);
        await ChangePriceAPI({id:item.rowId,unitPrice:price});
        item.unitPrice=price;
        setItems(prev=>({...prev,[item.id]:item}));
    }
    async function handleDelete(){
        await RemoveProductsAPI({id:item.rowId});
        setItems(prev=>{
            const {[item.id]:removed,...others}=prev;
            return others;
        });
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
            <button onClick={()=>setEditState(true)}><FaEdit ></FaEdit></button>:
            <button onClick={handleSave}><FaSave ></FaSave></button>}
            <button  onClick={handleDelete}><FaTrash></FaTrash></button>
        </div>
    )
}