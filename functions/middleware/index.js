const { logger } = require("firebase-functions");
const firebase = require("./firebase");

exports.logger = logger;
exports.firebase = firebase;
exports.serverTimestamp = require("./timestamp");
