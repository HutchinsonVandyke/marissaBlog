const express = require('express');
const router = express.Router();

const {
    generateGetUrl,
    generatePutUrl
  } = require('./AWSPresigner');
  
  // GET URL
  router.get('/generate-get-url', (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    const { Key } = req.query;
    generateGetUrl(Key)
      .then(getURL => {      
        res.send(getURL);
      })
      .catch(err => {
        res.send(err);
      });
  });
  
  // PUT URL
  router.get('/generate-put-url', (req,res)=>{
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType } =  req.query;
    generatePutUrl(Key, ContentType).then(putURL => {
      res.send({putURL});
    })
    .catch(err => {
      res.send(err);
    });
  });