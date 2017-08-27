
const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const guid = require("guid");

const position = {

  addPosition : (data, next) => {
    data.Guid = guid.raw();
    mongoRequests.addPosition(data, (err, result) => {
      if (err) console.error(err);
      next(result);
    })
  }

};

module.exports = position;