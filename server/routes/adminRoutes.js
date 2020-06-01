const express = require('express'), 
    router = express.Router(),
    adminController = require('../controllers/adminController');
    jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
        const header = req.headers['authorization'];
      
        if(typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
      
            req.token = token;
            next();
        } else {
            //If header is undefined return Forbidden (403)
            res.sendStatus(403)
        }
      }

router.get(
      "/",
      checkToken,
      adminController.get
    );
router.post(
    "/login",
    adminController.Login
); 
  
module.exports = router;