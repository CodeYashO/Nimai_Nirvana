const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Meeting = require("../models/meetingModel");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("../utils/emailService");

// Create a new meeting and associate it with a user
exports.createMeeting = async (req, res) => {
    console.log(req.body)
  try {
    const { email, BookedDate , appointmentTime } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a meeting already exists for this email (since email is unique in meeting)
    // const existingMeeting = await Meeting.findOne({ email });
    // if (existingMeeting.status === false) {
    //   return res.status(400).json({ message: "Meeting already exists for this email" });
    // }

    // Create the meeting
    const newMeeting = new Meeting({
      email,
      BookedDate,
      appointmentTime,
      status : false,
    });

    const savedMeeting = await newMeeting.save();

    // Push meeting ID into user's meetings array
    user.meetings.push(savedMeeting._id); 
    await user.save();
 
    res.status(201).json({
      message: "Meeting created successfully",
      meeting: savedMeeting,
    });

    await sendEmail(email, "Meeting Successfully Registered", `Your Link is: https://meet.google.com/vwf-pmyp-qvj`);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUserMeetings = async (req, res) => {
    console.log(req.params)
    try {
      const email = req.params.email;
  
      const user = await User.findOne({email}).populate("meetings");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Meetings fetched successfully",
        meetings: user.meetings,
      });
    } catch (err) {
      console.error("Fetch Meetings Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };