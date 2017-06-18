
const config = {
    mode : "development", // production
    port: parseInt(process.env.PORT) || 3000,
    hostname : "127.0.0.1",
    mainMongo : {
        url : "mongodb://ds131312.mlab.com:31312/heroku_qc5frm7x",
        options : {
            user : "admin",
            pass : "admin"
        }
    }
};

module.exports = config;