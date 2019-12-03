const firebase = require("firebase");
const md5 = require('js-md5')
const uuid = require('uuid/v4')



const config = {
    apiKey: 'AIzaSyAt0nTeWiPB3ZHbmgJXIafSsEpllLNcz0A',
    authDomain: 'firebase-test.firebaseapp.com',
    databaseURL: 'https://fir-test-7f702.firebaseio.com/',
    storageBucket: 'fir-test-7f702.appspot.com.appspot.com'
    };

    firebase.initializeApp(config);

  // Get a reference to the database service
const database = firebase.database();

module.exports = async (req, res) => {

    if(req.body === null){
        console.log("no body")
        return;
    }

    const body = req.body
    
    const emailHash = body.email ? md5(body.email): null;
    const userSub = body.sub ? body.sub.split("|")[0] : null;
    const writeUserData = async () => {
        const timestamp = new Date().toLocaleString("en-US", {timeZone: "America/Vancouver"});
        const db = await database.ref(`users/${emailHash ? emailHash : uuid()}/${userSub ? userSub : uuid()}`).set({
                timestamp: timestamp,
                user: body
            }
        );
        const response = await db;
        return response
    }

    const data = await writeUserData();

    res.json({"Status": data})
}
