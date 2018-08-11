// [CONFIGURE Express & Body-parser]
// Call required packages we need
let express = require('express');

// Instance of Express Router
let productsRouter = express.Router();



// [CONFIGURE PRODUCT_LIST]
let Products = require('../../models/products/products');

// [MIDDLEWARE]
productsRouter.use(function (req, res, next) {
    console.log('Server activity ...');
    next();
});

// [ROUTES]

// [GET WELCOME]
productsRouter.get('/', function (req, res) {
    res.json({ message: 'Welcome to Invotrack server products' });
});

// [POST]
productsRouter.post('/products', function (req, res) {
    // Products instance
    let products = new Products();
    // insertion information
    products.id_user = req.body.id_user;
    products.name = req.body.name;
    products.desc = req.body.desc;
    products.quatity = req.body.quatity;
    products.cost = req.body.cost;
    products.date_created = req.body.date_created;
    products.date_modified = req.body.date_modified;

    products.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ massage: 'Products created! >>> ' + products.name });
        }
    });
});

// [GET >>> FIND ALL PRODUCTS]
productsRouter.get('/products', function (req, res) {
    Products.find(function (err, products) {
        if (err) {
            res.send(err);
        } else {
            res.json(products);
        }
    });
});

// [GET >>> FIND products by _id]
productsRouter.get('/products/:products_id', function (req, res) {
    console.log('Find products by _id: ' + req.params.products_id);
    Products.findById(req.params.products_id, function (err, products) {
        if (err) {
            res.send(err);
        } else {
            res.json(products);
        }
    });
});

// [PUT UPDATE products by _id]
productsRouter.put('/products/:products_id', function (req, res) {
    console.log('Update products by _id: ' + req.params.products_id);
    Products.findById(req.params.products_id, function (err, products) {
        if (err) {
            res.send(err);
        } else {
            //  Update information
            products.id_user = req.body.id_user;
            products.name = req.body.name;
            products.desc = req.body.desc;
            products.quatity = req.body.quatity;
            products.cost = req.body.cost;
            products.date_created = req.body.date_created;
            products.date_modified = req.body.date_modified;

            // save the update
            products.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Products updated! >>> ' + products.name });
                }
            });
        }
    })
});

// [PUT >>> DELETE products by _id]
productsRouter.delete('/products/:products_id', function (req, res) {
    console.log('Delete products by _id: ' + req.params.products_id);
    Products.findByIdAndRemove(req.params.products_id, function (err, products) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted! >>> ' + products.name });
        }
    });
});

module.exports = productsRouter;