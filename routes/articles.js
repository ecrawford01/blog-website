// file that allows 
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

// generates a new article and sends the 
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

// gives access to the user to reach the article that they want to edit
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article})
})

// gives access to the user to read more about the article (such as description, comments)
// redirects user back to home page if the article is not found
router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ 
    slug: req.params.slug
  })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

// creates a new article to the index page
router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

// gives user access to the article by accessing the article's id
router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

// deletes the article by finding the articles's id
router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

// helper function used to consistently save and resave the article
function saveArticleAndRedirect(path) {
  return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.teaser = req.body.teaser
      article.description = req.body.description
    try {
      // saves the article and redirects user to the article id
      article = await article.save()
      res.redirect(`/articles/${ article.slug}`)
    } catch (e) {
      console.log(e)
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router
