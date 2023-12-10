import {useState, useEffect} from 'react';

function App(){
  const [songs, setSongs] = useState([]);

function getSong() {
  fetch('http://localhost:3002', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setSongs(data);
      
    });
}

function createSong() {
  let title = prompt('Enter the song name');
  let album = prompt('Enter the name of the album that features the song');
  let artist = prompt('Enter the name of the artist who made the song');
  const currentDate = new Date().toLocaleString() + ""
  const createdAt = currentDate;
  const updatedAt = currentDate;
  
  fetch('http://localhost:3002/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, album, artist, createdAt, updatedAt}),
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getSong();
    });
}

function deleteSong() {
  let id = prompt('Enter song id');
  fetch(`http://localhost:3002/songs/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getSong();
    });
}

function updateSong() {
  let id = prompt('Enter song id');
  let title = prompt('Enter new song name');
  let album = prompt('Enter the name of the album that features the song');
  let artist = prompt('Enter the name of the artist who made the song');
  fetch(`http://localhost:3002/songs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, album, artist}),
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getSong();
    });
}


  useEffect(() => {
    getSong();
  }, []);

  let renderedSongs = songs.map((song, i) => {
    return (
      <tr key={i}>
        <td>{song.id}</td>
        <td>{song.title}</td>
        <td>{song.artist}</td>
        <td>{song.album}</td>
        <td>{song.createdat}</td>
        <td>{song.updatedat}</td>
      </tr>
    );
  });


return (
<div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Songs</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
      </thead>
    <tbody>
      {renderedSongs}
    </tbody>

  </table>
  <br />
  <button onClick={createSong}>Add song</button>
  <br />
  <button onClick={deleteSong}>Delete song</button>
  <br />
  <button onClick={updateSong}>Update song</button>
</div>
);
}
export default App;