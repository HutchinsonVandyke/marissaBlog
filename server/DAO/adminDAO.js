const Admin = require("../models/Admin.js").Model; 

exports.getAll = async () => {
    console.log("dao!");
    let admin = await Admin.find({}).exec();
    console.log("made past the db fetch")
    console.log(admin);
    return admin;
  };