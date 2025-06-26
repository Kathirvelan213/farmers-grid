import './styles/DashBoardPage.css';
import { SearchPanel } from './components/SearchPanel';
import { MyProductsPanel } from './components/MyProductsPanel';
import { useState,useEffect } from 'react';
import { getProductsAPI } from '../apiConsumer/productsAPI';


export function DashBoardPage(){
    
    return (
        <>
        <MyProductsPanel></MyProductsPanel>
        </>
    )
}
