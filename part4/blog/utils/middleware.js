const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return
  }
  const token = getTokenFrom(request)
  if (token !== null) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.token = !decodedToken.id
      ? null
      : decodedToken
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token === null) {
    return response.status(401).json({
      'error': 'token missing or invalid'
    })
  }
  const user = await User.findById(request.token.id)
  if (user === null) {
    return response.status(401).json({
      'error': 'user no longer exists'
    })
  }
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}