var express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors'),
    env = process.env.NODE_ENV || 'development';

app = express();

// Config
var config = require('./config/env')[env];
require('./config/viewEngine')(app);

// Database
console.log('Connecting to the database server...'.yellow);
mongoose.connect(config.database);
console.log('Database connection established'.bold.green);

// Views
require('./view/public.view')(app);

// Server
console.log('Starting application...'.yellow);
app.listen(config.port);
console.log('Application started on port ' + config.port.toString().bold.green);