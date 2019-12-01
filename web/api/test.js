const fetch = require('node-fetch');
const admin = require("firebase-admin");
const uuid = require('uuid/v4')
const firebase = require("firebase");
const md5 = require('js-md5')

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET
    };

    firebase.initializeApp(config);

  // Get a reference to the database service
const database = firebase.database();


module.exports = async (req, res) => {
    const timestamp = new Date().toLocaleString("en-US", {timeZone: "America/Vancouver"});
    const date = new Date(timestamp).toLocaleDateString("en-US");

    const testData = async () => database.ref('/log').once('value').then(snapshot => snapshot.val());

    const emailHash = md5(req.body.email);
    const writeVisitorData = (date) => {
        firebase.database().ref(`log/${emailHash}`).set({
                timestamp: date,
                user: req.body ? req.body : "no user"
            }
        );
    }
    const data = await testData();
    const result = await writeVisitorData(date);
    res.json({ "Today": date, 'data': data, result: result })
}
