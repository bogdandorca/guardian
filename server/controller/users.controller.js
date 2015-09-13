var User = require('../model/user.model');

module.exports = {
    getUsers: function(req, res){
        User.find({}, function(err, users){
            if(!err){
                res.send(users);
            } else {
                res.status(500).send('Service unavailable');
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
    }
};