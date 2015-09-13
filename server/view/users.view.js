var express = require('express'),
    Router = express.Router(),
    UsersController = require('../controller/users.controller');

module.exports = function(app){
    Router.route('/users')
        .get(function(req, res){
            UsersController.getUsers(req, res);
        });
    Router.route('/user/:id')
        .delete(function(req, res){
            UsersController.deleteUser(req, res);
        });

    app.use('/api', Router);
};