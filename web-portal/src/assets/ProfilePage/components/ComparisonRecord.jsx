import '../styles/ProfilePage.css'
import { useSas } from '../../global/components/SasProvider'


export function ComparisonRecord({item,setItems}){
    const sasToken=useSas();
    return(
        <div className='comparisonRecord'>
            <img className='comparisonImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
            <label>₹{item.myPrice}</label>
            <label>₹{item.othersPrice}</label>
        </div>
    )
}
export function NegotiationRecord({item,offerPrices,setOfferPrices}){
    const sasToken=useSas();
    let max,min;
    if (item.myPrice>item.othersPrice){
        max=item.myPrice
        min=item.othersPrice
    }
    else{
        min=item.myPrice
        max=item.othersPrice    
    }
    const handleChange = (e) => {
        setOfferPrices(prev=>({...prev,[item.productId]:e.target.value}));
    };
    const handleBlur = (e) => {
        let newValue = Number(e.target.value);
        if (newValue < min) newValue = 0; 
        if (newValue > max) newValue = 100;
        setOfferPrices(prev=>({...prev,[item.productId]:newValue}));;
        
    };
    return(
        <div className='comparisonRecord'>
            <img className='comparisonImageSmall' src={`${item.imageUrl}?${sasToken}`}/>
            <label>{item.name}</label>
            <label>₹{item.myPrice}</label>
            <label>₹{item.othersPrice}</label>
            <input type="number" value={offerPrices[item.productId]} min={min} max={max} onChange={handleChange} onBlur={handleBlur}></input>
            <input type='range' min={min} max={max} value={offerPrices[item.productId]} step="0.5" onChange={handleChange} onBlur={handleBlur}></input>
        </div>
    )
}