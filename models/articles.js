//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
    {
      headline: {type: String, required: true},
      url: {type: String, required: true},
      summary: {type: String, required: true},
      pic: {type: String, required: true},
      comment: {type: Schema.Types.ObjectId, ref: "Comments"}
    }
);

// Compile model from schema
var Article = mongoose.model("articles", ArticleSchema );

module.exports = Article;