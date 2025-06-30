import { useState,useEffect } from 'react'
import '../styles/ChatPage.css'
import { getChatsAPI } from '../../apiConsumer/chatAPI';


export function ChatMenu(){
    const [chats,setChats]=useState({});

    useEffect(()=>{
        const fetchChats=async ()=>{
            const result=await getChatsAPI();
            setChats(Object.fromEntries(result.data.map(chat=>[chat.id,chat])));
        }
        fetchChats();
    },[])
    return (
        <div className='chatMenu'>
            {Object.values(chats).map((chat)=>(
                <ChatUser key={chat.id} chat={chat}></ChatUser>
            ))}
        </div>
    )
}

function ChatUser({chat}){
    console.log(chat);
    return (
        <button className='chatUser'>
            {chat.otherUser}
        </button>
    )
}