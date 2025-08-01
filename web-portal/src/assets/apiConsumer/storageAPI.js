import axios from 'axios';


const axiosInstance=axios.create({
    
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const getSasAPI=()=>axiosInstance.get('/api/storage/sas');   