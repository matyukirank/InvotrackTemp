let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema =  new Schema({
    id_user: String,
    username: String,
    password: String,
    access: String,
    date_created: Date,
    date_modified: Date
});

module.exports = mongoose.model('Users', usersSchema);