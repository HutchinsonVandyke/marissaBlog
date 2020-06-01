const Admin = require("../models/Admin.js").Model; 

getByUsername = async (data) => {
  const admin = await Admin.findOne({ username: data });
    if (!admin) throw new NotFoundError();
    return(admin);
}

getByID = async (data) => {
  const admin = await Admin.findOne({ _id: data });
    if (!admin) throw new NotFoundError();
    return(admin);
}