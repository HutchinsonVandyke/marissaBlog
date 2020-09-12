const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    adminRouter = require('../routes/adminRoutes.js'),
    authRouter = require('../routes/authRoutes.js'),
    imageRouter = require('../routes/imageRoutes.js'),
    awsRouter = require('../controllers/awsController'),
    workRouter = require('../routes/workRoutes.js'),
    configUtil = require("./configUtil.js");
    passport = require("../auth/passport.js");

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */

   //mongodb+srv://hutchinsonrvandy:<password>@cluster0.bb6gh.mongodb.net/<dbname>?retryWrites=true&w=majority
    //local connect = configUtil.getDatabaseUri()
   mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://hutchinsonrvandy:4783Hrvd@cluster0.bb6gh.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        dbName:'marissablog',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('mongodb connected')
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();
    //app.use(passport.initalize())
    // enable request logging for development debugging
    app.use(morgan('dev'));
    var whitelist = ['https://marissaderrickblog.herokuapp.com', 'http://localhost:3000', 'http://localhost:5000', 'http://localhost:5000/', 'http://localhost:5000/work/', undefined]
    var corsOptions = {
        origin: function (origin, callback) {
            console.log(origin)
            if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
            } else {
            callback(new Error('Not allowed by CORS'))
            }
        }
    }
    app.use(cors(corsOptions));
    
    // body parsing middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    // add a router
    app.use('/uploads', express.static('uploads'));
    app.use('/admin', adminRouter);
    app.use('/auth', authRouter);
    app.use('/sign_s3', awsRouter.sign_s3);
    app.use('/image', imageRouter);
    app.use('/work', workRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/public')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/public', 'index.html'));
        });
    }

    return app
}

