// [CONFIGURE Express & Body-parser]
// Call required packages we need
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// Set port to connect to 
let port = process.env.PORT || 1739;

// [CONFIGURE MONGO DB]
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Invotrack', { useNewUrlParser: true });

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// FIXME: remove when no longer using local server
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// [CONFIGURE CONTROLLER]
let usersController = require('./controllers/users/usersController');
let productsController = require('./controllers/products/productsController');
let invoicesController = require('./controllers/invoices/invoicesController');
let clientsController = require('./controllers/clients/clientsController');

// Register routes with prefix of /api
app.use('/usersApi', usersController);
app.use('/productsApi', productsController);
app.use('/invoicesApi', invoicesController);
app.use('/clientsApi', clientsController);

// [START]
app.listen(port);
console.log('Server has start ... listen on [PORT:' + port + ']');
