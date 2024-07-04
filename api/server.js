const express = require("express");
const usersRouter = require("./users/users-router.js");
const { logger } = require("./middleware/middleware.js");
const rateLimit = require("express-rate-limit");

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

// Create a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

//  apply to all requests
server.use(limiter);
server.use(express.json());
server.use(logger);

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
