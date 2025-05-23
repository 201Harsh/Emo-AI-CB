const userModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");
const UserServices = require("../services/user.service");
const { validationResult } = require("express-validator");
const transporter = require("../services/Sendmail");

module.exports.registeUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    const NewTempUser = await UserServices.CreatTempUser({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    const info = await transporter.sendMail({
      from: "EmoAI",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    return res.status(200).json({
      message: "User created successfully",
      data: NewTempUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.verifyUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp } = req.body;

  try {
    const NewUser = await UserServices.VerifyUser({ email, otp });

    const token = NewUser.jwtToken();

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "User verified successfully",
      data: NewUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const User = await userModel.findOne({ email });

  if (!User) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordMatch = await User.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = User.jwtToken();

  res.cookie("token", token, {
    httpOnly: true,
  });

  return res.status(200).json({
    message: "User logged in successfully",
    data: User,
    token: token,
  });
};
