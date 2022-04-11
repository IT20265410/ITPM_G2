const router = require('express').Router();
let Offer = require('../models/offer.model');

//get all records
router.route('/').get((req, res) => {
    Offer.find()
        .then(offers => res.json(offers))
        .catch(err => res.status(400).json('Error: ' + err));
});

//insret a new offer
router.route('/add').post((req, res) => {  
    const offerId = req.body.offerId;
    const offerName = req.body.offerName;
    const offerCode = req.body.offerCode;
    const offerDescription = req.body.offerDescription;
    const specialNotice = req.body.specialNotice;
    const startingDate = Date.parse(req.body.startingDate);
    const endingDate = Date.parse(req.body.endingDate);

    const newOffer = new Offer({
        offerId,
        offerName,
        offerCode,
        offerDescription,
        specialNotice,
        startingDate,
        endingDate,
    });

    newOffer.save()
        .then(() => res.json('New offer added successfully...'))
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