//Dependencies
var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");
var path = require("path");
//Need the models
var Articles = require("../models/articles.js");
var Comments = require("../models/comments.js");
var db = require("../models");



// GET home page
router.get("/", function(req, res){
    //Scraper info
    //////////////////////////////////////////////////////////////////
    console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from mugglenet.com:" +
            "\n***********************************\n");

    // Making a request from mugglenet.com. The page's HTML is passed as the callback's third argument
    axios.get("http://www.mugglenet.com").then (function(response) {
    // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(response.data);

        // // An empty array to save the data that is scraped
        // var results = [];

        // With cheerio, find each article-tag with the "group" class
        // (i: iterator. element: the current element)
        $("article.group").each(function(i, element) {
            //Let all the scraped info be in an object
            var scrapedInfo = {};
            scrapedInfo.headline = $(element).children("div").children("h2").children("a").text().trim();

            // In the currently selected element, look at its child elements
            scrapedInfo.url = $(element).children("div").children("h2").children("a").attr("href").trim();

            scrapedInfo.summary = $(element).children("div").children("div").children("p").text().trim();
            scrapedInfo.pic = $(element).children("div").children("div").children("a").children("img").attr("src").trim();
            console.log(scrapedInfo);
            console.log(Object.keys(db));
            db.Articles.create(scrapedInfo)
                .then(function(newArticle) {
                    console.log(newArticle);
                    
                })
                .catch(function(err) {
                    return res.json(err);
                });
            // // Save these results in an object that we'll push into the results array we defined earlier
            // results.push({
            //     headline: scrapedInfo.headline,
            //     url: scrapedInfo.url,
            //     summary: scrapedInfo.summary,
            //     pic: scrapedInfo.pic
            // });
        });
    // results.insert
    res.redirect("/articles");

    // res.send("Scrape Complete")
    // res.render("article", scrapedInfo);
    
    });
});

router.get("/articles", function(req, res) {
    db.Articles.find({})
    .then(function(hp_articlesDB) {
        var hdbobj = {
            articles: hp_articlesDB
        };
        // res.json(hp_articlesDB);
        console.log(Object.keys(hp_articlesDB));
        res.render("article", hdbobj);
    })
    .catch(function(err) {
        res.json(err);
    });
    //     res({_id: 1})
    // var hbsObject = {articles: results} 
    // res.render("articles", hbsObject);
});

router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(function(hp_articlesDB) {
        res.json(hp_articlesDB);
    })
    .catch(function(err) {
        res.json(err);
    });
});

router.post("/articles/:id", function(req, res) {
    db.Comments.create(req.body)
    .then(function(hp_articlesDB) {
        return hp_articlesDB.findOneAndUpdate({ _id: req.params.id}, { comment: commentsDB._id }, { new: true});
    })
    .then(function(hp_articlesDB) {
        res.json(hp_articlesDB);
    })
    .catch(function(err) {
        res.json(err);
    });
});

module.exports = router;
