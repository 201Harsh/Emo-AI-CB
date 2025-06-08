const userModel = require("../models/user.model");
const TempUserModel = require("../models/tempuser.model");
const UserServices = require("../services/user.service");
const { validationResult } = require("express-validator");
const transporter = require("../services/Sendmail");
const BlackListedToken = require("../models/blacklistedtokens");

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
  try {
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const User = await userModel.findOne({ email });

    if (!User) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatch = await User.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (token) {
      const blacklistedToken = await BlackListedToken.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = req.user;

    const User = await userModel.findById(user.id);

    return res.status(200).json({
      message: "User found successfully",
      data: User,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const isUser = await TempUserModel.findOne({ email });

    if (!isUser) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    const info = await transporter.sendMail({
      from: "EmoAI",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    const newOtp = await TempUserModel.findOneAndUpdate(
      { email },
      {
        otp: otp,
        otpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      msg: "OTP sent successfully",
      newOtp,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { age, gender, AICompanion, profilePic } = req.body;

    const userId = req.user;

    const User = await userModel.findById(userId.id);

    if (!User) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const userDeatils = await UserServices.CreateUserInfo({
      id: userId.id,
      age,
      gender,
      AICompanion,
      profilePic,
    });

    return res.status(200).json({
      message: "User details updated successfully",
      data: userDeatils,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.startServer = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Server started successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
