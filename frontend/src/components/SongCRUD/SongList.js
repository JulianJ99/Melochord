import React, { Component } from "react";
import SongDataService from "../SongCRUD/song.service";
import { Link } from "react-router-dom";

export default class SongsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveSongs = this.retrieveSongs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSong = this.setActiveSong.bind(this);
    this.removeAllSongs = this.removeAllSongs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      songs: [],
      currentSong: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveSongs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveSongs() {
    SongDataService.getAll()
      .then(response => {
        this.setState({
          songs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSongs();
    this.setState({
      currentSong: null,
      currentIndex: -1
    });
  }

  setActiveSong(song, index) {
    this.setState({
      currentSong: song,
      currentIndex: index
    });
  }

  removeAllSongs() {
    SongDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    SongDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          songs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, songs, currentSong, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Songs List</h4>

          <ul className="list-group">
            {songs &&
              songs.map((song, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSong(song, index)}
                  key={index}
                >
                  {song.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSongs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSong ? (
            <div>
              <h4>Song</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentSong.title}
              </div>
              <div>
                <label>
                  <strong>Album:</strong>
                </label>{" "}
                {currentSong.album}
              </div>
              <div>
                <label>
                  <strong>Artist:</strong>
                </label>{" "}
                {currentSong.artist}
              </div>

              <Link
                to={"/songs/" + currentSong.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a song</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}