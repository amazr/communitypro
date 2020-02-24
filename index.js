const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
require('dotenv').config();
const cors = require("cors");

const app = express();

//Connecting mongoose
mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const routes = require('./routes');
app.use(cors());
app.use(express.json());
app.use(express.static('client'));
app.use(routes);

app.listen(8080, () => {
    console.log("Server running on localhost:8080");
});