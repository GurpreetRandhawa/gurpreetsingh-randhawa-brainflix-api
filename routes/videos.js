const express = require("express");
const router = express.Router();

const path = require("node:path");
const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);
const PORT = process.env.PORT;

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
    // res.json(videos.filter((video) => video.id === req.params.id));
    const main_video = videos.filter((video) => video.id === req.params.id);
    const main_video_obj = main_video[0];
    res.json(main_video_obj);
  } else {
    res.status(400).json({ error: `Video with ID:${req.params.id} not found` });
  }
});

// router.post("/", (req, res)=> {
//   const
// })

module.exports = router;
