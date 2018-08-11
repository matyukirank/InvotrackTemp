// [CONFIGURE Express & Body-parser]
// Call required packages we need
let express = require('express');

// Instance of Express Router
let clientsRouter = express.Router();



// [CONFIGURE PRODUCT_LIST]
let Clients = require('../../models/clients/clients');

// [MIDDLEWARE]
clientsRouter.use(function (req, res, next) {
    console.log('Server activity ...');
    next();
});

// [ROUTES]

// [GET WELCOME]
clientsRouter.get('/', function (req, res) {
    res.json({ message: 'Welcome to Invotrack server clients' });
});

// [POST]
clientsRouter.post('/clients', function (req, res) {
    // clients instance
    let clients = new Clients();
    // insertion information
    clients.id_user = req.body.id_user;
    clients.title = req.body.title;
    clients.inits = req.body.inits; 
    clients.surname = req.body.surname; 
    clients.address1 = req.body.address1; 
    clients.address2 = req.body.address2;
    clients.town = req.body.town;
    clients.code = req.body.code;
    clients.date_created = req.body.date_created;
    clients.date_modified = req.body.date_modified;

    clients.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ massage: 'clients created! >>> ' + clients.surname });
        }
    });
});

// [GET >>> FIND ALL clients]
clientsRouter.get('/clients', function (req, res) {
    Clients.find(function (err, clients) {
        if (err) {
            res.send(err);
        } else {
            res.json(clients);
        }
    });
});

// [GET >>> FIND clients by _id]
clientsRouter.get('/clients/:clients_id', function (req, res) {
    console.log('Find clients by _id: ' + req.params.clients_id);
    Clients.findById(req.params.clients_id, function (err, clients) {
        if (err) {
            res.send(err);
        } else {
            res.json(clients);
        }
    });
});

// [PUT UPDATE clients by _id]
clientsRouter.put('/clients/:clients_id', function (req, res) {
    console.log('Update clients by _id: ' + req.params.clients_id);
    Clients.findById(req.params.clients_id, function (err, clients) {
        if (err) {
            res.send(err);
        } else {
            //  Update information
            clients.id_user = req.body.id_user;
            clients.title = req.body.title;
            clients.inits = req.body.inits; 
            clients.surname = req.body.surname; 
            clients.address1 = req.body.address1; 
            clients.address2 = req.body.address2;
            clients.town = req.body.town;
            clients.code = req.body.code;
            clients.date_created = req.body.date_created;
            clients.date_modified = req.body.date_modified;

            // save the update
            clients.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'clients updated! >>> ' + clients.surname });
                }
            });
        }
    })
});

// [PUT >>> DELETE clients by _id]
clientsRouter.delete('/clients/:clients_id', function (req, res) {
    console.log('Delete clients by _id: ' + req.params.clients_id);
    Clients.findByIdAndRemove(req.params.clients_id, function (err, clients) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted! >>> ' + clients.surname });
        }
    });
});

module.exports = clientsRouter;