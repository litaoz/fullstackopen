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

test('posting a blog', async () => {
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

test('posting a blog without likes property', async () => {
  const newBlog = {
    'title': 'no likes',
    'author': 'arther',
    'url': 'me.com'
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toEqual(0)
})

test('posting a blog without title and url errors', async () => {
  const newBlog = {
    'author': 'arther',
    'likes': 5
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete a blog', async () => {
  const initialLength = helper.initBlogs.length

  // Get id of first blog
  let blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id

  // delete first blog
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  // confirm length decreased by one
  blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(initialLength - 1)
})

afterAll(() => {
  mongoose.connection.close()
})