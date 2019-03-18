const crypto = require('crypto');
const db = require('../database/db');
require('../schemas/users');

class RegisterModel {
  constructor(){
    this.Users = db.model('users');
  }

  async createUser(username, email, password){
    password = crypto.createHash('sha256').update(password).digest('hex');
    try {
      let existUser = await this.Users.findOne({email});
      if(existUser !== null){
        return {
          success: false,
          error: 'Email already exist!'
        };
      }

      let user = await this.Users.create({
        username : username,
        email : email,
        password : password
      });
      return {
        success: true,
        data: {
          id: user._id,
          username : user.username,
          email : user.email
        }
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new RegisterModel();
