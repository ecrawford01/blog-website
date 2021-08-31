// file that provides the server for the blog website
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
// const User = require('./models/user')
// const userRouter = require('./routes/users')
const methodOverride = require('method-override')

// used for login authentication
const bcrypt = require('bcrypt')
const passport = require('passport')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// connects the database
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true}, function (error, client) {
  blog = client.db

  // creates a new comment and saves it to the current article
  app.post('/do-comment', async (req, path) => {
    let article = req.article
    let comment = req.comment
    comment.username = req.body.username
    comment.comment = req.body.comment
    article.comment = comment
    try {
      comment.save()
      article.save()
      res.redirect(`/articles/${ article.slug}`)
    } catch (e) {
      console.log(e)
      res.render(`articles/${path}`, { article: article })
    }
  })
})  

// loads all the articles to the home page with each article sorted by newest
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
    createdAt: 'desc'
  })
  res.render('articles/index', { articles: articles })
})

// allows access to the login page
app.get('/login',checkNotAuthenticated, (req, res) => {
  res.render('articles/login')
})

// users information is processed. If the users information is correct, it is brought
// to the index page. Otherwise, it stays on the login page and prints a flash error
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// allows access to the register page
app.get('/register', (req, res) => {
  res.render('articles/register')
})

// clears the session and allows the user to logout
app.delete('/logout', (req, res) => {
  // req.logOut()
  res.redirect('/login')
})

// helper methods

// authenticates the users information from the login page
// and directs them to the login page if the information does not match
function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

// authenticates the users information from the login page
// and directs them to the index page if successful
function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

// allows this page to also use the articles.js page
app.use('/articles', articleRouter)

// shows what port is needed
app.listen(5000)
