
const mongoose = require("mongoose");
const config = require("../../config");
const {EmployeeModel, OrganisationModel, RoleModel, TableModel, RoomModel} = require("./mongoModels");
mongoose.Promise = Promise;

mongoose.connect(config.mainMongo.url, config.mainMongo.options);

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected");
});
mongoose.connection.on("error", err => {
    console.error(err);
});


const mongo = {

    addEmployee : (data, next) => {
        EmployeeModel.create(data)
          .then(doc => next(null, {status : "OK"}), err => next(err));
    },

    addOrganisation : (data, next) => {
        OrganisationModel.create(data)
          .then(doc => next(null, {status : "OK"}), err => next(err));
    },

    addRole : (data, next) => {
        RoleModel.create(data)
          .then(doc => next(null, {status : "OK"}), err => next(err));
    },

    addRoom : (data, next) => {
        RoomModel.create(data)
          .then(doc => next(null, {status : "OK"}), err => next(err));
    },

    addTable : (data, next) => {
        TableModel.create(data)
          .then(doc => next(null, {status : "OK"}), err => next(err));
    },

    findEmployee : (Login, next) => {
        EmployeeModel.findOne({Login}, null, {lean : true})
          .then(doc => next(null, doc), err => next(err))

    },

    updateToken : (username, token, next) => {
        EmployeeModel.update({username}, {$set : {token}})
            .then(doc => next(null), err => next(err));
    },

    getTables : (RoomGuid, next) => {
        TableModel.find({RoomGuid}, null, {lean: true})
            .then(doc => next(null, doc), err => next(err))
    },

    getRooms : (OrganisationGuid, next) => {
        RoomModel.find({OrganisationGuid}, null, {lean : true})
          .then(doc => next(null, doc), err => next(err))
    }

};

module.exports = mongo;