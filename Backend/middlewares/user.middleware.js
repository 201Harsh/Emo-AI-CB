const jwt = require("jsonwebtoken");
const BlackListedToken = require("../models/blacklistedtokens");

module.exports.AuthUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  const blacklistedToken = await BlackListedToken.findOne({ token });

  if (blacklistedToken) {
    return res.status(401).json({
      message: "Token Expired",
    });
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = decoded;

  next();
};
