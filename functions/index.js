const functions = require("firebase-functions");

exports.appendTimestamp = functions.firestore
    .document("/blogPosts/{documentId}")
    .onCreate(require("./triggers/appendTimestamp"));

exports.docChanges = functions.firestore
    .document("/blogPosts/{documentId}")
    .onWrite(require("./triggers/docChanges"));