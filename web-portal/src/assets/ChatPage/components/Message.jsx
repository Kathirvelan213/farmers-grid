import '../styles/ChatPage.css';

function MessageBase({message,overrideStyle}){
    const timestamp=new Date(message.timestamp);
    const hours=timestamp.getHours();
    const mins=timestamp.getMinutes();
    const date=timestamp.toLocaleDateString('en-gb');
    return(
        <div className={`messageBox ${overrideStyle}`}>
            <span>
                {message.message}
            </span>
            <div className='messageMeta'>

            {/* <span>{date}</span> */}
            <span>{hours}:{mins}</span>
            </div>
        </div>
    )
}

export function MyMessage({message}){
    return(
        <MessageBase message={message} overrideStyle={'myMessageBox'}/>
    )
}


export function OthersMessage({message}){
    return(
        <MessageBase message={message} overrideStyle={'othersMessageBox'}/>
    )
}