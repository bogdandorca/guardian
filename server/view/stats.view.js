var express = require('express'),
    Router = express.Router(),
    StatsController = require('../controller/stats.controller');

module.exports = function(app){
    Router.route('/stats/users/number')
        .get(function(req, res){
            StatsController.getNumberOfUsers(req, res);
        });

    app.use('/api', Router);
};