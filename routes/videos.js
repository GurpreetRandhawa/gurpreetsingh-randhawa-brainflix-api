const express = require("express");
const router = express.Router();

const path = require("node:path");
const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

/**
 * Get all the videos with required keys
 */
router.get("/", (_req, res) => {
  try {
    const videoList = videos.map((video) => {
      return {
        id: video.id,
        title: video.title,
        image: video.image,
        channel: video.channel,
      };
    });
    res.json(videoList);
  } catch (error) {
    console.log("Error retrieving the videos, error");
  }
});

router.get("/:id", (req, res) => {
  const found = videos.some((video) => video.id === req.params.id);
  if (found) {
    res.json(videos.filter((video) => video.id === req.params.id));
  } else {
    res.status(400).json({ error: `Video with ID:${req.params.id} not found` });
  }
});

module.exports = router;
