var AuthController = require('../controller/auth.controller'),
    config = require('../../config.js');

var templateVariables = {
    title: config.name,
    description: config.description,
    layoutName: ''
};

module.exports = function(app) {
    app.get('/partials/*', AuthController.isAuthenticated, function(req, res){
        res.render('./partials/' + req.params[0]);
    });

    app.get('/public/*', function(req, res){
        templateVariables.layoutName = 'publicLayout';
        res.render('index', templateVariables);
    });

    app.get('*', function(req, res){
        templateVariables.layoutName = 'layout';
        res.render('index', templateVariables);
    });
};