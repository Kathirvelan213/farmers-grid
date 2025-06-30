import axios from 'axios';

const axiosInstance=axios.create({
    
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})

export const getChatsAPI=()=>axiosInstance.get('/api/chat');   

export const getMessagesAPI=(chatId)=>axiosInstance.get(`/api/chat/${chatId}/messages`);   

export const getUnreadMessageCountAPI=()=>axiosInstance.get('/api/chat/unreadCount');   