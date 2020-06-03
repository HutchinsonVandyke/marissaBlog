const Admin = require("../models/Admin.js").Model; 
const jwt = require('jsonwebtoken');
const configUtil = require("../config/configUtil");
const {NotFoundError} = require("../util/exceptions");

exports.verifyUser = async (req, res) =>
 {
    return !!req.adminId;
  }

exports.get = async (req, res) => {
  const admin = await Admin.findOne({ username: "marissa" });
    if (!admin) throw new NotFoundError();
    return admin;
}

exports.Login = async (req, res) => {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) throw new NotFoundError();
    let username = req.body.username
    let password = req.body.password

    if (username == admin.username && password == admin.password) { 
      //if user log in success, generate a JWT token for the user with a secret key
      jwt.sign({id: admin.id}, configUtil.getJWTSecret(), { expiresIn: '12h' }, (err, token) => {
          if(err) { console.log(err) }  
          console.log(token);
          res.send(token);
      });
        } else {
      console.log('ERROR: Could not log in');
        } 
    
};

