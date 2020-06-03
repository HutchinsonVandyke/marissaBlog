const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const adminModel = require("../models/Admin").Model;
const adminDAO = require("../DAO/adminDAO")
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const configUtil = require("../config/configUtil.js");


passport.use("local",
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, done) {

//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

return adminModel.findOne({username: username, password: password})
           .then(admin=> {
          if (admin) {
              return done(null, admin, {
                message: "Logged in successfully"
                });
            } 
          else {
            return done(null, false, {
              message: "Incorrect username or password."
            });
          }
        })
        .catch(err => {
          return done(null, false, {
            message: "Incorrect username or password."
          });
        });
    }
));

passport.use(
    "verify",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: configUtil.getJWTSecret(),
        passReqToCallback: true
      },
      async (req, jwtPayload, done) => {
        req.adminId = jwtPayload.id;
        if (await adminDAO.getByID(jwtPayload.id)) {
          return done(null, true);
        } else {
          return done("Invalid token?");
        }
      }
    )
  );