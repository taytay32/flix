import React from "react";
import "./AddComment.scss";
import Mohan from "../../assets/Images/Mohan-muruge.jpg";
import axios from "axios";
import { API_URL } from "../../Utils";

class AddComment extends React.Component {
  state = {
    commentBox: "",
  };

  handleChange = (e) => {
    this.setState({
      commentBox: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const postHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        `${API_URL}/videos/${this.props.comments.id}/comments`,
        {
          comment: this.state.commentBox,
        },
        postHeaders
      )
      .then((response) => {
        this.props.fetchComments();
      });

    this.setState({
      commentBox: "",
    });
  };

  render() {
    return (
      <section className="comments">
        <h2 className="comments__title">JOIN THE CONVERSATION</h2>
        <div className="addCommentContainer">
          <div className="imgcontainer">
            <img className="imgcontainer__img" src={Mohan} alt="" />
          </div>
          <form
            action="submit"
            className="comment-form"
            onSubmit={this.handleSubmit}
          >
            <textarea
              name="commentBox"
              value={this.state.commentBox}
              onChange={this.handleChange}
              id="commentText"
              placeholder="Write comment here"
              className="comment-form__textarea"
            ></textarea>
            <div className="btn form-btn">
              <button type="submit" className="form-btn__btn">
                COMMENT
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default AddComment;
