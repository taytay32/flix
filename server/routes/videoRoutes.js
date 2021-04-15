const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
const cors = require("cors");

//get endpoint for videoNav
router.get("/", (req, res) => {
  const vidsData = fs.readFileSync("./data/video-details.json");
  const parsedData = JSON.parse(vidsData);

  res.json(parsedData);
});

//get specific video
router.get("/:videoID", (req, res) => {
  const videoData = fs.readFileSync("./data/video-details.json");
  const parsedData = JSON.parse(videoData);

  const singleVid = parsedData.find((video) => video.id === req.params.videoID);

  res.json(singleVid);
});

//post new video
router.post("/", (req, res) => {
  //fetch timestamp
  let dateObject = new Date();
  let commentTimestamp = dateObject.getTime();

  const newVideo = {
    id: uniqid(),
    title: req.body.title,
    description: req.body.description,
    channel: "Channel 5",
    image: "http://localhost:8080/upload-img.jpg",
    views: "1,001,023",
    likes: 111007,
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: commentTimestamp,
    comments: [
      {
        name: "Micheal Lyons",
        comment:
          "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of acconcert I have EVER witnessed.",
        id: "1ab6d9f6-da38-456e-9b09-ab0acd9ce818",
        likes: 2360,
        timestamp: 1545162149000,
      },
      {
        name: "Gary Wong",
        comment:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        id: "cc6f173d-9e9d-4501-918d-bc11f15a8e14",
        likes: 350,
        timestamp: 1544595784046,
      },
      {
        name: "Theodore Duncan",
        comment:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
        id: "993f950f-df99-48e7-bd1e-d95003cc98f1",
        likes: 2351,
        timestamp: 1542262984046,
      },
      {
        name: "Nigel",
        comment: "tsrtfhdfghj",
        id: "nyk0c23jbkm89imuc",
        likes: 370,
        timestamp: 1615672208675,
      },
    ],
  };

  const vidsData = fs.readFileSync("./data/video-details.json");
  const parsedData = JSON.parse(vidsData);
  parsedData.push(newVideo);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(parsedData));

  res.json(newVideo);
});

//post new comment
router.post("/:videoID/comments", cors(), (req, res, next) => {
  //fetch timestamp
  let dateObject = new Date();
  let commentTimestamp = dateObject.getTime();

  const newComment = {
    name: "Nigel",
    comment: req.body.comment,
    id: uniqid(),
    likes: 0,
    timestamp: commentTimestamp,
  };

  const commentsData = fs.readFileSync("./data/video-details.json");
  const parsedCommentsData = JSON.parse(commentsData);

  const selectedVideo = parsedCommentsData.filter((video) => {
    return video.id === req.params.videoID;
  })[0];

  selectedVideo.comments.push(newComment);

  const otherVideos = parsedCommentsData.filter((video) => {
    return video.id !== req.params.videoID;
  });

  otherVideos.unshift(selectedVideo);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(otherVideos));

  res.json(newComment);
});

//DELETE COMMENT
router.delete("/:videoID/comments/:commentID", (req, res) => {
  const commentsData = fs.readFileSync("./data/video-details.json");
  const parsedCommentsData = JSON.parse(commentsData);

  const selectedVideo = parsedCommentsData.filter((video) => {
    return video.id === req.params.videoID;
  })[0];

  // const deleteComment = selectedVideo.comments.find((comment) => {
  //   return comment.id === req.params.commentID;
  // });

  const selectedComments = selectedVideo.comments.filter((comment) => {
    return comment.id !== req.params.commentID;
  });

  console.log(selectedComments);

  selectedVideo.comments = selectedComments;
  console.log(selectedVideo);

  const otherVideos = parsedCommentsData.filter((video) => {
    return video.id !== req.params.videoID;
  });

  otherVideos.unshift(selectedVideo);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(otherVideos));

  res.json(selectedComments);
});

//PUT COMMENT LIKES
router.put("/:videoID/comments/:commentID", (req, res) => {
  const commentsData = fs.readFileSync("./data/video-details.json");
  const parsedCommentsData = JSON.parse(commentsData);

  const selectedVideo = parsedCommentsData.filter((video) => {
    return video.id === req.params.videoID;
  })[0];

  const singleComment = selectedVideo.comments.find((comment) => {
    return comment.id === req.params.commentID;
  });

  singleComment.likes = singleComment.likes + 1;

  console.log(singleComment.likes);

  const otherComments = selectedVideo.comments.filter((comment) => {
    return comment.id !== req.params.commentID;
  });

  otherComments.push(singleComment);

  console.log(selectedVideo);

  const otherVideos = parsedCommentsData.filter((video) => {
    return video.id !== req.params.videoID;
  });

  otherVideos.unshift(selectedVideo);

  console.log(otherVideos);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(otherVideos));

  res.json(selectedVideo);
});

//PUT VIDEO LIKES
router.put("/:videoID", (req, res) => {
  const commentsData = fs.readFileSync("./data/video-details.json");
  const parsedCommentsData = JSON.parse(commentsData);

  const selectedVideo = parsedCommentsData.filter((video) => {
    return video.id === req.params.videoID;
  })[0];

  selectedVideo.likes = selectedVideo.likes + 1;

  const otherVideos = parsedCommentsData.filter((video) => {
    return video.id !== req.params.videoID;
  });

  otherVideos.unshift(selectedVideo);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(otherVideos));

  res.json(selectedVideo);
});

module.exports = router;
