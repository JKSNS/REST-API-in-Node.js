/*

This file is for initializing passport.
Some of this file is provided for you.
Read this file and try to understand what
is happening.

*/

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { getOrCreateUser } = require('./util'); // Import the getOrCreateUser method from util/index.js

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    try {
        done(null, user);
    } catch (error) {
        console.error(error);
        done(error.message);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Use the client secret from .env file
    callbackURL: `${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}` // Use callback URL from .env file
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            // Use the getOrCreateUser method to get or create the user from the database
            let user = await getOrCreateUser(profile); // Replace this with appropriate arguments
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));

const initStore = session => {
    const MongoDbStore = require(`connect-mongodb-session`)(session);
    const store = new MongoDbStore({
        uri: process.env.ATLAS_CONNECTION_STRING,
        collection: `Sessions`,
    }, err => {
        if (err) console.error(err);
        else console.log(`Session Store Initialized`);
    });
    store.on(`error`, console.error);
    return store;
};

module.exports = initStore;
