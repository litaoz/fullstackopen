const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('login returns token', async () => {
  const user = {
    username: 'firstUser',
    password: '1234'
  }
  const response = await api.post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.token).toBeDefined()
})

afterAll(async () => {
  mongoose.connection.close()
})