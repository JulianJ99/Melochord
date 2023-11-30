
import './App.css';
import React, { Component } from "react";
import {Route, Routes, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

//import useToken from '../src/components/App/useToken';
import { Login } from '../src/components/Login/Login';
import { Home } from '../src/components/Home';
import AddSong from '../src/components/SongCRUD/AddSong';
import SongsList from '../src/components/SongCRUD/SongList';


class App extends Component {
  //const { token, setToken } = useToken();

  //if(!token) {
    //return <Login setToken={setToken} />
  //}

render(){
  return (
      <React.Fragment>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/songs"} className="nav-link">
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


    <div className="wrapper">

      <h1>Melochord</h1>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/songs" element={<SongsList />} />
          <Route path="/add" element={<AddSong />} exact />
          <Route path="/login" element={<Login />}/>
        </Routes>
    </div>
    </React.Fragment>
  );
}
}

export default App;