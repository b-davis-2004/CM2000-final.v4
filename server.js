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

//404 route
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404 - Page Not Found" }); // redner 404.ejs in case of 404 status
});


// Start server
app.listen(8080);
console.log("Server running at codio box URL. https://jamesllama-mysteryvega-8080.codio.io/");