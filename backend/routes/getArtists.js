import express from "express";
const router = express.Router();
import artistModel from "../model/artist.js";

// GET request to get all artists with pagination
router.get("/all-artists", async (req, res) => {
    try {
        // Get the page and limit from the query parameters, with defaults
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 50; // Set the limit to 5000 records per page

        // Calculate the starting index for the current page
        const startIndex = (page - 1) * limit;

        // Retrieve the artists with pagination
        let artists = await artistModel.find({})
                                        .skip(startIndex)
                                        .limit(limit);

        // Optionally, get the total number of artists for the client to know the total pages
      const totalArtists = await artistModel.countDocuments({});
      const totalPages = Math.ceil(totalArtists / limit);
  
        // Respond with the data and pagination info
        res.status(200).json({
            success: true,
            page: page,
            totalPages: totalPages,
            totalArtists: totalArtists,
            artists: artists
        });

        console.log(`Page: ${page}, Returned records: ${artists.length}`);

    } catch (error) {
        res.status(400).json({ success: false, message: "Server error, please try later" });
        console.log("Error occurred: ", error);
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