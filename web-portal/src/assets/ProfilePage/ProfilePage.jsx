import { useEffect, useState } from 'react';
import { getUserDataAPI } from '../apiConsumer/usersAPI';
import './styles/ProfilePage.css'
import { useParams } from 'react-router-dom'
import { useAuth } from '../global/components/AuthProvider';
import { getMyProductsAPI, getSellersProductsAPI } from '../apiConsumer/productsAPI';
import { getMyRequestProductsAPI, getRetailerRequestProductsAPI } from '../apiConsumer/requestProductsAPI';
import { MyProductsPanel } from '../DashBoardPage/components/MyProductsPanel';
import { ItemsList } from '../DashBoardPage/components/ItemsList';
import { SearchPanel } from '../global/components/SearchPanel';

export function ProfilePage(){
    const {userName}=useParams();
    const [userData,setUserData]=useState({});
    const [myProducts,setMyProducts]=useState({});
    const [othersProducts,setOthersProducts]=useState({});
    const {user}=useAuth();

    useEffect(()=>{
        const fetchUserData=async()=>{
            const result=await getUserDataAPI(userName);
            setUserData(result.data[0]);
        }
        fetchUserData();
    },[userName])

    useEffect(()=>{
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

    return(
        <div>
            <img className='profilePic' src='/BlankProfilePic.jpg'/>
            <div>
                <div>Id: {userData.id}</div>
                <div>username: {userData.userName}</div>
                <div>email: {userData.email}</div>
                <div>phone number: {userData.phoneNumber}</div>
                <div>role id: {userData.roleId}</div>
            </div>
            <div>
                <SearchPanel items={Object.values(myProducts)} filterKey={"name"} DisplayComponent={ItemsList} displayComponentProps={{keyField:"id",setItems:setMyProducts}}></SearchPanel>
                <SearchPanel items={Object.values(othersProducts)} filterKey={"name"} DisplayComponent={ItemsList} displayComponentProps={{keyField:"id",setItems:setOthersProducts}}></SearchPanel>
            </div>
        </div>
    )
}