//Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

var Comments = require("./models/comments.js");
var Articles = require("./models/articles.js");
var PORT = process.env.PORT || 3000;

//Start Express
var app = express();
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to make statis css etc work
app.use(express.static("./public"));

//For Handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

//Mongoose/MongoDB info
///////////////////////////////////////////////////////////////////////////////

// Connect to the Mongo DB
var mongoDB = "mongodb://localhost/muggle";
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

if(process.env.NODE_ENV == "production") {
    // Connect to the Mongo DB
    var mongoDB = "mongodb://add heroku url";
    mongoose.connect(mongoDB);
}
else{
    // Connect to the Mongo DB
    var mongoDB = "mongodb://localhost/muggle";
    mongoose.connect(mongoDB);
}
//Get the default connection
var db = mongoose.connection;

//To get notification of connection errors)
db.on('error', console.error.bind(
    console, 'MongoDB connection error:'
));

var router = require("./routes/index.js");
app.use("/", router);

app.listen(PORT, function() {
    console.log("App running on port" + PORT);
});