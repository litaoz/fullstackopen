const bcrypt = require('bcryptjs')

const initBlogs = [
  {
    'id': '60b3a79485d9f40d64fd8ccf',
    'title': 'first',
    'url': 'me.com'
  },
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
  {
    'title': 'Jacks',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5,
    'id': '60b3aefe37b5844c18ca5f4c'
  },
  {
    'title': 'app',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5,
    'id': '60b400ea0cff2344b400fbef'
  },
  {
    'title': 'controller',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5,
    'id': '60b401bdeb4baa4c78623e4a'
  },
  {
    'title': 'controller1',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5,
    'id': '60b401c8619712247c8fe6e5'
  },
  {
    'title': 'info',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5,
    'id': '60b404288b5f4245940743d2'
  },
  {
    'title': 'middleware',
    'author': 'arther',
    'url': 'me.com',
    'likes': 5,
    'id': '60b406145d3e0c1ddc4e69b8'
  }
]

const saltRounds = 10
const password = bcrypt.hash('1234', saltRounds)

const initUsers = [
  {
    'username': 'firstUser',
    'passwordHash': '$2a$10$zRDrrk1Q1N1NQp7WpvByFue7D28mb1prMcbqWsccK7uVrSHv8bDSS',
    'name': 'Frank'
  },
  {
    'username': 'secondUser',
    'passwordHash': '$2a$10$zRDrrk1Q1N1NQp7WpvByFue7D28mb1prMcbqWsccK7uVrSHv8bDSS',
    'name': 'Sarah'
  }
]

module.exports = {
  initBlogs,
  initUsers
}
