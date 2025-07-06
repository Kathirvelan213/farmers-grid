import axios from 'axios';

const axiosInstance=axios.create({
    
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const getUsersAPI=()=>axiosInstance.get('/api/users');

export const getUserDataAPI=(userName)=>axiosInstance.get(`/api/users/${userName}`);