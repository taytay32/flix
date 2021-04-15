const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("dotenv").config();
const port = process.env.PORT || 8080;

const videoRoutes = require("./routes/videoRoutes.js");

app.use(express.json());
app.use(express.static("files"));

app.use((req, res, next) => {
  console.log("middleware running");
  next();
});

app.use((req, res, next) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).send("Please provide request in JSON format.");
  }
  next();
});

app.use("/videos", videoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
