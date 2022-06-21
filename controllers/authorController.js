const async = require("async");

const Book = require("../models/book");
const Author = require("../models/author");

// Display list of all Authors.
exports.author_list = function (req, res, next) {
  Author.find()
    .sort([["family_name", "ascending"]])
    // eslint-disable-next-line consistent-return
    .exec((err, listAuthors) => {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("author_list", {
        title: "Author List",
        author_list: listAuthors,
      });
    });
};

// Display detail page for a specific Author.
exports.author_detail = function (req, res, next) {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback);
      },
    },
    // eslint-disable-next-line consistent-return
    (err, results) => {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.author == null) {
        // No results.
        const error = new Error("Author not found");
        error.status = 404;
        return next(error);
      }
      // Successful, so render.
      res.render("author_detail", {
        title: "Author Detail",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );
};

// Display Author create form on GET.
exports.author_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
exports.author_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
exports.author_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.author_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.author_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};
