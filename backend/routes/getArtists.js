import express from "express";
const router = express.Router();
import artistModel from "../model/artist.js";
import stringSimilarity from "string-similarity";

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

// GET request to find artists by exact name
router.get("/artist-by-name", async (req, res) => {
    try {
        const artistName = req.query.name;

        if (!artistName) {
            return res.status(400).json({ 
                success: false, 
                message: "Artist name is required",
                page: 1,
                totalPages: 1,
                totalArtists: 0,
                artists: []
            });
        }

        // Find the artist by exact name
        let artist = await artistModel.findOne({ artist_names: artistName });

        // Return the response
        if (artist) {
            res.status(200).json({
                success: true,
                page: 1,  
                totalPages: 1, 
                totalArtists: 1, 
                artists: [artist] 
            });
        } else {
            res.status(200).json({
                success: true,
                page: 1,
                totalPages: 1,
                totalArtists: 0,
                artists: []
            });
        }

        console.log(`Artist name: ${artistName}, Found: ${!!artist}`);

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: "Server error, please try later",
            page: 1,
            totalPages: 1,
            totalArtists: 0,
            artists: []
        });
        console.log("Error occurred: ", error);
    }
});

// GET request to get artist suggestions with dynamic search
router.get("/search-artists", async (req, res) => {
    try {
        const searchQuery = req.query.q || "";
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 50;
        const startIndex = (page - 1) * limit;

        // Retrieve all artist names (or you can optimize this by indexing artist names)
        let allArtists = await artistModel.find({}, 'artist_names');

        // Use string similarity to find the closest matches
        let artistNames = allArtists.map(artist => artist.artist_names);
        let matches = stringSimilarity.findBestMatch(searchQuery, artistNames);
        let bestMatches = matches.ratings
                                .filter(match => match.rating > 0.8) // threshold for similarity
                                .sort((a, b) => b.rating - a.rating)
                                .map(match => match.target);

        if (bestMatches.length > 0) {
            // Remove duplicates from bestMatches
            const uniqueBestMatches = Array.from(new Set(bestMatches));

            // If there are matches, return them as suggestions
            return res.status(200).json({
                success: true,
                suggestions: uniqueBestMatches,
                artistNames: Array.from(new Set(artistNames)) // Ensure artistNames are unique
            });
        } else {
            // If no close matches, perform a normal search
            let artists = await artistModel.find({
                artist_names: new RegExp(searchQuery, "i") // Case-insensitive search
            })
            .skip(startIndex)
            .limit(limit);

            const totalArtists = await artistModel.countDocuments({
                artist_names: new RegExp(searchQuery, "i")
            });
            const totalPages = Math.ceil(totalArtists / limit);

            // Collect unique artist names
            const uniqueArtistNames = Array.from(new Set(artists.map(artist => artist.artist_names)));

            res.status(200).json({
                success: true,
                page: page,
                totalPages: totalPages,
                totalArtists: totalArtists,
                artists: artists, // Include the artist objects with full details
                artistNames: uniqueArtistNames // Return only unique names of the artists
            });

            console.log(`Search query: ${searchQuery}, Returned records: ${artists.length}`);
        }

    } catch (error) {
        res.status(400).json({ success: false, message: "Server error, please try later" });
        console.log("Error occurred: ", error);
    }
});

export default router;