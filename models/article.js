// file that creates the articles collection in the blog database
const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema


const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  teaser: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  comment: {
    type: Array
  }
})

// exchanges the article id with a slugify version (for better readability in the URL)
articleSchema.pre('validate', function (next) {
    if (this.title) {
      this.slug = slugify(this.title, 
        { lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)