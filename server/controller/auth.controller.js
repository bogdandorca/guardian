var User = require('../model/user.model'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    Response = require('./response.controller'),
    config = require('../../config.js');

module.exports = {
    generateToken: function(userId){
        var exp = moment().add(7, 'days').format('X');
        return jwt.encode({
            tokenCode: userId,
            exp: exp
        }, config.secret);
    },
    login: function(req, res){
        var that = this;
        if(req.body.email && req.body.email.length > 5 &&
            req.body.password && req.body.password.length > 5){
            User.findOne({email: req.body.email}, function(err, user){
                if(!err && user){
                    var sentPasswordHash = user.encryptPassword(req.body.password, user.salt);
                    if(sentPasswordHash === user.password){
                        var token = that.generateToken(user._id);
                        res.cookie('x-access-token', token, {httpOnly: true, secure: true});
                        Response.success(res, user.getPublicData());
                    } else {
                        Response.error.forbidden(res);
                    }
                } else {
                    Response.error.forbidden(res);
                }
            });
        } else {
            Response.error.badRequest(res);
        }
    },
    logout: function(req, res){
        res.clearCookie('x-access-token');
        res.status(200).send('Logged out');
    },
    isAuthenticated: function(req, res, next){
        if(req.cookies['x-access-token'] && req.cookies['x-access-token'].length > 5){
            var token = req.cookies['x-access-token'];
            try {
                var tokenData = jwt.decode(token, config.secret);
                if (tokenData.tokenCode && tokenData.tokenCode.length > 0) {
                    User.findOne({_id: tokenData.tokenCode}, function (err, user) {
                        if (!err && user) {
                            next();
                        } else {
                            Response.error.unauthorized(res);
                        }
                    });
                } else {
                    Response.error.unauthorized(res);
                }
            } catch(e){
                Response.error.internalServerError(res);
            }
        } else {
            Response.error.unauthorized(res);
        }
    },
    hasRouteAccess: function(req, callback){
        if(req.cookies['x-access-token'] && req.cookies['x-access-token'].length > 5){
            var token = req.cookies['x-access-token'];
            try {
                var tokenData = jwt.decode(token, config.secret);
                if (tokenData.tokenCode && tokenData.tokenCode.length > 0) {
                    User.findOne({_id: tokenData.tokenCode}, function (err, user) {
                        if (!err && user) {
                            callback(null);
                        } else {
                            callback('Not authenticated');
                        }
                    });
                } else {
                    callback('Not authenticated');
                }
            } catch(e){
                callback('Not authenticated');
            }
        } else {
            callback('Not authenticated');
        }
    }
};