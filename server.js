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

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from mugglenet.com:" +
            "\n***********************************\n");

// Making a request from mugglenet.com. The page's HTML is passed as the callback's third argument
request("https://www.mugglenet.com", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(html);

  // An empty array to save the data that is scraped
  var results = [];

  // With cheerio, find each article-tag with the "group" class
  // (i: iterator. element: the current element)
  $("article.group").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var headline = $(element).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var url = $(element).children().attr("href");

    var summary = $(element).children().attr("entry-summary");

    var pic = $(element).children().attr("post-thumbnail");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
        headline: headline,
        url: url,
        summary: summary,
        pic: pic
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

// By default mongoose uses callbacks for async queries, now setting it to use promises instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/hp_articles", {
  useMongoClient: true
});

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
    User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

app.listen(PORT, function() {
    console.log("App running on port" + PORT);
});