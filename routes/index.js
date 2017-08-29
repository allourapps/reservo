const _ = require('lodash');
const router = require('express').Router();
const clientRequests = require('./../middlewares/client');
const tableRequests = require("./../modules/tables");
const roleRequests = require("./../modules/roles");
const roomRequests = require("./../modules/rooms");
const positionRequests = require("./../modules/positions");
const organisationRequests = require("./../modules/organisations");
const path = require('path');

router.post('/employee', (req, res, next) => {
    if (!_.isEmpty(req.body)) {
        clientRequests.createEmployee(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
        return;
    }
    next({message: 'Body is not provided'})
});

router.post('/organisation', (req, res, next) => {
    if (!_.isEmpty(req.body)) {
        clientRequests.createOrganisation(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
        return;
    }
    next({message: 'Body is not provided'})
});

router.post('/login', (req, res, next) => {
    if (!_.isEmpty(req.body)) {
        clientRequests.getEmployee(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
        return;
    }
    next({message: 'Body is not provided'})
});

router.post('/position', (req, res) => {
    console.log(req.body);
    positionRequests.addPosition(req.body, result => res.send(result));
});

router.post('/role', (req, res) => {
    roleRequests.addRole(req.body, result => res.send(result))
});

router.post('/room', (req, res) => {
    roomRequests.addRoom(req.body, result => res.send(result));
});

router.post('/table', (req, res) => {
    tableRequests.addTable(req.body, result => res.send(result));
});

router.get('/api/roles', (req, res) => {
   roleRequests.getRoles(result => res.send(result));
});

router.get("/api/tables/:id", (req, res, next) => {
    tableRequests.getTables(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    })
});

router.get("/api/rooms/:id", (req, res, next) => {
    tableRequests.getRooms(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    })
});

router.get("/api/organisations/:id", (req, res) => {
    organisationRequests.getOrganisations(req, result => res.send(result));
});

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

/**
 * Not Found API
 */

router.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;