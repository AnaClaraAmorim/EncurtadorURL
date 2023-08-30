const basicAuth = require("express-basic-auth");

const authenticate = basicAuth({
  users: { admin: "supersecret" },
  unauthorizedResponse: { error: "Unauthorized" },
});

module.exports = authenticate;
