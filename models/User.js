const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const dateOnly = require("mongoose-dateonly")(mongoose);

const User = new Schema({
    birthday: {
        type: dateOnly,
        required: true
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);