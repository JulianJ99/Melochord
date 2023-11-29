
import './App.css';
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import {Route, Routes, Link } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard/Dashboard';
//import Login from '../src/components/Login/Login';
import Preferences from '../src/components/Preferences/Preferences';
//import useToken from '../src/components/App/useToken';
import { Home } from '../src/components/Home';
import AddSong from '../src/components/SongCRUD/AddSong';
import SongsList from '../src/components/SongCRUD/SongList';
import { EditSong } from '../src/components/SongCRUD/EditSong';
import { GlobalProvider } from '../src/components/context/globalState';


function App() {
  //const { token, setToken } = useToken();

  //if(!token) {
    //return <Login setToken={setToken} />
  //}

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState ("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState ("");
  
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  
  const register = () => {
     Axios.post("http://localhost:3001/register", {
       username: usernameReg,
       password: passwordReg,
      }).then((response) => {
       console.log(response);
     });
  };
  
  const login = () => {
     Axios.post("http://localhost:3001/login", {
       username: username,
       password: password,
     }).then((response) => {
       if (response.data.message) {
          setLoginStatus( response.data.message);
       } else {
          setLoginStatus (response.data[0].username);
       }
       console.log(response.data);
    });
  };
    
  useEffect(() => {
   Axios.get("http://localhost:3001/login").then((response) => {
     if (response.data.loggedIn === true) {
       setLoginStatus(response.data.user[0].username);
     }
   });
 }, []);

  return (
    
    <GlobalProvider>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/SongsList"} className="nav-link">
                Songs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add song
              </Link>
            </li>
          </div>
        </nav>

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

    <div className="wrapper">

      <h1>Melochord</h1>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/SongsList" element={<SongsList />} />
          <Route path="/add" element={<AddSong />} exact />
          <Route path="/edit/:id" element={<EditSong />} exact />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/preferences" element={<Preferences />}/> 
        </Routes>
    </div>
    </GlobalProvider>
  );
}

export default App;