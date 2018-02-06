//Dependencies
var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var request = require("request");
var path = require("path");
//Need the models
var Articles = require("../models/articles.js");
var Comments = require("../models/comments.js");
var db = require("../models");
// GET home page
router.get("/", function(req, res){
    //Scraper info
    //////////////////////////////////////////////////////////////////

    // Making a request from mugglenet.com. The page's HTML is passed as the callback's third argument
    request("http://www.mugglenet.com", function(error, response, html) {
    // Load the HTML into cheerio and save it to a variable
    var $ = cheerio.load(html);

    // An empty array to save the data that is scraped
    var results = [];

    // With cheerio, find each article-tag with the "group" class
    // (i: iterator. element: the current element)
    $("article.group").each(function(i, element) {
        var scrapedInfo = {};
        // Save the text of the element in a "title" variable
        scrapedInfo.headline = $(element).children("div").children("h2").children("a").text().trim();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        scrapedInfo.url = $(element).children("div").children("h2").children("a").attr("href").trim();

        scrapedInfo.summary = $(element).children("div").children("div").children("p").text().trim();
        scrapedInfo.pic = $(element).children("div").children("div").children("a").children("img").attr("src").trim();

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            headline: scrapedInfo.headline,
            url: scrapedInfo.url,
            summary: scrapedInfo.summary,
            pic: scrapedInfo.pic
        });
    });
    res.redirect("/articles");

    });
});

router.get("/articles", function(req, res) {
    db.Article.find().sort({_id: 1})
    var hbsObject = {articles: results} 
    res.render("articles", hbsObject);
});

module.exports = router;
