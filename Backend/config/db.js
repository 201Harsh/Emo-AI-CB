const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDb connected...");
    })
    .catch((error) => {
      console.log("MongoDb not connected");
    });
};

module.exports = connectDb;