const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport'); // Import passport package
const { authenticate } = require('./util');
require('./mongoose');

const store = require('./passport')(session);

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth'); // Import the auth router
const tasksRouter = require('./routes/tasks'); // Import the tasks router

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use express-session middleware before initializing Passport.js
const sess = {
    name: 'it210_session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 604800000,
    },
    store
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.sameSite = 'none';
}

app.use(session(sess)); // Use express-session middleware

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/user', authenticate, userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', authenticate, tasksRouter); // Use the authenticate method before tasksRouter

module.exports = app;
