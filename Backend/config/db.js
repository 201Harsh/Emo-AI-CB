const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
    })
    .catch((error) => {
    });
};

module.exports = connectDb;