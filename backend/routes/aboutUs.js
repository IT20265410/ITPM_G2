const router = require('express').Router();
let Aboutus = require('../models/aboutUs');

//retrieve all
router.route('/').get((req, res) => {
    Aboutus.find()
        .then(aboutUs => res.json(aboutUs))
        .catch(err => res.status(400).json('Error: ' + err));
});


//create
router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const comDesc = req.body.comDesc;
    const vision = req.body.vision;
    const mission = req.body.mission;
    const lNews = req.body.lNews;

    const newAboutus = new Aboutus({

        _id,
        comDesc,
        vision,
        mission,
        lNews
    });

    newAboutus.save()
        .then(() => res.json('New about details added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//retrieve function 
router.route('/:id').get((req, res) => {
    Aboutus.findById(req.params.id)
        .then(aboutUs => res.json(aboutUs))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete function
router.route('/:id').delete((req, res) => {
    Aboutus.findById(req.params.id)
        .then(() => res.json('About us Details deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update function
router.route('/update/:id').post((req, res) => {
    Aboutus.findById(req.params.id)
        .then(aboutUs => {
            aboutUs.comDesc = req.body.comDesc;
            aboutUs.mission = req.body.mission;
            aboutUs.lNews = req.body.lNews;
          

            aboutUs.save()
                .then(() => res.json('about us details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;