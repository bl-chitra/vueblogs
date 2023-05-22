const firebase = require("firebase-admin/firestore");
const timestamp = firebase.FieldValue.serverTimestamp();

module.exports = { timestamp };
