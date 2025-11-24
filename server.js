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

//add a 404 route
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});
// or seperate contact nav into its own page to better fit rubric criteria


// Start server
//port changed from 8080 to 3000 to resolve overloaded port error on codio
app.listen(3000);
console.log("Server running at codio box URL. https://jamesllama-mysteryvega-3000.codio.io/");
