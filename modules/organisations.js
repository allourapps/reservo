
const mongoRequests = require("../dbQueries/mongodb/mongoRequests");
const _ = require("lodash");

const org = {

  getOrganisations : (req, next) => {
    mongoRequests.getOrganisations(req.params.id, (err, result) => {
      if (err) console.error(err);
      const organisationGuids = [];
      _.each(result, one => organisationGuids.push(one.OrganisationGuid));
      mongoRequests.getOrganisationsById(organisationGuids, (err, result) => {
        if (err) console.error(err);
        next(result);
      });
    })
  }

};

module.exports = org;