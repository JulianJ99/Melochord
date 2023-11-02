import React from "react";
import { Heading } from "./Heading";
import { SongList } from "./SongCRUD/SongList";

export const Home = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto">

        <Heading />
        <SongList />
      </div>
    </React.Fragment>
  );
};