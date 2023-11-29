import React from "react";

import SongList from "./SongCRUD/SongList";

export const Home = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto">

        <SongList />
      </div>
    </React.Fragment>
  );
};