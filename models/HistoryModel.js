const crypto = require('crypto');
const db = require('../database/db');
require('../schemas/histories');
require('../schemas/users');

class HistoryModel {
  constructor(){
    this.Histories = db.model('histories');
    this.Users = db.model('users');
  }

  async createHistory(historyData){
    try {
      let history = await this.Histories.create({
        amount: parseFloat(parseFloat(historyData.amount).toFixed(2)),
        createdAt: historyData.createdAt,
        historyType: historyData.historyType
      });
      let user = await this.Users.findOne({_id: historyData.userId});
      user.history.push(history._id);
      if(history.historyType === 'expense'){
        user.monthlyAmount = parseFloat(parseFloat(parseFloat(user.monthlyAmount) - parseFloat(history.amount)).toFixed(2));
      } else {
        user.monthlyAmount = parseFloat(parseFloat(parseFloat(user.monthlyAmount) + parseFloat(history.amount)).toFixed(2));
      }
      user.dailyAmount = parseFloat(parseFloat(user.monthlyAmount/30).toFixed(2));
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateHistory(oldHistoryData, newHistoryData, userId){
    try {
      let oldHistory = await this.Histories.findOne({_id: oldHistoryData._id});
      oldHistory.amount = newHistoryData.amount;
      oldHistory.historyType = newHistoryData.historyType;
      oldHistory.createdAt = newHistoryData.createdAt;
      await oldHistory.save();
      let user = await this.Users.findOne({_id: userId});

      if(oldHistoryData.historyType === 'expense' && newHistoryData.historyType === 'expense'){
        let differenceAmount = oldHistoryData.amount - newHistoryData.amount;
        user.monthlyAmount = parseFloat(user.monthlyAmount) + parseFloat(differenceAmount);
        user.dailyAmount = parseFloat(parseFloat(user.monthlyAmount/30).toFixed(2));
        return await user.save();
      }
      if(oldHistoryData.historyType === 'income' && newHistoryData.historyType === 'income'){
        let differenceAmount = parseFloat(oldHistoryData.amount) - parseFloat(newHistoryData.amount);
        user.monthlyAmount = parseFloat(user.monthlyAmount) - parseFloat(differenceAmount);
        user.dailyAmount = parseFloat(parseFloat(user.monthlyAmount/30).toFixed(2));
        return await user.save();
      }
      if(oldHistoryData.historyType === 'expense' && newHistoryData.historyType === 'income'){
        let differenceAmount = parseFloat(oldHistoryData.amount) + parseFloat(newHistoryData.amount);
        user.monthlyAmount = parseFloat(user.monthlyAmount) + parseFloat(differenceAmount);
        user.dailyAmount = parseFloat(parseFloat(user.monthlyAmount/30).toFixed(2));
        return await user.save();
      }
      if(oldHistoryData.historyType === 'income' && newHistoryData.historyType === 'expense'){
        let differenceAmount = parseFloat(oldHistoryData.amount) + parseFloat(newHistoryData.amount);
        user.monthlyAmount = parseFloat(user.monthlyAmount) - parseFloat(differenceAmount);
        user.dailyAmount = parseFloat(parseFloat(user.monthlyAmount/30).toFixed(2));
        return await user.save();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteHistory(historyData, userId){
    try {
      await this.Histories.findByIdAndRemove({_id: historyData._id});
      let user = await this.Users.findOne({_id: userId});
      user.history.splice(user.history.indexOf(historyData._id), 1);

      if(historyData.historyType === 'expense'){
        user.monthlyAmount = parseFloat(parseFloat(parseFloat(user.monthlyAmount) + parseFloat(historyData.amount)).toFixed(2));
      } else {
        user.monthlyAmount = parseFloat(parseFloat(parseFloat(user.monthlyAmount) - parseFloat(historyData.amount)).toFixed(2));
      }
      user.dailyAmount = parseFloat(parseFloat(user.monthlyAmount/30).toFixed(2));
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new HistoryModel();
