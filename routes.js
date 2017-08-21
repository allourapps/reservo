const _ = require('lodash');
const router = require('express').Router();
const clientRequests = require('./middlewares/client');
const tableRequests = require("./modules/tables");
const path = require('path');

router.post('/register', (req, res, next) => {
    if (req.body) {
        clientRequests.createClient(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
    }
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    if (!_.isEmpty(req.body)) {
        clientRequests.getClient(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
        return;
    }
    next({message: 'Body is not provided'})
});

router.get("/api/tables", (req, res, next) => {
    tableRequests.getTables(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    })
});
router.get("/api/rooms", (req, res, next) => {
    tableRequests.getRooms(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

/**
 * Not Found API
 */

router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;