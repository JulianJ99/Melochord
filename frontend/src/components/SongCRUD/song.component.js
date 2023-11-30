import React, { Component } from "react";
import SongDataService from "../SongCRUD/song.service";
import { withRouter } from '../common/with-router';

class Song extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAlbum = this.onChangeAlbum.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.getSong = this.getSong.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);

    this.state = {
      currentSong: {
        id: null,
        title: "",
        album: "",
        artist: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSong(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSong: {
          ...prevState.currentSong,
          title: title
        }
      };
    });
  }

  onChangeAlbum(e) {
    const album = e.target.value;
    
    this.setState(prevState => ({
      currentSong: {
        ...prevState.currentSong,
        album: album
      }
    }));
  }

  onChangeArtist(e) {
    const artist = e.target.value;
    
    this.setState(prevState => ({
      currentSong: {
        ...prevState.currentSong,
        artist: artist
      }
    }));
  }

  getSong(id) {
    SongDataService.get(id)
      .then(response => {
        this.setState({
          currentSong: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSong.id,
      title: this.state.currentSong.title,
      description: this.state.currentSong.description,
      published: status
    };
    SongDataService.update(this.state.currentSong.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSong: {
            ...prevState.currentSong,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSong() {
    SongDataService.update(
      this.state.currentSong.id,
      this.state.currentSong
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The song was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSong() {    
    SongDataService.delete(this.state.currentSong.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/songs');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSong } = this.state;

    return (
      <div>
        {currentSong ? (
          <div className="edit-form">
            <h4>Song</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSong.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="album">Album</label>
                <input
                  type="text"
                  className="form-control"
                  id="album"
                  value={currentSong.album}
                  onChange={this.onChangeAlbum}
                />
              </div>

              <div className="form-group">
                <label htmlFor="artist">Artist</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSong.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSong.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentSong.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSong}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSong}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a song</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Song);