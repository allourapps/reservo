
const mongoose = require("mongoose");
const config = require("../../config");
const {UserModel, TableModel, RoomModel} = require("./mongoModels");
mongoose.Promise = Promise;

mongoose.connect(config.mainMongo.url, config.mainMongo.options);

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected");
});
mongoose.connection.on("error", err => {
    console.error(err);
});


const mongo = {

    addUser : (data, next) => {
        UserModel.create(data)
          .then(doc => next(null, {status : "OK"}), err => next(err));
    },

    findUser : (UserName, next) => {
        UserModel.findOne({UserName}, null, {lean : true})
          .then(doc => next(null, doc), err => next(err))

    },

    updateToken : (username, token, next) => {
        UserModel.update({username}, {$set : {token}})
            .then(doc => next(null), err => next(err));
    },

    getTables : (roomId, next) => {
        TableModel.find({roomId}, null, {lean: true})
            .then(doc => next(null, doc), err => next(err))
    },

    getRooms : (userId, next) => {
        RoomModel.find({userId}, null, {lean : true})
          .then(doc => next(null, doc), err => next(err))
    }

};

module.exports = mongo;