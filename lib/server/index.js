require('dotenv').config(); // able to use process.env.FOO
const PORT = process.env.PORT;

var cors = require('cors');
var express = require('express');
var helmet = require('helmet');
var matter = require('./matter');
var morgan = require('morgan');
var io = require('socket.io');

// express application entry point
var app = express();
// attach app middleware
app.use([cors(), helmet(), morgan('dev')]);

// GET request for root directory served
app.get('/', (req, res) => {
    // send success message
    res.send('hello, world');
});

/**
 * dispatcher for endpoints?
 * 
 * @todo: next() ?
 */
app.get('/api/', (req, res) => {
    console.log(req);
    res.send({
        id: Math.floor(Math.random() * 10)
    });
});

// open up a port for the app to listen on
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
