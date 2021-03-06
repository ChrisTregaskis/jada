const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const applicationsRoute = require('../api/routes/applications');
const sessionsRoute = require('../api/routes/sessions');
const userRoute = require('../api/routes/user');

// db connection
mongoose.connect(
    `mongodb+srv://userAko:${process.env.MONGO_ATLAS_PW}@jada-m29v7.mongodb.net/jada?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// route paths
app.use('/applications', applicationsRoute);
app.use('/sessions', sessionsRoute);
app.use('/user', userRoute);

// if no route found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;