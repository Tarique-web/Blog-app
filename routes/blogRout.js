const express = require("express");
const router = express.Router();
const UsersController = require("../controller/blogController");
router.post("/", UsersController.blogPost);
router.put('/updateBlog/:id',UsersController.updateBlog);
router.delete("/deleteBlog/:id",UsersController.deleteBlog);
router.get("/getAllBlog",UsersController.getAllBlog);
router.get("/getBlog",UsersController.getBlog);
router.get("/getAllBlog/:id",UsersController.BlogbyId);

module.exports = router;