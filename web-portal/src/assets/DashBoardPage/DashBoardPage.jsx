import './styles/DashBoardPage.css';
import { SearchPanel } from './components/SearchPanel';
import { MyProductsPanel } from './components/MyProductsPanel';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../apiConsumer/productsAPI';


export function DashBoardPage(){
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const getProducts=async ()=>{
            try{
                const result=await getProductsAPI();
                setProducts(result.data);
            }
            catch(e){
                console.error(e);
            }
        }
        getProducts();
    },[]);
    return (
        <>
        <SearchPanel items={products} filterKey={"name"}></SearchPanel>
        <MyProductsPanel items={products}></MyProductsPanel>
        </>
    )
}
