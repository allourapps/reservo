
const mongoose = require("mongoose");
const config = require("../../config");
const {UserModel} = require("./mongoModels");
mongoose.Promise = Promise;

mongoose.connect(config.mainMongo.url);

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected");
});
mongoose.connection.on("error", err => {
    console.error(err);
});


const mongo = {

    addUser : (data, next) => {

    },

    findUser : () => {



    }

};

module.exports = mongo;