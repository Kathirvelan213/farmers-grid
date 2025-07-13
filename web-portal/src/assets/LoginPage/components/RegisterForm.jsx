import "../styles/LoginPage.css"

export function RegisterForm({formData,setFormData,handleRegister}){
    return(
        <div className="registerPanel">
            <input placeholder="Email" onChange={(e)=>setFormData(prev=>({...prev,email:e.target.value}))} value={formData.email}></input>
            <input placeholder="UserName" onChange={(e)=>setFormData(prev=>({...prev,userName:e.target.value}))} value={formData.userName}></input>
            <input placeholder="Password" type="password" onChange={(e)=>setFormData(prev=>({...prev,password:e.target.value}))} value={formData.password}></input>
            <input placeholder="Confirm Password" type="password" onChange={(e)=>setFormData(prev=>({...prev,confirmPassword:e.target.value}))} value={formData.confirmPassword}></input>
            <input placeholder="Phone Number" onChange={(e)=>setFormData(prev=>({...prev,phoneNumber:e.target.value}))} value={formData.phoneNumber}></input>
            <button onClick={handleRegister}>register</button>
        </div>
    )
}