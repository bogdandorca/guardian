var express = require('express'),
    Router = express.Router(),
    UsersController = require('../controller/users.controller');

module.exports = function(app){
    Router.route('/users/:page')
        .get(function(req, res){
            UsersController.getUsers(req, res);
        });
    Router.route('/user')
        .post(function(req, res){
            UsersController.addUser(req, res);
        });
    Router.route('/user/:id')
        .get(function(req, res){
            UsersController.getUser(req, res);
        })
        .delete(function(req, res){
            UsersController.deleteUser(req, res);
        });
    Router.route('/user/search/:input')
        .get(function(req, res){
            UsersController.search(req, res);
        });

    app.use('/api', Router);
};