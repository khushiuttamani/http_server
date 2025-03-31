const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

// Load SSL Certificates (Self-signed or from a CA)
const options = {
  key: fs.readFileSync("server.key"), // Private key
  cert: fs.readFileSync("server.cert"), // Certificate
};

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Secure Node.js Web Service!");
});

// API route to fetch user data
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "xyz" },
    { id: 2, name: "abc" },
  ];
  res.json(users);
});

// API route to add a user (POST request with input validation)
app.post(
  "/users",
  [
    body("name")
      .isString()
      .withMessage("Name must be a string")
      .trim()
      .escape(),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = req.body;
    res.json({ message: "User added successfully!", user: newUser });
  }
);

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Secure server running at https://localhost:${port}`);
});
