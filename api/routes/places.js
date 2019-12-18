const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Place = require('../models/place');


router.get('/', (req, res, next) => {
    Place.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post('/', (req, res, next) => {
    const place = new Place({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        lat: req.body.lat,
        long: req.body.long
    });

    place.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "POST success",
                object: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:placeId', (req, res, next) => {
    const id = req.params.placeId;
    Place.findById(id)
        .exec()
        .then(doc => {
            console.log("DB:", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:placeId', (req, res, next) => {
    const id = req.params.placeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Place.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:placeId', (req, res, next) => {
    const id = req.params.placeId;
    
    Place.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;