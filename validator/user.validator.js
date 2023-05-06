const Joi = require("joi");

const login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const signup = Joi.object().keys({
  name: Joi.string().required(),
  mobileNo: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  nickName: Joi.string(),
  role: Joi.string(),
});

const forgotPassword = Joi.object().keys({
  email: Joi.string().required(),
});

module.exports = { login, signup, forgotPassword };
