import React,{useEffect} from "react"
import { useNavigate } from "react-router-dom"

const Private = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate("/login")
        }
    },[])
    
    
    return <div>
        <h1>Private</h1>
    </div>
}
export default Private