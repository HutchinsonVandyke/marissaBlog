const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  imageName: { type: String, 
                default: "none",
                required: true },
  imageData: { type: String, required: true }
});

exports.Model = mongoose.model("image", Schema, "image");