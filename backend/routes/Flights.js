const router = require('express').Router();
const { request } = require('express');
let Flight = require('../Models/Flights');
// const { router } = require("express");

router.route('/').get((req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log(res)
});
router.route('/search').get((req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log('search function in Flights routes')
});


router.route('/FindMyFlight').get((req, res) => {
  Flight.findById(req.query.ID)
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log('FindMyFlight function in Flights routes')
});
// router.route('/add').post((req,res) => {

  // console.log('search function in Flights routes') 
// });
router.route('/add').post((req,res) => {
  
    const newFlight = new Flight(req.body);
      console.log("entered add flight")
    newFlight.save()
    .then(() => res.json('flight added'))
    .catch(err => res.status(400).json('Error: '+err ));
});

router.route('/get-flights').get((req , res) => {
  Flight.find()
  .then(flights => res.json(flights))
  .catch(err => res.status(400).json('Error: '+err));
});

// router.route('/add').post((req,res) => {
  
//     const newFlight = new Flight(req.body);

//     newFlight.save()
//     .then(() => res.json('flight added'))
//     .catch(err => res.status(400).json('Error: '+err ));
// });

router.put('/:id', (req,res) =>{
  Flight.findByIdAndUpdate(req.params.id, req.body)
  .then(flight => res.json({msg: 'Updated'}))
  .catch(err => res.status(400).json({error: 'unable to update'}))
})
router.route('/:id').delete((req, res) => {
  Flight.findByIdAndRemove(req.params.id).then(result => {
    // console.log(req.params.id,req.body);
    res.status(200).send("flight Deleted ");
    console.log("The flight is deleted successfully !");
  }).catch(err => {
    console.log(err);
  });

});
//update Flights
router.route('/update/:id').post((req, res) => {
  Flight.findByIdAndUpdate(req.params.id)
    .then(flights => {
      flights.FlightNumber = req.body.FlightNumber;
      flights.DepartureTime = req.body.DepartureTime;
      flights.ArrivalTime = req.body.ArrivalTime;
      flights.From = req.body.From;
      flights.To = req.body.To;
      flights.DepartureAirport = req.body.DepartureAirport;
      flights.ArrivalAirport = req.body.ArrivalAirport;
      flights.EconomySeats = req.body.EconomySeats;
      flights.BusinessSeats = req.body.BusinessSeats;
      flights.FirstClassSeats = req.body.FirstClassSeats;
      flights.Date = req.body.Date;

      flights.save()
        .then(() => res.json('Flights updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Select/:id').post((req, res) => {
Flight.find({ FlightNumber: req.FlightNumber}, function (err, docs) {
  if (err){
      console.log(err);
  }
  else{
      console.log("First function call : ", docs);
  }
});

});

router.route('/FindAllFlights').get((req, res) => {
  Flight.find({ From:req.query.From ,EconomySeats :{$gte: parseInt(req.query.Seats)},To:req.query.To
   ,Date:req.query.Date})
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
  console.log('search function in Flights routes')
});


router.route('/SearchUser').get((req, res) => {
  const x =(req.query.Cabin).normalize();
   var y=parseInt(req.query.Seats);
  // console.log(req.params.Seats)
  
   console.log(y);
  if(x=="Economy" ){
  //EconomySeats :{$gte: y}
  Flight.find({ Date:req.query.Date,To:req.query.To,From:req.query.From 
     ,EconomySeats :{$gte:y}}) 
  // .where('EconomySeats').gte(req.query.Seats).exec()
  
  .then(flights => res.json(flights))
  .catch(err => res.status(400).json('Error: '+err));
}
else if(x==("Business")){
  Flight.find({ Date:req.query.Date,To:req.query.To,From:req.query.From,
    BusinessSeats :{$gte:y}
    
  }) 
  .then(flights => res.json(flights))
  .catch(err => res.status(400).json('Error: '+err));

}
else if(x==("FirstClass")){
  Flight.find({ Date:req.query.Date,To:req.query.To,From:req.query.From,
    FirstClassSeats :{$gte: parseInt(req.query.Seats)}
    
  }) 
  .then(flights => res.json(flights))
  .catch(err => res.status(400).json('Error: '+err));

}
});


  // Flight.find({ FlightNumber: req.FlightNumber}, function (err, docs) {
  //   if (err){
  //       console.log(err);
  //   }
  //   else{
  //       console.log("First function call : ", docs);
  //   }
  // });

// exports.viewFlights = (req, res) => {                                               ``
//   Flight.find({})
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   };
router.route('/:id').delete((req,res) =>{
    Flight.findByIdAndRemove(req.params.id)
    .then(result =>{
        res.status(200).send("flight Deleted ");
        console.log("The flight is deleted successfully !");
    }).catch(err => {
        console.log(err);
      });

  });

  // delete confirm

  router.route('/get-flight/:id').get((req,res) =>{
    Flight.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
  })

  router.route('/update/:id/:oldPassNo').post((req, res) => {
    Flight.findById(req.params.id)
      .then(flights => {
  
        var arrayLength = (flights.PassportNumber).length;
        for (var i = 0; i < arrayLength; i++) {
          //console.log(this.state.flights[i]);
          if (req.params.oldPassNo == flights.PassportNumber[i]) {
            flights.PassportNumber[i] = req.body.PassportNumber || oldPassNo;
          }
        }
        flights.save()
          .then(() => res.json('Flights updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


  // updting the flihgt after confirmation to decrement the number of seats reserved here is the id of the flight
  router.route('/updateSeats/:id').post((req, res) => {
    Flight.findById(req.params.id)
      .then(flights => {
        const x =req.body.cabinType;
        var new_seats = 0;
        if(x=="Economy"){
          // curSeats = total, resSeats = reserved ones
            new_seats = flights.EconomySeats - req.body.resSeats;
            flights.EconomySeats = new_seats;

        }
        if(x=="Business"){
          new_seats = flights.BusinessSeats - req.body.resSeats;
          flights.BusinessSeats = new_seats;
        }
        if(x=="FirstClass"){
          new_seats = flights.FirstClassSeats - req.body.resSeats;
          flights.FirstClassSeats = new_seats;
        }
        // var new_seat = req.body.curSeats - req.body.resSeats;
        // flights.Seats 
  
        flights.save()
          .then(() => res.json('Flights updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/updateSeatsInCancel/:id').post((req, res) => {
    Flight.findById(req.params.id)
      .then(flights => {
        const x =req.body.cabinType;
        var new_seats = 0;
        if(x=="Economy"){
          // curSeats = total, resSeats = reserved ones
            new_seats = flights.EconomySeats + req.body.resSeats;
            flights.EconomySeats = new_seats;

        }
        if(x=="Business"){
          new_seats = flights.BusinessSeats + req.body.resSeats;
          flights.BusinessSeats = new_seats;
        }
        if(x=="FirstClass"){
          new_seats = flights.FirstClassSeats + req.body.resSeats;
          flights.FirstClassSeats = new_seats;
        }
        // var new_seat = req.body.curSeats - req.body.resSeats;
        // flights.Seats 
  
        flights.save()
          .then(() => res.json('Flights updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });




  




 

module.exports = router;