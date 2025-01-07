const B2 = require('backblaze-b2');

const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    applicationKey: process.env.BACKBLAZE_APP_KEY,
});

(async () => {
    try {
        await b2.authorize();
        console.log('Connected to Backblaze B2 successfully');
    } catch (err) {
        console.error('Error connecting to Backblaze B2:', err.message);
    }
})();

module.exports = b2;