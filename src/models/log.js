const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  ip: String,
  originalUrl: String,
  shortUrl: String,
  queryParams: Object,
  accessedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
