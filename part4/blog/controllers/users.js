const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  return res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const passwordValidator = (password) => {
    const minLength = 3
    if (password.length < minLength) {
      return false
    }
    return true
  }

  if (!passwordValidator(body.password)) {
    return res.status(400).json({ 'error': 'Invalid password' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    'username': body.username,
    'passwordHash': passwordHash,
    'name': body.name
  })
  const createdUser = await user.save()
  return res.status(201).json(createdUser)
})

module.exports = usersRouter