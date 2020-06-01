exports.getDatabaseUri = () => {
    return process.env.DB_URI || require("./config").db.uri;
  };

exports.getJWTSecret = () => {
    return process.env.JWT_SECRET || require("./config").jwtSecret;
  };