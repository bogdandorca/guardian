var User = require('../model/user.model');

module.exports = {
    getNumberOfUsers: function(req, res){
        User.count({}, function(err, data){
            if(!err){
                res.status(200).send(data.toString());
            } else {
                res.status(500).send('Server error');
            }
        });
    }
};