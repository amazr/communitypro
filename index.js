const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const session = require('express-session')
const routes = require('./routes');
require('dotenv').config();
const cors = require("cors");
const MongoStore = require('connect-mongodb-session')(session);

const app = express();

//Connecting mongoose
mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Connecting mongo for sessions
app.use(session({
    store:  new MongoStore({
        uri:process.env.MONGO_CONNECT,
        collection:"sessions"
    }),
    secret:'random key thing',
    resave:true,
    saveUninitialized:true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
}));

app.use(cors());
app.use(express.json());
app.use(express.static('client'));
app.use(routes);

app.listen(8080, () => {
    console.log("Server running on localhost:8080");
});