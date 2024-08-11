import Typesense from "typesense";

// Initialize Typesense client
const client = new Typesense.Client({
  nodes: [
    {
      host: import.meta.env.VITE_TYPESENSE_NODES,
      port: Number(import.meta.env.VITE_TYPESENSE_PORT), // Ensure the port is a number
      protocol: "https", // Use https since it's provided by Typesense Cloud
    },
  ],
  apiKey: import.meta.env.VITE_TYPESENSE_API_KEY, // Use the Search Only API Key
  connectionTimeoutSeconds: 2,
});

export default client;
