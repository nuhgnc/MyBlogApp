const mongoose = require('mongoose');
const passportLocalMoongose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})
UserSchema.plugin(passportLocalMoongose);


module.exports = mongoose.model('user', UserSchema);