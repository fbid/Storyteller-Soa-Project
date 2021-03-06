var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    username: {type: String, required: true, unique: true },
    avatar_url: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true,unique: true },
    favouritePosts: {type: [String]}
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
