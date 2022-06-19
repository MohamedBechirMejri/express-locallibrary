const express = require("express");

const router = express.Router();

// Require controller modules.
const bookController = require("../controllers/bookController");
const authorController = require("../controllers/authorController");
const genreController = require("../controllers/genreController");
const bookInstanceController = require("../controllers/bookinstanceController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", bookController.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", bookController.bookCreate_get);

// POST request for creating Book.
router.post("/book/create", bookController.bookCreate_post);

// GET request to delete Book.
router.get("/book/:id/delete", bookController.book_delete_get);

// POST request to delete Book.
router.post("/book/:id/delete", bookController.book_delete_post);

// GET request to update Book.
router.get("/book/:id/update", bookController.book_update_get);

// POST request to update Book.
router.post("/book/:id/update", bookController.book_update_post);

// GET request for one Book.
router.get("/book/:id", bookController.book_detail);

// GET request for list of all Book items.
router.get("/books", bookController.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", authorController.authorCreate_get);

// POST request for creating Author.
router.post("/author/create", authorController.authorCreate_post);

// GET request to delete Author.
router.get("/author/:id/delete", authorController.author_delete_get);

// POST request to delete Author.
router.post("/author/:id/delete", authorController.author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", authorController.author_update_get);

// POST request to update Author.
router.post("/author/:id/update", authorController.author_update_post);

// GET request for one Author.
router.get("/author/:id", authorController.author_detail);

// GET request for list of all Authors.
router.get("/authors", authorController.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genreController.genreCreate_get);

// POST request for creating Genre.
router.post("/genre/create", genreController.genreCreate_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genreController.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genreController.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genreController.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genreController.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genreController.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genreController.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  "/bookinstance/create",
  bookInstanceController.bookinstanceCreate_get
);

// POST request for creating BookInstance.
router.post(
  "/bookinstance/create",
  bookInstanceController.bookinstanceCreate_post
);

// GET request to delete BookInstance.
router.get(
  "/bookinstance/:id/delete",
  bookInstanceController.bookinstance_delete_get
);

// POST request to delete BookInstance.
router.post(
  "/bookinstance/:id/delete",
  bookInstanceController.bookinstance_delete_post
);

// GET request to update BookInstance.
router.get(
  "/bookinstance/:id/update",
  bookInstanceController.bookinstance_update_get
);

// POST request to update BookInstance.
router.post(
  "/bookinstance/:id/update",
  bookInstanceController.bookinstance_update_post
);

// GET request for one BookInstance.
router.get("/bookinstance/:id", bookInstanceController.bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/bookinstances", bookInstanceController.bookinstance_list);

module.exports = router;
