import { useState } from "react"
import { LoginBox } from "./components/LoginBox"
import {motion, AnimatePresence} from 'framer-motion'
import { LeftRegisterPanel, RightRegisterPanel } from "./components/RegisterPanels";

export function LoginPage(){
    const [registerMode,setRegisterMode]=useState(false);

    return (
        <div className='loginPage'>
            <AnimatePresence>
            {!registerMode &&
            <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}>
                <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor:"transparent",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>

                <LoginBox/>
                </div>

            </motion.div>
            }
            </AnimatePresence>

            <AnimatePresence>
                {registerMode &&
                <motion.div
                initial={{opacity:0,x:0}}
                animate={{ opacity: 1, x: -100 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor:"transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
            }}>
                
                <LeftRegisterPanel/>
                </motion.div>}
                {registerMode &&
                <motion.div
                initial={{opacity:0,x:0}}
                animate={{ opacity: 1, x: 100 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor:"transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",                    
            }}>

                    <RightRegisterPanel/>
            
                </motion.div>}
            </AnimatePresence>
            <button className='absolute bottom-0' onClick={()=>setRegisterMode(!registerMode)}>register</button>
        </div>

    )
}