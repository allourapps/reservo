
const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const guid = require("guid");

const role = {

  addRole : (data, next) => {
    data.Guid = guid.raw();
    mongoRequests.addRole(data, (err, result) => {
      if (err) console.error(err);
      next(result);
    });
  },

  getRoles : next => {
    mongoRequests.getRoles((err, result) => {
      if (err) console.error(err)
      next(result);
    })
  },

};

module.exports = role;