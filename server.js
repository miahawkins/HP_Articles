//Dependencies
var express = require("express");
var exphdb = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

var PORT = 3000;

//Start Express
var app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Use express.static to make statis css etc work
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, now setting it to use promises instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/hp_articles", {
  useMongoClient: true
});

app.listen(PORT, function() {
    console.log("App running on port" + PORT);
});