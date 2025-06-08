
const EmoAi = require('../config/EmoAI')


module.exports.genResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const response = await EmoAi(prompt);
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
