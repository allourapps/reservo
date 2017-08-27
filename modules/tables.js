
const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const guid = require("guid");

const tables = {

    getTables : (req, next) => {
        mongoRequests.getTables(req.params.id, (err, result) => {
            if (err) return next(err);
            next(null, result);
        });
    },

    getRooms : (req, next) => {
        mongoRequests.getRooms(req.params.id, (err, result) => {
            if (err) return next(err);
            next(null, result);
        });
    },

    addTable : (data, next) => {
        data.Guid = guid.raw();
        mongoRequests.addTable(data, (err, result) => {
            if (err) console.error(err);
            next(result);
        })
    }

};

module.exports = tables;