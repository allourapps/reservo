

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");

const client = {

    createClient : (data, next) => {
        mongoRequests.addUser(data, (err, result) => err ? next(err) : next(null, result));
    },

    getClient : (data, next) => {
        const username = data.username;
        mongoRequests.findUser(username, (err, result) => {
            if (err) return next(err);
            if (result.password !== data.pass) return next({message : "Password is not correct"});
            return next(null, result);
        })
    }

};

module.exports = client;