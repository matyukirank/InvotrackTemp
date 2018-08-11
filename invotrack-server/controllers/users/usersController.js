// [CONFIGURE Express & Body-parser]
// Call required packages we need
let express = require('express');

// Instance of Express Router
let usersRouter = express.Router();



// [CONFIGURE USERS]
let Users = require('../../models/users/users');

// [MIDDLEWARE]
usersRouter.use(function (req, res, next) {
    console.log('Server activity ...');
    next();
});

// [ROUTES]

// [GET WELCOME]
usersRouter.get('/', function (req, res) {
    res.json({ message: 'Welcome to Invotrack server Users' });
});

// [POST]
usersRouter.post('/users', function (req, res) {
    // user instance
    let user = new Users();
    // insertion information
    user.id_user = req.body.id_user;
    user.username = req.body.username;
    user.password = req.body.password;
    user.access = req.body.access;
    user.date_created = req.body.date_created;
    user.date_modified = req.body.date_modified;

    user.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ massage: 'user created! >>> ' + user.username });
        }
    });
});

// [GET >>> FIND ALL USERS]
usersRouter.get('/users', function (req, res) {
    Users.find(function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

// [GET >>> FIND USER BY _id]
usersRouter.get('/users/:user_id', function (req, res) {
    console.log('Find user by _id: ' + req.params.user_id);
    Users.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

// [PUT UPDATE USER BY _id]
usersRouter.put('/users/:user_id', function (req, res) {
    console.log('Update user by _id: ' + req.params.user_id);
    Users.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            //  Update information
            user.id_user = req.body.id_user;
            user.username = req.body.username;
            user.password = req.body.password;
            user.access = req.body.access;
            user.date_created = req.body.date_created;
            user.date_modified = req.body.date_modified;

            // save the update
            user.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'user updated! >>> ' + user.username });
                }
            });
        }
    })
});

// [PUT >>> DELETE user BY _id]
usersRouter.delete('/users/:user_id', function (req, res) {
    console.log('Delete user by _id: ' + req.params.user_id);
    Users.findByIdAndRemove(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted! >>> ' + user.username });
        }
    });
});

module.exports = usersRouter;