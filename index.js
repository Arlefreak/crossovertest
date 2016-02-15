'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Donor = require('./models/donor');
var config = require('./config');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.get('/api/', function (req, res) {
    res.send("<a href='/api/donors'>Show donors</a>");
});


app.get('/api/setup', function(req, res) {
    //Array of chat data. Each object properties must match the schema object properties
    var testData = [{
        firstName: 'Mario',
        lastName: 'Carballo',
        email: 'arlefreak@gmail.com',
        phone: '5513872076',
        bloodType: 'A',
        ip: '111',
        location: [0,0]
    }, {
        firstName: 'Mario1',
        lastName: 'Carballo',
        email: 'arlefreak@gmail.com',
        phone: '5513872076',
        bloodType: 'A',
        ip: '111',
        location: [0,0]
    }, {
        firstName: 'Mario2',
        lastName: 'Carballo',
        email: 'arlefreak@gmail.com',
        phone: '5513872076',
        bloodType: 'A',
        ip: '111',
        location: [0,0]
    }, {
        firstName: 'Mario3',
        lastName: 'Carballo',
        email: 'arlefreak@gmail.com',
        phone: '5513872076',
        bloodType: 'A',
        ip: '111',
        location: [0,0]
    }];

    //Loop through each of the chat data and insert into the database
    for (var c = 0; c < testData.length; c++) {
        //Create an instance of the chat model
        var newDonor = new Donor(testData[c]);
        //Call save to insert the chat
        console.log(newDonor);
        newDonor.save(function(err, savedDonor) {
            console.log(savedDonor);
        });
    }
    //Send a resoponse so the serve would not get stuck
    res.send('created');
});

//This route produces a list of chat as filterd by 'room' query
app.get('/api/donors', function(req, res) {
    Donor.find({}, function(err, donors) {
        var donorMap = {};

        donors.forEach(function(donor) {
            donorMap[donor._id] = donor;
            console.log(donor);
        });
        
        res.send(donorMap);
    });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
    onlineUsers++;

    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

    socket.on('disconnect', function() {
        onlineUsers--;
        io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
