const jwt = require("jsonwebtoken");
const configUtil = require("../config/configUtil");

exports.tokanizeUser = user => {
  console.log('inside auth util')
  console.log(user.id)
  let token = jwt.sign({ id: user.id }, configUtil.getJWTSecret());
  console.log("token is ");
  console.log(token);
  return token;
};