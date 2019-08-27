const Message = require('../../../models/Message');

const cutBday = (headers) => {

    const { authorization } = headers;
        var stringy = "bearer "; 
        var token = authorization.slice(stringy.length, authorization.length);

        const {birthday, uid,username} = jwt.decode(token);
        let birthdayCut = birthday.toString().substr(4);

        return {birthdayCut, uid,username};

}

const getAll = async(req, res) => {
try{
        const {birthdayCut} = cutBday(req.headers);

        const result = await Message.find({birthday:birthdayCut}).exec();


        res.json({
            "status": "succes" ,
            "data" : {
                "chat": result
            }
        });
    }catch(ex){
        res.json({
            "status": "failed" ,
            "data" : {
                "message": "something went wrong"
            }});
    }
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
    
        const {birthday, username} = cutBday(req.headers);
        message.username = username;
        message.birthday = birthday;

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