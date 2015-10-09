var express = require('express'),
    Router = express.Router(),
    AuthController = require('../controller/auth.controller');

module.exports = function(app){
    Router.route('/login')
        .post(function(req, res){
            AuthController.login(req, res);
        });

    Router.route('/logout')
        .delete(function(req, res){
            AuthController.logout(req, res);
        });

    app.use('/auth', Router);
};