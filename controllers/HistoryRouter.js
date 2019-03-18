const express = require('express');
const HistoryRouter = express.Router();
const HistoryModel = require('../models/HistoryModel');
const UsersModel = require('../models/UsersModel');

HistoryRouter.post('/create', async (req, res) => {
  if(req.body.amount && req.body.historyType && req.body.createdAt && req.body.userId){
    try {
      let result = await HistoryModel.createHistory({
        amount: parseFloat(req.body.amount).toFixed(2),
        historyType: req.body.historyType,
        createdAt: req.body.createdAt,
        userId: req.body.userId
      });
      let userData = await UsersModel.getUserById(result._id);
      res.status(200).send(JSON.stringify(userData));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  } else {
    res.status(400).send(JSON.stringify({
      success: false,
      error: 'Amount or history type or created date or user id is not defined!'
    }));
  }
});

HistoryRouter.put('/update', async (req, res) => {
  if(req.body.oldHistory && req.body.newHistory && req.body.userId){
    req.body.newHistory.amount = parseFloat(parseFloat(req.body.newHistory.amount).toFixed(2));
    try {
      let result = await HistoryModel.updateHistory(req.body.oldHistory, req.body.newHistory, req.body.userId);
      let userData = await UsersModel.getUserById(result._id);
      res.status(200).send(JSON.stringify(userData));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  } else {
    res.status(400).send(JSON.stringify({
      success: false,
      error: 'Old history or new history or user id is not defined!'
    }));
  }
});

HistoryRouter.delete('/delete', async (req, res) => {
  if(req.body.history && req.body.userId){
    try {
      let result = await HistoryModel.deleteHistory(req.body.history, req.body.userId);
      let userData = await UsersModel.getUserById(result._id);
      res.status(200).send(JSON.stringify(userData));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  } else {
    res.status(400).send(JSON.stringify({
      success: false,
      error: 'History or user id is not defined!'
    }));
  }
});

module.exports = HistoryRouter;
