const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  summary: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
});

// eslint-disable-next-line func-names
BookSchema.virtual("url").get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);
