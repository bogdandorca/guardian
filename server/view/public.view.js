var AuthController = require('../controller/auth.controller');

module.exports = function(app) {
    app.get('/partials/*', AuthController.isAuthenticated, function(req, res){
        res.render('./partials/' + req.params[0]);
    });

    app.get('*', function(req, res){
        res.render('index');
    });
};