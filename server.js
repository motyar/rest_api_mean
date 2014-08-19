// set up 
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config

// configuration 
mongoose.connect(database.url); 	// connect to mongoDB database

app.configure(function() {
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// routes
require('./app/routes.js')(app);

// listen
app.listen(port);
console.log("App listening on port " + port);
