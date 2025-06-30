import '../styles/ChatPage.css';

export function OthersMessage({message}){
    return(
        <div className='othersMessage'>
            {message}
        </div>
    )
}