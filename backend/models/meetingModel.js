const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    email: { type: String, required: true},
    BookedDate: { type: String, required: true },
    appointmentTime : {type : String , required :  true},
    status: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
         