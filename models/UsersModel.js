const db = require('../database/db');
require('../schemas/users');

class UsersModel {
  constructor(){
    this.Users = db.model('users');
  }

  async getUserById(id){
    try {
      let user = await this.Users.findOne({_id: id}).populate('history').exec();
      if(user !== null){
        return {
          success: true,
          data: {
            id: user._id,
            email: user.email,
            username: user.username,
            monthlyAmount: user.monthlyAmount,
            dailyAmount: user.dailyAmount,
            history: user.history
          }
        };
      } else {
        return {
          success: false,
          error: "User does not exist"
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setMounthlyAmount(id, amount){
    try {
      let user = await this.Users.findOne({_id: id});
      if(user !== null){
        user.monthlyAmount = parseFloat(parseFloat(amount).toFixed(2));
        user.dailyAmount = parseFloat(parseFloat(amount/30).toFixed(2));
        await user.save();
        return {
          success: true
        };
      } else {
        return {
          success: false,
          error: "User does not exist"
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UsersModel();
