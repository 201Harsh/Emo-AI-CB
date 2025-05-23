const mongoose = require("mongoose");

const TempuserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
});

TempuserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 300 });

const Tempuser = mongoose.model("Tempuser", TempuserSchema);
module.exports = Tempuser;
