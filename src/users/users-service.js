

const UsersService = {

  insertUser(db, username, password) {
   
    return db
      .from('users')
      .where('username', username)
      .where('password', password)
      .then((list)=>{
        if (list.length){
        return new Promise((resolve,reject)=>{
            resolve(200)
        })
        
      }
        else {
          return db
        .insert({ username, password })
        .into('users')
        .returning('*')
        .then(([user]) => user)
        }
      })
  },
}

module.exports = UsersService