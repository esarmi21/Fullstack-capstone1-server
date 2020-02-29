const xss = require('xss')

const commentsService = {

  insertComment(db, username, text ) {
     return db.from('users').where({username}).first()
      .then((user) =>{
          const userId = user.id
          return db
      .insert({ user_id:userId, text })
      .into('comments')
      .returning('*')
      .then(([comment]) => {console.log('comment string', comment)})
      })
  },
  getComments(db){
      return db
      .from('comments')
      .select()
  }
}

module.exports = commentsService