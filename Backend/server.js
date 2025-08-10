const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

server.listen(port, host, () => {
});
