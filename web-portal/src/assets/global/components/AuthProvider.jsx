import { createContext,useContext,useEffect,useState } from "react";
import { getMyInfoAPI } from "../../apiConsumer/identityAPI.js";

const AuthContext=createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); 
    const[loading,setLoading]=useState(true);
    
    const clearMyInfo = () => setUser(null);

    const getMyInfo=async ()=>{
            try{
                const result=await getMyInfoAPI();
                setUser(result.data)
            }
            catch{
                console.log("session expired");
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        }

    useEffect(()=>{
        getMyInfo();
    },[])

  return (
    <AuthContext.Provider value={{ user,loading, getMyInfo, clearMyInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
    return useContext(AuthContext);
}