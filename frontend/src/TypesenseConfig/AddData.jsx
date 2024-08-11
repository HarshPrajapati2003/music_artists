import axios from "axios";


const addDocuments = async (documents) => {
  try {
    const response = await axios.post(
      `https://${import.meta.env.VITE_TYPESENSE_NODES}/collections/artists/documents/import`,
      documents,
      {
        headers: {
          "X-TYPESENSE-API-KEY": import.meta.env.VITE_TYPESENSE_ADMIN_API_KEY,
          "Content-Type": "text/plain",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error adding documents:", error);
  }
};

const documents = [
  {
    artist_names: "Artist 1",
    artist_genre: "Pop",
    country: "USA",
    artist_img: "image_url",
  },
  // Add more documents here
];

addDocuments(documents);
