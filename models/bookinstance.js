const { DateTime } = require("luxon");
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

BookInstanceSchema.virtual("url").get(
  () =>
    // eslint-disable-next-line no-underscore-dangle
    `/catalog/bookinstance/${this._id}`
);

BookInstanceSchema.virtual("due_back_formatted").get(() =>
  DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
);

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
