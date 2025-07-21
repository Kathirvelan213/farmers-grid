import { useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'
import {LeftRegisterPanel,CenterPanel,RightRegisterPanel} from './components/RegisterPanels'
import { registerAPI } from "../apiConsumer/identityAPI";
export function LoginPage(){
    const [registerMode,setRegisterMode]=useState(false);
    const[coordinates,setCoordinates]=useState(null);

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
        const result=await registerAPI({email: formData.email,
            username: formData.userName,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            coordinates: {
                latitude: coordinates.lat,
                longitude: coordinates.lng
            },
            role: formData.role});      
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