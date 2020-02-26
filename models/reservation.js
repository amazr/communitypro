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
    name: {
        type: String,
        required: true
    },
    equipment: [{
        item: String,
        quantity: Number
    }],
    catered: Boolean
});

const reservation = mongoose.model("Reservation", reservationSchema);
module.exports = reservation;