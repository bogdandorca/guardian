var express = require('express'),
    Router = express.Router(),
    StatsController = require('../controller/stats.controller'),
    AuthController = require('../controller/auth.controller');

module.exports = function(app){
    Router.route('/stats/users/number')
        .get(AuthController.isAuthenticated, function(req, res){
            StatsController.getNumberOfUsers(req, res);
        });

    app.use('/api', Router);
};