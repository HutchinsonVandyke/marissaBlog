const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const configUtil = require("../config/configUtil");
const uuid = require('uuid')

aws.config.update({
  region: 'us-east-2', // Put your aws region here
  accessKeyId: configUtil.getAWSKey(),
  secretAccessKey: configUtil.getAWSSecret()
})
const S3_BUCKET = configUtil.getAWSBucket()
const s3 = new aws.S3()

var upload = multer({
    storage: multerS3({
      s3,
      bucket: S3_BUCKET,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, req.s3Key)
      }
    })
  })
const singleFileUpload = upload.single('image');

function uploadToS3(req, res){
    req.s3Key = uuid.v4();
    let downloadUrl = `https://marissaderrickblog.s3.us-east-2.amazonaws.com/${req.s3Key}`
    return new Promise((resolve, reject) => {
        return singleFileUpload(req, res, err => {
            if (err) return reject(err);
            return resolve(downloadUrl)
        })
    })
}


exports.uploadImageToS3 = (req, res) => {
    uploadToS3(req,res)
    .then(downloadUrl => { 
        //eventually will save url to the correct work
        console.log(downloadUrl)
        return res.status(200).send({downloadUrl})
    })
    .catch(e =>{
        console.log(e)
    })
}