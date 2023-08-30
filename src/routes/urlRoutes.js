const authenticate = require("../middlewares/auth");

router.post("/urls", authenticate, urlController.createShortUrl);
