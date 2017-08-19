
const mongoRequests = require("../dbQueries/mongodb/mongoRequests");

const tables = {

    getTables : (req, next) => {
        const roomId = req.query.roomId;
        mongoRequests.getTables(roomId, (err, result) => {
            if (err) return next(err);
            console.log(result);
            next(null, result);
        });
    },

    getRooms : (req, next) => {
        const userId = req.query.userId;
        mongoRequests.getRooms(userId, (err, result) => {
            if (err) return next(err);
            console.log(result);
            next(null, result);
        });
    }

};

module.exports = tables;