import React, { Component } from "react";
import ProfileDataService from "../services/profile.service";
import { withRouter } from '../common/with-router';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProfile = this.updateProfile.bind(this);

    this.state = {
      currentProfile: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProfile(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProfile: {
          ...prevState.currentProfile,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentProfile: {
        ...prevState.currentProfile,
        description: description
      }
    }));
  }

  getProfile(id) {
    if (response.data.loggedIn === true) {
        id = response.data.user[0].id;
    }
    ProfileDataService.get(id)
      .then(response => {
        this.setState({
          currentProfile: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentProfile.id,
      title: this.state.currentProfile.title,
      description: this.state.currentProfile.description,
      published: status
    };

    ProfileDataService.update(this.state.currentProfile.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProfile: {
            ...prevState.currentProfile,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProfile() {
    ProfileDataService.update(
      this.state.currentProfile.id,
      this.state.currentProfile
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The profile was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProfile } = this.state;

    return (
      <div>
        {currentProfile ? (
          <div className="edit-form">
            <h4>Profile</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProfile.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProfile.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentProfile.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentProfile.published ? (
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
              type="submit"
              className="badge badge-success"
              onClick={this.updateProfile}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a profile...</p>
          </div>
        )}
      </div>
    );
  }
}



  export default withRouter(Profile);