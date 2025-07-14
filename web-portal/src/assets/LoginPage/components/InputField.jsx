import "../styles/LoginPage.css"
import { useState } from "react"

export function InputField({placeholder,Icon,value,setValue,isPassword}){
    return(
        <div className="inputFieldWrapper" >
            <Icon className="icon"/>
            <input required className="inputFields" type={isPassword?"password":""} placeholder={placeholder} value={value} onChange={handleFieldValueChange}></input>
            <span className="underline"></span>
        </div>
    )
    function handleFieldValueChange(e){
        setValue(e.target.value)
    }
}
