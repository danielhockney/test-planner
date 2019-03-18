const crypto = require('crypto');
const db = require('../database/db');
require('../schemas/users');

class LoginModel {
  constructor(){
    this.Users = db.model('users');
  }

  async loginUser(email, password){
    password = crypto.createHash('sha256').update(password).digest('hex');
    try {
      let user = await this.Users.findOne({email});
      if(user === null){
        return {
          success: false,
          error: 'User does not exist. Check your email address, please!'
        }
      }
      if(user.password !== password){
        return {
          success: false,
          error: 'Password is incorrect!'
        }
      } else {
        return {
          success: true,
          data: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new LoginModel();
