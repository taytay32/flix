import React from "react";
import "./Header.scss";
import logo from "../../assets/Logo/Logo-brainflix.svg";
import userImg from "../../assets/Images/Mohan-muruge.jpg";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="headerContainer">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" className="logo__image" />
            </Link>
          </div>
          <div className="header-right-side-wrapper">
            <div className="searchBox">
              <input
                className="searchBox__box"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="upload">
              <Link to="/UploadPage">
                <button className="upload__btn">UPLOAD</button>
              </Link>
              <img className="upload__img" src={userImg} alt="" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
