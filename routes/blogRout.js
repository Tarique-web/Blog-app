const express = require("express");
const router = express.Router();
const UsersController = require("../controller/blogController");
router.post("/", UsersController.blogPost);
module.exports = router;