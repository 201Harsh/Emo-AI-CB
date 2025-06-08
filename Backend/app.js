const express = require("express");
const UserRouter = require("./routes/user.route");
const AIRouter = require("./routes/ai.route");

const DbConnection = require("./config/db");
DbConnection();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/users", UserRouter);
app.use("/ai", AIRouter);



module.exports = app;
