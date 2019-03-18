const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    monthlyAmount: {
      type: Number,
      default: 0
    },
    dailyAmount: {
      type: Number,
      default: 0
    },
    history: [{
      type: Schema.ObjectId,
      ref: 'histories'
    }]
});

module.exports = mongoose.model('users', UsersSchema);
