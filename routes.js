const _ = require('lodash');
const router = require('express').Router();
const clientRequests = require('./middlewares/client');
const path = require('path');

router.post('/register', (req, res, next) => {
    if (req.body) {
        clientRequests.createClient(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
    }
});

router.post('/login', (req, res) => {

});

router.all('*', (req, res) => {
    // res.render('index');
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Not Found API
 */

router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;