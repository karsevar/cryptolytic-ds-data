const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const liveDataRoute = require("../routes/liveDataRoute.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use("/liveDataRoute", liveDataRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world from base server" });
});

module.exports = server;
