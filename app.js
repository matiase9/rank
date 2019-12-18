const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placeRoutes = require('./api/routes/places');
const beerRoutes = require('./api/routes/beers');


mongoose.connect(
    "mongodb+srv://mramirez:"+ 
    process.env.MONGO_ATLAS_PW +
    process.env.MONGO_CONNECTION ,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    // change * by Domain
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, XRequested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


app.use('/places', placeRoutes);
app.use('/beers', beerRoutes);


app.use((req, res, next) => {
    const error = new Error('No funca');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;