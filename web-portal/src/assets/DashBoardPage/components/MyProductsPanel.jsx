import '../styles/DashBoardPage.css';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../../apiConsumer/productsAPI.js';
import { getMyProductsAPI } from '../../apiConsumer/productsAPI.js';
import {AddProductsAPI} from '../../apiConsumer/productsAPI.js';
import { MoreProductsPanel } from './MoreProductsPanel.jsx';
import { SearchPanel } from '../../global/components/SearchPanel.jsx';
import {ItemsList} from './ItemsList.jsx'
import { AddProductPanel } from './AddProductPanel.jsx';

export function MyProductsPanel({className}){
    const [allProducts,setAllProducts]=useState({});
    const [myProducts,setMyProducts]=useState({});
    const [moreProducts,setMoreProducts]=useState({});
    const [insertState,setInsertState]=useState(false);
    const [deleteState,setDeleteState]=useState(false);
    const [toInsert,setToInsert]=useState(null);

    var allProductsDict={};
    useEffect(()=>{
        const getProducts=async ()=>{
            try{
                const result=await getProductsAPI();
                allProductsDict=Object.fromEntries(result.data.map(
                    product=>[product.id,product]
                ))
                setAllProducts(allProductsDict);
            }
            catch(e){
                console.error(e);
            }
        }
        const getMyProducts=async()=>{
            try{
                const result=await getMyProductsAPI();
                setMyProducts(Object.fromEntries(result.data.map(product=>[product.id,product])));
            }
            catch(e){
                console.error(e);
            }
        }
        
        getProducts();
        getMyProducts();
    },[]);
    useEffect(()=>{
        setMoreProducts(Object.fromEntries(Object.entries(allProducts).filter(([productId,product])=>
            !(productId in myProducts)  
        )))
    },[myProducts])
    async function handleInsert (){
        setInsertState(false);
        try
        {
            var unitPrice=30;
            var insertObj={
                productId:parseInt(toInsert.id),
                unitPrice:unitPrice
            }
            const newRowId=await AddProductsAPI(insertObj);
            setMyProducts(prev=>({...prev,[insertObj.productId]:{...toInsert,["unitPrice"]:unitPrice,["id"]:newRowId.data}}));
        }
        catch(e){
            console.error(e);
        }
    }
    return (
        <div className={className}>
        <SearchPanel items={Object.values(myProducts)} filterKey={"name"} DisplayComponent={ItemsList} displayComponentProps={{keyField:"id",setItems:setMyProducts}}></SearchPanel>
        {insertState&&
        <div>
            <AddProductPanel item={toInsert}></AddProductPanel>
            <button onClick={handleInsert}>Add</button>
        </div>}
        {!insertState?
        <button onClick={()=>{setInsertState(true);setToInsert(null);}}>Add</button>:<>
        <button onClick={()=>{setInsertState(false);}}>Cancel</button> 
        <MoreProductsPanel items={Object.values(moreProducts)} setToInsert={setToInsert}></MoreProductsPanel></>}
        </div>
    )
}
