// [CONFIGURE Express & Body-parser]
// Call required packages we need
let express = require('express');

// Instance of Express Router
let invoicesRouter = express.Router();



// [CONFIGURE PRODUCT_LIST]
let Invoices = require('../../models/invoices/invoices');

// [MIDDLEWARE]
invoicesRouter.use(function (req, res, next) {
    console.log('Server activity ...');
    next();
});

// [ROUTES]

// [GET WELCOME]
invoicesRouter.get('/', function (req, res) {
    res.json({ message: 'Welcome to Invotrack server invoices' });
});

// [POST]
invoicesRouter.post('/invoices', function (req, res) {
    // invoices instance
    let invoices = new Invoices();
    // insertion information
    invoices.id_user = req.body.id_user;
    invoices.summary = req.body.summary;
    invoices.products = req.body.products;
    invoices.date_created = req.body.date_created;
    invoices.date_modified = req.body.date_modified;

    invoices.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ massage: 'Invoices created! >>> ' + invoices.summary });
        }
    });
});

// [GET >>> FIND ALL INVOICES]
invoicesRouter.get('/invoices', function (req, res) {
    Invoices.find(function (err, invoices) {
        if (err) {
            res.send(err);
        } else {
            res.json(invoices);
        }
    });
});

// [GET >>> FIND INVOICES by _id]
invoicesRouter.get('/invoices/:invoices_id', function (req, res) {
    console.log('Find invoices by _id: ' + req.params.invoices_id);
    Invoices.findById(req.params.invoices_id, function (err, invoices) {
        if (err) {
            res.send(err);
        } else {
            res.json(invoices);
        }
    });
});

// [PUT UPDATE INVOICES by _id]
invoicesRouter.put('/invoices/:invoices_id', function (req, res) {
    console.log('Update invoices by _id: ' + req.params.invoices_id);
    Invoices.findById(req.params.invoices_id, function (err, invoices) {
        if (err) {
            res.send(err);
        } else {
            //  Update information
            invoices.id_user = req.body.id_user;
            invoices.summary = req.body.summary;
            invoices.products = req.body.products;
            invoices.date_created = req.body.date_created;
            invoices.date_modified = req.body.date_modified;

            // save the update
            invoices.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Invoices updated! >>> ' + invoices.summary });
                }
            });
        }
    })
});

// [PUT >>> DELETE INVOICES by _id]
invoicesRouter.delete('/invoices/:invoices_id', function (req, res) {
    console.log('Delete invoices by _id: ' + req.params.invoices_id);
    Invoices.findByIdAndRemove(req.params.invoices_id, function (err, invoices) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted! >>> ' + invoices.summary });
        }
    });
});

module.exports = invoicesRouter;