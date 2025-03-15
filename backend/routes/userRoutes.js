const express = require("express");
const { signup, verifyEmail, login, forgotPassword, resetPassword , verifyToken} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.get("/verify-token" , verifyToken);

module.exports = router;
 