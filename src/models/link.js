const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  expiresAt: {
    type: Date,
    default: null,
  },
  singleUse: Boolean,
  queryParams: Object,
  used: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Link", linkSchema);
