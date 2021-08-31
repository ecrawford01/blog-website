const express = require('express')
const User = require('./../models/user')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('/articles/login', { user: new User() })
}), saveUser('/')

function saveUser(path) {
  return async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.param.password, 10)
    let user = req.user
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    try {
      // saves the user and redirects to homepage
      user = await user.save()
      res.redirect('/')
    } catch (e) {
      console.log(e)
      res.render('/articles/login')
    }
  }
}