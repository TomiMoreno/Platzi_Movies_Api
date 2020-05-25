const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const MONGO_URI = `mongo+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }
  getAll(collection, query) {
    this.connect().then(db => {});
  }

  get(collection, id) {
    this.connect().then(db => {});
  }

  create(collection, data) {
    this.connect()
      .then(db => {})
      .then(result => result.InsertedId);
  }

  update(collection, id, data) {
    this.connect().then(db => {});
  }

  delete(collection, id) {
    this.connect().then(db => {});
  }
}

module.exports = MongoLib;
