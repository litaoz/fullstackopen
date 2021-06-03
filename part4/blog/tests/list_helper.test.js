const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('totalLikes, empty blogs', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('totalLikes, one blog', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      }
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })

  test('totalLikes, three blogs', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      },
      {
        'title': 'Trek',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3ac6478024b26d85f8d24'
      },
      {
        'title': 'Train',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3aecb5fad71380c0952cf'
      },
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(15)
  })
})

describe('favoriteBlog', () => {
  test('favoriteBlog, empty blogs', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({ 'likes': 0 })
  })

  test('favoriteBlog, one blog', () => {
    const blogs = [{
      'title': 'Tantalizing',
      'author': 'arther',
      'url': 'me.com',
      'likes': 5,
      'id': '60b3a83685d9f40d64fd8cd0'
    }]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      }
    )
  })

  test('favoriteBlog, three blog, first', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      },
      {
        'title': 'Trek',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3ac6478024b26d85f8d24'
      },
      {
        'title': 'Train',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3aecb5fad71380c0952cf'
      },
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      'title': 'Tantalizing',
      'author': 'arther',
      'url': 'me.com',
      'likes': 5,
      'id': '60b3a83685d9f40d64fd8cd0'
    })
  })

  test('favoriteBlog, three blog, last', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      },
      {
        'title': 'Trek',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3ac6478024b26d85f8d24'
      },
      {
        'title': 'Train',
        'author': 'arther',
        'url': 'me.com',
        'likes': 6,
        'id': '60b3aecb5fad71380c0952cf'
      }
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      'title': 'Train',
      'author': 'arther',
      'url': 'me.com',
      'likes': 6,
      'id': '60b3aecb5fad71380c0952cf'
    })
  })
})
