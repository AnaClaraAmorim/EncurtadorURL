const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const HttpError = require("./utils/HttpError");


mongoose.connect("mongodb://mongo:27017/mydb");

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    console.error(error);
    res.status(500).json({ message: "An unexpected error occurred. " + error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
