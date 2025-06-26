import '../styles/DashBoardPage.css';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../../apiConsumer/productsAPI';
import { getMyProductsAPI } from '../../apiConsumer/productsAPI';
import { MoreProductsPanel } from './MoreProductsPanel';
import { SearchPanel } from './SearchPanel';
import { Gallery } from './Gallery';
import {ItemsList} from './ItemsList.jsx'
export function MyProductsPanel(){
    const [allProducts,setAllProducts]=useState({});
    const [myProducts,setMyProducts]=useState([]);
    const [moreProducts,setMoreProducts]=useState([]);
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
                setMyProducts(result.data.map(product=>{
                    var productObj=allProductsDict[product.id];
                    productObj["unitPrice"]=product.unitPrice;
                    return productObj;
                }));
            }
            catch(e){
                console.error(e);
            }
        }
        
        getProducts();
        getMyProducts();
    },[]);
    useEffect(()=>{
        setMoreProducts(Object.values(allProducts).filter(product=>
            !myProducts.includes(product)
        ))
        console.log(1);
    },[myProducts])
    
    return (
        <>
        <SearchPanel items={myProducts} filterKey={"name"} DisplayComponent={ItemsList}></SearchPanel>
        <MoreProductsPanel items={moreProducts}></MoreProductsPanel>
        </>
    )
}
