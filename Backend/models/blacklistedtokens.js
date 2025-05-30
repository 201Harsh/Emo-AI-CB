const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

blackListedTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const BlackListedToken = mongoose.model(
  "BlackListedToken",
  blackListedTokenSchema
);

module.exports = BlackListedToken;