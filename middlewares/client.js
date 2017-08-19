

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const jwt = require("jsonwebtoken");
const config = require("../config");
const winston = require("winston");
const shortid = require("shortid");

const client = {

    createClient : (data, next) => {
        data.userId = shortid.generate();
        mongoRequests.addUser(data, (err, result) => err ? next(err) : next(null, result));
    },

    getClient : (data, next) => {
        const username = data.username;
        mongoRequests.findUser(username, (err, result) => {
            if (err) return next(err);
            if (result) {
                if (result.password !== data.pass) return next({message : "Password is not correct"});
                if (!result.token) {
                    const token = jwt.sign({
                        org_name : result.org_name,
                        username : result.username,
                    }, config.jwtSecret);
                    result.token = token;
                    mongoRequests.updateToken(result.username, token, err => {
                        if (err) winston.log("error", err);
                    })
                }
                return next(null, result);
            }
            return next({message : "User doesn't exist"});
        })
    }

};

module.exports = client;