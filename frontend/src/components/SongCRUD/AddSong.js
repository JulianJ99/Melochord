import React, { Component } from "react";
import SongDataService from "./song.service";

export default class AddSong extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAlbum = this.onChangeAlbum.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.saveSong = this.saveSong.bind(this);
    this.newSong = this.newSong.bind(this);

    this.state = {
      id: null,
      title: "",
      album: "", 
      artist: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
    
  }

  onChangeAlbum(e) {
    this.setState({
      album: e.target.value
    });
    
  }

  onChangeArtist(e) {
    this.setState({
      artist: e.target.value
    });
    
  }

  saveSong() {
    var data = {
      title: this.state.title,
      album: this.state.album,
      artist: this.state.artist
    };
    console.log(this.state.title, this.state.album, this.state.artist)

    SongDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          album: response.data.album,
          artist: response.data.artist,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("Done");
  }

  newSong() {
    this.setState({
      id: null,
      title: "",
      album: "",
      artist: "",
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

            <button className="btn btn-success" onClick={this.saveSong} >
              Submit 
            </button>
          </div>
        )}
      </div>
    );
  }
}