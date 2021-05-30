const express = require('express')
const app = express()
const cors = require('cors')
// const blogsRouter = require('./controllers/blogs')

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())
// app.use('/api/blogs', blogsRouter)

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app
