import React from "react";
import "./VidNav.scss";
import { Link } from "react-router-dom";

function VideoNav({ videos }) {
  return (
    <>
      <aside className="nextVidCont">
        <h4 className="nextVidTitle">NEXT VIDEO</h4>
        {videos.map((video) => {
          return (
            <Link to={"/videos/" + video.id} key={video.id}>
              <div className="nextVid">
                <div className="nextVidImgWrap">
                  <img src={video.image} alt="" className="nextVid__img" />
                </div>
                <div className="nextVidText">
                  <h1 className="nextVidText__title">{video.title}</h1>
                  <p className="nextVidText__channel">{video.channel}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </aside>
    </>
  );
}

export default VideoNav;
