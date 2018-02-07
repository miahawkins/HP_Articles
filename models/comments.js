//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: String,
    body: String
});

// Compile model from schema
var Comment = mongoose.model("comments", CommentSchema );

module.exports = Comment;