const knex = require('knex')
const app = require('../app')
const helpers = require('./test-helpers')

describe('Comments Endpoints', function() {
  let db


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /comments`, () => {
    beforeEach('insert comments', () =>
      helpers.seedThingsTables(
        db,
        testUsers,
      )
    )

    it(`creates a review, responding with 201 and the new review`, function() {
      this.retries(3)
      const testUser = testUsers[0]
      const newComment = {
        text: 'Test new review'
      }
      return supertest(app)
        .post('/api/comments')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newComment)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.text).to.eql(newComment.text)
          expect(res.body.user.id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/comments/${res.body.id}`)
        })
        .expect(res =>
          db
            .from('comments')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.text).to.eql(newComment.text)
              expect(row.thing_id).to.eql(newComment.thing_id)
              expect(row.user_id).to.eql(testUser.id)
            })
        )
    })

    const requiredFields = ['text', 'thing_id']

    requiredFields.forEach(field => {
      const testUser = testUsers[0]
      const newComment = {
        text: 'Test new review',
        thing_id: testThing.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newComment[field]

        return supertest(app)
          .post('/comments')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newComment)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})