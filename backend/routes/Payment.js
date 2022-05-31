
const stripe = require("stripe")("sk_test_51KFF0bJRBpyojyQVJUDKObfpC2IC9AhE6JU3brxDpp9MHwHqw0e3wWvYAfcdZh6iNHSDrALCOrkL2fJNL6NxeYQr00fKQmGA1N");
const uuid = require("uuid");

const router = require('express').Router();

let Users = require('../Models/User');
let Flight = require('../Models/Flights');

router.route('/pay').get((req,res) =>{
    res.send("Payment is OK");
    });




router.route('/charge').post((req,res) => {
    const {flight , token} = req.body;
    // console.log("flight",flight);
    // console.log("flight price",1000);
    // const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
        
    }
    
    )
    // .then(customer => {
    //     stripe.charges.create({
    //         amount :1000,
    //         currency:"usd",
    //         customer: "alia",
    //         receipt_email: token.email

    //     })
    // })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})


router.route('/payForFlight').post((req,res) => {
    const {flight , token} = req.body;
    // console.log("flight",flight);
    console.log("flight price",1000);
    // const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
        
    }
    
    )
    // .then(customer => {
    //     stripe.charges.create({
    //         amount :1000,
    //         currency:"usd",
    //         customer: "alia",
    //         receipt_email: token.email

    //     })
    // })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

module.exports = router;