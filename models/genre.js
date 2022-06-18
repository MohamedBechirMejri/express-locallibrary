const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 3,
  },
});

// eslint-disable-next-line func-names
GenreSchema.virtual("url").get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);
