var User = require('../model/user.model');

module.exports = {
    getUsers: function(req, res){
        User.find({}, function(err, users){
            if(!err){
                res.send(users);
            } else {
                res.status(500).send('Server unavailable');
            }
        });
    }
};