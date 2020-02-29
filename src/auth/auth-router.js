const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login' , jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body
    AuthService.getUser(req.app.get('db'),username, password)
    .then((user)=>{
      const passwordMatches = user.password === password
      console.log(passwordMatches, user.password, password)
        if (passwordMatches === true)
        return res.status(200).send({})
          else 
            return res.status(401).send({})

    })
  })

module.exports = authRouter