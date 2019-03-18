const express = require('express');
const UsersRouter = express.Router();
const UsersModel = require('../models/UsersModel');

UsersRouter.get('/:id', async (req, res) => {
  if(req.params.id){
    try {
      let result = await UsersModel.getUserById(req.params.id);
      res.status(200).send(JSON.stringify(result));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  } else {
    res.status(400).send(JSON.stringify({
      success: false,
      error: "User id is not defined"
    }));
  }
});

UsersRouter.post('/mounthlyAmount/:id', async (req, res) => {
  if(req.params.id && req.body.amount){
    try {
      let result = await UsersModel.setMounthlyAmount(req.params.id, req.body.amount);
      res.status(200).send(JSON.stringify(result));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  } else {
    res.status(400).send(JSON.stringify({
      success: false,
      error: "Amount or user id is not defined"
    }));
  }
});

module.exports = UsersRouter;
