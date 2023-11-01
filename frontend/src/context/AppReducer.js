export default function appReducer(state, action) {
    switch (action.type) {
      case "ADD_SONG":
        return {
          ...state,
          songs: [...state.songs, action.payload],
        };
  
      case "EDIT_SONG":
        const updatedSong = action.payload;
  
        const updatedSongs = state.songs.map((song) => {
            if (song.id === updatedSong.id) {
                return updatedSong;
              }
          return song;
        });
  
        return {
          ...state,
          songs: updatedSongs,
        };
  
      case "REMOVE_SONG":
        return {
          ...state,
          songs: state.songs.filter(
            (song) => song.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };