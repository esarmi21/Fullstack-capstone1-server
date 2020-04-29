const knex = require('knex')
const app = require('../app')
const { PORT, DATABASE_URL } = require('./config')
const cors = require('cors')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.set('db', db)
app.use(cors({
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})