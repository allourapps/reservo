

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const jwt = require("jsonwebtoken");
const config = require("../config");
const winston = require("winston");
const guid = require("guid");
// const shortid = require("shortid");

const client = {

    createClient : (data, next) => {
        data.userId = guid.raw();
        mongoRequests.addUser(data, (err, result) => err ? next(err) : next(null, result));
    },

    getClient : (data, next) => {
        const username = data.username;
        mongoRequests.findUser(username, (err, result) => {
            if (err) return next(err);
            if (result) {
                if (result.password !== data.password) return next({message : "Password is not correct"});
                if (!result.token) {
                    const token = jwt.sign({
                        orgName : result.orgName,
                        userName : result.userName,
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