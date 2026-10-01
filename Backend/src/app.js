const express = require("express");
const cors = require("cors");
const app = express();
//middleware that connect frontend
app.use(cors({ 
    origin: true
 }
));

// JSON request body read karne ke liye
app.use(express.json());

app.get("/", (req, res) => {
  console.log("ai run");
  res.send("AI-Chat is running");
});

module.exports = app;
