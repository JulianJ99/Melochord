import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Login.css';


 

export const Login = () => {

const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState ("");

const [username, setUsername] = useState("");
const [password, setPassword] = useState ("");


const [loginStatus, setLoginStatus] = useState("");

const [UserIdFetcher, setUserIdFetcher] = useState("");


Axios.defaults.withCredentials = true;

Axios.create({
   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
   headers: {
     "Content-type": "application/json"
   },
   
 });

function withIdHook(Component) {
   console.log("Saved ID hook!");
   return function WrappedComponent(props) {
      const idHookValue = setUserIdFetcher();
      
      return <Component {...props} idHookValue={idHookValue}/>;
      
   }
}

const register = () => {
   Axios.post("http://localhost:3001/register", {
     username: usernameReg,
     password: passwordReg,
    }).then((response) => {
     console.log(response);
   });
};

const login = () => {
   Axios.post('http://localhost:3001/login', {
     username: username,
     password: password,
     id: null,
   }).then((response) => {
      console.log(response.data);
     if (response.data.message) {
        setLoginStatus(response.data.message);
     } else {
        setLoginStatus (response.data[0].username);
        setUserIdFetcher(response.data[0].id);
        
     }

  });
};
  
useEffect(() => {
  Axios.get("http://localhost:3001/login").then((response) => {
    if (response.data.loggedIn === true) {
      console.log(response.data);
      setLoginStatus(response.data.user[0].username);
      setUserIdFetcher(response.data.user[0].id);

    }
  });
 }, []);

 console.log(UserIdFetcher);
 console.log(loginStatus)

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
      {withIdHook()}
   </div>
   )
   

}

