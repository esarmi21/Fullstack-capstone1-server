const express = require('express')
const commentsService = require('./comments-service')
const cors = require('cors')

const commentsRouter = express.Router()
const jsonBodyParser = express.json()

commentsRouter
  .post('/comments',cors(), jsonBodyParser, (req, res, next) => {
    const { username, text  } = req.body

    commentsService.insertComment(
      req.app.get('db'),
   username,
    text
    )
      .then(() => {
        res
          .status(201).send({})
      })
      .catch(() => {
          res.status(500).send({})
      })

    })
    .get('/comments',cors(), (req, res, next) => {
        commentsService.getComments(req.app.get('db'))
        .then((comments)=>{
            res.status(200).send(comments)
        })
        .catch(() => {
            res.status(500).send({})
        })
    
    })

module.exports = commentsRouter