
const router = require("express").Router();
const clientRequests = require("./middlewares/client");

router.post("/register", (req, res, next) => {
    if (req.body) {
        clientRequests.createClient(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        })
    }
});

router.post("/login", (req, res) => {

});

/**
 * Not Found API
 */

router.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

module.exports = router;