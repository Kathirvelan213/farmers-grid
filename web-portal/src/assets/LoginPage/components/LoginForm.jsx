import "../styles/LoginPage.css"
import { InputField } from "./InputField"
import {FaUser} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
import { loginAPI } from "../../apiConsumer/identityAPI"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import User from "../../global/UserDetails"
export function LoginBox(){
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const navigate = useNavigate();

    const handleLogin=async (e)=>{
        e.preventDefault();
        const result=await loginAPI({
            email:email,
            password:password
        }).then((response)=>{
            navigate('/dashboard');
            User.getId();
        }
        ).catch((error)=>console.error(error))
        
    }
    return (<>
        <form className="loginForm" onSubmit={handleLogin}>
            <img src="/farmers-grid-logo.png" alt="Logo" className="appLogo"/>
            <InputField placeholder="Email" Icon={FaUser} value={email} setValue={setEmail}></InputField>
            <InputField placeholder="Password" Icon={FaLock} value={password} setValue={setPassword} isPassword={true}></InputField>
            <button className="loginButton" color="rgb(8, 81, 2)">Login</button>
        </form>
    </>
    )
}


