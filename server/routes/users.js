const express = require('express')
const router = express.Router()
const User = require('../model/user')
const config = require('../config')
const jwt = require('jsonwebtoken')

router.post('/login', function (req, res) {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill email' }] })
  }
  if (!password) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill upassword' }] })
  }

  User.findOne({ email }, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong' }] })
    }
    if (!foundUser) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'User is not exist' }] })
    }
    if (!foundUser.hasSamePassword(password)) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'Incorrect password' }] })
    }

    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' })

    return res.json(token)
  })

})

router.post('/register', function (req, res) {
  const { username, email, password, confirmPassword } = req.body

  if (!username) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill username' }] })
  }
  if (!email) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill email' }] })
  }
  if (!password) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please fill upassword' }] })
  }
  if (password !== confirmPassword) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Please check upassword' }] })
  }

  User.findOne({ email }, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong' }] })
    }
    if (foundUser) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'User already exists' }] })
    }
    const user = new User({ username, email, password })
    user.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong' }] })
      }
      return res.json({ "registered": true })
    })
  })

  // const productId = req.params.productId
  // Product.findById(productId, function (err, foundProduct) {
  //   if (err) {
  //     return res.status(422).send({ errors: [{ title: 'Product error', detail: 'Product not found' }] })
  //   }
  // return res.json({ username, email, password })
  // })
})

module.exports = router
