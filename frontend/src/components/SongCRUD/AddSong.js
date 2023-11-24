import React, { Component } from "react";
import SongDataService from "../SongCRUD/song.service";

export default class AddSong extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.onChangeAlbum = this.onChangeAlbum.bind(this);
    this.saveSong = this.saveSong.bind(this);
    this.newSong = this.newSong.bind(this);

    this.state = {
      id: null,
      title: "",
      artist: "", 
      album: "",

    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeArtist(e) {
    this.setState({
      artist: e.target.value
    });
  }

  onChangeAlbum(e) {
    this.setState({
      album: e.target.value
    });
  }

  saveSong() {
    var data = {
      title: this.state.title,
      artist: this.state.artist,
      album: this.state.artist
    };

    SongDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          artist: response.data.artist,
          album: response.data.album,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSong() {
    this.setState({
      id: null,
      title: "",
      artist: "",
      album: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSong}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                className="form-control"
                id="artist"
                required
                value={this.state.artist}
                onChange={this.onChangeArtist}
                name="artist"
              />
            </div>

            <div className="form-group">
              <label htmlFor="album">Album</label>
              <input
                type="text"
                className="form-control"
                id="album"
                required
                value={this.state.album}
                onChange={this.onChangeAlbum}
                name="album"
              />
            </div>

            <button onClick={this.saveSong} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}