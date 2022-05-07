const router = require('express').Router();
let Team = require('../models/team.model');

//retrieve all
router.route('/').get((req, res) => {
    Team.find()
        .then(team => res.json(team))
        .catch(err => res.status(400).json('Error: ' + err));
});


//create
router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const name = req.body.name;
    const nic = req.body.nic;
    const age = req.body.age;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;

    const newTeam = new Team({

        _id,
        name,
        nic,
        age,
        gender,
        phone,
        email,
        address
    });

    newTeam.save()
        .then(() => res.json('New Team member added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//retrieve function 
router.route('/:id').get((req, res) => {
    Team.findById(req.params.id)
        .then(team => res.json(team))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete function
router.route('/:id').delete((req, res) => {
    Team.findByIdAndDelete(req.params.id)
        .then(() => res.json('Registered team member deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update function
router.route('/update/:id').post((req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            team.name = req.body.name;
            team.nic = req.body.nic;
            team.age = Number(req.body.age);
            team.gender = req.body.gender;
            team.phone = Number(req.body.phone);
            team.email = req.body.email;
            team.address = req.body.address;

            team.save()
                .then(() => res.json('Register team member updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;