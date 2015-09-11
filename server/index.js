var express = require('express'),
    colors = require('colors'),
    env = process.env.NODE_ENV || 'development';

app = express();

// Config
var config = require('./config/env')[env];
require('./config/viewEngine')(app);

// Views
require('./view/public.view')(app);

// Server
console.log('Starting application...'.yellow);
app.listen(config.port);
console.log('Application started on port ' + config.port.toString().bold.green);