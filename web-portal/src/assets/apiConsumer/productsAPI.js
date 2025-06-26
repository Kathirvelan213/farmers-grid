import axios from 'axios';


console.log(import.meta.env.VITE_API_URL);
const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const getProductsAPI=()=>axiosInstance.get('/api/products'); 

export const getMyProductsAPI=()=>axiosInstance.get('/api/products/get-my-products')

export const AddProductsAPI=({productDTO})=>axiosInstance.post('/api/products/get-my-products',productDTO)

export const RemoveProductsAPI=({id})=>axiosInstance.delete('/api/products/get-my-products',id)