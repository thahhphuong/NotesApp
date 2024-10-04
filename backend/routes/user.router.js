const express = require('express')
const router = express.Router()
const userController = require("../controller/user.controller")
const { authenticateToken, verifyRefreshToken } = require('../untils/jwt')

router.get("/information", authenticateToken, userController.getInformation)
router.post("/register", authenticateToken, userController.register)
router.post("/login", userController.login)
router.delete("/logout", authenticateToken, userController.login)
router.post("/refresh-token", userController.refreshToken)


module.exports = router


