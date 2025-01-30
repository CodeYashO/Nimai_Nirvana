const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");
const crypto = require("crypto");

// Admin Signup
const adminSignup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry,
    });
    await sendEmail(email, otp);

    res
      .status(201)
      .json({ message: "Admin registered. Check your email for OTP." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error during signup.", error: err.message });
  }
};

// Verify Admin OTP
const verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email, otp });
    if (!admin || admin.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    admin.isVerified = true;
    admin.otp = null;
    admin.otpExpiry = null;
    await admin.save();

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res  
      .status(200)
      .json({ token, admin , message: "Email Verified Successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    if (!admin.isVerified)
      return res.status(403).json({ message: "Email not verified." });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in.", error: error.message });
  }
};

// Forgot Admin Password
const forgotAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "User not found." });
    // Create Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // console.log(resetToken);

    // hash the token
    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    console.log(admin.resetPasswordToken);
    admin.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 1 day

    await admin.save();

    // Send Email
    const resetUrl = `${req.protocol}://localhost:5000/api/auth/admin/reset-password/${admin.resetPasswordToken}`;
    const message = `Reset your password by clicking on the following link: ${resetUrl}`;
    await sendEmail(email, "Password Reset", message);

    res.status(200).json({ message: "Reset password email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset Admin Password
const resetAdminPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    // Find admin by token and ensure token is not expired
    const admin = await Admin.findOne({
      resetPasswordToken: resetToken, // token in hashed format
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!admin)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    // console.log(admin.password);
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  adminSignup,
  verifyAdminOTP,
  adminlogin,
  forgotAdminPassword,
  resetAdminPassword,
};
