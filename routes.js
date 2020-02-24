const express = require('express');
const userModel = require('./models/user');
const reservationModel = require('./models/reservation');
const app = express();


//GETS
app.get('/a/getTest', (req,res) => {
    let test = "This is a test";
    res.json(test);
    console.log('Test string');
});

app.get('/', (req,res) => {
    res.send('Hello World!')
});

app.get('/users', async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POSTS
app.post('/login', (req,res) => {
    console.log("Logging in...");
    let state = {
        isLoggedIn: false,
        username: "",
        message: ""
    };

    userModel.findOne({
        username: req.body.username,
    },
    (err,person) => {
        if (err) state.message = err;
        else if (!person) state.message = "Username Not Found";
        else {
            if (person.password !== req.body.password) state.message = "Invalid Password";
            else {
                state.isLoggedIn = true;
                state.username = person.username;
                req.session.user = {
                    name: state.username
                };
                console.log("sessions set: " + req.session.user.name);
            }
        }
        res.send(state);
    });

});

app.post('/logout', (req,res) => {
    let success = false;
    if (req.session.user) {
        delete req.session.user;
        success = true;
    }
    console.log(success);
    res.send(success);
});

app.post('/loggedin', (req,res) => {
    let status = true;
    if (!req.session.user) status = false;
    res.send(status);
})

module.exports = app