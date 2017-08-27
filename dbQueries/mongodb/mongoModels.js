
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
 * Employee Schema
 */

const EmployeeSchema = new Schema({
    Guid : {type : String, required : true},
    Name : {type : String, required : true},
    SureName : {type : String, required : true},
    Login : {type : String, required : true},
    Password : {type : String, required : true},
    BirthDay : {type : String, required : true},
    PhotoPath : {type : String, required : true},
    Email : {type : String, required : true}
}, {
    versionKey : false,
    strict: false
});

/**
 * Organisation Schema
 */

const OrganisationSchema = new Schema({
    Guid: {type : String, required : true},
    Name: {type : String, required : true},
    Address: {type : String, required : true}
}, {
    versionKey : false,
    strict: false
});

/**
 * Role Schema
 */

const RoleSchema = new Schema({
    Guid: {type : String, required : true},
    Name: {type : String, required : true}
}, {
    versionKey : false,
    strict: false
});

const PositionSchema = new Schema({
    Guid: {type : String, required : true},
    EmployeeGuid: {type : String, required : true},
    OrganisationGuid: {type : String, required : true},
    RoleGuid: {type : String, required : true}
}, {
    versionKey : false,
    strict: false
});

const EmployeeModel = mongoose.model("Employees", EmployeeSchema);
const OrganisationModel = mongoose.model("Organisations", OrganisationSchema);
const RoleModel = mongoose.model("Roles", RoleSchema);
const TableModel = mongoose.model("Tables", defaultSchema);
const RoomModel = mongoose.model("Rooms", defaultSchema);
const PositionModel = mongoose.model("Positions", PositionSchema);

module.exports = {EmployeeModel, OrganisationModel, RoleModel, TableModel, RoomModel, PositionModel};