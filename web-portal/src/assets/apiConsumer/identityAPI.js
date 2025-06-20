import axios from 'axios';


const axiosInstance=axios.create({
    baseURL:"https://farmers-grid-backend.azurewebsites.net/api/auth",
    headers:{
        "Content-Type":"application/json",
    }
})

export const loginAPI=(loginDto)=>axiosInstance.post('/login',loginDto);   