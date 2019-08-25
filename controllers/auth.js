const User = require('../models/User');
const jwt = require('jsonwebtoken');
const chatConfig = require('config');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = new User({
        username: username
    });
    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, chatConfig.get('jwt.secret'));

        res.json({
            "status": "success",
            "data": {
                "user": result,
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "error",
            "data": error
        })
    });
};
const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
            console.log(result);
            if (!result.user) {
                return res.json({
                    "status": "failed",
                    "message": "Login failed"
                })
            }

            let token = jwt.sign({
                uid: result.user._id,
                username: result.user.username
            }, chatConfig.get('jwt.secret'));

        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        });
    }).catch(error => {
    res.json({
        "status": "error",
        "message": error.message
    })
});
};

module.exports.signup = signup;
module.exports.login = login;