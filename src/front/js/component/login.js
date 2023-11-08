import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("") //always has to be inside component and outside function
    const navigate = useNavigate()
    function access_account() {
        
        
        fetch(process.env.BACKEND_URL +"api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            }
        })

            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                sessionStorage.setItem("token",data.access_token)//stores the token to stay logged in
                navigate("/private")

            }
            )
            .catch(error => console.log(error))
    }
    return <div>
        <h1>login</h1>
    <div className="mb-3">
<label for="exampleFormControlInput1" className="form-label">Email address</label>
<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={e=>setemail(e.target.value)}/>
</div>
<label for="inputPassword5" className="form-label">Password</label>
<input type="password" id="inputPassword5" className="form-control" value={password} onChange={e=>setpassword(e.target.value)} aria-describedby="passwordHelpBlock"/>
<div id="passwordHelpBlock" className="form-text">
Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
<button className="btn btn-primary"onClick={()=>access_account()}>enter</button>
</div>
}

export default Login