const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Using an absolute path to resolve / Get error with unstable workspace
app.use(express.static(path.resolve(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
