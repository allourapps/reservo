
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
    org_name : {type : String, required : true},
    director_name : {type : String, required : true},
    address : {type : String, required : true},
    phone : {type : Number, required : true},
    email : {type : String, required : true},
    apps_quantity : {type : Number, required : true},
    roles : {type : Array, required : true}
}, {
    versionKey : false,
    strict: false
});

const UserModel = mongoose.model("Users", UserSchema);
const TableModel = mongoose.model("Tables", defaultSchema);

module.exports = {UserModel};