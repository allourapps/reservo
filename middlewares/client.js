

const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const jwt = require("jsonwebtoken");
const config = require("../config");
const winston = require("winston");
const guid = require("guid");

const client = {

    createEmployee : (data, next) => {
        data.Guid = guid.raw();
        mongoRequests.addEmployee(data, (err, result) => err ? next(err) : next(null, result));
    },

    createOrganisation : (data, next) => {
        data.Guid = guid.raw();
        mongoRequests.addOrganisation(data, (err, result) => err ? next(err) : next(null, result));
    },

    getEmployee : (data, next) => {
        const login = data.Login;
        mongoRequests.findEmployee(login, (err, result) => {
            if (err) return next(err);
            if (result) {
                if (result.Password !== data.Password) return next({message : "Password is not correct"});
                if (!result.Token) {
                    const token = jwt.sign({
                        OrganisationName : result.OrganisationName,
                        Login : result.Login,
                    }, config.jwtSecret);
                    result.Token = token;
                    mongoRequests.updateToken(result.Login, token, err => {
                        if (err) winston.log("error", err);
                    })
                }
                delete result["_id"];
                return next(null, {
                    ErrorCode: "0",
                    InputError: false,
                    ResultMessage: "Success",
                    Success : true,
                    Result : result
                });
            }
            return next({message : "User doesn't exist"});
        })
    }

};

module.exports = client;