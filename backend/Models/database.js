const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const databaseSchema = new Schema({
    From: {
        type: String,
        required: true,
    },
    To: {
        type: String,
        required: true,
    },
    Flight_Date: {
        type: String,
        required: true,
    },
    Cabin: {
        type: String,
        required: true,
    },
    Seats_Available_on_Flight: {
        type: Number,
        required: true,
    },
    Flight_Number:{
        type:String,
        required:true,
    },

} , { timestamps: true });

mongoose.models = {}
const Database = mongoose.model('Database', databaseSchema);
module.exports = Database;
