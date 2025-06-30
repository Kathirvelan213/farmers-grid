import { useEffect, useState } from "react"
import SignalrService from "../SignalrService"
import { getMessagesAPI } from "../apiConsumer/chatAPI";
import User from "../global/UserDetails.js"
import { MyMessage } from "./components/MyMessage.jsx";
import { OthersMessage } from "./components/OthersMessage.jsx";
import { FaPaperPlane } from "react-icons/fa";
import ScrollToBottom,{useScrollToBottom} from "react-scroll-to-bottom"

export function ChatPage(){
    const [sendMessage,setSendMessage]=useState('');
    const [messages,setMessages]=useState({});
    const [messageOrder,setMessageOrder]=useState([]);
    const [chatId,setChatId]=useState(1);
    const scrollToBottom=useScrollToBottom();

    useEffect(()=>{
        const fetchMessages=async()=>{
        try{
            const result=await getMessagesAPI(chatId);
            const ids=result.data.map(message=>message.id);
            setMessages(Object.fromEntries(result.data.map(message=>[message.id,message])));
            setMessageOrder(ids);
        }
        catch(e){
            console.error(e);
        }}
        fetchMessages();

        SignalrService.off("receiveMessage")
        SignalrService.on("receiveMessage",(message)=>{
            setMessages(prev=>({...prev,[message.id]:message}));
            setMessageOrder(prev=>([...prev,message.id]))
        })
    },[])
    

    function handleMessageChange(e){
        setSendMessage(e.target.value);
    }
    async function send(e){
        e.preventDefault();
        if(sendMessage!=''){
            await SignalrService.send("ReceiveAtHub",chatId,sendMessage);
            setSendMessage('');
        }
        scrollToBottom();
    }

    return(
        <div className="chatPage bg-gray-300">
            <ScrollToBottom className="chatContainer" followButtonClassName="followButton">
            {messageOrder.map(id=>{
                return messages[id].senderId===User.id?
                <MyMessage key={id} message={messages[id].message}></MyMessage>:
                <OthersMessage key={id} message={messages[id].message}></OthersMessage>;
            })}
            </ScrollToBottom>
            <form onSubmit={send} className="inputBar">
                <input className='textbar' value={sendMessage} placeholder="Enter a message" onChange={handleMessageChange}></input>
                <button className='bg-gray-300 w-[20px]'><FaPaperPlane></FaPaperPlane></button>
            </form>
        </div>
    )
}