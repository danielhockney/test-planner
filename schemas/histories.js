const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoriesSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  historyType: {
    type: String,
    enum: ['expense', 'income']
  }
});

module.exports = mongoose.model('histories', HistoriesSchema);
