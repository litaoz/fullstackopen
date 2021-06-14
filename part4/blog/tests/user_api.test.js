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

test('get users is json', async () => {
  await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get users has two users', async () => {
  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(2)
})

test('post user should increase by one', async () => {
  const user =   {
    'username': 'postUser',
    'password': '123',
    'name': 'Paul'
  }
  await api.post('/api/users')
    .send(user)
    .expect(201)

  const allResponse = await api.get('/api/users')
  expect(allResponse.body).toHaveLength(3)
})

test('post user not long enough username should error', async () => {
  const user =   {
    'username': 'po',
    'password': '123',
    'name': 'Paul'
  }
  await api.post('/api/users')
    .send(user)
    .expect(400)

  const allResponse = await api.get('/api/users')
  expect(allResponse.body).toHaveLength(2)
})

test('post user not long enough password should error', async () => {
  const user =   {
    'username': 'postUser',
    'password': '12',
    'name': 'Paul'
  }
  await api.post('/api/users')
    .send(user)
    .expect(400)

  const allResponse = await api.get('/api/users')
  expect(allResponse.body).toHaveLength(2)
})

afterAll(async () => {
  mongoose.connection.close()
})