const router = require("express").Router();
const UserController = require("../controllers/user.contoller");
const { body } = require("express-validator");

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

module.exports = router;
