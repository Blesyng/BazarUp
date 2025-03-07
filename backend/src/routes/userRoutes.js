const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

const { register, login } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
