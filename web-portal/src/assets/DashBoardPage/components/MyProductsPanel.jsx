import '../styles/DashBoardPage.css';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../../apiConsumer/productsAPI';
import { getMyProductsAPI } from '../../apiConsumer/productsAPI';
import {AddProductsAPI} from '../../apiConsumer/productsAPI';
import { MoreProductsPanel } from './MoreProductsPanel';
import { SearchPanel } from './SearchPanel';
import { Gallery } from './Gallery';
import {ItemsList} from './ItemsList.jsx'
import { ItemRecord } from './Itemrecord.jsx';

export function MyProductsPanel(){
    const [allProducts,setAllProducts]=useState({});
    const [myProducts,setMyProducts]=useState({});
    const [moreProducts,setMoreProducts]=useState({});
    const [insertState,setInsertState]=useState(false);
    const [deleteState,setDeleteState]=useState(false);
    const [editState,setEditState]=useState(false);
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
                setMyProducts(Object.fromEntries(result.data.map(product=>{
                    var productObj=allProductsDict[product.productId]; 
                    productObj["rowId"]=product.id;
                    productObj["unitPrice"]=product.unitPrice;
                    return [product.productId,productObj];
                })));
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
            setMyProducts(prev=>({...prev,[insertObj.productId]:{...toInsert,["unitPrice"]:unitPrice,["rowId"]:newRowId.data}}));
        }
        catch(e){
            console.error(e);
        }
    }
    return (
        <>
        
        <SearchPanel items={Object.values(myProducts)} filterKey={"name"} DisplayComponent={ItemsList} displayComponentProps={{keyField:"rowId"}}></SearchPanel>
        {insertState&&
        <div>
            <ItemRecord item={toInsert}></ItemRecord>
            <button onClick={handleInsert}>Add</button>
        </div>}
        {!insertState?
        <button onClick={()=>{setInsertState(true);setToInsert(null);}}>Add</button>:<>
        <button onClick={()=>{setInsertState(false);}}>Cancel</button> 
        <MoreProductsPanel items={Object.values(moreProducts)} setToInsert={setToInsert}></MoreProductsPanel></>}
        </>
    )
}
