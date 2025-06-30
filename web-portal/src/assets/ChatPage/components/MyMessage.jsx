import '../styles/ChatPage.css';

export function MyMessage({message,readStatus,deliveredStatus}){
    return(
        <div className='myMessage'>
            {message}
        </div>
    )
}