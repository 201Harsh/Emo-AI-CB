const router = require("express").Router();
const UserController = require("../controllers/user.contoller");
const { body } = require("express-validator");
const UserMiddleware = require("../middlewares/user.middleware");

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  UserController.registeUser
);

router.post(
  "/verify",
  [body("email").isEmail().withMessage("Invalid email")],
  UserController.verifyUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  UserController.loginUser
);

router.get("/logout", UserMiddleware.AuthUser, UserController.logoutUser);

router.get("/getUser", UserMiddleware.AuthUser, UserController.getUser);

router.post(
  "/resendotp",
  [body("email").isEmail().withMessage("Invalid email")],
  UserController.resendOtp
);

module.exports = router;
