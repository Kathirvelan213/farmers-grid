import { useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'
import {LeftRegisterPanel,CenterPanel,RightRegisterPanel} from './components/RegisterPanels'
export function LoginPage(){
    const [registerMode,setRegisterMode]=useState(false);
    const[coordinates,setCoordinates]=useState();

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
            <LeftRegisterPanel isRegisterMode={registerMode}/>
            <CenterPanel isRegisterMode={registerMode}/>
            <RightRegisterPanel coordinates={coordinates} setCoordinates={setCoordinates} isRegisterMode={registerMode}/>
        </div>
            <button className='absolute bottom-0' onClick={()=>setRegisterMode(!registerMode)}>register</button>
                </>

    )
}