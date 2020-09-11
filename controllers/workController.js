const Work = require("../models/Work.js").Model; 
const jwt = require('jsonwebtoken');
const configUtil = require("../config/configUtil");
const {NotFoundError} = require("../util/exceptions");

exports.create = async (req, res) => {
    
    if (await Work.exists({ name: req.body.name })) {
      throw Error("username already taken");
    }
    const work = await new Work(req.body).save();
    
    res.send(work);
  };

  exports.get = async (req, res) => {
    
    const work = await Work.findOne({ _id: req.params.id });
      if (!work) throw new NotFoundError();
      res.send(work);
  }

  exports.delete = async (req, res) => {
    
    const work = await Work.findOneAndDelete({ _id: req.params.id });
      if (!work) throw new NotFoundError();
      res.send(work);
  }

  exports.update = async (req, res) => {
    
    const work = await Work.findOneAndUpdate({ _id: req.params.id}, req.body, {
      upsert: true,
      useFindAndModify: false
    });
      if (!work) throw new NotFoundError();
      res.send(work);
  }

  exports.getAll = async (req, res) => {
    const works = await Work.find({}).exec();
    if (!works) throw new NotFoundError();
    res.send(works);
  }