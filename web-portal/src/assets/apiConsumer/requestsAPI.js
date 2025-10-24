import axios from 'axios';

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const createRequestAPI=(createRequestDTO)=>axiosInstance.post('/api/requests/create-request',createRequestDTO);
export const getMyRequestsAPI=()=>axiosInstance.get('/api/requests');
export const getRequestDetailsAPI=(requestId)=>axiosInstance.get(`/api/requests/${requestId}`);
export const updateRequestStatusAPI=(dto)=>axiosInstance.post('/api/requests/update-status',dto);
