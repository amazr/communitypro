const express = require('express');
const userModel = require('./models/user');
const reservationModel = require('./models/reservation');
const volunteerModel = require('./models/volunteer');
const app = express();

app.get('/', (req,res) => {
    res.send('Service Online');
});

//POSTS
app.post('/login', (req,res) => {

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

app.post('/volAvailability', (req,res) => {
    //req.body.room
    //req.body.date
    let response = {
        times: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        message: ""
    };

    volunteerModel.find({
        reservedDate: req.body.date
    },
    (err, volunteers) => {
        if (err) response.message = err;
        else if (volunteers.length === 0) response.message = "You have no other volunteer duties this day";
        else {
            volunteers.forEach((volunteers) => {
                let index = response.times.indexOf(volunteers.timeStart);
                response.times.splice(index, 1);
            });
            response.message = ("Found " + volunteers.length + " other duties on this date");
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

app.post('/addVolunteer', (req,res) => {

    let volunteer = new volunteerModel(req.body);
    volunteer.bookedDate = Date.now();

    volunteer.save((err) => {
        if (err) res.send(err);
        else res.send(volunteer);
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
            response.message = "Successfully found reservations";
        }
        res.send(response);
    });
});

app.post('/volunteerSchedule', (req,res) => {
    let response = {
        volunteers: [],
        message: ""
    };

    volunteerModel.find({
    },
    (err, volunteers) => {
        if (err || volunteers.length === 0) response.message = "No volunteer data found";
        else {
            response.volunteers = volunteers;
            response.message = "Successfully found volunteer data";
        }
        res.send(response);
    });
});

app.post('/mySchedule', (req,res) => {
    let response = {
        schedule: [],
        message: ""
    };

    volunteerModel.find({
        name: req.body.name
    },
    (err, schedule) => {
        if (err || schedule.length === 0) response.message = "No my data found";
        else {
            response.schedule = schedule;
            response.message = "Successfully found my data";
        }
        res.send(response);
    });
});

app.post('/cancelReservation', (req,res) => {
    let response = {
        message: ""
    };
    reservationModel.deleteOne({
        _id: req.body.id
    },
    (err) => {
        if (err) response.message = "Failed to cancel reservation";
        else response.message = "Reservation successfully canceled";
        res.send(response);
    });
});

app.post('/cancelVolunteer', (req,res) => {
    let response = {
        message: ""
    };
    volunteerModel.deleteOne({
        _id: req.body.id
    },
    (err) => {
        if (err) response.message = "Failed to cancel reservation";
        else response.message = "Reservation successfully canceled";
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
    (err, update) => {
        if (err || update.nModified == 0) response.message = "Failed to Book Rental";
        else response.message = "Rental Successfully booked";
        res.send(response);
    });
});


app.post('/rentalStatus', (req,res) => {
    let response = {
        message: "",
        chairs: null,
        signs: null,
        catered: null
    };

    reservationModel.findOne({
        _id: req.body.id
    },
    (err, reservation) => {
        if (err || !reservation) response.message = "Failed find rental";
        else {
            response.message = "Rental Information Successfully Found";
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
    }, {
        $push: {
            donations: {
                amount: req.body.amount,
                date: Date.now(),
                anon: req.body.anon
            }
        }
    },
    (err, update) => {
        console.log(err, update);
        if (err || update.nModified === 0) response.message = "Donation was not accepted";
        else response.message = "Donation was accepted";
        res.send(response);
    });
});

app.post('/getDonations', (req,res) => {
    let response = {
        message: "",
        donations: []
    }

    userModel.find({
        username: req.body.username
    },
    (err, users) => {
        if (err || users.length === 0) response.message = "No donations found";
        else {
            users.forEach(user => {
                user.donations.forEach(donation => {
                    response.donations.push(donation);
                });
            });
            response.message = "Successfully Found Donations"
        }
        res.send(response);
    });
});

module.exports = app