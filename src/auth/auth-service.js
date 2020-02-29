const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
    getUser(db, username){
       return db('users')
       .where({username})
       .first()
    }
  }

  
  module.exports = AuthService