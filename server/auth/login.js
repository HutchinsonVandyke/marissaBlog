const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authUtil = require("./authUtil");
const passport = require("passport");


exports.authenticateAdmin = (req, res, next) => {
  passport.authenticate(
    "adminLogin",
    { session: false },
    (err, admin, info) => {
      if (err || !admin) {
        return res.status(400).json({
          error: info.message,
          user: admin
        });
      }
      req.login(admin, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const token = authUtil.tokanizeUser(admin);
        return res.json({ token: token, admin: admin });
      });
    }
  )(req, res, next);
};