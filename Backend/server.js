const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () => {
});
