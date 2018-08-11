let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productsSchema =  new Schema({
    id_user: String,
    name: String,
    desc: String,
    quatity: Number,
    cost: Number,
    date_created: Date,
    date_modified: Date
});

module.exports = mongoose.model('Products', productsSchema);