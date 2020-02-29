const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {

      username: 'test-user-1',
      password: 'password',
    },
    {
      username: 'test-user-2',
      password: 'password',
    },
    {
 
      user_name: 'test-user-3',
      password: 'password',
    },
  ]
}



function makeCommentsArray(users) {
  return [
    {
      id: 1,
      text: 'First test review!',
      user_id: users[0].id,
    },
    {
      id: 2,
      text: 'Second test review!',
      user_id: users[1].id,
    },
   
  ];
}




function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      comments
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
   const preppedUsers = users.map(user => ({
     ...user,
     password: bcrypt.hashSync(user.password, 1)
   }))
   return db.into('thingful_users').insert(preppedUsers)
     .then(() =>
       // update the auto sequence to stay in sync
       db.raw(
         `SELECT setval('thingful_users_id_seq', ?)`,
         [users[users.length - 1].id],
       )
     )
 }

function seedThingsTables(db, users, comments=[]) {
  return seedUsers(db, users)
    .then(() =>
      comments.length && db.into('comments').insert(comments)
    )
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
     subject: user.user_name,
     algorithm: 'HS256',
   })
   return `Bearer ${token}`
 }

module.exports = {
  makeUsersArray,
  makeCommentsArray,

  cleanTables,
  seedThingsTables,
  makeAuthHeader,
  seedUsers
}