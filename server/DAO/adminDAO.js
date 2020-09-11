const Admin = require("../models/Admin.js").Model; 
const {NotFoundError} = require("../util/exceptions");

exports.getByUsername = async (req) => {
  console.log(req)
  const admin = await Admin.findOne({ username: req });
    if (!admin) throw new NotFoundError();
    return admin;
}

exports.getByID = async (req, res) => {
  console.log(req);
  const admin = await Admin.findOne({ _id: req });
    if (!admin) {
      console.log('no admin found by id')
      throw new NotFoundError();
    }
      res.send(admin);
}