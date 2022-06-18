const mongoose = require("mongoose");

const BookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  imprint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line func-names
BookInstanceSchema.virtual("url").get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
