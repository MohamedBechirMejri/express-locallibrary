/* eslint-disable func-names */
/* eslint-disable consistent-return */
const async = require("async");
const { body, validationResult } = require("express-validator");

const Genre = require("../models/genre");
const Book = require("../models/book");

// Display list of all Genre.
exports.genre_list = (req, res) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec((err, genres) => {
      // Successful, so render
      res.render("genre_list", {
        title: "Genre List",
        genre_list: genres,
      });
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    // eslint-disable-next-line consistent-return
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        const error = new Error("Genre not found");
        error.status = 404;
        return next(error);
      }
      // Successful, so render
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res, next) {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec((err, foundGenre) => {
        if (err) {
          return next(err);
        }

        if (foundGenre) {
          // Genre exists, redirect to its detail page.
          res.redirect(foundGenre.url);
        } else {
          genre.save(errr => {
            if (errr) {
              return next(errr);
            }
            // Genre saved. Redirect to genre detail page.
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genres_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        res.redirect("/catalog/genres");
      }
      // Successful, so render.
      res.render("genre_delete", {
        title: "Delete Genre",
        genre: results.genre,
        genre_books: results.genres_books,
      });
    }
  );
};

// Handle Genre delete on POST.
exports.genre_delete_post = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.body.genreid).exec(callback);
      },
      genres_books(callback) {
        Book.find({ genre: req.body.genreid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.genres_books.length > 0) {
        // Genre has books. Render in same way as for GET route.
        res.render("genre_delete", {
          title: "Delete Genre",
          genre: results.genre,
          genre_books: results.genres_books,
        });
      } else {
        // Genre has no books. Delete object and redirect to the list of genres.
        Genre.findByIdAndRemove(req.body.genreid, errr => {
          if (errr) {
            return next(errr);
          }
          // Success - go to genre list
          res.redirect("/catalog/genres");
        });
      }
    }
  );
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res, next) {
  Genre.findById(req.params.id, (err, genre) => {
    if (err) {
      return next(err);
    }
    if (genre == null) {
      // No results.
      const errr = new Error("Genre not found");
      errr.status = 404;
      return next(errr);
    }
    // Success.
    res.render("genre_form", { title: "Update Genre", genre });
  });
};

// Handle Genre update on POST.
exports.genre_update_post = [
  // Validate and sanitze the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request .
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("genre_form", {
        title: "Update Genre",
        genre,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Update the record.
      Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, thegenre) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to genre detail page.
        res.redirect(thegenre.url);
      });
    }
  },
];
