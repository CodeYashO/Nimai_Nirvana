const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("../utils/emailService");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.signup = async (req, res) => {
  console.log(req.body)
  try {
    const { name, email, phone, password , role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      otp,
      otpExpiry,
    });
    await user.save();

    await sendEmail(email, "Email Verification", `Your OTP is: ${otp}`);

    res.status(201).json({
      message: "User registered successfully. Check your email for OTP.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user.", error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    console.log(req.body)
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid OTP or OTP expired." });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save(); 

    const token = jwt.sign(
      { userId: user._id , role : user.role},
      process.env.JWT_SECRET ,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ token, user, message: "Email Verified Successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password , role} = req.body;

 
    const user = await User.findOne({ email , role});
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!user.isVerified)
      return res.status(403).json({ message: "Email not verified." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id , role : user.role}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in.", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    // Create Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // console.log(resetToken);

    // hash the token
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    console.log(user.resetPasswordToken);
    user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 1 day

    await user.save();

    // Send Email
    const resetUrl = `${req.protocol}://localhost:3000/reset-password/${user.resetPasswordToken}`;
    const message = `Reset your password by clicking on the following link: ${resetUrl}`;
    await sendEmail(email, "Password Reset", message);

    res.status(200).json({ message: "Reset password email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    // Find user by token and ensure token is not expired
    const user = await User.findOne({
      resetPasswordToken: resetToken, // token in hashed format
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    // console.log(user.password);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
