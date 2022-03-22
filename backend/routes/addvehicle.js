const router = require('express').Router();
let Addvehicle = require('../models/addvehicle.model');

//retrieve all
router.route('/').get((req, res) => {
    Addvehicle.find()
        .then(addvehicle => res.json(addvehicle))
        .catch(err => res.status(400).json('Error: ' + err));
});


//create
router.route('/add').post((req, res) => {  
    const _id = req.body._id;
    const name = req.body.name;
    const vehicleImage = req.body.vehicleImage;
    const price = req.body.price;
    const description = req.body.description;

    const newAddvehicle = new Addvehicle({

        _id,
        name,
        vehicleImage,
        price,
        description

    });

    newAddvehicle.save()
        .then(() => res.json('New vehicle added successfully...'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//retrieve function 
router.route('/:id').get((req, res) => {
    Addvehicle.findById(req.params.id)
        .then(addvehicle => res.json(addvehicle))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete function
router.route('/:id').delete((req, res) => {
    Addvehicle.findByIdAndDelete(req.params.id)
        .then(() => res.json('Vehicle details deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update function
router.route('/update/:id').post((req, res) => {
    Addvehicle.findById(req.params.id)
        .then(addvehicle => {
            addvehicle.name = req.body.name;
            addvehicle.vehicleImage = req.body.vehicleImage;
            addvehicle.price = Number(req.body.price);
            addvehicle.description = req.body.description;
           
          

            addvehicle.save()
                .then(() => res.json('Vehicle details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;