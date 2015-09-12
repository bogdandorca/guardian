

module.exports = {
    isAuthenticated: function(req, res, next){
        if(true === false){
            next();
        } else {
            res.render('./partials/login');
        }
    }
};