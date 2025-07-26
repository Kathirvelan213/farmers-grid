import { useEffect, useState } from 'react';
import { getUserDataAPI } from '../apiConsumer/usersAPI';
import './styles/ProfilePage.css'
import { useParams } from 'react-router-dom'
import { useAuth } from '../global/components/AuthProvider';
import { getMyProductsAPI } from '../apiConsumer/productsAPI';

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
            
            if(user.role=='Seller'){
                const result1=await getMyProductsAPI();
                setMyProducts(result1.data)
            }
        }
        fetchUserData();
    },[userName])

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
        </div>
    )
}