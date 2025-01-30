const express = require('express');
const {
  adminSignup,
  verifyAdminOTP,
  forgotAdminPassword,
  resetAdminPassword,
  adminlogin,
} = require('../controllers/adminController');

const router = express.Router();

router.post('/signup', adminSignup);
router.post('/verify-email', verifyAdminOTP);
router.post('/login', adminlogin);
router.post('/forgot-password', forgotAdminPassword);
router.post('/reset-password/:resetToken', resetAdminPassword);

module.exports = router;
