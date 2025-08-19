import { useState } from "react"
import {LeftRegisterPanel,CenterPanel,RightRegisterPanel} from './components/RegisterPanels.jsx'
import { loginAPI, registerAPI } from "../apiConsumer/identityAPI.js";
import { useAuth } from "../global/components/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
export function LoginPage(){
    const [registerMode,setRegisterMode]=useState(false);
    const[coordinates,setCoordinates]=useState(null);
    const {user,loading,getMyInfo,clearMyInfo}=useAuth();
    const navigate=useNavigate();
    

    const [formData,setFormData]=useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        role:""
    })

     async function handleRegister(){
        if(formData.role==""){
            console.log("select role");
            return;
        }
        if(coordinates==null){
            console.log("select location");
            return;
        } 
        if(formData.password!=formData.confirmPassword){
            console.log("passwords do not match");
            return;
        }
        try{

            const result=await registerAPI({email: formData.email,
                username: formData.userName,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                coordinates: {
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                },
                role: formData.role});  

                await loginAPI({
                    email:formData.email,
                    password:formData.password
                })
                await getMyInfo();
                navigate('/dashboard');
            }
            catch{
                console.log("error registering")
            }
    }
    return (
    <>
        <div className='loginPage'>
            {/* <AnimatePresence>
                {registerMode &&
                <motion.div
                initial={{ opacity: 0,height:0}}
                animate={{ opacity: 1,height:100}}
                exit={{ opacity: 0 ,height:0}}
                transition={{ duration: 0.7 }}>
                </motion.div>}
            </AnimatePresence> */}
            <LeftRegisterPanel isRegisterMode={registerMode} formData={formData} setFormData={setFormData}/>
            <CenterPanel isRegisterMode={registerMode} formData={formData} setFormData={setFormData} handleRegister={handleRegister}/>
            <RightRegisterPanel coordinates={coordinates} setCoordinates={setCoordinates} isRegisterMode={registerMode}/>
        </div>
            <button className='absolute bottom-0' onClick={()=>setRegisterMode(!registerMode)}>register</button>
                </>

    )
}