import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import getArtists from "./routes/getArtists.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

// CORS configuration
app.use(cors());
app.use(express.json());

// routes
app.use("/api", getArtists);

// ----------------  Localhost --------------------

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ----------------  Localhost --------------------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
