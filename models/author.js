/* eslint-disable func-names */
const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  date_of_birth: Date,
  date_of_death: Date,
});

AuthorSchema.virtual("name").get(function () {
  return this.family_name && this.first_name
    ? `${this.family_name}, ${this.first_name}`
    : "";
});

AuthorSchema.virtual("lifespan").get(function () {
  return this.date_of_birth && this.date_of_death
    ? `${this.date_of_birth.getFullYear()} - ${this.date_of_death.getFullYear()}`
    : "";
});
AuthorSchema.virtual("url").get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan_formatted").get(function () {
  return this.date_of_birth && this.date_of_death
    ? `${this.date_of_birth.getFullYear()} - ${this.date_of_death.getFullYear()}`
    : "";
});

module.exports = mongoose.model("Author", AuthorSchema);
