const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();

app.use(express.static('client'));

MongoClient.connect(process.env.MONGO_CONNECT, { useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log("FAILED TO CONNECT: " + err);
    //Connect to our cluster
    db = database.db('Cluster0');

    app.listen(8080, () => {
        console.log("Server running on localhost:8080");
    });

});

app.get('/a/getTest', (req,res) => {
    let test = "This is a test";
    res.json(test);
    console.log('Test string');
});

app.get('/', (req,res) => {
    res.send('Hello World!')
});
