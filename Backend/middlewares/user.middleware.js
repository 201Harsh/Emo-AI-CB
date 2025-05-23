const jwt = require("jsonwebtoken");

module.exports.AuthUser = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

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
