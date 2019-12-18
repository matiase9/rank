const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Beer = require('../models/beer');

router.get('/', (req, res, next) => {
    Beer.find()
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
    const beer = new Beer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        alc: req.body.alc,
        ibu: req.body.ibu
    });

    beer.save()
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

router.get('/:beerId', (req, res, next) => {
    const id = req.params.beerId;
    Beer.findById(id)
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

router.patch('/:beerId', (req, res, next) => {
    const id = req.params.beerId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Beer.update({_id: id}, {$set: updateOps})
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

router.delete('/:beerId', (req, res, next) => {
    const id = req.params.beerId;
    
    Beer.remove({_id: id})
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