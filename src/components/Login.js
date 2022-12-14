import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const {setAuthState}=useContext(AuthContext)

    let navigate=useNavigate();
    const login=()=>{
        const data={username:username, password:password};
        
        axios.post("http://localhost:3001/user/login", data).then((response) => {
            
            if(response.data.error){
               alert(response.data.error); 
            } else{
                if(response.data==='User blocked'){
                    alert(response.data); 
                }else{
                localStorage.setItem('accessToken', response.data.token)
                localStorage.setItem('id', response.data.id)
                setAuthState({username: response.data.username, id:response.data.id, status:true});
                navigate(`/userapp`)
                }
            }
            
        });
    }
    
  return (
    <div className="loginContainer">
        <label>Username:</label>
        <input type="text" onChange={(event)=>{setUsername(event.target.value);}}/>
        <label>Password:</label>
        <input type="password" onChange={(event)=>{setPassword(event.target.value);}}/>
        <button onClick={login}>Login</button>
    </div>

  );
};

export default Login;
