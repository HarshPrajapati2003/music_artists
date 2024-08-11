import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import getArtists from "./routes/getArtists.js";
import path from 'path'

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

// CORS configuration
app.use(cors());
app.use(express.json());

// routes
app.use("/api", getArtists);

// ======================= deployment ============================

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/dist")));
     app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"))
     });
} else {
    app.get("/", (req, res) => {
      res.send("api is running");
    });
}
  // ======================= deployment ============================

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
