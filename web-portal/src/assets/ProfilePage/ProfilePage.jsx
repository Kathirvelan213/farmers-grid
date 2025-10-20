import { useEffect, useState } from 'react';
import { getUserDataAPI } from '../apiConsumer/usersAPI.js';
import './styles/ProfilePage.css'
import { useParams } from 'react-router-dom'
import { useAuth } from '../global/components/AuthProvider.jsx';
import { getMyProductsAPI, getSellersProductsAPI } from '../apiConsumer/productsAPI.js';
import { getMyRequestProductsAPI, getRetailerRequestProductsAPI } from '../apiConsumer/requestProductsAPI.js';
import { SearchPanel } from '../global/components/SearchPanel.jsx';
import { ComparisonList, NegotiationList } from './components/ComparisonList.jsx';

export function ProfilePage(){
    const {userName}=useParams();
    const [userData,setUserData]=useState({});
    const [myProducts,setMyProducts]=useState({});
    const [othersProducts,setOthersProducts]=useState({});
    const {user}=useAuth();
    const [productComparison,setProductComparison]=useState({});


    useEffect(()=>{
        const fetchUserData=async()=>{
            const result=await getUserDataAPI(userName);
            setUserData(result.data[0]);
        }
        fetchUserData();
    },[userName])

    useEffect(()=>{
        if(Object.keys(userData).length===0){
            return;
        }
        const fetchProductsData=async ()=>{
            var myProductsResult={}
            var othersProductsResult={}
            if(user.role=='Seller'){
                myProductsResult=await getMyProductsAPI();
            }
            else if(user.role=='Retailer'){
                myProductsResult=await getMyRequestProductsAPI();
            }
            setMyProducts(Object.fromEntries(myProductsResult.data.map(product=>[product.id,product])));

            if(userData.role=='Seller'){
                othersProductsResult=await getSellersProductsAPI(userName);
            }
            else if(userData.role=='Retailer'){
                othersProductsResult=await getRetailerRequestProductsAPI(userName);
            }
            setOthersProducts(Object.fromEntries(othersProductsResult.data.map(product=>[product.id,product])));
        }
        fetchProductsData();
    },[userData])
    useEffect(()=>{
        if(Object.keys(othersProducts).length===0){
            return;
        }
        var combined={}
        for (const rowId in myProducts){
            const productId=myProducts[rowId]["productId"];
            const {unitPrice,...rest}=myProducts[rowId];
            combined[productId]={...rest,"myPrice":unitPrice,"othersPrice":null}
        }
        for (const rowId in othersProducts){
            const productId=othersProducts[rowId]["productId"]
            const {unitPrice,...rest}=othersProducts[rowId];
            if(productId in combined){
                combined[productId]["othersPrice"]=unitPrice;
            }
            else{
                combined[productId]={...rest,othersPrice:unitPrice,myPrice:null}
            }
        }
        setProductComparison(combined);
    },[othersProducts])

    return(
        <div className='profileContainer'>
            <div className='profileHeader'>
                <img className='profileAvatar' src='/BlankProfilePic.jpg' alt='Profile'/>
                <div className='profileInfo'>
                    <div className='infoRow'><span className='infoLabel'>Username:</span> <span className='infoValue'>{userData.userName}</span></div>
                    <div className='infoRow'><span className='infoLabel'>Email:</span> <span className='infoValue'>{userData.email}</span></div>
                    <div className='infoRow'><span className='infoLabel'>Phone:</span> <span className='infoValue'>{userData.phoneNumber}</span></div>
                    <div className='infoRow'><span className='infoLabel'>Role:</span> <span className='infoValue'>{userData.role ?? '—'}</span></div>
                    <div className='infoRow'><span className='infoLabel'>Location:</span> <span className='infoValue'>{userData.location ?? '—'}</span></div>
                </div>
                
            </div>
            <div className='panelsRow'>
                <div className='panel'>
                    <div className='panelTitle'>Product Comparison</div>
                    <SearchPanel items={Object.values(productComparison)} filterKey={"name"} DisplayComponent={ComparisonList} displayComponentProps={{keyField:"id",setItems:setMyProducts}}></SearchPanel>
                </div>
                <div className='panel'>
                    <div className='panelTitle'>Negotiations</div>
                    <SearchPanel items={Object.values(productComparison)} filterKey={"name"} DisplayComponent={NegotiationList} displayComponentProps={{keyField:"id",userData:userData,currentUser:user}}></SearchPanel>
                </div>
            </div>
        </div>
    )
}