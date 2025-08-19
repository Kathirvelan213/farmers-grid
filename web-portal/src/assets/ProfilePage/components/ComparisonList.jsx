import { useEffect, useState } from 'react';
import '../styles/ProfilePage.css';
import { ComparisonRecord, NegotiationRecord } from './ComparisonRecord';

export function ComparisonList({items,keyField,setItems}){    
    return(
        <div className='comparisonList'>
            {items.map((item)=>(
                <ComparisonRecord item={item} key={item[keyField]} setItems={setItems}></ComparisonRecord>
            ))}
        </div>
    )
}
export function NegotiationList({items,keyField}){    
    const [offerPrices,setOfferPrices]=useState({});
    const [filteredItems,setFilteredItems]=useState([]);
    const handleNewRequest=()=>{
        
    }
    useEffect(()=>{
        setFilteredItems(items.filter(
            (product) => product.othersPrice!=null && product.myPrice!=null
        ));
        let blankPrices=Object.fromEntries(filteredItems.map(product=>([product.productId,(product.myPrice+product.othersPrice)/2])));
        setOfferPrices(blankPrices);
    },[items])
    return(
        <div className='comparisonList'>
            {filteredItems.map((item)=>(
                <NegotiationRecord item={item} key={item[keyField]} offerPrices={offerPrices} setOfferPrices={setOfferPrices}></NegotiationRecord>
            ))}
        <button onClick={handleNewRequest}>makeRequest</button>
        </div>
    )
}