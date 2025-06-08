const EmoAi = require("../config/EmoAI");
const userModel = require("../models/user.model");

module.exports.genResponse = async (req, res) => {
  try {
    const USerId = req.user;

    const User = await userModel.findById(USerId.id);

    if (!User) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const response = await EmoAi(prompt, User);
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
