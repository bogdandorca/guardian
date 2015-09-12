

module.exports = {
    isAuthenticated: function(req, res, next){
        if(true === true){
            next();
        } else {
            res.render('./partials/login');
        }
    }
};