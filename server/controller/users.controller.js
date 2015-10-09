var User = require('../model/user.model'),
    jwt = require('jwt-simple'),
    config = require('../../config'),
    AuthController = require('./auth.controller'),
    Response = require('./response.controller');

module.exports = {
    getUsers: function(req, res){
        var page = req.query.page;
        var limit = req.query.limit;

        if(!page) page = 1;
        if(!limit) limit = 10;

        User.find({}, '-password -salt',function(err, users){
            if(!err){
                Response.success(res, users);
            } else {
                Response.error.badRequest(res);
            }
        }).limit(limit).skip((page-1)*limit);
    },
    getUser: function(req, res){
        var userId = req.params.id;
        User.findOne({_id: userId}, '-password -salt', function(err, data){
            if(!err){
                if(data){
                    Response.success(res, data);
                } else {
                    Response.error.custom(res, 400, 'The user requested does not exist');
                }
            } else {
                Response.error.custom(res, 400, 'The user requested does not exist');
            }
        });
    },
    getCurrentUser: function(req, res){
        var token = req.cookies['x-access-token'];
        var tokenData = jwt.decode(token, config.secret);
        if(tokenData.tokenCode && tokenData.tokenCode.length > 0){
            User.findOne({_id: tokenData.tokenCode}, function(err, user){
                if(!err && user){
                    Response.success(res, user.getPublicData());
                } else {
                    Response.error.custom(res, 401, 'You are not authorized to access this resource');
                }
            });
        } else {
            Response.error.custom(res, 401, 'You are not authorized to access this resource');
        }
    },
    deleteUser: function(req, res){
        var userId = req.params.id;
        User.remove({_id: userId}, function(err){
            if(!err){
                Response.success(res, 'The user has been deleted');
            } else {
                Response.error.serviceUnavailable(res);
            }
        });
    },
    createUser: function(req, res){
        var user = new User(req.body);
        if(user.isValid()){
            user.hasAccount(function(response){
                if(!response){
                    user.role = 0;
                    user.save(function(err, user){
                        if(!err) {
                            var token = AuthController.generateToken(user._id);
                            res.cookie('x-access-token', token, {httpOnly: true, secure: true});
                            Response.success(res, user.getPublicData());
                        } else {
                            Response.error.custom(res, 500, err);
                        }
                    });
                } else {
                    Response.error.custom(res, 403, response);
                }
            });
        }
    },
    updateUser: function(req, res){
        var user = new User(req.body);
        if(user.hasValidInfo()){
            User.update({_id: user._id}, user, function(err){
                if(!err){
                    Response.success(res, user.getPublicData());
                } else {
                    Response.error.internalServerError(res);
                }
            });
        } else {
            Response.error.badRequest(res);
        }
    },
    search: function(req, res){
        if(req.params.input && req.params.input.length > 0){
            var query = new RegExp(req.params.input, 'i');
            User.find({email: query}, '-password -salt', function(err, results){
                if(!err){
                    Response.success(res, results);
                } else {
                    Response.error.internalServerError(res);
                }
            }).limit(this.usersPerPage);
        } else {
            Response.error.badRequest(res);
        }
    }
};