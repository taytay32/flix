import React from "react";
import "./Comments.scss";
import { TimeConversion } from "../../Utils";
import xicon from "../../assets/Icons/delete.svg";
import heart from "../../assets/Icons/heart.svg";
import axios from "axios";
import { API_URL } from "../../Utils";

function Comments({ comments, selectedVideo, onDelete, onLike }) {
  const deleteComment = (id, vidid) => {
    axios
      .delete(`${API_URL}/videos/${vidid}/comments/${id}`)
      .then((reponse) => {
        onDelete();
      })
      .catch((error) => {
        console.log("womp womp");
      });
  };

  const likeComment = (id, vidid) => {
    axios
      .put(`${API_URL}/videos/${vidid}/comments/${id}`, "mytoken", {
        headers: { "Content-Type": "text/plain" },
      })
      .then((response) => {
        onLike();
      });
  };

  return (
    <ul className="entryCont">
      {comments.map((comment) => {
        return (
          <li className="entry" key={comment.id}>
            <div className="entry__img"></div>

            <div className="entry-right">
              <div className="entry-right-ch">
                <h4 className="entry-right-ch__title">{comment.name}</h4>
                <p className="entry-right-ch__date">
                  {TimeConversion(comment.timestamp)}
                </p>
              </div>

              <div className="entry-right-ch-2">
                <p className="entry-right-ch-2__entry">{comment.comment}</p>
                <div className="delete-like-cont">
                  <button
                    className="delete-button"
                    onClick={() => deleteComment(comment.id, selectedVideo)}
                  >
                    <img className="delete-icon" src={xicon} alt="delete" />
                    <p className="delete-p">DELETE</p>
                  </button>
                  <div className="likewrapper">
                    <button
                      className="like-button"
                      onClick={() => likeComment(comment.id, selectedVideo)}
                    >
                      <img className="heart-icon" src={heart} alt="like" />
                    </button>
                    <p className="likes">
                      {new Intl.NumberFormat().format(comment.likes)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
