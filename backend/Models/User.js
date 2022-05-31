const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
        type: String,
        required: true,
      },
    email: {
        type:String,
        required: true,
      },
    password: {
        type: String,
        required: false,
        },
    passport_number: {
        type: String,
        required: true,
        },
    flights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Flight",
    }],
// list for sprint 3
    prices: [{
      type: mongoose.Schema.Types.Number,
    }],
    cabinTypes: [{
      type: mongoose.Schema.Types.String,
    }],
    seats: [{
      type: mongoose.Schema.Types.Number,
    }],
    seatNumbers: {
      type: Array
    },
    home_address: {
      type: String,
      required: false,
    },
    country_code: {
      type: String,
      required: false,
    },
    telephone_number: {
      type: String,
      required: false,
    },
    user_name: {
      type: String,
      required: false,
    }
} , { timestamps: true });

mongoose.models = {}
const User = mongoose.model('User', UserSchema);
module.exports = User;
