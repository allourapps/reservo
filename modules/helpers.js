
const _ = require("lodash");

const helper = {

    deleteMongoId : array => {
        _.each(array, one => one.delete["_id"]);
    }

};

module.exports = helper;