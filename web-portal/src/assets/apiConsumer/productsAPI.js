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

export const AddProductsAPI=(productDTO)=>axiosInstance.post('/api/products/add-product',productDTO)

export const RemoveProductsAPI=(idDTO)=>axiosInstance.delete('/api/products/remove-product',{data:idDTO})

export const ChangePriceAPI=(changePriceDTO)=>axiosInstance.put('/api/products/change-price',changePriceDTO)  

//LOOK AT THIS!!! AAHHHHH

/*axios.post(url, body)

axios.put(url, body)

axios.delete(url, { data: body }) ← this trips everyone up!

*/