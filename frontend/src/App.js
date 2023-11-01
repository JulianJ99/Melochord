import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Login from '../src/components/Login/Login';
import Preferences from '../src/components/Preferences/Preferences';
import useToken from '../src/components/App/useToken';



function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" /> 
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/preferences" element={<Preferences />}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;