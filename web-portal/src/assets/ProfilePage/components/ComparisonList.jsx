import { useEffect, useState } from 'react';
import '../styles/ProfilePage.css';
import { ComparisonRecord, NegotiationRecord } from './ComparisonRecord.jsx';
import { createRequestAPI } from '../../apiConsumer/requestsAPI.js';

export function ComparisonList({items,keyField,setItems}){    
    return(
        <div className='comparisonList'>
            {items.map((item)=>(
                <ComparisonRecord item={item} key={item[keyField]} setItems={setItems}></ComparisonRecord>
            ))}
        </div>
    )
}
export function NegotiationList({items,keyField,userData,currentUser}){    
    const [offerPrices,setOfferPrices]=useState({});
    const [filteredItems,setFilteredItems]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    
    const handleNewRequest=async()=>{
        if(isLoading) return;
        
        setIsLoading(true);
        try {
            // Create a single request with multiple items
            const requestData = {
                receiverId: userData.id,
                senderType: currentUser.role,
                items: filteredItems.map(item => ({
                    productId: item.productId,
                    offeredPrice: offerPrices[item.productId]
                }))
            };
            console.log('Request Data:', requestData);
            // Send single request with all items
            await createRequestAPI(requestData);
            
            alert('Request sent successfully!');
            // Reset offer prices after successful submission
            setOfferPrices({});
        } catch (error) {
            console.error('Error creating request:', error);
            alert('Failed to send request. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
        <button onClick={handleNewRequest} disabled={isLoading || filteredItems.length === 0}>
            {isLoading ? 'Sending...' : 'Make Request'}
        </button>
        </div>
    )
}