import React, { Component } from "react";
import "./UploadPage.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Utils";

// localhost:8080/videos/1af0jruup5gu/comments

class UploadPage extends Component {
  state = {
    showNotification: false,
    uploadTitle: "",
    vidDescription: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitVid = (e) => {
    e.preventDefault();
    const postHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        `${API_URL}/videos/`,
        {
          title: this.state.uploadTitle,
          description: this.state.vidDescription,
        },
        postHeaders
      )
      .then((response) => {
        this.setState({
          uploadTitle: "",
          vidDescription: "",
          showNotification: true,
        });
      });
  };

  render() {
    if (!this.state.showNotification) {
      return (
        <section className="uploadContainer">
          <h2 className="uploadContainer__title">Upload Video</h2>
          <form className="uploadForm" onSubmit={(e) => this.onSubmitVid(e)}>
            <div className="lastminflex">
              <div className="upContainer">
                <div className="imgTitleWrap">
                  <h4 className="imgTitleWrap__title">VIDEO THUMBNAIL</h4>
                  <div className="imgWrap"></div>
                </div>
              </div>
              <div className="lastminflex2">
                <div className="upTitleContainer">
                  <h4 className="upTitleContainer__title">TITLE YOUR VIDEO</h4>
                  <textarea
                    name="uploadTitle"
                    id="uploadTitle"
                    placeholder="Add a title to your video"
                    className="upTitleContainer__textarea"
                    value={this.state.titleBox}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="descriptContainer">
                  <h4 className="descriptContainer__title">
                    ADD A VIDEO DESCRIPTION
                  </h4>
                  <textarea
                    name="vidDescription"
                    id="vidDescription"
                    placeholder="Add a description of your video"
                    className="descriptContainer__textarea"
                    value={this.state.descriptionBox}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="button-div">
              <button className="publishBtn">PUBLISH</button>
              <button className="cancelBtn">CANCEL</button>
            </div>
          </form>
        </section>
      );
    } else {
      return (
        <section className="uploadContainer">
          <h3 className="notification__title">Video Successfully Uploaded</h3>
          <Link to="/">
            <button className="notification__btn">BACK TO HOME</button>
          </Link>
        </section>
      );
    }
  }
}

export default UploadPage;
