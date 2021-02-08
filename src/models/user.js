const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema de usuarios
const UserSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    legajo: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    age: { type: String }
})

module.exports = mongoose.model('UserTeco', UserSchema);