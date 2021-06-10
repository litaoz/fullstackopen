const listHelper = require('../utils/list_helper')

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

describe('mostBlogs', () => {
  test('mostBlogs, empty blogs', () => {
    const blogs = []
    expect(listHelper.mostBlogs(blogs)).toEqual({})
  })
  test('mostBlogs, one blog', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      }
    ]
    expect(listHelper.mostBlogs(blogs)).toEqual({ 'author': 'arther', 'blogs': 1 })
  })
  test('mostBlogs, three blogs', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'Bob',
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
    expect(listHelper.mostBlogs(blogs)).toEqual({ 'author': 'arther', 'blogs': 2 })
  })
  test('mostBlogs, four blogs, two same', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'Bob',
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
        'title': 'Missile',
        'author': 'Bob',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3aecb5fad71380c0952cf'
      },
      {
        'title': 'Tractor',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3aecb5fad71380c0952cf'
      }
    ]
    expect([
      { 'author': 'arther', 'blogs': 2 },
      { 'author': 'Bob', 'blogs': 2 }
    ]).toContainEqual(listHelper.mostBlogs(blogs))
  })
})

describe('mostLikes', () => {
  test('mostLikes, empty blogs', () => {
    const blogs = []
    expect(listHelper.mostLikes(blogs)).toEqual({})
  })
  test('mostLikes, one blog', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'arther',
        'url': 'me.com',
        'likes': 5,
        'id': '60b3a83685d9f40d64fd8cd0'
      }
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({ 'author': 'arther', 'likes': 5 })
  })
  test('mostLikes, three blogs', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'Bob',
        'url': 'me.com',
        'likes': 7,
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
    expect(listHelper.mostLikes(blogs)).toEqual({ 'author': 'arther', 'likes': 10 })
  })
  test('mostLikes, four blogs, two same', () => {
    const blogs = [
      {
        'title': 'Tantalizing',
        'author': 'Bob',
        'url': 'me.com',
        'likes': 7,
        'id': '60b3a83685d9f40d64fd8cd0'
      },
      {
        'title': 'Trek',
        'author': 'arther',
        'url': 'me.com',
        'likes': 8,
        'id': '60b3ac6478024b26d85f8d24'
      },
      {
        'title': 'Missile',
        'author': 'Bob',
        'url': 'me.com',
        'likes': 8,
        'id': '60b3aecb5fad71380c0952cf'
      },
      {
        'title': 'Tractor',
        'author': 'arther',
        'url': 'me.com',
        'likes': 7,
        'id': '60b3aecb5fad71380c0952cf'
      }
    ]
    expect([
      { 'author': 'arther', 'likes': 15 },
      { 'author': 'Bob', 'likes': 15 }
    ]).toContainEqual(listHelper.mostLikes(blogs))
  })
})