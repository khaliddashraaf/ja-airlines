const router = require("express").Router();
let database = require('../Models/database');

router.route('/').get((req, res) => {
    database.find()
        .then(databases => res.json(databases))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const newEntery = new database(req.body);

    newEntery.save()
    .then(() => res.json('entery added'))
    .catch(err => res.status(400).json('Error: '+err ));
});

// ,
//                 To:req.params.To,
//                 Flight_Date:req.params.Flight_Date

router.route('/removedb/:Flight_Number').delete((req,res) =>{
    database.deleteMany(
                    {Flight_Number:req.params.Flight_Number},
                    // {Flight_Date:req.params.Flight_Date},
                    // {Cabin:req.params.cabin}
                )
                // Cabin:req.params.cabin
                    .then(result =>{
                        res.status(200).send("flight Deleted ");
                        console.log("The flight is deleted successfully !");
                    }).catch(err => {
                        console.log(err);
                      });
  })



  router.route('/update/:Flight_Number').post((req, res) => {
    database.updateMany({Flight_Number:req.params.Flight_Number},{From : req.body.From,
        To : req.body.To,
        Seats_Available_on_Flight : req.body.Seats_Available_on_Flight,
        Flight_Date : req.body.Flight_Date
    
    })
    //   .then(db => {
    //     db.Flight_Number = req.body.Flight_Number;
    //     db.From = req.body.From;
    //     db.To = req.body.To;
    //     db.Cabin = req.body.Cabin;
    //     db.Seats_Available_on_Flight = req.body.Seats_Available_on_Flight;
    //     db.Flight_Date = req.body.Flight_Date;
  
    //     db.save()
    //       .then(() => res.json('db updated!'))
    //       .catch(err => res.status(400).json('Error: ' + err));
    //   })
    //   .catch(err => res.status(400).json('Error: ' + err));

    .then(result =>{
        res.status(200).send("flight updated ");
        
    }).catch(err => {
        console.log(err);
      });
      console.log(res);
  });






module.exports = router;