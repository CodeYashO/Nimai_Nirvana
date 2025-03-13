const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role : {type : String , default : "user"},
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    payment : {type : Boolean , default : false},
    otpExpiry: { type: Date },
    token : String,
    expiresAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
