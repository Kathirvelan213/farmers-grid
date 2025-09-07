import '../styles/moreProducts.css'
import { useState } from 'react';
import { useSas } from '../../global/components/SasProvider.jsx';

export function StageProductPanel({item,newPrice,setNewPrice}){
    const sasToken=useSas();

    if(item==null){
        return(<></>)
    }
    let marketPrice=40;
    return (
        <div className='stagedPanelContainer'>
            <img className="stagedProductImage" src={`${item.imageUrl}?${sasToken}`}/>
            <table className='stagedDetailsTable'>
                <tbody>
                    <tr>
                        <td className='labelCell'>Name</td>
                        <td className='valueCell'>{item.name}</td>
                    </tr>
                    <tr>
                        <td className='labelCell'>Price</td>
                        <td className='valueCell'>
                            <input className='priceInputBox' value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} placeholder="Enter price" />
                        </td>
                    </tr>
                    <tr>
                        <td className='labelCell'>Market price</td>
                        <td className='valueCell'>₹{marketPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}