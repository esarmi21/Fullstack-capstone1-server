

const UsersService = {

  insertUser(db, username, password) {
    //if username password combo exists inside db return 200
    return db
      .from('users')
      .where('username', username)
      .where('password', password)
      .then((list)=>{
        console.log('-----------------', list)
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