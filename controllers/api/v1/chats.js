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

const getAll = (req, res) => {
    Message.find({
        "username": "dabenie"
    }, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "chat": docs
                }
            });
        }
    });
};

const create = (req, res) => {
    let message = new Message();
    message.username = "dabenie";
    message.text = "Hello there";
    message.postDate = "2019-08-08";
    message.save((err, doc) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "message": {
                        "text": doc
                    }
                }
            });
        }
    }  );
};

module.exports.getAll = getAll;
module.exports.create = create;