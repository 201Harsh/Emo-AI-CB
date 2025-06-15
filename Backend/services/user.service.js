const userModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");

module.exports.CreatTempUser = async ({ name, email, password, otp }) => {
  if (!name || !email || !password || !otp) {
    throw new Error("All fields are required");
  }

  const NewTempUser = TempUserModel.create({
    name,
    email,
    password,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000,
  });
  return NewTempUser;
};

module.exports.VerifyUser = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new Error("All fields are required");
  }

  const User = await TempUserModel.findOne({ email });
  if (!User) {
    throw new Error("User not found");
  }

  if (User.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (User.otpExpiry < Date.now()) {
    throw new Error("OTP has expired");
  }

  const NewUser = await userModel.create({
    name: User.name,
    email: User.email,
    password: User.password,
  });
  await User.deleteOne();
  return NewUser;
};

module.exports.CreateUserInfo = async ({
  id,
  age,
  gender,
  AICompanion,
}) => {
  if (!age || !gender || !AICompanion) {
    throw new Error("All fields are required");
  }

  const userDetails = await userModel.findByIdAndUpdate(
    { _id: id },
    {
      age,
      gender,
      AICompanion,
    }
  );

  return userDetails;
};
