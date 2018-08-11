let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let clientsSchema =  new Schema({
    id_user: String,
    title: String, 
    inits: String, 
    surname: String, 
    address1: String, 
    address2: String, 
    town: String, 
    code: String, 
    date_created: Date,
    date_modified: Date
});

module.exports = mongoose.model('Clients', clientsSchema);