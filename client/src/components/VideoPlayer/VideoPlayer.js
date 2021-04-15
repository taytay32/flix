import React from "react";
import "./VideoPlayer.scss";

function VideoPlayer({ videos }) {
  return (
    <div key={videos.id}>
      <section className="video-wrapper">
        <video
          className="video-player"
          src=""
          controls
          poster={videos.image}
        ></video>
      </section>
    </div>
  );
}

export default VideoPlayer;
