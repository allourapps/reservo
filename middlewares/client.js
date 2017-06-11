

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");

const client = {

    createClient : (data, next) => {
        mongoRequests.addUser(data, (err, result) => err ? next(err) : next(null, result));
    }

};

module.exports = client;