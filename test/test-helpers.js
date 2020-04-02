const bcrypt = require('bcryptjs')

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
 
      username: 'test-user-3',
      password: 'password',
    },
  ]
}



function makeCommentsArray(users) {
  return [
    {
      text: 'First test comment',
      user_id: users[0].id,
    },
    {
      text: 'Second test comment',
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
   return db.into('users').insert(preppedUsers)
     .then(() =>
       // update the auto sequence to stay in sync
       db.raw(
         `SELECT setval('users_id_seq', ?)`,
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



module.exports = {
  makeUsersArray,
  makeCommentsArray,

  cleanTables,
  seedThingsTables,
  seedUsers
}