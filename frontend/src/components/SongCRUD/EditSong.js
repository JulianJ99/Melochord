import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';


import { GlobalContext } from '../context/globalState';

export const EditSong = (route) => {
  let history = useNavigate();

  const { songs, editSong } = useContext(GlobalContext);

  const [selectedSong, setSelectedSong] = useState({
    id: null,
    title: "",
    album: "",
    artist: "",
  });
  let {id} = useParams();
  const currentSongId = id;

  useEffect(() => {
    const songId = currentSongId;
    const selectedSong = songs.find(
      (currentSongTraversal) => currentSongTraversal.id === parseInt(songId)
    );
    setSelectedSong(selectedSong);
  }, [currentSongId, songs]);

  const onSubmit = (e) => {
    e.preventDefault();
    editSong(selectedSong);
    history("/");
  };

  const handleOnChange = (songKey, newValue) =>
    setSelectedSong({ ...selectedSong, [songKey]: newValue });

  if (!selectedSong || !selectedSong.id) {
    return <div>Invalid Song ID.</div>;
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="song"
            >
              Name of Song
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedSong.title}
              onChange={(e) => handleOnChange("title", e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full  mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="album"
            >
              Album
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedSong.album}
              onChange={(e) => handleOnChange("album", e.target.value)}
              type="text"
              placeholder="Enter album"
            />
          </div>
          <div className="w-full  mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="artist"
            >
              Artist
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedSong.artist}
              onChange={(e) => handleOnChange("artist", e.target.value)}
              type="text"
              placeholder="Enter artist"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Edit Song
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