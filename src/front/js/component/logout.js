import React from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()

    function logout() {
        // Clear the token from session storage or any other storage you are using
        sessionStorage.removeItem("token")
        
        // Navigate to login or any other public page
        navigate("/login")
    }

    return (
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
    )
}

export default Logout