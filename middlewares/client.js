

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");

const client = {

    createClient : (data, next) => {
        mongoRequests.addUser(data, (err, result) => {
            if (err) return next(err);
            console.log(result);
        })
    }

};

module.exports = client;