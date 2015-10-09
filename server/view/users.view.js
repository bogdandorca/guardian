var express = require('express'),
    Router = express.Router(),
    UsersController = require('../controller/users.controller'),
    AuthController = require('../controller/auth.controller');

module.exports = function(app){
    Router.route('/users')
        .get(AuthController.isAuthenticated, function(req, res){
            UsersController.getUsers(req ,res);
        })
        .post(function(req, res){
            UsersController.createUser(req, res);
        })
        .put(AuthController.isAuthenticated, function(req, res){
            UsersController.updateUser(req, res);
        });
    Router.route('/users/:id')
        // TODO: Add logic to check if the Admin has the rights to see this user
        .get(AuthController.isAuthenticated, function(req, res){
            UsersController.getUser(req, res);
        })
        .delete(AuthController.isAuthenticated, function(req, res){
            UsersController.deleteUser(req, res);
        });
    Router.route('/users/info/profile')
        // Add Auth Checker
        .get(AuthController.isAuthenticated, function(req, res){
            UsersController.getCurrentUser(req, res);
        });
    Router.route('/users/search/:input')
        .get(AuthController.isAuthenticated, function(req, res){
            UsersController.search(req, res);
        });

    app.use('/api', Router);
};