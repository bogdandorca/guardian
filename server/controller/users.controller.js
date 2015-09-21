var User = require('../model/user.model');

module.exports = {
    getUsers: function(req, res){
        var page = req.query.page;
        var limit = req.query.limit;

        if(!page) page = 1;
        if(!limit) limit = 10;

        User.find({}, '-password -salt',function(err, users){
            if(!err){
                res.send(users);
            } else {
                res.status(400).send('Bad request');
            }
        }).limit(limit).skip((page-1)*limit);
    },
    getUser: function(req, res){
        var userId = req.params.id;
        User.findOne({_id: userId}, '-password -salt', function(err, data){
            if(!err){
                if(data){
                    res.status(200).send(data);
                } else {
                    res.status(400).send('Not user found');
                }
            } else {
                res.status(400).send('Not user found');
            }
        });
    },
    deleteUser: function(req, res){
        var userId = req.params.id;
        User.remove({_id: userId}, function(err){
            if(err){
                res.status(500).send('Service unavailable');
            } else {
                res.status(200).send('Success!');
            }
        });
    },
    createUser: function(req, res){
        var user = new User(req.body);
        if(user.isValid()){
            user.hasAccount(function(response){
                if(!response){
                    user.save(function(err, user){
                        if(!err) {
                            res.status(200).send('Account created');
                        } else {
                            res.status(500).send(err);
                        }
                    });
                } else {
                    res.status(403).send(response);
                }
            });
        }
    },
    updateUser: function(req, res){
        var user = new User(req.body);
        if(user.hasValidInfo()){
            User.update({_id: user._id}, user, function(err){
                if(err){
                    res.status(500).send('Server error');
                } else {
                    res.status(200).send('Success');
                }
            });
        } else {
            res.status(400).send('Invalid request');
        }
    },
    search: function(req, res){
        if(req.params.input && req.params.input.length > 0){
            var query = new RegExp(req.params.input, 'i');
            User.find({email: query}, '-password -salt', function(err, results){
                if(!err){
                    res.status(200).send(results);
                } else {
                    res.status(500).send('Server error');
                }
            }).limit(this.usersPerPage);
        } else {
            res.status(400).send('No input was sent');
        }
    }
};