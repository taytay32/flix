//TIME CONVERSION

export const TimeConversion = (timestamp) => {
  let dait = new Date();
  //get seconds
  let currentTimeS = Math.floor(dait.getTime() / 1000);
  //seconds since post
  let sec = currentTimeS - timestamp / 1000;

  //if seconds ago
  if (sec < 60) {
    return Math.floor(sec) + " seconds ago";
  }

  //minutes ago
  if (sec > 60 && sec < 3600) {
    return Math.floor(sec / 60) + " minutes ago";
  }

  //hour ago
  if (sec > 3600 && sec < 3600 * 2) {
    return Math.floor(sec / 3600) + " hour ago";
  }

  //hours ago
  if (sec > 3600 * 2 && sec < 3600 * 24) {
    return Math.floor(sec / 3600) + " hours ago";
  }

  //days ago
  if (sec > 3600 * 24 && sec < 3600 * 24 * 7) {
    return Math.floor(sec / (60 * 60 * 24)) + " days ago";
  }

  //weeks ago
  if (sec > 3600 * 24 * 7 && sec < 3600 * 24 * 7 * 4) {
    return Math.floor(sec / (3600 * 24 * 7)) + " weeks ago";
  }

  //months ago

  if (sec > 3600 * 24 * 7 * 4 && sec < 3600 * 24 * 7 * 12) {
    return Math.floor(sec / (3600 * 24 * 7 * 4)) + " months ago";
  }

  //years ago
  if (sec > 3600 * 24 * 7 * 4 * 12) {
    return Math.floor(sec / (3600 * 24 * 7 * 4 * 12)) + " years ago";
  }
};

export const apiURL = "https://project-2-api.herokuapp.com";
export const apiKey = "/?api_key=f36ee0e1-70cc-49cd-b887-20d125d0f7d6";
export const getRequest =
  "https://project-2-api.herokuapp.com/videos/?api_key=f36ee0e1-70cc-49cd-b887-20d125d0f7d6";
export const getReq = "https://project-2-api.herokuapp.com/videos/";
export const postReqEnd =
  "/comments/?api_key=f36ee0e1-70cc-49cd-b887-20d125d0f7d6";

// https://project-2-api.herokuapp.com/videos/:id/comments/?api_key=f36ee0e1-70cc-49cd-b887-20d125d0f7d6

export const API_URL = process.env.REACT_APP_API_URL;
