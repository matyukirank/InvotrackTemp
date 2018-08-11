let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let invoicesSchema =  new Schema({
    id_user: String,
    summary: String,
    products: Object,
    date_created: Date,
    date_modified: Date
});

module.exports = mongoose.model('Invoices', invoicesSchema);