const express = require("express");
const router = express.Router();

const path = require("node:path");
const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);
const PORT = process.env.PORT;
const helper = require("../helper/helper");

/**
 * Get all the videos with required keys
 */
router.get("/", (_req, res) => {
  try {
    const videoList = videos.map((video) => {
      return {
        id: video.id,
        title: video.title,
        image: `http://localhost:${PORT}/images/` + video.image,
        channel: video.channel,
      };
    });
    res.json(videoList);
  } catch (error) {
    console.log("Error retrieving the videos, error");
  }
});

/**
 * Get specific video by ID
 */
router.get("/:id", (req, res) => {
  const found = videos.some((video) => video.id === req.params.id);
  if (found) {
    const main_video = videos.filter((video) => video.id === req.params.id);
    const main_video_obj = main_video[0];
    res.json(main_video_obj);
  } else {
    res.status(400).json({ error: `Video with ID:${req.params.id} not found` });
  }
});

router.post("/", (req, res) => {
  const newVideo = {
    id: helper.getNewId(),
    title: req.body.title,
    channel: "WWE",
    image: "Upload-video-preview.jpg",
    description: req.body.description,
    views: "190",
    likes: "786",
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: helper.timestamp(),
    comments: [
      {
        id: "2d818087-c1f4-4ec2-bcdc-b545fd6ec258",
        name: "Martin Evergreen",
        comment:
          "I’ve loved trains ever since I was a child. I dreamed about riding one around the world. This is the most fantastic thing I’ve seen yet, and I’m watching it ON a train!",
        likes: 3,
        timestamp: 1632512763000,
      },
      {
        id: "191de346-b3c2-47b4-bf5b-6db90d1e3bdc",
        name: "Emily Harper",
        comment:
          "Let’s collaborate on a video for saving money on cheap train tickets! I’ll have my associates contact yours.",
        likes: 0,
        timestamp: 1632496261000,
      },
    ],
  };
  if (!newVideo.title || !newVideo.description) {
    return res
      .status(400)
      .json({ error: "Please provide title and description of the video" });
  }
  videos.push(newVideo);
  helper.writeJSONFile(videosJSONFile, videos);
  res.status(201).json(newVideo);
});

module.exports = router;
