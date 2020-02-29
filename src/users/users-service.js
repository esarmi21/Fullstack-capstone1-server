const bcrypt = require('bcryptjs')
const xss = require('xss')

const UsersService = {

  insertUser(db, username, password) {
    return db
      .insert({ username, password })
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },
}

module.exports = UsersService