
const mongoRequest = require("../dbQueries/mongodb/mongoRequests");
const guid = require("guid");

const rooms = {

  addRoom : (data, next) => {
    data.Guid = guid.raw();
    mongoRequest.addRoom(data, (err, result) => {
      if (err) console.error(err);
      next(result);
    })
  }

};

module.exports = rooms;