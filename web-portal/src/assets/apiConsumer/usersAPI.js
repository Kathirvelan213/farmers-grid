import axios from 'axios';

const axiosInstance=axios.create({
    
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const getSellersAPI=()=>axiosInstance.get('/api/users/sellers');

export const getRetailersAPI=()=>axiosInstance.get('/api/users/retailers');

export const getMatchScoresWithRetailersAPI=()=>axiosInstance.get('/api/productMatch/get-match-seller');

export const getMatchScoresWithSellersAPI=()=>axiosInstance.get('/api/productMatch/get-match-retailer');

export const getUserDataAPI=(userName)=>axiosInstance.get(`/api/users/${userName}`);