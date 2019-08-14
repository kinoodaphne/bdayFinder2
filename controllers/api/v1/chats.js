const Message = require('../../../models/Message');

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

const create = (req, res, next) => {
    let message = new Message();
    message.text = req.body.text;
    message.user = req.body.user;

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
                    "message": {
                        "text": message.text
                    }
                }
            });
        }
    }  );
};

module.exports.getAll = getAll;
module.exports.create = create;