const AuthService = {
    getUser(db, username){
       return db('users')
       .where({username})
       .first()
    }
  }

  
  module.exports = AuthService