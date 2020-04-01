const knex = require('knex')
const app = require('../app')
const helpers = require('./test-helpers')

describe('Comments Endpoints', function() {
  let db


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /comments`, () =>{
    it(`Lets a user post a comment`, () =>{  
      const comment = {
        text: 'this is a comment'
      }
      return supertest(app)
      .post('/comments')
      .send({comment})
      .expect(201)

    })
  
    })
  })
