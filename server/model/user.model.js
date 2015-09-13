var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    creationDate: {
        type: String,
        default: moment()
    }
});

module.exports = mongoose.model('User', UserSchema);