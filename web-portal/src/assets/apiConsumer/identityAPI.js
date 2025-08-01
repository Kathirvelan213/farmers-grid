import axios from 'axios';


const axiosInstance=axios.create({
    
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const loginAPI=(loginDto)=>axiosInstance.post('/api/auth/login',loginDto); 

export const registerAPI=(regiterDTO)=>axiosInstance.post('/api/auth/register',regiterDTO);   

export const getMyInfoAPI=()=>axiosInstance.get('api/auth/info');