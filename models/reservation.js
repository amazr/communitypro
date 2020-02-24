const mongoose = require('mongoose');

let reservationSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    timeStart: {
        type: Number,
        required: true
    },
    timeEnd: {
        type: Number,
        required: true
    },
    reservedDate: {
        type: Date,
        required: true
    },
    bookedDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    reservee: {
        type: String,
        required: true
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;