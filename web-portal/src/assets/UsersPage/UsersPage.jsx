import { useEffect, useState } from 'react'
import './styles/UsersPage.css'
import { getMatchScoresWithRetailersAPI, getMatchScoresWithSellersAPI, getRetailersAPI, getSellersAPI } from '../apiConsumer/usersAPI';
import { useAuth } from '../global/components/AuthProvider';
import { UsersPageForSellers } from './components/UsersPageForSellers';
import { UsersPageForRetailers } from './components/UsersPageForRetailers';

export function UsersPage(){
    const {user}=useAuth();
    const [allSellers,setAllSellers]=useState({});
    const [allRetailers,setAllRetailers]=useState({});
    const [matchScoresWithRetailers,setMatchScoresWithRetailers]=useState({});
    const [matchScoresWithSellers,setMatchScoresWithSellers]=useState({});
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
        fetchUsers();
        fetchMatchScores();
    },[])

    if ( user.role=='Seller' ){
        return(
            <UsersPageForSellers retailers={Object.values(allRetailers)} matchScores={matchScoresWithRetailers}/>
        )
    }
    else if(user.role=='Retailer'){
        return(
            <UsersPageForRetailers sellers={Object.values(allSellers)} matchScores={matchScoresWithSellers}/>
        )
    }
}