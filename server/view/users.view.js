var express = require('express'),
    Router = express.Router(),
    UsersController = require('../controller/users.controller');

module.exports = function(app){
    Router.route('/users')
        .get(function(req, res){
            UsersController.getUsers(req, res);
        });

    app.use('/api', Router);
};