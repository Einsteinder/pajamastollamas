const MongoClient = require("mongodb").MongoClient;

const settings = {
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/",
    database: "pajamastollamas"
  }
};

let fullMongoUrl =
  settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined;

let connectDb = () => {
  if (!_connection) {
    _connection = MongoClient.connect(fullMongoUrl).then(db => {
      console.log("Database Connection Established on port 27017");
      return db;
    });
  }

  return _connection;
};

module.exports = connectDb;