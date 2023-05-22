/* eslint-disable max-len */
const { logger, serverTimestamp } = require("../middleware");
// eslint-disable-next-line no-async-promise-executor
module.exports = (snapshot, context) =>
    new Promise(async (resolve, reject) => {
        try {
            await snapshot.ref.set({ createdOn: serverTimestamp.timestamp, updatedOn: serverTimestamp.timestamp }, { merge: true });

            logger.info("[ appendTimestamp ]: Timestamp appended!!");

            return resolve();
        } catch (e) {
            logger.error("[ appendTimestamp ]:", e);
            // eslint-disable-next-line prefer-promise-reject-errors          
            return reject();
        }
    });
