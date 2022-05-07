const router = require('express').Router();
let Rentv = require('../models/rentv.model');

//retrieve all
router.route('/').get((req, res) => {
    Rentv.find()
        .then(rentv => res.json(rentv))
        .catch(err => res.status(400).json('Error: ' + err));
});


//create
router.route('/add').post((req, res) => {
    const cid = req.body.cid;
    const cname = req.body.cname;
    const vid = req.body.vid;
    const vname = req.body.vname;
    const idate = Date.parse(req.body.idate);;
    const ddate = Date.parse(req.body.ddate);;
    const status = req.body.status;
    

    const newRentv = new Rentv({

        cid,
        cname,
        vid,
        vname,
        idate,
        ddate,
        status
    });

    newRentv.save()
        .then(() => res.json('New vehicle Rented successfully...'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//retrieve function 
router.route('/:id').get((req, res) => {
    Rentv.findById(req.params.id)
        .then(rentv => res.json(rentv))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete function
router.route('/:id').delete((req, res) => {
    Rentv.findByIdAndDelete(req.params.id)
        .then(() => res.json('Vehicle details deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update function
router.route('/update/:id').post((req, res) => {
    Rentv.findById(req.params.id)
        .then(rentv => {
            rentv.cname = req.body.cname;
            rentv.vname = req.body.vname;
            rentv.idate = Date.parse(req.body.idate);
            rentv.ddate = Date.parse(req.body.ddate);
            rentv.status = req.body.status;
           
            rentv.save()
                .then(() => res.json('Vehicle details updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;