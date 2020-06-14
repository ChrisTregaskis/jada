const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/applications', (req, res, next) => {
    const name = req.body.name;
    res.status(200).json({
        message: "run'n!",
        name: name
    })
});

module.exports = app;