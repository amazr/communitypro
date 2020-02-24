const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const routes = require('./routes');
require('dotenv').config();
var cors = require("cors");

const app = express();

mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());
app.use(express.json());
app.use(express.static('client'));
app.use(routes);

app.listen(8080, () => {
    console.log("Server running on localhost:8080");
});