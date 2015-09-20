var AuthController = require('../controller/auth.controller'),
    config = require('../../config.js');

var templateVariables = {
    title: config.name,
    description: config.description
};

module.exports = function(app) {
    app.get('/partials/*', AuthController.isAuthenticated, function(req, res){
        res.render('./partials/' + req.params[0]);
    });

    app.get('*', function(req, res){
        res.render('index', templateVariables);
    });
};