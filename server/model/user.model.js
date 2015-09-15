var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    moment = require('moment');

var UserSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: String,
    password: String,
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: String,
        default: moment().format('X')
    }
});

UserSchema.methods.isValid = function(){
    return (this.email && this.email.length > 5 && this.email.length <40) &&
        (this.password && this.password.length > 6);
};
UserSchema.methods.hasAccount = function(callback){
    this.constructor.find({email: this.email}, function(err, users){
        if(!err){
            if(users.length > 0){
                callback('The user is already registered');
            } else {
                callback(null);
            }
        } else {
            callback('There was an error trying to process the request');
        }
    });
};
// Registering functions
UserSchema.methods.encryptPassword = function(password, salt){
    if(!password || !salt) return '';
    this.salt = salt;
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};
UserSchema.pre('save', function(next){
    this.salt = crypto.randomBytes(32).toString('base64');
    this.password = this.encryptPassword(this.password, this.salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);