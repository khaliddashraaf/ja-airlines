// External variables
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
// M3 for payment
// const stripe = require("stripe")("pk_test_51KFF0bJRBpyojyQVkWhibqEFUBKNDp8Kq3D5ox3a33V0PQ8ckPTOTEHaZi3obvqQ6ltAYF93BWdYFcQUFscixWfQ00uVoZpGKO");
const uuid = require("uuid");
//
require('dotenv').config();

// const f = require('C:\\Alia\\sem 7\\ACML\\project\\airlines\\backend\\routes\\Flights.js');

// const MongoURI = 'mongodb+srv://students:se123@cluster1.hcryf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoURI = process.env.ATLAS_URI;
// for mongo DB config
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));





//App variables
const app = express();
app.use(cors());
const port = process.env.PORT || "8000";




//  To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes for admin
// const AdminRuoter = require('./routes/Admin');
// app.use('/Admin',AdminRuoter);

// // routes for database
const DatabaseRuoter = require('./routes/Database');
app.use('/database', DatabaseRuoter);

// routes for flights
const FlightRuoter = require('./routes/Flights');
app.use('/flights', FlightRuoter);

//routes for User
const UserRouter = require('./routes/User');
app.use('/users', UserRouter);

const booking = require('./routes/Booking')
app.use('/booking', booking)
// app.get('/flights',f.viewFlights);

// Routes for users
const userRuoter = require('./routes/User');
app.use('/users', userRuoter);

//Rputes for payment
const paymentRuoter = require('./routes/Payment');
app.use('/payments', paymentRuoter);




// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
