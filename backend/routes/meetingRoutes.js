const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");

// Create a new meeting
router.post("/create-meeting", meetingController.createMeeting);
router.get("/get-user-meeting/:email", meetingController.getUserMeetings);

// Optional: Get all meetings of a user
// router.get("/user/:userId", meetingController.getUserMeetings);

module.exports = router;
