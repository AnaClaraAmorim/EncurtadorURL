const crypto = require('crypto');
const Link = require('../models/link');
const HttpError = require('../utils/HttpError');

module.exports.createShortLink = async function(originalUrl, alias, singleUse = false, expiresIn = null) {
    let expiresAt = null;
  
    if (expiresIn) {
        expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);
    }
    
    let shortUrl = alias;

    if (!originalUrl || originalUrl.trim() === '') {
        throw new HttpError("URL_NOT_FOUND");
    }
    
    if (alias) {
        const existingLink = await Link.findOne({ shortUrl: alias });
        if (existingLink) {
            throw new HttpError("ALIAS_ALREADY_EXISTS");
        }
        else if (alias.length < 4 || alias.length > 10) {
            throw new HttpError("ALIAS_WRONG_LENGTH");
        }
    } else {
        do {
            shortUrl = crypto.randomBytes(5).toString('hex').substring(0, 5);
        } while (await Link.findOne({ shortUrl }));
    }

    const newLink = new Link({
        originalUrl,
        shortUrl,
        singleUse,
        expiresAt
    });

    await newLink.save();

    return newLink;
};