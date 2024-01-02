import {useState, useEffect} from 'react';
import Axios from 'axios';


function App(){
  const [profiles, setProfiles] = useState([]);
  const [UserIdFetcher, setUserIdFetcher] = useState("");

function getProfile() {
  fetch('http://localhost:8081', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setProfiles(data);
      
    });
}

function updateProfile() {
  let profileid = UserIdFetcher;
  let username = prompt('Enter new song name');
  let profilepicture = prompt('Enter the name of the album that features the song');
  fetch(`http://localhost:8081/profiles${profileid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, profilepicture}),
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getProfile();
    });
}

  useEffect(() => {
    getProfile();
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        console.log(response.data);
        setUserIdFetcher(response.data.user[0].id);
        
      }
    });
  }, []);

  let renderedProfiles = profiles.map((profile, i) => {
    if(profile.profileid === UserIdFetcher){
      return (
      <tr key={i}>
        <td>{profile.profileid}</td>
        <td>{profile.username}</td>
        <td>{profile.profilepicture}</td>
      </tr>
    );
  }});


return (
<div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>PFP</th>
      </tr>
      </thead>
    <tbody>
      {renderedProfiles}
    </tbody>

  </table>
  <br />
  <button onClick={updateProfile}>Update profile</button>
</div>
);
}
export default App;