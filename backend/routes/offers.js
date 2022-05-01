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

//get record by using ID 
router.route('/:id').get((req, res) => {
    Offer.findById(req.params.id)
        .then(offer => res.json(offer))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete 
router.route('/:id').delete((req, res) => {
    Offer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Offer details deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update function
router.route('/update/:id').post((req, res) => {
    Offer.findById(req.params.id)
        .then(offer => {
            offer.offerName = req.body.offerName;
            offer.offerDescription = req.body.offerDescription;
            offer.specialNotice = req.body.specialNotice;
            offer.startingDate = Date.parse(req.body.startingDate);
            offer.endingDate = Date.parse(req.body.endingDate);
           
            offer.save()
                .then(() => res.json('Offer details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;