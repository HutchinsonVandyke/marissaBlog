const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true},
  description: {type: String, required: true},
  images: [
    {
      type: String,
      required: false
    }
  ],
  playlist: {type: String, required: false},
  text: {type: String, required: false},
  isPhotography: {type: Boolean, required: true},
  isWriting: {type: Boolean, required: true},
  isPlaylist: {type: Boolean, required: true},
  isOther: {type: Boolean, required: true}

});

exports.Model = mongoose.model("work", Schema, "work");
