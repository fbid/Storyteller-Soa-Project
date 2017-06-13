var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Post', postSchema);
