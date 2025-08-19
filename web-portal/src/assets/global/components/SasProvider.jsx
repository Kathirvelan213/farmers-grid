import { createContext,useContext,useEffect, useState } from "react";
import '../../apiConsumer/storageAPI.js';
import { getSasAPI } from "../../apiConsumer/storageAPI.js";

const SasContext=createContext(null);

export function SasProvider({children}){
    const [sasToken,setSasToken]=useState();

    useEffect(()=>{
        const getSasToken=async ()=>{
        const result=await getSasAPI();
        setSasToken(result.data.sasUrl);
        }

        getSasToken();
    },[]);
    
    return (
        <SasContext.Provider value={sasToken}>
            {children}
        </SasContext.Provider>
    );
}

export const useSas=()=>useContext(SasContext);


