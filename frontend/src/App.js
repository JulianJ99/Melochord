
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard/Dashboard';
import Login from '../src/components/Login/Login';
import Preferences from '../src/components/Preferences/Preferences';
import useToken from '../src/components/App/useToken';
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
      <h1>Melochord</h1>
      <Home />
        <Routes>
          
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