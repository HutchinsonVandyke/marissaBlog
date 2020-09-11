const express = require('express'), 
    router = express.Router(),
    workController = require('../controllers/workController.js'),
    jwt = require('jsonwebtoken'),
    LoginStrategy = require("../auth/login.js"),
    passport = require("passport");

router.get(
    "/",
    workController.getAll
    );
router.get(
      "/:id",
      workController.get
    );
router.delete(
    "/:id",
    passport.authenticate("verify", { session: false }),
    workController.delete
    );
router.put(
    "/:id",
    passport.authenticate("verify", { session: false }),
    workController.update
    );
router.post(
    "/",
    passport.authenticate("verify", { session: false }),
    workController.create
); 
  
module.exports = router;