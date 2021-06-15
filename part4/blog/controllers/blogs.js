const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { 'username': 1, 'name': 1, 'id': 1 })
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const blogData = { ... request.body, 'user': user._id }
  const blog = new Blog(blogData)
  const result = await blog.save()
  user['blogs'].push(result.id)
  await user.save()
  return response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blog = {
    'title': body.title,
    'author': body.author,
    'url': body.url,
    'likes': body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
  return response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (user.id !== blog.user.toString()) {
    return response.status(401).json({ 'error': 'not authorized' })
  }
  await Blog.findByIdAndRemove(id)
  return response.status(204).end()
})

module.exports = blogsRouter
