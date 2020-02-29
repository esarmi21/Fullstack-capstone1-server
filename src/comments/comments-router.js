const express = require('express')
const commentsService = require('./comments-service')


const commentsRouter = express.Router()
const jsonBodyParser = express.json()

commentsRouter
  .post('/comments', jsonBodyParser, (req, res, next) => {
    const { username, text  } = req.body
    console.log ({ username, text })

    commentsService.insertComment(
      req.app.get('db'),
   username, text
    )
      .then(() => {
          console.log('12345')
        res
          .status(201).send({})
      })
      .catch(() => {
        console.log('123456')
          res.status(500).send({})
      })

    })
    .get('/comments', (req, res, next) => {
        commentsService.getComments(req.app.get('db'))
        .then((comments)=>{
            res.status(200).send(comments)
        })
        .catch(() => {
            res.status(500).send({})
        })
    
    })

module.exports = commentsRouter