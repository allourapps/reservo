
const config = {
    mode : "development", // production
    port: parseInt(process.env.PORT) || 3000,
    hostname : "127.0.0.1",
    mainMongo : {
        url : ""
    }
};

module.exports = config;