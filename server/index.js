var express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors'),
    env = process.env.NODE_ENV || 'development';

app = express();
// Config
var config = require('./config/env')[env];
require('./config/viewEngine')(app);

// Database
mongoose.connect(config.database);
console.log('Database connection established'.bold.green);

// Views
require('./view/users.view')(app);
require('./view/stats.view')(app);
require('./view/public.view')(app);

// Server
app.listen(config.port);
console.log('Application started on port ' + config.port.toString().bold.green);