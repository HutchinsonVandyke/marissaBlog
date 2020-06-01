const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const adminDAO = require("../dao/AdminDAO.js");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const configUtil = require("../config/configUtil.js");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      adminDAO
        .getByUsername(username)
        .then(adminModel => {
          if (adminModel) {
            if (adminModel.password === password) {
              return done(null, adminModel, {
                message: "Logged in successfully"
              });
            } else {
              return done(null, false, {
                message: "Incorrect username or password."
              });
            }
          } else {
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
  )
);

passport.use(
  "loggedIn",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: configUtil.getJWTSecret(),
      passReqToCallback: true
    },
    async (req, jwtPayload, done) => {
      req.userId = jwtPayload.id;
      if (await adminDAO.getByID(jwtPayload.id)) {
        return done(null, true);
      } else {
        return done("Invalid token?");
      }
    }
  )
);