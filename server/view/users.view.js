var express = require('express'),
    Router = express.Router(),
    UsersController = require('../controller/users.controller');

module.exports = function(app){
    Router.route('/users')
        .get(function(req, res){
            UsersController.getUsers(req ,res);
        })
        .post(function(req, res){
            UsersController.createUser(req, res);
        })
        .put(function(req, res){
            UsersController.updateUser(req, res);
        });
    Router.route('/users/:id')
        .get(function(req, res){
            UsersController.getUser(req, res);
        })
        .delete(function(req, res){
            UsersController.deleteUser(req, res);
        });
    Router.route('/users/search/:input')
        .get(function(req, res){
            UsersController.search(req, res);
        });

    app.use('/api', Router);
};