const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const FlightSchema = new Schema({

    FlightNumber: { type: String, required: true },
    DepartureTime: { type: String, required: true },
    ArrivalTime: { type: String, required: true },
    From: { type: String, required: true },
    To: { type: String, required: true },
    DepartureAirport: { type: String, required: true },
    ArrivalAirport :{ type: String, required: true },
    EconomySeats:{ type: Number, required: true },
    resEconomySeats:{ type: Array, required: true },
    BusinessSeats: { type: Number, required: true },
    resBusinessSeats: { type: Array, required: true },
    FirstClassSeats: { type: Number, required: true },
    resFirstClassSeats: { type: Array, required: true },
    Price:{type: Number, required: true},
    Duration: { type: String },
    
    PassportNumber: { type: Array, required: true },
    Date: { type: String, required: true },
    },  opts);

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;