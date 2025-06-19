import "../styles/LoginPage.css"
import { useState } from "react"

export function InputField({placeholder,Icon}){
    const [fieldValue,setFieldValue]=useState("");
    
    return(
        <div className="inputFieldWrapper" >
            <Icon className="icon"/>
            <input required className="inputFields" placeholder={placeholder} value={fieldValue} onChange={handleFieldValueChange}></input>
            <span className="underline"></span>
        </div>
    )
    function handleFieldValueChange(e){
        setFieldValue(e.target.value)
    }
}
