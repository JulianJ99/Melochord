import React, { createContext, useReducer } from 'react';

import appReducer from './AppReducer';

const initialState = {
  songs: [
    {
      id: 1,
      name: "Sammy",
      album: "DigitalOcean",
      artist: "Shark"
    }
  ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addSong(song) {
    dispatch({
      type: "ADD_SONG",
      payload: song
    });
  }

  function editSong(song) {
    dispatch({
      type: "EDIT_SONG",
      payload: song
    });
  }

  function removeSong(id) {
    dispatch({
      type: "REMOVE_SONG",
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        songs: state.songs,
        addSong,
        editSong,
        removeSong
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};