import { useEffect, useState } from 'react'
import './styles/UsersPage.css'
import { getMatchScoresWithRetailersAPI, getMatchScoresWithSellersAPI, getRetailersAPI, getSellersAPI } from '../apiConsumer/usersAPI';
import { useAuth } from '../global/components/AuthProvider.jsx';
import { UsersPageForSellers } from './components/UsersPageForSellers.jsx';
import { UsersPageForRetailers } from './components/UsersPageForRetailers.jsx';
import { createNewChatAPI, getChatsAPI } from '../apiConsumer/chatAPI.js';
import { useNavigate } from 'react-router-dom';

export function UsersPage(){
    const {user}=useAuth();
    const [allSellers,setAllSellers]=useState({});
    const [allRetailers,setAllRetailers]=useState({});
    const [matchScoresWithRetailers,setMatchScoresWithRetailers]=useState({});
    const [matchScoresWithSellers,setMatchScoresWithSellers]=useState({});
    const [chats,setChats]=useState({});
    const navigate=useNavigate();
    
        useEffect(()=>{
            const fetchUsers=async()=>{
                const result1=await getSellersAPI();
                setAllSellers(Object.fromEntries(result1.data.map(currUser=>[currUser.id,currUser])));
                const result2=await getRetailersAPI();
                setAllRetailers(Object.fromEntries(result2.data.map(currUser=>[currUser.id,currUser])));
            }
            const fetchMatchScores=async()=>{
                if(user.role=='Seller'){
                    
                    const result2=await getMatchScoresWithRetailersAPI();
                    setMatchScoresWithRetailers(Object.fromEntries(result2.data.map(currUser=>[currUser.retailerId,currUser])));
                }
                else if (user.role=='Retailer'){
                    const result1=await getMatchScoresWithSellersAPI();
                    setMatchScoresWithSellers(Object.fromEntries(result1.data.map(currUser=>[currUser.sellerId,currUser])));
                }
            }
            const fetchChats=async ()=>{
                const result=await getChatsAPI();
                setChats(Object.fromEntries(result.data.map(chat=>[chat.otherUserId,chat])));
            }
        fetchUsers();
        fetchMatchScores();
        fetchChats();
    },[])

    const handleMessageClick=async (userIdToAddToChat)=>{
        if(!(userIdToAddToChat in chats)){
            console.log(1)
            await createNewChatAPI({otherUserId:userIdToAddToChat});
        }
        navigate('/chat');
    }

    if ( user.role=='Seller' ){
        return(
            <UsersPageForSellers retailers={Object.values(allRetailers)} matchScores={matchScoresWithRetailers} handleMessageClick={handleMessageClick}/>
        )
    }
    else if(user.role=='Retailer'){
        return(
            <UsersPageForRetailers sellers={Object.values(allSellers)} matchScores={matchScoresWithSellers} handleMessageClick={handleMessageClick}/>
        )
    }
}