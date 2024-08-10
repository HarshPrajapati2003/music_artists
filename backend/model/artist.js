import mongoose from "mongoose";
const artistSchema = new mongoose.Schema(
  {
    artist_names: {
      type: String,
      trim: true, // Removes any whitespace
      unique: true, // Ensures artist names are unique
      required: true,
    },
    artist_genre: {
      type: String,
      required: true,
    },
    artist_img: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/gm.test(v); //  URL validation
        },
        message: "Invalid URL format for artist image",
      },
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const artistModel = mongoose.model("artist", artistSchema);

export default artistModel;
