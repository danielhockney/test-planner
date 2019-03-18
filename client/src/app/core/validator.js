const validator = require('validator');

function generateErrorObject(message){
  return {
    success: false,
    message: message
  };
}

module.exports = (userData) => {
  if(userData.email && validator.isEmpty(userData.email)){
    return generateErrorObject('Email is required');
  }
  if(userData.username && validator.isEmpty(userData.username)){
    return generateErrorObject('Username is required');
  }
  if(userData.password && validator.isEmpty(userData.password)){
    return generateErrorObject('Password is required');
  }
  if(userData.email && !validator.isLength(userData.email, {min: 10, max: 255})){
    return generateErrorObject('Email length must be min 10 and max 255 characters');
  }
  if(userData.username && !validator.isLength(userData.username, {min: 6, max: 30})){
    return generateErrorObject('Username length must be min 6 and max 30 characters');
  }
  if(userData.password && !validator.isLength(userData.password, {min: 6, max: 60})){
    return generateErrorObject('Password length must be min 6 and max 60 characters');
  }
  if(userData.email && !validator.isEmail(userData.email)){
    return generateErrorObject('Please type valid email');
  }
  if(userData.username && !validator.isAscii(userData.username)){
    return generateErrorObject('Username is incorrect');
  }
  if(userData.repeatPassword && userData.repeatPassword !== userData.password){
    return generateErrorObject('Please repeat password again');
  }
  return {
    success: true
  };
}
