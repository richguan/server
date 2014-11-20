var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var user = require('./user/user.js');
var friends = require('./friends/friends.js');
var receivers = require('./receivers/receiverLogic.js');
var pending = require('./pending/pending.js');
var results = require('./results/results.js');

var app = express();

// app.use(express.static(__dirname + '/www'));
// app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//user-login/signup/logout routes
app.post('/user/login', user.login);
app.post('/user/signup', user.signup);
app.post('/user/logout', user.logout);

// //friends route
app.post('/friends/checkRequest', friends.checkRequest);
app.post('/friends/addFriend', friends.addFriend);
app.post('/friends/confirmFriend', friends.confirmFriend);

//receivers route
app.post('/receivers/getContacts', receivers.getContacts);
app.post('/receivers/sendContent', receivers.sendContent);

//pending route
app.post('/pending/getPending', pending.getPending);
app.post('/pending/countPending', pending.countPending);
app.post('/pending/sendVote', pending.sendVote);

//results route
app.post('/results/getResults', results.getResults);

//server listen
app.listen(process.env.PORT || '8080');

module.exports = app;