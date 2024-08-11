import Typesense from "typesense";
import artists from "./data/data.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Configure Typesense
const TYPESENSE_CONFIG = {
  nodes: [
    {
      host: process.env.VITE_TYPESENSE_NODES, // For Typesense Cloud use xxx.a1.typesense.net
      port: "443", // For Typesense Cloud use 443
      protocol: "https", // For Typesense Cloud use https
    },
  ],
  apiKey: process.env.VITE_TYPESENSE_ADMIN_API_KEY,
};

// Create an instance of Typesense client
const typesense = new Typesense.Client(TYPESENSE_CONFIG);

// Build Schema
const schema = {
  name: "artists",
  fields: [
    {
      name: "id",
      type: "string",
      facet: false,
      optional: false,
    },
    {
      name: "artist_names",
      type: "string",
      facet: false,
      optional: false,
    },
    {
      name: "artist_genre",
      type: "string",
      facet: true,
      optional: false,
    },
    {
      name: "artist_img",
      type: "string",
      facet: false,
      optional: true,
    },
    {
      name: "country",
      type: "string",
      facet: true,
      optional: false,
    },
  ],
};

// Function to load data into Typesense
const loadData = async () => {
  // Check if the collection exists
  try {
    await typesense.collections("artists").retrieve();
    console.log("Found existing collection of artists");
  } catch (err) {
    console.error("Collection not found or error:", err);
  }

  // Create Artist schema if it does not already exist
  try {
    await typesense.collections().create(schema);
    console.log("Creating schema...");
  } catch (err) {
    if (err.httpStatus === 409) {
      console.log("Collection already exists. Skipping schema creation.");
    } else {
      console.error("Error creating schema:", err);
    }
  }

//   Upload artists to Typesense Database
  try {
    const returnData = await typesense
      .collections("artists")
      .documents()
      .import(artists);
    console.log("Artists imported successfully:", returnData);
  } catch (err) {
    console.error("Error importing artists:", err);
  }
};

// Export the function to be used elsewhere if needed
export default loadData;

// Execute the function
// loadData();

// Function to search for documents
const getDocuments = async () => {
  try {
    const searchResults = await typesense
      .collections("artists")
      .documents()
      .search({
        q: "*", // Query for all documents
        query_by: "artist_names", // Specify fields to query
      });
    console.log(
      "Documents:",
      searchResults.hits.map((hit) => hit.document)
    );
  } catch (err) {
    console.error("Error retrieving documents:", err);
  }
};

getDocuments();

const deleteCollection = async () => {
  try {
    await typesense.collections("artists").delete();

    console.log("Collection deleted.");
  } catch (err) {
    console.error("Error deleting collection:", err);
  }
};

// deleteCollection();