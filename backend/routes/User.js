const router = require('express').Router();
const nodemailer = require('nodemailer');
let Users = require('../Models/User');
let Flight = require('../Models/Flights');
const { useResolvedPath } = require('react-router-dom');
const bcrypt = require('bcrypt');
const async = require('async');
const { responsiveFontSizes } = require('@mui/material');
//const hashAsync = util.promisify(bcrypt.hash);


// get users
router.route('/').get((req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log(res)
});
// //Login
// router.route('/login').post((req, res) => {
//     const user = { username: req.body.username, password: req.body.password }
//     Users.push(user)
//     res.status(201).send()
// })
//CreateAccount
// var passp = localStorage.getItem("PassportNumber")

router.route('/getUserwithpassportno/:passp').get((req, res) => {
    Users.find({ passport_number: req.params.passp })
        // .then(users => {
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

//CreateAccount
router.route('/createaccount/:id').post(async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { user_name: req.body.user_name, password: hashedPassword }
        console.log(user)
        Users.findByIdAndUpdate(req.params.id, req.body)
            .then(user => res.json({ msg: 'Created' }))
            .catch(err => res.status(400).json({ error: 'unable to create' }))

        // Users.push(user)
        //     res.status(201).send()
    } catch {
        res.status(500).send()
    }
})
//change password
router.route('/editPassword/:id').post(async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { password: hashedPassword }
        console.log(user)
        Users.findByIdAndUpdate(req.params.id, req.body)
            .then(user => res.json({ msg: 'Password Successfully Changed' }))
            .catch(err => res.status(400).json({ error: 'Unable to change password' }))

        // Users.push(user)
        //     res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

// //login
// router.route('/login').post(async (req, res) => {
//     let users = Users.findOne(users => users.user_name = req.body.user_name)
//     if (users == null) {
//         return res.status(400).send('can;t find user')
//     }

//     try {
//         bcrypt.compare(req.body.password, users.password)
//     }
//     catch {
//         res.status(500).send()
//     }

// })
//Login

// router.route('/login').post(async (req, res) => {
//     console.log(req.body.user_name)
//     // const user = Users.find(user => user.user_name == req.body.user_name)
//     const user = Users.find({ user_name: req.body.user_name })
//     console.log(user.first_name)
//     if (user == null) {
//         return res.status(400).send('Cannot find user')
//     }
//     //console.log(user)
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             // const username = req.body.username
//             // const user = { name: username }
//             // const accessToken = generateAccessToken(user)
//             // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//             // refreshTokens.push(refreshToken)
//             res.json({ msg: 'Logged in' })
//         } else {
//             res.send('Not Allowed')
//         }
//     } catch {
//         res.status(500).send()
//     }
// })

// .then(result => {
//     res.send(result.flights);
// })
// router.route('/login').post(async (req, res) => {

//     await Users.findOne({ user_name: req.body.user_name })
//         .then(users => {
//             res.send(users.password);
//             //console.log(users.password)

//             if (!users) {
//                 return res.status(400).send('Cannot find user')
//             }

//             //console.log(user)
//             try {
//                 if (getData(bcrypt.compare(req.body.password, users.password))) {
//                     console.log(users.password)
//                     console.log(bcrypt.compare(req.body.password, users.password))

//                     res.json({ msg: 'Logged in' })
//                 } else {
//                     res.send('Not Allowed')
//                 }

//             } catch {
//                 res.status(500).send()
//             }
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// })

//getting pass of a user

router.route('/getpassword/:username').get((req, res) => {
    Users.find({ user_name: req.params.username })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });

})
//Login given passwword
router.route('/login/:pass').post(async (req, res) => {
    try {
        console.log(req.params.pass)
        console.log(req.body.password + "PASSSSS")

        if (req.body.password == req.params.pass) {
            res.send('Logged Successfuly')
        }
        else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

// get the user by the id
router.route('/get-user/:id').get((req, res) => {
    Users.findById(req.params.id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
})
// Add users
router.route('/add').post((req, res) => {

    const newUser = new Users(req.body);
    console.log("entered add user")
    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/editseats/:id').post((req, res) =>  {
  Users.findByIdAndUpdate(req.params.id)
  .then(user => {
    user = req.body
    user.save()
  })
  .catch(err => console.log(err))
})

// add flight to a user
router.route('/bookFlight/:id').post((req, res) => {
    Users.findByIdAndUpdate(req.params.id)
        .then(users => {
            users.flights.push(req.body.flights);

            // new lists for sprint 3
            users.prices.push(req.body.pricePayed);
            users.cabinTypes.push(req.body.cabinType);
            users.seats.push(req.body.NumberOfSeats);




            users.save()
                .then(() => res.json('Flights updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
//here is the id is the id of the flight and passport number of the user

router.route('/savePassport/:id').post((req, res) => {
  Flight.findByIdAndUpdate(req.params.id)
      .then(users => {
        users.flights.push(req.body.flights);
       
  
        users.save()
          .then(() => res.json('Flights updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
// PUT PASSPORT NUMBER IN THE FLIGHT    
  router.route('/addPassPortNumber/:id').post((req, res) => {
    Flight.findByIdAndUpdate(req.params.id)
        .then(flights => {
          flights.PassportNumber.push(req.body.PassportNumber);
         
    
          flights.save()
            .then(() => res.json('Flights updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

//   delete flight fom user(cancel it)
router.route('/cancel/:id/').post((req, res) => {

    Users.findByIdAndUpdate(req.params.id)
    .then(users => {
        // users.flights.push(req.body.flights);
        users.flights.splice(users.flights.indexOf(req.body.flights),1);
        users.prices.splice(users.prices.indexOf(req.body.flights),1);
        users.cabinTypes.splice(users.prices.indexOf(req.body.flights),1);
        users.seats.splice(users.prices.indexOf(req.body.flights),1);

       
  
        users.save()
          .then(() => res.json('Flights updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));

  });

//   list the flights of a speciefic user by his id
router.route('/user-flights/:id').get((req, res) => {
    Users.findById(req.params.id)
        .then(result => {
            res.send(result.flights);
        })
        .catch(err => {
            console.log(err);
        });
})


//   router.route('/savePassport/:id').post((req, res) => {
//     Flight.findByIdAndUpdate(req.params.id)
//         .then(flight => {
//             flight.PassportNumber.push(req.body.passport_number);



//             flight.save()
//                 .then(() => res.json('Flight updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

//   delete flight fom user(cancel it)
// router.route('/cancel/:id').post((req, res) => {

//     Users.findByIdAndUpdate(req.params.id)
//         .then(users => {
//             // users.flights.push(req.body.flights);
//             users.flights.splice(users.flights.indexOf(req.body.flights), 1);


//             users.save()
//                 .then(() => res.json('Flights updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));

// });

//   list the flights of a speciefic user by his id
// router.route('/user-flights/:id').get((req, res) => {
//     Users.findById(req.params.id)
//         .then(result => {
//             res.send(result.flights);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// })

//my profile with edit button
router.route('/myProfile').get((req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log(res)
});

router.route('/myProfile/:id').post((req, res) => {
    Users.findById(req.params.id)
        .then(users => {

            if (users.first_name) {
                users.first_name = req.body.first_name || users.first_name;
            }
            if (users.last_name) {
                users.last_name = req.body.last_name || users.last_name;
            }
            if (users.email) {
                users.email = req.body.email || users.email;
            }
            if (users.password) {
                users.password = req.body.password || users.password;
            }
            if (users.passport_number) {
                users.passport_number = req.body.passport_number || users.passport_number;
            }
            // if (users.flights) {
            //     users.flights = req.body.flights || users.flights;
            // }

            users.save()
                .then(() => res.json('User profile updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-pass/:inputpassword').get((req, res) => {
    Flight.find()
        .then(users => {

            var arrayLength = (users.password).length;
            for (var i = 0; i < arrayLength; i++) {
                //console.log(this.state.flights[i]);
                if (inputpassword == users.password[i]) {
                    flights.PassportNumber[i] = req.body.PassportNumber || oldPassNo;
                }
            }
            flights.save()
                .then(() => res.json('Flights updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
// router.route('/login').get((req, res) => {
//     Users.find({ password: req.query.password })
//         .then(user => {
//             res.json(user);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

// module.exports = router;

// remove passport from a flight using flight id and passport number in the body
router.route('/removePassport/:id').post((req, res) => {
    Flight.findByIdAndUpdate(req.params.id)
        .then(flight => {
            flight.PassportNumber.pop(req.body.passport_number);



            flight.save()
                .then(() => res.json('Flight updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-confirmation/:id/user/:Uid').get((req, res) => {
    Flight.findById(req.params.id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
})






router.route('/sendWithNodeMailer').post((req,res)=>{
  let data = req.body
  let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth:{
      // user:'rusty.lesch58@ethereal.email',
      user: 'fayrouzzbarakat@gmail.com',
      pass: 'justgowithit123'
    }
  });
  let mailOptions = {
    from:'fayrouzzbarakat@gmail.com',
    to:data.email,
    subject:`message from ja Airlines`,
    html:`
    <h3>Info</h3>
    <ul>
    <li>name:${data.name}</li>
    <li>lastname:${data.lastname}</li>
    <li>From: 'fayrouzzbarakat@gmail.com'</li>
    <li>To:${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.msg}</p>
    `

  };

  console.log("hey from outside")
  smtpTransport.sendMail(mailOptions,(error,response)=>{
    console.log("hey from inside")
    if(error){
      res.send(error)
    }
    else{
      res.send("success")
    }
  })

  smtpTransport.close();
})

// here is the id for the flight to use it to get the details of the flight
router.route('/sendWithNodeMailer/:id').post((req,res)=>{
  let data = req.body
  let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth:{
      // user:'rusty.lesch58@ethereal.email',
      user: 'fayrouzzbarakat@gmail.com',
      pass: 'justgowithit123'
    }
  });
  let mailOptions = {
    from:'fayrouzzbarakat@gmail.com',
    to:data.email,
    subject:`message from ja Airlines`,
    html:`
    <h3>Info</h3>
    <ul>
    <li>name:${data.name}</li>
    <li>lastname:${data.lastname}</li>
    <li>From: 'fayrouzzbarakat@gmail.com'</li>
    <li>To:${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.msg}</p>
    `

  };

  console.log("hey from outside")
  smtpTransport.sendMail(mailOptions,(error,response)=>{
    console.log("hey from inside")
    if(error){
      res.send(error)
    }
    else{
      res.send("success")
    }
  })

  smtpTransport.close();
})

module.exports = router;
