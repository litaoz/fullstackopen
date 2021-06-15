const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const globals = {}

beforeAll(async () => {
  const user1 = await User.findOne({ 'username': 'firstUser' })
  globals.userId = user1.id

  const user = await User.findOne({ 'username': 'secondUser' })
  const userForToken = {
    username: user.username,
    id: user._id
  }
  globals.token = jwt.sign(userForToken, process.env.SECRET)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initBlogs
    .map(blog => new Blog({ ...blog, 'user': globals.userId }))
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

test('there are ids for blogs', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('there are users for blogs', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.user).toBeDefined()
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
    .set('Authorization', 'bearer ' + globals.token)
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
    .set('Authorization', 'bearer ' + globals.token)
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
    .set('Authorization', 'bearer ' + globals.token)
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

test('delete a blog', async () => {
  const editedBlog =   {
    'title': 'edited',
    'url': 'me.com'
  }

  // Get id of first blog
  let blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id

  // edit first blog
  await api
    .put(`/api/blogs/${id}`)
    .send(editedBlog)

  const allResponse = await api.get('/api/blogs')
  const allTitles = allResponse.body.map(blog => blog.title)
  expect(allTitles).toContain('edited')
})

afterAll(() => {
  mongoose.connection.close()
})