const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    username: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    }
})

const Message = mongoose.model('Messages', messageSchema);


module.exports = Message;