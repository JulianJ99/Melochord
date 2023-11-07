import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Preferences from '../src/components/Preferences/Preferences';
import { Home } from '../src/components/Home';
import { AddSong } from '../src/components/SongCRUD/AddSong';
import { EditSong } from '../src/components/SongCRUD/EditSong';
import { GlobalProvider } from '../src/components/context/globalState';
import Navbar from "./Navbar";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";


function App() {


  return (
    <GlobalProvider>
    <div className="wrapper">
      <h1>Melochord</h1>
      <Home />
        <Routes>
          
          <Route path="/add" element={<AddSong />} exact />
          <Route path="/edit/:id" element={<EditSong />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Navbar/>
          <Route path="/preferences" element={<Preferences />}/> 
        </Routes>
    </div>
    </GlobalProvider>
  );
}

export default App;