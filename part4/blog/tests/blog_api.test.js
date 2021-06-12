const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are ten blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(10)
})

test('there are id\'s for blogs', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

afterAll(() => {
  mongoose.connection.close()
})