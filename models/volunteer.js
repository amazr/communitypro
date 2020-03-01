const mongoose = require('mongoose');

let volunteerSchema = new mongoose.Schema({
    status: {
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
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const volunteer = mongoose.model("Volunteer", volunteerSchema);
module.exports = volunteer;