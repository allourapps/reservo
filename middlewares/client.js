

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const jwt = require("jsonwebtoken");
const config = require("../config");
const winston = require("winston");
const guid = require("guid");

const client = {

    createClient : (data, next) => {
        data.Guid = guid.raw();
        mongoRequests.addUser(data, (err, result) => err ? next(err) : next(null, result));
    },

    getClient : (data, next) => {
        const username = data.UserName;
        mongoRequests.findUser(username, (err, result) => {
            if (err) return next(err);
            if (result) {
                if (result.Password !== data.Password) return next({message : "Password is not correct"});
                if (!result.Token) {
                    const token = jwt.sign({
                        OrganisationName : result.OrganisationName,
                        UserName : result.UserName,
                    }, config.jwtSecret);
                    result.Token = token;
                    mongoRequests.updateToken(result.UserName, token, err => {
                        if (err) winston.log("error", err);
                    })
                }
                delete result["_id"];
                return next(null, result);
            }
            return next({message : "User doesn't exist"});
        })
    }

};

module.exports = client;