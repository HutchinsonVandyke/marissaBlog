exports.getDatabaseUri = () => {
    return process.env.DB_URI || require("./config").db.uri;
  };

exports.getJWTSecret = () => {
    return process.env.JWT_SECRET || require("./config").jwtSecret;
  };

exports.getAWSKey = () => {
    return process.env.S3_KEY || require("./config").AWS.S3_KEY;
  };
  
exports.getAWSSecret = () => {
    return process.env.S3_SECRET || require("./config").AWS.S3_SECRET;
  };

exports.getAWSBucket = () => {
    return process.env.S3_BUCKET || require("./config").AWS.S3_BUCKET;
  };