import "../styles/LoginPage.css"

export function RegisterForm({formData,setFormData,handleRegister}){
    return(
        <div className="registerPanel">
            <div className="registerHeading">
                <img src="/logo-no-text.png" className="appLogoSmall row-span-2"/>
                <p className="font-mono font-black text-green-900 text-3xl text-left self-end">FARMERS-GRID</p>
                <p className="font-semibold text-gray-600 text-xl text-left self-start">Create Account</p>
            </div>
            <div className="roleInfoPanel">
                {formData.role=='seller'&&<p className="w-[200px] justify-self-center">'Register as a seller. <br/> you can put up products in your profile and find retailers willing to purchase them at your price</p>}
                {formData.role=='retailer'&&<p>'retailer'</p>}
                {formData.role==""&&<p>'select role'</p>}
            </div>
            <div className="registerInputPanel">
                <input placeholder="Email" onChange={(e)=>setFormData(prev=>({...prev,email:e.target.value}))} value={formData.email}></input>
                <input placeholder="UserName" onChange={(e)=>setFormData(prev=>({...prev,userName:e.target.value}))} value={formData.userName}></input>
                <div className="flex flex-row gap-3 w-[100%]">
                <input placeholder="Password" type="password" onChange={(e)=>setFormData(prev=>({...prev,password:e.target.value}))} value={formData.password}></input>
                <input placeholder="Confirm Password" type="password" onChange={(e)=>setFormData(prev=>({...prev,confirmPassword:e.target.value}))} value={formData.confirmPassword}></input>
                </div>
                <input placeholder="Phone Number" onChange={(e)=>setFormData(prev=>({...prev,phoneNumber:e.target.value}))} value={formData.phoneNumber}></input>
                <button onClick={handleRegister}>register</button>
            </div>
        </div>
    )
}