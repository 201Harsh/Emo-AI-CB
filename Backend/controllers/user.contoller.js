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
      from: '"EndSync" <support@endsync.com>',
      to: email,
      subject: `Your EndSync Verification Code for Email ${email}`,
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #2563eb;
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header img {
        height: 40px;
      }
      .content {
        padding: 30px;
        background-color: #f9fafb;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
      }
      .otp-container {
        margin: 25px 0;
        text-align: center;
      }
      .otp-code {
        display: inline-block;
        padding: 15px 25px;
        background-color: #ffffff;
        color: #2563eb;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 3px;
        border-radius: 6px;
        border: 1px dashed #2563eb;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      .footer {
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #6b7280;
        background-color: #f3f4f6;
        border-radius: 0 0 8px 8px;
        border-left: 1px solid #e5e7eb;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
      }
      .note {
        font-size: 14px;
        color: #6b7280;
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid #e5e7eb;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="https://via.placeholder.com/150x40/2563eb/ffffff?text=EndSync" alt="EndSync Logo">
    </div>
    
    <div class="content">
      <h2 style="margin-top: 0;">Verify Your Account</h2>
      <p>Thank you for choosing EndSync! To complete your account setup, please use the following One-Time Password (OTP) to verify your email address:</p>
      
      <div class="otp-container">
        <div class="otp-code">${otp}</div>
      </div>
      
      <p>This code will expire in <strong>10 minutes</strong>. For security reasons, please do not share this code with anyone.</p>
      
      <p style="text-align: center;">
        <a href="#" class="button">Verify My Account</a>
      </p>
      
      <div class="note">
        <p><strong>Note:</strong> If you didn't request this code, you can safely ignore this email. Someone might have entered your email address by mistake.</p>
      </div>
    </div>
    
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} EndSync. All rights reserved.</p>
      <p>
        <a href="#" style="color: #6b7280; text-decoration: none;">Privacy Policy</a> | 
        <a href="#" style="color: #6b7280; text-decoration: none;">Terms of Service</a> | 
        <a href="#" style="color: #6b7280; text-decoration: none;">Contact Us</a>
      </p>
      <p>EndSync, 123 Business Ave, San Francisco, CA 94107</p>
    </div>
  </body>
  </html>
  `,
    });

    const newOtp = await TempUserModel.findOneAndUpdate({ email }, { otp: otp });
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
