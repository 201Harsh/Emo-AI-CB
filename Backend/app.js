const express = require("express");
const UserRouter = require("./routes/user.route");

const DbConnection = require("./config/db");
DbConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);

module.exports = app;
