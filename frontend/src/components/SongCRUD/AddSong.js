import React, { useState, useContext } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';

import { GlobalContext } from '../context/globalState';

export const AddSong = () => {
  let history = useNavigate();

  const { addSong, songs } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newSong = {
      id: songs.length + 1,
      name,
      album,
      artist,
    };
    addSong(newSong);
    history("/");
  };

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name of song
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Album"
            >
              Album
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              type="text"
              placeholder="Enter album"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="artist"
            >
              Artist
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              type="text"
              placeholder="Enter artist"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Song
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};