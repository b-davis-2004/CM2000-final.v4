/*import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("main", { title: "Baby Prep Inventory" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/


// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all files in the current folder (HTML, JS, images)
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
