const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    adminRouter = require('../routes/adminRoutes.js'),
    authRouter = require('../routes/authRoutes.js'),
    configUtil = require("./configUtil.js");
    passport = require("../auth/passport.js");

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(configUtil.getDatabaseUri(), {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();
    //app.use(passport.initalize())
    // enable request logging for development debugging
    app.use(morgan('dev'));
    
    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/admin', adminRouter);
    app.use('/auth', authRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

