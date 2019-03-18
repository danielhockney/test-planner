const express = require('express');
const LoginRouter = express.Router();
const LoginModel = require('../models/LoginModel');
const validator = require('../utilities/validator');

LoginRouter.post('/', async (req, res) => {
  let isValid = validator(req.body);

  if(!isValid.success){
    res.status(400).send(JSON.stringify({
      success: false,
      error: isValid.message
    }));
  } else {
    try {
      let result = await LoginModel.loginUser(req.body.email, req.body.password);
      res.status(200).send(JSON.stringify(result));
    } catch (error) {
      res.status(500).send(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  }
});

module.exports = LoginRouter;
