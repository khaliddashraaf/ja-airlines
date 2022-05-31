const router = require("express").Router();
let Admin = require('../Models/Adminstrator');

router.route('/').get((req , res) => {
    Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    // const adminName = req.body.Name;

    const newAdmin = new Admin(req.body);

    newAdmin.save()
    .then(() => res.json('Admin added'))
    .catch(err => res.status(400).json('Error: '+err ));
});

module.exports = router;