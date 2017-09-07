'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var nodemailer = require('nodemailer');

var app = express();
require('dotenv').load();
// require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/', express.static(process.cwd() + '/public'))
app.use('.', express.static(process.cwd()));
// app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
