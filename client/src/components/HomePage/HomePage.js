import React, { Component } from "react";
import VideoNav from "../VidNav/VidNav";
import AddComment from "../AddComment/AddComment";
import Comments from "../Comments/Comments";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VideoInfo from "../VideoInfo/VideoInfo";
import "./HomePage.scss";
import axios from "axios";
import { API_URL } from "../../Utils";

class HomePage extends Component {
  state = {
    vidData: [],
    selectedVideo: null,
    selectedComments: null,
  };

  //repopulate with new comments
  fetchComments = () => {
    const defaultVideoID =
      this.props.match.params.videoID || this.state.vidData[0].id;

    axios.get(`${API_URL}/videos/${defaultVideoID}`).then((response) => {
      this.setState({
        selectedVideo: response.data,
        selectedComments: response.data.comments.sort(function (x, y) {
          return y.timestamp - x.timestamp;
        }),
      });
    });
  };

  //repopulate with added likes
  fetchLikes = () => {
    const defaultVideoID =
      this.props.match.params.videoID || this.state.vidData[0].id;

    axios.get(`${API_URL}/videos/${defaultVideoID}`).then((response) => {
      this.setState({
        selectedVideo: response.data,
      });
    });
  };

  componentDidMount() {
    //GET VIDEONAV
    axios.get(`${API_URL}/videos`).then((response) => {
      this.setState({
        vidData: response.data,
      });

      const defaultVideoID =
        this.props.match.params.videoID || response.data[0].id;

      //GET DISPLAYED VIDEO/COMMENTS
      axios.get(`${API_URL}/videos/${defaultVideoID}`).then((response) => {
        this.setState({
          selectedVideo: response.data,
          selectedComments: response.data.comments.sort(function (x, y) {
            return y.timestamp - x.timestamp;
          }),
        });
      });
    });
  }

  componentDidUpdate(prevProps) {
    const videoID = this.props.match.params.videoID;

    if (prevProps.match.params.videoID !== videoID) {
      axios.get(`${API_URL}/videos/${videoID}`).then((response) => {
        this.setState({
          selectedVideo: response.data,
          selectedComments: response.data.comments.sort(function (x, y) {
            return y.timestamp - x.timestamp;
          }),
        });
      });
    }
  }

  render() {
    if (this.state.vidData.length === 0 || !this.state.selectedVideo)
      return <p className="loading">Loading...</p>;

    const filteredVids = this.state.vidData.filter(
      (vid) => vid.id !== this.state.selectedVideo.id
    );

    return (
      <>
        {this.state.selectedVideo && (
          <VideoPlayer videos={this.state.selectedVideo} />
        )}
        <div className="desktopFlexing">
          <div className="comments-wrap">
            {this.state.selectedVideo && this.state.selectedComments && (
              <VideoInfo
                videos={this.state.selectedVideo}
                comments={this.state.selectedComments}
                onAddLike={this.fetchLikes}
              />
            )}
            {this.state.selectedComments && (
              <AddComment
                comments={this.state.selectedVideo}
                fetchComments={this.fetchComments}
              />
            )}
            {this.state.selectedComments && this.state.selectedVideo.id && (
              <Comments
                comments={this.state.selectedComments}
                selectedVideo={this.state.selectedVideo.id}
                onDelete={this.fetchComments}
                onLike={this.fetchComments}
              />
            )}
          </div>

          <VideoNav videos={filteredVids} selectVid={this.handleSelectVid} />
        </div>
      </>
    );
  }
}

export default HomePage;
