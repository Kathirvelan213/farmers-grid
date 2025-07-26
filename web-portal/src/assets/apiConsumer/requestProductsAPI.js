import axios from 'axios';


const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})


export const getMyRequestProductsAPI=()=>axiosInstance.get('/api/requestproducts/get-my-request-products')

export const getRetailerRequestProductsAPI=(userName)=>axiosInstance.get(`/api/requestproducts/get-retailer-request-products/${userName}`)

export const AddProductsAPI=(productDTO)=>axiosInstance.post('/api/requestproducts/add-product',productDTO)

export const RemoveProductsAPI=(idDTO)=>axiosInstance.delete('/api/requestproducts/remove-product',{data:idDTO})

export const ChangePriceAPI=(changePriceDTO)=>axiosInstance.put('/api/requestproducts/change-price',changePriceDTO)  

//LOOK AT THIS!!! AAHHHHH

/*axios.post(url, body)

axios.put(url, body)

axios.delete(url, { data: body }) ← this trips everyone up!

*/