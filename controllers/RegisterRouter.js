const express = require('express');
const RegisterRouter = express.Router();
const RegisterModel = require('../models/RegisterModel');
const validator = require('../utilities/validator');

RegisterRouter.post('/', async (req, res) => {
  let isValid = validator(req.body);

  if(!isValid.success){
    res.status(400).send(JSON.stringify({
      success: false,
      error: isValid.message
    }));
  } else {
    try {
      let result = await RegisterModel.createUser(req.body.username, req.body.email, req.body.password);
      res.status(200).send(JSON.stringify(result));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  }
});

module.exports = RegisterRouter;
