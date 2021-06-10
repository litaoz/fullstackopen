const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return blog.likes > max.likes ? blog : max
  }
  return blogs.reduce(reducer, { 'likes': 0 })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const maxAuthor = _(blogs).countBy('author')
    .toPairs()
    .maxBy(_.last)

  return { 'author': maxAuthor[0] , 'blogs': maxAuthor[1] }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
