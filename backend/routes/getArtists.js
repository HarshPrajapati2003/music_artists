import express from "express";
const router = express.Router();
import artistModel from "../model/artist.js";

// GET request to get all artists
router.get("/all-artists", async (req, res) => {
    try {
        let artists = await artistModel.find({});
    
        res.status(200).json({ success: true, artists: artists });
    } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Server error please try later" });
        console.log("error occured : ",error)
    }
});

// POST request to add a new artist
router.post("/add-artist", async (req, res) => {

    try {
      const {artist_names,artist_genre,artist_img,country}=req.body
    // Create a new artist document from the request body
    const newArtist = new artistModel({artist_names,artist_genre,artist_img,country});

    // Save the new artist to the database
    await newArtist.save();

    res.status(201).json({
      success: true,
      message: "Artist added successfully",
      artist: newArtist,
    });

  } catch (error) {
    console.error("Error occurred while adding an artist:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
});

export default router;