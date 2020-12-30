const express = require("express");
const router = express.Router();
const UsersController = require("../controller/registerController");
router.post("/", UsersController.register);
module.exports = router;