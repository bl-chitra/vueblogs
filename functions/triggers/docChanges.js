/* eslint-disable max-len */
const { logger, serverTimestamp } = require("../middleware");
// eslint-disable-next-line no-async-promise-executor
module.exports = (change, context) =>
    new Promise(async (resolve, reject) => {
        try {
            const document = change.after.exists ? change.after.data() : null;
            const oldDocument = change.before.data();

            // logger.log("oldDocument: "+oldDocument);
            // logger.log("document: "+document);

            if (!oldDocument) {
                logger.log("[ docChanges ]: The document is created for the first time!!");
            } else if (!document) {
                logger.log("[ docChanges ]: The document is deleted!");
            } else if (!(oldDocument.updatedOn)) {
                logger.log("[ docChanges ]: Triggered as createdOn & updatedOn is set for the first time!!");
            } else if (oldDocument.updatedOn.isEqual(document.updatedOn)) {
                logger.log("[ docChanges ]: The document is updated!!");

                await change.after.ref.set({ updatedOn: serverTimestamp.timestamp }, { merge: true });
            } else {
                logger.log("[ docChanges ]: Triggered due to change in updatedOn field!!")
            }

            return resolve();
        } catch (e) {
            logger.error("[ docChanges ]: ", e);
            // eslint-disable-next-line prefer-promise-reject-errors        
            return reject();
        }
    });
