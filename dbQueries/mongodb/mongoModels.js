
/**
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * default schema
 */

const defaultSchema = new Schema({}, {
    versionKey : false,
    strict: false
});

/**
 * user schema
 */

const UserSchema = new Schema({
    OrganisationName : {type : String, required : true},
    Name : {type : String, required : true},
    Surname : {type : String, required : true},
    Address : {type : String, required : true},
    Phone : {type : String, required : true},
    Email : {type : String, required : true},
    Roles : {type : Array, required : true},
    UserName : {type : String, required : true},
    Password : {type : String, required : true},
    Guid : {type : String, required : true}
}, {
    versionKey : false,
    strict: false
});

const UserModel = mongoose.model("Users", UserSchema);
const TableModel = mongoose.model("Tables", defaultSchema);
const RoomModel = mongoose.model("Tables", defaultSchema);

module.exports = {UserModel, TableModel, RoomModel};