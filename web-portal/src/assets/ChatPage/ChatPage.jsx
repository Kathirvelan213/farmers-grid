import { useEffect, useState } from "react"
import SignalrService from "../SignalrService"
import { getMessagesAPI } from "../apiConsumer/chatAPI";
import User from "../global/UserDetails.js"
import { MyMessage } from "./components/MyMessage.jsx";
import { OthersMessage } from "./components/OthersMessage.jsx";

export function ChatPage(){
    const [val,setVal]=useState('');
    const [sendMessage,setSendMessage]=useState('');
    const [messages,setMessages]=useState({});
    const [messageOrder,setMessageOrder]=useState([]);
    const [chatId,setChatId]=useState(1);

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
            console.log('received')
            setMessages(prev=>({...prev,[message.id]:message}));
            setMessageOrder(prev=>([...prev,message.id]))
        })
    },[])
    

    function handleMessageChange(e){
        setSendMessage(e.target.value);
    }
    async function send(e){
        e.preventDefault();
        var messageObj=await SignalrService.send("ReceiveAtHub",chatId,sendMessage);
        console.log(messageObj);
        // setMessages(prev=>({...prev,[messageObj.id]:messageObj}));
        // setMessageOrder(prev=>[...prev,1]);
        // setMessageOrder(prev=>[...prev,messageObj.id]);
    }

    return(
        <div className="bg-gray-300">
            
            {
            messageOrder.map(id=>{
                return messages[id].senderId===User.id?
                <MyMessage key={id} message={messages[id].message}></MyMessage>:
                <OthersMessage key={id} message={messages[id].message}></OthersMessage>;
            })}
            <form onSubmit={send}>

            <input value={sendMessage} onChange={handleMessageChange}></input>
            <button className='bg-gray-300'>send</button>
            </form>
        </div>
    )
}