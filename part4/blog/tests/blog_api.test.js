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
  let user = await User.findOne({ 'username': 'firstUser' })
  let userForToken = {
    username: user.username,
    id: user._id
  }
  globals.user1Id = user.id
  globals.user1token = jwt.sign(userForToken, process.env.SECRET)

  user = await User.findOne({ 'username': 'secondUser' })
  userForToken = {
    username: user.username,
    id: user._id
  }
  globals.user2token = jwt.sign(userForToken, process.env.SECRET)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initBlogs
    .map(blog => new Blog({ ...blog, 'user': globals.user1Id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are ten blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
  expect(response.body).toHaveLength(10)
})

test('there are ids for blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('there are users for blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
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
    .set('Authorization', 'bearer ' + globals.user2token)
    .send(newBlog)
  expect(response.body.title).toEqual('testing')

  const allResponse = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
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
    .set('Authorization', 'bearer ' + globals.user2token)
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
    .set('Authorization', 'bearer ' + globals.user2token)
    .send(newBlog)
    .expect(400)
})

test.only('delete a blog', async () => {
  const initialLength = helper.initBlogs.length

  // Get id of first blog
  let blogs = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
  const id = blogs.body[0].id

  // delete first blog
  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', 'bearer ' + globals.user1token)
    .expect(204)

  // confirm length decreased by one
  blogs = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
  expect(blogs.body).toHaveLength(initialLength - 1)
})

test.only('delete a blog not authorized', async () => {
  // Get id of first blog
  let blogs = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
  const id = blogs.body[0].id

  // delete first blog
  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', 'bearer ' + globals.user2token)
    .expect(401)
})

test('edit a blog', async () => {
  const editedBlog =   {
    'title': 'edited',
    'url': 'me.com'
  }

  // Get id of first blog
  let blogs = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)

  const id = blogs.body[0].id

  // edit first blog
  await api
    .put(`/api/blogs/${id}`)
    .set('Authorization', 'bearer ' + globals.user2token)
    .send(editedBlog)

  const allResponse = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + globals.user2token)
  const allTitles = allResponse.body.map(blog => blog.title)
  expect(allTitles).toContain('edited')
})

afterAll(() => {
  mongoose.connection.close()
})