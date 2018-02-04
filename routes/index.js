var Content = require("../models/article.handlebars");

// GET home page
router.get("/", function(req, res, next){
    Content.find(function(err, content) {
        res.render("article", {title: "HP_Articles", contents: content});
    });
});

module.exports = router;
