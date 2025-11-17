const express = require("express");
const path = require("path");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files if needed
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.render("main", { title: "Final" }); // render main.ejs
});

// Start server
app.listen(8080);
console.log("Server running at codio box URL");
