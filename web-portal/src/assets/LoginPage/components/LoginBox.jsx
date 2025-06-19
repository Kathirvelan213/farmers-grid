import "../styles/LoginPage.css"
import { InputField } from "./InputField"
import {FaUser} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'

export function LoginBox(){
    return (<>
        <form className="loginBox" onSubmit={(e)=>e.preventDefault()}>
            <img src="/Logo1-removebg-preview.png" alt="Logo" className="appLogo"/>
            <InputField placeholder="Email" Icon={FaUser}></InputField>
            <InputField placeholder="Password" Icon={FaLock}></InputField>
            <button className="loginButton" color="rgb(8, 81, 2)">Login</button>
        </form>
    </>
    )
}

