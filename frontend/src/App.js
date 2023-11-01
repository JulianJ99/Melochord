import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Login from '../src/components/Login/Login';
import Preferences from '../src/components/Preferences/Preferences';
import useToken from '../src/components/App/useToken';
import { SongList } from '../src/components/SongCRUD/SongList';
import { Home } from '../src/components/Home';
import { AddSong } from '../src/components/SongCRUD/AddSong';
import { EditSong } from '../src/components/SongCRUD/EditSong';


import { GlobalProvider } from '../src/components/context/globalState';


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <GlobalProvider>
    <div className="wrapper">
      <h1>Application</h1>
      <SongList />
      <BrowserRouter>
      <App />
        <Routes>
          <Route path="/" component={Home} exact />
          <Route path="/add" component={AddSong} exact />
          <Route path="/edit/:id" component={EditSong} exact />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/preferences" element={<Preferences />}/> 
        </Routes>
      </BrowserRouter>

    </div>
    </GlobalProvider>
  );
}

export default App;