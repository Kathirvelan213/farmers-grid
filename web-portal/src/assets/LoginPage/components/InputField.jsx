import "../styles/LoginPage.css"
import { useState } from "react"

export function InputField({placeholder,Icon,value,setValue}){
    return(
        <div className="inputFieldWrapper" >
            <Icon className="icon"/>
            <input required className="inputFields" placeholder={placeholder} value={value} onChange={handleFieldValueChange}></input>
            <span className="underline"></span>
        </div>
    )
    function handleFieldValueChange(e){
        setValue(e.target.value)
    }
}
