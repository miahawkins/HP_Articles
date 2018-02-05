//Dependencies
var express = require("express");
var exphdb = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

var Comments = require("./models/comments.js");
var Articles = require("./models/articles.js");
var PORT =processs.env.PORT || 3000;

//Start Express
var app = express();
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to make statis css etc work
app.use(express.static("./public"));

//For Handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: "./app/views/layouts/",
	extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

// //Scraper info
// //////////////////////////////////////////////////////////////////////////////////////////
// console.log("\n***********************************\n" +
//             "Grabbing every thread name and link\n" +
//             "from mugglenet.com:" +
//             "\n***********************************\n");

// // Making a request from mugglenet.com. The page's HTML is passed as the callback's third argument
// request("https://www.mugglenet.com", function(error, response, html) {

//   // Load the HTML into cheerio and save it to a variable
//   var $ = cheerio.load(html);

//   // An empty array to save the data that is scraped
//   var results = [];

//   // With cheerio, find each article-tag with the "group" class
//   // (i: iterator. element: the current element)
//   $("article.group").each(function(i, element) {

//     // Save the text of the element in a "title" variable
//     var headline = $(element).text();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var url = $(element).children().attr("href");

//     var summary = $(element).children().attr("entry-summary");

//     var pic = $(element).children().attr("post-thumbnail");

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//         headline: headline,
//         url: url,
//         summary: summary,
//         pic: pic
//     });
// });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });

//Mongoose/MongoDB info
///////////////////////////////////////////////////////////////////////////////

// Connect to the Mongo DB
var mongoDB = "mongodb://localhost/hp_articles";
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
    var mongoDB = "mongodb://localhost/hp_articles";
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

// app.get("/", function(req, res) {
//     db.Articles.find({})
//         .then(function(articlesDB) {
//             res.json(articlesDB);
//             res.render("articles");
//         })
//         .catch(function(err) {
//             res.json(err);
//         });
// });

// // Route to post our form submission to mongoDB via mongoose
// app.post("/submit", function(req, res) {
//     User.create(req.body)
//       .then(function(dbUser) {
//         res.json(dbUser);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });

app.listen(PORT, function() {
    console.log("App running on port" + PORT);
});