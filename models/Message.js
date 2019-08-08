const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    postDate: Date
})
const Message = mongoose.model('Messages', messageSchema);


module.exports = Message;