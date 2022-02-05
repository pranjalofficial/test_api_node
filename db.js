const firebase = require('firebase-admin');
const config = require('./config');

const db = firebase.initializeApp({
    credential: firebase.credential.cert(require('./keys/test1-d9d70-firebase-adminsdk-ei5tz-9ff4e0b940.json')),
});

module.exports = db;
