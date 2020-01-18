'use strict'

var exp = require('express');

// express application entry point
var app = exp();

// GET request for root directory served
app.get('/', (req, res) => {
    // send success message
    res.send('hello, world');
});

// open up a port for the app to listen on
app.listen(3000);