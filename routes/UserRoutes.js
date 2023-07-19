const router = require("express").Router();
const { addToLikedMovies } = require("../controllers/UserController");
const User = require("../models/User");
router.post("/add", addToLikedMovies);
module.exports = router;
