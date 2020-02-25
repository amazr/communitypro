const express = require('express');
const userModel = require('./models/user');
const reservationModel = require('./models/reservation');
const app = express();

app.get('/', (req,res) => {
    res.send('Listening...');
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
            }
        }
        res.send(state);
    });

});

app.post('/logout', (req,res) => {
    let success = false;
    res.send(success);
});

app.post('/loggedin', (req,res) => {
    let status = false;
    res.send(status);
});

app.post('/availability', (req,res) => {
    //req.body.room
    //req.body.date
    let response = {
        times: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        message: ""
    };

    reservationModel.find({
        room: req.body.room,
        reservedDate: req.body.date
    },
    (err, reservations) => {
        if (err) response.message = err;
        else if (reservations.length === 0) response.message = "Room has nothing reserved this day";
        else {
            reservations.forEach((reservation) => {
                let index = response.times.indexOf(reservation.timeStart);
                response.times.splice(index, 1);
            });
            response.message = ("Success: Found " + reservations.length + " reservations on this date");
        }
        res.send(response);
    });
});

app.post('/reserve', (req,res) => {

    let reservation = new reservationModel(req.body);
    reservatoin.bookedDate = Date.now();

    reservation.save((err) => {
        if (err) res.send(err);
        else res.send(reservation);
      });
});

module.exports = app