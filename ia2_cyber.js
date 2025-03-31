const express = require("express");
const helmet = require("helmet");

const app = express();
const port = 3000;

// Use Helmet to set security headers
app.use(helmet());

// Middleware to parse JSON requests
app.use(express.json());

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

// API route to add a user (POST request)
app.post("/users", (req, res) => {
  const newUser = req.body;
  res.json({ message: "User added successfully!", user: newUser });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
