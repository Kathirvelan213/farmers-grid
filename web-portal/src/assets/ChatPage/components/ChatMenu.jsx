import { useState,useEffect } from 'react'
import '../styles/ChatPage.css'
import { getChatsAPI } from '../../apiConsumer/chatAPI';
import { SearchPanel } from '../../global/components/SearchPanel';


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
            <label className='heading '>Chats</label>
            <SearchPanel DisplayComponent={ChatList} filterKey={"otherUserName"} items={Object.values(chats)} searchPanelOverrideStyle='searchPanel' searchBarOverrideStyle='searchBar' placeholderText='Search for chat' ></SearchPanel>
        </div>
    )
}

function ChatList({items}){
    return(
        <div className='chatList'>
            {items.map((item)=>(
                <ChatUser key={item.id} chat={item}></ChatUser>
            ))}
        </div>
    )
}

function ChatUser({chat}){
    return (
        <button className='chatUser'>
        <img src="/BlankProfilePic.webp" className='profilePic'/>
            {chat.otherUserName}
        </button>
    )
}