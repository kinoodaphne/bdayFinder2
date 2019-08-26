const Message = require('../../../models/Message');

const getAll = (req, res) => {
    Message.find({}, (err, docs) => {
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

const getId = async (req, res) => {
    let id = req.query._id;

    Message.find({
        'id': id
    }, (err, docs) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "Could not get messages"
            });
        } else {
            res.json({
                "status": "success",
                "data": {
                    "message": docs
                }
            });
        }
    });
}

const create = (req, res, next) => {
    let message = new Message();
    message.text = req.body.text;
    console.log(req.user);
    message.username = req.user.username;

    message.save((err, doc) => {
        if (err) {
            console.log(err);
            res.json({
                "status": "failed",
                "message": "could not post this message"
            });
        };
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "message": doc
                }
            });
        }
    });
};

module.exports.getAll = getAll;
module.exports.getId = getId;
module.exports.create = create;