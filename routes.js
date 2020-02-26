const express = require('express');
const userModel = require('./models/user');
const reservationModel = require('./models/reservation');
const app = express();

app.get('/', (req,res) => {
    res.send('Service Online');
});

//POSTS
app.post('/login', (req,res) => {
    console.log("Logging in...");
    let state = {
        isLoggedIn: false,
        username: "",
        message: ""
    };
    console.log(state);

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
        else if (reservations.length === 0) response.message = "Location has nothing reserved this day";
        else {
            reservations.forEach((reservation) => {
                let index = response.times.indexOf(reservation.timeStart);
                response.times.splice(index, 1);
            });
            response.message = ("Found " + reservations.length + " other reservation(s) on this date");
        }
        res.send(response);
    });
});

app.post('/reserve', (req,res) => {

    let reservation = new reservationModel(req.body);
    reservation.bookedDate = Date.now();

    reservation.save((err) => {
        if (err) res.send(err);
        else res.send(reservation);
      });
});

app.post('/userReservations', (req,res) => {
    let response = {
        reservations: [],
        message: ""
    };

    reservationModel.find({
        name: req.body.name,
    },
    (err, reservations) => {
        if (err || reservations.length === 0) response.message = "No reservations found";
        else {
            response.reservations = reservations;
            response.message = "Successfully found all user reservations";
        }
        res.send(response);
    });
});

app.post('/cancelReservation', (req,res) => {
    let response = {
        message: ""
    };
    console.log("Deleting: " + req.body.id);
    reservationModel.deleteOne({
        _id: req.body.id
    },
    (err) => {
        if (err) response.message = "Failed to cancel reservation";
        else response.message = "Reservation successfully canceled";
        console.log("Was there an error?: " + err);
        console.log("Sending in response: " + JSON.stringify(response));
        res.send(response);
    });
});

app.post('/rent', (req,res) => {
    let response = {
        message: ""
    };

    reservationModel.updateOne({
        _id: req.body.id
    }, {
        chairs: req.body.chairs,
        signs: req.body.signs,
        catered: req.body.catered
    },
    (err) => {
        if (err) response.message = "Failed to add rental to reservation";
        else response.message = "Reservation successfully updated";
        res.send(response);
    });
});

app.post('/rentalStatus', (req,res) => {
    let response = {
        message: ""
    };

    reservationModel.findOne({
        _id: req.body.id
    },
    (err, reservation) => {
        if (err) response.message = "Failed to add rental to reservation";
        else {
            response.message = "Reservation successfully found";
            response.chairs = reservation.chairs;
            response.signs = reservation.signs;
            response.catered = reservation.catered;
        }
        res.send(response);
    });
});

app.post('/donate', (req,res) => {
    let response = {
        message: ""
    };

    userModel.updateOne({
        username: req.body.username
    },
    (err) => {
        if (err) response.message = "Failed to cancel reservation";
        else response.message = "Reservation successfully canceled";
        res.send(response);
    });


});

module.exports = app