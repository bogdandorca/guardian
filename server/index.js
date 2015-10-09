var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors'),
    env = process.env.NODE_ENV || 'development';

app = express();
// Config
var config = require('../config.js')[env];
require('./config/viewEngine')(app);

// Database
mongoose.connect(config.database);
console.log('Database connection established'.bold.green);

// Views
require('./view/auth.view')(app);
require('./view/users.view')(app);
require('./view/stats.view')(app);
require('./view/public.view')(app);

// Server
https.createServer({
    key: fs.readFileSync('certificates/key.pem'),
    cert: fs.readFileSync('certificates/cert.pem')
}, app).listen(config.port);
console.log('Application started on port ' + config.port.toString().bold.green);