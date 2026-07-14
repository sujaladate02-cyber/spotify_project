const express = require('express')
const authController = require('../controllers/auth.controllers')
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware")

router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.post('/logout',authController.logoutUser)
router.get("/profile", authUser,authController.getProfile);

module.exports = router;