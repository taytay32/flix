import React from "react";
import "./VideoInfo.scss";
import { TimeConversion } from "../../Utils";
import ViewIcon from "../../assets/Icons/Icon-views.svg";
import LikeIcon from "../../assets/Icons/Icon-likes.svg";
import axios from "axios";
import { API_URL } from "../../Utils";

function VideoInfo({ videos, comments, onAddLike }) {
  const addLike = (vidid) => {
    axios
      .put(`${API_URL}/videos/${vidid}`, "mytoken", {
        headers: { "Content-Type": "text/plain" },
      })
      .then((response) => {
        onAddLike();
      })
      .catch((error) => {
        console.log("womp womp");
      });
  };

  return (
    <section className="video-info">
      <h1 className="video-info__title">{videos.title}</h1>
      <div className="vid-subtitles">
        <div className="title-div">
          <h2 className="title-div__channel">By {videos.channel}</h2>
          <p className="title-div__date">{TimeConversion(videos.timestamp)}</p>
        </div>
        <div className="icon-div">
          <img src={ViewIcon} alt="" className="icon-div__view-icon" />
          <p className="icon-div__views">{videos.views}</p>
          <img src={LikeIcon} alt="" className="icon-div__like-icon" />
          <p className="icon-div__likes">
            {new Intl.NumberFormat().format(videos.likes)}
          </p>
        </div>
      </div>
      <div className="vid-description">
        <p className="vid-description__description">{videos.description}</p>
        <button className="like-btn" onClick={() => addLike(videos.id)}>
          LIKE
        </button>
      </div>

      <h3 className="comments-counter">{comments.length} Comments</h3>
    </section>
  );
}

export default VideoInfo;
