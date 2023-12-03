import {useState, useEffect} from 'react';

function App(){
  const [songs, setSongs] = useState(false);

function getSong() {
  fetch('http://localhost:3002')
    .then(response => {
      return response.text();
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
  console.log(title, album, artist, createdAt, updatedAt);
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
return (
<div>
  {songs ? songs : 'There is no song data available'}
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