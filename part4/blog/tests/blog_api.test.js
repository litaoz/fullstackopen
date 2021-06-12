const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

const helper = require('./test_helper.js')
const Blog = require('../models/blog.js')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

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

test.only('posting a blog', async () => {
  const newBlog = {
    'title': 'testing',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
  expect(response.body.title).toEqual('testing')

  const allResponse = await api.get('/api/blogs')
  expect(allResponse.body).toHaveLength(helper.initBlogs.length + 1)
  const allTitles = allResponse.body.map(blog => blog.title)
  expect(allTitles).toContain('testing')
})

afterAll(() => {
  mongoose.connection.close()
})