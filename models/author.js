/* eslint-disable camelcase */
/* eslint-disable func-names */
const mongoose = require("mongoose");
const { DateTime } = require("luxon"); // for date handling

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

// AuthorSchema.virtual("lifespan").get(function () {
//   return this.date_of_birth && this.date_of_death
//     ? `${this.date_of_birth.getFullYear()} - ${this.date_of_death.getFullYear()}`
//     : "";
// });
AuthorSchema.virtual("url").get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/author/${this._id}`;
});
AuthorSchema.virtual("lifespan").get(function () {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifetime_string;
});

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Author", AuthorSchema);
