
const mongoRequests = require("../dbQueries/mongodb/mongoRequests");

const tables = {

    getTables : (req, next) => {
        const username = req.user.username;
        mongoRequests.findUser(username, (err, result) => {
            if (err) return next(err);
            console.log(result);
            mongoRequests.getTables(username, (err, result) => {
                if (err) return next(err);
                console.log(result);
                next(null, result);
            })
        });
    }

};

module.exports = tables;