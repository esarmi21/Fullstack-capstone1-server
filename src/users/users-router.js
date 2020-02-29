const express = require('express')
const path = require('path')
const UsersService = require('./users-service')


const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
      const { password, username } = req.body

    UsersService.insertUser(
        req.app.get('db'),
         username, password)
        .then(()=>{
            res.status(201).send({})
        })
        .catch(()=>{
            res.status(500).send({})
        })

  })

module.exports = usersRouter