var User = require('../model/user.model'),
    Response = require('./response.controller');

module.exports = {
    getNumberOfUsers: function(req, res){
        User.count({}, function(err, data){
            if(!err){
                Response.success(res, data.toString());
            } else {
                Response.error.internalServerError(res);
            }
        });
    }
};