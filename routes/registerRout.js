const express = require("express");
const router = express.Router();
const UsersController = require("../controller/registerController");
router.post("/", UsersController.register);
router.put("/updateRegister",UsersController.updateRegister)
router.delete("/deleteRegister",UsersController.deleteRegister);
router.get("/getProfile",UsersController.getProfile);
module.exports = router;