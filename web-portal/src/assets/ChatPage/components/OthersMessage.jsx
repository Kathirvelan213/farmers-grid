import '../styles/ChatPage.css';

export function OthersMessage({message}){
    return(
        <div className='messageBox othersMessageBox'>
            <label>
                {message}
            </label>
        </div>
    )
}