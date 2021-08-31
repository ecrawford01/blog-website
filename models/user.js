const mongoose = require('mongoose')
// const marked = require('marked') //may not need this
const slugify = require('slugify')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

// articleSchema.pre('validate', function (next) {
//     if (this.title) {
//       this.slug = slugify(this.title, 
//         { lower: true, strict: true})
//     }
//     next()
// })

module.exports = mongoose.model('User', userSchema)