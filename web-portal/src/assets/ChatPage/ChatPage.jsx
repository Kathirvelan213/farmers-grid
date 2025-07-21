import { useEffect, useState } from "react"
import SignalrService from "../SignalrService"
import { getMessagesAPI } from "../apiConsumer/chatAPI";
// import User from "../global/UserDetails.js"
import { MyMessage,OthersMessage } from "./components/Message.jsx";
import { FaPaperPlane } from "react-icons/fa";
import ScrollToBottom,{useScrollToBottom} from "react-scroll-to-bottom"
import { ChatMenu } from "./components/ChatMenu.jsx";
import { CurrentChatNamePane } from "./components/CurrentChatNamePane.jsx";
import { useAuth } from "../global/components/AuthProvider.jsx";

export function ChatPage(){
    const [sendMessage,setSendMessage]=useState('');
    const [messages,setMessages]=useState({});
    const [messageOrder,setMessageOrder]=useState([]);
    const [currentChat,setCurrentChat]=useState({});
    const scrollToBottom=useScrollToBottom();
    const {user}=useAuth();

    useEffect(()=>{              
        SignalrService.off("receiveMessage")
        SignalrService.on("receiveMessage",(message)=>{
            setMessages(prev=>({...prev,[message.id]:message}));
            setMessageOrder(prev=>([...prev,message.id]))
        })
    },[])
    useEffect(()=>{        
        const fetchMessages=async()=>{
            try{
                const result=await getMessagesAPI(currentChat.id);
                const ids=result.data.map(message=>message.id);
                setMessages(Object.fromEntries(result.data.map(message=>[message.id,message])));
                setMessageOrder(ids);
            }
                catch(e){
                    console.error(e);
                }}
            if(Object.keys(currentChat)!=0){
                fetchMessages();
            }
    },[currentChat])
            
    function handleMessageChange(e){
        setSendMessage(e.target.value);
    }
    async function send(e){
        e.preventDefault();
        if(sendMessage!=''){
            await SignalrService.send("ReceiveAtHub",currentChat.id,sendMessage);
            setSendMessage('');
        }
        scrollToBottom();
    }

    return(
        <div className="chatPage">
            <ChatMenu setCurrentChat={setCurrentChat}/>
            {Object.keys(currentChat).length!=0?<div className="chatArea">
                <CurrentChatNamePane chat={currentChat}/>
                <ScrollToBottom className="chatContainer" followButtonClassName="followButton">
                    {messageOrder.map(id=>{
                        return messages[id].senderId===user.id?
                        <MyMessage key={id} message={messages[id]}></MyMessage>:
                        <OthersMessage key={id} message={messages[id]}></OthersMessage>;
                    })}
                </ScrollToBottom>
                <form onSubmit={send} className="inputBar">
                    <input className='textbar' value={sendMessage} placeholder="Enter a message" onChange={handleMessageChange}></input>
                    <button className='w-[30px] justify-items-center'><FaPaperPlane></FaPaperPlane></button>
                </form>
            </div>:null}
        </div>
    )
}