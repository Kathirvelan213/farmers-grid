import { useState } from "react"
import SignalrService from "../SignalrService"

export function ChatPage(){
    const [val,setVal]=useState('');
    const [sendMessage,setSendMessage]=useState('');
    SignalrService.on("receiveMessage",(message)=>{setVal(message);});

    function handleMessageChange(e){
        setSendMessage(e.target.value);
    }
    function send(){
        SignalrService.send("BroadcastMessage",sendMessage);
    }
    return(
        <div className="bg-gray-300">
            <input value={sendMessage} onChange={handleMessageChange}></input>
            <button className='bg-gray-300' onClick={send}>send</button>
            <label>{val}</label>
        </div>
    )
}