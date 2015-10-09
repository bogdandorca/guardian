var AuthController = require('../controller/auth.controller'),
    config = require('../../config.js');

var templateVariables = {
    title: config.name,
    description: config.description
};

module.exports = function(app) {
    app.get('/partials/public/*', function(req, res){
        res.render('./partials/public/' + req.params[0]);
    });
    app.get('/partials/private/*', function(req, res){
        AuthController.hasRouteAccess(req, function(err){
            if(!err){
                res.render('./partials/private/' + req.params[0]);
            } else {
                res.render('./partials/public/404');
            }
        });
    });
    // Get logic to get the private data only if logged in
    // Basically, inverse the parse logic
    app.get('/public/*', function(req, res){
        res.render('public', templateVariables);
    });

    app.get('*', function(req, res){
        AuthController.hasRouteAccess(req, function(err){
            if(!err){
                res.render('index', templateVariables);
            } else {
                res.render('public', templateVariables);
            }
        });
    });
};