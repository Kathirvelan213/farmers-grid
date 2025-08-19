import '../styles/DashBoardPage.css'
import { useSas } from '../../global/components/SasProvider.jsx'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { ChangePriceAPI, RemoveProductsAPI } from '../../apiConsumer/requestProductsAPI.js';
export function ItemRecord({item,setItems}){
    const sasToken=useSas();
    const [editState,setEditState]=useState(false);
    const [price,setPrice]=useState(item.unitPrice)
    
    async function handleSave(){
        setEditState(false);
        await ChangePriceAPI({id:item.id,unitPrice:price});
        item.unitPrice=price;
        setItems(prev=>({...prev,[item.id]:item}));
    }
    async function handleDelete(){    
        await RemoveProductsAPI({id:item.id});
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
            <label>₹{price}</label>:
            <input value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>

            }
            {!editState?
            <button className='recordButton' onClick={()=>setEditState(true)}><FaEdit className='recordIcon !text-blue-400' ></FaEdit></button>:
            <>
            {/* <button className='recordButton' onClick={()=>{setEditState(false)}}><FaTimes  className='recordIcon !text-red-400'></FaTimes></button> */}
            <button className='recordButton' onClick={handleSave}><FaSave  className='recordIcon !text-orange-400'></FaSave></button>
            </>}
            <button className='recordButton '  onClick={handleDelete}><FaTrash className='recordIcon !text-red-400' ></FaTrash></button>
        </div>
    )
}