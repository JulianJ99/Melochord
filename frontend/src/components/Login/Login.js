import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Login.css';

 

export const Login = () => {

const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");

const [username, setUsername] = useState("");
const [password, setPassword] = useState ("");

const [loginStatus, setLoginStatus] = useState("");



Axios.create({
   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
   headers: {
     "Content-type": "application/json"
   }
 });


const register = () => {
   Axios.post("http://host.docker.internal:3001/register", {
     username: usernameReg,
     password: passwordReg,
    }).then((response) => {
     console.log(response);
   });
};

const login = () => {
   Axios.post("http://host.docker.internal:3001/login", {
     username: username,
     password: password,
   }).then((response) => {
      console.log(response.data);
     if (response.data.message) {
        setLoginStatus( response.data.message);
     } else {
        setLoginStatus (response.data[0].username);
     }

  });
};
  
useEffect(() => {
  Axios.get("http://host.docker.internal:3001/login").then((response) => {
    if (response.data.loggedIn === true) {
      setLoginStatus(response.data.user[0].username);
    }
  });
 }, []);

   return(
 
    

     <div className="App">
     <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
           type="text"
           onChange={(e) => {
              setUsernameReg(e.target.value);
           }}
        /><br/>
        <label>Password</label>
        <input 
          type="text"
          onChange={(e) =>{
             setPasswordReg(e.target.value);
          }}
        /> <br />
        <button onClick={register} > Register</button>
        
     </div>
 
     <div className="login">
         <h1>Login</h1>
         <input
            type="text"
            placeholder="Username…"
            onChange = {(e) => {
               setUsername(e.target.value);
            }}
            /> <br/>
         <input
            type="password"
            placeholder="Password…"
            onChange = {(e) => {
               setPassword(e.target.value);
            }}
         />
         <button onClick={login}>Login</button>
     </div>
     <h1> {loginStatus}</h1>
  </div>
 )
}

