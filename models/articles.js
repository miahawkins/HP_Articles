//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Articles = new Schema(
    {
      headline: {type: String, required: true},
      url: {type: String, required: true},
      summary: {type: String, required: true},
      pic: {type: String, required: true}
    })

// Compile model from schema
var SomeModel = mongoose.model('Articles', Articles );

module.exports = SomeModel;