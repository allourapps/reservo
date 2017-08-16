
const mongoose = require("mongoose");
const config = require("../../config");
const {UserModel, TableModel} = require("./mongoModels");
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
        next(null, {status : "OK"});
    },

    findUser : (username, next) => {
        UserModel.findOne({username}, null, {lean : true})
          .then(doc => next(null, doc), err => next(err))

    },

    updateToken : (username, token, next) => {
        UserModel.update({username}, {$set : {token}})
            .then(doc => next(null), err => next(err));
    },

    getTables : (username, next) => {
        TableModel.find({}, null, {lean: true})
            .then(doc => next(null, doc), err => next(err))
    }

};

module.exports = mongo;