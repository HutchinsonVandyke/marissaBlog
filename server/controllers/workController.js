const Work = require("../models/Work.js").Model; 
const jwt = require('jsonwebtoken');
const configUtil = require("../config/configUtil");
const {NotFoundError} = require("../util/exceptions");

exports.create = async (req, res) => {
    
    if (await Work.exists({ name: req.body.name })) {
      throw Error("username already taken");
    }
    const work = await new Work(req.body).save();
    console.log(work)
    res.send(work);
  };

  exports.get = async (req, res) => {
    const work = await Work.findOne({ name: req.name });
      if (!work) throw new NotFoundError();
      return work;
  }

  exports.getAll = async () => {
    return await Work.find({}).exec();
  }