import '../styles/LoginPage.css';
import { InputMap } from './InputMap';
import { LoginBox } from "./LoginForm"
import { RegisterForm } from './RegisterForm';


export function LeftRegisterPanel({isRegisterMode,formData,setFormData}){
    return(
        <div className={`sideRegisterPanel leftRegisterPanel ${isRegisterMode?"expand":""}`}>
            <div className='w-[100%] h-[80%] flex flex-col p-4 gap-10'>
                <button className={`rolesButton bg-[#187a0d] ${formData.role=="seller"?"roleSelected":""}`}onClick={()=>setFormData(prev=>({...prev,role:"seller"}))}>
                    <img src='/seller.avif'/>
                </button>
                <button className={`rolesButton bg-[#1f6140] ${formData.role=="retailer"?"roleSelected":""}`}onClick={()=>setFormData(prev=>({...prev,role:"retailer"}))}>
                    <img src='/retailer.webp'/>
                    
                </button>
            </div>
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

export function CenterPanel({isRegisterMode,formData,setFormData,handleRegister}){
    return(
        <div className={`centerPanel ${isRegisterMode?"registerMode":""}`}>
            {isRegisterMode?<RegisterForm formData={formData} setFormData={setFormData} handleRegister={handleRegister}/>:<LoginBox/>}
        </div>
    )
}