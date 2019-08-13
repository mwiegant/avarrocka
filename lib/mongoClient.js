(function (module) {
  const UNITS = 'units';

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017';
  const dbName = 'dnd';
  const client = new MongoClient(url);

  let mongoClient = {};


  mongoClient.getAllAliveUnits = function(callback) {
    client.connect(function(err) {
      if (err) {
        console.error(err);
        callback();
      }
      else {
        const collection = client.db(dbName).collection(UNITS);
        const query = {Alive: true};

        collection.find(query).toArray(function(err, docs) {
          if (err)
            console.error(err);

          callback(docs);
        });
      }
    });

  };

  module.exports = mongoClient;

})(module);


