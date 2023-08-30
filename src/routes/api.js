const express = require("express");
const router = express.Router();
const linkFactory = require("../factories/linkFactory");
const Link = require("../models/link");
const Log = require("../models/log");
const authentication = require("../middlewares/authentication");
const { mergeQueryParameters } = require("../utils/urlUtils");
const HttpError = require("../utils/HttpError");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "YOUR_SECRET_KEY";

router.post("/create", authentication, async (req, res, next) => {
  const { originalUrl, alias, singleUse, expiresIn } = req.body;

  try {
    const shortLink = await linkFactory.createShortLink(
      originalUrl,
      alias,
      singleUse,
      expiresIn
    );

    const token = jwt.sign({ uniqueLinkID: shortLink.shortUrl }, JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ shortUrl: shortLink.shortUrl, token: token });
  } catch (error) {
    next(error);
  }
});

router.get("/:shortUrl", async (req, res, next) => {
  try {
    const shortUrl = req.params.shortUrl;
    const link = await Link.findOne({ shortUrl });

    if (!link) {
        throw new HttpError("LINK_NOT_FOUND");
    }

    if (link.expiresAt && new Date() > link.expiresAt) {
        throw new HttpError("LINK_EXPIRED");
    }

    if (link.singleUse && link.used) {
        throw new HttpError("LINK_USED");
    }

    const log = new Log({
        ip: req.ip,
        originalUrl: link.originalUrl,
        shortUrl,
        queryParams: req.query,
    });
    await log.save();

    if (link.singleUse) {
        link.used = true;
        await link.save();
    }

    const combinedUrl = mergeQueryParameters(link.originalUrl, req.query);

    res.redirect(combinedUrl);
  } catch (error) {
    next(error);
  }
});

router.delete("/:shortUrl", async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new HttpError("INVALID_TOKEN");
    }

    if (decodedToken.uniqueLinkID !== req.params.shortUrl) {
      throw new HttpError("UNAUTHORIZED_TO_DELETE");
    }

    const linkToDelete = await Link.findOne({ shortUrl: req.params.shortUrl });

    if (!linkToDelete) {
      throw new HttpError("LINK_NOT_FOUND");
    }

    await Link.deleteOne({ _id: linkToDelete._id });
    res.status(200).send("Link deleted successfully");
  } catch (error) {
    next(error);
  }
});

router.get("/:shortUrl/logs", authentication, async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const link = await Link.findOne({ shortUrl });
    if (!link) {
      throw new HttpError("LINK_NOT_FOUND");
    }

    const logs = await Log.find({ shortUrl });

    res.json(logs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
