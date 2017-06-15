var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    userId: {type: String, required: true},
    author: {type: String, required: true},
    title: {type: String, required: true},
    mainImg: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true},
    tags: {type: [String]}
});

module.exports = mongoose.model('Post', postSchema);
