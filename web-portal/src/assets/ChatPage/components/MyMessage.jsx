import '../styles/ChatPage.css';

export function MyMessage({message,readStatus,deliveredStatus}){
    return(
        <div className='messageBox myMessageBox'>
            <label>
                {message}
            </label>
        </div>
    )
}