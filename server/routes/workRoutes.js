const express = require('express'), 
    router = express.Router(),
    workController = require('../controllers/workController'),
    jwt = require('jsonwebtoken'),
    LoginStrategy = require("../auth/login.js"),
    passport = require("passport");



router.get(
      "/:name",
      passport.authenticate("verify", { session: false }),
      workController.get
    );
router.get(
        "/getAll",
        workController.getAll
    );
router.post(
    "/",
    passport.authenticate("verify", { session: false }),
    workController.create
); 
  
module.exports = router;