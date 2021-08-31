// file that creates the comment collection in the blog database
var mongoose = require('mongoose');
const Schema = mongoose.Schema

 commentsSchema = new Schema({   
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentsSchema);