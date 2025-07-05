import '../styles/chatPage.css';

export function CurrentChatNamePane({chat}){
    return(
        <div className='currentChatNamePane'>
            <img src="/BlankProfilePic.jpg" className='profilePic'/>
            <label >{chat.otherUserName}</label>
        </div>
    )
}