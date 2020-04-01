const knex = require('knex')
const app = require('../app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function() {
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

  
  
  
  describe(`POST /users`, () =>{
      it(`Logs in as a new user`, () =>{  
        return supertest(app)
        .post('/users')
        .send({username: 'Joe', password: '1234'})
        .expect(201)

      })
      it(`Logs in as an existing user`, () =>{
        return supertest(app)
        .post('/users')
        .send({username: 'username', password: '1234'})
        .expect(201)
        .then(()=> {
          return supertest(app)
          .post('/users')
          .send({username: 'username', password: '1234'})
          .expect(200)

        })
      })
        it(`Logs in as an existing user with inorrect password`, () =>{
          return supertest(app)
          .post('/auth/login')
          .send({username: 'username', password: 'wrongpassword'})
          .expect(401)
          .then(()=> {
            return supertest(app)
            .post('/auth/login')
            .send({username: 'username', password: 'wrongpassword'})
            .expect(401)
      })
    })

  })
})