const express = require('express');
const router = express.Router();
let Booking = require('../Models/Booking');

router.post('/createBooking', (req, res) => {
    console.log(req.body)
    Booking.create(req.body)
      .then(booking => res.send(booking))
      .catch(err => res.status(400).json({ error: 'Unable to add this booking' }));
  });

  module.exports = router;