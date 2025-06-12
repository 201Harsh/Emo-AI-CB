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
      from: '"EMOAI" <noreply@emoai.com>',
      to: email,
      subject: "🔑 Your EMOAI Verification Code",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #e6e6e6; border-radius: 8px; overflow: hidden; border: 1px solid #3d3d3d;">
      <div style="background-color: #ffc107; padding: 20px; text-align: center;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 600;">EMO_AI Registration</h1>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #ffc107; margin-top: 0;">Verify Your Email Address</h2>
        <p>Thank you for registering with EMO_AI. To complete your registration, please enter the following One-Time Password (OTP) in the verification page:</p>
          <p style="color: #b3b3b3;">If you didn't request this code, please ignore this email or contact support.</p>
        <div style="background-color: #2a2a2a; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #b3b3b3;">Your verification code for Email ${email}:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ffc107; margin: 10px 0; text-align: center;">${otp}</div>
        </div>
        
        <p style="font-size: 14px; color: #b3b3b3;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email or contact support.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3d3d3d;">
          <p style="margin-bottom: 5px;">Need help?</p>
          <a href="mailto:support@emoai.com" style="color: #ffc107; text-decoration: none;">support@https://emoaichatbot.onrender.com</a>
        </div>
      </div>
      
      <div style="background-color: #2a2a2a; padding: 15px; text-align: center; font-size: 12px; color: #b3b3b3;">
        © ${new Date().getFullYear()} EMO_AI. All rights reserved.
      </div>
    </div>
  `,
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
      from: '"EMOAI" <noreply@emoai.com>',
      to: email,
      subject: "🔑 Your EMOAI Verification Code",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #e6e6e6; border-radius: 8px; overflow: hidden; border: 1px solid #3d3d3d;">
      <div style="background-color: #ffc107; padding: 20px; text-align: center;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 600;">EMO_AI Registration</h1>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #ffc107; margin-top: 0;">Verify Your Email Address</h2>
        <p>Thank you for registering with EMO_AI. To complete your registration, please enter the following One-Time Password (OTP) in the verification page:</p>
          <p style="color: #b3b3b3;">If you didn't request this code, please ignore this email or contact support.</p>
        <div style="background-color: #2a2a2a; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #b3b3b3;">Your verification code for Email ${email}:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ffc107; margin: 10px 0; text-align: center;">${otp}</div>
        </div>
        
        <p style="font-size: 14px; color: #b3b3b3;">This code will expire in 10 minutes. If you didn't request this code, please ignore this email or contact support.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3d3d3d;">
          <p style="margin-bottom: 5px;">Need help?</p>
          <a href="mailto:support@emoai.com" style="color: #ffc107; text-decoration: none;">support@https://emoaichatbot.onrender.com</a>
        </div>
      </div>
      
      <div style="background-color: #2a2a2a; padding: 15px; text-align: center; font-size: 12px; color: #b3b3b3;">
        © ${new Date().getFullYear()} EMO_AI. All rights reserved.
      </div>
    </div>
  `,
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
      message: "Welcome to EmoAI Server",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
