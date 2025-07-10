import '../styles/LoginPage.css';
import { InputMap } from './InputMap';
import { LoginBox } from "./LoginForm"
import { RegisterForm } from './RegisterForm';


export function LeftRegisterPanel({isRegisterMode}){
    return(
        <div className={`sideRegisterPanel ${isRegisterMode?"expand":""}`}>
            <button>seller</button>
            <button>retailer</button>
        </div>


    )
}

export function RightRegisterPanel({coordinates,setCoordinates,isRegisterMode}){
    return(
        <div className={`sideRegisterPanel ${isRegisterMode?"expand":""}`}>
            {/* <label>Select your location</label> */}
            <InputMap coordinates={coordinates} setCoordinates={setCoordinates} isRegisterMode={isRegisterMode}/>
        </div>
    )
}

export function CenterPanel({isRegisterMode}){
    return(
        <div className={`centerPanel ${isRegisterMode?"registerPanel":""}`}>
            {isRegisterMode?<RegisterForm isRegisterMode={isRegisterMode}/>:<LoginBox/>}
        </div>
    )
}